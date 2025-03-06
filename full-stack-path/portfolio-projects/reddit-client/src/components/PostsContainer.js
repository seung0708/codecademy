import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../features/posts/postsSlice';
import Post from './Post'
import '../styles/PostsContainer.css';

const PostsContainer = () => {
    const {posts, loading, error} = useSelector((state) => state.postsData);
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchingPosts = () => {
            dispatch({type: 'posts/loading'})
            dispatch(fetchPosts())
        }
        fetchingPosts();
    },[dispatch])

    if (error) {
        return <div data-testid="error-message">Something went wrong</div>
    }

    return (
        <div>
            {loading && <div data-testid="loader" className='loader'></div>}
            {posts.map((post) => (
                <div key={post.id} className='posts-container'>           
                    <Post post={post} />
                </div>
            ))}
        </div>
    )
}

export default PostsContainer