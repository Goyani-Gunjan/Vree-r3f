import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import UpdateFrame from "../Loaders/updateFrame";
import UpdateLens from "../Loaders/updateLens";
import UpdateTemple from "../Loaders/updateTemple";
import PropTypes from "prop-types";

function SceneSetup({ model }) {
  const { camera, gl } = useThree();
  const updateLensRef = useRef(null);

  useEffect(() => {
    if (!model) return;

    console.log(" Model received in SceneSetup:", model);

    model.castShadow = true;



    return () => {
      console.log("Cleanup SceneSetup");
    };
  }, [model, camera, gl]);

  useFrame(() => {
    if (updateLensRef.current?.composer) {
      updateLensRef.current.composer.render();
    } 
  });

  return (
     <>
            <UpdateFrame model={model} />   
            <UpdateLens model={model} />
            <UpdateTemple model={model} />
     </>
  )
}

SceneSetup.propTypes = {
  model: PropTypes.object.isRequired,
};

export default SceneSetup;
