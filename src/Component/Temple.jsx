import Title from "./Title";
import Color from "./Color";
import Scroll from "./Scroll";
import Texture from "./Texture";
import templeStore from "../Stores/TempleStore";
import { observer } from "mobx-react-lite";

function Temple() {
  return (
    <div>
      <div className="pt-5 px-5">
        <Title title="Texture" />
        <Texture
          handleClick={(texture) => templeStore.setTempleTexture(texture)}
          selectedTexture={templeStore.templeTexture}
        />
      </div>
      <div className="pt-5 px-5">
        <Title title="Color" />
        <Color
          handleClick={(color) => {
            templeStore.setTempleColor(color);
          }}
          selectedColor={templeStore.templeColor}
        />
      </div>
      <div className="p-5 mt-5 ">
        <Title title="Material Properties" />
        <div className="flex allign-center w-full">
          <label className="mt-[30px] mr-9">Metallic</label>
          <Scroll
            className="flex-grow"
            value={templeStore.templeMetalness}
            onChange={(newValue) => templeStore.setTempleMetalness(newValue)}
          />
        </div>
        <div className="flex allign-center w-full">
          <label className="mt-[30px] mr-9">Roughness</label>
          <Scroll
            className="flex-grow"
            value={templeStore.templeRoughness}
            onChange={(newValue) => templeStore.setTempleRoughness(newValue)}
          />
        </div>
        <div className="flex allign-center w-full">
          <label className="mt-[30px] mr-9">Transparency</label>
          <Scroll
            className="flex-grow"
            value={templeStore.templeTransparency}
            onChange={(newValue) => templeStore.setTempleTransparency(newValue)}
          />
        </div>
      </div>
    </div>
  );
}

export default observer(Temple);
