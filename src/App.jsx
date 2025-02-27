import Navbar from "./Component/Navbar";
import RightSide from "./Component/RightSide";
import CanvasContainer from "./Component/Canvas";

function App() {
  return (
    <>
      <CanvasContainer className="absolute inset-0" />
      <Navbar className="absolute top-0 left-[20%] z-10" />
      <RightSide className="absolute top-0 right-0" />
    </>
  );
}

export default App;
