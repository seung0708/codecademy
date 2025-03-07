import React from 'react';
import './App.css'
import Header from './components/Header.js';
import Home from './pages/Home/Home.js';

function App() {
  return (
    <>
      <Header />
      <main>
        <Home />
      </main>
    </>
  );
}

export default App;
