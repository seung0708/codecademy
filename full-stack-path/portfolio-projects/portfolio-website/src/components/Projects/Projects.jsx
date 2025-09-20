import React from 'react'
import './Projects.css'

const projectsData = [
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
    <section className='projects' id="projects">
        <div className='projects-container'>
            <h2 className='projects-title'>Projects</h2>
            <div className='projects-grid'>
                {projectsData.map(project => (
                    <div key={project.id} className='project-card'>
                        <div className='project-image-wrapper'>
                            <img />
                            <div className='project-overlay'></div>
                        </div>
                        <div className='project-content'>
                            <h3 className='project-title'>{project.title}</h3>
                            <p className='project-description'>{project.description}</p>
                            <div>
                                <h4 className='project-section-title'>Key Features:</h4>
                                <div className='project-features'>
                                    {project.features.map((feature,i) => (
                                        <span key={i} className='feature-item'>{feature}</span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className='project-section-title'>Technologies:</h4>
                                <div className='project-tech'>
                                    {project.tech.map((tech, i) => (
                                        <span key={i} className='tech-item'>{tech}</span>
                                    ))}
                                </div>
                            </div>
                            <div className='project-links'>
                                <a 
                                    href={project.github} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className='project-link'
                                >
                                    {/* <GitHub size={16} style={{marginRight: '8px'}} /> Code */}
                                </a>
                                <a 
                                    href={project.live} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className='project-link'
                                >
                                    {/* <ExternalLink size={16} style={{marginRight: '8px'}} /> Live Demo */}
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>        
    </section>
  )
}

export default Projects