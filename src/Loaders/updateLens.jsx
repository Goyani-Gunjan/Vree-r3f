/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { reaction } from "mobx";
import lens from "../Stores/Lens";
import LensLabel from "./LensLabel"; 

const UpdateLens = ({ model }) => {
  useEffect(() => {
    if (!model) return;

    let leftLens = null;
    let rightLens = null;

    // Find lenses in the model
    model.traverse((child) => {
      if (child.isMesh) {
        if (child.name === "left_lens") leftLens = child;
        if (child.name === "right_lens") rightLens = child;
      }
    });

    // Reaction to update lenses dynamically when user changes data
    const disposeReaction = reaction(
      () => ({
        color: lens.lensColor,
        transparency: lens.lensTransparency,
      }),
      ({ color, transparency }) => {
        [leftLens, rightLens].forEach((lens) => {
          if (lens?.material) {
            lens.material.color.set(color || "#ffffff");
            lens.material.transparent = transparency > 0;
            lens.material.opacity = 1 - (transparency ?? 0);
            lens.material.needsUpdate = true;
          }
        });
      }
    );

    return () => disposeReaction();
  }, [model]);

  return model ? <LensLabel name="Lenses" position={[-1, 0, 0]} /> : null;
};
export default UpdateLens;
