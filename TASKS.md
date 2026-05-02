# nood — UI Refinement Tasks

> This document defines targeted design and layout fixes to be applied on top of `DESIGN.md`. Each task is scoped, actionable, and palette-consistent.

---

## Task 1 — Expand the Logo

**Target:** Navbar / header logo component.

The logo must be rendered at a minimum of **129 × 56 px** (logical pixels). Do not stretch or distort the SVG/image asset — scale it proportionally and ensure sufficient padding around it within the navbar.

```css
.navbar-logo {
  width:      auto;
  height:     56px;          /* enforce minimum height */
  min-width:  129px;         /* enforce minimum width  */
  display:    block;
  flex-shrink: 0;
}
```

- If the logo asset is SVG, set `viewBox` to preserve sharpness at all sizes.
- Maintain `8px` vertical breathing room above and below the logo within the navbar container.
- On mobile (`< 640px`) the logo scales down to `height: 40px` — do **not** go below this.

---

## Task 2 — Expand Category Card Spacing (Method / Steps Section)

**Target:** The three-column feature/step cards in the Method section (Image 2).

Each card currently feels cramped. Apply the following spacing adjustments:

```css
.step-card {
  padding:        40px 32px;        /* was ~20px 16px */
  gap:            16px;             /* internal vertical gap between icon, number, title, body */
  min-height:     280px;            /* enforce a taller card */
  border-radius:  20px;
}

.step-icon-wrap {
  width:          72px;
  height:         72px;             /* was ~52px */
  border-radius:  18px;
  display:        flex;
  align-items:    center;
  justify-content: center;
  margin-bottom:  20px;
}

.step-icon-wrap svg {
  width:  28px;
  height: 28px;
}

.step-number {
  font-size:      13px;
  letter-spacing: 0.06em;
  color:          var(--color-text-muted);    /* rgb(148, 152, 180) */
  margin-bottom:  8px;
}

.step-title {
  font-size:   20px;
  font-weight: 600;
  color:       var(--color-text-primary);
  margin-bottom: 12px;
}

.step-body {
  font-size:   15px;
  line-height: 1.6;
  color:       var(--color-text-secondary);
}
```

The three cards sit in a 3-column grid with `32px` column gap. On tablet collapse to 1-column stacked.

```css
.steps-grid {
  display:               grid;
  grid-template-columns: repeat(3, 1fr);
  gap:                   32px;
  max-width:             960px;
  margin:                0 auto;
  padding:               0 24px;
}

@media (max-width: 768px) {
  .steps-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
```

---

## Task 3 — Remove Eyebrow / Category Markers

**Target:** All section eyebrow labels of the form `● 01 · METHOD`, `● 02 · CAPABILITIES`, etc.

These labels are removed from all sections. Do not replace them with any other label or divider. The section heading (`<h2>`) stands alone.

- Delete the `<p class="eyebrow">` (or equivalent) element entirely from every section.
- Remove any associated CSS targeting `.eyebrow`, `.section-label`, `.category-tag`, or similar.
- The violet dot (●) prefix is also removed — do not repurpose it elsewhere on the page.
- Section hierarchy is communicated through **font size and whitespace alone**.

---

## Task 4 — Replace Hard Section Dividers with Gradient Transitions

**Target:** All full-width horizontal `<hr>` dividers and hard background-color breaks between sections.

Instead of abrupt cuts, adjacent sections blend into each other using vertical CSS gradients. The approach mirrors the Cluely reference (Image 3) where the background shifts imperceptibly from white to periwinkle-lavender and back.

**Pattern — transitioning from white to lavender section:**
```css
.section-transition-to-muted {
  background: linear-gradient(
    to bottom,
    var(--color-bg-surface)  0%,      /* #FFFFFF */
    var(--color-bg-muted)    100%     /* #EAE8F8 */
  );
}
```

**Pattern — transitioning from lavender back to white:**
```css
.section-transition-to-white {
  background: linear-gradient(
    to bottom,
    var(--color-bg-muted)    0%,      /* #EAE8F8 */
    var(--color-bg-surface)  100%     /* #FFFFFF  */
  );
}
```

**Implementation rules:**
- Each section that previously had a background-color change now owns the **top half** of its own transition — the gradient begins at its own top edge.
- Overlap sections with `margin-top: -1px` to eliminate any gap artifact.
- The gradient span should be at least **120px tall** — never compress it to a thin sliver.
- Remove all `border-top`, `border-bottom`, and `<hr>` elements between page sections.
- The footer retains its own soft gradient: `linear-gradient(to bottom, var(--color-bg-muted), var(--color-bg-base))`.

