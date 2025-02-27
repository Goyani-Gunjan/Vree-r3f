/* eslint-disable react/prop-types */
function Texture({ selectedTexture, handleClick }) {
  return (
    <div className="flex flex-wrap gap-8 w-[500px] max-w-lg ">
      <div
        className={`w-10 h-10 rounded-full bg-[url('/assets/texture/null_image.svg')] bg-cover  ml-3 mr-3 hover:scale-117 transition ${
          selectedTexture === "/assets/texture/null_image.svg"
            ? "ring-4 ring-[#A673FF] shadow-[0_0_25px_8px_rgba(166,115,255,0.5)] opacity-100"
            : ""
        } `}
        onClick={() => handleClick("/assets/texture/null_image.svg")}
      ></div>
      <div
        className={`w-10 h-10 rounded-full bg-[url('/assets/texture/original.jpg')] bg-cover  ml-3 mr-3 hover:scale-117 transition ${
          selectedTexture === "/assets/texture/original.jpg"
            ? "ring-4 ring-[#A673FF] shadow-[0_0_25px_8px_rgba(166,115,255,0.5)] opacity-100"
            : ""
        }`}
        onClick={() => handleClick("/assets/texture/original.jpg")}
      ></div>
      <div
        className={`w-10 h-10 rounded-full bg-[url('/assets/texture/texture1.png')] bg-cover  ml-3 mr-3 hover:scale-117 transition ${
          selectedTexture === "/assets/texture/texture1.png"
            ? "ring-4 ring-[#A673FF] shadow-[0_0_25px_8px_rgba(166,115,255,0.5)] opacity-100"
            : ""
        }`}
        onClick={() => handleClick("/assets/texture/texture1.png")}
      ></div>
      <div
        className={`w-10 h-10 rounded-full bg-[url('/assets/texture/texture3.jpg')] bg-cover  ml-3 mr-3 hover:scale-117 transition ${
          selectedTexture === "/assets/texture/texture3.jpg"
            ? "ring-4 ring-[#A673FF] shadow-[0_0_25px_8px_rgba(166,115,255,0.5)] opacity-100"
            : ""
        }`}
        onClick={() => handleClick("/assets/texture/texture3.jpg")}
      ></div>
    </div>
  );
}

export default Texture;
