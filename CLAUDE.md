# CLAUDE.md — Fathima Nursery Gardens

Read this file fully before making any change. Most tasks in this repo are submitted
from a phone, so there is no chance to course-correct mid-task. When a request is
ambiguous, follow the conventions here rather than inventing a new pattern.

---

## 1. What this is

Marketing and catalog website for **Fathima Nursery Gardens** — a wholesale plant
nursery based in Kerala, India, supplying plants across India (regular consignments
by rail to Kolkata, Assam and other states).

Domain: `fathimanursery.com`
Tagline: *Bringing back the green…*

### Audience

Trade buyers, in this order of priority:

1. Landscape contractors and garden designers
2. Retail nurseries and plant shops buying for resale
3. Builders, resorts, institutions and government/municipal greening projects
4. Event and interior decorators

These are **not** consumers buying one pot. They order in hundreds, they care about
availability, sizes, packing quality and whether you can actually deliver to their
state. Every page should answer a trade buyer's questions, not a hobbyist's.

### The job of the site

Convert a trade buyer into a WhatsApp or phone enquiry. That is the only conversion
event. Everything on the site serves it.

### Non-goals — do not build these

- No shopping cart, checkout, or payment integration
- No public prices (trade pricing is quoted per order and per quantity)
- No user accounts, login, or dashboard
- No blog until explicitly asked for
- No live stock counts (inventory is not connected to anything)
- No newsletter popup, no chat widget, no cookie banner unless asked

This is a **static content site**. If a task seems to need a database or a server,
stop and say so instead of adding one.

---

## 2. Stack

- **Astro** (static output, no SSR adapter)
- **Tailwind CSS** via `@astrojs/tailwind`
- **Astro content collections** for all plant and page data
- **Sharp** via `astro:assets` for image optimisation
- **Cloudflare Workers** (static assets) for hosting, deployed from the `main`
  branch via Workers Builds. Config is `wrangler.jsonc`; build command is
  `npm run build`, deploy command is `npx wrangler deploy`. It is an
  assets-only Worker serving `dist/` — there is no Worker entry point and no
  server-side code, and none should be added (see §1 non-goals).

Commands:

```bash
npm run dev      # local dev server
npm run build    # production build -> dist/
npm run preview  # preview the build
npm run check    # astro check, must pass before opening a PR
```

Build output is `dist/`. Node 20+.

### Rules

- No React, Vue, or Svelte. Astro components and plain JS only.
- No client-side JS unless a feature genuinely needs it. If you add a `client:*`
  directive, justify it in the PR description.
- No CSS files with custom classes. Tailwind utilities plus the theme tokens below.
  Shared visual patterns become Astro components, not CSS classes.
- No new npm dependency without saying why in the PR description. Prefer zero.

---

## 3. Brand

The logo is a single leaf mark with a green gradient and a white "F" cut into it,
set beside a navy serif wordmark with a black script tagline. Assets live in
`src/assets/brand/`. **Never redraw, recolour, restretch or regenerate the logo.**

### Colour tokens

Defined in `tailwind.config.mjs` under `theme.extend.colors`. Use the token names,
never raw hex, in components.

| Token | Hex | Use |
|---|---|---|
| `navy` | `#020D3A` | Headings, wordmark, footer background, primary text |
| `green` | `#00AB4F` | Primary action colour, links, active states |
| `lime` | `#8DC73F` | Secondary accent, hover states, the light end of the leaf gradient |
| `ink` | `#231F20` | Body copy, the tagline script |
| `bone` | `#F7F6F2` | Page background, section alternation |
| `mist` | `#E4E7E0` | Hairlines, dividers, card borders, table rules |

Derive the leaf gradient as `lime → green` (135deg) when a gradient is genuinely
needed. Use it sparingly — once per page at most. A page covered in green gradients
looks like a template.

Green is the *action* colour. Navy is the *structure* colour. Do not swap them.

### Typography

Loaded via `@fontsource-variable/*`, self-hosted. No Google Fonts CDN links.

- **Display — Newsreader.** Headings, plant names, the hero line. It echoes the
  serif of the wordmark without pretending to match it. Use at large sizes with
  tight tracking (`-0.02em`) and weight 400–500. Not for anything under 20px.
- **Body — Instrument Sans.** All running copy, navigation, buttons, labels.
- **Utility — IBM Plex Mono.** Specification data only: pot sizes, heights,
  quantities, order codes, dispatch details. Small, uppercase, wide tracking.

The mono face is a deliberate choice, not decoration. Nursery trade runs on spec
sheets, consignment notes and plant tags — the mono treatment makes the numeric
data on the site read as trade information rather than marketing copy. Keep it
strictly for data. Never set a sentence in mono.

### The signature element: the plant tag

Every plant on the site is presented as a **nursery tag** — the physical label tied
to a plant in the yard. A tag has: the common name in Newsreader, the botanical name
in italic beneath it, and a mono spec block with pot size, height range and
availability. A thin `mist` rule separates name from spec, echoing the punched
edge of a real tag.

This is the one memorable thing on the site. Everything around it stays quiet.
Do not add a second flashy device to compete with it.

### Voice

Plain, confident, specific. This is a working nursery, not a lifestyle brand.

- Say "We dispatch by rail to Kolkata and Assam" — not "We deliver nationwide."
- Say "Ask for availability" — not "Get in touch to discover our range."
- Numbers beat adjectives. Acreage, species count, years in operation, states served.
- Sentence case for headings and buttons. No exclamation marks.
- The tagline is a lockup element only. Do not use "Bringing back the green" as
  body copy or repeat it across pages.

---

## 4. Content model

All plant data lives in `src/content/plants/*.md`. Never hardcode plant details in
a component. The nursery team should be able to add plants by adding markdown files.

