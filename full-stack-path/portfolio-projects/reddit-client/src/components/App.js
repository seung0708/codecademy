import React from 'react';
import '../styles/App.css'
import Header from './Header';
import PostsContainer from './PostsContainer';
import Subreddit from './Subreddit.js';
import {posts} from '../mock-data.js';

export const subreddits = posts.map(post => post.subreddit)

function App() {
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
