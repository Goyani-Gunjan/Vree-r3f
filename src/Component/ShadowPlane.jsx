/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";

// Function to create the shadow texture
function createShadowTexture() {
  const size = 260;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    10,
    size / 2,
    size / 2,
    size / 2
  );
  gradient.addColorStop(0, "rgba(0,0,0,0.8)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  return new THREE.CanvasTexture(canvas);
}

export function ShadowPlane() {
  const shadowRef = useRef();
  const { camera } = useThree();

  const shadowTexture = useMemo(() => createShadowTexture(), []);

  useEffect(() => {
    function updateShadowScale() {
      if (shadowRef.current) {
        const distance = camera.position.length();
        const minScale = 2.5; // Prevents disappearing when zoomed in
        const maxScale = 20; // Ensures visibility when zoomed out
        const scaleFactor = Math.min(Math.max(distance * 0.02, minScale), maxScale);
        shadowRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
      }
    }

    updateShadowScale();
  }, [camera]);

  return (
    <mesh
      ref={shadowRef}
      rotation-x={-Math.PI / 2}
      position={[0, -0.8, -1.5]}
      receiveShadow
    >
      <planeGeometry args={[4, 3]} />
      <meshBasicMaterial map={shadowTexture} transparent opacity={0.9} />
    </mesh>
  );
}
