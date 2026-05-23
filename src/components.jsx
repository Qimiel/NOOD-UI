// Shared UI components — header, language toggle, dev pill toolbar, basic primitives
import { useState, useEffect, useRef } from 'react'
import { useT } from './i18n.jsx'

// ─── Reveal (fade-in on scroll) ───────────────────────────────────────
// 400ms ease-out, 40px Y offset — per DESIGN.md §8 motion table.
export function useReveal({ threshold = 0.12, rootMargin = "0px 0px -80px 0px", once = true } = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === "undefined") { setVisible(true); return }
    const obs = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) obs.unobserve(entry.target)
        } else if (!once) {
          setVisible(false)
        }
      }
    }, { threshold, rootMargin })
    obs.observe(node)
    return () => obs.disconnect()
  }, [threshold, rootMargin, once])
  return [ref, visible]
}

export function Reveal({ children, delay = 0, as: Tag = "div", style, className = "", ...rest }) {
  const [ref, visible] = useReveal()
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}>
      {children}
    </Tag>
  )
}

// ─── Logo ──────────────────────────────────────────────────────────────
// The navbar logo enforces a 129×56 minimum (40px height on mobile) per TASKS.md §1.
// `size` is treated as the rendered height; the natural aspect ratio is preserved
// via object-fit, while min-width pads narrower wordmarks out to the spec.
export function Logo({ size = 56, minWidth = 129, onClick, className = "" }) {
  return (
    <div onClick={onClick} className={`logo-wrap ${className}`.trim()} style={{
      display: "inline-flex", alignItems: "center",
      cursor: onClick ? "pointer" : "default", userSelect: "none",
      padding: "8px 0",
      flexShrink: 0,
    }}>
      <img
        src="/assets/nood_logo.png"
        alt="NOOD"
        style={{
          height: size,
          minWidth,
          width: "auto",
          objectFit: "contain",
          display: "block",
          flexShrink: 0,
        }}
      />
    </div>
  )
}

// ─── Language toggle ──────────────────────────────────────────────────
export function LangToggle() {
  const { lang, setLang } = useT()
  return (
    <div style={{ display: "inline-flex", border: "1px solid var(--rule)", borderRadius: 999, padding: 2, background: "var(--card)" }}>
      {["fr", "en"].map((l) =>
      <button key={l}
      onClick={() => setLang(l)}
      style={{
        border: 0, background: lang === l ? "var(--ink-2)" : "transparent",
        color: lang === l ? "white" : "var(--muted)",
        fontFamily: "var(--body)", fontSize: 11, fontWeight: 600,
        padding: "5px 11px", borderRadius: 999, cursor: "pointer",
        textTransform: "uppercase", letterSpacing: "0.08em", transition: "all 0.15s"
      }}>
          {l === "en" ? "FR" : l}
        </button>
      )}
    </div>)

}

// ─── Header ────────────────────────────────────────────────────────────
// Hides on scroll-down, shows on scroll-up (TASKS_2.md §4). 60px threshold
// absorbs micro-scrolls at the top so the navbar doesn't flicker.
function useNavbarScroll() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false
    const update = () => {
      const y = window.scrollY
      const goingDown = y > lastY
      if (y > 60) setHidden(goingDown)
      else setHidden(false)
      setScrolled(y > 4)
      lastY = y
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return { hidden, scrolled }
}

