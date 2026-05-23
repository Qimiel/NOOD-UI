# nood — UI Refinement Tasks (Round 3)

> Inherits all tokens from `DESIGN.md`, `TASKS.md`, and `TASKS_2.md`.
> **Developer note:** You do not have access to the reference screenshots. Read the written descriptions carefully — they are the specification. Where visual examples were provided, a text rendering or ASCII approximation is included below each description.
> **Philosophy this round:** We are still in the prototyping phase. Lean hard on space. When in doubt, double the gap. We will pull back later — we will not add back what was never there.

---

## Task 1 — Aggressive Global Spacing Overhaul

The UI feels compressed. This task lifts every inter-element gap, section padding, and content margin significantly. These are not fine-tuning adjustments — they are intentional over-spacings to be dialled back only after user testing.

### Section vertical padding

```css
:root {
  --section-pad-v-desktop: 140px;   /* was 80px  — nearly doubled  */
  --section-pad-v-mobile:  80px;    /* was 48px  — nearly doubled  */
  --section-pad-h-desktop: 80px;    /* was 48px                    */
  --section-pad-h-mobile:  28px;    /* was 20px                    */
}

section {
  padding: var(--section-pad-v-desktop) var(--section-pad-h-desktop);
}

@media (max-width: 640px) {
  section {
    padding: var(--section-pad-v-mobile) var(--section-pad-h-mobile);
  }
}
```

### Element-level gaps

```css
/* Gap between section headline and subtitle */
.section-header h2  { margin-bottom: 20px; }
.section-header .subtitle { margin-bottom: 64px; }  /* was 32px */

/* Gap between any grid of cards / feature blocks */
.feature-grid,
.preview-grid,
.steps-grid,
.pricing-grid {
  gap: 48px;   /* was 24–32px */
}

/* Gap inside cards — between icon, title, body */
.card-inner > * + * { margin-top: 24px; }   /* was 12–16px */

/* Paragraph spacing in body copy */
p + p { margin-top: 20px; }

/* List item spacing in feature lists */
.feature-list li { padding: 14px 0; }   /* was 10px */

/* FAQ accordion rows */
.faq-item { padding: 28px 0; }   /* was 16–20px */

/* Navbar inner horizontal padding */
.navbar { padding-left: 72px; padding-right: 72px; }  /* was 48px */

/* Hero section — generous top breathing room */
.hero {
  padding-top:    160px;   /* was 80–120px */
  padding-bottom: 120px;
}
```

### Max content widths — let layouts breathe

```css
.section-header        { max-width: 760px;  }   /* was 600–640px  */
.preview-grid          { max-width: 1280px; }   /* was 1100px     */
.steps-grid            { max-width: 1100px; }   /* was 960px      */
.faq-list              { max-width: 860px;  }   /* was 720px      */
.pricing-grid          { max-width: 1100px; }   /* was 960px      */
```

---

## Task 2 — Ditch the Card Boxes on the Three-Step Section; Redesign as Open, Breathing Layout

**Current state (what exists now):**
Three white boxed cards side by side. Each card contains: image/visual at top, bold title, body text — all contained inside a rounded rectangle with a border.

**Target state:**
Remove the card boxes entirely. The three steps exist as free-floating vertical columns directly on the section background. The visuals are large and prominent, the text sits below them without any container — it feels like the elements are *part of the page* rather than sitting on top of it. Like three exhibit panels in a gallery, not three product boxes on a shelf.

**Reference concept (text description of target):**
Imagine three tall columns, each roughly 340px wide with 60px between them:
- Top: A large, rounded visual (image or animation) — no border, no card shell, just a softly shadowed surface floating on the background
- Below the visual: bold caption title in `--color-text-primary`, large (`22px`)
- Below that: body paragraph in `--color-text-secondary`, comfortable width

No white boxes. No card borders. The background of the section shows through everywhere except the visual panels themselves.

```css
/* Remove all card shells */
.preview-card {
  background:    transparent;
  border:        none;
  border-radius: 0;
  box-shadow:    none;
  padding:       0;
}

/* The visual area becomes the only distinct surface */
.preview-card .card-visual {
  width:         100%;
  height:        320px;                            /* tall, commanding */
  border-radius: 20px;
  overflow:      hidden;
  box-shadow:    0 16px 48px rgba(80, 70, 160, 0.12);
  margin-bottom: 32px;
}

/* Caption — no container, text directly on section bg */
.preview-card .card-caption {
  padding:    0;
  background: transparent;
}

.preview-card .card-caption strong {
  display:       block;
  font-size:     22px;
  font-weight:   700;
  color:         var(--color-text-primary);
  margin-bottom: 12px;
  line-height:   1.3;
}

.preview-card .card-caption p {
  font-size:   17px;
  line-height: 1.7;
  color:       var(--color-text-secondary);
}

/* Grid: three columns, generous gap, no outer card padding */
.preview-grid {
  display:               grid;
  grid-template-columns: repeat(3, 1fr);
  gap:                   60px;
  max-width:             1280px;
  margin:                0 auto;
  align-items:           start;    /* tops aligned, columns extend naturally */
}

@media (max-width: 960px) {
  .preview-grid { grid-template-columns: 1fr; gap: 56px; }
}
```

