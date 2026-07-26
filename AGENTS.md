# Docs — Suprvisr documentation site

Nextra 3 on Next.js, built as a **static export** (`output: 'export'` → `out/`). This is
the customer-facing documentation site; it contains no application code and talks to no API.

This is an independent git repo. `main` = production.

## Commands

```bash
npm install
npm run dev      # dev server on :3000 (conflicts with frontend — run one at a time)
npm run build    # static export to out/ — this is what CI gates on
```

There are no tests and no lint script. `npm run build` is the only signal, and it is enough
for a content site: a malformed MDX file, a broken import, or a bad `_meta.ts` entry fails
the build.

## Layout

| Path | Contents |
|---|---|
| `pages/` | 36 `.mdx` content pages. Sections: `getting-started/`, `features/`, `guides/`, `faq/`, `updates/` |
| `pages/_meta.ts` | Navigation — order and display titles. A page not listed here is unreachable in the sidebar |
| `theme.config.tsx` | Nextra theme config (logo, footer, repo links) |
| `components/` | Two custom MDX components |
| `styles/`, `public/` | CSS and static assets |
| `DOCS_TEMPLATE.mdx` | Starting point for a new page |

## For agents working here

### Adding a page

1. Create the `.mdx` file under the right section directory.
2. **Add it to that directory's `_meta.ts`** — otherwise it builds but never appears in the
   navigation, which is the most common mistake here.
3. Run `npm run build` before pushing.

### Type errors are deliberately ignored

`next.config.mjs` sets `typescript: { ignoreBuildErrors: true }`. That is not neglect:
Nextra's `_meta.ts` files default-export a config object, which Next's generated page-type
validator insists must be a React component. `npx tsc --noEmit` therefore fails on every
`_meta.ts`, for reasons outside this repo's control. Don't "fix" those errors and don't add
a typecheck gate expecting them to pass.

### Deployment

Static export. `out/` and `.vercel/` are gitignored — the `.vercel/project.json` in a local
checkout holds placeholder IDs (`"_"`) and is not a live project link. Confirm the current
hosting target before making any change that depends on it; this repo does **not** deploy
alongside backend/frontend/daemon.

### Content conventions

- Write for customers, not developers. Internal architecture belongs in the app repos.
- Prefer short pages joined by navigation over long scrolling ones — Nextra's sidebar is
  the primary way people find things.
