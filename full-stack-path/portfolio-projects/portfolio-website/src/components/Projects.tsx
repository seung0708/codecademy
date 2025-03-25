import React from 'react'

const Projects = () => {
  return (
    <section id="projects">
            <div className="container">
                <div className="projects_heading">
                    <h2>Projects</h2>
                    <p>Here are some featured projects that showcase my passion for full stack development</p>
                </div>
                <div className="projects_details">
                    <img src="./assets/images/ecohaven.png" />
                    <div className="projects_details_heading">
                        <h3>Landing Page for EcoHaven</h3>
                        <p>Designed and built a web page for a company called EcoHaven. It is fully responsive</p>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Projects