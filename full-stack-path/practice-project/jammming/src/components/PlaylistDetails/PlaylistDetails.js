import './PlaylistDetails.css';
import TrackList from '../TrackList/Tracklist'
import Loader from '../../views/Loader';

const PlaylistDetails = ({playlist, loading, saveToLibrary, addPlaylistName, removePlaylist}) => {
  if (!playlist) return null;
  console.log(playlist)
  return (
    <>
      {loading && <Loader />}
      <div className='playlist'>
        <input type='text' placeholder='Playlist Name' value={playlist.name} onChange={addPlaylistName}/>
        <TrackList 
          isPlaylistDetails={true} 
          tracks={playlist.tracks} 
          removePlaylist={removePlaylist} 
        />
        <div style={{textAlign: 'center', marginTop: '20px'}}>
          <button 
            className='playlist-button' 
            type='button' 
            onClick={saveToLibrary} 
            disabled={!playlist.name}
          >
            Save
          </button>
        </div>
      </div>
    </>
  )
}

export default PlaylistDetails;