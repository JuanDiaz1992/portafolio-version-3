import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useColor } from "../../context/ColorContext";

export default function Section2() {
  const trackRef = useRef(null);
  const { colorPrincipal } = useColor();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start end", "end start"],
  });

  const xTextoAtras = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5],
    ["-40%", "40%", "40%"],
  );

  const xTextoAdelante = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5],
    ["30%", "-15%", "-15%"],
  );

  const opacityBloque1 = useTransform(
    scrollYProgress,
    [0, 0.25, 0.35, 0.5],
    [1, 1, 0, 0],
  );

  const opacityBloque2 = useTransform(
    scrollYProgress,
    [0, 0.38, 0.48, 0.8],
    [0, 0, 1, 1],
  );

  const yTextoNuevo = useTransform(
    scrollYProgress,
    [0, 0.35, 0.45, 0.8],
    ["40px", "40px", "0px", "0px"],
  );

  const scaleLinea = useTransform(
    scrollYProgress,
    [0, 0.45, 0.75, 0.8],
    [0, 0, 1, 1],
  );

  return (
    <div ref={trackRef} className="relative h-[400vh] mt-10">
      <div className="w-full h-screen bg-neutral-900 overflow-hidden sticky top-0">
        <img
          src="/img/juan-1.webp"
          alt="Fondo setup"
          className="absolute inset-0 w-full h-full object-cover object-[69%_top] md:object-top z-0"
        />

        <div className="absolute bottom-[25%] md:bottom-0 inset-0 z-30 flex items-end justify-start p-6 md:p-16 pointer-events-none">
          <motion.h2
            style={{
              x: xTextoAtras,
              opacity: opacityBloque1,
              color: colorPrincipal,
            }}
            className="text-[15vw] sm:text-[16vw] lg:text-[15vw] font-bold tracking-tighter leading-none whitespace-nowrap will-change-transform"
          >
            Pide calma
          </motion.h2>
        </div>
        <div className="absolute top-[25%] inset-0 flex flex-col items-center justify-center pointer-events-none p-6 md:p-8 text-center w-full z-50 md:z-1 lg:z-50">
          <motion.div
            style={{
              scaleX: scaleLinea,
              backgroundColor: colorPrincipal,
              opacity: opacityBloque2,
            }}
            className="h-px w-[80%] sm:w-full origin-center will-change-transform"
          />
        </div>

        <img
          src="/img/juan-2.webp"
          alt="Juan silueta"
          className="absolute inset-0 w-full h-full object-cover object-[69%_top] md:object-top z-20"
        />

        <div
          className="absolute inset-0 mix-blend-multiply opacity-40 z-30 pointer-events-none"
          style={{ backgroundColor: colorPrincipal }}
        />

        <div className="absolute inset-0 z-10 flex top-[25%] md:top-0 items-start justify-end p-6 md:p-16 pointer-events-none">
          <motion.h3
            style={{
              x: xTextoAdelante,
              opacity: opacityBloque1,
              color: colorPrincipal,
            }}
            className="text-[15vw] sm:text-[13vw] lg:text-[12vw] font-bold tracking-tighter leading-none whitespace-nowrap will-change-transform"
          >
            Buen Desarrollo
          </motion.h3>
        </div>

        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none p-6 md:p-8 text-center w-full">
          <motion.h3
            style={{ y: yTextoNuevo, opacity: opacityBloque2 }}
            className="text-[10vw] sm:text-[8vw] md:text-[6vw] font-extrabold text-white tracking-tight uppercase leading-none max-w-[90%] sm:max-w-full"
          >
            Pero el resultado final
          </motion.h3>
          <motion.p
            style={{
              y: yTextoNuevo,
              opacity: opacityBloque2,
              color: colorPrincipal,
            }}
            className="text-[5vw] sm:text-[4vw] md:text-[5vw] lg:text-[3vw] font-medium tracking-wide mt-4"
          >
            vale cada segundo.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
