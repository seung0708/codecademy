import React from 'react'

const SearchResults = ({searchResults}) => {
  return (
    <div>
      {searchResults.map(song => (
          <>
            <p>{song.name}</p>
            <p>{song.artist}</p>
            <p>{song.album}</p>
          </>
        ))}
    </div>
  )
}

export default SearchResults;