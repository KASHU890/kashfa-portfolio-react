import { profile } from '../data'
import SectionHeader from './SectionHeader'

function Resume() {
  return (
    <section id="resume" className="section">
      <SectionHeader eyebrow="Resume" title="My resume" />
      <div className="resume-card">
        <div className="resume-toolbar">
          <div>
            <strong>{profile.name}</strong>
            <span className="resume-sub">Full Stack Web Developer • Fresher</span>
          </div>
          <a href={profile.resumeUrl} className="btn btn-primary btn-sm" download>
            Download PDF
          </a>
        </div>
        <iframe
          src={profile.resumeUrl}
          title="Kashfa Ahsaan resume"
          className="resume-frame"
          loading="lazy"
        />
      </div>
    </section>
  )
}

export default Resume