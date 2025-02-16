import React from 'react'
import './SearchBar.css'

const SearchBar = ({onChange, query}) => {
  return (
      <input type="text" placeholder="What do you want to play?" onChange={onChange} value={query}  />
  )
}

export default SearchBar