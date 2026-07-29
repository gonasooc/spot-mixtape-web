import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { App } from "@/App";
import "@/styles.css";

const root = document.getElementById("root")!;

const tree = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

/*
 * Production HTML is prerendered by scripts/prerender.mjs, so hydrate it.
 * The dev server has no prerender step and serves an empty root, so mount
 * from scratch instead of hydrating against nothing.
 */
if (import.meta.env.PROD) {
  hydrateRoot(root, tree);
} else {
  createRoot(root).render(tree);
}
