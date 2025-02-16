import React from 'react'
import './SearchResults.css'
import TrackList from '../TrackList/Tracklist'

const SearchResults = ({searchResults}) => {
  return (
    <div className='search-results'>
      
      {searchResults.map(song => (
         <TrackList song={song} />
        ))}
    </div>
  )
}

export default SearchResults;