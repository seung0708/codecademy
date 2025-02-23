import {useState, useEffect, useRef} from 'react'
import './App.css';
import SearchResults from './components/SearchResults/SearchResults';
import { trackList } from './sample-data';
import Sidebar from './components/Sidebar/Sidebar';
import Playlist from './components/Playlist/Playlist';
import Header from './components/Header/Header';
import { loginWithSpotifyClick, refreshTokenClick } from './api/authorizationAPI'
import { fetchResultsData, createPlaylist, addTrackToPlaylist, fetchPlaylistsData} from './api/spotifyAPI';
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
  const timeoutId = useRef(null)

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const expiration = new Date(localStorage.getItem('expires'));
    const now = new Date();
    const difference = expiration - now;

    const fetchAuthAndUserData = async () => {
        try {
            if (accessToken) {
                setToken(accessToken);
                const userData = await getUserData();
                if (userData?.id) {
                    setUser(userData);
                }
                const items = await fetchPlaylistsData(accessToken);
                setLibrary(items);
            }
        } catch (error) {
            console.error(error);
        }
    };

    fetchAuthAndUserData();
    
    // Set timeout to refresh token
    const timeoutId = setTimeout(refreshTokenClick, difference);

    return () => clearTimeout(timeoutId);
}, []);


  useEffect(() => {
    if(timeoutId.current) {
      clearTimeout(timeoutId)
    }
    if (!searchQuery || !searchQuery.trim()) {
      setSearchResults([])
      return; 
    } else {
      timeoutId.current = setTimeout(async () => {
        const results = await fetchResultsData(token, searchQuery);
        setSearchResults(results)
      }, 3000)  
    }
  }, [searchQuery])

  const handleSearch = async (query) => {
    setSearchQuery(query);
  }

  useEffect(() => {
    if (playlist.tracks.length > 0) {
      setIsOpen(true) 
    } else {
      setIsOpen(false)
    }
  }, [playlist.tracks])

   
  const handleSetPlaylist = async (track) => {
    setPlaylist(prev => {
      const updatedPlaylist =  {
        ...prev, 
        tracks: [...prev.tracks, track]
      }
      return updatedPlaylist
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

  const handleSaveToLibrary = async () => {    
    const createdPlaylist = await createPlaylist(user.id, token, playlist.title)
    await addTrackToPlaylist(token, createdPlaylist.id, playlist.tracks)
    setLibrary(prev => [createdPlaylist, ...prev])
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
      <Header logout={logoutClick} user={user} handleSearch={handleSearch} query={searchQuery} login={loginWithSpotifyClick} />
      <main >
        <Sidebar library={library} updatePlaylistName={updatePlayListTitle} />
        <SearchResults addToPlaylist={handleSetPlaylist} tracks={searchResults} />
        {isOpen && <Playlist playlist={playlist} saveToLibrary={handleSaveToLibrary} addPlaylistName={handleChangePlaylistTitle} removePlaylist={removePlaylist} /> }
      </main>
      
    </div>
  );
}

export default App;
