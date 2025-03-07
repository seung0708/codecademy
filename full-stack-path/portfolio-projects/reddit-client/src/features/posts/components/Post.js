import React from 'react';
import '../styles/Post.css';
import VideoPlayer from '../../../components/VideoPlayer';

const Post = ({post}) => {
    const {preview, media, is_video, title, selftext} = post
    return (
        <div className='post'>
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

        </div>
    )
}

export default Post