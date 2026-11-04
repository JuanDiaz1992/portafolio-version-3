import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useColor } from "../../context/ColorContext";

gsap.registerPlugin(ScrollTrigger);

export default function Section2() {
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const { colorPrincipal } = useColor();

  useGSAP(
    () => {
      // Timeline con duración total fija de 1 para representar progresos de 0 a 1 (0% a 100%)
      const tl = gsap.timeline({
        duration: 1,
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top bottom", // Equivale al offset ["start end", "end start"] de Framer
          end: "bottom bottom", // termina cuando se suelta el pin: la línea ya está completa
          scrub: true,
        },
      });

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // --- 1. Movimiento X Texto Atrás: [0, 0.25, 0.5] -> ["-40%", "40%", "40%"] ---
      if (!reduce) tl.fromTo(
        ".texto-atras",
        { x: "-40%" },
        { x: "40%", duration: 0.25, ease: "none" },
        0
      );

      // --- 2. Movimiento X Texto Adelante: [0, 0.25, 0.5] -> ["30%", "-15%", "-15%"] ---
      if (!reduce) tl.fromTo(
        ".texto-adelante",
        { x: "30%" },
        { x: "-15%", duration: 0.25, ease: "none" },
        0
      );

      // --- 3. Opacidad Bloque 1: [0, 0.25, 0.35, 0.5] -> [1, 1, 0, 0] ---
      // Se mantiene en 1 de 0 a 0.25 y cae a 0 en 0.35
      tl.fromTo(
        [".texto-atras", ".texto-adelante"],
        { opacity: 1 },
        { opacity: 0, duration: 0.1, ease: "none" },
        0.25
      );

      // --- 4. Y Texto Nuevo: [0, 0.35, 0.45, 0.8] -> ["40px", "40px", "0px", "0px"] ---
      // Se mantiene en 40px hasta 0.35, luego sube a 0px en 0.45
      tl.fromTo(
        [".texto-nuevo-titulo", ".texto-nuevo-sub"],
        { y: "40px" },
        { y: "0px", duration: 0.1, ease: "none" },
        0.35
      );

      // --- 5. Opacidad Bloque 2: [0, 0.38, 0.48, 0.8] -> [0, 0, 1, 1] ---
      // Permanece en 0 hasta 0.38 y pasa a 1 en 0.48
      tl.fromTo(
        [".texto-nuevo-titulo", ".texto-nuevo-sub", ".linea-central"],
        { opacity: 0 },
        { opacity: 1, duration: 0.1, ease: "none" },
        0.38
      );

      // --- 6. Scale Linea: [0, 0.45, 0.75, 0.8] -> [0, 0, 1, 1] ---
      // Permanece en 0 hasta 0.45 y escala a 1 en 0.75
      tl.fromTo(
        ".linea-central",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.3, ease: "none" },
        0.45
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={trackRef} className="relative h-[300vh] pt-10 bg-black">
      <div
        ref={containerRef}
        className="w-full h-screen bg-neutral-900 overflow-hidden sticky top-0"
      >
        <img
          src="/img/juan-1.webp"
          alt="Fondo setup"
          className="absolute inset-0 w-full h-full object-cover object-[69%_top] md:object-top z-0"
        />

        <div className="absolute bottom-[25%] md:bottom-0 inset-0 z-30 flex items-end justify-start p-6 md:p-16 pointer-events-none">
          <h2
            style={{ color: colorPrincipal }}
            className="texto-atras text-[15vw] sm:text-[16vw] lg:text-[15vw] font-bold tracking-tighter leading-none whitespace-nowrap will-change-transform"
          >
            Pide calma
          </h2>
        </div>

        <div className="absolute top-[25%] inset-0 flex flex-col items-center justify-center pointer-events-none p-6 md:p-8 text-center w-full z-50 md:z-1 lg:z-50">
          <div
            style={{ backgroundColor: colorPrincipal }}
            className="linea-central h-px w-[80%] sm:w-full origin-center will-change-transform"
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
          <h3
            style={{ color: colorPrincipal }}
            className="texto-adelante text-[15vw] sm:text-[13vw] lg:text-[12vw] font-bold tracking-tighter leading-none whitespace-nowrap will-change-transform"
          >
            Buen Desarrollo
          </h3>
        </div>

        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none p-6 md:p-8 text-center w-full">
          <h3 className="texto-nuevo-titulo text-[10vw] sm:text-[8vw] md:text-[6vw] font-extrabold text-white tracking-tight uppercase leading-none max-w-[90%] sm:max-w-full">
            Pero el resultado final
          </h3>
          <p
            style={{ color: colorPrincipal }}
            className="texto-nuevo-sub text-[5vw] sm:text-[4vw] md:text-[5vw] lg:text-[3vw] font-medium tracking-wide mt-4"
          >
            vale cada segundo.
          </p>
        </div>
      </div>
    </div>
  );
}