### Middle column — Analysis animation

**Do not rebuild the animation.** Import and reuse the existing analysis page animation component directly.

```html
<!-- Middle column visual: reuse the live analysis view component -->
<div class="preview-card">
  <div class="card-visual" style="background: #12143a;">
    <!-- 
      Import the AnalyzingView component (or equivalent) from the 
      analysis results page — the same animated dashboard that appears 
      during/after a session upload. Render it here at 100% width, 
      clipped to the card-visual container. 
      The animation should loop continuously.
    -->
    <AnalyzingView loop={true} preview={true} />
  </div>
  <div class="card-caption">
    <strong>AI reads your signals.</strong>
    <p>Voice, posture, gestures, message fit — 8 body emotions detected per second.</p>
  </div>
</div>
```

If the framework does not support component import at this location, use an `<iframe>` pointing to the analysis demo route with `?preview=true&loop=true` query params, rendered at `width:100%; height:320px; border:none; border-radius:20px; overflow:hidden`.

---

## Task 3 — Redesign the "Multidimensional Analysis" Section as Bold Stylistic Feature Panels

**Current state (what exists now):**
Three equal white cards side by side, each with a small icon in the top-left, a large muted number in the top-right (01, 02, 03), a category title (Voice / Body / Content), and a bulleted checklist of technical metrics below a divider line. The layout is functional but reads like a spec sheet, not a product.

**What is wrong with it:**
- Equal-weight cards feel like a table of contents, not a story
- Bullet lists of technical terms (Filler words, Pace (words/min)) mean nothing to a non-technical audience
- No visual hierarchy — every card has the same importance
- No personality — nothing feels "alive"

**Target state (text description):**
Think of the Cluely "How Cluely helps during a meeting" section. It has two panels: one is large and filled with a rich periwinkle-blue color with white text and an embedded animated visual — it commands attention and feels premium. The other is a lighter, softer panel. The two are different sizes and have different visual weights. Together they make a composition, not a grid.

Apply the same philosophy to nood's three categories (Voice, Body, Content) but with three panels. Each panel has a distinct visual personality:

```
┌────────────────────────────────────────────────────────────────────────────┐
│  VOICE                    │  BODY                    │  CONTENT            │
│  [LARGE — filled deep     │  [MEDIUM — glass/frosted │  [MEDIUM — white,   │
│   navy panel, white text, │   surface, violet tint,  │   clean, warm       │
│   dominant waveform icon] │   body icon center]      │   accent]           │
│                           │                          │                     │
│  Big tagline first.       │  Big tagline first.      │  Big tagline first. │
│  One-line human benefit.  │  One-line human benefit. │  One-line benefit.  │
│                           │                          │                     │
│  Subtle: 5 signals        │  Subtle: 5 signals       │  Subtle: 4 signals  │
└────────────────────────────────────────────────────────────────────────────┘
```

### Section header

```css
.analysis-section {
  padding: var(--section-pad-v-desktop) var(--section-pad-h-desktop);
  background: var(--color-bg-base);
}

.analysis-section .section-header {
  margin-bottom: 72px;
}

.analysis-section h2 {
  font-size:     52px;
  font-weight:   700;
  color:         var(--color-text-primary);
  margin-bottom: 16px;
}

.analysis-section .subtitle {
  font-size: 19px;
  color:     var(--color-text-secondary);
}

/* Pills: "14 metrics" and "~2 min" — keep these, they are useful anchors */
.analysis-meta-pills {
  display:     flex;
  gap:         10px;
  margin-top:  24px;
}

.analysis-meta-pill {
  padding:       6px 16px;
  border-radius: 999px;
  border:        1px solid rgba(200, 198, 220, 0.60);
  font-size:     14px;
  color:         var(--color-text-secondary);
  background:    transparent;
}
```

### Panel grid

```css
.analysis-panels {
  display:               grid;
  grid-template-columns: 1.4fr 1fr 1fr;   /* Voice is wider — it leads */
  gap:                   28px;
  max-width:             1280px;
  margin:                0 auto;
  align-items:           stretch;
}

@media (max-width: 900px) {
  .analysis-panels {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
```

