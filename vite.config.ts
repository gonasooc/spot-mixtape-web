import { fileURLToPath, URL } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import { basePath } from "./src/basePath";

export default defineConfig(({ isPreview }) => ({
  plugins: [react(), tailwindcss()],

  /* Emitted asset URLs must carry the deployment sub-path, and Vite wants it
   * with a trailing slash. An origin-root deployment collapses this to "/". */
  base: `${basePath}/`,

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
