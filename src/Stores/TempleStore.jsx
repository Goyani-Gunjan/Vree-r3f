import {  makeAutoObservable , observable, action } from "mobx";

class TempleStore {
  templeColor='#ffffff';
  templeTexture='/assets/texture/original.jpg';
  templeMetalness=0.1;
  templeRoughness=0.2;
  templeTransparency=0.2;

  constructor() {
    makeAutoObservable (this, {
      templeColor: observable,
      templeTexture: observable,
      templeMetalness: observable,
      templeRoughness: observable,
      templeTransparency: observable,
      
      setTempleColor: action,
      setTempleTexture: action,
      setTempleMetalness: action,
      setTempleRoughness: action,
      setTempleTransparency: action,
    });
  }
  setTempleColor(color) {
    console.log("Changing temple color to:", color);
    this.templeColor = color;
  }
  setTempleTexture(texture) {
    console.log("Changing temple texture to:", texture);
    this.templeTexture = texture;
  }
  setTempleMetalness(metalness) {
    this.templeMetalness = metalness;
  }
  setTempleRoughness(roughness) {
    this.templeRoughness = roughness;
  }
  setTempleTransparency(transparency) {
    this.templeTransparency = transparency;
  }

}

const templeStore = new TempleStore();
export default templeStore;