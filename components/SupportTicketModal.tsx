import React, { useState, useEffect } from 'react'

interface SupportTicketModalProps {
  isOpen: boolean
  onClose: () => void
  user: { name: string; email: string } | null
}

const CATEGORIES = [
  'General Question',
  'Bug Report',
  'Feature Request',
  'Billing',
  'Account & Access',
  'Integrations',
  'Other',
]

export function SupportTicketModal({ isOpen, onClose, user }: SupportTicketModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [submitted, setSubmitted] = useState(false)

  // Pre-fill from user if logged in
  useEffect(() => {
    if (user) {
      setName(user.name || '')
      setEmail(user.email || '')
    }
  }, [user])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: wire up to a real tickets table / email service
    console.log('Support ticket submitted', { name, email, category, subject, description })
    setSubmitted(true)
  }

  const handleClose = () => {
    setSubmitted(false)
    setSubject('')
    setDescription('')
    onClose()
  }

  return (
    <div className="ticket-overlay" onClick={handleClose}>
      <div className="ticket-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal aria-label="Support ticket">
        {/* Header */}
        <div className="ticket-header">
          <span className="ticket-title">Submit a Support Ticket</span>
          <button className="ticket-close" onClick={handleClose} aria-label="Close">✕</button>
        </div>

        {!user ? (
          /* Not logged in */
          <div className="ticket-login-prompt">
            <div className="ticket-login-icon">🔒</div>
            <p className="ticket-login-text">You need to be signed in to submit a support ticket.</p>
            <a
              href="https://cumulus.suprvisr.ai/login"
              target="_blank"
              rel="noopener noreferrer"
              className="ticket-login-btn"
            >
              Sign in to continue
            </a>
            <p className="ticket-login-sub">
              You can still browse the docs without signing in.
            </p>
          </div>
        ) : submitted ? (
          /* Success state */
          <div className="ticket-success">
            <div className="ticket-success-icon">✓</div>
            <p className="ticket-success-title">Ticket submitted!</p>
            <p className="ticket-success-sub">We&apos;ll get back to you at <strong>{email}</strong> as soon as possible.</p>
            <button className="ticket-submit-btn" onClick={handleClose} style={{ marginTop: '1.25rem' }}>
              Close
            </button>
          </div>
        ) : (
          /* Form */
          <form className="ticket-form" onSubmit={handleSubmit}>
            <div className="ticket-row">
              <div className="ticket-field">
                <label className="ticket-label">Name</label>
                <input
                  className="ticket-input"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  placeholder="Your name"
                />
              </div>
              <div className="ticket-field">
                <label className="ticket-label">Email</label>
                <input
                  className="ticket-input"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="ticket-field">
              <label className="ticket-label">Category</label>
              <select className="ticket-input" value={category} onChange={e => setCategory(e.target.value)}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div className="ticket-field">
              <label className="ticket-label">Subject</label>
              <input
                className="ticket-input"
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                required
                placeholder="Brief summary of your issue"
              />
            </div>

            <div className="ticket-field">
              <label className="ticket-label">Description</label>
              <textarea
                className="ticket-textarea"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
                placeholder="Please describe your issue in detail..."
                rows={5}
              />
            </div>

            <button type="submit" className="ticket-submit-btn" disabled={!subject || !description}>
              Submit Ticket
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