export function Header({ variant = "marketing", onNav, route, signedIn }) {
  const { t } = useT()
  const isApp = variant === "app"
  const { hidden, scrolled } = useNavbarScroll()
  // Sticky CTA shows only on marketing pages for visitors who can still sign up.
  const showStickyCTA = !isApp && !signedIn

  return (
    <>
      <header className={`navbar ${hidden ? "is-hidden" : ""} ${scrolled ? "is-scrolled" : ""}`} style={{
        position: "sticky", top: 0, zIndex: 100,
        minHeight: "var(--navbar-height)",
        background: "rgba(255, 255, 255, 0.90)",
        backdropFilter: "blur(12px) saturate(180%)",
        WebkitBackdropFilter: "blur(12px) saturate(180%)",
        borderBottom: "1px solid var(--rule-soft)"
      }}>
        <div style={{
          maxWidth: 1440, margin: "0 auto",
          padding: "10px 72px",
          display: "flex", alignItems: "center", gap: 40,
        }}>
          <Logo className="navbar-logo" size={42} minWidth={97} onClick={() => onNav(signedIn ? "history" : "landing")} />

          {!isApp ?
            <nav style={{ display: "flex", gap: 36, alignItems: "center" }}>
              {[
                { id: "platform", label: t("nav.platform"), kind: "anchor" },
                { id: "services", label: t("nav.services"), kind: "anchor" },
                { id: "pricing", label: t("nav.pricing"), kind: "route" },
                { id: "about", label: t("nav.about"), kind: "anchor" }
              ].map((item) => {
                const sx = {
                  color: "var(--ink)", textDecoration: "none", fontSize: 15, fontWeight: 500,
                  padding: "6px 0", borderBottom: "1.5px solid transparent",
                  background: "transparent", border: 0, cursor: "pointer",
                  fontFamily: "var(--body)",
                  transition: "border-color 0.15s"
                }
                const onEnter = (e) => e.currentTarget.style.borderBottomColor = "var(--ink)"
                const onLeave = (e) => e.currentTarget.style.borderBottomColor = "transparent"
                return item.kind === "route"
                  ? <button key={item.id} onClick={() => onNav(item.id)} style={sx}
                      onMouseEnter={onEnter} onMouseLeave={onLeave}>{item.label}</button>
                  : <a key={item.id} href={`#${item.id}`} style={sx}
                      onMouseEnter={onEnter} onMouseLeave={onLeave}>{item.label}</a>
              })}

              {/* Sign in sits next to the nav links — left-anchored group (TASKS_3.md §4) */}
              {!signedIn && (
                <button onClick={() => onNav("auth-signin")}
                  style={{
                    background: "transparent", border: 0, padding: "6px 0",
                    color: "var(--muted)", fontFamily: "var(--body)",
                    fontSize: 15, fontWeight: 500, cursor: "pointer",
                    marginLeft: 8, transition: "color 150ms",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "var(--ink)"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "var(--muted)"}>
                  {t("nav.signin")}
                </button>
              )}
            </nav> :

            <nav style={{ display: "flex", gap: 4, alignItems: "center" }}>
              {[
                { id: "workspace", icon: "add_circle", label: { fr: "Nouvelle", en: "New" } },
                { id: "history", icon: "history", label: { fr: "Historique", en: "History" } }
              ].map((item) => {
                const active = route === item.id || item.id === "workspace" && route === "processing"
                return (
                  <button key={item.id} onClick={() => onNav(item.id)} style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "8px 14px", borderRadius: 999,
                    background: active ? "var(--ink-2)" : "transparent",
                    color: active ? "white" : "var(--ink)",
                    border: 0, fontSize: 13, fontWeight: 500, cursor: "pointer",
                    fontFamily: "var(--body)", transition: "all 0.15s"
                  }}>
                    <span className="icon" style={{ fontSize: 18 }}>{item.icon}</span>
                    <NavLabel item={item} />
                  </button>)
              })}
            </nav>
          }

          {/* Right cluster — language toggle + (when signed in) user menu.
             Get Started for visitors lives outside the navbar entirely (see below). */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginLeft: "auto" }}>
            <LangToggle />
            {signedIn && <UserMenu onNav={onNav} />}
          </div>
        </div>
      </header>

      {/* Sticky Get Started — fixed top-right, sibling of <header>, never hidden by scroll (TASKS_3.md §4) */}
      {showStickyCTA && (
        <button className="btn-get-started-sticky" onClick={() => onNav("auth-signup")}>
          {t("nav.signup")} →
        </button>
      )}
    </>
  )
}

function NavLabel({ item }) {
  const { lang } = useT()
  return <span>{item.label[lang]}</span>
}

