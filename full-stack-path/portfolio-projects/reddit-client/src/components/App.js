import React, {useEffect, useState} from 'react';
import '../styles/App.css'
import Header from './Header';
import PostsContainer from './PostsContainer';
import Subreddit from './Subreddit.js';
import {posts} from '../mock-data.js';
import { getSubreddits } from '../apis/reddit.js';
export const subreddits = posts.map(post => post.subreddit)

function App() {

  useEffect(() => {
    const fetchPosts = async() => {
      const postsData = await getSubreddits();
    }
    fetchPosts()
  },[])

  return (
    <>
      <Header />
      <main>
        <PostsContainer posts={posts} />
        <Subreddit subreddits={subreddits} />
      </main>
    </>
  );
}

export default App;
