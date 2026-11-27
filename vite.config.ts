import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    rollupOptions: {
      external: ['@xyflow/react', 'd3-force'],
    },
  },
  server: { port: 4173, strictPort: true },
});
