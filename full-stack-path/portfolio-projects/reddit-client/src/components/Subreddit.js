import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSubredditsByCategory } from '../store/subredditsSlice'
import '../styles/Subreddit.css'

const Subreddit = () => {
  const {categories} = useSelector(state => state.subredditData)
  const dispatch = useDispatch()

  return (
    <div className='subreddits'>
      <h2>Subreddits</h2>
      {categories.map(category => (
        <button onClick={() => dispatch(fetchSubredditsByCategory(category))} style={{display: 'block', marginBottom: '20px'}}>{category}</button>
      ))}
    </div>
  )
}

export default Subreddit