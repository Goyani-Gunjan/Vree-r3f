import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Model, EnvironmentLoad, SceneLights } from "../Loaders/Model";
import { Suspense, useState } from "react";
import { ShadowPlane } from "./ShadowPlane";
import SceneSetup from "./SceneSetup"; // Ensure this file exists


function CanvasContainer() {
  const [loadedModel, setLoadedModel] = useState(null);


  return (
    <Canvas
      camera={{ near: 0.1, far: 1000, position: [0, 0, 4] }}
      style={{
        width: window.innerWidth * 0.6,
        height: window.innerHeight,
        overflow: "hidden",
        display: "block",
      }}
    >
      <Suspense fallback={null}>
       {/* Model renders itself, and SceneSetup updates it */}
       <Model onModelLoaded={setLoadedModel} />
        {loadedModel && <SceneSetup model={loadedModel} />}
        <EnvironmentLoad />
        <SceneLights />
        <ShadowPlane />
      </Suspense>

      <OrbitControls />
    </Canvas>
  );
}

export default CanvasContainer;
