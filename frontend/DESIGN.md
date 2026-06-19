# Invikt — Design System Specification
### *"The Ethereal Intelligence"*

> This file is the **single source of truth** for all visual decisions in the Invikt platform.  
> Every color token here maps 1:1 to a CSS variable in `src/index.css` under `@theme {}`.  
> **Do not hardcode hex values in components.** Always use the Tailwind utility class that references these tokens.

---

## 1. Creative North Star

**"The Luminescent Architect"** — The UI is a *digital nebula*: intelligence is fluid, atmospheric, and deeply layered. We achieve a "High-End Editorial" feel through intentional asymmetry, tonal depth over structural lines, and dramatic typographic scales.

The user should feel they are interacting with a **living, breathing AI entity** — not a static database.

---

## 2. Color Palette & Token Map

All tokens are defined in `src/index.css` inside the `@theme {}` block. Use them via Tailwind classes.

### Core Surfaces (Dark Space Foundation)

| Token | Hex | Tailwind Class | Use Case |
|---|---|---|---|
| `background` | `#10131a` | `bg-background` | Page/body base. The "void." |
| `surface` | `#10131a` | `bg-surface` | Same as background; used for semantic clarity |
| `surface-dim` | `#10131a` | `bg-surface-dim` | Dimmed surfaces |
| `surface-container-lowest` | `#0b0e14` | `bg-surface-container-lowest` | Input fields, deepest insets |
| `surface-container-low` | `#191c22` | `bg-surface-container-low` | Section panels, page sections |
| `surface-container` | `#1d2026` | `bg-surface-container` | Cards, standard containers |
| `surface-container-high` | `#272a31` | `bg-surface-container-high` | Elevated cards, hover states |
| `surface-container-highest` | `#32353c` | `bg-surface-container-highest` | Tooltips, modals, highest elevation |
| `surface-bright` | `#363940` | `bg-surface-bright` | Active/focused elements |
| `surface-variant` | `#32353c` | `bg-surface-variant` | Alternative surface |

### Primary — Violet (Brand Core)

| Token | Hex | Tailwind Class | Use Case |
|---|---|---|---|
| `primary` | `#cdbdff` | `text-primary`, `bg-primary` | Highlights, active states, glows |
| `primary-container` | `#5d21df` | `bg-primary-container` | CTA buttons, gradient starts |
| `primary-fixed` | `#e8deff` | `bg-primary-fixed` | Subtle tinted surfaces |
| `primary-fixed-dim` | `#cdbdff` | `bg-primary-fixed-dim` | Dimmed primary accents |
| `inverse-primary` | `#6833ea` | `bg-inverse-primary` | Inverted primary surfaces |
| `on-primary` | `#370096` | `text-on-primary` | Text/icons on primary fills |
| `on-primary-container` | `#cebfff` | `text-on-primary-container` | Text on primary-container |
| `on-primary-fixed` | `#20005f` | `text-on-primary-fixed` | |
| `on-primary-fixed-variant` | `#4f00d0` | `text-on-primary-fixed-variant` | |

### Secondary — Cyan (AI Energy / Success / Hints)

| Token | Hex | Tailwind Class | Use Case |
|---|---|---|---|
| `secondary` | `#bdf4ff` | `text-secondary`, `bg-secondary` | Data glows, chart highlights |
| `secondary-container` | `#00e3fd` | `bg-secondary-container` | Tag chips, pill badges |
| `secondary-fixed` | `#9cf0ff` | `bg-secondary-fixed` | |
| `secondary-fixed-dim` | `#00daf3` | `text-secondary-fixed-dim` | ✅ Success states, interactive hints |
| `on-secondary` | `#00363d` | `text-on-secondary` | Text on secondary fills |
| `on-secondary-container` | `#00616d` | `text-on-secondary-container` | |
| `on-secondary-fixed` | `#001f24` | `text-on-secondary-fixed` | |
| `on-secondary-fixed-variant` | `#004f58` | `text-on-secondary-fixed-variant` | |

### Tertiary — Soft Purple (Decorative / Accents)

| Token | Hex | Tailwind Class | Use Case |
|---|---|---|---|
| `tertiary` | `#d4bbff` | `text-tertiary` | Decorative, skill labels |
| `tertiary-container` | `#653aad` | `bg-tertiary-container` | Soft accent containers |
| `tertiary-fixed` | `#ebdcff` | `bg-tertiary-fixed` | |
| `tertiary-fixed-dim` | `#d4bbff` | `text-tertiary-fixed-dim` | Dimmed tertiary |
| `on-tertiary` | `#400688` | `text-on-tertiary` | Text on tertiary fills |
| `on-tertiary-container` | `#d6bdff` | `text-on-tertiary-container` | |
| `on-tertiary-fixed` | `#260058` | `text-on-tertiary-fixed` | |
| `on-tertiary-container-variant` | `#582a9f` | | |

### Text / Content

| Token | Hex | Tailwind Class | Use Case |
|---|---|---|---|
| `on-surface` | `#e1e2eb` | `text-on-surface` | Primary body text |
| `on-surface-variant` | `#cbc3d9` | `text-on-surface-variant` | Secondary/muted text, captions |
| `on-background` | `#e1e2eb` | `text-on-background` | Same as on-surface |
| `inverse-on-surface` | `#2e3037` | `text-inverse-on-surface` | |
| `inverse-surface` | `#e1e2eb` | `bg-inverse-surface` | |

### Borders / Outlines

