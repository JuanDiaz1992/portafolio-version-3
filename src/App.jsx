import "./App.css";
import Home from "./pages/Home";
import MarcoCinematico from "./components/MarcoCinematico";
import { useEffect } from "react";
import { Lenis } from "lenis/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ColorPicker from "./components/ColorPicker";

function App() {
  const reducirMovimiento =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lenisOptions = {
    lerp: 0.1,
    duration: 1.2,
    smoothWheel: true,
    wheelMultiplier: 1.0,
    smoothTouch: false,
    infinite: false,
  };
  useEffect(() => {
    // 1. Asegura que la página siempre empiece arriba al cargar
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    let initialWidth = window.innerWidth;
    let resizeTimer;

    const handleResize = () => {
      // Ignora el resize solo vertical (barra de direcciones en móviles)
      if (window.innerWidth !== initialWidth) {
        initialWidth = window.innerWidth;
        clearTimeout(resizeTimer);

        // Recalcula los ScrollTrigger sin recargar ni perder la posición
        resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 300);
      }
    };

    window.addEventListener("resize", handleResize);

    // Limpieza de eventos al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);
  const contenido = (
    <>
      <Home />
      <MarcoCinematico />
      <ColorPicker />
    </>
  );

  // Con movimiento reducido se usa el scroll nativo, sin suavizado de Lenis
  return reducirMovimiento ? (
    contenido
  ) : (
    <Lenis root options={lenisOptions}>
      {contenido}
    </Lenis>
  );
}

export default App;
