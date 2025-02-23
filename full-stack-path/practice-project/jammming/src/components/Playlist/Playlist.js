import './Playlist.css';
import TrackList from '../TrackList/Tracklist'


const Playlist = ({playlist, saveToLibrary, addPlaylistName, removePlaylist}) => {
  
  return (
    <>
      <div className='playlist'>
        <input type='text' placeholder='Playlist Name' value={playlist.name} onChange={addPlaylistName}/>
        <TrackList isPlaylist={true} tracks={playlist.tracks} removePlaylist={removePlaylist} />
        <div style={{textAlign: 'center', marginTop: '20px'}}>
          <button className='playlist-button' type='button' onClick={saveToLibrary} disabled={!playlist.title}>Save</button>
        </div>
      </div>
      
    </>
  )
}

export default Playlist