import { experience } from '../data'
import SectionHeader from './SectionHeader'

function Experience() {
  return (
    <section id="experience" className="section section-alt">
      <SectionHeader eyebrow="Journey" title="Experience & Education" />
      <div className="timeline">
        {experience.map((item, i) => (
          <div className="timeline-item" key={`${item.title}-${i}`}>
            <div className="timeline-marker">
              <span className={`timeline-badge ${item.type}`}>
                {item.type === 'work' ? '💼' : '🎓'}
              </span>
            </div>
            <div className="timeline-card">
              <span className="timeline-period">{item.period}</span>
              <h3>{item.title}</h3>
              <p className="timeline-org">{item.org}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Experience