import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: false,
    rollupOptions: {
      input: "src/bridge.ts",
      output: {
        format: "iife",
        entryFileNames: "bridge.js",
        inlineDynamicImports: true,
      },
    },
  },
});