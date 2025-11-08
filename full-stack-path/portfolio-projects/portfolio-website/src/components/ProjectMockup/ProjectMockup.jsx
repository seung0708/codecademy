import "./ProjectMockup.css";

const ProjectMockup = ({ screenshot, title, description, tech, github, live, features }) => {
  return (
    <div className="project-mockup">
      <div className="webpage-mockup">
        <div className="browser-bar">
          <div className="dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
        </div>
        <div className="mockup-content">
          <img src={screenshot} alt={title} />
        </div>
      </div>

      <div className="project-info">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="project-tech">
          {tech.map((t, idx) => (
            <span key={idx} className="tech-tag">{t}</span>
          ))}
        </div>
        <div className="project-links">
          <a href={github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={live} target="_blank" rel="noopener noreferrer">Live</a>
        </div>
        <ul className="project-features">
          {features.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectMockup;
