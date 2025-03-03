import React from 'react';
import '../styles/Post.css';
import VideoPlayer from './VideoPlayer';

const Post = ({subreddit}) => {
    const {preview, media, is_video, title, header_img, description} = subreddit
    return (
        <div className='post'>
            <h2>{title}</h2>
            {!is_video ? (
                !header_img ? (
                    <p>{description && `${description.substring(0, 200)}...`}</p>
                    ) : (
                    header_img ? (
                        <img src={header_img} className='post-img' alt={title} />
                    ) : (
                        <img src={preview.images[0].source.url} className='post-img' alt={title} />
                    )
                    
                    )
            ) : (
                !media ? (
                    <img src={preview && preview.images[0].source.url} alt={title} />
                ) : (
                    <VideoPlayer mpdUrl={media.reddit_video.dash_url} />
                )
            )}

        </div>
    )
}

export default Post