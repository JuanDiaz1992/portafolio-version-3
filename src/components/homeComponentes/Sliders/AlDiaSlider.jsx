import { Button, Tooltip } from "@heroui/react";
import { motion } from "framer-motion";
import { FaReact } from "react-icons/fa";
import { SiSpring } from "react-icons/si";
import { useColor } from "../../../context/ColorContext";

import SliderBase from "../SliderEmbla/SliderBase";

const slider1 = "/img/newHome/section1/sliders/slider1.webp";
const slider2 = "/img/newHome/section1/sliders/slider2.webp";
const video2 = "/img/newHome/section1/sliders/video3.mp4";

export default function AlDiaSlider() {
  const emblaOptions = { loop: true, axis: "y" };
  const { colorPrincipal } = useColor();

  const glowGradient = `radial-gradient(circle at 85% 75%, ${colorPrincipal || "rgba(255,255,255,0.15)"} 0%, transparent 65%)`;

  return (
    <SliderBase options={emblaOptions}>
      {/* SLIDE 1*/}
      <div className="flex-[0_0_100%] min-w-0 h-full relative flex flex-col bg-[#121214] overflow-hidden text-white">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none mix-blend-screen z-1"
          style={{ background: glowGradient }}
        />

        <div className="h-[40%] pt-8 md:pt-16 px-4 md:px-8 flex flex-col gap-2.5 items-start text-white z-12">
          <h2
            style={{ color: colorPrincipal || "#fff" }}
            className="text-xs font-mono font-bold tracking-[0.2em] uppercase"
          >
            // ALDÍA
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white font-['Antonio',sans-serif]">
            Asistente financiero
          </h3>
          <p className="max-w-125 w-[75%] mb-2 text-neutral-400 text-xs md:text-sm leading-relaxed">
            Plataforma web que centraliza el registro de ingresos y gastos,
            organizándolos mensual y anualmente a través de analíticas gráficas
            y automatización de obligaciones tributarias.
          </p>

          <div className="flex gap-2 mt-2">
            <Tooltip delay={0}>
              <Tooltip.Trigger>
                <div role="button" tabIndex={0}>
                  <Button
                    as="a"
                    href="https://github.com/JuanDiaz1992/alDiaFront"
                    target="_blank"
                    rel="noopener noreferrer"
                    isIconOnly
                    variant="flat"
                    className="bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
                    aria-label="Al Día Front"
                  >
                    <FaReact className="text-base" />
                  </Button>
                </div>
              </Tooltip.Trigger>
              <Tooltip.Content showArrow offset={12}>
                <Tooltip.Arrow />
                <p className="text-sm font-medium">React Js</p>
              </Tooltip.Content>
            </Tooltip>

            <Tooltip delay={0}>
              <Tooltip.Trigger>
                <div role="button" tabIndex={0}>
                  <Button
                    as="a"
                    href="https://github.com/JuanDiaz1992/AldiaBackJava"
                    target="_blank"
                    rel="noopener noreferrer"
                    isIconOnly
                    variant="flat"
                    className="bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
                    aria-label="Al Día Back"
                  >
                    <SiSpring className="text-base" />
                  </Button>
                </div>
              </Tooltip.Trigger>
              <Tooltip.Content showArrow offset={12}>
                <Tooltip.Arrow />
                <p className="text-sm font-medium">Spring Boot</p>
              </Tooltip.Content>
            </Tooltip>
          </div>
        </div>

        <div className="h-[60%] flex items-end justify-end z-10 relative">
          <motion.img
            className="h-full lg:mr-3.75 max-w-full object-contain object-bottom md:max-h-full sm:h-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)]"
            src={slider1}
            alt="Dashboard mockup"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* SLIDE 2*/}
      <div className="flex-[0_0_100%] min-w-0 h-full relative flex overflow-hidden bg-[#121214] items-center justify-center p-4">
        <img
          className="w-full h-full object-cover rounded-2xl shadow-2xl border border-neutral-850"
          src={slider2}
          alt="Vista del producto"
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        />
      </div>

      {/* SLIDE 3 */}
      <div className="flex-[0_0_100%] min-w-0 h-full relative overflow-hidden bg-[#121214] flex flex-col md:flex-row items-center justify-between p-8 md:p-16 gap-8 text-white">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none mix-blend-screen z-1"
          style={{
            background: `radial-gradient(circle at 30% 50%, ${colorPrincipal || "rgba(255,255,255,0.15)"} 0%, transparent 60%)`,
          }}
        />
        <div className="w-full md:w-[50%] h-full flex items-center justify-center z-10 order-2 md:order-1">
          <div className="relative w-65 sm:w-70 aspect-9/19 bg-neutral-950 border-[5px] border-neutral-800 rounded-[40px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden p-1">
            <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none z-20" />
            <div className="absolute inset-0 bg-neutral-950/10 z-10 pointer-events-none" />

            <div className="absolute inset-0 w-full h-full rounded-[34px] overflow-hidden scale-118 origin-center z-0">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover scale-100"
                controls={false}
                disablePictureInPicture
                webkit-playsinline="true"
              >
                <source src={video2} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[50%] flex flex-col justify-center items-start gap-4 z-10 order-1 md:order-2">
          <span
            style={{ color: colorPrincipal || "#fff" }}
            className="text-xs font-mono font-bold tracking-[0.2em] uppercase"
          >
            // EXPERIENCIA MOBILE
          </span>
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight font-['Antonio',sans-serif] text-white max-w-md leading-none">
            FINANZAS EN EL BOLSILLO
          </h3>
          <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
            Sincronización instantánea nativa. Diseñado exclusivamente para
            registrar flujos de caja rápidos, visualizar alertas de impuestos y
            escanear facturas en tiempo real.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-2 w-full max-w-sm border-t border-neutral-800/60 pt-4">
            <div>
              <h4 className="text-xs font-mono text-neutral-500 uppercase">
                // UI NATIVA
              </h4>
              <p className="text-sm font-semibold text-neutral-200 mt-0.5">
                60 FPS Fluidos
              </p>
            </div>
            <div>
              <h4 className="text-xs font-mono text-neutral-500 uppercase">
                // ACCESO
              </h4>
              <p className="text-sm font-semibold text-neutral-200 mt-0.5">
                Offline First
              </p>
            </div>
          </div>
        </div>
      </div>
    </SliderBase>
  );
}