### Panel 1 — Voice (dominant, dark-filled)

Visual personality: Deep navy background, white text, large centered audio waveform icon, feels premium and alive.

```html
<div class="analysis-panel panel-voice">
  <!-- Large icon — audio waveform bars -->
  <div class="panel-icon-hero">
    <!-- SVG: 5–7 vertical bars of varying heights, like an equalizer -->
    <!-- Color: rgba(108,78,210,0.7) — violet, semi-transparent on dark bg -->
  </div>

  <div class="panel-content">
    <p class="panel-eyebrow">Voice</p>
    <h3 class="panel-headline">Sound confident<br>before you say a word.</h3>
    <p class="panel-body">Your voice carries more than your words. Nood listens for pace, energy, and emotional tone — and tells you exactly when you're losing the room.</p>
    <p class="panel-signals">Pace · Filler words · Pitch · Pauses · Emotion</p>
  </div>
</div>
```

```css
.panel-voice {
  background:    var(--color-text-primary);   /* #0C123A — deep navy */
  border-radius: 24px;
  padding:       56px 48px;
  display:       flex;
  flex-direction: column;
  gap:           40px;
  min-height:    480px;
}

.panel-voice .panel-eyebrow {
  font-size:      13px;
  font-weight:    600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color:          rgba(255,255,255,0.45);
  margin-bottom:  0;
}

.panel-voice .panel-headline {
  font-size:   34px;
  font-weight: 700;
  color:       #ffffff;
  line-height: 1.2;
}

.panel-voice .panel-body {
  font-size:   17px;
  line-height: 1.7;
  color:       rgba(255,255,255,0.65);
}

.panel-voice .panel-signals {
  font-size:      13px;
  color:          rgba(255,255,255,0.30);
  letter-spacing: 0.03em;
  margin-top:     auto;   /* push to bottom of card */
}

.panel-icon-hero {
  /* Large icon container — waveform SVG, ~64px tall */
  color:  rgba(108, 78, 210, 0.80);
  height: 64px;
}
```

### Panel 2 — Body (glass / frosted violet tint)

Visual personality: Frosted periwinkle surface, semi-transparent, body/posture icon prominent.

```html
<div class="analysis-panel panel-body-lang">
  <div class="panel-icon-hero">
    <!-- SVG: simple stick-figure with outstretched arms — posture/gesture icon -->
    <!-- Color: var(--color-accent-violet) -->
  </div>

  <div class="panel-content">
    <p class="panel-eyebrow">Body</p>
    <h3 class="panel-headline">Your body<br>speaks first.</h3>
    <p class="panel-body">Before you open your mouth, your posture, gestures, and eye contact have already made an impression. Nood reads all of it, frame by frame.</p>
    <p class="panel-signals">Posture · Gestures · Eye contact · Space · Emotion</p>
  </div>
</div>
```

```css
.panel-body-lang {
  background:      rgba(108, 78, 210, 0.08);
  backdrop-filter: blur(16px) saturate(180%);
  border:          1px solid rgba(108, 78, 210, 0.18);
  border-radius:   24px;
  padding:         48px 40px;
  display:         flex;
  flex-direction:  column;
  gap:             32px;
  min-height:      480px;
}

.panel-body-lang .panel-eyebrow {
  font-size:      13px;
  font-weight:    600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color:          var(--color-accent-violet);
  opacity:        0.6;
}

.panel-body-lang .panel-headline {
  font-size:   28px;
  font-weight: 700;
  color:       var(--color-text-primary);
  line-height: 1.2;
}

.panel-body-lang .panel-body {
  font-size:   16px;
  line-height: 1.7;
  color:       var(--color-text-secondary);
}

.panel-body-lang .panel-signals {
  font-size:  13px;
  color:      var(--color-text-muted);
  margin-top: auto;
}
```

### Panel 3 — Content (clean white, warm accent)

Visual personality: White card, open book or text icon, accent is the signal green rather than violet — giving it a distinct personality from panel 2.

```html
<div class="analysis-panel panel-content-lang">
  <div class="panel-icon-hero">
    <!-- SVG: open book or document with a small sparkle/star — content icon -->
    <!-- Color: var(--color-accent-green) -->
  </div>

  <div class="panel-content">
    <p class="panel-eyebrow">Content</p>
    <h3 class="panel-headline">Say the right thing,<br>at the right moment.</h3>
    <p class="panel-body">Great delivery means nothing if the message doesn't land. Nood checks narrative clarity, opening strength, and whether your words match your goal.</p>
    <p class="panel-signals">Tone · Narrative · Vocabulary · Opening · Fit</p>
  </div>
</div>
```

