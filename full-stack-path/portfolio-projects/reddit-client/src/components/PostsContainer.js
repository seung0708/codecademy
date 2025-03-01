import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSubreddits } from '../store/subredditsSlice';
import Post from './Post'
import '../styles/PostsContainer.css';

const PostsContainer = () => {
    const {list} = useSelector((state) => state.subredditData);
    console.log(list)
    const dispatch = useDispatch();
    
  useEffect(() => {
    dispatch(getSubreddits)
   },[dispatch])

    return (
        <>
        {list.map((list) => 
            <div key={list.id} className='posts-container'>
                <Post subreddit={list}  />
            </div>
        )}
        </>
    )
}

export default PostsContainer