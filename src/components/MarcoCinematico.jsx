import { useColor } from "../context/ColorContext";

export default function MarcoCinematico() {
  const { colorPrincipal, intensidadMarco } = useColor();

  const hexToRgb = (hex) => {
    const cleanHex = hex.replace("#", "");
    const bigint = parseInt(cleanHex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  };

  const rgbDinamico = hexToRgb(colorPrincipal || "#34465C");

  const opacidad1 = Math.round(20 * intensidadMarco) / 100;
  const opacidad2 = Math.round(13 * intensidadMarco) / 100;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 transition-all duration-1000 ease-in-out"
      style={{
        boxShadow: `
          inset 0 0 60px 15px rgba(${rgbDinamico}, ${opacidad1}),
          inset 0 0 20px 0px rgba(${rgbDinamico}, ${opacidad2})
        `,
        mixBlendMode: "screen",
      }}
    />
  );
}
