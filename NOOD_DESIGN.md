---
version: alpha
name: NOOD-design-system
description: A deep-blue, lavender, and white product interface for NOOD — a video + vocal analyzer. The system anchors on a clean white analysis canvas, deep-blue product surfaces, and lavender signal accents that suggest audio waveforms, emotion traces, transcript highlights, and frame-level intelligence. The brand voice is precise, perceptive, and cinematic: less "generic SaaS dashboard," more "studio-grade analysis console." Typography uses a modern geometric/humanist sans for clarity, with optional condensed display moments for technical confidence.

colors:
  primary: "#8B7CFF"
  primary-active: "#6F60E8"
  primary-disabled: "#DCD8FF"
  ink: "#08142E"
  body: "#263455"
  body-strong: "#14213D"
  muted: "#647091"
  muted-soft: "#96A0BA"
  hairline: "#D8DDF0"
  hairline-soft: "#EEF1FA"
  canvas: "#FFFFFF"
  surface-soft: "#F6F7FF"
  surface-card: "#EEF0FF"
  surface-lavender-strong: "#DCD8FF"
  surface-dark: "#071633"
  surface-dark-elevated: "#0E234C"
  surface-dark-soft: "#102A5F"
  on-primary: "#FFFFFF"
  on-dark: "#FFFFFF"
  on-dark-soft: "#B8C2E6"
  accent-blue: "#1E4DFF"
  accent-lavender: "#B8A9FF"
  accent-ice: "#EAF0FF"
  success: "#38C99A"
  warning: "#F4B740"
  error: "#EF5A6F"

typography:
  display-xl:
    fontFamily: "Sora, Space Grotesk, Inter, sans-serif"
    fontSize: 64px
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: -1.6px
  display-lg:
    fontFamily: "Sora, Space Grotesk, Inter, sans-serif"
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: -1.2px
  display-md:
    fontFamily: "Sora, Space Grotesk, Inter, sans-serif"
    fontSize: 36px
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: -0.7px
  display-sm:
    fontFamily: "Sora, Space Grotesk, Inter, sans-serif"
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.4px
  title-lg:
    fontFamily: "Inter, Manrope, system-ui, sans-serif"
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.2px
  title-md:
    fontFamily: "Inter, Manrope, system-ui, sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: -0.1px
  title-sm:
    fontFamily: "Inter, Manrope, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  body-md:
    fontFamily: "Inter, Manrope, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  body-sm:
    fontFamily: "Inter, Manrope, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  caption:
    fontFamily: "Inter, Manrope, system-ui, sans-serif"
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  caption-uppercase:
    fontFamily: "Inter, Manrope, system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: 1.4px
  code:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  button:
    fontFamily: "Inter, Manrope, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0
  nav-link:
    fontFamily: "Inter, Manrope, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0

rounded:
  xs: 4px
  sm: 6px
  md: 10px
  lg: 14px
  xl: 20px
  pill: 9999px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 96px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 12px 20px
    height: 42px
  button-primary-active:
    backgroundColor: "{colors.primary-active}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
  button-primary-disabled:
    backgroundColor: "{colors.primary-disabled}"
    textColor: "{colors.muted}"
    rounded: "{rounded.md}"
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 12px 20px
    height: 42px
  button-secondary-on-dark:
    backgroundColor: "{colors.surface-dark-elevated}"
    textColor: "{colors.on-dark}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 12px 20px
  button-text-link:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.button}"
  button-icon-circular:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    size: 38px
  text-link:
    backgroundColor: transparent
    textColor: "{colors.primary-active}"
    typography: "{typography.body-md}"
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    height: 64px
  hero-band:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.display-xl}"
    padding: 96px
  hero-analysis-card:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.xl}"
  feature-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.lg}"
    padding: 32px
  product-mockup-card-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.title-md}"
    rounded: "{rounded.lg}"
    padding: 32px
  waveform-window-card:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.code}"
    rounded: "{rounded.lg}"
    padding: 24px
  transcript-insight-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.lg}"
    padding: 32px
  pricing-tier-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.title-lg}"
    rounded: "{rounded.lg}"
    padding: 32px
  pricing-tier-card-featured:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.title-lg}"
    rounded: "{rounded.lg}"
    padding: 32px
  callout-card-lavender:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.title-md}"
    rounded: "{rounded.lg}"
    padding: 32px
  analysis-tile:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.title-sm}"
    rounded: "{rounded.lg}"
    padding: 20px
  text-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 10px 14px
    height: 42px
  text-input-focused:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
  upload-dropzone:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.body}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xl}"
    padding: 32px
  category-tab:
    backgroundColor: transparent
    textColor: "{colors.muted}"
    typography: "{typography.nav-link}"
    padding: 8px 14px
    rounded: "{rounded.md}"
  category-tab-active:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    rounded: "{rounded.md}"
  badge-pill:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: 4px 12px
  badge-lavender:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.caption-uppercase}"
    rounded: "{rounded.pill}"
    padding: 4px 12px
  cta-band-lavender:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.display-sm}"
    rounded: "{rounded.lg}"
    padding: 64px
  cta-band-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.display-sm}"
    rounded: "{rounded.lg}"
    padding: 64px
  footer:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark-soft}"
    typography: "{typography.body-sm}"
    padding: 64px
