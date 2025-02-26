import { makeObservable, observable, action } from "mobx";

class FrameStore {
  frameColor = "#FFFFFF"; 
  frameTexture = '/assets/texture/original.jpg';
  frameMetalness = 0.2; 
  frameRoughness = 0.1; 
  frameTransparency = 0;
   

  constructor() {
    makeObservable(this, {
      frameColor: observable,
      frameTexture: observable,
      frameMetalness: observable,
      frameRoughness: observable,
      frameTransparency: observable,
    
      setFrameColor: action,
      setFrameTexture: action,
      setFrameMetalness: action,
      setFrameRoughness: action,
      setFrameTransparency: action,
    });
  }
  setFrameColor(color) {
    this.frameColor = color;
  }
  setFrameTexture(texture) {
    this.frameTexture = texture;
  }
  setFrameMetalness(metalness) {
    this.frameMetalness = metalness;
  }
  setFrameRoughness(roughness) {
    this.frameRoughness = roughness;
  }
  setFrameTransparency(transparency) {
    this.frameTransparency = transparency;
  }
}

const frameStore = new FrameStore();
export default frameStore;