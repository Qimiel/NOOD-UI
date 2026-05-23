# nood — UI Refinement Tasks (Round 2)

> Continuation of `TASKS.md`. All palette tokens and naming conventions inherit from `DESIGN.md` and `TASKS.md`.

---

## Task 1 — Redesign the Three-Column Feature Section (Cluely-Style Preview Cards)

**Reference:** Image 1 (Cluely "Undetectable in every way") → adapt to nood.

Replace the current icon-number-text step cards with **large visual preview cards** — each card leads with a tall image/animation area and captions below. The section heading stays the same but the card format shifts from compact to expansive.

---

### Section Layout

```css
.preview-section {
  padding:    80px 24px;
  background: var(--color-bg-muted);    /* #EAE8F8 — sits in a lavender band */
  text-align: center;
}

.preview-section h2 {
  font-size:     48px;
  font-weight:   700;
  color:         var(--color-text-primary);
  margin-bottom: 12px;
}

.preview-section .subtitle {
  font-size:  17px;
  color:      var(--color-text-secondary);
  margin-bottom: 56px;
}

.preview-grid {
  display:               grid;
  grid-template-columns: repeat(3, 1fr);
  gap:                   24px;
  max-width:             1100px;
  margin:                0 auto;
  text-align:            left;
}

@media (max-width: 900px) {
  .preview-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
```

---

### Card Shell (shared across all three)

```css
.preview-card {
  background:    #ffffff;
  border:        1px solid rgba(200, 198, 220, 0.45);
  border-radius: 20px;
  overflow:      hidden;                  /* clip the visual area */
  box-shadow:    0 4px 24px rgba(80, 70, 160, 0.08);
  display:       flex;
  flex-direction: column;
}

.preview-card .card-visual {
  width:      100%;
  height:     280px;                      /* fixed visual area height */
  background: var(--color-bg-muted);
  position:   relative;
  overflow:   hidden;
  flex-shrink: 0;
}

.preview-card .card-caption {
  padding: 24px 24px 28px;
}

.preview-card .card-caption strong {
  display:       block;
  font-size:     16px;
  font-weight:   700;
  color:         var(--color-text-primary);
  margin-bottom: 8px;
}

.preview-card .card-caption p {
  font-size:   15px;
  line-height: 1.6;
  color:       var(--color-text-secondary);
  margin:      0;
}
```

---

### Card 1 — Upload Video (Left)

**Asset:** `upload_video.png`
Render the image inside `.card-visual`, object-fit cover. Represents the upload/record step.

```html
<div class="preview-card">
  <div class="card-visual">
    <img
      src="/assets/upload_video.png"
      alt="Upload or record your video"
      style="width:100%; height:100%; object-fit:cover; object-position:center top;"
    />
  </div>
  <div class="card-caption">
    <strong>Record or import.</strong>
    <p>Record directly from the app, or drop in an MP4, MOV, or WEBM file up to 500 MB.</p>
  </div>
</div>
```

---

### Card 2 — Analyzing Animation (Middle)

No external asset — coded as a self-contained CSS/JS animation that mimics a live analysis in progress. The animation loops silently.

**Visual concept:** A dark-surface card (like a mini dashboard) with:
- A progress bar that fills from 0 → 100 % over ~3 s then resets
- Three metric rows that pulse in sequence as if being "read"
- A spinning/pulsing violet ring around a waveform icon to indicate activity

