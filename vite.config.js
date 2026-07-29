import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    chunkSizeWarningLimit: 4000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) {
              return 'vendor-three'; // Todo lo 3D a su propio chunk
            }
            if (id.includes('framer-motion')) {
              return 'vendor-motion'; // Animaciones
            }
            if (id.includes('react-icons') || id.includes('lucide') || id.includes('tabler')) {
              return 'vendor-icons'; // Íconos
            }
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-core'; // Núcleo de React
            }
          }
        },
      },
    },
  },
});