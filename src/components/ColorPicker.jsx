import { useColor } from "../context/ColorContext";

// Selector explícito del color de acento (antes cambiaba con cualquier clic)
export default function ColorPicker() {
  const { colorPrincipal, siguienteColor } = useColor();

  return (
    <button
      type="button"
      onClick={siguienteColor}
      aria-label="Cambiar color de acento"
      title="Cambiar color de acento"
      className="fixed bottom-4 right-4 z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 backdrop-blur-md transition-transform duration-150 ease-out active:scale-95 cursor-pointer"
    >
      <span
        className="h-5 w-5 rounded-full transition-colors duration-300"
        style={{ backgroundColor: colorPrincipal }}
      />
    </button>
  );
}
