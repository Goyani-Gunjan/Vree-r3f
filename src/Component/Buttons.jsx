import { IoMdSave } from "react-icons/io";
import { RiResetRightFill } from "react-icons/ri";
import frameStore from "../Stores/FrameStore";
import lensStore from "../Stores/Lens";
import templeStore from "../Stores/TempleStore";

const data = {
  "glbUrl": "./assets/glbs/sampleModel.glb",
  "groups":[
    {
      "displayName": "Frame",
      "meshNode":["frame"],
      "selectedTexture":frameStore.frameTexture,
      "selectedColor":frameStore.frameColor,
      "Metalness":frameStore.frameMetalness,
      "Roughness":frameStore.frameRoughness,
      "Transparency":frameStore.frameTransparency,
    },
    {
      "displayName":"Temple",
      "meshNode":["left_temple", "right_temple"],
      "selectedTexture":templeStore.templeTexture,
      "selectedColor":templeStore.templeColor,
      "Metalness":templeStore.templeMetalness,
      "Roughness":templeStore.templeRoughness,
      "transparency ":templeStore.templeTransparency,
    },
    {
      "displayName":"Lenses",
      "meshNode":["left_lens", "right_lens"],
      "selectedTexture":lensStore.lensTexture,
      "selectedColor":lensStore.lensColor,
      "Transparency":lensStore.lensTransparency,
    }
  ],
  "textures": [
    "original.jpg",
    "texture1.png",
    "texture2.jpg",
    "texture3.jpg"
  ],
  "Colors":[
    "#FFFFFF",
    "#D5BC93",
    "#AC252B",
    "#185848",
    "#025D98",
    "#D2A693",
    "Custom"
  ]
}

function Buttons() {

  const handleReset =()=>{
          frameStore.setFrameColor("#FFFFFF")
          frameStore.setFrameTexture('/assets/texture/original.jpg')
          frameStore.setFrameMetalness(0.2)
          frameStore.setFrameRoughness(0.1)
          frameStore.setFrameTransparency(0)
          lensStore.setLensColor("#FFFFFF")
          lensStore.setLensTransparency(0.8)
          templeStore.setTempleColor('#FFFFFF')
          templeStore.setTempleTexture('/assets/texture/original.jpg')
          templeStore.setTempleMetalness(0.1)
          templeStore.setTempleRoughness(0.2)
          templeStore.setTempleTransparency(0.3)
  }

  const handleSave = () =>{
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "saved_customization.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return (
    <div className="flex w-full gap-2">
     
      <button className="flex items-center justify-center w-1/2 p-3 text-[#A673FF] border border-gray-400 font-semibold rounded-md hover:scale-104 transition" onClick={handleReset}>
        <RiResetRightFill className="mr-2 text-lg" />
        <span>Reset</span>
      </button>

      <button className="flex items-center justify-center w-1/2 p-3 bg-transparent text-[#A673FF] font-semibold rounded-md border-1 hover:scale-104 transition" onClick={handleSave}>
        <IoMdSave className="mr-2 text-lg" />
        <span>Save</span>
      </button>
    </div>
  );
}

export default Buttons;