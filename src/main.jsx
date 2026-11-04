import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ColorProvider from "./context/ColorProvider.jsx";



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ColorProvider>
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <main
        id="contenido"
        tabIndex={-1}
        className="bg-background text-foreground min-h-screen outline-none"
      >
        <App />
      </main>
    </ColorProvider>
  </StrictMode>,
);
