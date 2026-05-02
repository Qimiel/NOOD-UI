# nood — Design System & Philosophy

> **Core Principle:** Minimalism with intention. Every element earns its place. Cool tones, generous whitespace, and a whisper of glass.

---

## 1. Philosophy

nood's visual language is built on three pillars:

1. **Minimalism first.** Remove until it breaks, then add one thing back. No decorative noise — only functional clarity.
2. **Cool, calm tones.** The palette lives in the lavender-to-navy spectrum. Warmth is used sparingly and only for emphasis.
3. **Translucent depth.** Glassmorphism is applied subtly — frosted cards floating over soft gradient backgrounds, never overdone. The UI should feel like polished software, not a marketing gimmick.

The reference aesthetic is the intersection between a precision analytics dashboard and a calm, focused workspace — professional without being cold, modern without being aggressive.

---

## 2. Color Palette

All colors are derived from the nood brand as observed in the product UI and landing page.

### Primary

| Token | Name | RGB | Hex | Usage |
|---|---|---|---|---|
| `--color-bg-base` | Canvas White-Lavender | `rgb(243, 242, 252)` | `#F3F2FC` | Page background, full-bleed sections |
| `--color-bg-surface` | Surface White | `rgb(255, 255, 255)` | `#FFFFFF` | Cards, modals, navbar |
| `--color-bg-muted` | Soft Lavender | `rgb(234, 232, 248)` | `#EAE8F8` | Secondary section backgrounds, input fills |
| `--color-text-primary` | Deep Navy | `rgb(12, 18, 58)` | `#0C123A` | Headlines, primary body text |
| `--color-text-secondary` | Slate Blue | `rgb(80, 90, 140)` | `#505A8C` | Subheadings, captions, meta text |
| `--color-text-muted` | Cool Gray | `rgb(148, 152, 180)` | `#9498B4` | Placeholder text, disabled states |

### Accent

| Token | Name | RGB | Hex | Usage |
|---|---|---|---|---|
| `--color-accent-violet` | Brand Violet | `rgb(108, 78, 210)` | `#6C4ED2` | Score badges, icon fills, active indicators |
| `--color-accent-coral` | Italic Coral | `rgb(218, 88, 74)` | `#DA584A` | Hero italic emphasis text, highlight moments |
| `--color-accent-green` | Signal Green | `rgb(76, 190, 110)` | `#4CBE6E` | Positive trend indicators, "trending up" states |
| `--color-accent-amber` | Caution Amber | `rgb(230, 162, 60)` | `#E6A23C` | Neutral/warning score indicators |

### CTA & Interactive

| Token | Name | RGB | Hex | Usage |
|---|---|---|---|---|
| `--color-cta-primary` | Ink Navy | `rgb(14, 22, 52)` | `#0E1634` | Primary buttons (filled, dark) |
| `--color-cta-primary-text` | Pure White | `rgb(255, 255, 255)` | `#FFFFFF` | Text on primary buttons |
| `--color-cta-secondary` | Ghost Border | `rgb(200, 198, 220)` | `#C8C6DC` | Ghost button borders |
| `--color-link` | Periwinkle | `rgb(90, 110, 220)` | `#5A6EDC` | Inline links, secondary CTAs |

### Glass / Overlay

| Token | Name | Value | Usage |
|---|---|---|---|
| `--glass-bg` | Frosted Surface | `rgba(255, 255, 255, 0.60)` | Glass cards, floating panels |
| `--glass-border` | Glass Edge | `rgba(255, 255, 255, 0.80)` | Border of glass components |
| `--glass-shadow` | Diffused Shadow | `0 8px 32px rgba(80, 70, 160, 0.10)` | Drop shadow for floating cards |
| `--overlay-backdrop` | Blur Backdrop | `blur(16px) saturate(180%)` | CSS backdrop-filter for glass |

---

## 3. Typography

### Font Stack

```css
--font-display: 'General Sans', 'Cabinet Grotesk', system-ui, sans-serif;
--font-body:    'Inter', 'DM Sans', system-ui, sans-serif;
--font-mono:    'JetBrains Mono', 'Fira Code', monospace;
```

### Type Scale

| Level | Size | Weight | Style | Usage |
|---|---|---|---|---|
| `display-xl` | 56–72px | 700 | Normal | Hero section primary headline |
| `display-lg` | 40–52px | 700 | Normal | Section headings |
| `display-italic` | 40–52px | 700 | *Italic* | Hero accent phrase (coral) |
| `heading-md` | 28–34px | 600 | Normal | Feature titles, card headers |
| `heading-sm` | 20–24px | 600 | Normal | Sub-feature labels |
| `body-lg` | 17–18px | 400 | Normal | Lead paragraphs, descriptions |
| `body-md` | 15–16px | 400 | Normal | General body copy |
| `body-sm` | 13–14px | 400 | Normal | Captions, table cells, meta |
| `label` | 11–12px | 600 | Normal + Uppercase | Eyebrow labels (e.g. "01 · MÉTHODE") |
| `mono` | 13px | 400 | Normal | Score values, timestamps, code |

