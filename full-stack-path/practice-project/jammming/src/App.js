import {useState, useEffect} from 'react'
import './App.css';
import SearchBar from './components/SearchBar/SearchBar'
import SearchResults from './components/SearchResults/SearchResults';
import { trackList } from './sample-data';
import Sidebar from './components/Sidebar/Sidebar';
import Playlist from './components/Playlist/Playlist';


function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([]); 
  const [isOpen, setIsOpen] = useState(false);
  const [playlist, setPlaylist] = useState({title: '', tracks: []})
  const [library, setLibrary] = useState([]);

  useEffect(() => {

    if (!searchQuery || searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    if (playlist.tracks.length > 0) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }

    const filteredList = trackList.filter(track => (
        track.artist.toLowerCase().includes(searchQuery) || 
        track.album.toLowerCase().includes(searchQuery) || 
        track.name.toLowerCase().includes(searchQuery)
    ));

    setSearchResults(filteredList)
  }, [searchQuery, playlist.tracks.length])

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
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
      <header> 
        <SearchBar onChange={handleSearch} query={searchQuery} />
      </header>
      <main >
        <Sidebar library={library} updatePlaylistName={updatePlayListTitle} />
        <SearchResults searchResults={searchResults} addToPlaylist={handleAddTrackToPlaylist} />
        {isOpen && <Playlist playlist={playlist} saveToLibrary={handleSaveToLibrary} addPlaylistName={handleChangePlaylistTitle} removePlaylist={removePlaylist} /> }
      </main>
      
    </div>
  );
}

export default App;
