import React from 'react';
import '../styles/App.css'
import Header from './Header';
import PostsContainer from './PostsContainer';

import {posts} from '../mock-data.js';

function App() {
  const subreddits = posts.map(post => post.subreddit)
  console.log(subreddits)
  return (
    <>
      <Header />
      <main>
        <PostsContainer posts={posts} />
      </main>
    </>
  );
}

export default App;
