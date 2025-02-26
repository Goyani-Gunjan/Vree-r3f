import { useState, useEffect } from "react";

function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
     // Check local storage first
     const savedTheme = localStorage.getItem("darkMode");
     if (savedTheme !== null) return JSON.parse(savedTheme); 
     
     // If no saved theme, check system preference
     return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", true);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", false);
    }
  }, [darkMode]);
  return (
    <div className="flex justify-between absolute top-0 left-0 z-10 w-full">
      <div>
        <img
          src="/assets/logo/logo.svg"
          alt="VREE"
          className="m-2 p-2 w-[80px]"
        />
      </div>
      <div>
        <img
          src={darkMode ? "/assets/icons/sun.png" : "/assets/icons/moon.png"}
          alt="Toggle Theme"
          className="m-2 p-2 w-[60px] cursor-pointer transition-transform duration-300 hover:scale-110"
          onClick={() => setDarkMode((prev) => !prev)}
        />
      </div>
    </div>
  );
}
export default Navbar;
  