```html
<div class="preview-card">
  <div class="card-visual" id="analyzing-visual">

    <!-- Analyzing shell -->
    <div class="analyzing-shell">

      <!-- Top bar -->
      <div class="analyzing-topbar">
        <span class="analyzing-dot"></span>
        <span class="analyzing-label">Analyzing…</span>
      </div>

      <!-- Progress bar -->
      <div class="analyzing-progress-track">
        <div class="analyzing-progress-fill" id="analyzeBar"></div>
      </div>

      <!-- Metric rows -->
      <div class="metric-rows">
        <div class="metric-row" style="--delay:0s">
          <span class="metric-name">Voice clarity</span>
          <div class="metric-bar-wrap">
            <div class="metric-bar" style="--w:78%"></div>
          </div>
          <span class="metric-val">78</span>
        </div>
        <div class="metric-row" style="--delay:0.4s">
          <span class="metric-name">Posture</span>
          <div class="metric-bar-wrap">
            <div class="metric-bar" style="--w:64%"></div>
          </div>
          <span class="metric-val">64</span>
        </div>
        <div class="metric-row" style="--delay:0.8s">
          <span class="metric-name">Message fit</span>
          <div class="metric-bar-wrap">
            <div class="metric-bar" style="--w:91%"></div>
          </div>
          <span class="metric-val">91</span>
        </div>
        <div class="metric-row" style="--delay:1.2s">
          <span class="metric-name">Gestures</span>
          <div class="metric-bar-wrap">
            <div class="metric-bar" style="--w:55%"></div>
          </div>
          <span class="metric-val">55</span>
        </div>
      </div>

      <!-- Pulsing score badge -->
      <div class="score-badge">
        <span class="score-ring"></span>
        <span class="score-val">72.5</span>
      </div>

    </div>
  </div>

  <div class="card-caption">
    <strong>AI reads your signals.</strong>
    <p>Voice, posture, gestures, message fit — 8 body emotions detected per second.</p>
  </div>
</div>
```

**CSS for the animation:**

```css
/* Shell */
.analyzing-shell {
  width:      100%;
  height:     100%;
  background: #12143a;              /* deep navy — contrasts the white card */
  padding:    24px 20px;
  display:    flex;
  flex-direction: column;
  gap:        16px;
  position:   relative;
}

/* Top bar */
.analyzing-topbar {
  display:     flex;
  align-items: center;
  gap:         8px;
}

.analyzing-dot {
  width:         8px;
  height:        8px;
  border-radius: 50%;
  background:    #6C4ED2;
  animation:     pulse-dot 1.4s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1);    }
  50%       { opacity: 0.4; transform: scale(0.8); }
}

.analyzing-label {
  font-size:   13px;
  font-weight: 600;
  color:       rgba(255,255,255,0.70);
  letter-spacing: 0.04em;
}

/* Progress bar */
.analyzing-progress-track {
  width:         100%;
  height:        4px;
  background:    rgba(255,255,255,0.10);
  border-radius: 999px;
  overflow:      hidden;
}

.analyzing-progress-fill {
  height:        100%;
  width:         0%;
  background:    linear-gradient(90deg, #6C4ED2, #4CBE6E);
  border-radius: 999px;
  animation:     fill-progress 3s ease-in-out infinite;
}

@keyframes fill-progress {
  0%   { width: 0%;   }
  80%  { width: 100%; }
  100% { width: 100%; opacity: 0; }
}

/* Metric rows */
.metric-rows {
  display:        flex;
  flex-direction: column;
  gap:            10px;
}

.metric-row {
  display:     flex;
  align-items: center;
  gap:         10px;
  opacity:     0;
  animation:   fade-row 3s ease-in-out infinite;
  animation-delay: var(--delay);
}

@keyframes fade-row {
  0%,  15% { opacity: 0; transform: translateX(-6px); }
  30%, 80% { opacity: 1; transform: translateX(0);    }
  100%     { opacity: 0; }
}

.metric-name {
  font-size:  12px;
  color:      rgba(255,255,255,0.55);
  width:      90px;
  flex-shrink: 0;
}

.metric-bar-wrap {
  flex:          1;
  height:        4px;
  background:    rgba(255,255,255,0.08);
  border-radius: 999px;
  overflow:      hidden;
}

.metric-bar {
  height:        100%;
  width:         var(--w);
  background:    #6C4ED2;
  border-radius: 999px;
}

.metric-val {
  font-size:   12px;
  color:       rgba(255,255,255,0.55);
  width:       28px;
  text-align:  right;
  flex-shrink: 0;
}

/* Score badge */
.score-badge {
  position:    absolute;
  bottom:      20px;
  right:       20px;
  width:       56px;
  height:      56px;
  display:     flex;
  align-items: center;
  justify-content: center;
}

.score-ring {
  position:      absolute;
  inset:         0;
  border-radius: 50%;
  border:        2.5px solid #6C4ED2;
  animation:     spin-ring 3s linear infinite;
  border-top-color: transparent;
}

@keyframes spin-ring {
  to { transform: rotate(360deg); }
}

.score-val {
  font-size:   15px;
  font-weight: 700;
  color:       #ffffff;
  position:    relative;
  z-index:     1;
}
```

