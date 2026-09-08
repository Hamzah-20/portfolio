import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const TrainingMonitorTexture = () => {
  const canvas = useMemo(() => {
    const element = document.createElement("canvas");

    element.width = 1024;
    element.height = 512;

    return element;
  }, []);

  const texture = useMemo(() => {
    const newTexture = new THREE.CanvasTexture(canvas);

    newTexture.colorSpace = THREE.SRGBColorSpace;
    newTexture.minFilter = THREE.LinearFilter;
    newTexture.magFilter = THREE.LinearFilter;

    return newTexture;
  }, [canvas]);

  const animationRef = useRef(0);

  useFrame((state) => {
    const ctx = canvas.getContext("2d");

    const time = state.clock.elapsedTime;

    animationRef.current = time;

    // =============================
    // Background
    // =============================

    const gradient = ctx.createLinearGradient(0, 0, 1024, 512);

    gradient.addColorStop(0, "#02080d");
    gradient.addColorStop(1, "#071923");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 512);

    // =============================
    // Grid
    // =============================

    ctx.strokeStyle = "rgba(34, 211, 238, 0.06)";
    ctx.lineWidth = 1;

    for (let x = 0; x <= 1024; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 512);
      ctx.stroke();
    }

    for (let y = 0; y <= 512; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1024, y);
      ctx.stroke();
    }

    // Border
    ctx.strokeStyle = "rgba(34, 211, 238, 0.45)";
    ctx.lineWidth = 4;
    ctx.strokeRect(12, 12, 1000, 488);

    // =============================
    // Header
    // =============================

    ctx.fillStyle = "#22d3ee";
    ctx.font = "600 25px Arial";
    ctx.fillText("MODEL TRAINING", 45, 75);

    ctx.fillStyle = "#ffffff";
    ctx.font = "700 38px Arial";
    ctx.fillText("EfficientNetV2B0", 45, 125);

    ctx.fillStyle = "#64748b";
    ctx.font = "20px Arial";
    ctx.fillText("Chest X-Ray Classification", 45, 160);

    // =============================
    // Accuracy
    // =============================

    ctx.fillStyle = "#94a3b8";
    ctx.font = "19px Arial";
    ctx.fillText("VALIDATION ACCURACY", 45, 215);

    ctx.fillStyle = "#ffffff";
    ctx.font = "700 52px Arial";
    ctx.fillText("90%", 45, 275);

    // =============================
    // Graph
    // =============================

    const graphX = 370;
    const graphY = 170;
    const graphWidth = 580;
    const graphHeight = 230;

    // graph background
    ctx.fillStyle = "rgba(4, 25, 35, 0.8)";

    ctx.beginPath();
    ctx.roundRect(graphX, graphY, graphWidth, graphHeight, 18);
    ctx.fill();

    // graph lines
    ctx.strokeStyle = "rgba(148, 163, 184, 0.12)";
    ctx.lineWidth = 1;

    for (let i = 1; i < 5; i++) {
      const y = graphY + (graphHeight / 5) * i;

      ctx.beginPath();
      ctx.moveTo(graphX, y);
      ctx.lineTo(graphX + graphWidth, y);
      ctx.stroke();
    }

    // Fake training curve
    const points = [
      0.28, 0.38, 0.46, 0.53, 0.61, 0.68, 0.74, 0.79, 0.83, 0.86, 0.88, 0.9,
    ];

    const visibleProgress = ((Math.sin(time * 0.65) + 1) / 2) * 0.25 + 0.75;

    const visiblePoints = Math.max(
      2,
      Math.floor(points.length * visibleProgress),
    );

    ctx.beginPath();

    points.slice(0, visiblePoints).forEach((value, index) => {
      const x = graphX + (index / (points.length - 1)) * graphWidth;

      const y = graphY + graphHeight - value * graphHeight;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.strokeStyle = "#22d3ee";
    ctx.lineWidth = 5;

    ctx.shadowColor = "#22d3ee";
    ctx.shadowBlur = 12;

    ctx.stroke();

    ctx.shadowBlur = 0;

    // last point
    const lastIndex = visiblePoints - 1;

    const lastValue = points[lastIndex];

    const lastX = graphX + (lastIndex / (points.length - 1)) * graphWidth;

    const lastY = graphY + graphHeight - lastValue * graphHeight;

    ctx.fillStyle = "#ffffff";

    ctx.beginPath();
    ctx.arc(lastX, lastY, 7, 0, Math.PI * 2);
    ctx.fill();

    // =============================
    // Footer stats
    // =============================

    ctx.fillStyle = "#94a3b8";
    ctx.font = "18px Arial";

    ctx.fillText("TRAIN LOSS", 45, 360);

    ctx.fillText("VAL LOSS", 165, 360);

    ctx.fillText("EPOCH", 280, 360);

    ctx.fillStyle = "#22d3ee";
    ctx.font = "700 23px Arial";

    ctx.fillText("0.18", 45, 395);

    ctx.fillText("0.24", 165, 395);

    ctx.fillText("18 / 20", 280, 395);

    // =============================
    // Status
    // =============================

    ctx.fillStyle = "#22c55e";

    ctx.beginPath();
    ctx.arc(925, 70, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#475569";
    ctx.font = "16px Arial";

    ctx.fillText("HAMZAH AI LAB • TRAINING", 45, 465);

    texture.needsUpdate = true;
  });

  useEffect(() => {
    return () => {
      texture.dispose();
    };
  }, [texture]);

  return texture;
};

export default TrainingMonitorTexture;
