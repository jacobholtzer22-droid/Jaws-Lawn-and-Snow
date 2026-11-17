# BUILD-REPORT — jaws-lawn-snow (site_update: tracking install)

## Result: STOPPED. No code or config changes made. Human decision needed.

The tracking described in `INSTRUCTIONS.md` is **already installed and live** on this site. This repo was never built from AA-Template, so the template's version of tracking can't be dropped in as written. Doing it anyway would load gtag twice and **count every conversion twice**.

## 1. What was asked
Part 1: add the template's `components/GoogleTag.tsx`, render it from `app/layout.tsx`, add a `tracking` zod field to `lib/config-schema.ts`, and add verify check 22 to `scripts/verify.ts`.
Part 2: write `tracking: { googleAdsId: 'AW-16904298088', conversions: { form: 'AW-16904298088/xDtACOrK8bUaEOi8zPw-', call: 'AW-16904298088/QTMMCPj496QcEOi8zPw-' } }` into `site.config.ts`, then pass the gate including check 22.

## 2. What the repo actually is
- No `lib/config-schema.ts`, `lib/config.ts`, `scripts/verify.ts` or `npm run verify`. `package.json` has only `dev`, `build`, `start` and `lint`. `next.config.mjs` has no `output: 'export'`, so there is no `./out`. `site.config.ts` exports a plain typed `site` object with no zod schema.
- Commit `fe043cc` ("feat: Google Ads conversion tracking (quote form + phone clicks)") already installed exactly these ids:
  - `lib/gtag-conversions.ts`: `GOOGLE_ADS_ID = "AW-16904298088"`, `quoteForm: "AW-16904298088/xDtACOrK8bUaEOi8zPw-"`, `phoneClick: "AW-16904298088/QTMMCPj496QcEOi8zPw-"`. These are identical to the instructions.
  - `app/layout.tsx` loads gtag.js and configs the id on every page.
  - `components/ContactForm.tsx` fires the form conversion only after a 2xx from the CRM.
  - `components/PhoneLink.tsx` fires the call conversion on click. Every `tel:` link on the site goes through PhoneLink.

## 3. Why I did not apply it
- **It would double-count.** The template's GoogleTag adds a second loader, a document-wide `tel:` click listener and a form watcher. Each phone click would then fire `QTMMCPj496QcEOi8zPw-` twice: once from PhoneLink and once from the listener. Google Ads would report inflated conversions.
- **Two of the required files are forbidden in CI.** AGENT.md forbids editing `lib/config-schema.ts` and `scripts/verify.ts` "without exception". It also says a tracking-install diff that touches anything except `site.config.ts` is wrong by construction. Here, neither file exists.
- **Part 2 has nothing to read it.** No code here reads `site.tracking`, so adding the block alone would be a dead, misleading key.
- **The brief is incomplete.** The check 22 snippet in INSTRUCTIONS.md is truncated: the block ends before `problems` is recorded and before its braces close. Check 22 also depends on a gate and helpers (`record`, `pages`, `cfg`, `CONTACT_ENDPOINT`) that don't exist here.
- **The brief's premise is wrong.** It says this is "a repo whose template predates tracking support". This repo is not on the template, and it already has tracking.

## 4. Verification of the existing tracking (in place of the gate)
`npm run build` passes (16 prerendered HTML pages).
- All 16 pages in `.next/server/app/**/*.html` contain `googletagmanager.com/gtag/js?id=AW-16904298088`. None are missing it.
- Both conversion labels are in the shipped client JS (`.next/static/chunks/169-*.js` and others).
- There is no `npm run verify` gate in this repo, so check 22 and its "N/N" can't be run.

## 5–7. Design self-check / photos / old-site facts
Not applicable. No content, design or image changes on this run.

## 8. For the human
Pick one:
1. **(Recommended) Do nothing.** The site already tracks AW-16904298088 with both labels. Mark the tracking install done in ops.
2. **Move this repo onto the template's config-driven tracking.** Remove `lib/gtag-conversions.ts`, the `<Script>` tags in `app/layout.tsx` and the `reportConversion` calls in `ContactForm.tsx` and `PhoneLink.tsx`. Add the template's schema, `lib/config` and verify gate. This is a template migration, not a tracking install. It needs an interactive session, because it touches files CI is barred from editing.

Note that `ContactForm.tsx` here is not the sealed template form. Its success view has no `role="status"`, and it routes to `/thanks`. The template's `main [role="status"]` watcher would not fire on it anyway.