---

## Overview

NOOD is a focused analysis interface for reading what a video says, what a voice suggests, and where meaning shifts over time. Its visual identity is built from **white**, **deep blue**, and **lavender**: white for the clean review canvas, deep blue for analytical confidence, and lavender for interpreted signal layers such as emotion, vocal intensity, pauses, keywords, confidence markers, and frame-level highlights.

The interface should feel like a studio-grade intelligence console, not a generic AI chatbot. NOOD analyzes uploaded or live video/audio, extracts transcript and vocal features, compares them with visible cues, and turns those signals into readable insights. The UI must therefore balance two moods: clinical clarity for data review and soft perceptiveness for human communication analysis.

The system has three surface modes:
1. **White canvas** (`{colors.canvas}`) — the default reading and review surface
2. **Lavender analysis cards** (`{colors.surface-card}`) — insight summaries, metrics, tags, and soft emphasis
3. **Deep-blue analyzer surfaces** (`{colors.surface-dark}`) — video players, waveform panels, spectrograms, timelines, and high-density dashboards

The white-to-deep-blue contrast is the page rhythm. Lavender is the signal color, not the background default. It should appear in buttons, active states, chart traces, timeline markers, transcript highlights, and short callout moments.

**Key Characteristics:**
- White canvas (`{colors.canvas}` — #FFFFFF) with deep-blue ink (`{colors.ink}` — #08142E).
- Lavender primary CTA (`{colors.primary}` — #8B7CFF), used for upload actions, analysis triggers, active states, and selected moments.
- Deep-blue product surfaces (`{colors.surface-dark}` — #071633) for player chrome, vocal timelines, waveform views, and dense analytics panels.
- Lavender cards (`{colors.surface-card}` — #EEF0FF) for interpreted insights rather than raw data.
- Typography is modern, compact, and high-confidence: Sora / Space Grotesk for display, Inter / Manrope for body and UI.
- Visual motifs include waveform ribbons, frame markers, subtitle blocks, timeline ticks, circular confidence meters, and split video/audio panes.
- Border radius is slightly softer than enterprise dashboards: `{rounded.md}` (10px) for buttons + inputs, `{rounded.lg}` (14px) for cards, `{rounded.xl}` (20px) for upload zones and analyzer previews.
- Use depth through layered surfaces and luminous lavender focus rings rather than heavy shadows.

## Colors

### Brand & Accent
- **Lavender / Primary** (`{colors.primary}` — #8B7CFF): NOOD's signal color. Used for primary CTAs, selected transcript spans, active timeline ranges, confidence highlights, and full-bleed callout cards.
- **Lavender Active** (`{colors.primary-active}` — #6F60E8): Pressed/hovered primary actions, active scrubber handles, selected filter chips.
- **Lavender Disabled** (`{colors.primary-disabled}` — #DCD8FF): Disabled states and inactive analysis controls.
- **Accent Blue** (`{colors.accent-blue}` — #1E4DFF): Secondary data traces, compare-mode states, and high-certainty markers.
- **Accent Lavender** (`{colors.accent-lavender}` — #B8A9FF): Softer highlight for low-intensity vocal features, transcript context, and hover states.
- **Accent Ice** (`{colors.accent-ice}` — #EAF0FF): Pale cool fill for background analysis bands and inactive meter tracks.

### Surface
- **Canvas** (`{colors.canvas}` — #FFFFFF): The default page floor and reading surface. Clean, high-contrast, and not tinted.
- **Surface Soft** (`{colors.surface-soft}` — #F6F7FF): Very pale blue-lavender used for section bands and empty states.
- **Surface Card** (`{colors.surface-card}` — #EEF0FF): Insight cards, summary panels, transcript annotation cards.
- **Surface Lavender Strong** (`{colors.surface-lavender-strong}` — #DCD8FF): Emphasized selected states, active tabs, and compact callouts.
- **Surface Dark** (`{colors.surface-dark}` — #071633): Video player chrome, waveform dashboards, spectrogram windows, and footer.
- **Surface Dark Elevated** (`{colors.surface-dark-elevated}` — #0E234C): Controls, cards, and panels inside dark analyzer surfaces.
- **Surface Dark Soft** (`{colors.surface-dark-soft}` — #102A5F): Inner tracks, chart beds, subtitle preview strips, and waveform panels.
- **Hairline** (`{colors.hairline}` — #D8DDF0): Borders on white and lavender surfaces.
- **Hairline Soft** (`{colors.hairline-soft}` — #EEF1FA): Very soft separators inside cards.

### Text
- **Ink** (`{colors.ink}` — #08142E): Headlines, product names, key metrics, and primary UI labels.
- **Body Strong** (`{colors.body-strong}` — #14213D): Lead text and emphasized descriptions.
- **Body** (`{colors.body}` — #263455): Default running text.
- **Muted** (`{colors.muted}` — #647091): Secondary labels, inactive tabs, metadata, timestamps.
- **Muted Soft** (`{colors.muted-soft}` — #96A0BA): Captions, fine print, low-emphasis UI labels.
- **On Primary** (`{colors.on-primary}` — #FFFFFF): Text on lavender buttons and primary callout cards.
- **On Dark** (`{colors.on-dark}` — #FFFFFF): Primary text on deep-blue analyzer surfaces.
- **On Dark Soft** (`{colors.on-dark-soft}` — #B8C2E6): Secondary text and timestamps inside dark panels.

### Semantic
- **Success** (`{colors.success}` — #38C99A): Completed analysis, clean audio, ready state, verified segment.
- **Warning** (`{colors.warning}` — #F4B740): Low confidence, background noise, occluded face, missing frames.
- **Error** (`{colors.error}` — #EF5A6F): Upload failure, unsupported codec, transcription error, severe signal loss.

## Typography

### Font Family
The system runs **Sora** or **Space Grotesk** for display headlines and **Inter** or **Manrope** for body, controls, labels, and dense dashboard text. **JetBrains Mono** handles timestamps, raw transcript offsets, technical logs, confidence IDs, and export previews.

The typography split is analytical rather than editorial:
- Sora / Space Grotesk → h1, h2, hero display, major product claims
- Inter / Manrope → body, navigation, controls, timeline labels, metric labels
- JetBrains Mono → timestamps, frame IDs, transcript offsets, JSON/export previews

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 64px | 600 | 1.04 | -1.6px | Homepage h1: "See what video and voice reveal" |
| `{typography.display-lg}` | 48px | 600 | 1.08 | -1.2px | Section heads |
| `{typography.display-md}` | 36px | 600 | 1.12 | -0.7px | Analyzer module titles |
| `{typography.display-sm}` | 28px | 600 | 1.2 | -0.4px | Pricing names, callout headlines |
| `{typography.title-lg}` | 22px | 600 | 1.3 | -0.2px | Dashboard card titles |
| `{typography.title-md}` | 18px | 600 | 1.4 | -0.1px | Feature card titles, insight headings |
| `{typography.title-sm}` | 16px | 600 | 1.4 | 0 | Filter labels, analysis tile titles |
| `{typography.body-md}` | 16px | 400 | 1.55 | 0 | Default running text |
| `{typography.body-sm}` | 14px | 400 | 1.55 | 0 | Metadata, footer, fine print |
| `{typography.caption}` | 13px | 600 | 1.4 | 0 | Badges, captions, metric labels |
| `{typography.caption-uppercase}` | 12px | 700 | 1.4 | 1.4px | "LIVE", "BETA", "LOW CONFIDENCE" tags |
| `{typography.code}` | 14px | 400 | 1.6 | 0 | Timestamps, logs, export previews |
| `{typography.button}` | 14px | 700 | 1.0 | 0 | Button labels |
| `{typography.nav-link}` | 14px | 600 | 1.4 | 0 | Top-nav menu items |

### Principles
Display type is sharp, confident, and compact. Use moderate weight, not excessive boldness. NOOD should feel technologically precise without looking cold. Negative letter-spacing keeps headlines tight and product-like.

Body text must prioritize readability because users will review transcripts, confidence notes, detected vocal cues, and technical warnings. Avoid overly stylized fonts in analysis-heavy screens. When presenting transcript or timestamped data, use monospace only for the offset, not the entire transcript, unless it is an export view.

## Layout

### Spacing System
- **Base unit:** 4px.
- **Tokens:** `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.md}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.section}` 96px.
- **Section padding:** `{spacing.section}` (96px) for marketing pages, 32–48px for application dashboards.
- **Card internal padding:** `{spacing.xl}` (32px) for feature, pricing, and summary cards; `{spacing.lg}` (24px) for waveform, transcript, and control cards.
- **Analyzer density:** Video/audio review screens may compress vertical spacing, but never reduce touch targets below 40px.

### Grid & Container
- **Max marketing width:** ~1200px centered.
- **Analyzer shell:** left navigation or project rail, central video/timeline area, right insight panel.
- **Hero layout:** 6/6 split — product claim on the left, dark video+waveform mockup on the right.
- **Feature grids:** 3-up at desktop, 2-up at tablet, 1-up at mobile.
- **Analysis dashboard:** central media player spans 7–8 columns; transcript/insight rail spans 4–5 columns.
- **Timeline rows:** stack video frames, vocal intensity, transcript markers, and detected cue tracks in aligned horizontal lanes.

### Whitespace Philosophy
NOOD uses clean white space to keep analysis understandable, then compresses only where time-based data requires alignment. Marketing pages can breathe; analyzer screens should feel dense but not cramped. Every dense panel needs a clear title, timestamp context, and obvious active state.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | White or deep-blue surface, no shadow | Body sections, nav, player background |
| Soft hairline | 1px `{colors.hairline}` border | Inputs, tabs, insight cards, transcript cards |
| Lavender card | `{colors.surface-card}` background | Insight summaries, key findings, soft callouts |
| Deep analyzer card | `{colors.surface-dark}` background | Video player, waveform, spectrogram, timeline |
| Luminous focus | 0 0 0 3px rgba(139, 124, 255, 0.22) | Focus states, active upload zones, selected segments |
| Soft shadow | 0 10px 30px rgba(8, 20, 46, 0.08) | Floating panels, modals, export sheets |

The elevation philosophy is **signal layering, not decoration**. Cards should feel like stacked analysis layers. Lavender glow communicates selected signal, deep blue communicates instrumentation, and white communicates reading clarity.

### Decorative Depth
- Use waveform ribbons and spectrogram-like gradients as subtle visual accents, especially inside dark panels.
- Use thin timeline ticks, circular playhead handles, and rectangular segment markers to suggest frame-level precision.
- Lavender highlights can sit under transcript fragments to show detected vocal emphasis, sentiment changes, or cross-modal mismatches.
- Avoid generic abstract blobs. Any decoration should resemble audio, video, timeline, subtitles, or analysis artifacts.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 4px | Tiny markers, frame ticks, waveform handles |
| `{rounded.sm}` | 6px | Dropdown items, compact filter chips |
| `{rounded.md}` | 10px | Buttons, inputs, tabs, small cards |
| `{rounded.lg}` | 14px | Insight cards, pricing cards, transcript cards |
| `{rounded.xl}` | 20px | Upload zones, media mockups, large analyzer containers |
| `{rounded.pill}` | 9999px | Badges, timeline chips, confidence pills |
| `{rounded.full}` | 9999px / 50% | Avatar substitutes, play buttons, circular meters |

### Photography & Product Imagery
NOOD should show product surfaces and media-analysis artifacts rather than generic lifestyle photography. Preferred visuals:
- Video player mockups with subtitle overlays
- Waveform + vocal intensity timelines
- Transcript cards with lavender highlights
- Emotion/confidence meters
- Frame-strip previews
- Split panels comparing **what was said** with **how it sounded** and **what appeared on screen**

When user imagery appears, keep it inside product context: video frames, thumbnails, interview clips, or review panels. Do not use decorative faces detached from analysis.

## Components

### Top Navigation

**`top-nav`** — White nav bar, 64px tall, `{colors.canvas}` background. Carries the NOOD wordmark at left, horizontal menu items (Product, Use Cases, Analyzer, Pricing, Docs) center-left, and a right-side cluster with "Sign in" plus a lavender "Upload video" or "Try NOOD" primary CTA. Menu items use `{typography.nav-link}`.

### Buttons

**`button-primary`** — Lavender CTA. Background `{colors.primary}`, text `{colors.on-primary}`, type `{typography.button}`, height 42px, rounded `{rounded.md}`. Used for "Analyze video," "Upload file," "Start live review," and "Export report."

**`button-secondary`** — White button with hairline border. Used for less dominant actions like "View demo," "Save draft," "Compare clips," and "Open transcript."

**`button-secondary-on-dark`** — Used over deep-blue analyzer surfaces. Background `{colors.surface-dark-elevated}`, text `{colors.on-dark}`. Useful for player controls, timeline filters, and export actions inside dark panels.

**`button-text-link`** — Inline text button for low-friction actions such as "View sample analysis," "Read docs," and "Reset filters."

**`button-icon-circular`** — Circular icon button for play/pause, rewind, clip, bookmark, volume, and frame stepping.

**`text-link`** — Inline body links in `{colors.primary-active}`. Use for documentation links, evidence jumps, and timestamp references.

### Cards & Containers

**`hero-band`** — White-canvas hero with a 6-6 grid: h1 + sub-headline + button row on the left, dark analyzer preview on the right. Vertical padding `{spacing.section}`.

**`hero-analysis-card`** — Large dark product mockup containing a video preview, waveform, transcript markers, and insight chips. Background `{colors.surface-dark}`, text `{colors.on-dark}`, rounded `{rounded.xl}`.

**`feature-card`** — Lavender-tinted card used in 3-up feature grids. Background `{colors.surface-card}`, rounded `{rounded.lg}`, padding `{spacing.xl}`. Each card should explain a capability: vocal analysis, video cue detection, transcript intelligence, confidence scoring, report export, or comparison mode.

**`product-mockup-card-dark`** — Dark blue card showing real NOOD product chrome: media player, transcript rail, waveform lanes, and insight summaries. Use for high-density analysis previews.

**`waveform-window-card`** — Specialized dark card showing waveform, spectrogram, timeline, cue markers, and timestamped vocal events. Background `{colors.surface-dark}` with `{colors.surface-dark-soft}` for inner graph beds.

**`transcript-insight-card`** — White or lavender card containing a quote, transcript segment, confidence score, and detected vocal/video cues. Use lavender highlights for emotionally or analytically meaningful fragments.

**`pricing-tier-card`** — Standard tier card. White background with hairline border, rounded `{rounded.lg}`, padding `{spacing.xl}`. Carries plan name, usage limits, upload minutes, export features, and team controls.

**`pricing-tier-card-featured`** — Featured tier flips to `{colors.surface-dark}` with white text. Use lavender badges and primary buttons to signal the recommended plan.

**`callout-card-lavender`** — Full-width lavender card for major CTAs such as "Analyze your first video" or "Turn interviews into evidence-backed insight." Use white text and a high-contrast secondary button inside.

**`analysis-tile`** — Small tile for analysis categories: Voice Stress, Sentiment Shift, Speaker Pace, Eye Contact, Background Noise, Visual Motion, Keyword Mentions, Silence Gaps.

### Inputs & Forms

**`text-input`** — Standard input. White background, deep-blue text, `{typography.body-md}`, rounded `{rounded.md}`, height 42px, 1px `{colors.hairline}` border.

**`text-input-focused`** — Focus state uses lavender border plus luminous focus ring: `0 0 0 3px rgba(139,124,255,0.22)`.

**`upload-dropzone`** — Large rounded upload zone for video/audio files. Background `{colors.surface-soft}`, dashed or hairline border in `{colors.hairline}`, rounded `{rounded.xl}`, padding `{spacing.xl}`. Active drag state shifts border and icon to lavender.

### Tags / Badges

**`badge-pill`** — Small pill label for categories and metadata: "Interview," "Lecture," "Meeting," "Podcast," "720p," "2 speakers," "Low noise."

**`badge-lavender`** — Lavender badge for "LIVE," "BETA," "AI SUMMARY," "FLAGGED," and selected analysis modes.

### Tab / Filter

**`category-tab`** + **`category-tab-active`** — Used for analysis filters such as Transcript, Voice, Video, Cues, Report, Export. Inactive tabs use muted text; active tabs use lavender card fill and deep-blue text.

### CTA / Footer

**`cta-band-lavender`** — Pre-footer CTA using the lavender primary fill. Text is white, with a strong h2 and a clear upload/analyze action.

**`cta-band-dark`** — Alternative CTA for product/developer pages. Deep-blue background, white type, with a small waveform preview or report export mockup.

**`footer`** — Deep-blue footer. Background `{colors.surface-dark}`, text `{colors.on-dark-soft}`. Columns cover Product, Use Cases, Resources, Legal, and Contact. The NOOD wordmark sits at the top in white with a lavender signal mark.

## Do's and Don'ts

### Do
- Anchor pages on white, then use deep blue for analyzer/product surfaces.
- Use lavender as the signal color: active states, highlights, CTAs, selected timeline ranges, and transcript emphasis.
- Show real product artifacts: video frames, subtitles, waveform lanes, confidence meters, and insight panels.
- Keep charts and timelines aligned to timestamps. NOOD is time-based; alignment is part of the brand.
- Use clean, modern sans typography with strong hierarchy and readable body text.
- Pair transcript insight cards with waveform/video context whenever possible.
- Use warnings honestly for low-confidence moments, noisy audio, missing frames, or unclear speaker attribution.

### Don't
- Don't flood the whole UI with lavender backgrounds. Lavender is for signal, emphasis, and selection.
- Don't use coral, cream, warm browns, or editorial serif styling from the previous Claude-inspired system.
- Don't make the product look like a generic chat app. NOOD is a media-analysis interface.
- Don't use decorative blobs or unrelated abstract illustrations. Use media-analysis motifs.
- Don't hide confidence scores or uncertainty warnings. Analysis credibility depends on visible uncertainty.
- Don't wrap dense timeline data in oversized cards that destroy alignment.
- Don't make deep-blue text sit on lavender without contrast checks.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 768px | Hamburger nav; hero h1 64→34px; analyzer preview stacks below content; insights move below player; feature grids 1-up; footer columns collapse |
| Tablet | 768–1024px | Top nav tightens; feature cards 2-up; analyzer uses stacked player + insight rail; pricing 2-up |
| Desktop | 1024–1440px | Full nav; hero 6/6 split; dashboard uses central player + right insight rail; 3-up feature cards |
| Wide | > 1440px | Max marketing content caps at 1200px; analyzer may expand timeline width while keeping insight rail readable |

### Touch Targets
- `{component.button-primary}` minimum 42 × 42px.
- `{component.button-icon-circular}` 38 × 38px minimum; prefer 42px in mobile analyzer controls.
- Timeline handles need enlarged invisible hit areas of at least 44px.
- Upload dropzone must remain easily tappable and readable on mobile.

### Collapsing Strategy
- Top nav collapses to hamburger at < 768px; menu opens as a full-screen white sheet.
- Hero grids collapse to single-column on mobile, with text first and analyzer preview second.
- Analyzer screens stack in this order: media player → timeline → key insights → transcript → export controls.
- Timeline lanes may horizontally scroll on mobile rather than compressing labels into unreadable text.
- Transcript cards preserve readable line length and allow timestamp jump links.

### Image / Media Behavior
- Video previews retain aspect ratio and use rounded `{rounded.xl}` containers.
- Waveforms and timelines allow horizontal scroll on small screens.
- Subtitle overlays use white text with deep-blue translucent backing for readability.
- Frame thumbnails crop consistently and align to timeline ticks.

## Iteration Guide

1. Focus on one component at a time. Reference its YAML key (`{component.hero-analysis-card}`, `{component.waveform-window-card}`, `{component.transcript-insight-card}`).
2. Variants of an existing component (`-active`, `-disabled`, `-focused`) live as separate entries in `components:`.
3. Use `{token.refs}` everywhere — never inline hex in component definitions.
4. Lavender is the signal color; deep blue is the instrument panel; white is the reading surface.
5. Any new component should answer: is this for media playback, transcript reading, vocal analysis, video cues, or reporting?
6. Keep uncertainty visible through confidence scores, warning badges, and low-confidence annotations.
7. When in doubt about emphasis: use stronger hierarchy, timestamp alignment, or lavender highlighting before adding decoration.

## Known Gaps

- Specific chart and waveform rendering rules are not fully formalized; future versions should define colors for waveform amplitude, vocal pitch, silence, detected stress, and confidence intervals.
- The NOOD logo mark is not specified here. Recommended direction: a rounded wordmark with a small lavender waveform/noodle-like signal mark.
- Animation timings are not defined. Suggested future additions: waveform reveal, transcript highlight sweep, playhead motion, and upload progress states.
- Report export templates need their own print/PDF design tokens.
- Multi-speaker attribution colors are not defined beyond the core lavender/blue system.
- Accessibility contrast should be tested for every lavender-on-white and lavender-on-blue combination before implementation.
