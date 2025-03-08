import React from 'react';
import './App.css'
import Header from './features/search/components/Header.js';
import Home from './pages/Home/Home.js';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import SubredditPage from './pages/Subreddit/SubredditPage.js';

function App() {
  const {searchResults, loading, error} = useSelector((state) => state.searchData);
  return (
    <>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<Home searchResults={searchResults} loading={loading} error={error} />} />
        <Route path="/r/:subreddit" element={<SubredditPage />} />
      </Routes>
    </main>
    </>
  );
}

export default App;
