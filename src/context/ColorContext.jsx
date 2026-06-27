import { createContext, useContext } from "react";

export const ColorContext = createContext();

export function useColor() {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColor debe ser usado dentro de un ColorProvider");
  }
  return context;
}