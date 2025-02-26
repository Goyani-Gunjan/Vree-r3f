/* eslint-disable react/prop-types */

import Colorset from "./Colorset";

function Color({selectedColor, handleClick }) {
  // const [selectedColor, setSelectedColor] = useState("#FFFFFF");

  // Function to update color (Passed to ColorPicker)
  // const handleColorChange = (color) => {
  //   // setSelectedColor(color);
  //   handleClick(color); // Sends data to the main parent if needed
  // };

  return (
    <div className="flex flex-wrap gap-8 w-[500px] max-w-lg">
      <div
        className={`w-10 h-10 rounded-full border border-white bg-[#FFFFFF] ml-3 mr-3 hover:scale-117 transition ${
          selectedColor === "#FFFFFF" ? "ring-4 ring-[#A673FF] shadow-[0_0_25px_8px_rgba(166,115,255,0.5)] opacity-100" : ""
        }`}
        onClick={() => handleClick("#FFFFFF")}
      ></div>
      <div
        className={`w-10 h-10 rounded-full border border-white bg-[#D5BC93] ml-3 mr-3 hover:scale-117 transition ${
          selectedColor === "#D5BC93" ? "ring-4 ring-[#A673FF] shadow-[0_0_25px_8px_rgba(166,115,255,0.5)] opacity-100" : ""
        }`}
        onClick={() => handleClick("#D5BC93")}
      ></div>
      <div
        className={`w-10 h-10 rounded-full border border-white bg-[#AC252B] ml-3 mr-3 hover:scale-117 transition ${
          selectedColor === "#AC252B" ? "ring-4 ring-[#A673FF] shadow-[0_0_25px_8px_rgba(166,115,255,0.5)] opacity-100" : ""
        }`}
        onClick={() => handleClick("#AC252B")}
      ></div>
      <div
        className={`w-10 h-10 rounded-full border border-white bg-[#0A5848] ml-3 mr-3 hover:scale-117 transition ${
          selectedColor === "#0A5848" ? "ring-4 ring-[#A673FF] shadow-[0_0_25px_8px_rgba(166,115,255,0.5)] opacity-100" : ""
        }`}
        onClick={() => handleClick("#0A5848")}
      ></div>
      <div
        className={`w-10 h-10 rounded-full border border-white bg-[#025D98] ml-3 mr-3 hover:scale-117 transition ${
          selectedColor === "#025D98" ? "ring-4 ring-[#A673FF] shadow-[0_0_25px_8px_rgba(166,115,255,0.5)] opacity-100" : ""
        }`}
        onClick={() => handleClick("#025D98")}
      ></div>
      <div
        className={`w-10 h-10 rounded-full border border-white bg-[#D2A693] ml-3 mr-3 hover:scale-117 transition ${
          selectedColor === "#D2A693" ? "ring-4 ring-[#A673FF] shadow-[0_0_25px_8px_rgba(166,115,255,0.5)] opacity-100" : ""
        }`}
        onClick={() => handleClick("#D2A693")}
      ></div>

      {/* Custom Color Picker - Receives Function to Pass Data */}
      <Colorset onColorSelect={handleClick} onClick={()=>handleClick()}/>
    </div>
  );
}

export default Color;