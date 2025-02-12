import React from 'react'
import './SearchBar.css'

const SearchBar = ({onChange, inputValue}) => {
  return (
      <input type="text" placeholder="What do you want to play?" onChange={onChange} value={inputValue}  />
  )
}

export default SearchBar