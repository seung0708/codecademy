import './App.css';

import {useState, useEffect, useRef} from 'react'
import { loginWithSpotifyClick, refreshTokenClick } from './api/authorizationAPI'
import { fetchResultsData, createPlaylist, addTrackToPlaylist, fetchPlaylistsData, fetchPlaylistData, fetchPlaylistItems, removeTrackFromPlaylist} from './api/spotifyAPI';
import { getUserData, logoutClick } from './api/authorizationAPI';

import SearchResults from './components/SearchResults/SearchResults';
import Sidebar from './components/Sidebar/Sidebar';
import Playlist from './components/Playlist/Playlist';
import Header from './components/Header/Header';
import PlaylistDetails from './components/PlaylistDetails/PlaylistDetails';

function App() {
  const now = new Date();
  const [user, setUser] = useState({});
  const [loadingStates, setLoadingStates] = useState({
    search: false,
    playlist: false,
    auth: false
  });
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([]); 
  const [isOpen, setIsOpen] = useState(false);
  const [playlist, setPlaylist] = useState({title: '', tracks: []})
  const [library, setLibrary] = useState([]);
  const [token, setToken] = useState('')
  const [selectedPlaylistData, setSelectedPlaylistData] = useState(null);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [openOptionsId, setOpenOptionsId] = useState(null);
  const timeoutId = useRef(null)

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    let expiration = new Date(localStorage.getItem('expires'));
    let now = new Date();
    let difference = expiration - now - 300000;

    const fetchAuthAndUserData = async () => {
      setLoadingStates((prev) => ({
        ...prev,
        auth: true
      }))
      if (difference < 0) {
        try {
          await refreshTokenClick()
          const refreshToken = localStorage.getItem('refresh_token');
          if (refreshToken) {
            expiration = new Date(localStorage.getItem('expires'));
            now = new Date();
            difference = expiration - now - 300000;
          } else {
            logout();
          }
        } catch (error) {
          console.error('Token refresh failed:', error);
          logout();
          return; 
        } finally {
          setLoadingStates((prev) => ({
            ...prev,
            auth: false
          }))
        }
      }
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

  const logout = () => {
    logoutClick();
    setUser(null)
  }


  useEffect(() => {
    if(timeoutId.current) {
      clearTimeout(timeoutId)
    }
    if (!searchQuery || !searchQuery.trim()) {
      setSearchResults([])
      return; 
    } else {
      setLoadingStates((prev) => ({
        ...prev,
        search: true
      }))
      timeoutId.current = setTimeout(async () => {
        try {
          const results = await fetchResultsData(token, searchQuery);
          setSearchResults(results)
        } catch (error) {
          console.error(error)
        } finally {
          setLoadingStates((prev) => ({
            ...prev,
            search: false
          }))
        }
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

  const removePlaylist = async (trackId, trackUri) => {
    await removeTrackFromPlaylist(token, selectedPlaylistId, trackUri)
    setPlaylist(prev => {
      return {
        ...prev, 
        tracks: prev.tracks.filter((track => track.id !== trackId))
      }
    })
  }

  const handlePlaylistOptionClick = (playlistId) => {
    setOpenOptionsId(playlistId === openOptionsId ? null : playlistId);
  };


  const handleEditClick = async (playlistId) => {
    if (playlistId === selectedPlaylistId) {
      setSelectedPlaylistId(null);
      setSelectedPlaylistData(null);
    } else {
      setSelectedPlaylistId(playlistId);
      setOpenOptionsId(null);
      setLoadingStates(prev => ({...prev, playlistDetails: true}));
      try {
        const {name} = await fetchPlaylistData(token, playlistId);
        const items = await fetchPlaylistItems(token, playlistId);
        setPlaylist(prev => ({
          ...prev, 
          name: name,
          tracks: items.map(item => item.track),
        }))
      } catch (error) {
        console.error('Error fetching playlist data:', error);
      } finally {
        setLoadingStates(prev => ({...prev, playlistDetails: false}));
      }
    }
  };

  return (
    <div className="App">
      <Header logout={logout} user={user} handleSearch={handleSearch} query={searchQuery} login={loginWithSpotifyClick} />
      <main >
      <Sidebar 
        handlePlaylistOptionClick={handlePlaylistOptionClick}
        handleEditClick={handleEditClick}
        openOptionsId={openOptionsId}
        library={library} 
        updatePlaylistName={updatePlayListTitle} 
      />
        <SearchResults loading={loadingStates.search} loadingMessage={'Searching tracks...'} addToPlaylist={handleSetPlaylist} tracks={searchResults} />
        {isOpen && !selectedPlaylistId && <Playlist loading={loadingStates.playlist} loadingMessage={'Saving...'} playlist={playlist} saveToLibrary={handleSaveToLibrary} addPlaylistName={handleChangePlaylistTitle} removePlaylist={removePlaylist} /> }
        {selectedPlaylistId && 
          <PlaylistDetails 
          playlist={playlist} 
          loading={loadingStates.playlistDetails} 
          saveToLibrary={handleSaveToLibrary} 
          addPlaylistName={handleChangePlaylistTitle} 
          removePlaylist={removePlaylist} 
          />
        }
      </main>
      
    </div>
  );
}

export default App;
