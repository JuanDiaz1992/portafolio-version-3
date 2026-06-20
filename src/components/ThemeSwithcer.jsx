import { Button, useTheme } from "@heroui/react";

export default function ThemeSwitcher() {
  // 🌟 Importamos el hook nativo de HeroUI (por defecto en modo sistema)
  const { resolvedTheme, setTheme } = useTheme("system");

  return (
    <div className="flex items-center gap-2 p-4">
      {/* Botón para Modo Claro */}
      <Button
        variant={resolvedTheme === "light" ? "solid" : "flat"}
        color={resolvedTheme === "light" ? "primary" : "default"}
        onPress={() => setTheme("light")}
      >
        Claro ☀️
      </Button>

      {/* Botón para Modo Oscuro */}
      <Button
        variant={resolvedTheme === "dark" ? "solid" : "flat"}
        color={resolvedTheme === "dark" ? "primary" : "default"}
        onPress={() => setTheme("dark")}
      >
        Oscuro 🌙
      </Button>
    </div>
  );
}