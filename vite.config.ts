import { fileURLToPath, URL } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ isPreview }) => ({
  plugins: [react(), tailwindcss()],

  /*
   * `vite dev` has no prerendered files, so it needs the SPA history fallback.
   * `vite preview` must NOT have it: production is a static host serving the
   * prerendered files, and the fallback would hide broken URLs and 404s.
   */
  appType: isPreview ? "mpa" : "spa",

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    target: "es2022",
  },
}));
