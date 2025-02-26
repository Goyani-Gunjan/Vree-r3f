import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";

export function setupOutline(renderer, scene, camera, objects ) {
  if (!renderer || !scene || !camera || !objects || objects.length === 0) {
    console.error("Missing essential components for outline setup.");
    return null;
  }

  renderer.autoClear = false;  // Prevents Three.js from clearing the frame buffer every frame.

  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  const outlinePass = new OutlinePass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    scene,
    camera
  );
  composer.addPass(outlinePass);

  outlinePass.selectedObjects = objects;
  outlinePass.visibleEdgeColor.set(0xffffff);
  outlinePass.hiddenEdgeColor.set(0xfefefe);
  outlinePass.edgeStrength = 15.0;
  outlinePass.outlineThickness = 2;
  outlinePass.outlinePulse = 0;
  outlinePass.usePatternTexture = false;
 outlinePass.renderToScreen = false


  // Fix outline rendering issues
  objects.forEach((obj) => {
    obj.renderOrder = 999;
    if (obj.material) {
      obj.material.depthWrite = true;
      obj.material.depthTest = true;
      obj.material.needsUpdate = true;
  
    }
  });

  console.log("Outline Pass Objects:", outlinePass.selectedObjects);

  return { composer, outlinePass };
}