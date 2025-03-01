import React from 'react'
import Post from './Post'
import '../styles/PostsContainer.css';

const PostsContainer = ({subreddits}) => {
    //console.log(subreddits)
    return (
        <>
        {subreddits.map((subreddit) => 
            <div key={subreddit.id} className='posts-container'>
                <Post subreddit={subreddit}  />
            </div>
        )}
        </>
    )
}

export default PostsContainer