import React from 'react';
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import {Outlet} from 'react-router-dom'
import './App.css'


const App = () => {
  return (
      <div className='app'>
        <Header />
        <main> 
          <Hero />
          <Outlet />
        </main>
        {/* <Footer /> */}
      </div>
  )
}

export default App