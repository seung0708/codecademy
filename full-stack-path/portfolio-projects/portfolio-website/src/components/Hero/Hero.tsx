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
  const heroContentRef = useRef(null);
  const [fadeProgress, setFadeProgress] = useState(0);

  const handleScroll = () => {
    const el = heroContentRef.current;
    if (!el) return;

    const scrollTop = el.scrollTop;
    const maxScroll = el.scrollHeight - el.clientHeight;
    // Map scrollTop proportionally to fade (0 → 1)
    const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
    setFadeProgress(progress);
  };

  return (
    <section className="hero">
      {/* Icons overlay */}
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

      {/* Scrollable hero content */}
      <div
        className="hero-content"
        ref={heroContentRef}
        onScroll={handleScroll}
      >
        {/* Hero image */}
        <div
          className="hero-image"
          style={{
            opacity: Math.max(1 - fadeProgress * 1.5, 0), // slower fade
            transform: `translateY(-${fadeProgress * 20}px)`,
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}
        >
          <img
            src="/assets/images/IMG_20190312_191356_018.jpg"
            alt="Hero"
            style={{
              opacity: Math.max(1 - fadeProgress * 1.5, 0),
              transition: 'opacity 0.2s ease',
            }}
          />
        </div>

        {/* Hero text */}
        <div className="hero-text">
          <h3
            className="text-line"
            style={{
              opacity: Math.min(fadeProgress * 1.5, 1), // slower fade-in
              transform: `translateY(${20 - fadeProgress * 20}px)`,
              transition: 'opacity 0.2s ease, transform 0.2s ease',
            }}
          >
            Hello, my name is Seung Kim
          </h3>
          <h3
            className="text-line"
            style={{
              opacity: Math.min(fadeProgress * 1.5, 1),
              transform: `translateY(${20 - fadeProgress * 20}px)`,
              transition: 'opacity 0.2s ease, transform 0.2s ease',
            }}
          >
            I am a Full-Stack developer
          </h3>
        </div>
        <div className="scroll-space"></div>
      </div>
    </section>
  );
};

export default Hero;
