import React from 'react';
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import {Outlet} from 'react-router-dom'
import './App.css'
import { ThemeProvider } from './contexts/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <div className='app'>
        <Header />
        <main> 
          <Hero />
          <Outlet />
        </main>
        {/* <Footer /> */}
      </div>
    </ThemeProvider>
  )
}

export default App