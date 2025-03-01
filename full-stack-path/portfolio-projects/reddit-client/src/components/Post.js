import React from 'react';
import '../styles/Post.css';

const Post = ({subreddit}) => {
    console.log(subreddit)
    const {title, header_img, description} = subreddit
    return (
        <div className='post'>
            <h2>{title}</h2>
            {!header_img ? (
                <p>`${description.substring(0, 200)}...`</p>
            ) : (<img src={header_img} className='post-img' alt={title} />)}
        </div>
    )
}

export default Post