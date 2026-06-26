import "./App.css";
import Home from "./pages/Home";
import MarcoCinematico from "./components/MarcoCinematico";
import { Lenis } from "lenis/react";

function App() {
  const lenisOptions = {
    lerp: 0.1,
    duration: 1.2,
    smoothWheel: true,
    wheelMultiplier: 1.0,
    smoothTouch: false,
    infinite: false,
  };
  return (
    <>
      <Lenis root options={lenisOptions}>
        <Home />
        <MarcoCinematico />
      </Lenis>
    </>
  );
}

export default App;
