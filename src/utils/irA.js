import { ScrollTrigger } from "gsap/ScrollTrigger";

// Desplaza hasta una sección por id. Si la sección aún no se cargó
// (carga diferida por scroll), pide cargarlas todas y espera a que exista.
export function irA(id) {
  const ir = () => {
    const el = document.getElementById(id);
    if (!el) return false;
    el.scrollIntoView();
    ScrollTrigger.refresh();
    return true;
  };

  if (ir()) return;

  window.dispatchEvent(new Event("cargar-secciones"));
  let intentos = 0;
  const timer = setInterval(() => {
    if (ir() || ++intentos > 30) {
      clearInterval(timer);
      // Segundo ajuste cuando terminan de entrar imágenes y alturas
      setTimeout(ir, 1200);
    }
  }, 150);
}