```css
.panel-content-lang {
  background:    #ffffff;
  border:        1px solid rgba(200, 198, 220, 0.45);
  border-radius: 24px;
  padding:       48px 40px;
  display:       flex;
  flex-direction: column;
  gap:           32px;
  min-height:    480px;
  box-shadow:    0 4px 24px rgba(80, 70, 160, 0.06);
}

.panel-content-lang .panel-eyebrow {
  font-size:      13px;
  font-weight:    600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color:          var(--color-accent-green);
  opacity:        0.8;
}

.panel-content-lang .panel-headline {
  font-size:   28px;
  font-weight: 700;
  color:       var(--color-text-primary);
  line-height: 1.2;
}

.panel-content-lang .panel-body {
  font-size:   16px;
  line-height: 1.7;
  color:       var(--color-text-secondary);
}

.panel-content-lang .panel-signals {
  font-size:  13px;
  color:      var(--color-text-muted);
  margin-top: auto;
}
```

---

## Task 4 — Reposition Navbar Buttons; Sticky "Get Started" CTA

**Current state:** "Sign in" and "Get started" sit at the far right of the navbar. "Get started" is not sticky.

**Target state:**
- The nav links group ("Plateforme", "Services", "Tarifs") stays centered or left-aligned
- "Sign in" moves left — it sits immediately after the last nav link, with a comfortable gap
- "Get started" is the only element pinned to the **top-right corner** of the viewport at all times — it stays visible even when the navbar is hidden (see TASKS_2 Task 4)
- "Get started" is implemented as a **fixed-position element independent of the navbar**, so it never disappears on scroll-down

```html
<!-- Inside the navbar -->
<nav class="navbar">
  <a class="navbar-logo" href="/"><!-- logo --></a>

  <ul class="nav-links">
    <li><a href="/platform">Platform</a></li>
    <li><a href="/services">Services</a></li>
    <li><a href="/pricing">Pricing</a></li>
  </ul>

  <!-- Sign in stays in the navbar flow, shifted left -->
  <a href="/login" class="btn-sign-in">Sign in</a>
</nav>

<!-- Get Started lives outside the navbar entirely — always visible -->
<a href="/signup" class="btn-get-started-sticky">Get started →</a>
```

```css
/* Navbar layout: logo left, links center-left, sign-in right of links */
.navbar {
  display:         flex;
  align-items:     center;
  gap:             40px;               /* generous gap between logo → links → sign-in */
  justify-content: flex-start;         /* left-anchored layout */
  padding:         10px 72px;
}

.nav-links {
  display:    flex;
  gap:        36px;
  list-style: none;
  margin:     0;
  padding:    0;
}

.btn-sign-in {
  font-size:   15px;
  font-weight: 500;
  color:       var(--color-text-secondary);
  text-decoration: none;
  margin-left: 8px;       /* small extra nudge away from nav links */
  transition:  color 150ms;
}

.btn-sign-in:hover { color: var(--color-text-primary); }

/* ─── Sticky Get Started — fixed, always top-right ─────────────────── */
.btn-get-started-sticky {
  position:      fixed;
  top:           12px;
  right:         32px;
  z-index:       200;            /* above navbar (z-index: 100) */

  background:    var(--color-cta-primary);     /* #0E1634 */
  color:         #ffffff;
  font-size:     15px;
  font-weight:   600;
  padding:       11px 24px;
  border-radius: 999px;
  text-decoration: none;
  white-space:   nowrap;

  box-shadow:    0 4px 16px rgba(14, 22, 52, 0.25);
  transition:    opacity 200ms, transform 200ms, box-shadow 200ms;
}

.btn-get-started-sticky:hover {
  opacity:    0.92;
  transform:  translateY(-1px);
  box-shadow: 0 8px 24px rgba(14, 22, 52, 0.30);
}

/* Slight scale-in on page load — subtle entrance */
@keyframes cta-entrance {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0);    }
}

.btn-get-started-sticky {
  animation: cta-entrance 400ms ease-out both;
  animation-delay: 200ms;
}
```

**Notes:**
- Because the button is `position: fixed` and `z-index: 200`, it remains in the top-right corner regardless of navbar hide/show state (TASKS_2 Task 4).
- On mobile (`< 640px`), reduce to `padding: 9px 18px; font-size: 14px` and `right: 16px` to avoid overflow.
- The button should **never** be inside the navbar DOM — keep it as a sibling of `<nav>` in the document root so it is always in the stacking context above everything.

---

