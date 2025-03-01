import React from 'react'
import '../styles/Subreddit.css'

const Subreddit = ({subreddits}) => {
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