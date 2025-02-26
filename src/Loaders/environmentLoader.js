/* eslint-disable react/no-unknown-property */
import { useGLTF } from "@react-three/drei";

export function Model() {
  const gltf = useGLTF("/assets/glbs/sampleModel.glb");

  console.log(" Model Loaded:", gltf); 

  

  return <div><primitive object={gltf.scene} scale={1} position={[0, -1, 0]} /></div>
  ;
}
