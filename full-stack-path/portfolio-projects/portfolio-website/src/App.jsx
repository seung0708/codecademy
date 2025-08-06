import React, {useState} from 'react';
import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom';
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Projects from './components/Projects';
import Contact from './components/Contact';

const App = () => {
  const [darkMode, setDarkMode] = useState(true)
  return (
    <div className='app'>
      <Header />
      <main> 
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App