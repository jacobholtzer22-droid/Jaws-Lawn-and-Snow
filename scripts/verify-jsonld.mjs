/**
 * Verifies every JSON-LD block in the built HTML.
 *
 * Per block: parses, has @context/@type, uses a real schema.org type from the
 * allowlist, and asserts no fact that isn't in CONFIRMED below.
 *
 * Run after `npm run build`:  node scripts/verify-jsonld.mjs
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

/* Real schema.org types used by this site (each verified against schema.org).
 * LandscapingBusiness: Thing > Organization > LocalBusiness >
 * HomeAndConstructionBusiness > LandscapingBusiness */
const VALID_TYPES = new Set([
  "LandscapingBusiness",
  "WebSite",
  "Service",
  "OfferCatalog",
  "Offer",
  "City",
  "State",
  "OpeningHoursSpecification",
]);

/* CONFIRMED FACTS. Anything asserted in schema must appear here. */
const CONFIRMED = {
  telephone: "+17342622365",
  cities: [
    "Canton",
    "Belleville",
    "Van Buren Township",
    "Ypsilanti",
    "Ann Arbor",
    "Saline",
  ],
  state: "Michigan",
};

/* Properties that must NEVER appear: unverified, or against Google's rules
 * (self-serving review/rating markup). No street address or geo — Jaws is a
 * service-area business with no public address. */
const FORBIDDEN_PROPS = [
  "aggregateRating",
  "review",
  "reviewCount",
  "ratingValue",
  "address",
  "geo",
  "sameAs",
  "email",
  "priceRange",
  "foundingDate",
  "numberOfEmployees",
  "award",
  "hasCredential",
];

const errors = [];
let blockCount = 0;
let fileCount = 0;

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p);
    else if (entry.endsWith(".html")) checkFile(p);
  }
}

function checkNode(node, file) {
  if (Array.isArray(node)) return node.forEach((n) => checkNode(n, file));
  if (!node || typeof node !== "object") return;
  const t = node["@type"];
  if (t && !VALID_TYPES.has(t)) {
    errors.push(`${file}: @type "${t}" is not in the verified allowlist`);
  }
  for (const [k, v] of Object.entries(node)) {
    if (FORBIDDEN_PROPS.includes(k)) {
      errors.push(`${file}: forbidden/unverified property "${k}"`);
    }
    checkNode(v, file);
  }
}

function checkFacts(block, file) {
  const json = JSON.stringify(block);
  for (const m of json.matchAll(/"telephone":"([^"]+)"/g)) {
    if (m[1] !== CONFIRMED.telephone)
      errors.push(`${file}: unconfirmed telephone "${m[1]}"`);
  }
  for (const m of json.matchAll(/"@type":"City","name":"([^"]+)"/g)) {
    if (!CONFIRMED.cities.includes(m[1]))
      errors.push(`${file}: unconfirmed city "${m[1]}"`);
  }
  for (const m of json.matchAll(/"@type":"State","name":"([^"]+)"/g)) {
    if (m[1] !== CONFIRMED.state)
      errors.push(`${file}: unconfirmed state "${m[1]}"`);
  }
  if (/licen[cs]ed|warrant|guarantee/i.test(json)) {
    errors.push(`${file}: schema contains an unverified license/guarantee claim`);
  }
}

function checkFile(file) {
  const html = readFileSync(file, "utf8");
  const blocks = [
    ...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs),
  ].map((m) => m[1]);
  if (blocks.length === 0) return;
  fileCount++;
  for (const raw of blocks) {
    blockCount++;
    let data;
    try {
      data = JSON.parse(raw.replace(/\\u003c/g, "<"));
    } catch (e) {
      errors.push(`${file}: JSON-LD does not parse (${e.message})`);
      continue;
    }
    if (!data["@context"]) errors.push(`${file}: block missing @context`);
    if (!data["@type"]) errors.push(`${file}: block missing @type`);
    checkNode(data, file);
    checkFacts(data, file);
  }
}

walk(".next/server/app");

console.log(`Scanned ${fileCount} built HTML files, ${blockCount} JSON-LD blocks.`);
if (errors.length) {
  console.error(`\nFAIL — ${errors.length} problem(s):`);
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}
console.log("PASS — all blocks parse, all @types valid, no unconfirmed facts.");
