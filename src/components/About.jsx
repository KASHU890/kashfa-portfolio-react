import { about } from '../data'
import SectionHeader from './SectionHeader'

function About() {
  return (
    <section id="about" className="section">
      <SectionHeader eyebrow="About Me" title="A developer who cares about detail" />
      <div className="about-grid">
        <div className="about-text">
          {about.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="stats-grid">
          {about.stats.map((stat) => (
            <div className="stat" key={stat.label}>
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About