import React, {useState} from 'react'
import SearchBar from '../SearchBar/SearchBar';
import './Header.css'

const Header = ({logout, handleSearch, query, login, user}) => {
  const [isOpen, setIsOpen] = useState(false)


  return (
    <header> 
        <img src="/icons8-spotify.svg" />
        <SearchBar handleSearch={handleSearch} query={query} />
        <div className='user-actions'>
        {user ? (
          <>
          <h2>{user.error ? '' : `Welcome, ${user?.display_name}`} </h2>
          <button onClick={() => setIsOpen(true)}>
            <img src={user?.images?.[1].url} style={{borderRadius: '50%'}} alt='profile image'/>
          </button>
          {isOpen && (
            <div className='logout-modal'>
              <button onClick={logout}>
                Logout
              </button>
            </div>
          )}
          </>
        ):(
          <button className='login-button' type="button" onClick={login}>
            Log in
          </button>
        )}
        </div>

    </header>
  )
}

export default Header