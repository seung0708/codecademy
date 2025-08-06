import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-text">
                <h1>Hi, I'm Seung Kim</h1>
                <h2 className='subtitle'>Full-Stack Developer</h2>
                <p className='description'>I design and build modern, user-friendly websites</p>
                <a href='#projects' className='cta-button' aria-label='View My Work'>View My Work</a>
            </div>
            <div className='hero-image'>
                <img src='/assets/images/IMG_20190312_191356_018.jpg'  />
            </div> 
            
        </section>
  )
}

export default Hero
