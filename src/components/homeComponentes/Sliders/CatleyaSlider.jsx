import { Button, Tooltip } from "@heroui/react";
import { FaReact } from "react-icons/fa";
import { SiLaravel } from "react-icons/si";
import { useColor } from "../../../context/ColorContext";
import SliderBase from "../SliderEmbla/SliderBase";

const logo = "/img/newHome/section2/logo-catleya.svg";
const img2 = "/img/newHome/section2/img3-2.webp";
const img3 = "/img/newHome/section2/img3-3.webp";
const img4 = "/img/newHome/section2/img3-4.webp";

export default function CatleyaSlider() {
  const emblaOptions = { loop: true, axis: "y" };
  const { colorPrincipal } = useColor();

  return (
    <SliderBase options={emblaOptions}>
      {/* SLIDE 1: PANEL INFORMATIVO DEL PROYECTO */}
      <div className="flex-[0_0_100%] min-w-0 h-full relative flex flex-col bg-[#0f0f11] overflow-hidden text-white">
        {/* Efecto de rejilla o resplandor HUD sutil de fondo */}
        <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-screen z-1" />

        <div className="relative z-10 p-6 md:p-10 flex flex-col lg:flex-row gap-8 items-center lg:items-start text-white h-full justify-center lg:justify-between w-full max-w-5xl mx-auto">
          
          {/* Bloque de Textos y Datos */}
          <div className="flex flex-col gap-3 items-start max-w-xl">
            <h2
              style={{ color: colorPrincipal || "#fff" }}
              className="text-xs font-mono font-bold tracking-[0.2em] uppercase px-4 py-1 bg-black/90 backdrop-blur-md border border-white/5"
            >
              // HOTEL CATLEYA ROYAL CLUB
            </h2>
            <h3 className="text-white/90 text-2xl md:text-3xl font-bold tracking-tight font-sans">
              Servicios de Alojamiento
            </h3>
            <p className="text-white/70 text-xs md:text-sm leading-relaxed max-w-xl">
              Desarrollé la plataforma web integral para Catleya Royal Club, un proyecto que integra una experiencia de usuario de alto nivel con un sistema complejo de gestión hotelera. Como Frontend Developer, construí la interfaz completa utilizando React y Vite, enfocándome en la fluidez de la navegación y la seguridad en el flujo de pagos. Trabajé en estrecha colaboración con el equipo de backend (Laravel) para asegurar una integración eficiente de los datos, logrando una interfaz rápida, intuitiva y a la altura de la exclusividad del hotel.
            </p>

            {/* Acciones y Tecnologías */}
            <div className="flex items-center gap-3 mt-4">
              <Button
                as="a"
                href="https://catleyaroyalclub.com"
                color="default"
                variant="bordered"
                className="border-white/20 text-white hover:bg-white/10 transition-colors"
                aria-label="web"
              >
                Ir a Catleya Royal Club
              </Button>

              {/* Tooltip React */}
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

              {/* Tooltip Backend (Laravel) */}
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

          {/* Espacio del Logo lateral derecho (solo visible en pantallas grandes) */}
          <div className="hidden lg:flex items-center justify-center h-full max-w-xs opacity-80 hover:opacity-100 transition-opacity">
            <img 
              src={logo} 
              alt="Catleya Logo" 
              className="w-48 object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
              draggable={false} 
              onDragStart={(e) => e.preventDefault()} 
            />
          </div>
        </div>
      </div>

      {/* SLIDE 2: CAPTURA DE INTERFAZ 1 */}
      <div className="flex-[0_0_100%] min-w-0 h-full relative overflow-hidden bg-[#121214] flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-[95%] md:max-w-[85%] rounded-xl md:rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border border-neutral-800/50 bg-neutral-900">
          <img
            className="w-full h-full object-cover select-none"
            src={img2}
            alt="Catleya Vista 1"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
      </div>

      {/* SLIDE 3: CAPTURA DE INTERFAZ 2 */}
      <div className="flex-[0_0_100%] min-w-0 h-full relative overflow-hidden bg-[#121214] flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-[95%] md:max-w-[85%] rounded-xl md:rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border border-neutral-800/50 bg-neutral-900">
          <img
            className="w-full h-full object-cover select-none"
            src={img3}
            alt="Catleya Vista 2"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
      </div>

      {/* SLIDE 4: CAPTURA DE INTERFAZ 3 */}
      <div className="flex-[0_0_100%] min-w-0 h-full relative overflow-hidden bg-[#121214] flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-[95%] md:max-w-[85%] rounded-xl md:rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border border-neutral-800/50 bg-neutral-900">
          <img
            className="w-full h-full object-cover select-none"
            src={img4}
            alt="Catleya Vista 3"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
      </div>
    </SliderBase>
  );
}