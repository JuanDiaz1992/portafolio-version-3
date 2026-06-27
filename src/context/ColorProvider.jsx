import { useState, useEffect } from "react";
import { ColorContext } from "./ColorContext";

const LISTA_COLORES = ["#8b5cf6", "#00e1ff", "#00ffcc", "#00ff66", "#ffaa00"];

export default function ColorProvider({ children }) {
  const [colorPrincipal, setColorPrincipal] = useState("#8b5cf6");
  const [intensidadMarco, setIntensidadMarco] = useState(1);

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

        document.documentElement.style.setProperty(
          "--color-dinamico",
          nuevoColor,
        );

        return nuevoColor;
      });
    };

    window.addEventListener("click", manejarClicGlobal);
    return () => window.removeEventListener("click", manejarClicGlobal);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ColorContext.Provider
      value={{
        colorPrincipal,
        setIntensidadMarco,
        intensidadMarco,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
}