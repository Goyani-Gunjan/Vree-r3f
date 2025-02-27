/* eslint-disable react/no-unknown-property */
import { useGLTF, Environment, Html, useProgress } from "@react-three/drei";
import * as THREE from "three";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export function Model({ onModelLoaded }) {
  // eslint-disable-next-line no-unused-vars
  const { progress } = useProgress();
  const [loading, setLoading] = useState(true);

  const { scene } = useGLTF("/assets/glbs/sampleModel.glb");

  useEffect(() => {
    if (scene) {
      setTimeout(() => {
        setLoading(false); // Hide loader after 2 seconds
        if (onModelLoaded) onModelLoaded(scene);
      }, 1000);
    }
  }, [scene, onModelLoaded]);

  return (
    <>
      {loading && (
        <Html center>
          <div style={{ textAlign: "center", color: "#fff" }}>
            <img
              src="/assets/icons/loader.svg"
              alt="Loading..."
              width="280"
              height="280"
            />
            <p>Loading: </p>
          </div>
        </Html>
      )}

      {!loading && scene && (
        <primitive object={scene} scale={1.5} position={[0, -0.2, 0]} />
      )}
    </>
  );
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
