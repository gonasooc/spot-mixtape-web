/**
 * Reports any value in src/config/site.ts that is still a placeholder.
 * Exits non-zero so it can gate a deploy once the real values are in place.
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(resolve(ROOT, "src/config/site.ts"), "utf8");

const PLACEHOLDER = /(?:\bREQUIRED\b|example\.com|YYYY-MM-DD)/i;

const lines = source.split("\n");
// Scan only the `site` object literal, so the detector's own regex and the
// doc comments describing what to replace are not reported as findings.
const start = lines.findIndex((line) => line.includes("export const site = {"));
const end = lines.findIndex(
  (line, index) => index > start && line.startsWith("} as const;"),
);

if (start === -1 || end === -1) {
  console.error(
    "config:check — could not locate the `site` object literal in src/config/site.ts.",
  );
  process.exit(2);
}

const unresolved = lines
  .slice(start + 1, end)
  .map((line, index) => ({ line: line.trim(), number: start + 2 + index }))
  .filter(
    ({ line }) =>
      !/^(?:\/\/|\/\*|\*)/.test(line) && PLACEHOLDER.test(line),
  );

if (unresolved.length === 0) {
  console.log("config:check — src/config/site.ts has no placeholder values.");
  process.exit(0);
}

console.error(
  `config:check — ${unresolved.length} placeholder value(s) remain in src/config/site.ts:\n`,
);
for (const { line, number } of unresolved) {
  console.error(`  src/config/site.ts:${number}  ${line}`);
}
console.error(
  "\nReplace each value and have the legal text reviewed before deploying.",
);
process.exit(1);
