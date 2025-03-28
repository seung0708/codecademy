import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import Search from './Search.js'
import '../styles/Header.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchResults } from '../redux/searchSlice';

const Header = () => {
  const [query, setQuery] = useState();
  const {loading, error} = useSelector((state) => state.searchData);
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
            <Link to="/">
                <img src='/assets/icons8-reddit.svg' alt="logo" />
            </Link>
        </div>
        <Search query={query} setQuery={setQuery} handleSubmit={handleSubmit} loading={loading} error={error} />
        <div></div>
    </header>
  )
}

export default Header