---

## Task 5 — Remove the "New · Real-time AI Analysis" Badge

**Target:** Hero section — the green pill badge reading `● NOUVEAU · ANALYSE IA EN TEMPS RÉEL` (or its English equivalent).

- Delete the badge element and its wrapper entirely.
- Do **not** replace it with any other label, chip, or announcement banner.
- Reclaim the vertical space: reduce the gap above the hero headline from whatever it was to `80px` top padding on the hero section (desktop), `48px` (mobile).
- No empty `<div>` or placeholder should remain where the badge was.

---

## Task 6 — Remove the Utility / Toolbar Bar

**Target:** The floating toolbar shown in Image 1 — the bar containing icon actions (save, lock, copy, delete, more `···`).

This bar is removed entirely from the UI.

- Delete the component, its markup, and all associated CSS/JS.
- If this toolbar was conditionally shown on hover or selection, remove the trigger logic as well.
- Do not replace it with a contextual menu or any other utility surface — the actions it contained should either be accessible through a dedicated settings/detail page or removed from scope.
- Ensure no ghost layout space remains where the bar was rendered (check for `position: absolute` or `position: fixed` containers that may leave dead zones).

---

## Task 7 — Extract Pricing to Its Own Dedicated Page

**Target:** Any pricing section currently embedded in the main landing page.

### 7a. Remove from Landing Page

- Delete the pricing section block (cards, toggles, comparison table) from `index` / home.
- Replace with a simple inline CTA row:

```html
<section class="pricing-teaser">
  <p>Simple, transparent pricing.</p>
  <a href="/pricing" class="btn-ghost">See plans →</a>
</section>
```

```css
.pricing-teaser {
  display:         flex;
  align-items:     center;
  justify-content: center;
  gap:             24px;
  padding:         48px 24px;
  background:      var(--color-bg-muted);
  font-size:       17px;
  color:           var(--color-text-secondary);
}
```

### 7b. New `/pricing` Page Layout

The pricing page follows the Cluely reference (Image 3) closely, adapted to nood's palette.

**Page structure (top to bottom):**

```
[Navbar — same as site-wide]
[Hero header — centered, 80px top padding]
[Billing toggle — Monthly / Annually]
[Pricing cards — 3-column]
[Feature comparison table]
[Footer — same as site-wide]
```

**Hero Header:**
```css
.pricing-hero {
  text-align: center;
  padding:    80px 24px 48px;
  background: var(--color-bg-base);   /* #F3F2FC */
}

.pricing-hero h1 {
  font-size:   48px;
  font-weight: 700;
  color:       var(--color-text-primary);
  max-width:   640px;
  margin:      0 auto 16px;
}

.pricing-hero p {
  font-size:  17px;
  color:      var(--color-text-secondary);
  max-width:  480px;
  margin:     0 auto;
  line-height: 1.6;
}
```

**Billing Toggle:**
```css
.billing-toggle {
  display:         flex;
  align-items:     center;
  justify-content: center;
  gap:             12px;
  margin:          32px 0;
  font-size:       15px;
  color:           var(--color-text-secondary);
}

.billing-toggle input[type="checkbox"] {
  appearance:       none;
  width:            44px;
  height:           24px;
  border-radius:    999px;
  background:       var(--color-cta-primary);   /* #0E1634 */
  cursor:           pointer;
  position:         relative;
  transition:       background 200ms;
}

.billing-toggle input[type="checkbox"]::after {
  content:       '';
  position:      absolute;
  top:           3px;
  left:          3px;
  width:         18px;
  height:        18px;
  border-radius: 50%;
  background:    #fff;
  transition:    transform 200ms;
}

.billing-toggle input[type="checkbox"]:checked::after {
  transform: translateX(20px);
}
```

**Pricing Cards:**

Three cards side-by-side: Starter (Free) · Pro ($X/mo) · Enterprise (Custom).

