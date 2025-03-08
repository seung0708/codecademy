import React from 'react';
import '../styles/Post.css';
import VideoPlayer from '../../../components/VideoPlayer';
import { Link } from 'react-router-dom';

const Post = ({post}) => {
    const {preview, media, is_video, title, selftext, subreddit_name_prefixed} = post
    console.log(post)
    console.log(title)
    return (
        <div className='post'>
            <Link className='post-link' to={`${subreddit_name_prefixed}/comments/${post.id}`}>
                <Link to={subreddit_name_prefixed} className='subreddit-link'>
                    <span>{subreddit_name_prefixed}</span>
                </Link>
                <h2>{title}</h2>  
                {is_video ? (
                    <VideoPlayer mpdUrl={media?.reddit_video?.dash_url} />
                ) : (
                    preview ? (
                        <img className='post-img' src={preview?.images?.[0].source.url.replace(/&amp;/g, '&')} alt={title} />
                    ) : (
                        <p>{selftext.length > 1000 ? selftext.substring(0, 1000) + '...' : selftext}</p>
                    )
                )}
            </Link>
        </div>
    )
}

export default Post