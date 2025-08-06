import React from 'react'
import './Projects.css'

const projects = [
    {title: 'Sentinal AI', description: 'RAG application predicting fraudulent transactions'}, 
    {title: 'Little Tokyo Sushi', description: 'Online Ordering Website for Sushi Restaurant'}
]

const Projects = () => {
  return (
    <section className='projects' id="projects">
        <h2>Projects</h2>
        <div className="project-cards">    
            {projects.map((project, index) => (
                <div key={index} className='project-card'>
                    <div className='project-image'></div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                </div>
            ))}
        </div>
                
    </section>
  )
}

export default Projects