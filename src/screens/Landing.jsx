// Landing page — premium minimal, bilingual
import { useState } from 'react'
import { useT } from '../i18n.jsx'
import { Button, Eyebrow, Logo, Reveal } from '../components.jsx'

export default function Landing({ onNav }) {
  const { t, lang } = useT()

  return (
    <div className="fade-in">
      {/* HERO */}
      <section className="hero-section" style={{ position: "relative", padding: "160px 80px 120px", overflow: "hidden" }}>
        {/* Lavender bloom backdrop */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          background: `
            radial-gradient(ellipse 70% 60% at 75% 35%, rgba(160, 107, 216, 0.28) 0%, rgba(160, 107, 216, 0) 60%),
            radial-gradient(ellipse 60% 50% at 90% 60%, rgba(107, 92, 255, 0.22) 0%, rgba(107, 92, 255, 0) 65%),
            radial-gradient(ellipse 80% 70% at 30% 80%, rgba(91, 141, 239, 0.14) 0%, rgba(91, 141, 239, 0) 60%)
          `
        }} />
        {/* Subtle arcs */}
        <svg aria-hidden viewBox="0 0 1280 800" preserveAspectRatio="xMidYMid slice" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0, opacity: 0.5, pointerEvents: "none"
        }}>
          <defs>
            <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#A06BD8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#6b5cff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle cx="1100" cy="380" r="320" fill="none" stroke="url(#arcGrad)" strokeWidth="1" />
          <circle cx="1100" cy="380" r="440" fill="none" stroke="url(#arcGrad)" strokeWidth="1" />
          <circle cx="1100" cy="380" r="560" fill="none" stroke="url(#arcGrad)" strokeWidth="1" />
        </svg>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.05fr)", gap: 64, alignItems: "center" }}>
          <div>
            <h1 className="display" style={{ fontSize: 66, margin: "0 0 24px", color: "var(--ink)" }}>
              {t("landing.title.a")}<br />
              <span className="display-italic" style={{ color: "var(--coral)" }}>{t("landing.title.b")}</span>
            </h1>

            <p style={{ fontSize: 19, lineHeight: 1.55, color: "var(--muted)", margin: "0 0 36px", maxWidth: 520 }}>
              {t("landing.lede")}
            </p>

            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 40 }}>
              <Button kind="primary" size="lg" icon="arrow_forward" onClick={() => onNav("auth-signup")}>
                {t("landing.cta.try")}
              </Button>
              <Button kind="ghost" size="lg" icon="play_arrow" onClick={() => onNav("workspace")}>
                {t("landing.cta.demo")}
              </Button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ display: "flex" }}>
                {["#3CC58F", "#5B8DEF", "#A06BD8", "#E2A33A"].map((c, i) =>
                  <div key={i} style={{
                    width: 28, height: 28, borderRadius: 999, background: c,
                    border: "2px solid var(--bg)", marginLeft: i ? -8 : 0
                  }} />
                  )}
              </div>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>
                {t("landing.trust")} <span style={{ color: "var(--ink)", fontWeight: 600 }}></span>
              </div>
            </div>
          </div>

          {/* Hero visual — composite product preview */}
          <HeroVisual />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — Cluely-style preview cards (TASKS_2.md §1) */}
      <Reveal as="section" id="platform" className="preview-section" style={{ marginTop: -1 }}>
        <h2>{t("landing.steps.title")}</h2>
        <p className="subtitle">{t("landing.steps.lede")}</p>

        <div className="preview-grid">
          {/* Card 1 — Upload Video */}
          <Reveal>
            <div className="preview-card">
              <div className="card-visual">
                <img
                  src="/assets/upload_video.png"
                  alt={lang === "fr" ? "Importer ou enregistrer votre vidéo" : "Upload or record your video"}
                />
              </div>
              <div className="card-caption">
                <strong>{t("landing.step1.title")}.</strong>
                <p>{t("landing.step1.body")}</p>
              </div>
            </div>
          </Reveal>

          {/* Card 2 — Analyzing animation (no asset) */}
          <Reveal delay={90}>
            <div className="preview-card">
              <div className="card-visual">
                <div className="analyzing-shell">
                  <div className="analyzing-topbar">
                    <span className="analyzing-dot" />
                    <span className="analyzing-label">{lang === "fr" ? "Analyse…" : "Analyzing…"}</span>
                  </div>
                  <div className="analyzing-progress-track">
                    <div className="analyzing-progress-fill" />
                  </div>
                  <div className="metric-rows">
                    {[
                      { name: lang === "fr" ? "Clarté vocale" : "Voice clarity", w: "78%", v: "78", d: "0s" },
                      { name: lang === "fr" ? "Posture" : "Posture",             w: "64%", v: "64", d: "0.4s" },
                      { name: lang === "fr" ? "Adéquation"  : "Message fit",     w: "91%", v: "91", d: "0.8s" },
                      { name: lang === "fr" ? "Gestuelle"   : "Gestures",        w: "55%", v: "55", d: "1.2s" },
                    ].map((m, i) => (
                      <div key={i} className="metric-row" style={{ "--delay": m.d }}>
                        <span className="metric-name">{m.name}</span>
                        <div className="metric-bar-wrap">
                          <div className="metric-bar" style={{ "--w": m.w }} />
                        </div>
                        <span className="metric-val">{m.v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="score-badge">
                    <span className="score-ring" />
                    <span className="score-val">72.5</span>
                  </div>
                </div>
              </div>
              <div className="card-caption">
                <strong>{t("landing.step2.title")}.</strong>
                <p>{t("landing.step2.body")}</p>
              </div>
            </div>
          </Reveal>

          {/* Card 3 — Coaching Tips */}
          <Reveal delay={180}>
            <div className="preview-card">
              <div className="card-visual">
                <img
                  src="/assets/coaching_tips.png"
                  alt={lang === "fr" ? "Conseils de coaching personnalisés" : "Personalized coaching tips"}
                />
              </div>
              <div className="card-caption">
                <strong>{t("landing.step3.title")}.</strong>
                <p>{t("landing.step3.body")}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Reveal>

      {/* MULTIDIMENSIONAL — three stylistic panels (TASKS_3.md §3) */}
      <Reveal as="section" id="services" className="analysis-section">
        <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 32, flexWrap: "wrap", margin: "0 auto 72px", maxWidth: 1280 }}>
          <div style={{ maxWidth: 760 }}>
            <h2>{t("landing.dim.title")}</h2>
            <p className="subtitle">{t("landing.dim.lede")}</p>
          </div>
          <div className="analysis-meta-pills">
            <span className="analysis-meta-pill">14 {lang === "fr" ? "métriques" : "metrics"}</span>
            <span className="analysis-meta-pill">~2 min</span>
          </div>
        </div>

        <div className="analysis-panels">
          {/* Panel 1 — Voice (dominant, dark navy) */}
          <Reveal>
            <div className="analysis-panel panel-voice">
              <div className="panel-icon-hero" aria-hidden>
                <WaveformIcon />
              </div>
              <div className="panel-content" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <p className="panel-eyebrow">{t("panel.voice.eyebrow")}</p>
                <h3 className="panel-headline" dangerouslySetInnerHTML={{ __html: t("panel.voice.headline") }} />
                <p className="panel-body">{t("panel.voice.body")}</p>
              </div>
              <p className="panel-signals">{t("panel.voice.signals")}</p>
            </div>
          </Reveal>

          {/* Panel 2 — Body (frosted violet) */}
          <Reveal delay={110}>
            <div className="analysis-panel panel-body-lang">
              <div className="panel-icon-hero" aria-hidden>
                <PostureIcon />
              </div>
              <div className="panel-content" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <p className="panel-eyebrow">{t("panel.body.eyebrow")}</p>
                <h3 className="panel-headline" dangerouslySetInnerHTML={{ __html: t("panel.body.headline") }} />
                <p className="panel-body">{t("panel.body.body")}</p>
              </div>
              <p className="panel-signals">{t("panel.body.signals")}</p>
            </div>
          </Reveal>

          {/* Panel 3 — Content (clean white, green accent) */}
          <Reveal delay={220}>
            <div className="analysis-panel panel-content-lang">
              <div className="panel-icon-hero" aria-hidden>
                <ContentIcon />
              </div>
              <div className="panel-content" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <p className="panel-eyebrow">{t("panel.content.eyebrow")}</p>
                <h3 className="panel-headline" dangerouslySetInnerHTML={{ __html: t("panel.content.headline") }} />
                <p className="panel-body">{t("panel.content.body")}</p>
              </div>
              <p className="panel-signals">{t("panel.content.signals")}</p>
            </div>
          </Reveal>
        </div>
      </Reveal>

      {/* PRICING TEASER — full pricing lives on /pricing */}
      <section id="pricing" style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 24,
        padding: "72px 80px",
        background: "transparent",
        flexWrap: "wrap", textAlign: "center",
      }}>
        <p style={{ fontSize: 19, color: "var(--muted)", margin: 0, lineHeight: 1.6 }}>
          {t("landing.pricing.teaser")}
        </p>
        <button onClick={() => onNav("pricing")} style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "12px 24px", borderRadius: 999,
          border: "1.5px solid var(--rule)", background: "transparent",
          color: "var(--ink)", fontFamily: "var(--body)", fontWeight: 600, fontSize: 15,
          cursor: "pointer", transition: "border-color 150ms, background 150ms",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--ink)"; e.currentTarget.style.background = "rgba(255,255,255,0.6)" }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--rule)"; e.currentTarget.style.background = "transparent" }}>
          {t("landing.pricing.teaser.cta")} →
        </button>
      </section>

      {/* FAQ — transparent so the body's exponential gradient shows through (TASKS_3.md §5) */}
      <Reveal as="section" id="about" className="faq-section" style={{
        padding: "var(--section-pad-v-desktop) var(--section-pad-h-desktop)",
        background: "transparent",
      }}>
        <div className="faq-list" style={{ maxWidth: 860, margin: "0 auto", display: "grid", gridTemplateColumns: "0.6fr 1fr", gap: 64 }}>
          <div>
            <h2 className="display" style={{ fontSize: 38, margin: 0 }}>{t("landing.faq.title")}</h2>
          </div>
          <div>
            {[1, 2, 3, 4, 5, 6].map((n) => <FaqItem key={n} q={t(`landing.faq.q${n}`)} a={t(`landing.faq.a${n}`)} />)}
          </div>
        </div>
      </Reveal>

      {/* FOOTER — transparent so the body gradient lands on it (TASKS_3.md §5) */}
      <Reveal as="footer" className="footer" style={{
        padding: "100px 80px 32px",
        background: "transparent",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48 }}>
          <div>
            <Logo />
            <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.6, margin: "16px 0 0", maxWidth: 320 }}>
              {t("landing.footer.tagline")}
            </p>
          </div>
          {[
          { title: t("landing.footer.legal"), items: [t("landing.footer.privacy"), t("landing.footer.terms")] },
          { title: t("landing.footer.company"), items: [t("landing.footer.contact"), t("landing.footer.careers"), t("nav.about")] },
          { title: t("landing.footer.social"), items: ["LinkedIn", "Twitter / X", "GitHub"] }].
          map((col, i) =>
          <div key={i}>
              <Eyebrow style={{ marginBottom: 12 }}>{col.title}</Eyebrow>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {col.items.map((it, j) =>
              <li key={j} style={{ padding: "5px 0" }}>
                    <a href="#" style={{ color: "var(--ink-soft)", textDecoration: "none", fontSize: 13.5 }}>{it}</a>
                  </li>
              )}
              </ul>
            </div>
          )}
        </div>
        <div className="hr" style={{ margin: "40px 0 16px" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", color: "var(--muted)", fontSize: 12 }}>
          <span>{t("landing.footer.copy")}</span>
          <span className="mono">v1.2.0 · build 2603</span>
        </div>
      </Reveal>
    </div>)

}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: "1px solid var(--rule-soft)" }}>
      <button onClick={() => setOpen((o) => !o)} style={{
        width: "100%", textAlign: "left", padding: "20px 0",
        display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24,
        background: "transparent", border: 0, cursor: "pointer", color: "var(--ink)",
        fontFamily: "var(--display)", fontWeight: 600, fontSize: 19
      }}>
        {q}
        <span className="icon" style={{
          fontSize: 22,
          transform: open ? "rotate(90deg)" : "rotate(0deg)",
          transition: "transform 240ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}>chevron_right</span>
      </button>
      {open && <div style={{ padding: "0 0 20px", color: "var(--muted)", fontSize: 17, lineHeight: 1.6, maxWidth: 580 }}>{a}</div>}
    </div>)

}

