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

  useEffect(() => {

    if (!searchQuery || searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filteredList = trackList.filter(track => (
        track.artist.toLowerCase().includes(searchQuery) || 
        track.album.toLowerCase().includes(searchQuery) || 
        track.name.toLowerCase().includes(searchQuery)
    ));

    setSearchResults(filteredList)
  }, [searchQuery])

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleOpenPlaylist = () => {
    console.log(isOpen)
    if (isOpen) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }

  return (
    <div className="App">
      <header> 
        <SearchBar onChange={handleSearch} query={searchQuery} />
      </header>
      <main >
        <Sidebar open={handleOpenPlaylist}  />
        <SearchResults searchResults={searchResults} />
        {isOpen && <Playlist /> }
      </main>
      
    </div>
  );
}

export default App;
