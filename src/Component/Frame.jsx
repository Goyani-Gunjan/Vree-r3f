import Heading from "./Heading";
import Color from "./Color";
import Scroll from "./Scroll";
import Texture from "./Texture";
import { observer } from "mobx-react-lite";
import frameStore from "../Stores/FrameStore";

function Frame() {
  return (
    <div className="w-full">
      <div className="pt-5 px-5 w-[100%]">
        <Heading title="Texture" />
        <Texture
          handleClick={(texture) => {
            frameStore.setFrameTexture(texture);
            console.log("frametexture", frameStore.frameTexture);
          }}
          selectedTexture={frameStore.frameTexture}
        />
      </div>
      <div className="pt-5 px-5">
        <Heading title="Color" />
        <Color
          handleClick={(color) => {
            frameStore.setFrameColor(color);
          }}
          selectedColor={frameStore.frameColor}
        />
      </div>
      <div className="p-5 mt-5 ">
        <Heading title="Material Properties" />
        <div className="flex allign-center w-full">
          <label className="mt-[30px] mr-9">Metallic</label>
          <Scroll
            className="flex-grow"
            value={frameStore.frameMetalness}
            onChange={(newValue) => frameStore.setFrameMetalness(newValue)}
          />
        </div>
        <div className="flex allign-center w-full">
          <label className="mt-[30px] mr-9">Roughness</label>
          <Scroll
            className="flex-grow"
            value={frameStore.frameRoughness}
            onChange={(newValue) => frameStore.setFrameRoughness(newValue)}
          />
        </div>
        <div className="flex allign-center w-full">
          <label className="mt-[30px] mr-9">Transparency</label>
          <Scroll
            className="flex-grow"
            value={frameStore.frameTransparency}
            onChange={(newValue) => frameStore.setFrameTransparency(newValue)}
          />
        </div>
      </div>
    </div>
  );
}

export default observer(Frame);
