import React from 'react'
import { NavLink } from 'react-router-dom'

import {Sun, Moon} from 'lucide-react';

const Header = ({darkMode, setDarkMode}) => {
  
  const handleToggleClick = () => {
    console.log(darkMode)
    if (darkMode) {
      setDarkMode(!darkMode)
      document.body.style.backgroundColor = '#000'
      document.body.style.color = '#FFF'
      
      
    } else {
      setDarkMode(!darkMode)
      document.body.style.backgroundColor = '#FFF'
      document.body.style.color = '#000'
    }
    
  }

  return (
    <header>
        <div className="container">
            <nav className="desktop_nav">
                <div className="logo">SK</div>
                <ul className="nav_links">
                    <li className="nav_link"><a href="#about">About</a></li>
                    <li className="nav_link"><a href="#projects">Projects</a></li>
                    <li className="nav_link"><a href="#contact">Contact</a></li>
                </ul>
                <div className='switch'>
                  <button onClick={handleToggleClick}>
                    {!darkMode ? <Sun style={{color: '#FFF'}} /> : <Moon /> }
                  </button>
                </div>
            </nav>
        </div>
        
    </header>
  )
}

export default Header