import React from 'react'

const SearchBar = ({onChange, inputValue}) => {
  return (
      <input type="text" placeholder="What do you want to play?" onChange={onChange} value={inputValue}  />
  )
}

export default SearchBar