// Bespoke SVG icons for the analysis panels — currentColor so each panel tints them.
function WaveformIcon() {
  // 7 vertical equalizer bars of varying heights
  const bars = [22, 40, 56, 28, 64, 38, 18]
  return (
    <svg width="120" height="64" viewBox="0 0 120 64" fill="none" aria-hidden>
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * 16 + 4}
          y={(64 - h) / 2}
          width="8"
          height={h}
          rx="3"
          fill="currentColor"
        />
      ))}
    </svg>
  )
}
function PostureIcon() {
  return (
    <svg width="56" height="64" viewBox="0 0 56 64" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="28" cy="10" r="6" />
      <path d="M28 16 L28 38" />
      <path d="M10 24 L28 28 L46 24" />
      <path d="M28 38 L18 60" />
      <path d="M28 38 L38 60" />
    </svg>
  )
}
function ContentIcon() {
  return (
    <svg width="64" height="56" viewBox="0 0 64 56" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {/* open book with sparkle */}
      <path d="M6 12 L32 18 L58 12 L58 48 L32 54 L6 48 Z" />
      <path d="M32 18 L32 54" />
      <path d="M48 6 L50 10 L54 12 L50 14 L48 18 L46 14 L42 12 L46 10 Z" fill="currentColor" stroke="none" />
    </svg>
  )
}

