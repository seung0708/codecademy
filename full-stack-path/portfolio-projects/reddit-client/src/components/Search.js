import React from 'react';
import '../styles/Search.css';

const Search = () => {
  return (
    <form role="search">
        <img src="/assets/icons8-magnifying-glass.svg" alt="magnifying icon" className='icon' />
        <input type="text" placeholder='Search Reddit' />
    </form>
  )
}

export default Search