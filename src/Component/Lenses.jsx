import Heading from "./Heading";
import Color from "./Color";
import Scroll from "./Scroll";
import lens from '../Stores/Lens'
import { observer } from "mobx-react-lite";


function Lenses() {
  return (
    <div>
      <div className="pt-5 px-5">
        <Heading title="Color" />
        <Color
          handleClick={(color) => {
            lens.setLensColor(color);
          }}
          selectedColor={lens.lensColor}
        />
      </div>
      <div className="p-5 mt-5 ">
        <Heading title="Material Properties" />
        <div className="flex allign-center w-full">
          <label className="mt-[30px] mr-9">Transparency</label>
          <Scroll
            className="flex-grow"
            value={lens.lensTransparency}
            onChange={(newValue) => lens.setLensTransparency(newValue)}
          />
        </div>
      </div>
    </div>
  );
}

export default observer(Lenses);