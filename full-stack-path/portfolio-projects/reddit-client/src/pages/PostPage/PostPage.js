import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchComments } from '../../features/comments/redux/commentsSlice'

const PostPage = () => {
    const { subreddit, id, title } = useParams();
    console.log(title)
    const dispatch = useDispatch();
    const { comments, loading, error } = useSelector((state) => state.commentsData);
    const {post, commentsData} = comments;
    console.log(commentsData)
    console.log(post)
    useEffect(() => {
        dispatch(fetchComments(subreddit, id, title));
    }, [subreddit, id, title, dispatch]);

    if (loading) {
        return <div className="loader"></div>;
    }

    if (error) {
        return <div>Error loading comments</div>;
    }

    return (
        <div className="post-page">
            <h1>Comments</h1>
           
        </div>
    )
}

export default PostPage