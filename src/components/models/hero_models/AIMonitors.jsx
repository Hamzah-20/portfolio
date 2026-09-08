import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import TrainingMonitorTexture from "./TrainingMonitorTexture";

const createDashboardTexture = ({
  title,
  subtitle,
  metricLabel,
  metricValue,
  secondaryLabel,
  secondaryValue,
}) => {
  const canvas = document.createElement("canvas");

  canvas.width = 1024;
  canvas.height = 512;

  const ctx = canvas.getContext("2d");

  // Background
  const gradient = ctx.createLinearGradient(0, 0, 1024, 512);
  gradient.addColorStop(0, "#02080d");
  gradient.addColorStop(1, "#071923");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1024, 512);

  // Subtle grid
  ctx.strokeStyle = "rgba(34, 211, 238, 0.07)";
  ctx.lineWidth = 1;

  for (let x = 0; x < 1024; x += 64) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 512);
    ctx.stroke();
  }

  for (let y = 0; y < 512; y += 64) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }

  // Border
  ctx.strokeStyle = "rgba(34, 211, 238, 0.45)";
  ctx.lineWidth = 3;
  ctx.lineWidth = 4;
  ctx.strokeRect(12, 12, 1000, 488);

  // Top line
  ctx.fillStyle = "#22d3ee";
  ctx.fillRect(45, 50, 90, 5);

  // Title
  ctx.fillStyle = "#22d3ee";
  ctx.font = "600 28px Arial";
  ctx.fillText(title, 45, 105);

  // Main title
  ctx.fillStyle = "#f8fafc";
  ctx.font = "700 48px Arial";
  ctx.fillText(subtitle, 45, 170);

  // Metric
  ctx.fillStyle = "#64748b";
  ctx.font = "600 23px Arial";
  ctx.fillText(metricLabel, 45, 245);

  ctx.fillStyle = "#ffffff";
  ctx.font = "700 82px Arial";
  ctx.fillText(metricValue, 45, 335);

  // Secondary metric card
  ctx.fillStyle = "rgba(8, 47, 73, 0.55)";
  ctx.beginPath();
  ctx.roundRect(560, 215, 400, 155, 20);
  ctx.fill();

  ctx.strokeStyle = "rgba(34, 211, 238, 0.3)";
  ctx.stroke();

  ctx.fillStyle = "#94a3b8";
  ctx.font = "600 21px Arial";
  ctx.fillText(secondaryLabel, 600, 265);

  ctx.fillStyle = "#22d3ee";
  ctx.font = "700 58px Arial";
  ctx.fillText(secondaryValue, 600, 335);

  // Footer
  ctx.fillStyle = "#475569";
  ctx.font = "18px Arial";
  ctx.fillText("HAMZAH AI LAB  •  SYSTEM ONLINE", 45, 455);

  // Status dot
  ctx.fillStyle = "#22c55e";
  ctx.beginPath();
  ctx.arc(930, 70, 9, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);

  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  return texture;
};

const getScreenComponents = (geometry) => {
  const weldedGeometry = mergeVertices(geometry.clone(), 0.0001);

  const positions = weldedGeometry.attributes.position;

  const index = weldedGeometry.index;

  if (!index) {
    console.warn("Screen geometry could not be indexed.");

    return [];
  }

  const triangleCount = index.count / 3;

  const triangles = [];
  const vertexToTriangles = new Map();

  const getVertex = (vertexIndex) =>
    new THREE.Vector3(
      positions.getX(vertexIndex),
      positions.getY(vertexIndex),
      positions.getZ(vertexIndex),
    );

  // Build triangles
  for (let i = 0; i < triangleCount; i++) {
    const indices = [
      index.getX(i * 3),
      index.getX(i * 3 + 1),
      index.getX(i * 3 + 2),
    ];

    const a = getVertex(indices[0]);
    const b = getVertex(indices[1]);
    const c = getVertex(indices[2]);

    const ab = new THREE.Vector3().subVectors(b, a);

    const ac = new THREE.Vector3().subVectors(c, a);

    const cross = new THREE.Vector3().crossVectors(ab, ac);

    const area = cross.length() * 0.5;

    const normal = area > 0 ? cross.clone().normalize() : new THREE.Vector3();

    const centroid = new THREE.Vector3().add(a).add(b).add(c).divideScalar(3);

    triangles.push({
      indices,
      a,
      b,
      c,
      normal,
      centroid,
      area,
    });

    indices.forEach((vertexIndex) => {
      if (!vertexToTriangles.has(vertexIndex)) {
        vertexToTriangles.set(vertexIndex, []);
      }

      vertexToTriangles.get(vertexIndex).push(i);
    });
  }

  // Find connected triangle islands
  const visited = new Set();
  const components = [];

  for (
    let startTriangle = 0;
    startTriangle < triangles.length;
    startTriangle++
  ) {
    if (visited.has(startTriangle)) continue;

    const queue = [startTriangle];
    const componentTriangles = [];

    visited.add(startTriangle);

    while (queue.length > 0) {
      const triangleIndex = queue.pop();

      const triangle = triangles[triangleIndex];

      componentTriangles.push(triangle);

      triangle.indices.forEach((vertexIndex) => {
        const neighbors = vertexToTriangles.get(vertexIndex) || [];

        neighbors.forEach((neighborIndex) => {
          if (!visited.has(neighborIndex)) {
            visited.add(neighborIndex);

            queue.push(neighborIndex);
          }
        });
      });
    }

    const totalArea = componentTriangles.reduce(
      (sum, triangle) => sum + triangle.area,
      0,
    );

    components.push({
      triangles: componentTriangles,
      area: totalArea,
    });
  }

  return components.sort((a, b) => b.area - a.area);
};

