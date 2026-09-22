import { useState } from 'react'
import { profile } from '../data'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar">
      <nav className="navbar-inner">
        <a href="#home" className="logo" onClick={() => setOpen(false)}>
          {profile.initials}
          <span className="logo-dot">.</span>
        </a>

        <button
          type="button"
          className={`nav-toggle ${open ? 'open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
          <li className="nav-cta-mobile">
            <a href={profile.resumeUrl} className="btn btn-sm" download>
              Resume
            </a>
          </li>
        </ul>

        <a href={profile.resumeUrl} className="btn btn-sm nav-cta" download>
          Download Resume
        </a>
      </nav>
    </header>
  )
}

export default Navbar