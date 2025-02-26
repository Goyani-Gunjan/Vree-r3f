import { useState,useEffect } from "react";
import Frame from "./Frame";
import Temple from "./Temple";
import Lenses from "./Lenses";
import Buttons from "./Buttons";
import { observer } from "mobx-react-lite";
import generalStore from "../Stores/GeneralStore";

const cards = [
  { name: "Frame", component: <Frame /> },
  { name: "Temple", component: <Temple /> },
  { name: "Lenses", component: <Lenses /> },
];
function RightSide() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const selectedIndex = cards.findIndex(
      (card) => card.name === generalStore.selectedCard
    );
    if (selectedIndex !== -1) {
      setCurrentIndex(selectedIndex);
    }
  }, [generalStore.selectedCard]);

  // Calculate left and right indices
  const getLeftIndex = () => (currentIndex - 1 + cards.length) % cards.length;
  const getRightIndex = () => (currentIndex + 1) % cards.length;

  return (
    <div className="flex flex-col items-center justify-center w-[37%] bg-[url('/assets/background/sidebarbg.png')]  m-0 mx-4 mb-20 p-4 px-[14px] rounded-lg bg-cover bg-center bg-no-repeat bg-local border border-gray-400 w-1/3 overflow-x-hidden  absolute right-5 top-[80px] z-10 h-[80%] ">
      <div className="flex justify-between space-x-6 w-full cursor-pointer text-lg font-bold mx-2 p-2 border-b-1 border-[#A673FF]">
        <div
          className="text-gray-400 hover:scale-115 transition"
          onClick={() => {
            const newIndex = getLeftIndex(); // Get the new index first
            setCurrentIndex(newIndex);
            generalStore.setSelectedCard(cards[newIndex].name); // Update store with new index
          }}
        >
          {cards[getLeftIndex()].name}
        </div>
        <div className="text-gray-400 hover:scale-115 transition">
          {cards[currentIndex].name}
        </div>

        <div
          className="text-gray-400 hover:scale-115 transition"
          onClick={() => {
            const newIndex = getRightIndex(); // Get the new index first
            setCurrentIndex(newIndex);
            generalStore.setSelectedCard(cards[newIndex].name); // Update store with new index
          }}
        >
          {cards[getRightIndex()].name}
        </div>
      </div>
      <div
        className="h-[80%] w-full border-b-1 border-gray-400 mb-5 overflow-y-auto
"
      >
        {cards[currentIndex].component}
      </div>

      <Buttons />
    </div>
  );
}

export default observer(RightSide);