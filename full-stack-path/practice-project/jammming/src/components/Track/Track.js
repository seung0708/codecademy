import React from 'react'
import './Track.css';

const Track = ({track, addToPlaylist, removePlaylist, isPlaylist}) => {
  const handleOnClick = () => {
    addToPlaylist(track)
  }
  const{ album, name } = track
  return (
    <>
    <div className='track'>
      <div className='track_details'>
      <p>{name}</p>
      <p>{album.name}</p>
      </div>
      {isPlaylist ? (
        <button onClick={() => removePlaylist(track.id)}> 
          <svg data-encore-id="icon" role="img" aria-hidden="true" className="Svg-sc-ytk21e-0 bmPLlI e-9541-icon" viewBox="0 0 16 16" height="24" fill="#B3B3B3"><path d="M5.25 3v-.917C5.25.933 6.183 0 7.333 0h1.334c1.15 0 2.083.933 2.083 2.083V3h4.75v1.5h-.972l-1.257 9.544A2.25 2.25 0 0 1 11.041 16H4.96a2.25 2.25 0 0 1-2.23-1.956L1.472 4.5H.5V3h4.75zm1.5-.917V3h2.5v-.917a.583.583 0 0 0-.583-.583H7.333a.583.583 0 0 0-.583.583zM2.986 4.5l1.23 9.348a.75.75 0 0 0 .744.652h6.08a.75.75 0 0 0 .744-.652L13.015 4.5H2.985z"></path></svg>
        </button>
        ) : (
        <button type="button" className="sidebar-button" onClick={handleOnClick}>
          <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" height="24" fill="#B3B3B3"><path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z"></path></svg>
        </button>
       )}
    </div>
    <hr />
    </>
  )
}

export default Track