import React from 'react';
import './Header.css';
import Navbar from '../Navbar/Navbar';




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
       <h1 className='logo'>My Portfolio</h1>
        <Navbar />
    </header>
  )
}

export default Header