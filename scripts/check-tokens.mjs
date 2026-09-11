/**
 * Guards the token contract in src/styles.css.
 *
 * Tailwind derives `text-<name>` from both the colour and the font-size
 * namespaces. When one name lives in both, `text-<name>` silently resolves to
 * the colour and the font size is lost — body copy painted the background
 * colour, with no build error and no runtime warning. This catches that, and
 * the same hazard for the other namespaces `text-*` draws from.
 *
 * Exits non-zero so it can gate a build.
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(resolve(ROOT, "src/styles.css"), "utf8");

const theme = source.slice(
  source.indexOf("@theme {"),
  source.indexOf("\n}", source.indexOf("@theme {")),
);

/** Every `--<namespace>-<name>` declared in @theme, grouped by namespace. */
function namesIn(namespace) {
  const pattern = new RegExp(`^\\s*--${namespace}-([a-z0-9-]+)\\s*:`, "gim");
  const found = new Set();

  for (const [, name] of theme.matchAll(pattern)) {
    // `--text-body--line-height` configures an existing step, it is not one.
    if (!name.endsWith("--line-height")) found.add(name);
  }

  return found;
}

/** Utility prefixes that read from more than one namespace. */
const SHARED_PREFIXES = [
  { utility: "text-*", namespaces: ["color", "text"] },
  { utility: "font-*", namespaces: ["font", "font-weight"] },
];

const collisions = [];

for (const { utility, namespaces } of SHARED_PREFIXES) {
  const [first, ...rest] = namespaces.map((namespace) => ({
    namespace,
    names: namesIn(namespace),
  }));

  for (const other of rest) {
    for (const name of first.names) {
      if (other.names.has(name)) {
        collisions.push({ utility, name, namespaces: [first.namespace, other.namespace] });
      }
    }
  }
}

if (collisions.length === 0) {
  console.log("tokens:check — no token name is shared across a utility prefix.");
  process.exit(0);
}

console.error(
  `tokens:check — ${collisions.length} token name(s) claimed by two namespaces:\n`,
);
for (const { utility, name, namespaces } of collisions) {
  const declared = namespaces.map((namespace) => `--${namespace}-${name}`);
  console.error(`  ${utility.replace("*", name)}  ←  ${declared.join(" and ")}`);
}
console.error(
  "\nRename one of them. The utility resolves to a single namespace, so the\n" +
    "other token becomes unreachable without any error being reported.",
);
process.exit(1);
