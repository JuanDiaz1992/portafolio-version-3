import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useColor } from "../../context/ColorContext";

export default function Section2() {
  const containerRef = useRef(null);
  const { colorPrincipal } = useColor();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const xTextoAtras = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  const xTextoAdelante = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-neutral-900 overflow-hidden mt-12.5"
    >
      <img
        src="/img/juan-1.webp"
        alt="Fondo setup"
        className="absolute inset-0 w-full h-full object-cover object-top z-0"
      />

      <div className="absolute inset-0 z-10 flex items-end justify-start p-8 md:p-16 pointer-events-none">
        <motion.h2
          style={{ x: xTextoAtras, color: colorPrincipal }}
          className="text-[15vw] font-bold opacity-80 tracking-tighter leading-none whitespace-nowrap"
        >
          Good design
        </motion.h2>
      </div>

      <img
        src="/img/juan-2.webp"
        alt="Juan silueta"
        className="absolute inset-0 w-full h-full object-cover object-top z-20"
      />

      <div className="absolute inset-0 mix-blend-multiply opacity-40 z-30 pointer-events-none" style={{backgroundColor: colorPrincipal}} />

      <div className="absolute inset-0 z-40 flex items-start justify-end p-8 md:p-16 pointer-events-none">
        <motion.h1
          style={{ x: xTextoAdelante, color: colorPrincipal }}
          className="text-[12vw] font-bold tracking-tighter leading-none whitespace-nowrap"
        >
          takes time
        </motion.h1>
      </div>
    </div>
  );
}
