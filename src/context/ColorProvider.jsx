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

  }, [colorPrincipal]);

  // El color ya no cambia con cualquier clic: se cambia con el selector explícito
  const siguienteColor = () =>
    setColorPrincipal((actual) => {
      const i = LISTA_COLORES.indexOf(actual);
      return LISTA_COLORES[(i + 1) % LISTA_COLORES.length];
    });

  return (
    <ColorContext.Provider
      value={{
        colorPrincipal,
        setIntensidadMarco,
        intensidadMarco,
        siguienteColor,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
}