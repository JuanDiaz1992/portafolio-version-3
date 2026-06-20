import Section1 from "../components/homeComponentes/Section1";
import Section2 from "../components/homeComponentes/Section2";
import { Curtains } from "react-curtains";

export default function Home() {
  return (
    <>
      <Section1 />
      <Curtains
        pixelRatio={Math.min(1.5, window.devicePixelRatio)}
        autoRender={true}
        className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-10"
      >
        <Section2 />
      </Curtains>
    </>
  );
}