| Token | Hex | Tailwind Class | Use Case |
|---|---|---|---|
| `outline` | `#948da2` | `border-outline` | Visible outlines (use sparingly) |
| `outline-variant` | `#494456` | `border-outline-variant` | **Ghost borders** — always use at 15% opacity max |

### Error / Feedback

| Token | Hex | Tailwind Class | Use Case |
|---|---|---|---|
| `error` | `#ffb4ab` | `text-error` | Error text |
| `error-container` | `#93000a` | `bg-error-container` | Error backgrounds |
| `on-error` | `#690005` | `text-on-error` | Text on error fills |
| `on-error-container` | `#ffdad6` | `text-on-error-container` | Text on error-container |

### Misc

| Token | Hex | Tailwind Class | Use Case |
|---|---|---|---|
| `surface-tint` | `#cdbdff` | `bg-surface-tint` | Subtle tint overlays |

---

## 3. Typography

Fonts are loaded in `index.html` via Google Fonts.

| Role | Font | Size | Tailwind | Intent |
|---|---|---|---|---|
| **Display-LG** | Manrope | `3.5rem` | `font-headline text-6xl` | Hero statements |
| **Headline-MD** | Manrope | `1.75rem` | `font-headline text-3xl` | Section headers |
| **Title-LG** | Inter | `1.375rem` | `font-body text-xl` | Card titles |
| **Body-LG** | Inter | `1.0rem` | `font-body text-base` | Standard reading text |
| **Label-MD** | Inter | `0.75rem` | `font-label text-xs uppercase tracking-widest` | Metadata, UI hints |

- `font-headline` → **Manrope** (defined in `@theme`)
- `font-body` → **Inter**
- `font-label` → **Inter**
- Secondary text always uses `text-on-surface-variant`

---

## 4. Key Gradient Recipes

```css
/* CTA / Primary Button */
background: linear-gradient(135deg, #cdbdff 0%, #5d21df 100%);
/* Tailwind: bg-gradient-to-br from-primary to-primary-container */

/* Roadmap Connector Line */
background: linear-gradient(to bottom, #5d21df 0%, #00daf3 50%, #cdbdff 100%);
/* Class: .roadmap-line (in index.css) */

/* Text Gradient */
background: linear-gradient(135deg, #cdbdff 0%, #5d21df 100%);
/* Class: .text-gradient (in index.css) */
```

---

## 5. Glassmorphism (`.glass-card`, `.glass-panel`)

Defined as a utility in `src/index.css`:

```css
.glass-card, .glass-panel {
    background: rgba(42, 45, 52, 0.4);    /* ~surface-container at 40% */
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(73, 68, 86, 0.15);  /* outline-variant at 15% */
}
```

**Usage rules:**
- Floating elements, modals, hovered cards → use `.glass-panel`
- Static frosted cards → use `.glass-card`
- Backdrop blur range: `20px` (subtle) → `40px` (prominent modals)

---

## 6. Elevation / Depth Layering

No heavy shadows. Depth = **background tone shift**.

| Level | Token | Hex | Z-axis Role |
|---|---|---|---|
| 0 — Base | `background` | `#10131a` | Page canvas |
| 1 — Sections | `surface-container-low` | `#191c22` | Page sections |
| 2 — Cards | `surface-container` | `#1d2026` | Standard cards |
| 3 — Elevated | `surface-container-high` | `#272a31` | Hovered/lifted cards |
| 4 — Top | `surface-container-highest` | `#32353c` | Modals, tooltips |

**Glow Shadow** (for floating elements):
```css
box-shadow: 0 20px 64px rgba(205, 189, 255, 0.08);
/* Tailwind approx: shadow-[0_20px_64px_rgba(205,189,255,0.08)] */
```

---

## 7. Border Rules ("The No-Line Rule")

- ❌ **Never** use `1px solid #xxx` at full opacity to define layout structure
- ✅ **Ghost Border:** `border border-outline-variant/15` (15% opacity max)
- ✅ **Depth separation** via background tone shifts — no borders needed
- ✅ If border must be visible: `border-outline-variant/20` max

---

## 8. Component Quick Reference

### Buttons
```jsx
// Primary CTA
className="bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-full px-6 py-3 font-bold"

// Secondary Ghost
className="glass-panel border border-outline-variant/20 rounded-xl px-6 py-3 font-bold text-on-surface"
```

### Cards
```jsx
// Standard Card
className="bg-surface-container rounded-2xl p-6 border border-outline-variant/10"

// Glass Card
className="glass-panel rounded-2xl p-6"

// Elevated Card (hover state)
className="bg-surface-container-high rounded-2xl p-6"
```

### Input Fields
```jsx
className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface placeholder:text-on-surface-variant focus:border-secondary/40 focus:outline-none"
```

### Glow Orbs (background ambiance)
```jsx
<div className="glow-orb w-96 h-96 bg-primary/10 top-0 left-1/4" />
<div className="glow-orb w-80 h-80 bg-secondary/10 bottom-0 right-0" />
```

---

## 9. Do's and Don'ts

### ✅ Do
- Use `on-surface-variant` for ALL secondary/muted text
- Use `secondary-fixed-dim` (#00daf3) for success states and interactive hints
- Use glassmorphism for all floating elements
- Increase surface contrast instead of adding lines when elements feel crowded
- Use `rounded-2xl` / `rounded-3xl` corners — never `rounded` (4px)

### ❌ Don't
- Use `#000000` or `#FFFFFF` — always use themed neutrals
- Use `rounded` or `rounded-sm` (too rigid)
- Use box-shadows with dark, opaque colors — always use primary/secondary glow
- Hardcode hex values in JSX — always reference a token class