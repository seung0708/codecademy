import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSubreddits } from '../store/subredditsSlice'
import '../styles/Subreddit.css'

const Subreddit = () => {
  

  return (
    <div className='subreddits'>
      <h2>Subreddits</h2>
      {/* {subreddits.map(subreddit => (
        <a href='#' className='subreddit-link'>
          <img src='/assets/icons8-reddit.svg' alt={subreddit} />
          <p>{subreddit}</p>
        </a>
      ))} */}
    </div>
  )
}

export default Subreddit