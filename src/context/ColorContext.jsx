import { createContext, useContext, useState, useEffect } from "react";

const ColorContext = createContext();
const LISTA_COLORES = ["#8b5cf6", "#00e1ff", "#00ffcc", "#00ff66", "#ffaa00"];
export function ColorProvider({ children }) {
  const [colorPrincipal, setColorPrincipal] = useState("#8b5cf6");

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--color-dinamico",
      colorPrincipal,
    );

    const manejarClicGlobal = (e) => {
      if (
        e.target.closest("button") ||
        e.target.closest("a") ||
        e.target.closest(".no-cambiar-color")
      ) {
        return;
      }

      setColorPrincipal((colorActual) => {
        const indiceActual = LISTA_COLORES.indexOf(colorActual);
        const siguienteIndice = (indiceActual + 1) % LISTA_COLORES.length;
        const nuevoColor = LISTA_COLORES[siguienteIndice];

        // Seteamos la variable CSS global para Tailwind
        document.documentElement.style.setProperty(
          "--color-dinamico",
          nuevoColor,
        );

        return nuevoColor;
      });
    };

    window.addEventListener("click", manejarClicGlobal);
    return () => window.removeEventListener("click", manejarClicGlobal);
  }, []);

  return (
    <ColorContext.Provider value={{ colorPrincipal }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColor() {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColor debe ser usado dentro de un ColorProvider");
  }
  return context;
}
