import { useState } from 'react'
import { profile, gmailCompose } from '../data'
import SectionHeader from './SectionHeader'

function Contact() {
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const payload = {
      _subject: `Portfolio inquiry from ${data.get('name')}`,
      name: data.get('name'),
      email: data.get('email'),
      message: data.get('message'),
    }

    setSending(true)
    setStatus('Message bheja ja raha hai...')
    try {
      const res = await fetch(
        'https://formsubmit.co/ajax/kashfa.ahsaan@gmail.com',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        },
      )
      const result = await res.json()
      if (res.ok && result.success) {
        setStatus('✅ Message parh gaya! Aapke inbox mein aa gaya. Reply jald mil jayega.')
        event.currentTarget.reset()
      } else {
        setStatus(
          '⚠️ Pehli baar activation chahiye — Gmail inbox mein FormSubmit ka email par gaye, us mein Activate par click karein, phir dobara submit karein.',
        )
      }
    } catch {
      setStatus('❌ FormSubmit reach nahi hua. Internet check karein.')
    } finally {
      setSending(false)
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setStatus('Email copied to clipboard!')
    } catch {
      setStatus(profile.email)
    }
    setTimeout(() => setStatus(''), 3500)
  }

  return (
    <section id="contact" className="section contact-section">
      <SectionHeader eyebrow="Contact" title="Let's work together" />
      <div className="contact-grid">
        <div className="contact-info">
          <p>
            Have a project in mind, or just want to say hello? My inbox is always
            open — I usually reply within 24 hours.
          </p>
          <a
            href={gmailCompose(profile.email)}
            className="contact-detail"
            title="Open Gmail compose"
          >
            <span aria-hidden="true">📧</span> {profile.email}
          </a>
          <button type="button" className="copy-btn" onClick={copyEmail}>
            📋 Copy email
          </button>
          <a href={`tel:${profile.phone}`} className="contact-detail">
            <span aria-hidden="true">📞</span> {profile.phone}
          </a>
          <div className="contact-socials">
            {profile.socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline btn-sm"
              >
                {social.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="field-row">
            <label className="field">
              <span>Name</span>
              <input type="text" name="name" required placeholder="Your name" />
            </label>
            <label className="field">
              <span>Email</span>
              <input type="email" name="email" required placeholder="you@email.com" />
            </label>
          </div>
          <label className="field">
            <span>Message</span>
            <textarea
              name="message"
              required
              rows="5"
              placeholder="Tell me about your project..."
            ></textarea>
          </label>
          <input type="text" name="_honey" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
          <button type="submit" className="btn btn-primary" disabled={sending}>
            {sending ? 'Sending...' : 'Send Message'}
          </button>
          {status && <p className="form-status">{status}</p>}
        </form>
      </div>
    </section>
  )
}

export default Contact