import { Tooltip } from "@heroui/react";
import { FaJs, FaReact, FaPhp, FaHtml5, FaCss3, FaWordpress, FaGithub, FaFigma, FaLinkedin  } from "react-icons/fa";
import { SiExpo, SiSpringboot, SiGmail, SiWhatsapp, SiGsap  } from "react-icons/si";
import { SiFramer } from "react-icons/si";
import { BiLogoBlender } from "react-icons/bi";
import { motion } from "framer-motion";
import { useGLTF } from "@react-three/drei";
import Viewer3d from "./ThreeJsVisor/Viewer3d";
import { useColor } from "../../context/ColorContext";
import CardEfect from "../CardEfect";

useGLTF.preload("/3d/Robot-final.glb");

const logo = "/img/newHome/section1/Logo-JuanDiaz-4.webp";
const logoFondo = "/img/newHome/section1/LogofondoClaro.webp";

export default function Section1() {
  const { colorPrincipal } = useColor();
const skills = [
  [<FaJs />, "JavaScript"],
  [<FaReact />, "React JS"],
  [<SiExpo />, "React Native Expo"],
  [<SiSpringboot />, "Spring Boot"],
  [<FaPhp />, "PHP"],
  [<FaHtml5 />, "HTML 5"],
  [<FaCss3 />, "CSS3"],
  [<FaWordpress />, "Wordpress"],
  [<FaGithub />, "GitHub"],
  [<FaFigma />, "Figma"],
  [<SiGsap  />, "GSAP"],
  [<SiFramer />, "Framer Motion"],
  [<BiLogoBlender />, "Blender"],
];

  const animationVariants = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
  };

  const cardBaseStyle = "rounded-[20px] t";

  return (
    <>
      <motion.section
        className="w-full mx-auto pt-8.75 gap-6 flex flex-col lg:flex-row justify-center min-h-232.5 lg:h-screen px-6"
        initial="initial"
        animate="animate"
        variants={animationVariants}
        transition={{
          duration: 0.7,
          ease: "linear",
          type: "spring",
        }}
      >
        <div className="flex flex-col sm:flex-row lg:flex-col w-full lg:w-[23%] gap-6 h-auto lg:h-full">
          <motion.div
            className={`${cardBaseStyle} bg-[#0a1724] relative flex justify-center items-start overflow-hidden px-8 pt-12 border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] h-62.5 sm:h-62.5 lg:h-[60%] w-full sm:w-1/2 lg:w-full`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              delay: 0.5,
              duration: 1,
              ease: "linear",
            }}
          >
            <motion.img
              className="max-w-45 lg:max-w-full inline-block align-middle z-4"
              src={logo}
              alt="logo"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{
                delay: 1,
                duration: 0.4,
                ease: "linear",
              }}
            />
            <motion.img
              className="absolute bottom-0 left-0 max-w-37.5 lg:max-w-full"
              src={logoFondo}
              alt="logoFondo"
              initial={{ y: 150, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -150, opacity: 0 }}
              transition={{
                delay: 1,
                duration: 0.9,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            />
          </motion.div>

          <div
            className={`${cardBaseStyle} bg-white dark:bg-zinc-900 border border-black/3 dark:border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex items-center justify-center py-6 h-30 sm:h-62.5 lg:h-[40%] w-full sm:w-1/2 lg:w-full`}
          >
            <div className="flex flex-wrap gap-6 justify-center items-center">
              {[
                {
                  href: "https://www.linkedin.com/in/juan-camilo-diaz-valencia-020840141",
                  label: "linkedin",
                  icon: <FaLinkedin />,
                },
                {
                  href: "mailto:juannavegante2010@gmail.com?subject=Greetings",
                  label: "E-mail",
                  icon: <SiGmail />,
                },
                {
                  href: "https://api.whatsapp.com/send?phone=573008080525&text=Hola%20Juan%20D%C3%ADaz%2C%20vi%20tu%20web",
                  label: "whatsapp",
                  icon: <SiWhatsapp />,
                },
                {
                  href: "https://github.com/JuanDiaz1992",
                  label: "github",
                  icon: <FaGithub />,
                },
              ].map((link, i) => (
                <div
                  key={i}
                  className="[&_svg]:text-zinc-500 [&_svg]:dark:text-zinc-400 [&_svg]:text-[32px] lg:[&_svg]:text-[36px] [&_svg]:transition-colors [&_svg]:duration-200 [&_svg]:hover:text-[#00e1ff]"
                >
                  <a href={link.href} target="blank" aria-label={link.label}>
                    {link.icon}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 w-full lg:w-[75%] h-auto lg:h-full justify-between">
          <div className="flex flex-col md:flex-row gap-6 h-120 md:h-auto md:min-h-75 lg:h-[38%] w-full relative">
            <div className="absolute bottom-5 left-5 right-5 md:right-auto z-10 max-w-full md:max-w-sm text-white">
              <div className="p-6 bg-black/40 md:bg-white/10 backdrop-blur-md rounded-xl">
                <h1 className="text-xl lg:text-2xl font-bold tracking-tight ">
                  Desarrollador de software
                </h1>
                <p className=" mt-2 text-xs lg:text-sm font-medium leading-relaxed">
                  Bienvenido a mi portafolio. Soy Juan Díaz. Me especializo en
                  el ciclo completo de creación de software: desde la
                  arquitectura técnica hasta el diseño de la interfaz,
                  asegurando que cada producto sea tan funcional como intuitivo.
                </p>
              </div>
            </div>
            <Viewer3d colorPrincipal={colorPrincipal} />
          </div>
          <div className="flex flex-col sm:flex-row gap-6 md:h-112.5 sm:h-162.5 lg:h-[58%] w-full">
            <CardEfect />

            <div
              className={`${cardBaseStyle} border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] flex flex-col bg-cover bg-center h-full w-full sm:w-[35%] lg:w-[30%] p-5 lg:p-6`}
              style={{
                backgroundImage: "url(/img/newHome/section1/Background3.webp)",
              }}
            >
              <div className="flex flex-col items-center w-full h-full justify-start overflow-hidden">
                <h2 className="text-white mb-5 lg:mb-6 text-lg lg:text-xl font-semibold border-b border-white/10 w-full text-center pb-2">
                  Tecnologías
                </h2>

                <div className="grid grid-cols-3 gap-y-6 gap-x-4 justify-items-center items-center w-full overflow-y-auto max-h-[85%] py-2 pr-1 no-scrollbar">
                  {skills.map((skill) => (
                    <div
                      key={skill[1]}
                      className="flex items-center justify-center"
                    >
                      <Tooltip delay={0}>
                        <Tooltip.Trigger>
                          <div
                            className={`text-white hover:text-[#00e1ff] flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-md text-3xl lg:text-4xl p-2 rounded-xl bg-white/5 border border-white/5 hover:border-[#00e1ff]/30 w-14 h-14`}
                            role="button"
                            tabIndex={0}
                            aria-label={skill[1]}
                          >
                            {skill[0]}
                          </div>
                        </Tooltip.Trigger>

                        <Tooltip.Content showArrow offset={12}>
                          <Tooltip.Arrow />
                          <p className="text-sm font-medium">{skill[1]}</p>
                        </Tooltip.Content>
                      </Tooltip>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
