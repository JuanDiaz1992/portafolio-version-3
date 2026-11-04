import { useEffect, useRef } from "react";
import { Button, Tooltip } from "@heroui/react";
import { FaWordpress } from "react-icons/fa";
import { BiStore } from "react-icons/bi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Imágenes importadas según tu estructura original
const woman = "/img/newHome/section3/dani.webp";
const plants = "/img/newHome/section3/daniPlants.webp";
const dbank = "/img/newHome/section3/dbank.webp";

export default function Section7() {
  const sectionRef = useRef(null);
  const dbankContainerRef = useRef(null);
  const card2Ref = useRef(null);
  const plantsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animación Fade In Up para las 2 tarjetas
      gsap.fromTo(
        [dbankContainerRef.current, card2Ref.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // 2. Animación GSAP para reemplazar el 'whileInView' / scale de Framer Motion en la planta
      if (plantsRef.current) {
        gsap.fromTo(
          plantsRef.current,
          { scale: 0.85, opacity: 0.7 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card2Ref.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="proyectos-mas"
      ref={sectionRef}
      className="w-full mx-auto bg-white px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-8 relative z-10"
    >
      <div className="w-full flex flex-col lg:flex-row gap-8 items-stretch justify-center">
        <div
          ref={dbankContainerRef}
          className="w-full md:w-[60%] bg-[#0B1528] rounded-[20px] p-6 sm:p-8 overflow-hidden relative flex flex-col justify-between border border-white/10 shadow-xl group"
        >
          <div className="flex flex-col gap-2 z-20 max-w-sm">

            <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              Servicios Financieros & Banking
            </h3>

            <p className="text-white/80 text-xs leading-relaxed mt-1 max-w-85 font-light">
              Desarrollo de ecosistema web a medida utilizando plantillas
              personalizadas. Diseñado para la gestión de servicios bancarios
              internacionales, integración de blogs de noticias financieras y
              soporte dinámico multi-idioma.
            </p>

            <div className="flex flex-wrap gap-3 mt-3">
              <Button
                onClick={() =>
                  window.open(
                    "https://www.dbankonline.com",
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
                size="sm"
                className="font-semibold text-white shadow-lg bg-sky-600 hover:bg-sky-500 transition-colors cursor-pointer"
                aria-label="Ver proyecto de banca digital"
              >
                Ver Proyecto en Vivo ↗
              </Button>

              <Tooltip delay={0}>
                <Tooltip.Trigger>
                  <div>
                    <Button
                      isIconOnly
                      variant="flat"
                      size="sm"
                      className="bg-white/10 hover:bg-white/20 text-white cursor-default transition-colors z-10"
                      aria-label="Wordpress"
                    >
                      <FaWordpress size={18} />
                    </Button>
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content showArrow offset={12}>
                  <Tooltip.Arrow />
                  <p className="text-xs font-medium">
                    Wordpress / Custom Templates
                  </p>
                </Tooltip.Content>
              </Tooltip>
            </div>
          </div>

          {/* Mockup / Imagen DBank posicionada adentro */}
          <div className="absolute right-[-5%] bottom-[-5%] pointer-events-none overflow-hidden z-10 w-[60%] sm:w-[90%] h-auto">
            <img loading="lazy" decoding="async"
              src={dbank}
              alt="Plataforma de banca digital"
              className="w-full h-auto object-contain object-bottom-right drop-shadow-2xl rounded-2xl"
            />
          </div>
        </div>

        {/* ================= DIV 2: MANGO BICHE MÍA (FifthSlider) ================= */}
        <div
          ref={card2Ref}
          className="w-full lg:w-1/2 rounded-[20px] shadow-lg border border-white/20 overflow-hidden relative flex flex-col items-center justify-between bg-[#DDFCFF]"
        >
          {/* Header Card (Texto y Botón) */}
          <div className="flex flex-col gap-2 z-20 w-full p-6 sm:p-8">

            <h3 className="text-black text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              Modelo de Franquicia
            </h3>

            <p className="text-black/80 text-xs leading-relaxed mt-1 max-w-65 font-normal">
              Plataforma web desarrollada para la franquicia, enfocada en
              proyectar la identidad de marca, exponer sus servicios clave e
              impulsar la captación de nuevos inversores.
            </p>

            <div className="flex flex-wrap gap-3 mt-3">
              <Button
                onClick={() =>
                  window.open(
                    "https://www.mangobichemia.com/",
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
                size="sm"
                className="font-semibold text-black shadow-md bg-amber-500 hover:bg-amber-400 transition-colors cursor-pointer"
                aria-label="Ver proyecto de franquicia"
                endContent={<BiStore size={16} />}
              >
                Ver Proyecto en Vivo ↗
              </Button>

              <Tooltip delay={0}>
                <Tooltip.Trigger>
                  <div>
                    <Button
                      isIconOnly
                      variant="flat"
                      size="sm"
                      className="bg-black/10 hover:bg-black/20 text-black cursor-default transition-colors z-10"
                      aria-label="Tecnología Web"
                    >
                      <FaWordpress size={18} />
                    </Button>
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content showArrow offset={12}>
                  <Tooltip.Arrow />
                  <p className="text-xs font-medium">Wordpress / Elementor</p>
                </Tooltip.Content>
              </Tooltip>
            </div>
          </div>

          <div className="w-full relative flex justify-center items-end mt-auto pointer-events-none select-none z-10">
            <img loading="lazy" decoding="async"
              src={woman}
              alt="Modelo de la franquicia"
              className="w-75 sm:w-87.5 md:w-112.5 lg:w-120 object-contain relative z-10"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
            />

            <img loading="lazy" decoding="async"
              ref={plantsRef}
              src={plants}
              alt="Plantas decorativas"
              className="w-75 sm:w-87.5 md:w-112.5 lg:w-150 object-contain absolute bottom-0 z-20"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
