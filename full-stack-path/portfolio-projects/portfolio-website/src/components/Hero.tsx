import React from 'react'

const Hero = ({darkMode}) => {

    if (!darkMode) {
        
    }

    return (
        <section id="hero">
            <div className="container">
                <div className="hero_heading">
                    <span style={{fontSize: '24px'}}>Hi, I am </span>
                    <p id="typing-text" style={{fontSize: '32px'}}>Seung Kim</p>
                    <h1 style={{fontSize: '100px'}}><span>Full Stack</span> <span style={{position: 'relative', left: '100px'}}>Developer</span></h1>
                    <p style={{width: '600px', marginTop: '30px'}}>Located in Los Angeles, CA and passionate about crafting seamless user experiences with modern technologies. With expertise in React, Node.js, PostgreSQL, and more, I bring ideas to life through clean, efficient, and scalable code. Let's build something amazing together!</p>
                </div>
                <img className="hero_img" src="./assets/images/IMG_20190312_191356_018.jpg" />
            </div>   
        </section>
  )
}

export default Hero

 {/* <div className="hero">
                    <div className="hero_heading">
                        <h1>Hi, I am <span id="typing-text"></span></h1>
                        <p>A Los Angeles based Full Stack Developer passionate about building accessible and friendly websites</p>
                    </div>
                    
                </div>
               > */}