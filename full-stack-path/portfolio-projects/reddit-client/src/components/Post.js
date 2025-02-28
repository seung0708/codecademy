import React from 'react';
import '../styles/Post.css';

const Post = ({post}) => {
    return (
        <div className='post'>
            <h2>{post.title}</h2>
            <img src={post.img} className='post-img' alt={post.title} />
        </div>
    )
}

export default Post