---

### Card 3 — Coaching Tips (Right)

**Asset:** `coaching_tips.png`
Render the image inside `.card-visual`, object-fit cover.

```html
<div class="preview-card">
  <div class="card-visual">
    <img
      src="/assets/coaching_tips.png"
      alt="Personalized coaching tips"
      style="width:100%; height:100%; object-fit:cover; object-position:center top;"
    />
  </div>
  <div class="card-caption">
    <strong>Get coaching.</strong>
    <p>A high-fidelity report with impact-ranked recommendations, pinned to the exact video moment.</p>
  </div>
</div>
```

---

## Task 2 — Increase Global Font Size by 2px

Apply a `+2px` bump to every type scale level. Update the following CSS custom properties (or equivalent utility classes):

| Token | Old size | New size |
|---|---|---|
| `--fs-display-xl`  | 56–72px | 58–74px |
| `--fs-display-lg`  | 40–52px | 42–54px |
| `--fs-heading-md`  | 28–34px | 30–36px |
| `--fs-heading-sm`  | 20–24px | 22–26px |
| `--fs-body-lg`     | 17–18px | 19–20px |
| `--fs-body-md`     | 15–16px | 17–18px |
| `--fs-body-sm`     | 13–14px | 15–16px |
| `--fs-label`       | 11–12px | 13–14px |
| `--fs-mono`        | 13px    | 15px    |

The cleanest implementation is a single root override:

```css
:root {
  font-size: 18px;   /* was 16px — scales all rem-based values up proportionally */
}
```

If the codebase uses `px` values directly, apply the delta per-token as shown in the table above. Do **not** adjust line-heights — the existing ratios (`1.2` display, `1.5–1.6` body) remain correct at the new sizes.

---

## Task 3 — Add FAQ Entries

**Target:** The FAQ accordion at the bottom of the landing page.

Append the following two items to the existing FAQ list. They must use the same accordion component pattern already in place (see `TASKS.md § Accordion / FAQ`).

---

### FAQ Item A

**Question:** Who is Nood for?

**Answer:**
> Nood is for anyone who wants to unlock the career and personal opportunities that come with powerful public speaking. It helps professionals, entrepreneurs, and students craft presentations that impress, persuade, and inspire. By improving your communication skills, Nood can help you land promotions, win investors, or influence any audience with confidence. Essentially, it's for anyone ready to turn words into real-world results.

---

### FAQ Item B

**Question:** Is Nood free?

**Answer:**
> We offer a free plan that includes limited access to our core features. The pro plan unlocks access to a more detailed analysis with an extended upload cap.

---

**Implementation notes:**
- Maintain the existing accordion divider style: `1px solid rgba(200, 198, 220, 0.40)`.
- The answer text uses `--fs-body-md` (now 17–18px after Task 2), `--color-text-secondary`.
- Chevron icon rotates `90deg` on open, `0deg` on closed, `transition: transform 240ms cubic-bezier(0.4,0,0.2,1)`.
- Insert these two items as the **last two entries** in the accordion — do not re-order existing questions.

---

## Task 4 — Smart Scroll-Aware Header (Retract on Scroll Down, Reappear on Scroll Up)

The navbar hides itself when the user scrolls **down** and slides back in when they scroll **up**. This is a common pattern that preserves vertical reading space while keeping navigation always one scroll-flick away.

### CSS

```css
.navbar {
  position:   fixed;
  top:        0;
  left:       0;
  right:      0;
  z-index:    100;

  /* smooth hide/show */
  transform:           translateY(0);
  transition:          transform 300ms cubic-bezier(0.4, 0, 0.2, 1),
                       box-shadow 200ms ease;

  background:          rgba(255, 255, 255, 0.90);
  backdrop-filter:     blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom:       1px solid rgba(200, 198, 220, 0.30);
}

.navbar.hidden {
  transform: translateY(-100%);
}

.navbar.scrolled {
  box-shadow: 0 4px 20px rgba(80, 70, 160, 0.08);
}
```

