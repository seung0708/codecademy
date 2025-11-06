import React, { useRef, useState } from 'react';
import './Hero.css';

const icons = [
  { url: '/assets/images/html5.svg', style: { top: '10%', left: '50%' } },
  { url: '/assets/images/css3.svg', style: { top: '20%', left: '90%' } },
  { url: '/assets/images/javascript.svg', style: { top: '85%', left: '75%' } },
  { url: '/assets/images/react.svg', style: { top: '15%', left: '20%' } },
  { url: '/assets/images/redux.svg', style: { top: '30%', left: '5%' } },
  { url: '/assets/images/nodedotjs.svg', style: { top: '40%', left: '75%' } },
  { url: '/assets/images/express.svg', style: { top: '45%', left: '15%' } },
  { url: '/assets/images/github.svg', style: { top: '55%', left: '85%' } },
  { url: '/assets/images/git.svg', style: { top: '80%', left: '15%' } },
  { url: '/assets/images/npm.svg', style: { top: '76%', left: '40%' } },
  { url: '/assets/images/postgresql.svg', style: { top: '65%', left: '90%' } },
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
        <img src="/assets/images/IMG_20190312_191356_018.jpg" alt="Hero Image" />
      </div>
    </section>
  );
};

export default Hero;
