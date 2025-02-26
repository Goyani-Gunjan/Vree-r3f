
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useThree, useFrame } from "@react-three/fiber";
import { reaction } from "mobx";
import templeStore from "../Stores/TempleStore";
import { createLabel } from "./labelManager";
import { loadTexture } from "./Model";
import generalStore from "../Stores/GeneralStore";
import { setupOutline } from "./outlineHelper";

const UpdateTemple = ({ model }) => {
  const { scene, camera, gl } = useThree(); // Get scene, camera, and renderer
  const composerRef = useRef(null); // Store EffectComposer
  const outlinePassRef = useRef(null); // Store OutlinePass

  useEffect(() => {
    if (!model) return;

    let leftTemple = null;
    let rightTemple = null;

    model.traverse((child) => {
      if (child.isMesh) {
        if (child.name === "left_temple") leftTemple = child;
        if (child.name === "right_temple") rightTemple = child;
      }
    });

    if (leftTemple && rightTemple) {
      generalStore.setOriginalTempleTexture(leftTemple.material.map);
      const templeLabel = createLabel("Temple");
      templeLabel.position.set(1, 0.2, -1);
      rightTemple.add(templeLabel);

      // Initialize Outline Effect
      if (!composerRef.current || !outlinePassRef.current) {
        const { composer, outlinePass } = setupOutline(gl, scene, camera, [leftTemple, rightTemple]);

        composerRef.current = composer;
        outlinePassRef.current = outlinePass;
      } else {
        // Update the outline objects dynamically
        outlinePassRef.current.selectedObjects = [leftTemple, rightTemple];
      }
    }

    // React to temple material changes
    const disposeReaction = reaction(
      () => ({
        color: templeStore.templeColor,
        roughness: templeStore.templeRoughness,
        metalness: templeStore.templeMetalness,
        transparency: templeStore.templeTransparency,
        texture: templeStore.templeTexture,
      }),
      ({ color, roughness, metalness, transparency, texture }) => {
        [leftTemple, rightTemple].forEach((temple) => {
          if (temple?.material) {
            temple.material.color.set(color || "#ffffff");
            temple.material.roughness = roughness ?? 0.5;
            temple.material.metalness = metalness ?? 0;
            temple.material.transparent = transparency > 0;
            temple.material.opacity = 1 - (transparency ?? 0);
            temple.material.needsUpdate = true;

            if (texture) {
              loadTexture(texture, (loadedTexture) => {
                temple.material.map =
                  texture === "/assets/texture/original.jpg"
                    ? generalStore.originalTempleTexture
                    : loadedTexture;
                temple.material.needsUpdate = true;
              });
            } else {
              temple.material.map = null;
            }
            temple.material.needsUpdate = true;
            temple.material.dispose();
          }
        });
      }
    );

    return () => disposeReaction();
  }, [model, scene, camera, gl]);

  // Run composer in the render loop
  useFrame(() => {
    if (composerRef.current) {
      composerRef.current.render();
    }
  });

  return null;
};

UpdateTemple.propTypes = {
  model: PropTypes.object.isRequired,
};

export default UpdateTemple;

