import { setupOutline } from "./outlineHelper";

class UpdateBase {
  constructor(model, camera, renderer, scene, controls) {
    this.model = model;
    this.camera = camera;
    this.renderer = renderer;
    this.scene = scene;
    this.controls = controls;
    this.composer = null;
    this.outlinePass = null;

    if (this.controls) {
      this.controls.addEventListener("change", () => this.render());
    }
  }

  initOutline(objects) {
    console.log(" Initializing outline for:", objects.map(obj => obj.name));
    const result = setupOutline(this.renderer, this.scene, this.camera, objects);
    if (!result) {
      console.error(" setupOutline() failed!");
      return;
    }

    this.composer = result.composer;
    this.outlinePass = result.outlinePass;

    if (!this.composer) {
      console.error("No composer found after initialization!");
      return;
    }

    console.log("OutlinePass initialized successfully.");
  }

  render() {
    if (this.composer) {
      console.log("Running composer.render()");
      this.composer.render();
    } else {
      console.error(" No composer found!");
    }
  }
}

export default UpdateBase;