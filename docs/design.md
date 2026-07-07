# Design System

## Color Palette

The entire palette is neutral grays. There is no brand color — the aesthetic is intentionally monochromatic.

### Core colors

| Token | Hex | Usage |
|---|---|---|
| `white` | `#ffffff` | Page background |
| `neutral-50` | `#fafafa` | Card backgrounds, surface fills |
| `neutral-100` | `#f5f5f5` | Hover states, image placeholders |
| `neutral-200` | `#e5e5e5` | Borders, dividers, tag outlines |
| `neutral-300` | `#d4d4d4` | Button borders (outlined), icon borders |
| `neutral-400` | `#a3a3a3` | Meta labels, section headings, placeholder text |
| `neutral-500` | `#737373` | Body copy, subtitles, descriptions |
| `neutral-700` | `#404040` | Hover state for filled buttons |
| `neutral-800` | `#262626` | Card headings, secondary headings |
| `neutral-900` | `#171717` | Primary headings, filled button background |
| `neutral-950` | `#0a0a0a` | Defined in config; near-black, rarely used directly |

### Accent (one-off)

| Token | Hex | Usage |
|---|---|---|
| `emerald-50` | `#ecfdf5` | Background highlight on the AR column in the DesignDecision table |
| `emerald-600` | `#059669` | Checkmark color in the same table |

This accent appears only in `DesignDecision.tsx` and should not be adopted as a general-purpose highlight color.

### Interactive / semantic

- `red-400` (`#f87171`) — ✗ cross mark in comparison table
- `text-neutral-500 hover:text-neutral-900` — standard link hover pattern throughout the site

---

## Typography

### Fonts

| Font | Classification | Weights loaded | Role |
|---|---|---|---|
| **Inter** | Sans-serif | 300, 400, 500, 600 | All body copy, UI labels, nav, buttons |
| **Playfair Display** | Serif | 400, 500, 600 (+ italic 400) | Display headings only |

Loaded via Google Fonts in `index.html`. Configured in `tailwind.config.js` as `font-sans` and `font-serif`.

### Type scale

| Class | Size | Weight | Usage |
|---|---|---|---|
| `text-7xl font-serif` | 4.5rem | 400 | Home hero `h1` (lg breakpoint) |
| `text-6xl font-serif` | 3.75rem | 400 | Home hero `h1` (md breakpoint), project title (lg) |
| `text-5xl font-serif` | 3rem | 400 | Page titles (About, Projects, project detail at md) |
| `text-4xl font-serif` | 2.25rem | 400 | Page titles (base), CTA section heading |
| `text-3xl font-serif` | 1.875rem | 400 | "More projects" heading, About projects heading |
| `text-2xl font-serif` | 1.5rem | 400 | Project card title (Home), section headings inside Project |
| `text-xl` | 1.25rem | — | Experience item titles |
| `text-lg` | 1.125rem | — | Body lead text, subtitle on Home, card titles on Projects/About |
| `text-sm` | 0.875rem | — | General body text, button labels, nav links |
| `text-xs` | 0.75rem | — | Tags, meta labels, captions |
| `text-[11px]` | 0.6875rem | — | Project detail metadata (Timeline, Team, Role, Tools) |

### Label pattern

A consistent meta-label style appears everywhere above section headings:

```
text-xs uppercase tracking-widest text-neutral-400
```

Examples: "Projects", "Skills", "Experience & Education", category tags on cards.

### Prose (markdown body)

Rendered via `react-markdown` with Tailwind Typography:
```
prose prose-neutral max-w-none prose-p:text-neutral-500 prose-p:leading-relaxed
```

---

## Spacing & Layout

### Container

Every section on every page uses the same container:
```
max-w-6xl mx-auto px-6
```
(`max-w-6xl` = 72rem / 1152px)

### Page sections

Sections are divided by top borders, not whitespace gaps alone:
```
border-t border-neutral-200
```
Followed by `pt-16` or `pt-20` to push content below the rule.

### Grid system