// Hero visual — soft lavender bloom + browser chrome embedding real product screenshot
function HeroVisual() {
  return (
    <div style={{ position: "relative", width: "100%", minWidth: 320 }}>
      {/* Browser chrome card */}
      <div style={{
        position: "relative",
        background: "white",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 32px 80px rgba(80, 70, 160, 0.18), 0 8px 32px rgba(80, 70, 160, 0.10)",
        border: "1px solid rgba(255, 255, 255, 0.80)",
        zIndex: 2
      }}>
        {/* Top bar */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "11px 14px",
          borderBottom: "1px solid #f0eef7",
          background: "#fbfbff"
        }}>
          <div style={{ display: "flex", gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: 999, background: "#FF5F57" }} />
            <span style={{ width: 10, height: 10, borderRadius: 999, background: "#FEBC2E" }} />
            <span style={{ width: 10, height: 10, borderRadius: 999, background: "#28C840" }} />
          </div>
          <div style={{
            flex: 1,
            margin: "0 8px",
            background: "white",
            border: "1px solid #ece9f5",
            borderRadius: 6,
            padding: "4px 10px",
            display: "flex", alignItems: "center", gap: 6,
            fontSize: 11, color: "var(--muted)", fontFamily: "var(--mono)"
          }}>
            <span className="icon" style={{ fontSize: 12, color: "var(--muted-2)" }}>lock</span>
            app.nood.ai/sessions
          </div>
          <span className="icon" style={{ fontSize: 16, color: "var(--muted-2)" }}>more_horiz</span>
        </div>
        {/* Screenshot */}
        <img
          src="/assets/hero-history.png"
          alt="NOOD app preview"
          style={{ display: "block", width: "100%", height: "auto" }} />
      </div>

      {/* Floating glass card — bottom-left trend badge */}
      <div className="glass" style={{
        position: "absolute", bottom: -28, left: -32,
        padding: "12px 14px", zIndex: 3,
        display: "flex", alignItems: "center", gap: 12
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: "linear-gradient(140deg, #A06BD8 0%, #6C4ED2 100%)",
          display: "inline-flex", alignItems: "center", justifyContent: "center"
        }}>
          <span className="icon" style={{ fontSize: 18, color: "white" }}>auto_awesome</span>
        </div>
        <div>
          <div className="eyebrow">Score · 30j</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span className="num" style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.01em", color: "var(--ink)" }}>+14.5</span>
            <span style={{ fontSize: 11, color: "var(--good)", fontWeight: 600 }}>↑ trending</span>
          </div>
        </div>
      </div>

      {/* Floating glass card — top-right score */}
      <div className="glass" style={{
        position: "absolute", top: -22, right: -22,
        padding: "10px 14px", zIndex: 3
      }}>
        <div className="eyebrow" style={{ marginBottom: 2 }}>Pitch — Demo Day</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <span className="num" style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.01em", color: "var(--ink)" }}>72.5</span>
          <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500 }}>· B</span>
        </div>
      </div>
    </div>)

}
