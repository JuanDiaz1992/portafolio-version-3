import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useColor } from "../../context/ColorContext";

export default function Section3() {
  const containerRef = useRef(null);
  const { setIntensidadMarco } = useColor();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0 && latest < 1) {
      setIntensidadMarco(0);
    } else {
      setIntensidadMarco(1);
    }
  });

  useEffect(() => {
    return () => setIntensidadMarco(1);
  }, [setIntensidadMarco]);

  const scale = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [1, 4, 12, 85]);

  const opacityElements = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const opacitiFinalText = useTransform(
    scrollYProgress,
    [0, 0.5, 0.8, 1],
    [1, 1, 1, 0],
  );

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-white z-40">
      <link
        href="https://fonts.googleapis.com/css2?family=Antonio:wght@700&display=swap"
        rel="stylesheet"
      />

      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-white px-4">
        <motion.span
          style={{ opacity: opacityElements }}
          className="absolute top-12 font-mono text-md  md:text-xl lg:text-xs tracking-[0.2em] text-neutral-400 uppercase select-none"
        >
          [ SELECTED WORKS // 2024 - 2026 ]
        </motion.span>

        <motion.div
          style={{ scale }}
          className="flex items-center justify-center font-bold text-black uppercase select-none font-['Antonio',Impact,sans-serif] text-center text-[11vh] md:text-[20vh] lg:text-[45vh] leading-none tracking-tighter origin-center"
        >
          <span>PORT</span>
          <span style={{ transformOrigin: "center" }}>A</span>
          <span>FOLIO</span>
        </motion.div>

        <motion.span
          style={{ opacity: opacitiFinalText }}
          className="absolute bottom-12 font-sans text-md  md:text-xl lg:text-xs font-semibold tracking-[0.15em] text-neutral-500 uppercase select-none text-center"
        >
          Scroll para revelar la experiencia
        </motion.span>
      </div>
    </div>
  );
}