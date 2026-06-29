import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useColor } from "../../context/ColorContext";
import AlDiaSlider from "./Sliders/AlDiaSlider";
import FoodEasySlider from "./Sliders/FoodEasy";
import AquaMovilSlider from "./Sliders/AquaMovilSlider";

export default function Section4() {
  const targetRef = useRef(null);
  const { setIntensidadMarco } = useColor();

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.05 && latest < 0.95) {
      setIntensidadMarco(0);
    } else {
      setIntensidadMarco(1);
    }
  });

  const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <section
      ref={targetRef}
      className="relative h-auto md:h-[400vh] bg-black text-white z-40 py-20 md:py-0"
    >
      <div className="relative md:sticky top-0 h-auto md:h-screen w-full flex flex-col md:flex-row items-center overflow-visible md:overflow-hidden">
        <motion.div
          style={{
            x:
              typeof window !== "undefined" && window.innerWidth >= 768
                ? xTransform
                : 0,
            z: 0,
          }}
          className="flex flex-col md:flex-row gap-12 px-6 md:px-16 w-full md:w-auto will-change-transform transform-gpu"
        >
          <div className="w-full md:w-[75vw] lg:w-[40vw] h-auto md:h-[75vh] flex flex-col justify-center shrink-0 mb-6 md:mb-0">
            <span className="font-mono text-xs text-neutral-500 tracking-[0.2em] mb-3 uppercase">
              // INDEX DE PROYECTOS
            </span>
            <h2 className="text-4xl md:text-8xl font-bold font-['Antonio',sans-serif] tracking-tight mb-4">
              PROYECTOS
              <br />
              SELECCIONADOS
            </h2>
            <p className="text-neutral-400 text-md  max-w-sm">
              Una muestra curada de aplicaciones web y plataformas móviles
              desarrolladas enfocadas en el rendimiento, arquitectura robusta y
              UX cinemático.
            </p>
          </div>
          {/* PROYECTO 3 */}
          <div className="w-full md:w-[60vw] lg:w-[60vw] h-[90vh] md:h-[75vh] bg-neutral-900/20 border border-neutral-850 rounded-3xl overflow-hidden shrink-0">
            <AquaMovilSlider />
          </div>

          {/* PROYECTO 1 */}
          <div className="w-full md:w-[60vw] lg:w-[60vw] h-[90vh] md:h-[75vh] bg-neutral-900/20 border border-neutral-850 rounded-3xl overflow-hidden shrink-0">
            <FoodEasySlider />
          </div>

          {/* PROYECTO 2 */}
          <div className="w-full md:w-[60vw] lg:w-[60vw] h-[90vh] md:h-[75vh] bg-neutral-900/20 border border-neutral-850 rounded-3xl overflow-hidden shrink-0">
            <AlDiaSlider />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