Schema (`src/content/config.ts`):

```ts
{
  name: string,                   // common name, e.g. "Areca Palm"
  botanical: string,              // e.g. "Dypsis lutescens"
  slug: string,                   // url segment, kebab-case
  category: enum,                 // see categories below
  potSizes: string[],             // e.g. ["6 inch", "8 inch", "10 inch"]
  heightRange: string,            // e.g. "60-90 cm"
  light: enum,                    // "full sun" | "partial shade" | "shade"
  availability: enum,             // "year round" | "seasonal" | "on order"
  minOrder: number | undefined,   // minimum units for trade order
  railDispatch: boolean,          // survives multi-day rail transit
  featured: boolean,              // appears on homepage
  images: image[],                // via astro:assets, first is primary
  order: number,                  // manual sort within category
  notes: string | undefined       // short trade note, max 200 chars
}
```

Categories (fixed list — do not invent new ones without asking):
`indoor` · `outdoor` · `flowering` · `fruit` · `palms` · `avenue` ·
`hedging` · `ground-cover` · `landscape-specimen`

Other content collections:

- `src/content/pages/` — about, packing-and-dispatch, projects
- `src/content/projects/` — completed landscape/supply projects, with photos

If a task needs a new field, add it to the schema **and** update every existing
markdown file so the build does not break. Never make a field required without
backfilling it.

---

## 5. Structure

```
src/
  assets/
    brand/          logo files — never modify
    plants/         plant photography, source resolution
  components/
    PlantTag.astro        the signature component
    PlantGrid.astro
    EnquiryButton.astro   WhatsApp deep link
    SectionHeading.astro
    Nav.astro
    Footer.astro
  content/
    plants/
    pages/
    projects/
    config.ts
  layouts/
    Base.astro
  pages/
    index.astro
    plants/index.astro
    plants/[slug].astro
    plants/category/[category].astro
    about.astro
    packing-and-dispatch.astro
    projects.astro
    contact.astro
```

### Pages and what each must do

- **Home** — what the nursery is, scale in numbers, featured plants, states served,
  one clear enquiry action.
- **Plants** — the full catalog, filterable by category. This is the page buyers
  actually come for. It must load fast with 200+ plants.
- **Plant detail** — the tag, larger, with all photos and a category-aware
  "enquire about this plant" action.
- **Packing and dispatch** — the credibility page. How plants are packed, how rail
  consignments work, transit times, which states are served regularly. This is the
  page that wins orders from buyers in Assam and Bengal. Treat it as important as
  the catalog, not as filler.
- **Projects** — proof of scale. Photos of completed supplies and landscapes.
- **About** — family business, years in operation, the yard itself.
- **Contact** — phone, WhatsApp, email, address, map, hours.

---

## 6. Enquiry handling

The only conversion path. Every enquiry action is a WhatsApp deep link:

```
https://wa.me/<NUMBER>?text=<prefilled>
```

Prefill the message with context, URL-encoded. From a plant page:
`Hi, I'd like to ask about availability of Areca Palm (Dypsis lutescens).`

Rules:

- Phone number and email live in `src/config.ts` as single constants. Never inline
  them in a component or a markdown file.
- Every page has a reachable enquiry action without scrolling to the footer.
- A plain `tel:` link sits alongside WhatsApp everywhere — some trade buyers still
  call.
- The contact form, if built, posts to a static form service and does not require
  a backend. WhatsApp is primary; the form is a fallback.

---

## 7. Quality floor

Non-negotiable on every PR:

- Responsive from 360px up. Trade buyers browse on phones in the field.
- All images through `astro:assets` with width, height and `alt`. Alt text names
  the plant, not "image of a plant".
- Lighthouse performance ≥ 90 on the plants index with the full catalog.
- Visible keyboard focus rings. Never `outline: none` without a replacement.
- Contrast: `ink` or `navy` on `bone`/white. Never `lime` text on white — it fails.
  Lime is a surface and accent colour only.
- `prefers-reduced-motion` respected on any animation.
- Every page has a unique title and meta description. Include the location and
  "wholesale" in titles — that is what buyers search.
- Structured data (`LocalBusiness`) on the contact page.

---

## 8. Working from mobile

Tasks are usually submitted from the Claude mobile app and reviewed as a PR.

- Keep each PR to one concern. A PR that changes the catalog layout and the nav
  and the colour tokens cannot be reviewed on a phone.
- Write PR descriptions that can be judged without opening the diff: what changed,
  which pages are affected, what to look at on the Cloudflare preview URL.
- If a task is underspecified, implement the smallest defensible version and list
  the open questions in the PR description. Do not guess at scope.
- Never force-push. Never commit directly to `main`.
- Run `npm run build` and `npm run check` before opening the PR. A failing build
  on a phone is a dead end.

---

## 9. Never do

- Never modify or regenerate the logo files
- Never add prices to the site
- Never invent plant facts, botanical names, dimensions or project details — if
  data is missing, use the placeholder `TODO:` and flag it in the PR
- Never add a cart, checkout, account system, or backend
- Never use stock photography of plants. Only real photos from the nursery. If a
  photo is missing, leave a labelled placeholder
- Never hardcode the phone number, email or address outside `src/config.ts`
- Never introduce a second display typeface or a colour outside the token list

---

## 10. TODO — needs input from the owner

These are unknown and must not be invented. Replace before launch:

- [ ] Exact business address and district in Kerala
- [ ] WhatsApp number and landline
- [ ] Business email
- [ ] Year established / years in operation
- [ ] Nursery area (acres) and approximate plant capacity
- [ ] Full list of states served regularly by rail
- [ ] GST number and registered entity name for the footer
- [ ] Photography: yard, packing, loading, and 20+ hero plants
