import { skills } from '../data'
import SectionHeader from './SectionHeader'

function SkillList({ title, items }) {
  return (
    <div className="skill-column">
      <h3>{title}</h3>
      <ul className="skill-list">
        {items.map((skill) => (
          <li key={skill} className="skill-chip">
            {skill}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Skills() {
  return (
    <section id="skills" className="section section-alt">
      <SectionHeader eyebrow="Skills" title="What I bring to the table" />
      <div className="skills-grid">
        <SkillList title="Technical" items={skills.technical} />
        <SkillList title="Professional" items={skills.soft} />
      </div>
    </section>
  )
}

export default Skills