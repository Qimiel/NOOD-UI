// Auth — minimalist, dual-pane. Backed by Firebase Auth.
import { useState, useEffect } from 'react'
import { useT } from '../i18n.jsx'
import { Button, Logo } from '../components.jsx'
import { useAuth } from '../auth/AuthContext.jsx'

export default function Auth({ mode = "signin", onNav }) {
  const { t, lang } = useT()
  const { signIn, signUp, signInWithGoogle, signInWithApple, configured } = useAuth()
  const [m, setMode] = useState(mode)
  const [email, setEmail] = useState("")
  const [pw, setPw] = useState("")
  const [name, setName] = useState("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => setMode(mode), [mode])

  const friendly = (err) => {
    const code = err?.code || ''
    if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
      return lang === 'fr' ? 'Identifiants incorrects.' : 'Invalid credentials.'
    }
    if (code === 'auth/email-already-in-use') {
      return lang === 'fr' ? 'Cette adresse e-mail est déjà utilisée.' : 'That email is already in use.'
    }
    if (code === 'auth/weak-password') {
      return lang === 'fr' ? 'Mot de passe trop court (min. 6 caractères).' : 'Password too weak (min. 6 chars).'
    }
    if (code === 'auth/popup-closed-by-user') return null
    return err?.message || 'Authentication failed.'
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!configured) {
      setError(lang === 'fr' ? "Firebase n'est pas configuré." : 'Firebase is not configured.')
      return
    }
    setBusy(true)
    setError(null)
    try {
      if (m === 'signin') {
        await signIn(email, pw)
      } else {
        await signUp(email, pw, name || undefined)
      }
      onNav('workspace', { signedIn: true })
    } catch (err) {
      setError(friendly(err))
    } finally {
      setBusy(false)
    }
  }

  const oauth = (provider) => async () => {
    if (!configured) {
      setError(lang === 'fr' ? "Firebase n'est pas configuré." : 'Firebase is not configured.')
      return
    }
    setBusy(true)
    setError(null)
    try {
      await (provider === 'google' ? signInWithGoogle() : signInWithApple())
      onNav('workspace', { signedIn: true })
    } catch (err) {
      const f = friendly(err)
      if (f) setError(f)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="fade-in" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "calc(100vh - var(--navbar-height))" }}>
      {/* Left — form */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 48 }}>
        <div style={{ width: "100%", maxWidth: 380 }}>
          <button onClick={() => onNav("landing")} style={{
            display: "inline-flex", alignItems: "center", gap: 6, border: 0, background: "transparent",
            color: "var(--muted)", fontSize: 13, cursor: "pointer", marginBottom: 32, padding: 0,
          }}>
            <span className="icon" style={{ fontSize: 18 }}>arrow_back</span>
            {t("common.back")}
          </button>

          <h1 className="display" style={{ fontSize: 38, margin: "0 0 10px" }}>
            {m === "signin" ? t("auth.signin.title") : t("auth.signup.title")}
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 17, margin: "0 0 36px" }}>
            {m === "signin" ? t("auth.signin.lede") : t("auth.signup.lede")}
          </p>

          <form onSubmit={submit}>
            {m === "signup" && (
              <Field label={t("auth.fullname")} value={name} onChange={setName} placeholder="Sara Amrani" />
            )}
            <Field label={t("auth.email")} type="email" value={email} onChange={setEmail} placeholder="sara@enseirb.fr" />
            <Field label={t("auth.password")} type="password" value={pw} onChange={setPw} />

            {m === "signin" && (
              <a href="#" style={{ color: "var(--ink)", fontSize: 13, fontWeight: 500, textDecoration: "none", display: "inline-block", marginTop: 4, marginBottom: 24 }}>{t("auth.forgot")}</a>
            )}

            {error && (
              <div style={{ margin: "12px 0", padding: "10px 12px", background: "rgba(192,57,43,0.08)", border: "1px solid rgba(192,57,43,0.25)", borderRadius: 8, color: "var(--bad)", fontSize: 12.5 }}>
                {error}
              </div>
            )}

            <Button kind="primary" size="lg" disabled={busy} style={{ width: "100%", marginTop: m === "signin" ? 0 : 12 }} type="submit">
              {busy ? '…' : (m === "signin" ? t("auth.signin.cta") : t("auth.signup.cta"))}
            </Button>
          </form>

          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "28px 0" }}>
            <div style={{ flex: 1, height: 1, background: "var(--rule)" }} />
            <span className="eyebrow">{t("auth.or")}</span>
            <div style={{ flex: 1, height: 1, background: "var(--rule)" }} />
          </div>

          <Button kind="ghost" size="lg" icon="g_translate" disabled={busy} onClick={oauth('google')} style={{ width: "100%", marginBottom: 10 }}>{t("auth.google")}</Button>
          <Button kind="ghost" size="lg" icon="apple" disabled={busy} onClick={oauth('apple')} style={{ width: "100%" }}>{t("auth.apple")}</Button>

          <button onClick={() => setMode(m === "signin" ? "signup" : "signin")} style={{
            display: "block", margin: "32px auto 16px", border: 0, background: "transparent",
            color: "var(--ink-soft)", fontSize: 13, cursor: "pointer", fontWeight: 500,
          }}>
            {m === "signin" ? t("auth.toggle.signup") : t("auth.toggle.signin")}
          </button>

          <p style={{ color: "var(--muted-2)", fontSize: 11, lineHeight: 1.5, textAlign: "center", margin: 0 }}>
            {t("auth.terms")}
          </p>
        </div>
      </div>

      {/* Right — editorial */}
      <div style={{ background: "var(--ink-2)", color: "white", padding: 48, display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.10, backgroundImage: "radial-gradient(circle at 20% 30%, #A06BD8 0, transparent 45%), radial-gradient(circle at 80% 70%, #6C4ED2 0, transparent 45%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Logo size={36} />
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 460 }}>
          <div className="eyebrow" style={{ color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>{lang === "fr" ? "Témoignage" : "Testimonial"}</div>
          <p className="display" style={{ fontSize: 28, lineHeight: 1.25, margin: "0 0 28px", fontWeight: 500 }}>
            {lang === "fr"
              ? "« En quatre semaines, j'ai vu mon score moyen passer de 58 à 74. Surtout, je sais maintenant pourquoi. »"
              : "“In four weeks, my average score went from 58 to 74. More importantly — I now know why.”"}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 999, background: "linear-gradient(135deg, #A06BD8, #6C4ED2)" }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Yassine Bennani</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>ENSEIRB · Promo 2026</div>
            </div>
          </div>
        </div>
        <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 28, color: "rgba(255,255,255,0.7)", fontSize: 12 }}>
          <div><div className="num" style={{ fontSize: 24, fontWeight: 700, color: "white" }}>12k+</div>{lang === "fr" ? "analyses" : "analyses"}</div>
          <div><div className="num" style={{ fontSize: 24, fontWeight: 700, color: "white" }}>4.9</div>{lang === "fr" ? "note moyenne" : "average rating"}</div>
          <div><div className="num" style={{ fontSize: 24, fontWeight: 700, color: "white" }}>87%</div>{lang === "fr" ? "progression" : "improvement"}</div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, type = "text", placeholder }) {
  return (
    <label style={{ display: "block", marginBottom: 16 }}>
      <div className="eyebrow" style={{ marginBottom: 6 }}>{label}</div>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{
          width: "100%", padding: "12px 14px", border: "1px solid var(--rule)", borderRadius: 10,
          background: "white", fontSize: 14, fontFamily: "var(--body)", color: "var(--ink)",
          outline: "none", transition: "border-color 0.15s",
        }}
        onFocus={e => e.currentTarget.style.borderColor = "var(--ink)"}
        onBlur={e => e.currentTarget.style.borderColor = "var(--rule)"}
      />
    </label>
  )
}
