import { useRef, useState } from "react";
import { useColor } from "../../context/ColorContext";

const BORDER_LIGHT_RADIUS = 350;

export default function Section8() {
  const { colorPrincipal } = useColor();
  const [copied, setCopied] = useState(false);
  const myEmail = "juannavegante2010@gmail.com";

  const cardRef = useRef(null);
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

  const handleCopyEmail = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(myEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="w-full bg-white flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div
        ref={cardRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        className="w-full h-full bg-[#1D1D1F] border border-neutral-800 rounded-[20px] flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.3)] overflow-hidden relative"
      >
        <div
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-500 rounded-[20px] md:rounded-[60px] mix-blend-screen"
          style={{
            background: lightGradient,
            opacity: isHovered ? 0.15 : 0,
          }}
        />

        <div
          className="absolute -inset-px pointer-events-none rounded-[20px] border-[3px] transition-opacity duration-500 ease-out z-20"
          style={{
            maskImage: lightGradient,
            WebkitMaskImage: lightGradient,
            borderColor: colorPrincipal || "#fff",
            opacity: isHovered ? 1 : 0,
          }}
        />

        <div
          className="absolute inset-0 mix-blend-multiply opacity-10 z-0 pointer-events-none"
          style={{ backgroundColor: colorPrincipal }}
        />

        <div className="flex flex-col gap-6 max-w-5xl mt-4 md:mt-8 p-8 md:p-14 z-20 relative">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.05]">
            Construyamos algo bien hecho
            <span style={{ color: colorPrincipal || "#38BDF8" }}>.</span>
          </h2>
          <p className="text-lg sm:text-2xl md:text-3xl text-neutral-400 font-medium tracking-wide max-w-3xl">
            Desde proyectos independientes hasta aplicaciones a gran escala.
          </p>
        </div>

        <div
          onClick={() => (window.location.href = `mailto:${myEmail}`)}
          className="group relative w-full h-28 sm:h-36 md:h-44 rounded-b-[20px] border-t border-neutral-800 overflow-hidden cursor-pointer bg-[#1D1D1F] z-30"
        >
          <div className="absolute inset-0 flex items-center justify-between px-8 md:px-14 text-white z-10 pointer-events-none">
            <span className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Hablemos
            </span>
            <span className="text-3xl sm:text-5xl md:text-6xl font-light transform transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </div>

          <div
            className="absolute inset-0 translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0 z-20 flex items-center justify-between px-6 sm:px-10 md:px-14"
            style={{ backgroundColor: colorPrincipal || "#38BDF8" }}
          >
            <span className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-mono font-bold tracking-tight text-neutral-950 truncate max-w-[70%]">
              {myEmail}
            </span>

            <button
              onClick={handleCopyEmail}
              className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 transform active:scale-95 shadow-lg bg-neutral-950 text-white hover:bg-black"
            >
              {copied ? "¡Copiado!" : "Copiar Email"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
