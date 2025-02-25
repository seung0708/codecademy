import React from 'react'
import './SearchResults.css'
import TrackList from '../TrackList/Tracklist'
import Loader from '../../views/Loader'

const SearchResults = ({ loading, loadingMessage, addToPlaylist, tracks}) => {
  return (
    <div className='search-results'>
      {loading && <Loader message={loadingMessage} />}
      <TrackList tracks={tracks} addToPlaylist={addToPlaylist} />
    </div>
  )
}

export default SearchResults;