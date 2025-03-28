import React from 'react'

const Hero = ({darkMode}) => {

    if (!darkMode) {
        
    }

    return (
        <section id="hero">
            <div className="container">
                <div className="">
                    <span style={{fontSize: '24px'}}>Hi, I am </span>
                    <p style={{fontSize: '32px'}}>Seung Kim</p>
                    <h1 style={{fontSize: '100px'}}><span>Full Stack</span> <span style={{position: 'relative', left: '100px'}}>Developer</span></h1>
                    <p>Located in Los Angeles, CA</p>
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
                <div className="skills">
                    <img src="./assets/images/html5.svg" />
                    <img src="./assets/images/css3.svg" />
                    <img src="./assets/images/javascript.svg" alt="" />
                    <img src="./assets/images/react.svg" alt="" />
                    <img src="./assets/images/redux.svg" alt="" />
                    <img src="./assets/images/nodedotjs.svg" alt="" />
                    <img src="./assets/images/express.svg" alt="" />
                    <img src="./assets/images/postgresql.svg" alt="" />
                    <img src="./assets/images/npm.svg" alt="" />
                    <img src="./assets/images/git.svg" alt="" />
                </div> */}