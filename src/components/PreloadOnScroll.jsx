import { useState, useEffect, useRef, Suspense } from "react";

// Componente Wrapper para precarga inteligente
export function PreloadOnScroll({
  children,
  fallback = null,
  offset = "600px",
}) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Si ya se decidió cargar, no necesitamos seguir observando
    if (shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true); // Se activa la descarga antes de llegar
          observer.disconnect();
        }
      },
      {
        // rootMargin define qué tan "adelantado" se dispara la carga.
        // "600px 0px" significa: "actívate 600px ANTES de que el elemento toque la pantalla"
        rootMargin: `${offset} 0px ${offset} 0px`,
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [shouldLoad, offset]);

  return (
    <div ref={containerRef} className="w-full">
      {shouldLoad ? (
        <Suspense fallback={fallback}>{children}</Suspense>
      ) : (
        fallback
      )}
    </div>
  );
}
