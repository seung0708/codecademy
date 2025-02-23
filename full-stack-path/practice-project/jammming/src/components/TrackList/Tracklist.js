import React from 'react'
import './Tracklist.css'
import Track from '../Track/Track';

const Tracklist = ({addToPlaylist, removePlaylist, isPlaylist, tracks}) => {
  return (
    <div className='tracklist'>
      {tracks?.map(track => (
        <Track isPlaylist={isPlaylist} track={track} addToPlaylist={addToPlaylist} removePlaylist={removePlaylist} />
      ))}
    </div>
  )
}

export default Tracklist