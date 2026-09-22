import { projects } from '../data'
import SectionHeader from './SectionHeader'

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-icon" aria-hidden="true">
        {project.icon}
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="project-tech">
        {project.tech.map((tech) => (
          <span key={tech} className="tech-tag">
            {tech}
          </span>
        ))}
      </div>
      <div className="project-links">
        <a href={project.github} target="_blank" rel="noreferrer" className="link">
          GitHub <span aria-hidden="true">↗</span>
        </a>
        <a href={project.link} target="_blank" rel="noreferrer" className="link">
          Live Demo <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  )
}

function Projects() {
  return (
    <section id="projects" className="section">
      <SectionHeader eyebrow="Projects" title="Things I have built" />
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}

export default Projects