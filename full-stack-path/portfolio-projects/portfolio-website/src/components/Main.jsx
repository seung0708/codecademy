import React from 'react'
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';

const Main = ({darkMode}) => {
  return (
    <main>
        <Hero darkMode={darkMode} />
        <About />
        <Projects />
        <Contact />
    </main>
  )
}

export default Main