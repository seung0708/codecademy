import './About.css'
import { Globe, Database, Code } from 'lucide-react';

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
      <h1 className='about-title'>About Me</h1>
      <div className='about-container'>
        <div className="about-grid">
          <div>
            <p className='about-text'>
              I'm a Full Stack Developer with hands-on experience building personal projects using modern web technologies. I enjoy creating both frontend and backend solutions and am passionate about turning ideas into functional, user-friendly applications.
            </p>
            <p className="about-text">
              I focus on writing clean, efficient code while learning best practices and exploring new technologies. My goal is to contribute to impactful projects, grow as a developer, and continuously improve my problem-solving and development skills.
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

/*


 */