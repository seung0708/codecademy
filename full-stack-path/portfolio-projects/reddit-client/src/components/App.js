import React, {useEffect, useState} from 'react';
import '../styles/App.css'
import Header from './Header';
import PostsContainer from './PostsContainer';
import Subreddit from './Subreddit.js';
import {posts} from '../mock-data.js';
import {useDispatch, useSelector } from 'react-redux';
import {getSubreddits} from '../store/subredditsSlice.js';

function App() {
  const subreddits = useSelector((state) => state.subreddits);
  const dispatch = useDispatch();

  useEffect(() => {
   dispatch(getSubreddits)
  },[dispatch])

  return (
    <>
      <Header />
      <main>
        <PostsContainer subreddits={subreddits} />
        <Subreddit subreddits={subreddits} />
      </main>
    </>
  );
}

export default App;
