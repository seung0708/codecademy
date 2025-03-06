import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSubreddits } from '../store/subredditsSlice';
import Post from './Post'
import '../styles/PostsContainer.css';

const PostsContainer = () => {
    const {list, loading, error} = useSelector((state) => state.subredditData);
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchingSubreddits = () => {
            dispatch({type: 'subreddits/loading'})
            dispatch(getSubreddits())
        }
        fetchingSubreddits();
    },[dispatch])

    if (error) {
        return <div data-testid="error-message">Something went wrong</div>
    }

    return (
        <div>
            {loading && <div data-testid="loader" className='loader'></div>}
            {list.map((list) => (
                <div key={list.id} className='posts-container'>           
                    <Post subreddit={list} />
                </div>
            ))}
        </div>
    )
}

export default PostsContainer