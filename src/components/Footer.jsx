import { profile } from '../data'

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>
          © {year} {profile.name}. Built with React & Vite.
        </p>
        <div className="footer-links">
          {profile.socials.map((social) => (
            <a key={social.label} href={social.url} target="_blank" rel="noreferrer">
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer