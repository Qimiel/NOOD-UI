// App shell — routing + tweaks + auth
import { useState, useCallback, useEffect } from 'react'
import { I18nProvider } from './i18n.jsx'
import { Header } from './components.jsx'
import Landing from './screens/Landing.jsx'
import Pricing from './screens/Pricing.jsx'
import Auth from './screens/Auth.jsx'
import Workspace from './screens/Workspace.jsx'
import Processing from './screens/Processing.jsx'
import Report from './screens/Report.jsx'
import History from './screens/History.jsx'
import {
  TweaksPanel, TweakSection, TweakSelect, TweakRadio, useTweaks,
} from './tweaks/TweaksPanel.jsx'
import { AuthProvider, useAuth } from './auth/AuthContext.jsx'

const SHOW_DEV_UI =
  import.meta.env.DEV || import.meta.env.VITE_DEV_MODE === 'true'

const TWEAK_DEFAULTS = {
  defaultLang: 'fr',
  startScreen: 'landing',
}

export default function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  )
}

function AppShell() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS)
  const [route, setRoute] = useState(tweaks.startScreen || 'landing')
  const [authMode, setAuthMode] = useState('signin')
  const [fileState, setFileState] = useState(null)
  const { user, signOut } = useAuth()
  const signedIn = !!user

  const onNav = useCallback(async (to, opts) => {
    if (to === 'auth-signin') { setRoute('auth'); setAuthMode('signin') }
    else if (to === 'auth-signup') { setRoute('auth'); setAuthMode('signup') }
    else if (to === 'signout') {
      try { await signOut() } catch {}
      setRoute('landing')
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    else { setRoute(to) }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [signOut])

  // If the user signs in elsewhere (token refresh, popup auth), bounce them
  // out of the auth screen automatically.
  useEffect(() => {
    if (signedIn && route === 'auth') setRoute('workspace')
  }, [signedIn, route])

  const isAppShell = ['workspace', 'processing', 'report', 'history', 'account'].includes(route)
  const showHeader = route !== 'auth'

  return (
    <I18nProvider defaultLang={tweaks.defaultLang || 'fr'}>
      {showHeader && <Header variant={isAppShell ? 'app' : 'marketing'} route={route} signedIn={signedIn} onNav={onNav} />}
      {route === 'landing'    && <Landing onNav={onNav} />}
      {route === 'pricing'    && <Pricing onNav={onNav} />}
      {route === 'auth'       && <Auth mode={authMode} onNav={onNav} />}
      {route === 'workspace'  && <Workspace onNav={onNav} fileState={fileState} setFileState={setFileState} />}
      {route === 'processing' && <Processing onNav={onNav} />}
      {route === 'report'     && <Report onNav={onNav} />}
      {route === 'history'    && <History onNav={onNav} />}
      {route === 'account'    && <AccountStub onNav={onNav} />}

      {SHOW_DEV_UI && (
        <TweaksPanel title="Tweaks">
          <TweakSection label="Demo controls">
            <TweakSelect label="Jump to screen" value={route} onChange={(v) => onNav(v)} options={[
              { value: 'landing', label: 'Landing' },
              { value: 'pricing', label: 'Pricing' },
              { value: 'auth', label: 'Auth' },
              { value: 'workspace', label: 'Workspace' },
              { value: 'processing', label: 'Processing' },
              { value: 'report', label: 'Report' },
              { value: 'history', label: 'History' },
            ]} />
          </TweakSection>
          <TweakSection label="Display">
            <TweakRadio label="Default language" value={tweaks.defaultLang} onChange={(v) => setTweak('defaultLang', v)} options={[
              { value: 'fr', label: 'FR' },
              { value: 'en', label: 'EN' },
            ]} />
          </TweakSection>
        </TweaksPanel>
      )}
    </I18nProvider>
  )
}

function AccountStub({ onNav }) {
  const { user } = useAuth()
  return (
    <div style={{ padding: '64px 32px', maxWidth: 720, margin: '0 auto' }}>
      <h1 className="display" style={{ fontSize: 36 }}>Account</h1>
      {user && (
        <p style={{ color: 'var(--muted)' }}>
          {user.displayName || user.email} · {user.uid.slice(0, 8)}…
        </p>
      )}
      <p style={{ color: 'var(--muted)' }}>Settings &amp; billing live here.</p>
      <button onClick={() => onNav('history')} style={{
        border: '1px solid var(--rule)', background: 'transparent', padding: '10px 18px',
        borderRadius: 999, cursor: 'pointer', color: 'var(--ink)', fontFamily: 'var(--body)',
      }}>Back to history</button>
    </div>
  )
}
