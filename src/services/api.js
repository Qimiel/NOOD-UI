// Backend API client.
// In dev, leave VITE_API_URL unset and Vite proxies /api → backend.
// In prod, set VITE_API_URL to the backend's public origin.
import { FALLBACK_REPORT } from '../data.jsx'
import { auth, isFirebaseConfigured } from './firebase.js'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

// Build a Headers object with the current Firebase ID token attached.
// Falls back to no Authorization when the user is anonymous or Firebase
// isn't configured — the backend treats auth as optional unless
// NOOD_REQUIRE_AUTH=1 is set.
async function authHeaders(extra = {}) {
  const headers = { ...extra }
  if (isFirebaseConfigured && auth.currentUser) {
    try {
      const token = await auth.currentUser.getIdToken()
      headers['Authorization'] = `Bearer ${token}`
    } catch {}
  }
  return headers
}

// The backend (presentation_analyzer.run_pipeline) emits a report with a
// flat `overall_score` / `component_scores` shape, while the UI expects the
// richer fallback shape (overall.score, components.{voice,body,tone,content},
// localized strings, coaching_tips, etc). Until the two shapes are reconciled
// end-to-end, normalize layers what the backend provides over the fallback so
// the UI keeps rendering instead of crashing on missing fields.
export function normalizeReport(raw) {
  if (!raw || typeof raw !== 'object') return FALLBACK_REPORT
  // Already UI-shaped (e.g. demo / cached): pass through.
  if (raw.overall && typeof raw.overall.score === 'number') return raw

  const merged = JSON.parse(JSON.stringify(FALLBACK_REPORT))
  if (typeof raw.overall_score === 'number') {
    merged.overall.score = raw.overall_score
  }
  if (typeof raw.overall_grade === 'string') {
    merged.overall.grade = raw.overall_grade
  }
  const cs = raw.component_scores || {}
  if (typeof cs.speech_score === 'number')        merged.components.voice = Math.round(cs.speech_score)
  if (typeof cs.body_language_score === 'number') merged.components.body  = Math.round(cs.body_language_score)
  if (typeof cs.tone_fit_score === 'number')      merged.components.tone  = Math.round(cs.tone_fit_score)
  if (raw.meta?.audio_duration_s) {
    merged.meta.duration_s = Math.round(raw.meta.audio_duration_s)
  }
  if (raw.meta?.generated_at) {
    merged.meta.date = raw.meta.generated_at
  }
  return merged
}

async function jsonOrError(res) {
  if (!res.ok) {
    let body = ''
    try { body = await res.text() } catch {}
    throw new Error(`${res.status} ${res.statusText}${body ? ` — ${body}` : ''}`)
  }
  return res.json()
}

export async function uploadVideo(file) {
  const form = new FormData()
  form.append('video', file)
  try {
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      body: form,
      headers: await authHeaders(),
    })
    const data = await jsonOrError(res)
    return { ok: true, job_id: data.job_id, size_mb: data.size_mb }
  } catch (err) {
    return { ok: false, error: err.message || String(err) }
  }
}

export async function getJobStatus(jobId) {
  const res = await fetch(`${API_BASE}/jobs/${jobId}`, { headers: await authHeaders() })
  return jsonOrError(res)
}

export async function getJobResult(jobId) {
  const res = await fetch(`${API_BASE}/jobs/${jobId}/result`, { headers: await authHeaders() })
  const raw = await jsonOrError(res)
  return normalizeReport(raw)
}

export async function listJobs() {
  try {
    const res = await fetch(`${API_BASE}/jobs`, { headers: await authHeaders() })
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export async function health() {
  try {
    const res = await fetch(`${API_BASE}/health`)
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}
