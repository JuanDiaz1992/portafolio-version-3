import { useEffect, useRef } from "react";
import { Button, Tooltip } from "@heroui/react";
import { FaWordpress } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useColor } from "../../context/ColorContext";

gsap.registerPlugin(ScrollTrigger);

// Rutas de imágenes
const newProjectImg = "/img/newHome/wordpressSection/k.webp";
const newProjectBg = "/img/newHome/wordpressSection/kpimg12.webp";
const attics = "/img/newHome/wordpressSection/americanp.webp";
const california = "/img/newHome/wordpressSection/california.webp";
const kbFineArt = "/img/newHome/wordpressSection/kb_fine_art.webp";
const kb1 = "/img/newHome/wordpressSection/eryi_6.webp";
const kb2 = "/img/newHome/wordpressSection/Banner2.webp";
const kb3 = "/img/newHome/wordpressSection/suzanne_howes_k_b_fine_art_5.webp";
const kb4 = "/img/newHome/wordpressSection/suzanne_howes_k_b_fine_art_1.webp";

export default function Section6() {
  const { colorPrincipal } = useColor();
  const kbContainerRef = useRef(null);
  const kb1Ref = useRef(null);
  const kb2Ref = useRef(null);
  const kb3Ref = useRef(null);
  const kb4Ref = useRef(null);

  const californiaTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animación KB Fine Art
      if (kbContainerRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: kbContainerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          kb1Ref.current,
          { x: 35, rotate: -18, scale: 0.95 },
          { x: 0, rotate: -25, scale: 1, duration: 0.8, ease: "back.out(1.2)" },
          0,
        )
          .fromTo(
            kb3Ref.current,
            { x: 45, rotate: 10, scale: 0.95 },
            {
              x: 0,
              rotate: 15,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.2)",
            },
            0.08,
          )
          .fromTo(
            kb2Ref.current,
            { x: 25, rotate: 30, scale: 0.95 },
            {
              x: 0,
              rotate: 20,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.2)",
            },
            0.16,
          )
          .fromTo(
            kb4Ref.current,
            { x: 35, rotate: -10, scale: 0.95 },
            {
              x: 0,
              rotate: -8,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.2)",
            },
            0.24,
          );
      }

      // 2. Animación Fade Up California (Texto entra con delay para ver primero la imagen)
      if (californiaTextRef.current) {
        gsap.fromTo(
          californiaTextRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: 0.35, // Tiempo suficiente para apreciar el fondo antes
            ease: "power3.out",
            scrollTrigger: {
              trigger: californiaTextRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-linear-to-b from-black to-white relative z-50 py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full flex flex-col lg:flex-row gap-8 items-stretch">
        <div className="flex-1 flex flex-col gap-8">
          {/* KPK */}
          <div className="w-full bg-[#0E2E52] rounded-[20px] p-6 sm:p-9 border border-white/10 shadow-lg flex flex-col lg:flex-row justify-between items-center lg:items-end gap-6 relative overflow-hidden">
            <img
              src={newProjectBg}
              alt=""
              aria-hidden="true"
              className="absolute -left-8 -bottom-10 w-72 md:w-150 pointer-events-none select-none z-0 object-contain"
            />

            <div className="flex flex-col gap-3 w-full lg:max-w-[55%] z-10">
              <h4
                style={{ color: colorPrincipal || "#fff" }}
                className="text-[10px] md:text-xs font-mono font-bold tracking-[0.2em] uppercase px-2.5 py-0.5 bg-white/10 border border-white/10 w-fit rounded-xs"
              >
                // Climatización y Soluciones de Aislamiento
              </h4>

              <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                Plataforma Web Corporativa
              </h3>

              <p className="text-white/80 text-xs sm:text-sm leading-relaxed mt-1">
                Desarrollo web integral para una compañía especializada en
                sistemas de climatización (HVAC), calefacción y aislamiento
                térmico en EE. UU. Diseñé una arquitectura de información
                enfocada en la conversión, optimizando la estructura de
                servicios para facilitar la solicitud de cotizaciones y mejorar
                el posicionamiento SEO local.
              </p>

              <div className="flex flex-wrap gap-3 mt-3">
                <Button
                  onClick={() =>
                    window.open(
                      "https://kpkenterprise.com/",
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                  size="sm"
                  className="font-semibold text-white shadow-lg bg-blue-600 hover:bg-blue-500 transition-colors cursor-pointer"
                  aria-label="Ir al proyecto"
                >
                  Ver Proyecto en Vivo ↗
                </Button>

                <Tooltip delay={0}>
                  <Tooltip.Trigger>
                    <div role="button" tabIndex={0}>
                      <Button
                        isIconOnly
                        variant="flat"
                        size="sm"
                        className="bg-white/10 hover:bg-white/20 text-white cursor-default transition-colors"
                        aria-label="Wordpress"
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

            <div className="w-full lg:w-[42%] flex justify-center lg:justify-end z-10">
              <img
                src={newProjectImg}
                alt="Tech Camp Explorers"
                width="1200"
                height="1800"
                className="w-full h-auto max-h-75 object-contain rounded-lg drop-shadow-xl"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 flex-1">
            {/* KB FINE ART */}
            <div
              ref={kbContainerRef}
              className="w-full md:w-[60%] bg-[#EBB481] rounded-[20px] p-6 sm:p-8 overflow-hidden relative flex flex-col justify-between border border-white/20 shadow-lg min-h-95"
            >
              <div className="flex flex-col gap-2 z-20 max-w-xs">
                <h4
                  style={{ color: colorPrincipal || "#fff" }}
                  className="text-[10px] md:text-xs font-mono font-bold tracking-[0.2em] uppercase px-2.5 py-0.5 bg-[#423b34] border border-white/5 w-fit rounded-xs"
                >
                  // KB FINE ART
                </h4>
                <h3 className="text-black text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                  Galería de Arte
                </h3>
                <p className="text-black text-xs leading-relaxed mt-1 max-w-45">
                  Desarrollo web para una tienda de arte, diseñada para exhibir
                  obras únicas.
                </p>

                <div className="flex flex-wrap gap-3 mt-3">
                  <Button
                    onClick={() =>
                      window.open(
                        "https://kbfineartgallery.com/",
                        "_blank",
                        "noopener,noreferrer",
                      )
                    }
                    size="sm"
                    className="font-semibold text-white shadow-lg bg-emerald-600 hover:bg-emerald-500 transition-colors cursor-pointer"
                    aria-label="Visitar demo de la plataforma"
                  >
                    Ver Proyecto en Vivo ↗
                  </Button>
                  <Tooltip delay={0}>
                    <Tooltip.Trigger>
                      <div role="button" tabIndex={0}>
                        <Button
                          isIconOnly
                          variant="flat"
                          size="sm"
                          className="bg-black/10 hover:bg-black/20 text-black cursor-default transition-colors z-10"
                          aria-label="Wordpress"
                        >
                          <FaWordpress size={18} />
                        </Button>
                      </div>
                    </Tooltip.Trigger>
                    <Tooltip.Content showArrow offset={12}>
                      <Tooltip.Arrow />
                      <p className="text-xs font-medium">
                        Wordpress / Elementor
                      </p>
                    </Tooltip.Content>
                  </Tooltip>
                </div>
              </div>

              {/* Mockups de KB Fine Art  */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                <img
                  src={kbFineArt}
                  alt="kbFineArt"
                  className="absolute right-[-5%] bottom-[-5%] z-10 w-[55%] h-auto max-w-none object-contain object-bottom-right"
                />

                <img
                  ref={kb1Ref}
                  src={kb1}
                  alt="Obra 1"
                  className="absolute z-20 top-[15%] left-[35%] w-37.5 h-auto rounded-lg shadow-2xl border border-white/20 origin-center"
                />

                <img
                  ref={kb3Ref}
                  src={kb3}
                  alt="Obra 3"
                  className="absolute z-10 top-[25%] right-[18%] w-47.5 h-auto rounded-lg shadow-2xl border border-white/20 origin-center"
                />

                <img
                  ref={kb2Ref}
                  src={kb2}
                  alt="Obra 2"
                  className="absolute z-30 bottom-[15%] left-[20%] w-47.5 h-auto rounded-lg shadow-2xl border border-white/20 origin-center"
                />

                <img
                  ref={kb4Ref}
                  src={kb4}
                  alt="Obra 4"
                  className="absolute z-0 bottom-[8%] right-[40%] w-27.5 h-auto rounded-lg shadow-md border border-white/10 origin-center"
                />
              </div>
            </div>

            {/* California */}
            <div className="w-full md:w-[40%] bg-[#190003] rounded-[20px] p-6 sm:p-8 flex flex-col justify-between overflow-hidden border border-white/10 shadow-xl relative">
              <div
                ref={californiaTextRef}
                className="flex flex-col gap-2 z-10 backdrop-blur-md bg-[#190003]/65 p-4 sm:p-5 rounded-2xl border border-white/10 shadow-lg"
              >
                <h4
                  style={{ color: colorPrincipal || "#FF2D54" }}
                  className="text-[10px] md:text-xs font-mono font-bold tracking-[0.2em] uppercase px-2.5 py-0.5 bg-white/5 border border-white/10 w-fit rounded-xs"
                >
                  // AISLAMIENTO & SERVICIOS HOGAR
                </h4>

                <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                  Aislamiento & Limpieza de Áticos
                </h3>

                <p className="text-white/90 text-xs leading-relaxed mt-1 max-w-80">
                  Plataforma web para empresa de servicios residenciales en
                  California. Estructura enfocada en soluciones de aislamiento
                  térmico, limpieza de áticos (*crawl spaces*) y sellado de
                  conductos de aire.
                </p>

                <div className="flex flex-wrap gap-3 mt-3">
                  <Button
                    onClick={() =>
                      window.open(
                        "https://americanattics.co/",
                        "_blank",
                        "noopener,noreferrer",
                      )
                    }
                    size="sm"
                    className="font-semibold text-white shadow-md bg-[#FF2D54] hover:bg-[#ff4366] transition-all cursor-pointer"
                    aria-label="Ver Proyecto"
                  >
                    Ver Proyecto ↗
                  </Button>

                  <Tooltip delay={0}>
                    <Tooltip.Trigger>
                      <div role="button" tabIndex={0}>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="flat"
                          className="bg-white/10 hover:bg-white/20 text-white cursor-default transition-colors"
                          aria-label="Wordpress"
                        >
                          <FaWordpress size={16} />
                        </Button>
                      </div>
                    </Tooltip.Trigger>
                    <Tooltip.Content showArrow offset={12}>
                      <Tooltip.Arrow />
                      <p className="text-xs font-medium">
                        Wordpress / Elementor
                      </p>
                    </Tooltip.Content>
                  </Tooltip>
                </div>
              </div>

              <div className="w-full flex justify-center z-0 pointer-events-none">
                <img
                  src={california}
                  alt="Servicios de aislamiento y climatización en California"
                  className="h-auto object-contain w-[90%] drop-shadow-2xl -mt-40"
                />
              </div>
            </div>
          </div>
        </div>

        {/*  ATTIC'S EXPRESS */}
        <div className="w-full lg:w-[320px] xl:w-95 bg-[#0b978e] rounded-[20px] px-6 pt-6 flex flex-col justify-between overflow-hidden border border-white/10 shadow-md">
          <div className="flex flex-col gap-3 z-10">
            <h4
              style={{ color: colorPrincipal || "#fff" }}
              className="text-[10px] md:text-xs font-mono font-bold tracking-[0.2em] uppercase px-2.5 py-0.5 bg-black/60 border border-white/10 w-fit rounded-xs text-white"
            >
              // SERVICIOS DE PLOMERÍA
            </h4>
            <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              Plataforma para Servicios de Plomería
            </h3>
            <p className="text-white/90 text-xs sm:text-sm leading-relaxed mt-2">
              Desarrollé una plataforma web orientada a la conversión rápida de
              leads para servicios de plomería residencial y comercial en EE.
              UU., optimizando la atención de emergencias 24/7.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Button
                onClick={() =>
                  window.open(
                    "https://americansplumbing.com",
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
                size="sm"
                className="font-semibold text-white shadow-md bg-teal-900 hover:bg-teal-800 transition-colors cursor-pointer"
                aria-label="Ir a Attics Express"
              >
                Ver Proyecto ↗
              </Button>
              <Tooltip delay={0}>
                <Tooltip.Trigger>
                  <div role="button" tabIndex={0}>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      className="bg-white/10 hover:bg-white/20 text-white cursor-default transition-colors"
                      aria-label="Wordpress"
                    >
                      <FaWordpress size={16} />
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
          <img
            src={attics}
            alt="attics express"
            className="w-full h-auto object-contain 5 mt-8"
          />
        </div>
      </div>
    </section>
  );
}
