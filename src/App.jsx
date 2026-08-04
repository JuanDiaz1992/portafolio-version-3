import "./App.css";
import Home from "./pages/Home";
import MarcoCinematico from "./components/MarcoCinematico";
import { useEffect } from "react";
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
  useEffect(() => {
    // 1. Asegura que la página siempre empiece arriba al cargar
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    let initialWidth = window.innerWidth;
    let resizeTimer;

    const handleResize = () => {
      // Evita recargar si el resize fue solo vertical (común en navegadores móviles al ocultar la barra de direcciones)
      if (window.innerWidth !== initialWidth) {
        clearTimeout(resizeTimer);

        // Espera 300ms después de que el usuario deje de cambiar el tamaño de la pantalla
        resizeTimer = setTimeout(() => {
          window.scrollTo(0, 0); // Vuelve arriba
          window.location.reload(); // Recarga la página
        }, 300);
      }
    };

    window.addEventListener("resize", handleResize);

    // Limpieza de eventos al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);
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
