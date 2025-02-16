import React from 'react'
import './Tracklist.css'
import Track from '../Track/Track';

const Tracklist = ({song}) => {
  return (
    <div className='tracklist'>
      <Track song={song} />
    </div>
  )
}

export default Tracklist