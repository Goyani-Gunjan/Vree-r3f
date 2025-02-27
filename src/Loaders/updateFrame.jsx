import { useEffect } from "react";
import PropTypes from "prop-types";
import { reaction } from "mobx";
import frameStore from "../Stores/FrameStore";
import { loadTexture } from "./Model";
import generalStore from "../Stores/GeneralStore";
import LensLabel from "./LensLabel";

const UpdateFrame = ({ model }) => {
  useEffect(() => {
    if (!model) return;
    const frameMesh = model.getObjectByName("frame");

    if (!frameMesh) return;

    if (model.children?.[0]?.material?.map) {
      generalStore.setOriginalFrameTexture(model.children[0].material.map);
    }

    const disposeReaction = reaction(
      () => ({
        color: frameStore.frameColor,
        roughness: frameStore.frameRoughness,
        metalness: frameStore.frameMetalness,
        transparency: frameStore.frameTransparency,
        texture: frameStore.frameTexture,
      }),
      ({ color, roughness, metalness, transparency, texture }) => {
        if (!frameMesh.material) return;

        frameMesh.material.color.set(color || "#ffffff");
        frameMesh.material.roughness = roughness ?? 0.5;
        frameMesh.material.metalness = metalness ?? 0;
        frameMesh.material.transparent = transparency > 0;
        frameMesh.material.opacity = 1 - (transparency ?? 0);

        if (texture) {
          loadTexture(texture, (loadedTexture) => {
            frameMesh.material.map =
              texture === "/assets/texture/original.jpg"
                ? generalStore.originalFrameTexture
                : loadedTexture;
            frameMesh.material.map.needsUpdate = true;
            frameMesh.material.needsUpdate = true;
          });
        } else {
          frameMesh.material.map = null;
          frameMesh.material.needsUpdate = true;
        }
      }
    );

    return () => disposeReaction();
  }, [model]);

  return model ? <LensLabel name="Frame" position={[0, 0, 0]} /> : null;
};

UpdateFrame.propTypes = {
  model: PropTypes.object.isRequired,
};

export default UpdateFrame;
