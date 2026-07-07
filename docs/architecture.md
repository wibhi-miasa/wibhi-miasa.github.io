# Architecture

## File Structure

```
wibhi-miasa.github.io/
├── index.html                  # HTML entry; loads Google Fonts
├── vite.config.ts              # Vite config (React plugin only)
├── tailwind.config.js          # Custom fonts + neutral-950 color
├── tsconfig.json
├── package.json
│
├── content/
│   └── projects/               # One .md file per project (source of truth for project content)
│       ├── marketmate.md
│       ├── pedipal.md
│       ├── lexi.md
│       ├── wellsave.md
│       └── visiontalk.md
│
├── images/                     # All image assets (referenced as /images/filename.png)
│   └── marketmate_*.png        # Real images exist only for MarketMate currently
│
├── docs/
│   ├── design.md               # Design system reference
│   └── architecture.md         # This file
│
└── src/
    ├── main.tsx                # React root; wraps app in HashRouter
    ├── App.tsx                 # Route declarations
    ├── index.css               # Tailwind base layers
    │
    ├── data/
    │   └── portfolio.ts        # personalInfo, skills, experience — all personal data
    │
    ├── lib/
    │   └── projects.ts         # YAML parser + import.meta.glob loader → exports `projects[]`
    │
    ├── pages/
    │   ├── Home.tsx
    │   ├── Projects.tsx
    │   ├── About.tsx
    │   ├── Project.tsx         # Most complex page; handles carousel + section dispatch
    │   └── Contact.tsx
    │
    └── components/
        ├── Layout.tsx          # Shell: fixed nav + footer + <Outlet>
        ├── ProjectCard.tsx     # Horizontal card (used on Home only)
        ├── ResearchMethods.tsx # Hardcoded MarketMate data
        ├── KeyFindings.tsx     # Hardcoded MarketMate data
        ├── DesignDecision.tsx  # Hardcoded MarketMate data
        ├── Reflections.tsx     # Hardcoded MarketMate data
        ├── SolutionImages.tsx  # Generic: takes `images` prop
        └── ImageCarousel.tsx   # Generic: takes `images` prop
```

---

## Routing

`HashRouter` is used instead of `BrowserRouter` because GitHub Pages does not support server-side rewriting. All URLs are hash-based (`/#/about`, `/#/project/marketmate-qvm-navigation`).

```
/                   → Home.tsx
/projects           → Projects.tsx
/about              → About.tsx
/project/:slug      → Project.tsx  (slug matches frontmatter `slug` field)
/contact            → Contact.tsx
```

All routes are children of the `Layout` route, which provides the persistent nav and footer via `<Outlet>`.

```
App.tsx
└── <Route element={<Layout />}>
    ├── /            → <Home>
    ├── /projects    → <Projects>
    ├── /about       → <About>
    ├── /project/:slug → <Project>
    └── /contact     → <Contact>
```

If a `slug` doesn't match any known project, `Project.tsx` redirects to `/`.

`Layout.tsx` includes a `ScrollToTop` component that fires `window.scrollTo(0, 0)` on every route change.

---

## Content System

Project content flows from markdown files through a parser to the UI:

```
content/projects/*.md
        │
        ▼
src/lib/projects.ts
  import.meta.glob('/content/projects/*.md', { eager: true, query: '?raw' })
  → parseFrontmatter(raw)   ← custom YAML parser (browser-safe)
  → sort by `order` field
  → export const projects: ProjectItem[]
        │
        ▼
Consumed by pages:
  Home.tsx        → projects.slice(0, 3)
  Projects.tsx    → projects (all)
  About.tsx       → projects (all, as link cards)
  Project.tsx     → projects.find(p => p.slug === slug)
```

The `gray-matter` package is in `package.json` but is not used in the browser bundle. The custom parser in `projects.ts` handles the subset of YAML actually used in frontmatter (string values, inline arrays `[a, b]`, block lists `- item`, and integers).

### Frontmatter fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `slug` | string | yes | Must match the route parameter |
| `category` | string | yes | Displayed as meta label on cards |
| `title` | string | yes | |
| `subtitle` | string | yes | Short descriptor under the title |
| `description` | string | yes | Longer text shown on detail page header |
| `image` | string | yes | Thumbnail used on cards (path relative to root) |
| `tags` | string[] | yes | Rendered as pill tags |
| `order` | number | yes | Sort order across the site |
| `heroImages` | string[] | no | Enables the hero carousel on the detail page |
| `timeline` | string | no | Shown in the metadata strip |
| `team` | string | no | Shown in the metadata strip |
| `role` | string | no | Shown in the metadata strip |
| `tools` | string | no | Shown in the metadata strip |
| `repoUrl` | string | no | Falls back for `ctaUrl` |
| `prototypeUrl` | string | no | Falls back for `ctaUrl` |
| `ctaLabel` | string | no | Button label; defaults to "View project" |
| `ctaUrl` | string | no | Explicit CTA URL; falls back to `prototypeUrl` then `repoUrl` |

---

## Project Detail Page — Section Dispatch

`Project.tsx` splits the markdown body at `## headings` to produce a list of sections. Each section is rendered as a two-column row (text left, visual right). The visual side is chosen by heading name:

```
## Research Methods   →  <ResearchMethods />          (hardcoded MarketMate data)
## Key Findings       →  <KeyFindings />              (hardcoded MarketMate data)
## Design Decision    →  <DesignDecision />           (hardcoded MarketMate data)
## Reflections        →  <Reflections />              (hardcoded MarketMate data)
## Solution           →  <SolutionImages images={…} /> (if ≥ 2 images in section)
## Design Process     →  <ImageCarousel images={…} />  (if ≥ 1 image in section)
## Overview (no img)  →  single-column text only
anything else         →  generic <img> or gradient placeholder
```

Heading matching is case-insensitive (`section.heading.trim().toLowerCase()`).

Images are extracted from the markdown text with a regex before rendering, so they appear in the visual column rather than inline in the prose.

### Alternating layout counter

Sections alternate left/right using CSS `direction: rtl` on the grid row:

- The counter starts at 0 and increments for each two-column section
- `## Overview` without an image is single-column and does **not** increment the counter
- `## Research Methods` **resets** the counter to 1, forcing text to the left side regardless of position

---

## Data Flow Summary

```
portfolio.ts ──────────────────────────────► Layout.tsx (name in nav/footer)
                                           ► Home.tsx (name, bio, email, github)
                                           ► About.tsx (bio, skills, experience, links)
                                           ► Contact.tsx (email, linkedin)

projects.ts (lib) ─────────────────────────► Home.tsx (first 3)
                                           ► Projects.tsx (all)
                                           ► About.tsx (all, as links)
                                           ► Project.tsx (one, by slug)

content/projects/*.md ─────────────────────► projects.ts (parsed at build time)

images/ ────────────────────────────────────► Referenced by frontmatter `image` / `heroImages`
                                              and inline markdown `![alt](/images/...)` in body
```

---

## Adding a New Project

1. Create `content/projects/<slug>.md` with all required frontmatter fields
2. Add images to `images/` — reference them as `/images/filename.ext`
3. Write the body using `## Heading` to separate sections
4. Set `order` to control where it appears in lists
5. If the project needs specialized section components (like MarketMate's research stats), either:
   - Add props to the existing hardcoded components, or
   - Create a new component and add a new heading name to the dispatch table in `Project.tsx`

No TypeScript changes are needed if the project follows the standard heading template (Overview, Problem, User Journey, Design Process, Solution, Reflection).