## Task 5 — Exponential Background Gradient (Stays White, Breaks Hard to Lavender at the Bottom)

**Current state:** The page background transitions gradually and uniformly from white/near-white at the top to lavender/periwinkle near the bottom — a linear, predictable fade.

**Target state (text description of reference):**
Imagine a page that appears completely white for 75–80% of its visible height. Then, in the bottom 20–25%, the color suddenly accelerates — like an exponential curve — and lands hard on a full periwinkle-lavender by the very bottom edge. The effect is: you are reading a clean white page, then the ground "falls away" into color as you approach the footer. It is a statement ending, not a quiet fade.

Approximate visual:

```
Top of viewport:    #FFFFFF  ────────────────────────────────────
                                                  (stays white here)
                             ────────────────────────────────────
                             ────────────────────────────────────
                                                  (still white)
                             ────────────────────────────────────
80% mark:           #FAFAFF  ──── barely a hint of tint ──────────
85% mark:           #EEEAF8  ──── tint starts ──────────────────
90% mark:           #DDDAF5  ──── accelerating ─────────────────
95% mark:           #CCC8F0  ──── fast ──────────────────────────
Bottom of viewport: #B8B2E8  ──── full lavender ────────────────
```

**Implementation:**

Use a multi-stop CSS `linear-gradient` on the `<body>` or the outermost page wrapper. The key is stacking many stops in the bottom 20% and leaving the top with only one or two stops so it stays almost flat/white.

```css
body,
.page-wrapper {
  background: linear-gradient(
    to bottom,
    #FFFFFF  0%,      /* pure white at top */
    #FDFCFF  45%,     /* imperceptibly off-white — barely moves */
    #F8F6FE  70%,     /* the faintest tint begins  */
    #EEEAF8  80%,     /* tint becomes visible */
    #E0DAF4  86%,     /* accelerating — noticeable shift */
    #CEBFF0  91%,     /* fast — clearly lavender now */
    #BAB0E8  95%,     /* aggressive — close to full color */
    #A89EDF  100%     /* full periwinkle landing zone */
  );
  background-attachment: fixed;   /* gradient tracks the viewport, not the document */
  min-height: 100vh;
}
```

**`background-attachment: fixed` is important.** It anchors the gradient to the *viewport* rather than the *document*. This means:
- As the user scrolls, the gradient shifts relative to what's visible
- Near the top of a page the background appears white; by the time the footer is in view, the gradient's bottom-end colors are visible
- This creates the "floor falls away" effect without needing to know the total page height

**Fallback for browsers that behave oddly with `fixed` attachment (especially mobile Safari):**
```css
@media (max-width: 768px) {
  body, .page-wrapper {
    background-attachment: scroll;
    /* On mobile use a static approximation: white top, lavender bottom */
    background: linear-gradient(
      to bottom,
      #FFFFFF 0%,
      #F8F6FE 65%,
      #CEBFF0 88%,
      #A89EDF 100%
    );
  }
}
```

**Footer interaction:**
The footer section itself uses `background: transparent` so the gradient from the `body` shows through rather than a new opaque block interrupting the effect. The FAQ section above the footer also uses `background: transparent` for the same reason — let the gradient speak.

```css
.footer       { background: transparent; }
.faq-section  { background: transparent; }
```

---

## Consistency Checklist (Round 3)

| Item | Task |
|---|---|
| Section padding at least 140px vertical desktop | Task 1 |
| Grid gaps ≥ 48px | Task 1 |
| Card inner spacing upgraded aggressively | Task 1 |
| Three-step cards have no white box shells | Task 2 |
| Visuals are large free-floating surfaces with shadow | Task 2 |
| Middle animation = imported AnalyzingView, loops, no rebuild | Task 2 |
| Analysis section uses three stylistically distinct panels | Task 3 |
| Voice panel: deep navy fill, white text | Task 3 |
| Body panel: frosted violet-tint glass surface | Task 3 |
| Content panel: clean white, green accent | Task 3 |
| All panel copy is human/marketing-focused, not spec-list | Task 3 |
| Technical signal names hidden at bottom of each panel, muted | Task 3 |
| Sign in is in navbar, left-aligned after nav links | Task 4 |
| Get Started is `position:fixed`, top-right, `z-index:200` | Task 4 |
| Get Started is NOT inside the navbar DOM element | Task 4 |
| Body background is multi-stop exponential gradient | Task 5 |
| Top 70% of gradient is near-white (≤ #F8F6FE) | Task 5 |
| Color accelerates hard in bottom 20–25% | Task 5 |
| `background-attachment: fixed` on desktop | Task 5 |
| Footer and FAQ sections use `background: transparent` | Task 5 |
