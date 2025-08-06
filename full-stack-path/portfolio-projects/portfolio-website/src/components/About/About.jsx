import React from 'react'
import './About.css'
const About = () => {
  return (
    <section className='about' id="about">
      <div className="about-heading">
        <h2>About Me</h2>
        <p className='about-description'>I'm a Full Stack Developer with a passion for creating sleek, intuitive, and scalable web applications. My expertise lies in React, Node.js, and PostgreSQL, but I'm always eager to expand my skills—currently diving deeper into other technologies. I love turning complex ideas into smooth user experiences and am always up for a challenge.</p>
      </div>
      <div className="skills">
        <div className="skill-icon" aria-label="HTML">
          <img src='/assets/images/html5.svg' />
        </div>
        <div className="skill-icon" aria-label="CSS">
          <img src='/assets/images/css3.svg' />
        </div>
        <div className="skill-icon" aria-label="JavaScript">
          <img src='/assets/images/javascript.svg' />
        </div>
        <div className="skill-icon" aria-label="React"> 
          <img src='/assets/images/react.svg' />
        </div>
        <div className="skill-icon" aria-label="Redux">
          <img src='/assets/images/redux.svg' />
        </div>
        <div className="skill-icon" aria-label="Node.js">
          <img src='/assets/images/nodedotjs.svg' />
        </div>
        <div className="skill-icon" aria-label="Express">
          <img src='/assets/images/express.svg' />
        </div>
        <div className="skill-icon" aria-label="npm">
          <img src='/assets/images/npm.svg' />
        </div>
        <div className="skill-icon" aria-label="Git">
          <img src='/assets/images/git.svg' />
        </div>
        <div className="skill-icon" aria-label="React">
          <img src='/assets/images/react.svg' />
        </div>
        <div className="skill-icon" aria-label="Github">
          <img src='/public/assets/images/github.svg' />
        </div>
      </div>
    </section>
  )
}

export default About 