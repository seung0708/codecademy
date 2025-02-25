import './Playlist.css';
import TrackList from '../TrackList/Tracklist'
import Loader from '../../views/Loader';

const Playlist = ({playlist, saveToLibrary, addPlaylistName, removePlaylist, loading}) => {
  
  return (
    <>
      {loading && <Loader />}
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