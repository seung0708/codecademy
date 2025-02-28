import React from 'react'
import Search from './Search'
import '../styles/Header.css';

const Header = () => {
  return (
    <header>
        <div>
            <img src='/assets/icons8-reddit.svg' alt="logo" />
        </div>
        <Search />
        <div></div>
    </header>
  )
}

export default Header