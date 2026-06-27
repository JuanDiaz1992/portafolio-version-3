import { useRef, useState } from "react";
import { useColor } from "../context/ColorContext";

const BORDER_LIGHT_RADIUS = 220;
const cardBaseStyle = "bg-[#1D1D1F] border border-neutral-800 rounded-[22px]";

export default function CardEfect() {
  const cardRef = useRef(null);
  const { colorPrincipal } = useColor();

  const [isHovered, setIsHovered] = useState(false);
  const [lightPosition, setLightPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setLightPosition({ x, y });
    }
  };

  const lightGradient = `radial-gradient(${BORDER_LIGHT_RADIUS}px at ${lightPosition.x}px ${lightPosition.y}px, ${colorPrincipal || "rgba(255,255,255,0.25)"} 0%, transparent 100%)`;

  return (
    <div
      ref={cardRef}
      className={`
        ${cardBaseStyle}
        pt-12 lg:pt-21.25 ps-6 md:ps-9.75 pe-6 md:pe-0 relative shadow-[0_4px_20px_rgba(0,0,0,0.2)]
        overflow-hidden h-full w-full md:w-[65%] lg:w-[67%] flex flex-col justify-between md:block
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute inset-0 pointer-events-none z-25 transition-opacity duration-500 rounded-[22px] mix-blend-screen"
        style={{
          background: lightGradient,
          opacity: isHovered ? 0.2 : 0,
        }}
      />

      <div
        className="absolute -inset-px pointer-events-none rounded-[22px] border-[3px] transition-opacity duration-500 ease-out z-30"
        style={{
          maskImage: lightGradient,
          WebkitMaskImage: lightGradient,
          borderColor: colorPrincipal || "#fff",
          opacity: isHovered ? 1 : 0,
        }}
      />

      <div
        className="absolute inset-0 mix-blend-multiply opacity-10 z-2 pointer-events-none"
        style={{ backgroundColor: colorPrincipal }}
      />

      <h2 className="text-[32px] sm:text-[40px] md:text-[3vw] text-white max-w-full md:max-w-107.25 leading-9 sm:leading-11 md:leading-14 z-20 relative">
        Programación en Movimiento
      </h2>

      <div className="z-20 w-full sm:w-[50%] lg:w-[50%] mt-6 md:mt-5 lg:mt-17.5 relative pb-4 sm:pb-0">
        <p className="text-neutral-300 text-sm md:text-base max-w-57.5">
          Interfaces limpias y código sólido que responde al instante en
          cualquier dispositivo.
        </p>
        <h3
          style={{ color: colorPrincipal }}
          className="text-[16px] lg:text-[2vw] mt-4 w-full max-w-full font-medium"
        >
          4 años de experiencia
        </h3>
      </div>

      <div className="md:absolute bottom-0 right-0 w-[80%] md:w-[70%] lg:w-[48%] h-[35%] sm:h-[75%] md:h-[60%] lg:h-[85%] z-10 flex items-end justify-end overflow-hidden pointer-events-none select-none">
        <div className="w-[90%] max-h-100 lg:max-h-full h-[105%] relative aspect-9/19.5 translate-y-8 sm:translate-y-12 translate-x-4 rounded-t-[30px] sm:rounded-t-[40px] border-t border-x border-neutral-800 shadow-[-10px_0_50px_rgba(0,0,0,0.6)] flex flex-col justify-between pt-4 sm:pt-6 pb-12 sm:pb-16 px-4 sm:px-6 bg-[#1D1D1F]">
          <div className="absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 w-16 sm:w-22.5 h-4 sm:h-6 bg-black rounded-full z-20 flex items-center justify-center">
            <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-[#111] opacity-60 ml-3 sm:ml-4" />
          </div>

          <div className="w-full flex items-center justify-between opacity-40 text-[9px] sm:text-[11px] text-white font-medium px-1 sm:px-2">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-2.5 sm:w-3 h-1 sm:h-1.5 bg-white/80 rounded-sm" />
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center mt-2 sm:mt-4">
            <h3 className="text-[18px] sm:text-[20px] lg:text-[20px] tracking-tighter text-white leading-[1.1]">
              ¡Hola! Soy Juan,{" "}
              <span style={{ color: colorPrincipal }}>tu ingeniero</span> de
              software
            </h3>

            <p className="text-[11px] sm:text-[14px] font-medium tracking-tight mt-2 sm:mt-4 text-neutral-400 leading-normal max-w-[95%] sm:max-w-[90%]">
              Introduce una tarea de codificación a continuación para comenzar
            </p>
          </div>

          <div className="w-full h-9 sm:h-11 bg-neutral-900 border border-neutral-800 rounded-xl px-3 sm:px-4 flex items-center shadow-inner">
            <p className="text-[10px] sm:text-[11px] text-neutral-600 truncate">
              Dale una tarea a Juan para trabajar...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}