import { useColor } from "../context/ColorContext";

export default function MarcoCinematico() {
  const { colorPrincipal } = useColor();

  return (
    <div
      className="fixed inset-0 pointer-events-none z-999 transition-shadow duration-700 ease-out"
      style={{
        boxShadow: `inset 0 0 60px 15px ${colorPrincipal}33, inset 0 0 20px 0px ${colorPrincipal}22`,
        mixBlendMode: "screen",
      }}
    />
  );
}