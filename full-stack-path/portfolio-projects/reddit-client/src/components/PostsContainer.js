import React from 'react'
import Post from './Post'
import '../styles/PostsContainer.css';

const PostsContainer = ({posts}) => {
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