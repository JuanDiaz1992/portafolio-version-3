import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { irA } from "../utils/irA";

const CV = "/Documentos/Juan Camilo Diaz Valencia HV.pdf";

// Orden de la página. Cada sección activa un elemento del nav.
const SECCIONES = [
  ["inicio", "inicio"],
  ["portafolio", "proyectos"],
  ["proyectos", "proyectos"],
  ["sobre-mi", "sobre-mi"],
  ["proyectos-web", "proyectos"],
  ["proyectos-mas", "proyectos"],
  ["contacto", "contacto"],
];

const ENLACES = [
  { id: "inicio", texto: "Inicio" },
  { id: "proyectos", texto: "Proyectos" },
  { id: "sobre-mi", texto: "Sobre mí" },
  { id: "contacto", texto: "Contacto" },
];

// La refracción con filtros SVG dentro de backdrop-filter solo funciona en Chromium
const ES_CHROMIUM =
  typeof window !== "undefined" &&
  /Chrome\//.test(navigator.userAgent) &&
  !/Firefox\//.test(navigator.userAgent);

// Mapa de desplazamiento: en el borde (bisel) el fondo se curva,
// en el centro no se mueve. R = desplazamiento en X, G = en Y (128 = neutro).
function generarMapa(w, h, grosor) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");
  const img = ctx.createImageData(w, h);
  const d = img.data;
  const r = h / 2;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const px = x + 0.5;
      const py = y + 0.5;
      const cx = Math.min(Math.max(px, r), w - r);
      const dx = px - cx;
      const dy = py - r;
      const dist = Math.hypot(dx, dy);
      const e = r - dist; // distancia al borde, hacia dentro
      let vx = 0;
      let vy = 0;
      if (e >= 0 && e < grosor && dist > 0) {
        const m = Math.pow(1 - e / grosor, 2.2);
        vx = (dx / dist) * m;
        vy = (dy / dist) * m;
      }
      const i = (y * w + x) * 4;
      d[i] = Math.round(128 + vx * 127);
      d[i + 1] = Math.round(128 + vy * 127);
      d[i + 2] = 128;
      d[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c.toDataURL();
}

export default function Navbar() {
  const navRef = useRef(null);
  const itemsRef = useRef({});
  const [activo, setActivo] = useState("inicio");
  const [indicador, setIndicador] = useState({ left: 0, width: 0 });
  const [vidrio, setVidrio] = useState(null); // { w, h, mapa }

  // Mapa de refracción a la medida del nav (solo Chromium)
  useLayoutEffect(() => {
    if (!ES_CHROMIUM || !navRef.current) return;
    const medir = () => {
      const { offsetWidth: w, offsetHeight: h } = navRef.current;
      if (!w || !h) return;
      setVidrio((v) =>
        v && v.w === w && v.h === h ? v : { w, h, mapa: generarMapa(w, h, 16) },
      );
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(navRef.current);
    return () => ro.disconnect();
  }, []);

  // Sección activa según el scroll
  useEffect(() => {
    let raf = 0;
    const calcular = () => {
      raf = 0;
      const linea = window.innerHeight * 0.35;
      let actual = "inicio";
      for (const [id, item] of SECCIONES) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= linea) actual = item;
      }
      setActivo(actual);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(calcular);
    };
    calcular();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Posición de la "lente" que marca el elemento activo
  useLayoutEffect(() => {
    const el = itemsRef.current[activo];
    if (el) setIndicador({ left: el.offsetLeft, width: el.offsetWidth });
  }, [activo, vidrio]);

  const clase =
    "relative z-10 inline-flex items-center justify-center whitespace-nowrap min-h-11 px-3 sm:px-4 rounded-full text-[13px] sm:text-sm font-medium transition-colors duration-150";

  return (
    <>
      {vidrio && (
        <svg
          width="0"
          height="0"
          aria-hidden="true"
          style={{ position: "absolute" }}
          focusable="false"
        >
          <filter
            id="lg-refraccion"
            filterUnits="userSpaceOnUse"
            x="0"
            y="0"
            width={vidrio.w}
            height={vidrio.h}
            colorInterpolationFilters="sRGB"
          >
            <feImage
              href={vidrio.mapa}
              x="0"
              y="0"
              width={vidrio.w}
              height={vidrio.h}
              preserveAspectRatio="none"
              result="mapa"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="mapa"
              scale="34"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>
      )}

      <nav
        ref={navRef}
        aria-label="Principal"
        className={`liquid-glass ${vidrio ? "liquid-glass--refract" : ""} fixed top-3 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-0.5 rounded-full p-1`}
      >
        <span
          aria-hidden="true"
          className="lg-indicador"
          style={{
            width: indicador.width,
            transform: `translateX(${indicador.left}px)`,
            opacity: indicador.width ? 1 : 0,
          }}
        />
        {ENLACES.map((e) => (
          <a
            key={e.id}
            ref={(el) => (itemsRef.current[e.id] = el)}
            href={`#${e.id}`}
            aria-current={activo === e.id ? "location" : undefined}
            onClick={(ev) => {
              ev.preventDefault();
              irA(e.id);
            }}
            className={`${clase} ${activo === e.id ? "text-white" : "text-white/85 hover:text-white"}`}
          >
            {e.texto}
          </a>
        ))}
        <a
          href={CV}
          download="Juan_Camilo_Diaz_Valencia_HV.pdf"
          className={`${clase} text-white/85 hover:text-white`}
        >
          CV
        </a>
      </nav>
    </>
  );
}
