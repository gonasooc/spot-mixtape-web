import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import { App } from "@/App";
import { routerBasename, withBasePath } from "@/basePath";

export { basePath, withBasePath } from "@/basePath";
export { findUnresolvedConfigKeys, site } from "@/config/site";
export { routes } from "@/routes";

/**
 * Called by scripts/prerender.mjs once per route path, e.g. "/privacy".
 * StaticRouter matches against the full request path, so the deployment
 * sub-path has to be added back before the basename strips it again.
 */
export function render(url: string): string {
  return renderToString(
    <StaticRouter basename={routerBasename} location={withBasePath(url)}>
      <App />
    </StaticRouter>,
  );
}
