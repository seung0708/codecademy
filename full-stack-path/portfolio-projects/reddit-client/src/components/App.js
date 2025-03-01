import React from 'react';
import '../styles/App.css'
import Header from './Header';
import PostsContainer from './PostsContainer';
import Subreddit from './Subreddit.js';
import {posts} from '../mock-data.js';



function App() {
  return (
    <>
      <Header />
      <main>
        <PostsContainer />
        <aside>
          <Subreddit />
        </aside>
      </main>
    </>
  );
}

export default App;
