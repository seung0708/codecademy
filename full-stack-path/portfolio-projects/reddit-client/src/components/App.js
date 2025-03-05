import React from 'react';
import '../styles/App.css'
import Header from './Header';
import PostsContainer from './PostsContainer';
import Subreddit from './Subreddit.js';

function App() {
  return (
    <>
      <Header />
      <main>
        
        <div className="home-container">
        <aside></aside>
        <PostsContainer />
        <aside className='categories-subreddits'>
          <Subreddit />
        </aside>
        </div>
      </main>
    </>
  );
}

export default App;
