import { Html } from "@react-three/drei";
import { useState, useEffect } from "react";
import { reaction } from "mobx";
import generalStore from "../Stores/GeneralStore";
import PropTypes from "prop-types";

const Label = ({ name, position }) => {
  const [selected, setSelected] = useState(generalStore.selectedCard === name);

  useEffect(() => {
    const disposeReaction = reaction(
      () => generalStore.selectedCard,
      (selectedCard) => {
        setSelected(selectedCard === name);
      }
    );

    return () => disposeReaction();
  }, []);

  const handleClick = () => {
    generalStore.setSelectedCard(name);
  };

  return (
    <Html position={position} center>
      <label
        className={`flex items-center gap-2 px-3 py-1 rounded-full border-2 cursor-pointer transition-all
          ${selected ? "bg-purple-500 border-white text-white" : "bg-purple-900 border-purple-400 text-gray-200"}
        `}
      >
        <input
          type="radio"
          name="label"
          className="hidden"
          checked={selected}
          onChange={handleClick}
        />
        <div
          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center 
            ${selected ? "border-white" : "border-gray-400"}
          `}
        >
          {selected && <div className="w-2 h-2 bg-white rounded-full"></div>}
        </div>
        {name}
      </label>
    </Html>
  );
};

Label.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.array.isRequired, // Example: [x, y, z]
};

export default Label;
