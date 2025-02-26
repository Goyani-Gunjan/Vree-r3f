import * as THREE from "three";

// Create Soft Shadow (Radial Gradient Texture)
    export default function createShadowTexture() {
      const size = 260;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");

      const gradient = ctx.createRadialGradient(
        size / 2, size / 2, 10, 
        size / 2, size / 2, size / 2
      );
      gradient.addColorStop(0, "rgba(0,0,0,0.8)");
      gradient.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);

      return new THREE.CanvasTexture(canvas);
    }