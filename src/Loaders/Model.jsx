/* eslint-disable react/no-unknown-property */
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";
import PropTypes from "prop-types"; // ✅ Import PropTypes


export function Model({ onModelLoaded }) {
  const gltf = useGLTF("/assets/glbs/sampleModel.glb");

  if (gltf.scene && onModelLoaded) {
    onModelLoaded(gltf.scene);
  }

  return  <primitive object={gltf.scene} scale={1.5} position={[0, -0.2, 0]} />;
}
Model.propTypes = {
    onModelLoaded: PropTypes.func.isRequired,
  };

export function EnvironmentLoad() {
  return (
    <Environment
      files="/assets/environment/brown_photostudio_02_1k.hdr"
      background={false}
    />
  );
}

// Function to add lights
export function SceneLights() {
  return (
    <>
      <ambientLight intensity={2} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
      <pointLight position={[-5, 5, 5]} intensity={0.8} />
    </>
  );
}


export const loadTexture = (url, onLoad) => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      url,
      (texture) => {
        if (onLoad) onLoad(texture);
      },
      () => {
        console.log("Loading texture...");
      },
      (error) => {
        console.error("Error loading texture:", error);
      }
    );
  };
