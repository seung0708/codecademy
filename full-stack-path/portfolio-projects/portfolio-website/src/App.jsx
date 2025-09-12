import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Footer from './components/Footer/Footer'
import {Outlet, useLocation} from 'react-router-dom'
import './App.css'


const App = () => {
  const { pathname } = useLocation();
  return (
      <div className='app'>
        <Header />
        <main> 
          {pathname === '/' && <Hero />}
          <Outlet />
        </main>
         {pathname === '/' && <Footer />}
      </div>
  )
}

export default App