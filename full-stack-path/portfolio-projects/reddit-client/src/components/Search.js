import React from 'react';
import '../styles/Search.css';

const Search = ({query, setQuery, handleSubmit}) => {
  return (
    <form role="search" onSubmit={handleSubmit}>
        <img src="/assets/icons8-magnifying-glass.svg" alt="magnifying icon" className='icon' />
        <input type="text" placeholder='Search Reddit' value={query} onChange={e => setQuery(e.target.value)} />
        <button type='submit'></button>
    </form>
  )
}

export default Search