import { Button, Tooltip } from "@heroui/react";
import { TbBrandReactNative } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { SiSpring } from "react-icons/si";
import { useColor } from "../../../context/ColorContext";

import SliderBase from "../SliderEmbla/SliderBase";

const imgBaseDesktop = "/img/newHome/section2/aquamovil.webp";
const imgBaseMobile = "/img/newHome/section2/aquamovil-m.webp";

const imgUXDesktop = "/img/newHome/section2/aquamovil-2.webp";
const imgUXMobile = "/img/newHome/section2/aquamovil-2-m.webp";

const imgFeaturesDesktop = "/img/newHome/section2/aquamovil-3.webp";
const imgFeaturesMobile = "/img/newHome/section2/aquamovil-3-m.webp";

const imgButton1 = "/img/newHome/section2/button1.webp";
const imgButton2 = "/img/newHome/section2/button2.webp";
const imgIcon3 = "/img/newHome/section2/icon3.webp";

export default function AquaMovilSlider() {
  const emblaOptions = { loop: true, axis: "y" };
  const { colorPrincipal } = useColor();

  const glowGradient = `radial-gradient(circle at 15% 15%, ${colorPrincipal || "rgba(0,170,255,0.15)"} 0%, transparent 0%)`;

  return (
    <SliderBase options={emblaOptions}>
      {/*  SLIDE 1 */}
      <div className="flex-[0_0_100%] min-w-0 h-full relative flex flex-col lg:justify-center items-start p-6 md:p-12 bg-[#121214] overflow-hidden text-white group">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen z-1"
          style={{ background: glowGradient }}
        />

        <picture className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
          <source srcSet={imgBaseMobile} media="(max-w: 734px)" />
          <img
            src={imgBaseDesktop}
            alt="AquaMovil Hub"
            className="w-full h-full object-cover opacity-20 md:opacity-80 group-hover:scale-[1.02] transition-transform duration-700 hidden md:block"
          />
          <img
            src={imgBaseMobile}
            alt="AquaMovil Hub"
            className="w-full h-full object-cover block md:hidden"
          />
        </picture>

        <div className="absolute inset-0 max-w-full md:max-w-[70%] z-1 pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-3 items-start max-w-87.5 lg:max-w-xl ">
          <h2
            style={{ color: colorPrincipal || "#00aaff" }}
            className="text-xs font-mono font-bold tracking-[0.2em] uppercase px-4 py-1 bg-black/90 backdrop-blur-md"
          >
            // ECOSISTEMA INTEGRADO
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight font-['Antonio',sans-serif] text-black/80">
            AquaMovil
          </h3>
          <p className="text-black/80  text-xs md:text-sm leading-relaxed max-w-md">
            Desarrollo de un ecosistema compuesto por una App móvil de captura
            en campo y un dashboard administrativo web para la gestión,
            auditoría y análisis de la información recolectada en tiempo real.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-2">
            <Button
              onClick={() =>
                  window.open(
                    "https://aquamovildesk.com/",
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
              size="sm"
              className="font-semibold text-white shadow-lg shadow-emerald-950/50 bg-emerald-600 hover:bg-emerald-500 transition-colors"
              aria-label="Visitar AquaMovil"
            >
              Ir a AquaMovilDesk
            </Button>

            <div className="flex gap-1.5 bg-neutral-950/80 p-1 rounded-xl border border-neutral-800/80 backdrop-blur-sm">
              <Tooltip delay={0}>
                <Tooltip.Trigger>
                  <div className="p-2 text-neutral-400 hover:text-red-400 transition-colors">
                    <TbBrandReactNative size={20} />
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content>
                  <p className="text-xs">React Native</p>
                </Tooltip.Content>
              </Tooltip>

              <Tooltip delay={0}>
                <Tooltip.Trigger>
                  <div className="p-2 text-neutral-400 hover:text-amber-400 transition-colors">
                    <FaReact size={20} />
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content>
                  <p className="text-xs">React Js</p>
                </Tooltip.Content>
              </Tooltip>

              <Tooltip delay={0}>
                <Tooltip.Trigger>
                  <div className="p-2 text-neutral-400 hover:text-emerald-400 transition-colors">
                    <SiSpring size={18} />
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content>
                  <p className="text-xs">Spring Boot</p>
                </Tooltip.Content>
              </Tooltip>
            </div>
          </div>

          <div className="mt-4 w-full border-t border-black/60 pt-4 max-w-md">
            <p className="text-[9px] font-mono text-black/80  uppercase tracking-widest mb-3">
              // Implementado con éxito en
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <img
                src="/img/newHome/section2/logo_belen.webp"
                alt="Belén"
                className="h-6 md:h-7 object-contain"
              />
              <img
                src="/img/newHome/section2/logo_celia.webp"
                alt="La Celia"
                className="h-6 md:h-7 object-contain "
              />
              <img
                src="/img/newHome/section2/logo_quinchia.webp"
                alt="Quinchía"
                className="h-6 md:h-7 object-contain "
              />
              <img
                src="/img/newHome/section2/logo-virginia.webp"
                alt="La Virginia"
                className="h-6 md:h-7 object-contain "
              />
            </div>
          </div>
        </div>
      </div>

      {/* SLIDE 2 */}
      <div className="flex-[0_0_100%] min-w-0 h-full relative flex items-start p-6 md:p-12 bg-white/90 overflow-hidden text-white group">
        <picture className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
          <img
            src={imgUXDesktop}
            alt="AquaMovil UX/UI"
            className="w-full h-full object-contain md:object-bottom-right  origin-bottom-right opacity-40 md:opacity-100 transition-all hidden md:block"
          />
          <img
            src={imgUXMobile}
            alt="AquaMovil UX/UI"
            className="w-full h-full object-contain block md:hidden object-bottom"
          />
        </picture>

        <div className="relative z-10 bg-black/80 backdrop-blur-xl border border-neutral-800 p-6 md:p-8 rounded-3xl max-w-125 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform hover:-translate-y-1 duration-300">
          <h3 className="text-2xl md:text-3xl font-bold font-['Antonio',sans-serif] mb-3">
            DISEÑO UX/UI OPERATIVO
          </h3>
          <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">
            Interfaz diseñada para mitigar la fricción en la captura de datos de
            campo. Prioriza jerarquías limpias y macros de acción rápidos
            accesibles bajo cualquier condición climática por los operarios,
            unificando la lógica con el Dashboard administrativo.
          </p>

          <img
            src={imgButton1}
            alt=""
            className="hidden lg:block absolute -right-30 bottom-10 w-28 pointer-events-none transition-transform duration-500 group-hover:translate-y-3"
          />
        </div>
      </div>

      {/* SLIDE 3 */}
      <div className="flex-[0_0_100%] min-w-0 h-full relative flex pt-15 items-start justify-end p-6 md:p-12 bg-white/90 overflow-hidden text-white group">
        {/* Fondo adaptativo nativo */}
        <picture className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
          <img
            src={imgFeaturesDesktop}
            alt="AquaMovil Features"
            className="w-full h-full object-contain md:object-bottom-left  hidden md:block"
          />
          <img
            src={imgFeaturesMobile}
            alt="AquaMovil Features"
            className="w-full h-full object-contain object-bottom-left md:scale-95 origin-bottom-left block md:hidden"
          />
        </picture>

        <div className="relative z-10  bg-black/80  border border-neutral-800 p-6 md:p-8 rounded-3xl max-w-125 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform hover:-translate-y-1 duration-300 backdrop-blur-xl">
          <img
            src={imgIcon3}
            alt=""
            className="w-16 md:w-20 absolute -left-10 -top-10 pointer-events-none transition-transform duration-500 group-hover:-translate-y-2"
          />
          <h3 className="text-2xl md:text-3xl font-bold font-['Antonio',sans-serif] mb-3">
            ARQUITECTURA OFFLINE-FIRST
          </h3>
          <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">
            Garantiza sincronización resiliente en zonas de nula conectividad.
            Los operarios ejecutan rutas completas offline y el sistema procesa
            validaciones dinámicas de métricas en tiempo real antes de subir
            reportes automatizados al servidor central.
          </p>
          <img
            src={imgButton2}
            alt=""
            className="hidden lg:block absolute -left-40 -bottom-5 w-36 pointer-events-none transition-transform duration-500 group-hover:translate-y-3"
          />
        </div>
      </div>
    </SliderBase>
  );
}
