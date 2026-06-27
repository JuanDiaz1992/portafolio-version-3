import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ColorProvider from "./context/ColorProvider.jsx";



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ColorProvider>
      <main className="bg-background text-foreground min-h-screen">
        <App />
      </main>
    </ColorProvider>
  </StrictMode>,
);
