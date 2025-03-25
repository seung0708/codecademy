import React, {useState} from 'react';
import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom';
import Header from './components/Header'
import Main from './components/Main';
import Footer from './components/Footer';

const App = () => {
  const [darkMode, setDarkMode] = useState(true)
  return (
    <>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Main darkMode={darkMode} />
      <Footer />
    </>
  )
}

export default App