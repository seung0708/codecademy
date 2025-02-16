import React from 'react'
import './Track.css';

const Track = ({song}) => {
  const {album, name} = song
  return (
    <>
    <div className='track'>
      <div className='track_details'>
      <p>{name}</p>
      <p>{album}</p>
      </div>
    
      <button type="button" className="sidebar-button">
          <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" height="24" fill="#B3B3B3"><path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z"></path></svg>
      </button>
    </div>
    <hr />
    </>
  )
}

export default Track