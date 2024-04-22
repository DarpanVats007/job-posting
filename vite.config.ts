import { checker } from "vite-plugin-checker";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  //specify the jsxFactory and jsxFragment properties to tell Vite.js how to process JSX code.
  esbuild: {
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
  root: "./",
  build: {
    outDir: "build",
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
      },
    },
  },
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
    }),
  ],
  base: "/job-posting/",
});