### Typographic Rules

- Headlines use **tight letter-spacing** (`-0.02em` to `-0.04em`) for a premium feel.
- Eyebrow labels are always `UPPERCASE` with wide tracking (`0.08em`), small size, and muted color or a colored dot prefix.
- The hero section pairs a **normal-weight headline** with an **italic, coral-colored phrase** on the second or third line — this is a signature nood typographic treatment.
- Body text stays at `--color-text-secondary` to let headlines breathe.
- Line-height: `1.2` for display, `1.5–1.6` for body.

---

## 4. Spacing & Layout

### Grid

- **Max content width:** `1200px`
- **Column system:** 12-column grid, `24px` gutters on desktop, `16px` on mobile
- **Section padding (vertical):** `80px` desktop / `48px` mobile
- **Container horizontal padding:** `48px` desktop / `20px` mobile

### Spacing Scale (base 4px)

```
4px   — xs   (icon gap, tight inline)
8px   — sm   (inner component padding)
12px  — md   (label spacing)
16px  — lg   (card inner padding small)
24px  — xl   (card inner padding, stack gap)
32px  — 2xl  (section element gap)
48px  — 3xl  (component-to-component gap)
64px  — 4xl  (section vertical padding mobile)
80px  — 5xl  (section vertical padding desktop)
120px — 6xl  (hero vertical padding)
```

---

## 5. Component Patterns

### Cards

Cards are the fundamental unit of nood's UI. They must feel **elevated but not heavy**.

```css
.card {
  background:      var(--glass-bg);           /* rgba(255,255,255,0.60) */
  backdrop-filter: var(--overlay-backdrop);   /* blur(16px) saturate(180%) */
  border:          1px solid var(--glass-border);
  border-radius:   16px;
  box-shadow:      var(--glass-shadow);
  padding:         24px;
}
```

- Use **glass cards** for floating overlays, score badges, and modal-style panels.
- Use **solid white cards** (`background: #fff`) for dashboard tables and data-dense surfaces.
- Cards inside a lavender section get a `rgba(255,255,255,0.72)` background — enough contrast, still soft.

### Buttons

**Primary (filled):**
```css
background: var(--color-cta-primary);  /* #0E1634 */
color: #fff;
border-radius: 999px;                  /* fully pill-shaped */
padding: 12px 24px;
font-weight: 600;
font-size: 15px;
```

**Secondary (ghost):**
```css
background: transparent;
border: 1.5px solid var(--color-cta-secondary);
color: var(--color-text-primary);
border-radius: 999px;
padding: 12px 24px;
```

- Buttons are **pill-shaped** (border-radius: 999px) — no square buttons.
- Primary CTA uses a dark navy fill, not a bright color — restraint is the brand.
- Arrow icons (`→`) precede CTA labels in the primary button.

### Navbar

- Background: `rgba(255, 255, 255, 0.90)` with `backdrop-filter: blur(12px)`.
- Thin `1px` bottom border: `rgba(200, 198, 220, 0.40)`.
- Logo left, navigation links center, auth actions right.
- Language toggle uses a compact segmented control (pill, two options).
- Sticky on scroll.

### Badges & Pills

```css
.badge-new {
  background: rgba(76, 190, 110, 0.12);
  color: rgb(40, 150, 70);
  border: 1px solid rgba(76, 190, 110, 0.30);
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
```

- A small green or violet dot (●) precedes the label text.
- Used for "NOUVEAU", version indicators, and status labels.

### Score / Metric Displays

Scores are a central UI motif on nood. Display conventions:

- Large numeric score: `font-size: 48–56px`, `font-weight: 700`, `font-family: --font-mono`
- Grade letter (A, B, C+): smaller, muted, positioned top-right of the score block
- Trend badge (`+14.5 ↑ trending`): glass card, violet icon, green delta value
- Color-coded progress bars: green (high), amber (mid), red (low) — thin (`4px` height)

### Data Tables

- Header row: `font-size: 11px`, uppercase, wide tracking, `--color-text-muted`
- Row height: `40–44px`, bottom border `1px solid rgba(200,198,220,0.30)`
- Hover state: `background: rgba(108, 78, 210, 0.04)`
- Score column uses color-coded inline bars
- No outer table border — let the card contain it

### Accordion / FAQ

Following the Cluely reference pattern:
- Each item is a full-width row with a bottom divider (`1px solid #E5E5EA`)
- Question text: `body-lg`, `--color-text-primary`, `font-weight: 500`
- Chevron icon (›) on the right, rotates 90° on open
- Expanded content: `body-md`, `--color-text-secondary`, `padding-bottom: 20px`
- No card container — accordion sits on the plain section background

