import './Projects.css'
import ProjectMockup from '../ProjectMockup/ProjectMockup'

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
    <section className="projects-page">
      <h2>My Projects</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectMockup
            key={project.id}
            screenshot={project.image}
            title={project.title}
            description={project.description}
            tech={project.tech}
            github={project.github}
            live={project.live}
            features={project.features}
          />
        ))}
      </div>
    </section>
  )
}

export default Projects