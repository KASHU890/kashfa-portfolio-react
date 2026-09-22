import { profile } from '../data'

function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-grid">
        <div className="hero-content">
          <p className="eyebrow">Hello, my name is</p>
          <h1 className="hero-name">
            {profile.name}
            <span className="accent-dot">.</span>
          </h1>
          <p className="hero-role">{profile.role}</p>
          <p className="hero-tagline">{profile.tagline}</p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View My Work
            </a>
            <a href={profile.resumeUrl} className="btn btn-outline" download>
              Download Resume
            </a>
          </div>
          <div className="hero-socials">
            {profile.socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="social-chip"
              >
                {social.label}
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="avatar-ring">
            <div className="avatar">
              <span>{profile.initials}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero