import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Adjust this if your app will not be served from the root
  build: {
    outDir: 'dist',
  },
});
