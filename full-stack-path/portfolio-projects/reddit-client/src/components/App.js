import React, {useEffect, useState} from 'react';
import '../styles/App.css'
import Header from './Header';
import PostsContainer from './PostsContainer';
import Subreddit from './Subreddit.js';
import {posts} from '../mock-data.js';
import {useDispatch, useSelector } from 'react-redux';
import {getSubreddits, fetchSearchResults} from '../store/subredditsSlice.js';

function App() {
  const {list} = useSelector((state) => state.subredditData);
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
   dispatch(getSubreddits)
  },[dispatch])

  const handleSearch = () => {
    dispatch(fetchSearchResults(query))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch()
  }

  return (
    <>
      <Header query={query} setQuery={setQuery} handleSubmit={handleSubmit} />
      <main>
        <PostsContainer subreddits={list} />
        <Subreddit subreddits={list} />
      </main>
    </>
  );
}

export default App;
