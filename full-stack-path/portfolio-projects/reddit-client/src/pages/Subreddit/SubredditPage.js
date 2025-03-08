import React, {useEffect} from 'react'
import './Subreddit.css'
import { useSelector, useDispatch } from 'react-redux';
import { fetchSubreddit, fetchSubredditPosts } from '../../features/subreddits/redux/subredditsSlice';
import { useParams } from 'react-router-dom';

import VideoPlayer from '../../components/VideoPlayer';

const SubredditPage = () => {
  const {subreddit} = useParams();
  const dispatch = useDispatch();
  const {subredditData, subredditPosts, loading, error} = useSelector((state) => state.subredditData);
  
  useEffect(() => {
    dispatch(fetchSubreddit(subreddit));
    dispatch(fetchSubredditPosts(subreddit));
  }, [subreddit, dispatch]);

  if (loading) {
    return <div className="loader"></div>;
  }

  if (error) {
    return <div>Error loading subreddit</div>;
  }

  return (
    <div className="subreddit-container">
      <div className="subreddit-header">
        <img src={subredditData.banner_background_image?.replace(/&amp;/g, '&')} alt='banner' style={{width: '1055px', height: '130px'}} />
        <div className="subreddit-header-info">
          <img src={subredditData.icon_img?.replace(/&amp;/g, '&') || `${process.env.PUBLIC_URL}/assets/icons8-reddit.svg`} alt='icon' />
          <h2>{subredditData.display_name_prefixed}</h2>
        </div>
      </div>
      <div className="subreddit-posts">
        {subredditPosts.map((post) => (
          <div className="subreddit-post">
            <h2>{post.author}</h2>
            {post.is_video ? (
                    <VideoPlayer mpdUrl={post.media?.reddit_video?.dash_url} />
                ) : (
                    post.preview ? (
                        <img className='post-img' src={post.preview?.images?.[0].source.url.replace(/&amp;/g, '&')} alt={post.title} />
                    ) : (
                        <p>{post.selftext.length > 1000 ? post.selftext.substring(0, 1000) + '...' : post.selftext}</p>
                    )
                )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SubredditPage