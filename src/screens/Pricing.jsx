// Dedicated Pricing page — three plans + feature comparison.
import { useState } from 'react'
import { useT, STRINGS } from '../i18n.jsx'
import { Logo, Reveal } from '../components.jsx'

export default function Pricing({ onNav }) {
  const { t, lang } = useT()
  const [annual, setAnnual] = useState(true)

  const proPrice = annual ? t("pricing.tier.pro.priceA") : t("pricing.tier.pro.priceM")
  const proPer   = annual ? t("pricing.tier.pro.perA")   : t("pricing.tier.pro.perM")

  return (
    <div className="fade-in">
      {/* HERO */}
      <section style={{ padding: "140px 80px 24px", textAlign: "center", background: "transparent" }}>
        <h1 className="display" style={{
          fontSize: 50, fontWeight: 700, color: "var(--ink)",
          maxWidth: 640, margin: "0 auto 16px", letterSpacing: "-0.025em",
        }}>{t("pricing.hero.title")}</h1>
        <p style={{
          fontSize: 19, color: "var(--muted)",
          maxWidth: 480, margin: "0 auto", lineHeight: 1.6,
        }}>{t("pricing.hero.lede")}</p>

        {/* Billing toggle */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
          margin: "32px 0 0", fontSize: 17, color: "var(--muted)",
        }}>
          <span style={{ color: !annual ? "var(--ink)" : "var(--muted)", fontWeight: !annual ? 600 : 400 }}>
            {t("pricing.billing.monthly")}
          </span>
          <button
            role="switch"
            aria-checked={annual}
            onClick={() => setAnnual(a => !a)}
            style={{
              appearance: "none", position: "relative",
              width: 44, height: 24, borderRadius: 999,
              background: "var(--ink-2)", border: 0, padding: 0,
              cursor: "pointer", transition: "background 200ms",
            }}>
            <span style={{
              position: "absolute", top: 3, left: annual ? 23 : 3,
              width: 18, height: 18, borderRadius: "50%", background: "#fff",
              transition: "left 200ms",
            }} />
          </button>
          <span style={{ color: annual ? "var(--ink)" : "var(--muted)", fontWeight: annual ? 600 : 400 }}>
            {t("pricing.billing.annual")}
          </span>
          <span style={{
            fontSize: 13, fontWeight: 600, padding: "4px 10px", borderRadius: 999,
            background: "rgba(76, 190, 110, 0.12)",
            color: "rgb(40, 150, 70)",
            border: "1px solid rgba(76, 190, 110, 0.30)",
            letterSpacing: "0.06em", textTransform: "uppercase",
          }}>{t("pricing.billing.save")}</span>
        </div>
      </section>

      {/* PRICING GRID */}
      <Reveal as="section" style={{ padding: "32px 0 80px", background: "transparent" }}>
        <div className="pricing-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: 48, maxWidth: 1100, margin: "0 auto", padding: "0 80px",
        }}>
          {/* Starter */}
          <PlanCard
            tier="starter"
            name={t("pricing.tier.starter")}
            price={t("pricing.tier.starter.price")}
            per=""
            lede={t("pricing.tier.starter.lede")}
            items={STRINGS["pricing.tier.starter.items"][lang]}
            cta={t("pricing.tier.starter.cta")}
            ctaKind="outline"
            onClick={() => onNav("auth-signup")}
          />
          {/* Pro */}
          <PlanCard
            tier="pro"
            name={t("pricing.tier.pro")}
            price={proPrice}
            per={proPer}
            lede={t("pricing.tier.pro.lede")}
            items={STRINGS["pricing.tier.pro.items"][lang]}
            cta={t("pricing.tier.pro.cta")}
            ctaKind="filled"
            popular={t("landing.tier.popular")}
            onClick={() => onNav("auth-signup")}
          />
          {/* Enterprise */}
          <PlanCard
            tier="enterprise"
            name={t("pricing.tier.enterprise")}
            price={t("pricing.tier.enterprise.price")}
            per=""
            lede={t("pricing.tier.enterprise.lede")}
            items={STRINGS["pricing.tier.enterprise.items"][lang]}
            cta={t("pricing.tier.enterprise.cta")}
            ctaKind="outline-violet"
            onClick={() => { window.location.href = "mailto:hello@nood.ai" }}
          />
        </div>
      </Reveal>

      {/* COMPARISON TABLE */}
      <Reveal as="section" style={{ padding: "0 80px 120px", background: "transparent" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "var(--display)", fontSize: 24, fontWeight: 600,
            color: "var(--ink)", margin: "0 0 24px", letterSpacing: "-0.01em",
          }}>{t("pricing.compare.title")}</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
              <thead>
                <tr>
                  {[t("pricing.compare.feature"), t("pricing.tier.starter"), t("pricing.tier.pro"), t("pricing.tier.enterprise")].map((h, i) => (
                    <th key={i} style={{
                      textAlign: i === 0 ? "left" : "center",
                      fontSize: 14, fontWeight: 600, letterSpacing: "0.05em",
                      textTransform: "uppercase", color: "var(--muted-2)",
                      padding: "0 12px 12px", borderBottom: "1px solid rgba(200, 198, 220, 0.40)",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {STRINGS["pricing.compare.rows"][lang].map((row, i) => (
                  <tr key={i}>
                    <td style={{ padding: "14px 12px", fontSize: 16, color: "var(--ink)", borderBottom: "1px solid rgba(200, 198, 220, 0.25)" }}>{row.feature}</td>
                    <td style={{ padding: "14px 12px", fontSize: 16, color: "var(--muted)", textAlign: "center", borderBottom: "1px solid rgba(200, 198, 220, 0.25)" }}><Cell v={row.starter} /></td>
                    <td style={{ padding: "14px 12px", fontSize: 16, color: "var(--muted)", textAlign: "center", borderBottom: "1px solid rgba(200, 198, 220, 0.25)" }}><Cell v={row.pro} /></td>
                    <td style={{ padding: "14px 12px", fontSize: 16, color: "var(--muted)", textAlign: "center", borderBottom: "1px solid rgba(200, 198, 220, 0.25)" }}><Cell v={row.ent} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>

      {/* FOOTER — transparent, body gradient lands on it (TASKS_3.md §5) */}
      <Reveal as="footer" className="footer" style={{
        padding: "100px 80px 32px",
        background: "transparent",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48 }}>
          <div>
            <Logo size={48} minWidth={111} />
            <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.6, margin: "16px 0 0", maxWidth: 320 }}>
              {t("landing.footer.tagline")}
            </p>
          </div>
          {[
            { title: t("landing.footer.legal"),   items: [t("landing.footer.privacy"), t("landing.footer.terms")] },
            { title: t("landing.footer.company"), items: [t("landing.footer.contact"), t("landing.footer.careers"), t("nav.about")] },
            { title: t("landing.footer.social"),  items: ["LinkedIn", "Twitter / X", "GitHub"] },
          ].map((col, i) => (
            <div key={i}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>{col.title}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {col.items.map((it, j) => (
                  <li key={j} style={{ padding: "5px 0" }}>
                    <a href="#" style={{ color: "var(--ink-soft)", textDecoration: "none", fontSize: 13.5 }}>{it}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="hr" style={{ margin: "40px 0 16px" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", color: "var(--muted)", fontSize: 12 }}>
          <span>{t("landing.footer.copy")}</span>
          <span className="mono">v1.2.0 · build 2603</span>
        </div>
      </Reveal>
    </div>
  )
}

function Cell({ v }) {
  if (v === true)  return <span style={{ color: "var(--accent)", fontWeight: 700 }}>✓</span>
  if (v === false) return <span style={{ color: "var(--muted-2)" }}>—</span>
  return <span>{v}</span>
}

function PlanCard({ tier, name, price, per, lede, items, cta, ctaKind, popular, onClick }) {
  const isPro        = tier === "pro"
  const isEnterprise = tier === "enterprise"

  const base = {
    background: "#ffffff",
    border: "1px solid rgba(200, 198, 220, 0.50)",
    borderRadius: 20,
    padding: "32px 28px",
    display: "flex", flexDirection: "column", gap: 20,
    boxShadow: "0 4px 20px rgba(80, 70, 160, 0.06)",
    position: "relative",
  }
  const pro = {
    borderColor: "rgba(108, 78, 210, 0.30)",
    boxShadow: "0 8px 32px rgba(108, 78, 210, 0.12)",
  }
  const enterprise = {
    background: "rgba(255, 255, 255, 0.60)",
    backdropFilter: "blur(16px) saturate(180%)",
    WebkitBackdropFilter: "blur(16px) saturate(180%)",
    borderColor: "rgba(255, 255, 255, 0.80)",
  }

  const ctaBase = {
    width: "100%", padding: "12px 0", borderRadius: 999,
    fontSize: 17, fontWeight: 600, textAlign: "center",
    fontFamily: "var(--body)", cursor: "pointer",
    transition: "opacity 150ms, background 150ms",
    border: "1.5px solid transparent",
  }
  const ctaStyles = {
    filled: { ...ctaBase, background: "var(--ink-2)", color: "#fff", border: 0 },
    outline: { ...ctaBase, background: "transparent", border: "1.5px solid var(--rule)", color: "var(--ink)" },
    "outline-violet": { ...ctaBase, background: "transparent", border: "1.5px solid var(--accent)", color: "var(--accent)" },
  }

  return (
    <div style={{ ...base, ...(isPro ? pro : {}), ...(isEnterprise ? enterprise : {}) }}>
      {popular && (
        <span style={{
          position: "absolute", top: 16, right: 16,
          padding: "4px 10px", borderRadius: 999,
          background: "rgba(108, 78, 210, 0.12)",
          color: "var(--accent)",
          fontSize: 13, fontWeight: 600,
          letterSpacing: "0.06em", textTransform: "uppercase",
          border: "1px solid rgba(108, 78, 210, 0.25)",
        }}>{popular}</span>
      )}

      <div style={{
        fontSize: 15, fontWeight: 600, letterSpacing: "0.05em",
        color: "var(--muted-2)", textTransform: "uppercase",
      }}>{name}</div>

      <div>
        <div style={{
          fontFamily: "var(--display)", fontSize: 46, fontWeight: 700,
          color: "var(--ink)", lineHeight: 1, letterSpacing: "-0.025em",
        }}>
          {price}
          {per && <span style={{ fontSize: 18, fontWeight: 400, color: "var(--muted)", marginLeft: 4 }}>{per}</span>}
        </div>
        {lede && <p style={{ fontSize: 16, color: "var(--muted)", margin: "12px 0 0", lineHeight: 1.5 }}>{lede}</p>}
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        {items.map((it, i) => (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 16, color: "var(--muted)", lineHeight: 1.5 }}>
            <span style={{ color: "var(--accent)", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>

      <button onClick={onClick} style={ctaStyles[ctaKind]}>
        {cta}
      </button>
    </div>
  )
}