### Footer

- Background: soft gradient from `--color-bg-muted` to `--color-bg-base`
- Columns: Logo + tagline | Use Cases | Enterprise | Resources | Support | Legal
- `font-size: 14px`, link color `--color-text-secondary`, hover `--color-text-primary`
- Bottom bar: copyright left, social icons right
- Compliance badge strip (ISO, SOC2, GDPR) in grayscale, small

---

## 6. Glassmorphism Guidelines

Glass effects are a signature of nood's aesthetic but must be used with **restraint**.

### When to use glass:
- Floating score/metric cards overlaid on hero sections
- Tooltips, hover cards, and popover panels
- The navbar (subtle, low-opacity blur)
- Feature callout cards that sit above a gradient section

### When NOT to use glass:
- Data tables (use solid white — readability first)
- Body text blocks
- Main page sections (glass is accent, not background)
- Mobile tap targets (blur is expensive; use `rgba` without backdrop-filter as fallback)

### Implementation:
```css
.glass {
  background: rgba(255, 255, 255, 0.60);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.80);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(80, 70, 160, 0.10),
              0 1px 0 rgba(255, 255, 255, 0.60) inset;
}
```

---

## 7. Iconography

- Style: **line icons**, `1.5px` stroke, rounded caps and joins
- Size: `16px` (inline), `20px` (UI actions), `24px` (feature icons)
- Color: inherits from text color; accent icons use `--color-accent-violet`
- Preferred library: Lucide Icons or Phosphor Icons (light weight)
- No filled icons except for status indicators (circle fills for colored dots)

---

## 8. Motion & Interaction

Motion should feel **measured and purposeful** — never flashy.

| Interaction | Duration | Easing |
|---|---|---|
| Button hover | 120ms | `ease-out` |
| Card hover (lift) | 200ms | `ease-out` |
| Accordion open/close | 240ms | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Page transitions | 300ms | `ease-in-out` |
| Score number count-up | 800ms | `ease-out` |
| Fade-in on scroll | 400ms | `ease-out`, 40px Y offset |

- Card hover: add `box-shadow: 0 16px 48px rgba(80, 70, 160, 0.16)` and `transform: translateY(-2px)`.
- No aggressive bounces, spins, or parallax. Subtle and confident.

---

## 9. Imagery & Illustration

- The primary visual hero is the **product UI itself** — screenshots and screen recordings, not abstract illustrations.
- Screenshots are displayed in a **browser chrome mockup** (macOS style: three traffic-light dots, URL bar) with a soft shadow.
- Any floating badge/card overlaid on the screenshot uses the glass card style.
- No stock photography of people.
- Background textures: very subtle diagonal line grid (`rgba(108,78,210,0.04)`) or soft radial gradient from `--color-bg-muted` to transparent.

---

## 10. Responsive Breakpoints

```
xs:  0px      — 375px   (small mobile)
sm:  376px    — 640px   (mobile)
md:  641px    — 768px   (large mobile / small tablet)
lg:  769px    — 1024px  (tablet)
xl:  1025px   — 1280px  (desktop)
2xl: 1281px+            (large desktop)
```

Mobile adaptations:
- Hero headline drops to `display-lg` size
- Two-column feature grid collapses to single column
- Glass cards reduce `backdrop-filter` blur to `8px` for performance
- Navbar collapses to hamburger at `md` and below

---

## 11. Accessibility

- Minimum contrast ratio: **4.5:1** for body text, **3:1** for large text (WCAG AA)
- `--color-text-primary` on `--color-bg-base`: passes AA at all sizes
- Focus ring: `2px solid var(--color-accent-violet)`, `2px offset`
- All interactive elements have `:focus-visible` styles
- Avoid conveying meaning through color alone — pair with icons or labels
- Score color indicators (green/amber/red bars) include a text grade label

---

## 12. Anti-Patterns

Avoid the following to preserve the nood aesthetic:

- ❌ Bright, saturated accent colors (orange, yellow, hot pink)
- ❌ Heavy drop shadows or `box-shadow: 0 4px 6px rgba(0,0,0,0.3)`
- ❌ Square or sharp-cornered buttons
- ❌ Dense, information-heavy layouts without breathing room
- ❌ White text on light backgrounds (check contrast)
- ❌ Multiple competing CTAs at the same visual weight
- ❌ Glass effects on top of dark backgrounds (breaks the cool-tone palette)
- ❌ Animations over 400ms outside of intentional count-up effects
- ❌ Serif fonts (the brand is entirely geometric sans-serif)
- ❌ Gradient fills on text (reserved for rare hero moments only)
