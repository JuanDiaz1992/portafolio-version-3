import { Button, Tooltip } from "@heroui/react";
import { motion } from "framer-motion";
import { FaReact } from "react-icons/fa";
import { SiSpring } from "react-icons/si";

import SliderBase from "../SliderEmbla/SliderBase";

const slider1 = "/img/newHome/section1/sliders/slider1.webp";
const slider2 = "/img/newHome/section1/sliders/slider2.webp";
const slider3 = "/img/newHome/section1/sliders/video1.mp4";
const video2 = "/img/newHome/section1/sliders/video3.mp4";

export default function Slider1() {
  const emblaOptions = { loop: true, axis: "y" };

  return (
    <SliderBase options={emblaOptions}>
      {/* 🌟 SLIDE 1: ALDÍA */}
      <div className="flex-[0_0_100%] min-w-0 h-full relative flex flex-col bg-[#ebb481] overflow-hidden">
        <div className="h-[40%] pt-8 md:pt-16 px-4 md:px-8 flex flex-col gap-2.5 items-flex-start text-black z-10">
          <h2 className="text-xl md:text-2xl font-bold bg-white text-black px-2 py-0.5 inline-block w-fit">
            ALDÍA
          </h2>
          <h3 className="text-base md:text-lg font-medium text-black">
            Asistente financiero
          </h3>
          <p className="max-w-[500px] w-[60%] mb-3.75 text-black text-sm md:text-base leading-normal">
            ALDÍA es una plataforma web que registra los ingresos y gastos del
            usuario, organizándolos mensual y anualmente, con estos datos genera
            gráficas con promedios. Actualmente se está desarrollando un módulo
            para determinar la obligación de presentar declaración de renta
            según los datos ingresados.
          </p>
          
          <div className="flex gap-2">
            {/* Tooltip React Js */}
            <Tooltip delay={0}>
              <Tooltip.Trigger>
                <div role="button" tabIndex={0}>
                  <Button
                    as="a"
                    href="https://github.com/JuanDiaz1992/alDiaFront"
                    target="_blank"
                    rel="noopener noreferrer"
                    isIconOnly
                    color="warning"
                    aria-label="Al Día Front"
                  >
                    <FaReact />
                  </Button>
                </div>
              </Tooltip.Trigger>
              <Tooltip.Content showArrow offset={12}>
                <Tooltip.Arrow />
                <p className="text-sm font-medium">React Js</p>
              </Tooltip.Content>
            </Tooltip>

            {/* Tooltip Spring Boot */}
            <Tooltip delay={0}>
              <Tooltip.Trigger>
                <div role="button" tabIndex={0}>
                  <Button
                    as="a"
                    href="https://github.com/JuanDiaz1992/AldiaBackJava"
                    target="_blank"
                    rel="noopener noreferrer"
                    isIconOnly
                    color="primary"
                    aria-label="Al Día Back"
                  >
                    <SiSpring />
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

        <div className="h-[60%] flex items-end justify-end">
          <motion.img
            className="h-full mr-[15px] max-w-full object-contain md:max-h-full sm:h-auto"
            src={slider1}
            alt=""
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            initial={{ y: 50 }}
            animate={{ y: 1 }}
            exit={{ y: 50 }}
            transition={{
              delay: 1,
              duration: 1,
              ease: "linear",
            }}
          />
        </div>
      </div>

      {/* 🌟 SLIDE 2: Solo Imagen */}
      <div className="flex-[0_0_100%] min-w-0 h-full relative flex overflow-hidden">
        <img
          className="w-full object-cover"
          src={slider2}
          alt=""
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        />
      </div>

      {/* 🌟 SLIDE 3: Video Containers */}
      <div className="flex-[0_0_100%] min-w-0 h-full relative overflow-hidden bg-[#b17961]">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover hidden sm:block"
        >
          <source src={slider3} type="video/mp4" />
        </video>
        
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover block sm:hidden"
        >
          <source src={video2} type="video/mp4" />
        </video>
      </div>
    </SliderBase>
  );
}