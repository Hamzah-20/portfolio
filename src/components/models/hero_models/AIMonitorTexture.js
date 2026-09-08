import { useMemo } from "react";
import * as THREE from "three";

const drawRoundedRect = (ctx, x, y, width, height, radius) => {
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
  ctx.fill();
};

const useAIMonitorTexture = () => {
  return useMemo(() => {
    const canvas = document.createElement("canvas");

    canvas.width = 2048;
    canvas.height = 768;

    const ctx = canvas.getContext("2d");

    // background
    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height,
    );

    gradient.addColorStop(0, "#030b12");
    gradient.addColorStop(0.5, "#06151e");
    gradient.addColorStop(1, "#02080e");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // center separator
    ctx.strokeStyle = "rgba(34, 211, 238, 0.35)";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(1024, 70);
    ctx.lineTo(1024, 700);
    ctx.stroke();

    // ========================================
    // LEFT SCREEN
    // ========================================

    ctx.fillStyle = "#22d3ee";
    ctx.font = "600 35px Arial";
    ctx.fillText("AI MODEL", 100, 100);

    ctx.fillStyle = "#ffffff";
    ctx.font = "700 58px Arial";
    ctx.fillText("EfficientNetV2B0", 100, 180);

    ctx.fillStyle = "#64748b";
    ctx.font = "28px Arial";
    ctx.fillText("Chest X-Ray Classification", 100, 230);

    // status
    ctx.fillStyle = "#071e26";
    drawRoundedRect(ctx, 100, 290, 760, 90, 18);

    ctx.fillStyle = "#22c55e";

    ctx.beginPath();
    ctx.arc(145, 335, 13, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#94a3b8";
    ctx.font = "25px Arial";
    ctx.fillText("MODEL STATUS", 180, 325);

    ctx.fillStyle = "#ffffff";
    ctx.font = "700 28px Arial";
    ctx.fillText("READY", 180, 355);

    // accuracy
    ctx.fillStyle = "#94a3b8";
    ctx.font = "27px Arial";
    ctx.fillText("ACCURACY", 100, 475);

    ctx.fillStyle = "#ffffff";
    ctx.font = "700 100px Arial";
    ctx.fillText("90%", 100, 585);

    // progress bar
    ctx.fillStyle = "#0f2933";
    drawRoundedRect(ctx, 100, 630, 760, 18, 9);

    ctx.fillStyle = "#22d3ee";
    drawRoundedRect(ctx, 100, 630, 684, 18, 9);

    // ========================================
    // RIGHT SCREEN
    // ========================================

    ctx.fillStyle = "#22d3ee";
    ctx.font = "600 35px Arial";
    ctx.fillText("LIVE INFERENCE", 1110, 100);

    ctx.fillStyle = "#ffffff";
    ctx.font = "700 54px Arial";
    ctx.fillText("PNEUMONIA", 1110, 180);

    ctx.fillStyle = "#64748b";
    ctx.font = "27px Arial";
    ctx.fillText("Prediction confidence", 1110, 230);

    ctx.fillStyle = "#071e26";
    drawRoundedRect(ctx, 1110, 290, 780, 145, 20);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "27px Arial";
    ctx.fillText("CONFIDENCE", 1160, 340);

    ctx.fillStyle = "#22d3ee";
    ctx.font = "700 65px Arial";
    ctx.fillText("94.7%", 1160, 405);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "27px Arial";
    ctx.fillText("F1 SCORE", 1110, 520);

    ctx.fillStyle = "#ffffff";
    ctx.font = "700 75px Arial";
    ctx.fillText("0.92", 1110, 610);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "27px Arial";
    ctx.fillText("DEEP LEARNING", 1530, 520);

    ctx.fillStyle = "#ffffff";
    ctx.font = "700 42px Arial";
    ctx.fillText("CNN", 1530, 590);

    // corner decorations
    ctx.strokeStyle = "rgba(34, 211, 238, 0.45)";
    ctx.lineWidth = 3;

    ctx.strokeRect(30, 30, 1988, 708);

    const texture = new THREE.CanvasTexture(canvas);

    texture.colorSpace = THREE.SRGBColorSpace;

    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    texture.needsUpdate = true;

    return texture;
  }, []);
};

export default useAIMonitorTexture;
