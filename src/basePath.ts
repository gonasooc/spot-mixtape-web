// Imported relatively rather than through "@" because vite.config.ts reads
// this module while resolving its own aliases.
import { site } from "./config/site";

/**
 * Sub-path this site is served from, without a trailing slash:
 * "/spot-mixtape-web" on a GitHub Pages project page, "" at an origin root.
 *
 * Vite's asset base, the router basename, and the prerendered redirect stubs
 * all derive from it, so moving hosts only means editing site.publicOrigin.
 */
export const basePath = new URL(site.publicOrigin).pathname.replace(/\/+$/, "");

/** Router basename form: React Router expects "/" rather than "" at the root. */
export const routerBasename = basePath || "/";

/** Prefixes a browser-resolved absolute path with the deployment sub-path. */
export function withBasePath(path: string): string {
  return `${basePath}${path}`;
}
