import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
// @ts-ignore idk random stuff
import eslintPlugin from 'vite-plugin-eslint';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), eslintPlugin()],
  base: '/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
})
