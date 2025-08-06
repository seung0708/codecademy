import React from 'react';
import './Hero.css';

const icons = [
  { url: '/assets/images/html5.svg', style: { top: '0%', left: '53.19%' } },
  { url: '/assets/images/css3.svg', style: { top: '7.4%', left: '97.22%' } },
  { url: '/assets/images/javascript.svg', style: { top: '88.57%', left: '75.42%' } },
  { url: '/assets/images/react.svg', style: { top: '14.29%', left: '16.94%' } },
  { url: '/assets/images/redux.svg', style: { top: '1.71%', left: '-5.56%' } },
  { url: '/assets/images/nodedotjs.svg', style: { top: '20%', left: '73.33%' } },
  { url: '/assets/images/express.svg', style: { top: '42.29%', left: '-5.56%' } },
  { url: '/assets/images/github.svg', style: { top: '45.71%', left: '92.36%' } },
  { url: '/assets/images/git.svg', style: { top: '81.43%', left: '1.39%' } },
  { url: '/assets/images/npm.svg', style: { top: '75.71%', left: '40.83%' } },
  { url: '/assets/images/postgresql.svg', style: { top: '69.43%', left: '99.1%' } },
];

const Hero = () => {
  return (
    <section className="hero">
      <div className="icons-overlay">
        <div className="icons-container">
          {icons.map((icon, index) => (
            <div key={index} className="floating-icon" style={icon.style}>
              <div className="icon-wrapper">
                <img src={icon.url} alt={`icon-${index}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-image">
        <img src="/assets/images/IMG_20190312_191356_018.jpg" alt="Profile" />
      </div>
    </section>
  );
};

export default Hero