```css
.pricing-grid {
  display:               grid;
  grid-template-columns: repeat(3, 1fr);
  gap:                   24px;
  max-width:             960px;
  margin:                0 auto;
  padding:               0 24px 80px;
}

.pricing-card {
  background:    #ffffff;
  border:        1px solid rgba(200, 198, 220, 0.50);
  border-radius: 20px;
  padding:       32px 28px;
  display:       flex;
  flex-direction: column;
  gap:           20px;
  box-shadow:    0 4px 20px rgba(80, 70, 160, 0.06);
}

/* Starter — no highlight */
.pricing-card.starter { }

/* Pro — elevated, slightly darker border */
.pricing-card.pro {
  border-color: rgba(108, 78, 210, 0.30);
  box-shadow:   0 8px 32px rgba(108, 78, 210, 0.12);
}

/* Enterprise — glass treatment */
.pricing-card.enterprise {
  background:      rgba(255, 255, 255, 0.60);
  backdrop-filter: blur(16px) saturate(180%);
  border-color:    rgba(255, 255, 255, 0.80);
}

.pricing-card .plan-name {
  font-size:   13px;
  font-weight: 600;
  letter-spacing: 0.05em;
  color:       var(--color-text-muted);
}

.pricing-card .plan-price {
  font-size:   44px;
  font-weight: 700;
  color:       var(--color-text-primary);
  line-height: 1;
}

.pricing-card .plan-price span {
  font-size:   16px;
  font-weight: 400;
  color:       var(--color-text-secondary);
}

.pricing-card .plan-cta {
  width:         100%;
  padding:       12px 0;
  border-radius: 999px;
  font-size:     15px;
  font-weight:   600;
  text-align:    center;
  cursor:        pointer;
  transition:    opacity 150ms;
}

.plan-cta.filled {
  background: var(--color-cta-primary);   /* #0E1634 */
  color:      #ffffff;
  border:     none;
}

.plan-cta.outline-violet {
  background: transparent;
  border:     1.5px solid var(--color-accent-violet);  /* #6C4ED2 */
  color:      var(--color-accent-violet);
}

.pricing-card .feature-list {
  list-style: none;
  padding:    0;
  margin:     0;
  display:    flex;
  flex-direction: column;
  gap:        10px;
}

.feature-list li {
  display:    flex;
  align-items: flex-start;
  gap:        10px;
  font-size:  14px;
  color:      var(--color-text-secondary);
  line-height: 1.5;
}

.feature-list li::before {
  content:    '✓';
  color:      var(--color-accent-violet);    /* #6C4ED2 */
  font-weight: 700;
  flex-shrink: 0;
  margin-top:  1px;
}
```

**Feature Comparison Table:**

Below the cards, a full-width table lists all features with tier availability.

```css
.comparison-table {
  max-width:  960px;
  margin:     0 auto;
  padding:    0 24px 80px;
}

.comparison-table h2 {
  font-size:   22px;
  font-weight: 600;
  color:       var(--color-text-primary);
  margin-bottom: 24px;
}

.comparison-table table {
  width:           100%;
  border-collapse: collapse;
}

.comparison-table thead th {
  font-size:      12px;
  font-weight:    600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color:          var(--color-text-muted);
  padding-bottom: 12px;
  border-bottom:  1px solid rgba(200, 198, 220, 0.40);
}

.comparison-table tbody td {
  padding:       14px 0;
  font-size:     14px;
  color:         var(--color-text-secondary);
  border-bottom: 1px solid rgba(200, 198, 220, 0.25);
}

.comparison-table tbody tr:last-child td {
  border-bottom: none;
}

/* ✓ tick */
.tick { color: var(--color-accent-violet); font-weight: 700; }
/* ✗ cross */
.cross { color: var(--color-text-muted); }
```

**Responsive — pricing page:**
```css
@media (max-width: 768px) {
  .pricing-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .comparison-table {
    overflow-x: auto;   /* horizontal scroll on narrow screens */
  }
}
```

---

## 8 — Palette Consistency Checklist

Apply the following spot-checks after all tasks above are implemented:

| Element | Required value |
|---|---|
| Page background | `rgb(243, 242, 252)` / `#F3F2FC` |
| Card / modal surface | `#FFFFFF` or `rgba(255,255,255,0.60)` (glass) |
| Primary headline | `rgb(12, 18, 58)` / `#0C123A` |
| Secondary / body text | `rgb(80, 90, 140)` / `#505A8C` |
| Muted / caption text | `rgb(148, 152, 180)` / `#9498B4` |
| Primary CTA button fill | `rgb(14, 22, 52)` / `#0E1634` |
| Accent / checkmark / icon | `rgb(108, 78, 210)` / `#6C4ED2` |
| Positive delta / trend | `rgb(76, 190, 110)` / `#4CBE6E` |
| No hard `<hr>` dividers | — replaced by gradient transitions (Task 4) |
| No eyebrow labels | — removed (Task 3) |
| No utility toolbar | — removed (Task 6) |
| No hero badge | — removed (Task 5) |
| Logo minimum size | `129 × 56 px` logical |
