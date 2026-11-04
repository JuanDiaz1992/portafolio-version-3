import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useColor } from "../../context/ColorContext";

gsap.registerPlugin(ScrollTrigger);

export default function Section3() {
  const containerRef = useRef(null);
  const { setIntensidadMarco } = useColor();

  // Ref para almacenar la función sin provocar que useGSAP destruya la timeline
  const setIntensidadRef = useRef(setIntensidadMarco);
  useEffect(() => {
    setIntensidadRef.current = setIntensidadMarco;
  }, [setIntensidadMarco]);

  // Ref para controlar que el estado solo cambie 1 vez al entrar/salir (evita re-renders en loop)
  const isInsideRef = useRef(false);

  useEffect(() => {
    return () => {
      if (setIntensidadRef.current) {
        setIntensidadRef.current(1);
      }
    };
  }, []);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const isInside = self.progress > 0 && self.progress < 1;
            // Solo actualizamos React si el estado realmente cambió
            if (isInside !== isInsideRef.current) {
              isInsideRef.current = isInside;
              if (setIntensidadRef.current) {
                setIntensidadRef.current(isInside ? 0 : 1);
              }
            }
          },
          onLeave: () => {
            isInsideRef.current = false;
            if (setIntensidadRef.current) setIntensidadRef.current(1);
          },
          onLeaveBack: () => {
            isInsideRef.current = false;
            if (setIntensidadRef.current) setIntensidadRef.current(1);
          },
        },
      });

      if (!reduce) {
      // 2. Zoom al Texto PORTAFOLIO (Escala fluida 100% lineal sin frenos)
      // Tramo 1: del 0% al 50% del scroll -> escala de 1 a 4
      tl.to(
        ".texto-zoom-sec3",
        { scale: 4, duration: 0.5, ease: "none", force3D: false },
        0
      );

      // Tramo 2: del 50% al 80% del scroll -> escala de 4 a 12
      tl.to(
        ".texto-zoom-sec3",
        { scale: 12, duration: 0.3, ease: "none", force3D: false },
        0.5
      );

      // Tramo 3: del 80% al 100% del scroll -> escala de 12 a 85
      tl.to(
        ".texto-zoom-sec3",
        { scale: 85, duration: 0.2, ease: "none", force3D: false },
        0.8
      );

      }

      // 3. Texto inferior: desvanecimiento de 0.8 a 1.0 del scroll
      tl.fromTo(
        ".texto-bottom-sec3",
        { opacity: 1 },
        { opacity: 0, duration: 0.2, ease: "none" },
        0.8
      );
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <div ref={containerRef} id="portafolio" className="relative h-[260vh] bg-white z-40">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-white px-4">
        <div className="texto-zoom-sec3 flex items-center justify-center font-bold text-black uppercase select-none font-display text-center text-[11vh] md:text-[20vh] lg:text-[45vh] leading-none tracking-tighter origin-center">
          <span>PORT</span>
          <span className="origin-center">A</span>
          <span>FOLIO</span>
        </div>

        <span className="texto-bottom-sec3 absolute bottom-12 font-sans text-md md:text-xl lg:text-xs font-semibold tracking-[0.15em] text-neutral-500 uppercase select-none text-center">
          Scroll para revelar la experiencia
        </span>
      </div>
    </div>
  );
}