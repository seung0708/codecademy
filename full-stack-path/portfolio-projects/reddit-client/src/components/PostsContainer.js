import React from 'react'
import Post from './Post'
import '../styles/PostsContainer.css';
import {useDispatch} from 'react-redux';

const PostsContainer = ({posts}) => {
    const dispatch
    return (
        <>
        {posts.map((post, index) => 
            <div key={index} className='posts-container'>
                <Post post={post}  />
            </div>
        )}
        </>
    )
}

export default PostsContainer