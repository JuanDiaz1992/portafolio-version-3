import { Button, Tooltip } from "@heroui/react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiGmail, SiWhatsapp } from "react-icons/si";
import { useColor } from "../context/ColorContext";
import LazyVideo from "./LazyVideo";

const logo = "/img/newHome/section1/Logo-JuanDiaz-4.webp";

export default function Footer() {
  const { colorPrincipal } = useColor();

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <FaLinkedin size={20} />,
      url: "https://www.linkedin.com/in/juan-camilo-diaz-valencia-020840141",
      color: "hover:text-blue-400 hover:bg-white/10",
    },
    {
      name: "Gmail",
      icon: <SiGmail size={20} />,
      url: "mailto:juannavegante2010@gmail.com?subject=Greetings",
      color: "hover:text-red-400 hover:bg-white/10",
    },
    {
      name: "WhatsApp",
      icon: <SiWhatsapp size={20} />,
      url: "https://api.whatsapp.com/send?phone=573008080525&text=Hola%20Juan%20D%C3%ADaz%2C%20vi%20tu%20web",
      color: "hover:text-emerald-400 hover:bg-white/10",
    },
    {
      name: "GitHub",
      icon: <FaGithub size={20} />,
      url: "https://github.com/JuanDiaz1992",
      color: "hover:text-purple-400 hover:bg-white/10",
    },
  ];

  const techStack = ["React 19", "Tailwind", "GSAP", "Three.js"];

  return (
    <footer className="w-full h-screen relative overflow-hidden flex flex-col justify-end p-6 md:p-10">
      <LazyVideo src="/video/juandiaz-1.mp4" className="absolute inset-0 w-full h-full object-cover z-0" />

      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

      {/* LOGO EN LA ESQUINA SUPERIOR IZQUIERDA DE LA SECCIÓN */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 z-20">
        <img
          src={logo}
          alt="Logo Juan Díaz"
          className="w-32 sm:w-40 md:w-48 h-auto object-contain drop-shadow-lg"
        />
      </div>

      {/* TECNOLOGÍAS EN LA ESQUINA SUPERIOR DERECHA DE LA SECCIÓN */}
      <div className="absolute top-6 right-6 md:top-10 md:right-10 z-20 flex flex-col items-end gap-2 max-w-70 sm:max-w-none">
        <span className="text-xs sm:text-sm font-medium tracking-wider text-white/80 uppercase font-mono drop-shadow">
          Sitio desarrollado con:
        </span>
        <div className="flex flex-wrap items-center gap-2 justify-end">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 text-xs sm:text-sm font-mono font-semibold text-white/90 bg-black/50 border border-white/20 rounded-full backdrop-blur-md shadow-lg hover:border-white/40 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className="relative z-20 w-full max-w-[1600px] mx-auto mb-2 sm:mb-4">
        <div className="relative w-full rounded-[20px] bg-black/50 backdrop-blur-md border border-white/10 p-6 md:p-8 flex flex-col items-center justify-center gap-6 text-center shadow-2xl">
          <div className="flex flex-col items-center gap-1">
            <h4 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
              Juan Design
              <span style={{ color: colorPrincipal || "#38BDF8" }}>.</span>
            </h4>
            <p className="text-xs sm:text-sm text-white/70 font-normal">
              Desarrollo Web & Experiencias Digitales
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            {socialLinks.map((social) => (
              <Tooltip
                key={social.name}
                content={social.name}
                delay={0}
                closeDelay={0}
              >
                <Button
                  isIconOnly
                  variant="flat"
                  size="lg"
                  className={`bg-white/10 text-white ${social.color} border border-white/10 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer`}
                  onClick={() =>
                    window.open(social.url, "_blank", "noopener,noreferrer")
                  }
                  aria-label={social.name}
                >
                  {social.icon}
                </Button>
              </Tooltip>
            ))}
          </div>

          <div className="w-full pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/60 font-mono">
            <p>
              © {new Date().getFullYear()} Juan Díaz. Todos los derechos
              reservados.
            </p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Disponible para nuevos proyectos
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
