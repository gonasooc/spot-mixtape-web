import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import { App } from "@/App";

export { findUnresolvedConfigKeys, site } from "@/config/site";
export { routes } from "@/routes";

/** Called by scripts/prerender.mjs once per route. */
export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
}
