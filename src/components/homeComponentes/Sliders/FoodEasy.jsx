import { Button, Tooltip } from "@heroui/react";
import { FaReact } from "react-icons/fa";
import { SiPhp } from "react-icons/si";
import { useColor } from "../../../context/ColorContext";
import SliderBase from "../SliderEmbla/SliderBase";

const video = "/img/newHome/section2/foodEasy.mp4";
const imgDesktop = "/img/newHome/section2/foodEasy.webp";
const imgTablet = "/img/newHome/section2/foodEasyTable.webp";
const imgMobile = "/img/newHome/section2/foodEasyMovil.webp";
const imgSlide2 = "/img/newHome/section2/foto1.webp";

export default function FoodEasySlider() {
  const emblaOptions = { loop: true, axis: "y" };
  const { colorPrincipal } = useColor();

  return (
    <SliderBase options={emblaOptions}>
      {/* SLIDE 1 */}
      <div className="flex-[0_0_100%] min-w-0 h-full relative flex flex-col bg-[#121214] overflow-hidden text-white">
        <div className="absolute inset-0 opacity-30 pointer-events-none mix-blend-screen z-1" />

        <picture className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
          <img
            src={imgDesktop}
            alt="FoodEasy Background"
            className="w-full h-full object-cover opacity-60 md:opacity-100 hidden lg:block"
          />
          <img
            src={imgTablet}
            alt="FoodEasy Background"
            className="w-full h-full object-cover hidden md:block lg:hidden"
          />
          <img
            src={imgMobile}
            alt="FoodEasy Background"
            className="w-full h-full object-cover  block md:hidden"
          />
        </picture>

        <div className="relative z-10 p-6 md:p-10 flex flex-col gap-2.5 items-start text-white h-full justify-start max-w-xl">
          <h2
            style={{ color: colorPrincipal || "#fff" }}
            className="text-xs font-mono font-bold tracking-[0.2em] uppercase px-4 py-1 bg-black/90 backdrop-blur-md"
          >
            // FOODEASY
          </h2>
          <h3 className="text-black/90 text-2xl md:text-3xl font-bold tracking-tight  font-['Antonio',sans-serif]">
            Restaurante
          </h3>
          <p className="text-black/90 text-xs md:text-sm leading-relaxed max-w-85">
            Software modular para gestión integral de restaurantes. Automatiza
            el manejo de facturación, menús dinámicos e inventarios de forma
            rápida y centralizada.
          </p>

          <div className="flex gap-2 mt-2">
            <Tooltip delay={0}>
              <Tooltip.Trigger>
                <div role="button" tabIndex={0}>
                  <Button
                    as="a"
                    href="https://github.com/JuanDiaz1992/Gestor-Restaurante-Frontend"
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
                    as="a"
                    href="https://github.com/JuanDiaz1992/Gestor-Restaurante-Backend"
                    isIconOnly
                    variant="flat"
                    className="bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-white transition-colors backdrop-blur-sm"
                    aria-label="Backend"
                  >
                    <SiPhp size={22} />
                  </Button>
                </div>
              </Tooltip.Trigger>
              <Tooltip.Content showArrow offset={12}>
                <Tooltip.Arrow />
                <p className="text-sm font-medium">PHP</p>
              </Tooltip.Content>
            </Tooltip>
          </div>
          <div className="mt-4 w-full border-t border-neutral-800/60 pt-4 max-w-md">
            <p className="text-[9px] font-mono text-black uppercase tracking-widest mb-3">
              // Implementado con éxito en
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <img
                src="/img/newHome/section2/Casandra.webp"
                alt="Casandra"
                className="h-6 md:h-9 object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SLIDE 2 */}
      <div className="flex-[0_0_100%] min-w-0 h-full relative flex bg-[#121214] items-center justify-center overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={imgSlide2}
          alt="FoodEasy Vista del menú"
          draggable={false}
        />
      </div>

      {/* SLIDE 3 */}
      <div className="flex-[0_0_100%] min-w-0 h-full relative overflow-hidden bg-[#121214] flex items-center justify-center p-4 md:p-8">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none mix-blend-screen z-1"
          style={{
            background: `radial-gradient(circle at 5% 95%, ${colorPrincipal || "rgba(255,255,255,0.15)"} 0%, transparent 35%)`,
          }}
        />

        <div className="w-full max-w-[95%] md:max-w-[85%]  rounded-xl md:rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border border-neutral-800/50 bg-black z-10 relative">
          <div className="absolute inset-0 bg-neutral-950/10 z-2 pointer-events-none" />

          <video
            key={video}
            loop
            autoPlay
            muted
            playsInline
            className="w-full h-full object-contain z-1"
            controls={false}
            disablePictureInPicture
            webkit-playsinline="true"
          >
            <source src={video} type="video/mp4" />
          </video>
        </div>
      </div>
    </SliderBase>
  );
}
