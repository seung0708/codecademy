import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSubreddits } from '../store/subredditsSlice';
import Post from './Post'
import '../styles/PostsContainer.css';

const PostsContainer = () => {
    const {list} = useSelector((state) => state.subredditData);
    const dispatch = useDispatch();
    
  useEffect(() => {
    dispatch(getSubreddits)
   },[dispatch])

    return (
        <div>
        {list.map((list) => 
            <div key={list.id} className='posts-container'>
                <Post subreddit={list}  />
            </div>
        )}
        </div>
    )
}

export default PostsContainer