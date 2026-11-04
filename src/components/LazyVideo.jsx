import { useEffect, useRef, useState } from "react";

// Video de fondo que solo se descarga al acercarse a la pantalla,
// se pausa al salir de ella y no se reproduce con movimiento reducido.
export default function LazyVideo({ src, className = "", ...rest }) {
  const ref = useRef(null);
  const [cargado, setCargado] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (e.isIntersecting) setCargado(true);
      },
      { rootMargin: "200px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || !cargado) return;
    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (visible && !reducir) v.play().catch(() => {});
    else v.pause();
  }, [visible, cargado]);

  return (
    <video
      ref={ref}
      src={cargado ? src : undefined}
      preload="none"
      loop
      muted
      playsInline
      disablePictureInPicture
      className={className}
      {...rest}
    />
  );
}
