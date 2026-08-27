import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  base: './',
  server: { port: 5195, host: true },
  preview: { port: 4195, host: true },
  build: { sourcemap: true, target: 'es2022' },
});