const calculateScreenPlacement = (triangles) => {
  if (!triangles.length) return null;

  // Use the largest triangle as reference orientation
  const largestTriangle = [...triangles].sort((a, b) => b.area - a.area)[0];

  const referenceNormal = largestTriangle.normal.clone();

  const normal = new THREE.Vector3();

  let totalArea = 0;

  const center = new THREE.Vector3();

  triangles.forEach((triangle) => {
    const alignedNormal = triangle.normal.clone();

    if (alignedNormal.dot(referenceNormal) < 0) {
      alignedNormal.negate();
    }

    normal.addScaledVector(alignedNormal, triangle.area);

    center.addScaledVector(triangle.centroid, triangle.area);

    totalArea += triangle.area;
  });

  normal.normalize();
  center.divideScalar(totalArea);

  // Make screen face toward the room instead of into the wall
  const towardRoom = center.clone().negate().normalize();

  if (normal.dot(towardRoom) < 0) {
    normal.negate();
  }

  const worldUp = new THREE.Vector3(0, 1, 0);

  const right = new THREE.Vector3().crossVectors(worldUp, normal).normalize();

  const up = new THREE.Vector3().crossVectors(normal, right).normalize();

  let minX = Infinity;
  let maxX = -Infinity;

  let minY = Infinity;
  let maxY = -Infinity;

  const points = [];

  triangles.forEach(({ a, b, c }) => {
    points.push(a, b, c);
  });

  points.forEach((point) => {
    const relative = point.clone().sub(center);

    const x = relative.dot(right);
    const y = relative.dot(up);

    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);

    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  });

  const width = maxX - minX;
  const height = maxY - minY;

  const centerOffsetX = (minX + maxX) / 2;

  const centerOffsetY = (minY + maxY) / 2;

  const finalCenter = center
    .clone()
    .addScaledVector(right, centerOffsetX)
    .addScaledVector(up, centerOffsetY)
    .addScaledVector(normal, 0.02);

  const rotationMatrix = new THREE.Matrix4().makeBasis(right, up, normal);

  const quaternion = new THREE.Quaternion().setFromRotationMatrix(
    rotationMatrix,
  );

  return {
    position: finalCenter,
    quaternion,
    width,
    height,
  };
};

const AIMonitors = () => {
  const { nodes } = useGLTF("/models/optimized-room.glb");

  const trainingTexture = TrainingMonitorTexture();

  const predictionTexture = useMemo(
    () =>
      createDashboardTexture({
        title: "LIVE INFERENCE",
        subtitle: "PNEUMONIA",
        metricLabel: "CONFIDENCE",
        metricValue: "94.7%",
        secondaryLabel: "F1 SCORE",
        secondaryValue: "0.92",
      }),
    [],
  );

  const placements = useMemo(() => {
    const screenGeometry = nodes.emis_lambert1_0.geometry;

    const components = getScreenComponents(screenGeometry);

    console.log(
      "SCREEN COMPONENTS:",
      components.map((component, index) => ({
        index,
        triangles: component.triangles.length,
        area: component.area,
      })),
    );

    // The two largest connected surfaces
    // should correspond to our two monitors.
    const screens = components
      .filter((component) => component.area > 0.01)
      .slice(0, 2)
      .map((component) => calculateScreenPlacement(component.triangles))
      .filter(Boolean);

    return screens;
  }, [nodes]);

  const textures = [predictionTexture, trainingTexture];

  return (
    <group>
      {placements.map((placement, index) => {
        if (!placement) return null;

        return (
          <mesh
            key={index}
            position={placement.position}
            quaternion={placement.quaternion}
            renderOrder={10}
          >
            <planeGeometry
              args={[placement.width * 0.98, placement.height * 0.96]}
            />

            <meshBasicMaterial
              map={textures[index]}
              toneMapped={false}
              side={THREE.DoubleSide}
              polygonOffset
              polygonOffsetFactor={-2}
              polygonOffsetUnits={-2}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default AIMonitors;
