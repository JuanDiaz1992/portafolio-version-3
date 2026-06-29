import { useState, useRef, useEffect } from "react";
import { Button, Tooltip } from "@heroui/react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { FaWordpress } from "react-icons/fa";
import ViewerDron from "./ThreeJsVisor/ViewerDron";
import CatleyaSlider from "./Sliders/CatleyaSlider";
import { TbBrandNextjs } from "react-icons/tb";
import { useColor } from "../../context/ColorContext";
import gsap from "gsap";

const cvJuanDiaz = "/Documentos/Juan Camilo Diaz Valencia HV.pdf";
const invisualSign = "/img/newHome/section2/invisualSign.webp";
const invisualSignM = "/img/newHome/section2/invisualSign-m.webp";
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
          <div
            className={`rounded-[20px]  relative overflow-hidden border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] h-125 lg:h-225 w-full lg:w-[50%]`}
          >
            <img
              src="/img/newHome/section2/banner3.webp"
              alt="Banner Juan Diaz"
              className="absolute inset-0 h-full w-full object-cover object-center block max-md:hidden"
            />
            <img
              src="/img/newHome/section2/banner3-m.webp"
              alt="Banner Juan Diaz"
              className="absolute inset-0 h-full w-full object-cover object-center hidden max-md:block"
            />

            <div className="relative z-10 flex h-full w-full flex-col items-end justify-start px-6 pt-10">
              <div className="z-10 flex w-[60%] flex-col items-start gap-6 rounded-[15px] border border-[#0a1724]/30 bg-[#0a1724]/60 p-6 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[7px] md:rounded-[22px]">
                <div className="flex flex-col">
                  <h3 className="font-sans text-[26px] font-bold leading-none text-white">
                    SOY JUAN
                  </h3>
                  <h4 className="animate-[moveGradient_5s_infinite_alternate] bg-[linear-gradient(141deg,#fff_59%,#00aaff_100%)] bg-size-[200%_100%] bg-clip-text font-sans text-[50px] font-bold text-transparent [-webkit-background-clip:text]">
                    DIAZ.
                  </h4>
                </div>
                <p className="font-sans text-sm lg:text-base font-light text-white leading-relaxed">
                  Soy un desarrollador apasionado por crear soluciones
                  innovadoras y eficientes, me encanta transformar ideas en
                  proyectos funcionales que no solo resuelvan problemas reales,
                  sinó que también ofrezcan experiencias únicas y memorables. Mi
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
                  className="border-white/20 text-white hover:bg-white/10 transition-colors"
                  aria-label="Descargar CV"
                >
                  Descargar CV
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-6 w-full lg:w-[50%] lg:h-225">
            <div
              className="container initialrounded-[20px] border-2 border-dashed border-white/20 relative h-75 sm:h-87.5 lg:h-[50%] w-full sm:w-1/2 lg:w-full bg-black/5 overflow-visible"
              style={{ "--hud-glow-color": colorPrincipal || "#00aaff" }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-80 sm:h-80 pointer-events-none select-none z-0 mix-blend-screen opacity-40">
                <div
                  className="absolute inset-0 rounded-full blur-[60px] animate-[pulse_4s_infinite_alternate]"
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

              <div className="absolute inset-0 p-5 flex flex-col justify-between font-mono text-[10px] text-white/30 pointer-events-none select-none z-10">
                <div className="flex justify-between items-start w-full relative z-20">
                  <div className="flex flex-col gap-1 backdrop-blur-[2px] bg-black/20 p-2 rounded border border-white/5 relative">
                    <span className="absolute top-0 left-0 text-white/60 text-[8px] font-light">
                      ┌
                    </span>
                    <span className="absolute top-0 right-0 text-white/60 text-[8px] font-light">
                      ┐
                    </span>
                    <span className="absolute bottom-0 left-0 text-white/60 text-[8px] font-light">
                      └
                    </span>
                    <span className="absolute bottom-0 right-0 text-white/60 text-[8px] font-light">
                      ┘
                    </span>

                    <div
                      className="font-bold flex items-center gap-1.5 text-[11px]"
                      style={{ color: "var(--hud-glow-color)" }}
                    >
                      <span
                        className="w-2 h-2 rounded-full animate-ping absolute unique-ping"
                        style={{ backgroundColor: "var(--hud-glow-color)" }}
                      />
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: "var(--hud-glow-color)" }}
                      />
                      CORE_STATUS: ONLINE
                    </div>
                    <div className="text-white/50">
                      SYS_INTEGRITY:{" "}
                      <span className="text-white font-bold">100%</span>
                    </div>
                    <div className="text-[9px] text-white/20 tracking-wider">
                      INIT_SEQ_OK // TRK_A_ACTIVE
                    </div>
                  </div>

                  <div className="text-right p-2 hidden sm:block opacity-70 backdrop-blur-[2px] bg-black/20 rounded border border-white/5 relative">
                    <span className="absolute top-0 left-0 text-white/60 text-[8px] font-light">
                      ┌
                    </span>
                    <span className="absolute top-0 right-0 text-white/60 text-[8px] font-light">
                      ┐
                    </span>
                    <span className="absolute bottom-0 left-0 text-white/60 text-[8px] font-light">
                      └
                    </span>
                    <span className="absolute bottom-0 right-0 text-white/60 text-[8px] font-light">
                      ┘
                    </span>

                    <div
                      className="font-bold text-[11px]"
                      style={{ color: "var(--hud-glow-color)" }}
                    >
                      DRN_MODEL // V3.26
                    </div>
                    <div>
                      LOC_X: <span className="text-white/60">0.00</span> //
                      LOC_Y: <span className="text-white/60">0.00</span>
                    </div>
                    <div className="text-[9px] text-white/20">
                      GRID_REF: NX-4092 // ALT: 0.0m
                    </div>
                  </div>
                </div>

                <div className="absolute top-1/2 left-3 -translate-y-1/2 flex flex-col gap-2 opacity-25">
                  <div
                    className="font-bold text-[8px]"
                    style={{ color: "var(--hud-glow-color)" }}
                  >
                    TARGET_LOCK
                  </div>
                  <div className="flex flex-col text-[8px] leading-tight">
                    <span>[ + ] RANGE: NOMINAL</span>
                    <span>[ █ ] WEAPON: SAFE</span>
                    <span className="text-white/40 mt-1">
                      PWR_OUTPUT ||||||||... 82%
                    </span>
                  </div>
                </div>

                <div className="absolute top-1/2 right-3 -translate-y-1/2 flex-col gap-2 opacity-25 text-right hidden sm:flex">
                  <div
                    className="font-bold text-[8px]"
                    style={{ color: "var(--hud-glow-color)" }}
                  >
                    telemetry_feed
                  </div>
                  <div className="flex flex-col text-[8px] leading-tight">
                    <span>PITCH: 0.00°</span>
                    <span>YAW: 0.00°</span>
                    <span>ROLL: 0.00°</span>
                    <span className="text-white/40 mt-1">
                      SIGNAL_STB |||||||||| 100%
                    </span>
                  </div>
                </div>

                <div className="w-full flex flex-col gap-1.5 backdrop-blur-[2px] bg-black/20 p-2.5 rounded border border-white/5 relative z-20">
                  <span className="absolute top-0 left-2 text-[8px] text-white/10">
                    ▲ HANGAR_SYSTEMS_ACTIVE
                  </span>

                  <div className="flex justify-between items-center text-[9px] tracking-widest mt-1">
                    <span className="text-white/40">FRAME_LAUNCH_PROGRESS</span>
                    <span
                      className="animate-pulse text-[11px] font-bold px-2 py-0.5 rounded border"
                      style={{
                        color: "var(--hud-glow-color)",
                        borderColor: "rgba(var(--hud-glow-color), 0.2)",
                        backgroundColor: "rgba(var(--hud-glow-color), 0.05)",
                      }}
                    >
                      SCROLL TO LAUNCH
                    </span>
                  </div>

                  {/* Contenedor de la barra de progreso */}
                  <div className="w-full h-1.5 bg-white/5 rounded-sm overflow-hidden border border-white/10 relative">
                    <div
                      ref={progresoBarraRef}
                      className="h-full origin-left"
                      style={{
                        transform: "scaleX(0)",
                        willChange: "transform",
                        background: `linear-gradient(90deg, var(--hud-glow-color) 0%, #ffffff 100%)`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="marker w-full h-full relative rounded-4xl z-50">
                <div
                  className="w-full h-full relative pointer-events-none"
                  ref={avionRef}
                >
                  <ViewerDron />
                </div>
              </div>
            </div>

            <div
              className={`rounded-[20px] overflow-hidden relative border border-black/3 shadow-[0_4px_20px_rgba(0,0,0,0.05)] h-75 sm:h-87.5 lg:h-[50%] w-full sm:w-1/2 lg:w-full bg-[#0b1811]`}
            >
              <div className="absolute inset-0 flex items-center justify-center text-white/20 font-bold ">
                <CatleyaSlider />
              </div>
            </div>
          </div>
        </div>
<div
      className="rounded-[20px] relative overflow-hidden border border-neutral-800/40 bg-[#0f0f11]/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] w-full h-112.5 lg:h-150"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 🏙️ CAPA PARALAJE DESKTOP - Opacidad estática fija */}
      <div
        className="hidden md:block absolute top-[-10%] left-[-10%] w-[120%] h-[120%] pointer-events-none mix-blend-screen opacity-40"
        style={{
          backgroundImage: `url(${invisualSign})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translate(${mousePosition.x * -40}px, ${mousePosition.y * -40}px)`,
          transition: "transform 0.15s ease-out", // Solo se mueve el paralaje, no cambia la visibilidad
        }}
      />

      {/* 📱 CAPA PARALAJE MOBILE - Opacidad estática fija */}
      <div
        className="block md:hidden absolute top-[-10%] left-[-10%] w-[120%] h-[120%] pointer-events-none mix-blend-screen opacity-40"
        style={{
          backgroundImage: `url(${invisualSignM})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translate(${mousePosition.x * -40}px, ${mousePosition.y * -40}px)`,
          transition: "transform 0.15s ease-out",
        }}
      />

      {/* Resplandor HUD sutil de fondo - Estático */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none mix-blend-screen z-0"
        style={{
          background: `radial-gradient(circle at 10% 20%, ${colorPrincipal || "#fff"} 0%, transparent 45%)`
        }}
      />

      {/* 📝 CONTENEDOR HUD DE TEXTO */}
      <div className="pointer-events-none relative z-10 flex h-full w-full items-start p-6 md:pt-10 md:ps-8">
        <div className="pointer-events-auto max-md:flex max-md:flex-col max-md:justify-between max-md:h-full max-md:w-full flex flex-col justify-between h-full">
          
          <div className="flex flex-col gap-3 items-start">
            <h4
              style={{ color: colorPrincipal || "#fff" }}
              className="text-xs font-mono font-bold tracking-[0.2em] uppercase px-4 py-1 bg-black/90 backdrop-blur-md border border-white/5"
            >
              // INVISUAL SIGNS
            </h4>
            
            <h3 className="text-white/90 text-2xl md:text-3xl font-bold tracking-tight font-sans mt-1">
              Vehicle Wrap Services
            </h3>
            
            <p className="w-full max-w-112.5 text-white/70 text-xs md:text-sm leading-relaxed mt-1">
              Construí la plataforma web para InVisual Signs, enfocada en la
              presentación de sus servicios premium de branding y rotulación vehicular.
              Desarrollada con Next.js e implementando una arquitectura modular optimizada 
              para tiempos de carga ultrarrápidos y un SEO impecable, reflejando la 
              calidad visual de sus proyectos en carretera.
            </p>
          </div>

          {/* 🔘 BOTONERA Y TECNOLOGÍAS */}
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <Button
              onClick={() => window.open("https://invisualsign.com", "_blank", "noopener,noreferrer")}
              color="default"
              variant="bordered"
              className="border-white/20 text-white hover:bg-white/10 transition-colors pointer-events-auto"
              aria-label="invisual web"
            >
              Ir a Invisual Signs
            </Button>

            <Tooltip delay={0}>
              <Tooltip.Trigger>
                <div role="button" tabIndex={0}>
                  <Button
                    isIconOnly
                    variant="flat"
                    className="bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-white transition-colors backdrop-blur-sm"
                    aria-label="nextjs"
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
        <div className="w-full h-150 flex gap-6">
          <div
            ref={destinoRef}
            className="w-[40%] bg-black/30 rounded-[20px] relative overflow-visible border border-white/5"
            style={{ "--hud-glow-color": colorPrincipal || "#00aaff" }}
          >
            {/* 🌟 INTERFAZ DE ACOPLAMIENTO 3D (Docking Pad) */}
            <div className="absolute inset-0 p-5 flex flex-col justify-between font-mono text-[10px] text-white/30 pointer-events-none select-none z-10">
              {/* Texto de Confirmación Superior */}
              <div className="flex flex-col gap-0.5 relative z-20">
                <div
                  className="font-bold flex items-center gap-1.5 text-[11px]"
                  style={{ color: "var(--hud-glow-color)" }}
                >
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: "var(--hud-glow-color)" }}
                  />
                  DOCKING_STATUS: ENGAGED
                </div>
                <div className="text-white/40 text-[9px]">
                  HANGAR_74 // SECURE_LOCK_ON
                </div>
              </div>

              {/* 🔮 ANILLOS HOLOGRÁFICOS EN PERSPECTIVA (Base del Dron) */}
              <div
                className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-72 h-40 flex items-center justify-center z-0"
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
                    className="absolute inset-0 rounded-full blur-[30px] opacity-40 scale-95"
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
                    className="absolute inset-4 rounded-full border border-double"
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

              {/* Datos Técnicos del Manifiesto Inferior */}
              <div className="w-full flex flex-col gap-1 backdrop-blur-[1px] bg-black/10 p-2 rounded border border-white/5 relative z-20">
                <div className="flex justify-between">
                  <span>CARGO_MANIFEST:</span>
                  <span className="text-white font-bold">[ENCRYPTED_DATA]</span>
                </div>
                <div className="flex justify-between border-t border-white/5 pt-1 text-[9px]">
                  <span>SYS_SYNCHRONIZATION:</span>
                  <span className="text-emerald-400 font-bold">
                    COMPLETE 100%
                  </span>
                </div>
              </div>
            </div>

            {/* El dron llegará flotando matemáticamente aquí gracias a GSAP */}
          </div>

          <div className="w-[60%] bg-[#0f0f11]/80 border border-neutral-800/40 rounded-[20px] backdrop-blur-md overflow-hidden relative group flex flex-col justify-between min-h-[580px]">
            <div
              className="absolute inset-0 opacity-5 pointer-events-none mix-blend-screen transition-opacity group-hover:opacity-10 z-0"
              style={{
                background: `radial-gradient(circle at 50% 30%, ${colorPrincipal || "#fff"} 0%, transparent 60%)`,
              }}
            />
            <div className="relative z-10 p-6 md:p-8 flex flex-col gap-4 items-start w-full mt-auto border-t border-white/5 bg-neutral-950/40 backdrop-blur-sm">
              <div className="flex flex-col gap-1.5 items-start w-full">
                <h4
                  style={{ color: colorPrincipal || "#fff" }}
                  className="text-[10px] md:text-xs font-mono font-bold tracking-[0.2em] uppercase px-3 py-0.5 bg-black/90 border border-white/5"
                >
                  // TECH CAMP EXPLORERS
                </h4>

                <h3 className="text-white/90 text-xl md:text-2xl font-bold tracking-tight font-sans">
                  Campamentos de tecnología
                </h3>

                <p className="text-white/60 text-xs md:text-sm leading-relaxed max-w-[650px] mt-1">
                  Desarrollé la plataforma digital para Tech Camp Explorers, una
                  academia tecnológica de verano. El reto principal fue
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
                  className="border-white/20 text-white hover:bg-white/10 transition-colors pointer-events-auto text-xs md:text-sm"
                  aria-label="Ir a Tech Camp Explorers"
                >
                  Ir a Tech Camp Explorers
                </Button>

                <Tooltip delay={0}>
                  <Tooltip.Trigger>
                    <div role="button" tabIndex={0}>
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

            <div className="w-full flex justify-center items-center p-4 pt-6 z-10 select-none pointer-events-none">
              <div className="w-[95%] md:w-[85%] max-w-130 aspect-video rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-neutral-800/30 bg-black/20">
                <img
                  src={tech}
                  alt="Tech Camp Macbook Preview"
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  draggable={false}
                />
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
  @keyframes moveGradient {
    0% { background-position: 10% 50%; }
    100% { background-position: 100% 50%; }
  }
    @keyframes growProgressBar {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

.unique-ping {
  animation-duration: 2s;
}
`;
document.head.appendChild(style);
