import React from 'react';
import Ellipsis from '../../views/Ellipsis'
import './Sidebar.css'

export default function Sidebar({ openOptionsId, library, updatePlaylistName, handlePlaylistOptionClick, handleEditClick}) {
  return (
    <aside className="sidebar">
      <div className='sidebar-heading'>
        <div className="sidebar-heading_intro">
          <h2>Library</h2>
        </div>
      </div>
      {library?.map((playlist, index) => (
        <div key={playlist.id} className='library'>
          <input type='text' value={playlist.name} onChange={e => updatePlaylistName(e, index)} />
          <button onClick={() => handlePlaylistOptionClick(playlist.id)}>
            <Ellipsis />
          </button>
          {openOptionsId === playlist.id && (
            <div className='options'>
              <button onClick={() => handleEditClick(playlist.id)}>Edit</button>
            </div>
          )}
        </div>
      ))}
    </aside>
  )
}