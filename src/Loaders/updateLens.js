/* eslint-disable react/prop-types */
// import UpdateBase from "./updateBase";
// import { reaction } from "mobx";
// import lens from "../Stores/Lens";
// import { createLabel } from "./labelManager";

// class UpdateLens extends UpdateBase {
//   constructor(model, camera, renderer, lensButton, scene, controls) {
//     super(model, camera, renderer, scene, controls);
//     this.leftLens = null;
//     this.rightLens = null;
//     this.lensButton = lensButton;
//     this.init();
//   }

//   init() {
//     if (!this.model) return;

//     this.model.traverse((child) => {
//       if (child.isMesh) {
//         if (child.name === "left_lens") {
//           this.leftLens = child;
//           console.log("Found left lens mesh", this.leftLens);
//         }
//         if (child.name === "right_lens") {
//           this.rightLens = child;
//           console.log("Found right lens mesh", this.rightLens);
//         }
//       }
//     });

//     if (this.leftLens && this.rightLens) {
//       const lensLabel = createLabel("Lenses");
//       lensLabel.position.set(-0.5, 0, 0);
//       this.leftLens.add(lensLabel);


//       // this.initOutline([this.leftLens, this.rightLens]);



//       [this.leftLens, this.rightLens].forEach((lens) => {
//         lens.renderOrder = 999; // Ensures outline appears on top
//         if (lens.material) {
//           lens.material.depthWrite = false; // Prevents depth buffer issues
//           lens.material.depthTest = true;
//           lens.material.needsUpdate = true;
//         }
//       });
//     }

//     this.setupReaction();
//   }

//   setupReaction() {
//     reaction(
//       () => ({
//         color: lens.lensColor,
//         transparency: lens.lensTransparency,
//       }),
//       ({ color, transparency }) => {
//         [this.leftLens, this.rightLens].forEach((lens) => {
//           if (lens && lens.material) {
//             lens.material.color.set(color || "#ffffff");
//             lens.material.transparent = transparency > 0;
//             lens.material.opacity = 1 - (transparency ?? 0);
//             lens.material.needsUpdate = true;
//           }
//         });
//       }
//     );
//   }
// }

// export default UpdateLens;

// import * as THREE from 'three'
import { useEffect, useRef} from "react";
import { useThree , useFrame } from "@react-three/fiber";
import { reaction } from "mobx";
import { setupOutline } from "./outlineHelper"; // Import the outline function
import lens from "../Stores/Lens";
import { createLabel, createLabelRenderer, renderLabels } from "./labelManager";

const UpdateLens = ({ model }) => {
  const labelRendererRef = useRef(null);
  const composerRef = useRef(null);
  const outlinePassRef = useRef(null); // Store outlinePass
  const { scene, camera , gl: renderer } = useThree();



  useEffect(() => {
    if (!model) return;

    

    let leftLens = null;
    let rightLens = null;
    let lensLabel = null;

    // Initialize label renderer if not already
    if (!labelRendererRef.current) {
      labelRendererRef.current = createLabelRenderer();
      document.body.appendChild(labelRendererRef.current.domElement);
    }

    model.traverse((child) => {
      if (child.isMesh) {
        if (child.name === "left_lens") leftLens = child;
        if (child.name === "right_lens") rightLens = child;
      }
    });

    if (leftLens) {
      lensLabel = createLabel("Lenses");
      lensLabel.position.set(-0.5, 0, 0);
      leftLens.add(lensLabel);
    }

     // Setup Outline Effect
     if (!composerRef.current) {
      console.log("Detected lenses:", leftLens, rightLens);

      const { composer ,  outlinePass } = setupOutline(renderer, scene, camera, [leftLens, rightLens]);
      composerRef.current = composer;
      outlinePassRef.current = outlinePass;

        // Debug: Check if outlinePass has objects
        console.log("OutlinePass Objects:", outlinePass.selectedObjects);
    }

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

         // Debug: Check if outlinePass is active
         if (outlinePassRef.current) {
          outlinePassRef.current.selectedObjects = [leftLens, rightLens].filter(Boolean);
          console.log("Updated Outline Pass:", outlinePassRef.current.selectedObjects);
        }
      }
    );

      // Animate labels and outline rendering
      const animate = () => {
        if (labelRendererRef.current) {
          renderLabels(labelRendererRef.current, scene, camera);
        }
   
        requestAnimationFrame(animate);
      };
      animate();

 
      

    return () => {
      disposeReaction();
      if (lensLabel) leftLens?.remove(lensLabel);
      if (labelRendererRef.current) {
        labelRendererRef.current.domElement.remove(); // Cleanup renderer
        labelRendererRef.current = null;
      }composerRef.current = null;
      outlinePassRef.current = null;
    };
  }, [model, scene, camera]);
  useFrame(() => {
    if (composerRef.current) {
      composerRef.current.render();
      console.log("Rendering outline pass...");
    }
  });

  return null;
};

export default UpdateLens;



