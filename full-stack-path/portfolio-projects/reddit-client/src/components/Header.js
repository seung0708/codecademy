import React, {useState} from 'react'
import Search from './Search'
import '../styles/Header.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchResults} from '../store/subredditsSlice.js';

const Header = () => {
  const [query, setQuery] = useState();
  const {list} = useSelector((state) => state.subredditData);
  const dispatch = useDispatch();
  
  const handleSearch = () => {
    dispatch(fetchSearchResults(query))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch()
  }

  return (
    <header>
        <div>
            <img src='/assets/icons8-reddit.svg' alt="logo" />
        </div>
        <Search query={query} setQuery={setQuery} handleSubmit={handleSubmit} />
        <div></div>
    </header>
  )
}

export default Header