import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  base: './',
  server: { port: 5190, host: true },
  preview: { port: 4190, host: true },
  build: { sourcemap: true, target: 'es2022' },
});