| Pattern | Usage |
|---|---|
| `grid grid-cols-1 md:grid-cols-2 gap-6` | Project cards on Projects page, About project links |
| `grid grid-cols-1 md:grid-cols-2 gap-12` | About hero (bio + portrait) |
| `grid grid-cols-1 md:grid-cols-3 gap-8` | Skills section on About |
| `grid grid-cols-2 gap-4` | SolutionImages, Reflections |
| `grid grid-cols-3` | Stats rows inside ResearchMethods, KeyFindings |

### Alternating layout

Two-column content that flips sides on alternating items. Used in two places:

- **Home ProjectCard** — uses `md:order-1` / `md:order-2` on the text and image divs based on `index % 2 === 0`
- **Project detail sections** — uses the CSS `direction: rtl` trick (`md:[direction:rtl]`) on the row, with `md:[direction:ltr]` applied back on children. The flip counter increments per section; "Research Methods" resets it to 1 (forcing text left).

### Vertical rhythm

- Hero sections: `pt-20 pb-12` or `pt-20 pb-16`
- Internal sections: `py-16` or `py-12`
- Card padding: `p-6`
- Component gaps: `gap-6`, `gap-8`, `gap-12`

---

## Visual Style / Aesthetic Direction

**Minimal editorial.** The site reads more like a design publication than a typical developer portfolio. Key traits:

- No decorative color — restraint is the aesthetic
- Serif headings create editorial weight and elegance against sans-serif body text
- Generous whitespace with consistent rhythm
- Thin `border-neutral-200` lines are the primary visual dividers, never heavy borders or shadows
- Interactive states are subtle: color transitions, scale transforms, no dramatic effects

**Frosted nav** — `bg-white/80 backdrop-blur-md` gives the header a translucent glass effect on scroll.

**Hover polish** — images inside cards scale with `group-hover:scale-105 transition-transform duration-500`. This appears on ProjectCard (Home), Projects grid, and About project links.

**Placeholder pattern** — when images are absent, every component falls back to `bg-gradient-to-br from-neutral-100 to-neutral-200` with a faint emoji icon. This keeps the layout intact while content is in progress.

---

## Reusable UI Components

### Buttons

Two styles used everywhere. Always `rounded-full`.

**Filled (primary action):**
```
text-sm px-5 py-2.5 bg-neutral-900 text-white rounded-full hover:bg-neutral-700 transition-all font-medium
```

**Outlined (secondary action):**
```
text-sm px-5 py-2.5 border border-neutral-300 rounded-full text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 transition-all
```

### Tags / Pills

Used on project cards and the project detail header:
```
text-xs px-3 py-1 rounded-full border border-neutral-300 text-neutral-500
```

Smaller variant on Projects grid:
```
text-xs px-2 py-0.5 rounded-full border border-neutral-300 text-neutral-500
```

### Cards

**Compact link card** (used on About page project links, "More projects" section):
```
bg-neutral-50 border border-neutral-200 rounded-lg p-6 hover:bg-neutral-100 transition-colors
```
Contains: category label (meta style) → title (`text-lg text-neutral-800`) → subtitle (`text-sm text-neutral-400`).

**Image card** (Projects grid):
Same shell + `overflow-hidden` with a `16/10` aspect-ratio image area above the text block.

**Reflections card:**
```
p-4 rounded-xl border border-neutral-200 bg-neutral-50
```
Slight variation — uses `rounded-xl` instead of `rounded-lg`.

### Icon containers

Two sizes used in specialized section components:

| Size | Classes | Used in |
|---|---|---|
| 48×48 | `w-12 h-12 rounded-full border border-neutral-300` | ResearchMethods |
| 40×40 | `w-10 h-10 rounded-lg border border-neutral-300` | KeyFindings |
| 32×32 | `w-8 h-8 rounded-lg border border-neutral-300 bg-white` | Reflections |

All use `lucide-react` icons at `strokeWidth={1.5}` and `text-neutral-600`.

### Section label

Consistently used above headings to name a section:
```
<h2 className="text-xs uppercase tracking-widest text-neutral-400 mb-8">Label</h2>
```

### Carousel

Two carousel implementations, both using `embla-carousel-react`:

- **Hero carousel** (in `Project.tsx`) — multi-slide with active-slide scale effect, dot indicators, prev/next buttons, auto-advance (fires twice then stops on interaction)
- **ImageCarousel component** — simpler loop carousel with arrows and a slide counter caption