function UserMenu({ onNav }) {
  const [open, setOpen] = useState(false)
  const { t } = useT()
  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen((o) => !o)} style={{
        width: 36, height: 36, borderRadius: 999, border: "1px solid var(--rule)",
        background: "linear-gradient(135deg, #A06BD8 0%, #6C4ED2 50%, #0E1634 100%)",
        color: "white", fontWeight: 600, fontSize: 13, cursor: "pointer",
        fontFamily: "var(--display)"
      }}>SA</button>
      {open &&
      <div style={{
        position: "absolute", right: 0, top: 44, minWidth: 220,
        background: "white", border: "1px solid var(--rule)", borderRadius: 14,
        boxShadow: "0 12px 40px -12px rgba(15,8,102,0.18)",
        padding: 6, zIndex: 100
      }}>
          <div style={{ padding: "10px 12px 8px" }}>
            <div style={{ fontWeight: 600, fontSize: 14 }}>Sara Amrani</div>
            <div style={{ color: "var(--muted)", fontSize: 12 }}>sara@enseirb.fr</div>
          </div>
          <div className="hr" style={{ margin: "6px 0" }} />
          {[
        { label: t("nav.history"), icon: "history", id: "history" },
        { label: t("nav.account"), icon: "person", id: "account" },
        { label: t("nav.signout"), icon: "logout", id: "signout" }].
        map((it) =>
        <button key={it.id} onClick={() => {setOpen(false);onNav(it.id);}} style={{
          display: "flex", alignItems: "center", gap: 10, width: "100%",
          padding: "9px 12px", border: 0, background: "transparent",
          borderRadius: 8, cursor: "pointer", color: "var(--ink)",
          fontFamily: "var(--body)", fontSize: 13, textAlign: "left"
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = "var(--hover)"}
        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>

              <span className="icon" style={{ fontSize: 18, color: "var(--muted)" }}>{it.icon}</span>
              {it.label}
            </button>
        )}
        </div>
      }
    </div>)

}

// ─── Card primitive ───────────────────────────────────────────────────
// `glass` switches to the frosted glass card style from DESIGN.md §5.
// Hover (when `hoverable` or `onClick`) applies the 200ms lift defined in §8.
export function Card({ children, style, padding = 24, hoverable, glass, onClick }) {
  const interactive = hoverable || !!onClick
  const base = glass
    ? {
        background: "var(--glass-bg)",
        backdropFilter: "var(--backdrop)",
        WebkitBackdropFilter: "var(--backdrop)",
        border: "1px solid var(--glass-border)",
        boxShadow: "var(--glass-shadow), 0 1px 0 rgba(255,255,255,0.6) inset",
      }
    : {
        background: "var(--card)",
        border: "1px solid var(--rule-soft)",
        boxShadow: "0 1px 2px rgba(80, 70, 160, 0.04)",
      }
  return (
    <div onClick={onClick} style={{
      ...base,
      borderRadius: 16,
      padding,
      transition: "transform 200ms ease-out, box-shadow 200ms ease-out, border-color 200ms ease-out",
      cursor: onClick ? "pointer" : "default",
      ...style
    }}
    onMouseEnter={interactive ? (e) => {
      e.currentTarget.style.transform = "translateY(-2px)"
      e.currentTarget.style.boxShadow = "var(--glass-shadow-hover)"
    } : undefined}
    onMouseLeave={interactive ? (e) => {
      e.currentTarget.style.transform = ""
      e.currentTarget.style.boxShadow = base.boxShadow
    } : undefined}>
      {children}</div>)

}

