import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const html = readFileSync(resolve(root, "index.html"), "utf8");
const failures = [];

function requireRule(condition, message) {
  if (!condition) failures.push(message);
}

const h1Count = (html.match(/<h1\b/gi) ?? []).length;
const ids = [...html.matchAll(/\sid="([^"]+)"/gi)].map((match) => match[1]);
const blankLinks = [...html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/gi)].map((match) => match[0]);
const localAssets = [...html.matchAll(/(?:src|href)="((?:assets|css|js)\/[^"]+)"/gi)].map((match) => match[1]);

requireRule(h1Count === 1, `Expected exactly one h1, found ${h1Count}.`);
requireRule(ids.length === new Set(ids).size, "Duplicate HTML IDs found.");
requireRule(!/javascript\s*:/i.test(html), "javascript: URL found.");
requireRule(!/\son[a-z]+\s*=/i.test(html), "Inline event handler found.");
requireRule(blankLinks.every((link) => /rel="[^"]*noopener[^"]*noreferrer[^"]*"/i.test(link)), "External target=_blank link is missing noopener noreferrer.");
requireRule(html.includes("Content-Security-Policy"), "Content Security Policy meta tag is missing.");
requireRule(html.includes("object-src 'none'"), "CSP must block object sources.");
requireRule(html.includes("form-action 'none'"), "CSP must block form submissions.");

for (const asset of localAssets) {
  requireRule(existsSync(resolve(root, asset)), `Missing local asset: ${asset}`);
}

if (failures.length) {
  console.error("Static security verification failed:\n");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Static security verification passed (${localAssets.length} assets, ${blankLinks.length} external links).`);
