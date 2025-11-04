import React from 'react'
import './About.css'
import { Globe, Database, Code, Zap } from 'lucide-react';

const skillsData = [
  {
    category: "Frontend",
    icon: <Globe style={{ width: '24px', height: '24px' }} />,
    items: ["HTML5/CSS3", "JavaScript", "React", "Redux", "TypeScript", "Next.js"]
  },
  {
    category: "Backend", 
    icon: <Database style={{ width: '24px', height: '24px' }} />,
    items: ["Node.js", "Express.js", "PostgreSQL", "Python", "Flask API"]
  },
  {
    category: "DevOps & Tools",
    icon: <Code style={{ width: '24px', height: '24px' }} />,
    items: ["Git", "CI/CD", "Jest"]
  },
];

const About = () => {

  return (
    <section className='about' id="about">
      <div className='about-container'>
        <h1 className='about-title'>About Me</h1>
        <div className="about-grid">
          <div>
            <p className='about-text'>
              I'm a passionate Full Stack Developer with expertise in modern web technologies and a strong focus on creating scalable, user-centric applications. With experience in both frontend and backend development, I bring ideas to life through clean, efficient code.
            </p>
            <p className="about-text">
              My approach combines technical excellence with creative problem-solving, ensuring every project delivers both outstanding performance and exceptional user experience.
            </p>
          </div>
          <div className="about-skills">
          {skillsData.map((skill, index) => (
            <div key={index} className="skill-card">
              <div className="skill-header">
                <div className="skill-icon">{skill.icon}</div>
                <h3 className="skill-title">{skill.category}</h3>
              </div>
              <div className="skill-items">
                {skill.items.map((item, i) => (
                  <span key={i} className="skill-item">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  )
}

export default About 