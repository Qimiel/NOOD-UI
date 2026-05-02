// Landing page — premium minimal, bilingual
import { useState } from 'react'
import { useT, STRINGS } from '../i18n.jsx'
import { Button, Card, Eyebrow, Logo, Reveal } from '../components.jsx'

export default function Landing({ onNav }) {
  const { t, lang } = useT()
  const voiceItems = STRINGS["landing.dim.voice.items"][lang]
  const bodyItems = STRINGS["landing.dim.body.items"][lang]
  const contentItems = STRINGS["landing.dim.content.items"][lang]

  return (
    <div className="fade-in">
      {/* HERO */}
      <section className="hero-section" style={{ position: "relative", padding: "80px 32px 96px", overflow: "hidden" }}>
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
            <h1 className="display" style={{ fontSize: 64, margin: "0 0 24px", color: "var(--ink)" }}>
              {t("landing.title.a")}<br />
              <span className="display-italic" style={{ color: "var(--coral)" }}>{t("landing.title.b")}</span>
            </h1>

            <p style={{ fontSize: 17, lineHeight: 1.55, color: "var(--muted)", margin: "0 0 36px", maxWidth: 520 }}>
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

      {/* HOW IT WORKS — 3 steps. Gradient bleeds the white canvas into the lavender Capabilities section below. */}
      <Reveal as="section" id="platform" style={{
        padding: "80px 32px 120px",
        background: "linear-gradient(to bottom, var(--bg) 0%, var(--bg) 60%, var(--bg-2) 100%)",
        marginTop: -1,
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 className="display" style={{ fontSize: 42, margin: "0 0 12px" }}>{t("landing.steps.title")}</h2>
            <p style={{ color: "var(--muted)", fontSize: 17, margin: 0, lineHeight: 1.6 }}>{t("landing.steps.lede")}</p>
          </div>

          <div className="steps-grid" style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32,
          }}>
            {[
            { n: "01", icon: "videocam",      title: t("landing.step1.title"), body: t("landing.step1.body") },
            { n: "02", icon: "graph_3",       title: t("landing.step2.title"), body: t("landing.step2.body") },
            { n: "03", icon: "auto_awesome",  title: t("landing.step3.title"), body: t("landing.step3.body") }].
            map((s, i) =>
              <Reveal key={i} delay={i * 90}>
                <div className="step-card" style={{
                  background: "var(--card)",
                  border: "1px solid var(--rule-soft)",
                  borderRadius: 20,
                  padding: "40px 32px",
                  minHeight: 280,
                  display: "flex", flexDirection: "column",
                  gap: 16,
                  boxShadow: "0 4px 20px rgba(80, 70, 160, 0.05)",
                  transition: "transform 200ms ease-out, box-shadow 200ms ease-out",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)"
                  e.currentTarget.style.boxShadow = "var(--glass-shadow-hover)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = ""
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(80, 70, 160, 0.05)"
                }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: 18,
                    background: "rgba(108, 78, 210, 0.10)",
                    border: "1px solid rgba(108, 78, 210, 0.18)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 4,
                  }}>
                    <span className="icon" style={{ fontSize: 28, color: "var(--accent)" }}>{s.icon}</span>
                  </div>
                  <div className="mono" style={{
                    color: "var(--muted-2)", fontSize: 13, letterSpacing: "0.06em",
                  }}>{s.n}</div>
                  <h3 style={{
                    fontFamily: "var(--display)", fontSize: 20, fontWeight: 600,
                    color: "var(--ink)", margin: 0, letterSpacing: "-0.01em",
                  }}>{s.title}</h3>
                  <p style={{
                    fontSize: 15, lineHeight: 1.6, color: "var(--muted)", margin: 0,
                  }}>{s.body}</p>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </Reveal>

      {/* MULTIDIMENSIONAL — feature cards w/ density */}
      <Reveal as="section" id="services" style={{
        padding: "80px 32px",
        background: "var(--bg-2)",
        marginTop: -1,
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 40, gap: 32, flexWrap: "wrap" }}>
            <div>
              <h2 className="display" style={{ fontSize: 42, margin: "0 0 8px" }}>{t("landing.dim.title")}</h2>
              <p style={{ color: "var(--muted)", fontSize: 17, margin: 0, maxWidth: 540, lineHeight: 1.6 }}>{t("landing.dim.lede")}</p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <span className="mono" style={{ padding: "6px 10px", border: "1px solid var(--rule-soft)", borderRadius: 999, background: "rgba(255,255,255,0.72)", color: "var(--muted)" }}>14 {lang === "fr" ? "métriques" : "metrics"}</span>
              <span className="mono" style={{ padding: "6px 10px", border: "1px solid var(--rule-soft)", borderRadius: 999, background: "rgba(255,255,255,0.72)", color: "var(--muted)" }}>~2 min</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
            { icon: "graphic_eq", title: t("landing.dim.voice"), items: voiceItems, n: "01" },
            { icon: "accessibility_new", title: t("landing.dim.body"), items: bodyItems, n: "02" },
            { icon: "menu_book", title: t("landing.dim.content"), items: contentItems, n: "03" }].
            map((d, i) =>
            <Reveal key={i} delay={i * 110}>
              <Card hoverable padding={28} style={{ position: "relative", height: "100%", background: "rgba(255, 255, 255, 0.72)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                  <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: "rgba(108, 78, 210, 0.08)",
                  border: "1px solid rgba(108, 78, 210, 0.18)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center"
                }}>
                    <span className="icon" style={{ fontSize: 22, color: "var(--accent)" }}>{d.icon}</span>
                  </div>
                  <span className="mono" style={{ color: "var(--muted-2)" }}>{d.n}</span>
                </div>
                <h3 className="h3" style={{ margin: "0 0 16px" }}>{d.title}</h3>
                <div className="hr" style={{ marginBottom: 16 }} />
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {d.items.map((it, j) =>
                <li key={j} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 0", borderBottom: j < d.items.length - 1 ? "1px solid var(--rule-soft)" : "none",
                  fontSize: 13.5, color: "var(--ink-soft)"
                }}>
                      <span className="icon" style={{ fontSize: 16, color: "var(--accent)" }}>check_small</span>
                      {it}
                    </li>
                )}
                </ul>
              </Card>
            </Reveal>
            )}
          </div>
        </div>
      </Reveal>

      {/* PRICING TEASER — full pricing lives on /pricing */}
      <section id="pricing" style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 24,
        padding: "48px 24px",
        background: "var(--bg-2)",
        flexWrap: "wrap", textAlign: "center",
      }}>
        <p style={{ fontSize: 17, color: "var(--muted)", margin: 0, lineHeight: 1.6 }}>
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

      {/* FAQ */}
      <Reveal as="section" id="about" style={{
        padding: "80px 32px",
        background: "var(--bg-2)",
        marginTop: -1,
      }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "0.6fr 1fr", gap: 64 }}>
          <div>
            <h2 className="display" style={{ fontSize: 36, margin: 0 }}>{t("landing.faq.title")}</h2>
          </div>
          <div>
            {[1, 2, 3, 4].map((n) => <FaqItem key={n} q={t(`landing.faq.q${n}`)} a={t(`landing.faq.a${n}`)} />)}
          </div>
        </div>
      </Reveal>

      {/* FOOTER */}
      <Reveal as="footer" style={{
        padding: "80px 32px 32px",
        background: "linear-gradient(to bottom, var(--bg-2) 0%, var(--bg) 100%)",
        marginTop: -1,
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
        fontFamily: "var(--display)", fontWeight: 600, fontSize: 17
      }}>
        {q}
        <span className="icon" style={{ fontSize: 22, transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>add</span>
      </button>
      {open && <div style={{ padding: "0 0 20px", color: "var(--muted)", fontSize: 14.5, lineHeight: 1.6, maxWidth: 580 }}>{a}</div>}
    </div>)

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
