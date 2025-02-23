import React from 'react'
import './Tracklist.css'
import Track from '../Track/Track';

const Tracklist = ({addToPlaylist, removePlaylist, isPlaylist, tracks}) => {
  return (
    <div className='tracklist'>
      {tracks?.map(track => {
         if (track.available_markets.includes("US")) {
         return <Track key={track.id} isPlaylist={isPlaylist} track={track} addToPlaylist={addToPlaylist} removePlaylist={removePlaylist} />
        }
      })}
    </div>
  )
}

export default Tracklist