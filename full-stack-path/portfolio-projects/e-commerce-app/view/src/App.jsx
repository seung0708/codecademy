import './App.css'
import Home from './pages/Home'
import Products from './pages/Products'
import Register from './pages/Register'
import Login from './pages/Login'
import {Routes, Route } from 'react-router-dom'

function App() {

  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
      
  )
}

export default App
