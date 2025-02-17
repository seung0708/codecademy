import React from 'react'
import SearchBar from '../SearchBar/SearchBar';
import './Header.css'

const Header = ({onChange, query, login}) => {
  return (
    <header> 
        <img src="../../../public/icons8-spotify.svg" />
        <SearchBar onChange={onChange} query={query} />
        <button className='login-button' type="button" onClick={login}>
            Log in
        </button>
    </header>
  )
}

export default Header