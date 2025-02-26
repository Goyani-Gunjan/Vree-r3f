// import UpdateBase from "./updateBase";
// import { reaction } from "mobx";
// import frameStore from "../Stores/FrameStore";
// import { loadTexture } from "./Model";
// import { createLabel } from "./labelManager";
// import generalStore from "../Stores/GeneralStore";

// class UpdateFrame extends UpdateBase {
//   constructor(model, camera, renderer, frameButton, scene, controls) {
//     super(model, camera, renderer, scene, controls);
//     this.frameMesh = model.getObjectByName("frame");
//      generalStore.setOriginalFrameTexture(model.children[0].material.map)
//     console.log("framemesh"  ,this.frameMesh)
//     this.frameButton = frameButton;

//     if (this.frameMesh) {
//       const frameLabel = createLabel("Frame");
//       frameLabel.position.set(0, 0, 0); // Position above the frame
//       // this.frameMesh.add(frameLabel);
//       const frameWithoutChildren = this.frameMesh.clone();
//       frameWithoutChildren.children = [];
//       frameWithoutChildren.position.set(0, 0, 0);
//       frameWithoutChildren.scale.set(2, 2, 2);
//       frameWithoutChildren.add(frameLabel);  // Add the label to the frame mesh
//       // this.scene.add(frameWithoutChildren);
//       // this.initOutline([frameWithoutChildren]);
//       this.setupReactions();
//     } else {
//       console.error("Frame mesh not found in the model.");
//     }
//   }

//   setupReactions() {
//     reaction(
//       () => ({
//         color: frameStore.frameColor,
//         roughness: frameStore.frameRoughness,
//         metalness: frameStore.frameMetalness,
//         transparency: frameStore.frameTransparency,
//         texture: frameStore.frameTexture,
//       }),
//       ({ color, roughness, metalness, transparency, texture }) => {
//         if (!this.frameMesh.material) return;

//         console.log("Applying updates to frameMesh:", {
//           color,
//           roughness,
//           metalness,
//           transparency,
//           texture,
//         });

//         this.frameMesh.material.color.set(color || "#ffffff");
//         this.frameMesh.material.roughness = roughness ?? 0.5;
//         this.frameMesh.material.metalness = metalness ?? 0;
//         this.frameMesh.material.transparent = transparency > 0;
//         this.frameMesh.material.opacity = 1 - (transparency ?? 0);

//         if (texture) {
//           console.log("Loading new texture:", texture);

//           loadTexture(texture, (loadedTexture) => {

//             if (!loadedTexture) {
//               console.error("Failed to load texture:", texture);
//               return;
//             }

//             console.log("Texture loaded successfully:", loadedTexture);

//             this.frameMesh.material.map =
//             texture === '/assets/texture/original.jpg'? generalStore.originalFrameTexture :  loadedTexture; 
//             this.frameMesh.material.map.needsUpdate = true;
//             this.frameMesh.material.needsUpdate = true;
//               // Force R3F to update (ensures React-Three-Fiber re-renders)
//           this.renderer.render(this.scene, this.camera);
//           });
//         } else {
//           console.log("Removing texture, using color only.");
//           this.frameMesh.material.map = null;
//           this.frameMesh.material.needsUpdate = true;
//           this.renderer.render(this.scene, this.camera); // Force update
//         }

//       }
//     );
//   }
// }

// export default UpdateFrame;

import { useEffect } from "react";
import PropTypes from "prop-types";
import { reaction } from "mobx";
import frameStore from "../Stores/FrameStore";
import { loadTexture } from "./Model";
import generalStore from "../Stores/GeneralStore";
import { createLabel } from "./labelManager";

const UpdateFrame = ({ model }) => {
  useEffect(() => {
    if (!model) return;
    const frameMesh = model.getObjectByName("frame");
    if (!frameMesh) return;

    if (model.children?.[0]?.material?.map) {
      generalStore.setOriginalFrameTexture(model.children[0].material.map);
    }

    const frameLabel = createLabel("Frame");
    frameLabel.position.set(0, 0, 0);
    frameMesh.add(frameLabel);

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

  return null;
};

UpdateFrame.propTypes = {
  model: PropTypes.object.isRequired,
};

export default UpdateFrame;
