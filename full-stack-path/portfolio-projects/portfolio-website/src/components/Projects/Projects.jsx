import './Projects.css'

const projects = [
  {
    id: 1,
    title: "Little Tokyo Sushi",
    description: "A modern restaurant website featuring online ordering, menu management, and customer reviews. Built with responsive design and optimized for mobile users.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Stripe API", "CSS3"],
    github: "https://github.com/seung0708/littletokyosushi",
    live: "#",
    image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=800&h=600&fit=crop",
    features: ["Online Ordering", "Payment Integration", "Admin Dashboard", "Mobile Responsive"]
  },
  {
    id: 2,
    title: "Sentinal AI",
    description: "An intelligent monitoring system leveraging AI for predictive analytics and real-time threat detection. Features machine learning algorithms for pattern recognition.",
    tech: ["Python", "TensorFlow", "React", "FastAPI", "PostgreSQL", "Docker"],
    github: "https://github.com/seung0708/sentinalAI",
    live: "#",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop",
    features: ["AI/ML Integration", "Real-time Analytics", "Scalable Architecture", "API Development"]
  }
];

const Projects = () => {
  return (
    <section className="projects">
      <h2>My Projects</h2>
      <div className="projects-container">
        {projects.map((project) => (
            <div className="project">
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="tech-tag">{t}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                  <a href={project.live} target="_blank" rel="noopener noreferrer">Live</a>
                </div>
                <ul className="project-features">
                  {project.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
        ))}
      </div>
    </section>
  )
}

export default Projects