import React, { useState, useEffect, useRef } from 'react'
import { SupportTicketModal } from './SupportTicketModal'

interface UserInfo {
  name: string
  email: string
  initials: string
}

export function AuthWidget() {
  const [user, setUser] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [ticketOpen, setTicketOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let supabase: ReturnType<typeof import('@/lib/supabase').getSupabaseClient> | null = null

    async function initAuth() {
      try {
        const { getSupabaseClient } = await import('@/lib/supabase')
        supabase = getSupabaseClient()

        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          setUser(buildUserInfo(session.user))
        }

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user ? buildUserInfo(session.user) : null)
        })

        setLoading(false)
        return () => subscription.unsubscribe()
      } catch {
        setLoading(false)
      }
    }

    const cleanup = initAuth()
    return () => { cleanup.then(fn => fn?.()) }
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [dropdownOpen])

  const handleSignOut = async () => {
    try {
      const { getSupabaseClient } = await import('@/lib/supabase')
      await getSupabaseClient().auth.signOut()
      setDropdownOpen(false)
    } catch {}
  }

  // Don't render anything during SSR / initial hydration
  if (loading) return <div style={{ width: 80 }} />

  return (
    <>
      <div className="auth-widget">
        {/* Support ticket button — always visible */}
        <button
          className="auth-support-btn"
          onClick={() => setTicketOpen(true)}
          title={user ? 'Submit a support ticket' : 'Sign in to submit a support ticket'}
        >
          Support
        </button>

        {user ? (
          /* Logged-in: avatar + dropdown */
          <div className="auth-user" ref={dropdownRef}>
            <button
              className="auth-avatar"
              onClick={() => setDropdownOpen(o => !o)}
              title={user.name || user.email}
              aria-label="Account menu"
            >
              {user.initials}
            </button>

            {dropdownOpen && (
              <div className="auth-dropdown">
                <div className="auth-dropdown-info">
                  <span className="auth-dropdown-name">{user.name || 'User'}</span>
                  <span className="auth-dropdown-email">{user.email}</span>
                </div>
                <div className="auth-dropdown-divider" />
                <button className="auth-dropdown-item" onClick={() => { setTicketOpen(true); setDropdownOpen(false) }}>
                  Submit a ticket
                </button>
                <a
                  className="auth-dropdown-item"
                  href="https://cumulus.suprvisr.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Suprvisr ↗
                </a>
                <div className="auth-dropdown-divider" />
                <button className="auth-dropdown-item auth-dropdown-signout" onClick={handleSignOut}>
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Logged-out: sign in link */
          <a
            href="https://cumulus.suprvisr.ai/login"
            target="_blank"
            rel="noopener noreferrer"
            className="auth-signin-link"
            title="Sign in to submit support tickets"
          >
            Sign in
          </a>
        )}
      </div>

      <SupportTicketModal
        isOpen={ticketOpen}
        onClose={() => setTicketOpen(false)}
        user={user}
      />
    </>
  )
}

function buildUserInfo(user: { email?: string; user_metadata?: Record<string, string> }) {
  const email = user.email ?? ''
  const name: string = user.user_metadata?.full_name || user.user_metadata?.name || email.split('@')[0] || ''
  const initials = name
    .split(' ')
    .map(p => p[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || email[0]?.toUpperCase() || '?'
  return { name, email, initials }
}