export function Button({ children, kind = "primary", size = "md", icon, onClick, type = "button", style, disabled }) {
  const sizes = {
    sm: { padding: "6px 12px", fontSize: 12, height: 30 },
    md: { padding: "10px 18px", fontSize: 13, height: 40 },
    lg: { padding: "14px 24px", fontSize: 15, height: 50 }
  }
  const kinds = {
    primary: { background: "var(--ink-2)", color: "white", border: "1px solid var(--ink-2)" },
    ghost: { background: "transparent", color: "var(--ink)", border: "1.5px solid var(--rule)" },
    quiet: { background: "transparent", color: "var(--ink)", border: "1px solid transparent" },
    invert: { background: "white", color: "var(--ink)", border: "1px solid white" }
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
      borderRadius: 999, fontFamily: "var(--body)", fontWeight: 500, cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1, transition: "transform 0.06s, box-shadow 0.18s",
      ...sizes[size], ...kinds[kind], ...style
    }}
    onMouseDown={(e) => !disabled && (e.currentTarget.style.transform = "translateY(1px)")}
    onMouseUp={(e) => e.currentTarget.style.transform = ""}
    onMouseLeave={(e) => e.currentTarget.style.transform = ""}>

      {icon && <span className="icon" style={{ fontSize: 18 }}>{icon}</span>}
      {children}
    </button>)

}

// ─── Eyebrow / labels ────────────────────────────────────────────────
export function Eyebrow({ children, style, className = "" }) {
  return <div className={`eyebrow ${className}`.trim()} style={style}>{children}</div>
}

// ─── Sparkline ────────────────────────────────────────────────────────
export function Sparkline({ values, width = 120, height = 32, color = "var(--ink)" }) {
  const min = Math.min(...values), max = Math.max(...values)
  const range = max - min || 1
  const pts = values.map((v, i) => {
    const x = i / (values.length - 1) * width
    const y = height - (v - min) / range * (height - 4) - 2
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(" ")
  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={width} cy={height - (values[values.length - 1] - min) / range * (height - 4) - 2} r="2.5" fill={color} />
    </svg>)

}

// ─── Bar Range (with ideal zone) ─────────────────────────────────────
export function MetricBar({ value, range = [0, 100], ideal, size = "md" }) {
  const [min, max] = range
  const pct = Math.max(0, Math.min(100, (value - min) / (max - min) * 100))
  const idealStart = ideal ? (ideal[0] - min) / (max - min) * 100 : 0
  const idealEnd = ideal ? (ideal[1] - min) / (max - min) * 100 : 0
  const h = size === "sm" ? 6 : 8
  return (
    <div style={{ position: "relative", height: h, background: "var(--rule-soft)", borderRadius: h }}>
      {ideal &&
      <div style={{
        position: "absolute", left: `${idealStart}%`, width: `${idealEnd - idealStart}%`,
        top: 0, bottom: 0, background: "rgba(31,157,110,0.18)", borderRadius: h
      }} />
      }
      <div style={{
        position: "absolute", left: `calc(${pct}% - 1px)`, top: -2, bottom: -2,
        width: 2, background: "var(--ink)", borderRadius: 2
      }} />
    </div>)

}

// ─── Stacked emotion bar ──────────────────────────────────────────────
export function StackedBar({ items, height = 10 }) {
  return (
    <div style={{ display: "flex", height, borderRadius: 999, overflow: "hidden", border: "1px solid var(--rule)" }}>
      {items.map((it, i) =>
      <div key={i} title={`${it.label}: ${it.pct.toFixed(1)}%`}
      style={{ width: `${it.pct}%`, background: it.color, transition: "filter 0.15s" }} />
      )}
    </div>)

}

// ─── Score gauge (radial-ish, but simple: number + arc) ──────────────
export function ScoreRing({ value, size = 140, stroke = 6, color = "var(--ink)" }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - value / 100 * c
  return (
    <svg width={size} height={size} style={{ display: "block" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--rule)" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
      strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
      transform={`rotate(-90 ${size / 2} ${size / 2})`}
      style={{ transition: "stroke-dashoffset 0.6s" }} />
    </svg>)

}

// ─── Animated waveform ────────────────────────────────────────────────
export function MiniWaveform({ active = true, bars = 18, color = "var(--ink)" }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 2, height: 18 }}>
      {Array.from({ length: bars }).map((_, i) =>
      <div key={i} style={{
        width: 2, height: 18, background: color, borderRadius: 2,
        transformOrigin: "center",
        animation: active ? `wave 0.9s ease-in-out ${i * 0.05}s infinite` : "none",
        opacity: active ? 1 : 0.4
      }} />
      )}
    </div>)

}
