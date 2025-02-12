import {useState} from 'react'
import './App.css';
import SearchBar from './components/SearchBar/SearchBar'
import SearchResults from './components/SearchResults';

const trackList = [
  {
    id: 1, 
    name: 'Whiplash',
    artist: 'aespa',
    album: 'Whiplash - The 5th Mini Album'
  },
  {
    id: 2, 
    name: 'Kill It',
    artist: 'aespa',
    album: 'Whiplash - The 5th Mini Album'
  },
  {
    id: 3, 
    name: 'Flights, Not Feelings',
    artist: 'aespa',
    album: 'Whiplash - The 5th Mini Album'
  }, 
  {
    id: 4, 
    name: 'Pink Hoodie',
    artist: 'aespa',
    album: 'Whiplash - The 5th Mini Album'
  },
  {
    id: 5, 
    name: 'Flowers',
    artist: 'aespa',
    album: 'Whiplash - The 5th Mini Album'
  }, 
  {
    id: 6, 
    name: 'Just Another Girl',
    artist: 'aespa',
    album: 'Whiplash - The 5th Mini Album'
  }, 
  {
    id: 7, 
    name: 'Supernova',
    artist: 'aespa',
    album: 'Armageddon - The 1st Album'
  },
  {
    id: 8, 
    name: 'Armageddon',
    artist: 'aespa',
    album: 'Armageddon - The 1st Album'
  },
  {
    id: 9, 
    name: 'Set The Tone',
    artist: 'aespa',
    album: 'Armageddon - The 1st Album'
  }, 

  {
    id: 10, 
    name: 'Mine',
    artist: 'aespa',
    album: 'Armageddon - The 1st Album'
  },
  {
    id: 11, 
    name: 'Licorice',
    artist: 'aespa',
    album: 'Armageddon - The 1st Album'
  },
  {
    id: 12, 
    name: 'BAHAMA',
    artist: 'aespa',
    album: 'Armageddon - The 1st Album'
  }, 
  {
    id: 13, 
    name: 'Long Chat',
    artist: 'aespa',
    album: 'Armageddon - The 1st Album'
  },
  {
    id: 13, 
    name: 'Prologue',
    artist: 'aespa',
    album: 'Armageddon - The 1st Album'
  },

  {
    id: 14, 
    name: 'Live My Life',
    artist: 'aespa',
    album: 'Armageddon - The 1st Album'
  },
  {
    id: 15, 
    name: 'Melody',
    artist: 'aespa',
    album: 'Armageddon - The 1st Album'
  }
]

function App() {
  const [searchInput, setSearchInput] = useState('')
  const [searchResults, setSearchResults] = useState([]); 

  const handleSearch = (e) => {
    setSearchInput(e.target.value)

    const filteredList = trackList.filter(track => track.name.toLowerCase().includes(searchInput) || track.album.toLowerCase().includes(searchInput) || track.name.toLowerCase().includes(searchInput))

    setSearchResults(filteredList)

  }

  return (
    <div className="App">
      <header> 
        <SearchBar onChange={handleSearch} inputValue={searchInput} />
      </header>
      <main>
        {searchInput && <SearchResults searchResults={searchResults} />}
      </main>
      
    </div>
  );
}

export default App;
