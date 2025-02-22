import {useState, useEffect} from 'react'
import './App.css';
import SearchResults from './components/SearchResults/SearchResults';
import { trackList } from './sample-data';
import Sidebar from './components/Sidebar/Sidebar';
import Playlist from './components/Playlist/Playlist';
import Header from './components/Header/Header';
import { loginWithSpotifyClick, refreshTokenClick } from './api/authorizationAPI'
import { searchTracks } from './api/spotifyAPI';
import { getUserData, logoutClick } from './api/authorizationAPI';

function App() {
  const now = new Date();
  const [user, setUser] = useState({});
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([]); 
  const [isOpen, setIsOpen] = useState(false);
  const [playlist, setPlaylist] = useState({title: '', tracks: []})
  const [library, setLibrary] = useState([]);
  const [token, setToken] = useState('')

  const fetchUserData = async () => {
    const userData = await getUserData()
    setUser(userData)
  }

  useEffect(() => {
    const now = new Date()
    const expiration = new Date(localStorage.getItem('expires'))
    const difference = expiration - now

    const timeoutId = setTimeout(refreshTokenClick, difference)

    return () => clearTimeout(timeoutId)

  },[])


  useEffect(() => {
    fetchUserData()    
    
  },[])
  

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')
    if(accessToken) {
      setToken(accessToken)
    }

    if (!searchQuery || searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    if (playlist.tracks.length > 0) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
    
  }, [searchQuery, playlist.tracks.length])

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value)
    const items = await searchTracks(token, searchQuery)
    
    console.log(items)
    setSearchResults([...items])
  }

  const handleAddTrackToPlaylist = (track) => {
    console.log(track)
    setPlaylist(prev => {
      return {
        ...prev, 
        tracks: [...prev.tracks, track]
      }
    })
  }


  const handleChangePlaylistTitle = (e) => {
    const newTitle = e.target.value
    setPlaylist(prev => ({
        ...prev, 
        title: newTitle, 
        tracks: prev.tracks
    }));
  }

  const handleSaveToLibrary = () => {    
    setLibrary(prev => [...prev, playlist])
    setPlaylist({title: '', tracks: []})
  }

  const updatePlayListTitle = (e, index) => {
    const newTitle = e.target.value; 
    setLibrary(prev => (
      prev.map((pl, i) => i === index ? {...pl, title: newTitle} : pl)
    ))
  }

  const removePlaylist = (id) => {
    setPlaylist(prev => {
      return {
        ...prev, 
        tracks: prev.tracks.filter((track => track.id !== id))
      }
    })
  }

  return (
    <div className="App">
      <Header logout={logoutClick} user={user} onChange={handleSearch} query={searchQuery} login={loginWithSpotifyClick} />
      <main >
        <Sidebar library={library} updatePlaylistName={updatePlayListTitle} />
        <SearchResults searchResults={searchResults} addToPlaylist={handleAddTrackToPlaylist} />
        {isOpen && <Playlist playlist={playlist} saveToLibrary={handleSaveToLibrary} addPlaylistName={handleChangePlaylistTitle} removePlaylist={removePlaylist} /> }
      </main>
      
    </div>
  );
}

export default App;
