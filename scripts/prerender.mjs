/**
 * Renders every route in src/routes.ts to static HTML.
 *
 * The result is a set of real pages that a store reviewer, a crawler, or a
 * browser with JavaScript disabled can read in full. React then hydrates the
 * same markup and takes over navigation.
 */
import {
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = resolve(ROOT, "dist");
const SSR_DIST = resolve(ROOT, "dist-ssr");

const { findUnresolvedConfigKeys, render, routes, site } = await import(
  pathToFileURL(resolve(SSR_DIST, "entry-server.js")).href
);

const template = readFileSync(resolve(DIST, "index.html"), "utf8");

function escapeAttribute(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildHead(meta) {
  const canonical = `${site.publicOrigin}${meta.path === "/404" ? "/" : meta.path}`;

  return [
    `<meta name="description" content="${escapeAttribute(meta.description)}" />`,
    `<meta name="robots" content="${meta.indexable ? "index,follow" : "noindex,follow"}" />`,
    `<link rel="canonical" href="${escapeAttribute(canonical)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeAttribute(site.appName)}" />`,
    `<meta property="og:locale" content="ko_KR" />`,
    `<meta property="og:title" content="${escapeAttribute(meta.title)}" />`,
    `<meta property="og:description" content="${escapeAttribute(meta.description)}" />`,
    `<meta property="og:url" content="${escapeAttribute(canonical)}" />`,
    `<meta name="twitter:card" content="summary" />`,
  ].join("\n    ");
}

/**
 * Static hosts disagree about extensionless URLs: Netlify and Cloudflare Pages
 * resolve /privacy to privacy/index.html, plain nginx and S3 do not. Writing
 * both privacy.html and privacy/index.html makes /privacy, /privacy/, and
 * /privacy.html resolve everywhere. The canonical tag keeps SEO on /privacy.
 */
function outputPathsFor(routePath) {
  if (routePath === "/") return [resolve(DIST, "index.html")];
  if (routePath === "/404") return [resolve(DIST, "404.html")];

  const slug = routePath.replace(/^\//, "");
  return [resolve(DIST, `${slug}.html`), resolve(DIST, slug, "index.html")];
}

let written = 0;

for (const meta of routes) {
  const appHtml = render(meta.path);

  const html = template
    .replace("<!--app-html-->", appHtml)
    .replace(
      /<title>[\s\S]*?<\/title>/,
      `<title>${escapeAttribute(meta.title)}</title>`,
    )
    .replace(
      /<meta name="theme-color" content="[^"]*" \/>/,
      `<meta name="theme-color" content="${meta.themeColor}" />`,
    )
    .replace("</head>", `  ${buildHead(meta)}\n  </head>`);

  for (const outputPath of outputPathsFor(meta.path)) {
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, html, "utf8");
    written += 1;
  }
}

const indexable = routes.filter((route) => route.indexable);

writeFileSync(
  resolve(DIST, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable
  .map((route) => `  <url><loc>${site.publicOrigin}${route.path}</loc></url>`)
  .join("\n")}
</urlset>
`,
  "utf8",
);

writeFileSync(
  resolve(DIST, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${site.publicOrigin}/sitemap.xml\n`,
  "utf8",
);

rmSync(SSR_DIST, { recursive: true, force: true });

console.log(`prerender: wrote ${written} pages + sitemap.xml + robots.txt`);

const unresolved = findUnresolvedConfigKeys();
if (unresolved.length > 0) {
  console.warn(
    `\n⚠️  src/config/site.ts still has ${unresolved.length} placeholder value(s):\n` +
      unresolved.map((key) => `   - ${key}`).join("\n") +
      `\n   Replace and legally review these before deploying.\n`,
  );
}
