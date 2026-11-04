import { useState, useRef, useEffect } from "react";
import { Button, Tooltip } from "@heroui/react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { FaWordpress } from "react-icons/fa";
import ViewerDron from "./threeJs/viewers/ViewerDron";
import CatleyaSlider from "./Sliders/CatleyaSlider";
import { TbBrandNextjs } from "react-icons/tb";
import { useColor } from "../../context/ColorContext";
import gsap from "gsap";

const cvJuanDiaz = "/Documentos/Juan Camilo Diaz Valencia HV.pdf";
const tech = "/img/newHome/wordpressSection/tech-camp-explorers.webp";

export default function Section5() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const targetRef = useRef(null);
  const avionRef = useRef(null);
  const destinoRef = useRef(null);
  const timelineRef = useRef(null);
  const progresoBarraRef = useRef(null);

  const { setIntensidadMarco, colorPrincipal } = useColor();

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    const calcularTrayectoria = () => {
      if (!avionRef.current || !destinoRef.current) return;

      const rectInicial = avionRef.current.getBoundingClientRect();
      const rectDestino = destinoRef.current.getBoundingClientRect();

      // 🌟 SOLUCIÓN: Calculamos los centros de cada caja
      const centroInicialX = rectInicial.left + rectInicial.width / 2;
      const centroInicialY = rectInicial.top + rectInicial.height / 2;

      const centroDestinoX = rectDestino.left + rectDestino.width / 2;
      const centroDestinoY = rectDestino.top + rectDestino.height / 2;

      // La distancia real es la diferencia entre sus centros
      const deX = centroDestinoX - centroInicialX;
      const deY = centroDestinoY - centroInicialY;

      const escala = rectDestino.width / rectInicial.width;

      tl.clear();
      tl.to(avionRef.current, {
        x: deX,
        y: deY,
        scale: escala,
        duration: 1,
        ease: "none",
      });
    };

    setTimeout(calcularTrayectoria, 100);
    timelineRef.current = tl;

    window.addEventListener("resize", calcularTrayectoria);
    return () => {
      tl.kill();
      window.removeEventListener("resize", calcularTrayectoria);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.05 && latest < 0.95) {
      setIntensidadMarco(0);
    } else {
      setIntensidadMarco(1);
    }

    if (timelineRef.current) {
      timelineRef.current.progress(latest);
    }

    if (progresoBarraRef.current) {
      progresoBarraRef.current.style.transform = `scaleX(${latest})`;
    }

    const currentStep = latest < 0.5 ? 1 : 2;

    const event = new CustomEvent("plane-scroll", {
      detail: {
        step: currentStep,
        progress: latest,
      },
    });
    window.dispatchEvent(event);
  });

  return (
    <>
      <section
        ref={targetRef}
        className="w-full mx-auto pt-8 gap-6 flex flex-col px-6 bg-black z-40 relative"
      >
        <div className="flex flex-col lg:flex-row gap-6 w-full h-auto lg:h-[40%]">
          <div className="rounded-[20px] relative overflow-hidden border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] h-auto min-h-160 md:h-125 lg:h-225 w-full lg:w-[50%]">
            <img loading="lazy" decoding="async"
              src="/img/newHome/section2/banner3.webp"
              alt="Banner Juan Diaz"
              className="absolute inset-0 h-full w-full object-cover object-center block max-md:hidden"
            />
            <img loading="lazy" decoding="async"
              src="/img/newHome/section2/banner3-m.webp"
              alt="Banner Juan Diaz"
              className="absolute inset-0 h-full w-full object-cover object-center hidden max-md:block"
            />

            <div className="relative z-10 flex h-full w-full flex-col items-end justify-start p-4 md:px-6 md:pt-10">
              {/* Tarjeta de texto: w-full en móvil, w-[60%] de md en adelante */}
              <div className="z-10 flex w-full md:w-[60%] flex-col items-start gap-4 md:gap-6 rounded-[15px] border border-[#0a1724]/30 bg-[#0a1724]/75 md:bg-[#0a1724]/60 p-5 md:p-6 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[7px] md:rounded-[22px]">
                <div className="flex flex-col">
                  <h3 className="font-sans text-[20px] md:text-[26px] font-bold leading-none text-white">
                    SOY JUAN
                  </h3>
                  <h4 style={{ color: colorPrincipal }}
                    className="font-display uppercase text-[44px] md:text-[60px] font-bold leading-none">
                    DIAZ.
                  </h4>
                </div>
                <p className="font-sans text-xs md:text-sm lg:text-base font-light text-white leading-relaxed">
                  Soy un desarrollador apasionado por crear soluciones
                  innovadoras y eficientes, me encanta transformar ideas en
                  proyectos funcionales que no solo resuelvan problemas reales,
                  sino que también ofrezcan experiencias únicas y memorables. Mi
                  enfoque se basa en combinar la lógica del código con la
                  creatividad, para lograr productos que destacan tanto por su
                  rendimiento como por su estética.
                </p>
                <Button
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = cvJuanDiaz;
                    link.download = "Juan_Camilo_Diaz_Valencia_HV.pdf";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  color="default"
                  variant="bordered"
                  className="border-white/20 text-white hover:bg-white/10 transition-colors w-full sm:w-auto"
                  aria-label="Descargar CV"
                >
                  Descargar CV
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 sm:gap-6 w-full lg:w-[50%] lg:h-225">
            {/* Tarjeta 1: Visor Dron / HUD */}
            <div
              className="container rounded-[20px] border-2 border-dashed border-white/20 relative h-80 sm:h-96 lg:h-[50%] w-full sm:w-1/2 lg:w-full bg-black/5 overflow-visible"
              style={{ "--hud-glow-color": colorPrincipal || "#00aaff" }}
            >
              {/* Glow central adaptable */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 pointer-events-none select-none z-0 mix-blend-screen opacity-40">
                <div
                  className="absolute inset-0 rounded-full blur-2xl sm:blur-[60px] animate-[pulse_4s_infinite_alternate]"
                  style={{
                    background: `radial-gradient(circle, var(--hud-glow-color) 0%, transparent 70%)`,
                  }}
                />
                <div className="absolute inset-8 rounded-full border-2 border-dashed border-(--hud-glow-color)/20 blur-[2px] animate-[spin_40s_linear_infinite]" />
                <div
                  className="absolute inset-24 rounded-full blur-[20px] opacity-60"
                  style={{
                    background: `radial-gradient(circle, var(--hud-glow-color) 0%, transparent 50%)`,
                  }}
                />
              </div>

              {/* Indicador de scroll */}
              <div
                className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end pointer-events-none select-none z-10"
                aria-hidden="true"
              >
                <div className="w-full flex flex-col gap-2 relative z-20">
                  <span className="text-xs sm:text-sm font-medium tracking-wide text-white/80">
                    Desliza para despegar
                  </span>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      ref={progresoBarraRef}
                      className="h-full origin-left rounded-full"
                      style={{
                        transform: "scaleX(0)",
                        willChange: "transform",
                        backgroundColor: "var(--hud-glow-color)",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Canvas / Dron Model */}
              <div className="marker w-full h-full relative rounded-4xl z-50">
                <div
                  className="w-full h-full relative pointer-events-none"
                  ref={avionRef}
                >
                  <ViewerDron />
                </div>
              </div>
            </div>

            {/* Tarjeta 2: Catleya Slider */}
            <div className="rounded-[20px] overflow-hidden relative border border-black/3 shadow-[0_4px_20px_rgba(0,0,0,0.05)] h-80 sm:h-96 lg:h-[50%] w-full sm:w-1/2 lg:w-full bg-[#0b1811]">
              <div className="absolute inset-0 flex items-center justify-center text-white/20 font-bold">
                <CatleyaSlider />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[20px] relative overflow-hidden border border-neutral-800/80 bg-black shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] w-full h-112.5 lg:h-150">
          {/* Gradiente sutil dinámico de fondo */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none mix-blend-screen z-10"
            style={{
              background: `radial-gradient(circle at 10% 20%, ${colorPrincipal || "#fff"} 0%, transparent 45%)`,
            }}
          />

          {/* VIDEO DE FONDO ESTÁTICO */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0"
          >
            <source
              src="/img/newHome/wordpressSection/invisual.mp4"
              type="video/mp4"
            />
          </video>

          {/* CONTENIDO DENTRO DE CARD GLASSMORPHISM */}
          <div className="pointer-events-none relative z-20 flex h-full w-full items-center p-6 md:p-10">
            <div className="pointer-events-auto flex flex-col justify-between max-w-xl rounded-2xl border border-white/10 bg-black/60 p-6 md:p-8 backdrop-blur-md shadow-2xl">
              <div className="flex flex-col gap-3 items-start">

                <h3 className="text-white text-2xl md:text-3xl font-bold tracking-tight font-sans mt-1">
                  Servicios de Branding Vehicular
                </h3>

                <p className="w-full text-white/80 text-xs md:text-sm leading-relaxed mt-1 font-light">
                  Construí la plataforma web orientada a la presentación de
                  servicios de rotulación e imagen corporativa vehicular.
                  Desarrollada con Next.js e implementando una arquitectura
                  modular optimizada para tiempos de carga ultrarrápidos y alto
                  rendimiento visual.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-6">
                <Button
                  onClick={() =>
                    window.open(
                      "https://invisualsign.com",
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                  color="default"
                  variant="bordered"
                  className="border-white/20 text-white hover:bg-white/10 transition-colors pointer-events-auto cursor-pointer"
                  aria-label="Ver sitio en vivo"
                >
                  Ver Proyecto en Vivo ↗
                </Button>

                <Tooltip delay={0}>
                  <Tooltip.Trigger>
                    <div>
                      <Button
                        isIconOnly
                        variant="flat"
                        className="bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-white transition-colors backdrop-blur-sm"
                        aria-label="Next.js"
                      >
                        <TbBrandNextjs size={20} />
                      </Button>
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Content showArrow offset={12}>
                    <Tooltip.Arrow />
                    <p className="text-sm font-medium">Next.js</p>
                  </Tooltip.Content>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row h-auto md:h-150 gap-4 md:gap-6">
          {/* Tarjeta 1: Docking Pad (Receptor del Dron GSAP) */}
          <div
            ref={destinoRef}
            className="w-full md:w-[40%] h-72 sm:h-80 md:h-full bg-black/30 rounded-[20px] relative overflow-visible border border-white/5"
            style={{ "--hud-glow-color": colorPrincipal || "#00aaff" }}
          >
            {/* Pista de aterrizaje del dron (decorativa) */}
            <div className="absolute inset-0 pointer-events-none select-none z-10" aria-hidden="true">
              {/* ANILLOS HOLOGRÁFICOS EN PERSPECTIVA (Base del Dron) */}
              <div
                className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-56 sm:w-72 h-32 sm:h-40 flex items-center justify-center z-0"
                style={{ perspective: "600px" }}
              >
                <div
                  className="w-full h-full relative"
                  style={{
                    transform: "rotateX(65deg)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Resplandor del suelo */}
                  <div
                    className="absolute inset-0 rounded-full blur-[20px] sm:blur-[30px] opacity-40 scale-95"
                    style={{
                      background: `radial-gradient(circle, var(--hud-glow-color) 0%, transparent 70%)`,
                    }}
                  />
                  {/* Anillo exterior animado de carga */}
                  <div
                    className="absolute inset-0 rounded-full border-2 border-dashed animate-[spin_30s_linear_infinite]"
                    style={{
                      borderColor: "var(--hud-glow-color)",
                      opacity: 0.3,
                    }}
                  />
                  {/* Anillo intermedio técnico */}
                  <div
                    className="absolute inset-3 sm:inset-4 rounded-full border border-double"
                    style={{
                      borderColor: "var(--hud-glow-color)",
                      opacity: 0.2,
                    }}
                  />
                  {/* Líneas de centrado (Retícula de precisión) */}
                  <div className="absolute top-1/2 left-0 w-full h-px bg-white/10" />
                  <div className="absolute left-1/2 top-0 w-px h-full bg-white/10" />
                </div>
              </div>
            </div>

            {/* El dron llegará flotando matemáticamente aquí gracias a GSAP */}
          </div>

          {/* Tarjeta 2: Proyecto Tech Camp Explorers */}
          <div
            data-nosnippet
            className="w-full md:w-[60%] bg-[#0f0f11]/80 border border-neutral-800/40 rounded-[20px] backdrop-blur-md overflow-hidden relative group flex flex-col justify-between h-auto md:min-h-145"
          >
            <div
              className="absolute inset-0 opacity-5 pointer-events-none mix-blend-screen transition-opacity group-hover:opacity-10 z-0"
              style={{
                background: `radial-gradient(circle at 50% 30%, ${colorPrincipal || "#fff"} 0%, transparent 60%)`,
              }}
            />

            {/* Vista previa de imagen del proyecto */}
            <div className="w-full flex justify-center items-center p-4 pt-6 md:pt-8 z-10 select-none pointer-events-none">
              <div className="w-full sm:w-[90%] md:w-[75%] max-w-100 overflow-hidden drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <img loading="lazy" decoding="async"
                  src={tech}
                  alt="Vista previa de un sitio web para una academia de tecnología"
                  className="w-full h-auto object-contain scale-100 sm:scale-105 group-hover:scale-100 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                  draggable={false}
                />
              </div>
            </div>

            {/* Información del Proyecto */}
            <div className="relative z-10 p-5 sm:p-6 md:p-8 flex flex-col gap-4 items-start w-full md:mt-auto border-t border-white/5 bg-neutral-950/40 backdrop-blur-sm">
              <div className="flex flex-col gap-1.5 items-start w-full">

                <h3 className="text-white/90 text-lg sm:text-xl md:text-2xl font-bold tracking-tight font-sans">
                  Campamentos de tecnología
                </h3>

                <p className="text-white/60 text-xs md:text-sm leading-relaxed max-w-162.5 mt-1">
                  Desarrollé la plataforma digital para una academia
                  tecnológica de verano. El reto principal fue
                  estructurar una oferta educativa diversa (robótica VEX,
                  Minecraft, Java) y segmentarla de manera intuitiva según
                  edades y niveles de habilidad. Implementé una navegación
                  fluida que guía al usuario desde la exploración de programas
                  hasta la inscripción.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full">
                <Button
                  onClick={() =>
                    window.open(
                      "https://techexplorerscamps.com",
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                  color="default"
                  variant="bordered"
                  className="border-white/20 text-white hover:bg-white/10 transition-colors pointer-events-auto text-xs md:text-sm cursor-pointer w-full sm:w-auto"
                  aria-label="Ir a Proyecto"
                >
                  Ver Proyecto en Vivo ↗
                </Button>

                <Tooltip delay={0}>
                  <Tooltip.Trigger>
                    <div>
                      <Button
                        isIconOnly
                        variant="flat"
                        className="bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-white transition-colors backdrop-blur-sm"
                        aria-label="Wordpress / Elementor"
                      >
                        <FaWordpress size={18} />
                      </Button>
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Content showArrow offset={12}>
                    <Tooltip.Arrow />
                    <p className="text-sm font-medium">Wordpress / Elementor</p>
                  </Tooltip.Content>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const style = document.createElement("style");
style.innerHTML = `
    @keyframes growProgressBar {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

.unique-ping {
  animation-duration: 2s;
}
`;
document.head.appendChild(style);
