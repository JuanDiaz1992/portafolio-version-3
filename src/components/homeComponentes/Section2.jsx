import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useColor } from "../../context/ColorContext";

export default function Section2() {
  // 🌟 Este ref controlará el recorrido largo del scroll (la pista de la línea de tiempo)
  const trackRef = useRef(null);
  const { colorPrincipal } = useColor();

  // Escuchamos el progreso de scroll de TODO el bloque de 300vh
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // --- ⏳ LÍNEA DE TIEMPO: BLOQUE 1 ("Good design" / "takes time") ---

  // ➡️ "Good design" viaja desde la izquierda (-30%) cruza el centro (0%) y sigue hacia la derecha (30%)
  const xTextoAtras = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    ["-30%", "20%", "20%"],
  );

  // ⬅️ "takes time" hace lo opuesto: viene de la derecha (30%), cruza el centro (0%) y sigue a la izquierda (-30%)
  const xTextoAdelante = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    ["20%", "-70%", "-70%"],
  );

  // 🛑 CONTROL DE OPACIDAD SÓLIDO:
  // Nace totalmente visible (1), se mantiene al cruzar el centro (1),
  // y entre el 45% y el 55% del scroll muere a (0). Clave: del 55% al final (1.0) lo obligamos a quedarse en (0).
  const opacityBloque1 = useTransform(
    scrollYProgress,
    [0, 0.4, 0.5, 1],
    [1, 1, 0, 0],
  );

  // --- ⏳ LÍNEA DE TIEMPO: BLOQUE 2 (Tus nuevos textos) ---

  // Arranca invisible (0), justo en el 0.55 cuando el bloque 1 muere por completo, este nace al 100% (1)
  // Se queda visible hasta el 90% del scroll (1) y se desvanece al final absoluto (0)
  const opacityBloque2 = useTransform(
    scrollYProgress,
    [0, 0.6, 0.8, 1],
    [0, 0, 1, 1],
  );

  const yTextoNuevo = useTransform(
    scrollYProgress,
    [0, 0.5, 0.65, 1],
    ["40px", "40px", "0px", "0px"],
  );

  return (
    <div ref={trackRef} className="relative h-[400vh] mt-10">
      <div className="w-full h-screen bg-neutral-900 overflow-hidden sticky top-0">
        <img
          src="/img/juan-1.webp"
          alt="Fondo setup"
          className="absolute inset-0 w-full h-full object-cover object-top z-0"
        />

        <div className="absolute inset-0 z-10 flex items-end justify-start p-8 md:p-16 pointer-events-none">
          <motion.h2
            style={{
              x: xTextoAtras,
              opacity: opacityBloque1,
              color: colorPrincipal,
            }}
            className="text-[15vw] font-bold tracking-tighter leading-none whitespace-nowrap will-change-transform"
          >
            Pide calma
          </motion.h2>
        </div>

        {/* Capa Recorte Silueta */}
        <img
          src="/img/juan-2.webp"
          alt="Juan silueta"
          className="absolute inset-0 w-full h-full object-cover object-top z-20"
        />

        {/* Overlay Color Dinámico */}
        <div
          className="absolute inset-0 mix-blend-multiply opacity-40 z-30 pointer-events-none"
          style={{ backgroundColor: colorPrincipal }}
        />

        <div className="absolute inset-0 z-40 flex items-start justify-end p-8 md:p-16 pointer-events-none">
          <motion.h3
            style={{
              x: xTextoAdelante,
              opacity: opacityBloque1,
              color: colorPrincipal,
            }}
            className="text-[12vw] font-bold tracking-tighter leading-none whitespace-nowrap will-change-transform"
          >
            
            Buen diseño
          </motion.h3>
        </div>

        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none p-8 text-center">
          <motion.h3
            style={{ y: yTextoNuevo, opacity: opacityBloque2 }}
            className="text-[8vw] md:text-[6vw] font-extrabold text-white tracking-tight uppercase leading-none"
          >
            Pero el resultado final
          </motion.h3>
          <motion.p
            style={{
              y: yTextoNuevo,
              opacity: opacityBloque2,
              color: colorPrincipal,
            }}
            className="text-[4vw] md:text-[3vw] font-medium tracking-wide mt-4"
          >
            vale cada segundo.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
