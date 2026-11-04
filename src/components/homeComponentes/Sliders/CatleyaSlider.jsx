import { Button, Tooltip } from "@heroui/react";
import { FaReact } from "react-icons/fa";
import { SiLaravel } from "react-icons/si";
import SliderBase from "../../sliderEmbla/SliderBase";

const logo = "/img/newHome/section2/logo-catleya.svg";
const img2 = "/img/newHome/section2/img3-2.webp";
const img3 = "/img/newHome/section2/img3-3.webp";
const img4 = "/img/newHome/section2/img3-4.webp";

export default function CatleyaSlider() {
  const emblaOptions = { loop: true, axis: "y" };

  return (
    <SliderBase options={emblaOptions}>
      <div className="flex-[0_0_100%] min-w-0 h-full relative flex flex-col bg-[#0f0f11] overflow-hidden text-white">
        <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-screen z-1" />

        <div className="relative z-10 p-6 md:p-10 flex flex-col lg:flex-row gap-8 items-center lg:items-start text-white h-full justify-center lg:justify-between w-full max-w-5xl mx-auto">
          <div className="flex flex-col gap-3 items-start max-w-xl">
            <h3 className="text-white/90 text-2xl md:text-3xl font-bold tracking-tight font-sans">
              Sistema de Alojamiento & Reservas
            </h3>

            <p className="text-white/70 text-xs md:text-sm leading-relaxed max-w-xl">
              Plataforma web integral desarrollada para el sector hotelero,
              diseñada para integrar una experiencia de usuario de alto nivel
              con un sistema complejo de gestión de alojamientos. Como Frontend
              Developer, construí la interfaz completa utilizando React y Vite,
              enfocándome en la fluidez de la navegación y la seguridad en el
              flujo de pagos. Integración eficiente con API REST en Laravel.
            </p>

            {/* Acciones y Tecnologías */}
            <div className="flex items-center gap-3 mt-4">
              <Button
                onClick={() =>
                  window.open(
                    "https://catleyaroyalclub.com",
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
                color="default"
                variant="bordered"
                className="border-white/20 text-white hover:bg-white/10 transition-colors pointer-events-auto cursor-pointer"
                aria-label="Visitar sitio web del proyecto"
              >
                Ver Proyecto en Vivo ↗
              </Button>

              <Tooltip delay={0}>
                <Tooltip.Trigger>
                  <div role="button" tabIndex={0}>
                    <Button
                      isIconOnly
                      variant="flat"
                      className="bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-white transition-colors backdrop-blur-sm"
                      aria-label="Frontend"
                    >
                      <FaReact size={18} />
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
                      isIconOnly
                      variant="flat"
                      className="bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-white transition-colors backdrop-blur-sm"
                      aria-label="Backend"
                    >
                      <SiLaravel size={18} />
                    </Button>
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content showArrow offset={12}>
                  <Tooltip.Arrow />
                  <p className="text-sm font-medium">Laravel Backend</p>
                </Tooltip.Content>
              </Tooltip>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center h-full max-w-xs opacity-80 hover:opacity-100 transition-opacity">
            <img loading="lazy" decoding="async"
              src={logo}
              alt="Logo corporativo del proyecto"
              className="w-48 object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
            />
          </div>
        </div>
      </div>

      <div className="flex-[0_0_100%] min-w-0 h-full relative overflow-hidden bg-[#121214] flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-[95%] md:max-w-[85%] rounded-xl md:rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border border-neutral-800/50 bg-neutral-900">
          <img loading="lazy" decoding="async"
            className="w-full h-full object-cover select-none"
            src={img2}
            alt="Interfaz de usuario - Vista de reservas"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
      </div>

      <div className="flex-[0_0_100%] min-w-0 h-full relative overflow-hidden bg-[#121214] flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-[95%] md:max-w-[85%] rounded-xl md:rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border border-neutral-800/50 bg-neutral-900">
          <img loading="lazy" decoding="async"
            className="w-full h-full object-cover select-none"
            src={img3}
            alt="Interfaz de usuario - Panel de habitaciones"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
      </div>

      <div className="flex-[0_0_100%] min-w-0 h-full relative overflow-hidden bg-[#121214] flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-[95%] md:max-w-[85%] rounded-xl md:rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border border-neutral-800/50 bg-neutral-900">
          <img loading="lazy" decoding="async"
            className="w-full h-full object-cover select-none"
            src={img4}
            alt="Interfaz de usuario - Flujo de pago"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
      </div>
    </SliderBase>
  );
}
