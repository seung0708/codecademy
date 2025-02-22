import React from 'react'
import './SearchResults.css'
import TrackList from '../TrackList/Tracklist'

const SearchResults = ({searchResults, addToPlaylist}) => {
  console.log(searchResults)
  return (
    <div className='search-results'>
      <TrackList tracks={searchResults} addToPlaylist={addToPlaylist} />
    </div>
  )
}

export default SearchResults;