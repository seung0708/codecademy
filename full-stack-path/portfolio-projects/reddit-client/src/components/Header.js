import React from 'react'
import Search from './Search'
import '../styles/Header.css';

const Header = ({query, setQuery, handleSubmit}) => {
  return (
    <header>
        <div>
            <img src='/assets/icons8-reddit.svg' alt="logo" />
        </div>
        <Search query={query} setQuery={setQuery} handleSubmit={handleSubmit} />
        <div></div>
    </header>
  )
}

export default Header