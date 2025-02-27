/* eslint-disable react/prop-types */

import { useState, useRef, useEffect } from "react";
import { ChromePicker } from "react-color";

export default function Colorset({ onColorSelect }) {
  const [color, setColor] = useState("#A673FF");
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);

  // Handle color selection
  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
    onColorSelect(newColor.hex); // Send color to parent
  };

  // Toggle picker visibility
  const togglePicker = () => setShowPicker((prev) => !prev);

  // Close picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    }

    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPicker]);

  return (
    <div className="relative" ref={pickerRef}>
      {/* Color Picker Button with Image Background */}
      <div
        className={`w-10 h-10 rounded-full border border-white cursor-pointer transition hover:scale-110 ${
          showPicker ? "ring-2 ring-[#A673FF]" : ""
        }`}
        onClick={togglePicker}
        style={{
          backgroundImage: "url('/assets/texture/custom.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Color Picker Popup */}
      {showPicker && (
        <div className="absolute top-12 left-0 z-50 shadow-lg bg-white p-2 rounded-lg">
          <ChromePicker color={color} onChange={handleColorChange} />
        </div>
      )}
    </div>
  );
}