### JavaScript

```javascript
(function () {
  const navbar    = document.querySelector('.navbar');
  let lastScrollY = window.scrollY;
  let ticking     = false;

  function updateNavbar() {
    const currentScrollY = window.scrollY;
    const scrollingDown  = currentScrollY > lastScrollY;

    // Only trigger hide/show after scrolling past 60px
    // (prevents flicker on micro-scrolls at the very top)
    if (currentScrollY > 60) {
      navbar.classList.toggle('hidden', scrollingDown);
    } else {
      navbar.classList.remove('hidden');
    }

    // Add shadow once user has scrolled at all
    navbar.classList.toggle('scrolled', currentScrollY > 4);

    lastScrollY = currentScrollY;
    ticking     = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }, { passive: true });
})();
```

**Notes:**
- `requestAnimationFrame` + `passive` listener prevents jank on mobile.
- The `60px` threshold absorbs accidental micro-scrolls — adjust if the hero section begins above the fold.
- When the navbar is `hidden`, it is still `visibility: visible` and focusable — the transform merely moves it off-screen. If keyboard focus moves to a hidden nav link, call `navbar.classList.remove('hidden')` to snap it back.
- Any `position: sticky` subheadings or section anchors must account for the navbar height offset — use `scroll-margin-top: var(--navbar-height)` on anchor targets.

---

## Task 5 — Reduce Navbar Height by 25%, Preserve Logo Ratio

The navbar's height decreases by 25%. The logo scales **proportionally** with it — do not clip, squish, or set an independent logo height.

### Calculation

| Property | Old value | New value |
|---|---|---|
| Navbar `min-height` | `72px` | `54px` |
| Navbar `padding-top/bottom` | `16px` each | `10px` each |
| Logo `height` | `56px` (min from TASKS.md Task 1) | `42px` |
| Logo `min-width` | `129px` | `~97px` (ratio-locked: 129 × 42/56) |

```css
.navbar {
  min-height: 54px;
  padding:    10px 48px;     /* vertical reduced from 16px → 10px */
}

.navbar-logo {
  height:    42px;           /* 56px × 0.75 = 42px */
  width:     auto;           /* let aspect ratio determine width */
  min-width: 97px;           /* 129px × 0.75 ≈ 97px */
}

/* CSS variable so other components can reference navbar height */
:root {
  --navbar-height: 54px;
}
```

**Logo ratio lock — never do this:**
```css
/* ❌ Wrong — breaks aspect ratio */
.navbar-logo {
  width:  129px;
  height: 42px;
}
```

**Always use `width: auto` paired with a single axis constraint (`height`) so the browser preserves the intrinsic ratio.**

For SVG logos specifically:
```html
<!-- Ensure the SVG has a viewBox and NO fixed width/height attributes -->
<svg viewBox="0 0 180 56" xmlns="...">
  <!-- logo paths -->
</svg>
```

Remove any `width=""` / `height=""` HTML attributes on the `<img>` or `<svg>` element and let CSS control dimensions exclusively.

---

## Consistency Checklist (Round 2)

| Item | Status |
|---|---|
| Preview cards match Cluely-style tall-visual format | Task 1 |
| `upload_video.png` used in card 1, cover-fit | Task 1 |
| Analyzing loop animation, no external asset | Task 1 |
| `coaching_tips.png` used in card 3, cover-fit | Task 1 |
| All font sizes bumped +2px / root 16→18px | Task 2 |
| "Who is Nood for?" added as last-1 FAQ item | Task 3 |
| "Is Nood free?" added as last FAQ item | Task 3 |
| Navbar hides on scroll-down, shows on scroll-up | Task 4 |
| 60px scroll threshold before hide triggers | Task 4 |
| Navbar height reduced 72px → 54px | Task 5 |
| Logo scales proportionally 56px → 42px height | Task 5 |
| `width: auto` on logo, no axis squish | Task 5 |
| `--navbar-height: 54px` CSS var updated | Task 5 |
| All colors remain within DESIGN.md palette | All tasks |
