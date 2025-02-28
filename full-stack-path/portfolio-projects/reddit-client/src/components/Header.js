import React from 'react'
import Search from './Search'

const Header = () => {
  return (
    <header>
        <div>
            <img src='/assets/icons8-reddit.svg' alt="logo" />
        </div>
        <Search />
    </header>
  )
}

export default Header