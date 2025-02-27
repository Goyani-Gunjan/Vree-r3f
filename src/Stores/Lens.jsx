import { makeObservable, observable, action } from "mobx";

class Lens {
  lensColor = "#FFFFFF";
  lensTransparency = 0.8;

  constructor() {
    makeObservable(this, {
      lensColor: observable,
      lensTransparency: observable,
      setLensColor: action,
      setLensTransparency: action,
    });
  }
  setLensColor(color) {
    this.lensColor = color;
  }
  setLensTransparency(transparency) {
    this.lensTransparency = transparency;
  }
}

const lensStore = new Lens();
export default lensStore;
