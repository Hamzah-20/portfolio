import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

const GLBModel = ({ model }) => {
  const scene = useGLTF(model.modelPath);

  return (
    <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
      <group scale={model.scale} rotation={model.rotation}>
        <primitive object={scene.scene} />
      </group>
    </Float>
  );
};

const SVGModel = ({ model }) => {
  const svg = useLoader(SVGLoader, model.svgPath);

  const object = useMemo(() => {
    const group = new THREE.Group();

    svg.paths.forEach((path) => {
      const shapes = SVGLoader.createShapes(path);

      shapes.forEach((shape) => {
        const geometry = new THREE.ExtrudeGeometry(shape, {
          depth: 1.6,
          bevelEnabled: true,
          bevelThickness: 0.35,
          bevelSize: 0.25,
          bevelSegments: 3,
        });

        const material = new THREE.MeshStandardMaterial({
          color: model.color,
          roughness: 0.32,
          metalness: 0.08,
        });

        const mesh = new THREE.Mesh(geometry, material);

        group.add(mesh);
      });
    });

    const box = new THREE.Box3().setFromObject(group);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    group.children.forEach((child) => {
      if (child.geometry) {
        child.geometry.translate(-center.x, -center.y, -center.z);
      }
    });

    const maxDimension = Math.max(size.x, size.y);

    if (maxDimension > 0) {
      const normalizedScale = (model.displayScale || 2.6) / maxDimension;

      group.scale.set(normalizedScale, -normalizedScale, normalizedScale);
    }

    return group;
  }, [svg, model.color, model.displayScale]);

  return (
    <Float speed={4.5} rotationIntensity={0.35} floatIntensity={0.75}>
      <group rotation={model.rotation || [0, 0, 0]}>
        <primitive object={object} />
      </group>
    </Float>
  );
};

const TechIconCardExperience = ({ model }) => {
  return (
    <Canvas
      camera={{
        position: [0, 0, 5],
        fov: 45,
      }}
    >
      <ambientLight intensity={0.45} />

      <directionalLight position={[5, 5, 5]} intensity={1.2} />

      <spotLight
        position={[10, 15, 10]}
        angle={0.3}
        penumbra={1}
        intensity={2}
      />

      <pointLight position={[-4, -3, 4]} intensity={0.65} color="#67e8f9" />

      <Environment preset="city" />

      {model.svgPath ? <SVGModel model={model} /> : <GLBModel model={model} />}

      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
};

export default TechIconCardExperience;
