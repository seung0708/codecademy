import React from 'react'
import './SearchResults.css'
import TrackList from '../TrackList/Tracklist'

const SearchResults = ({ addToPlaylist, tracks}) => {
  return (
    <div className='search-results'>
      <TrackList tracks={tracks} addToPlaylist={addToPlaylist} />
    </div>
  )
}

export default SearchResults;