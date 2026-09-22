import { useState } from 'react'
import { profile, gmailCompose } from '../data'
import SectionHeader from './SectionHeader'

function Contact() {
  const [status, setStatus] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = data.get('name')
    const email = data.get('email')
    const message = data.get('message')

    const url = gmailCompose(
      profile.email,
      `Portfolio inquiry from ${name}`,
      `${message}\n\n— ${name} (${email})`,
    )
    window.open(url, '_blank', 'noopener,noreferrer')
    setStatus('Gmail opened in a new tab — review the message and press Send.')
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
            target="_blank"
            rel="noreferrer"
            className="contact-detail"
          >
            <span aria-hidden="true">📧</span> {profile.email}
          </a>
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
          <button type="submit" className="btn btn-primary">
            Send Message
          </button>
          {status && <p className="form-status">{status}</p>}
        </form>
      </div>
    </section>
  )
}

export default Contact