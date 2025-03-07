import React from 'react';
import './App.css'
import Header from './features/search/components/Header.js';
import Home from './pages/Home/Home.js';
import { useSelector } from 'react-redux';

function App() {
  const {searchResults, loading, error} = useSelector((state) => state.searchData);
  console.log(searchResults);
  return (
    <>
      <Header />
      <main>
        <Home searchResults={searchResults} loading={loading} error={error} />
      </main>
    </>
  );
}

export default App;
