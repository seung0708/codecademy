import { fetchSubredditFromAPI, fetchSubredditPostsFromAPI } from '../../../api/reddit';
const initialState = {
    subredditData: {},
    subredditPosts: [],
    categories: ['hot', 'new', 'rising', 'controversial', 'top'], 
    loading: false,
    error: false
}

export default function subredditsReducer(state = initialState, action) {
    switch(action.type) {
        case 'subreddits/loading': {
            return {
                ...state,
                loading: true
            }
        }
        case 'subreddits/error': 
            return {
                ...state,
                loading: false, 
                error: true
            }
        case 'subreddit/subredditLoaded':
            return {
                ...state, 
                loading: false, 
                subredditData: action.payload
            }
        case 'subreddits/subredditsLoaded':
            return {
                ...state, 
                loading: false, 
                subredditPosts: action.payload
            }
        default: 
            return state;
    }
}

export const fetchSubreddit = (subreddit) => async (dispatch) => {
    try {
        dispatch({ type: 'subreddits/loading' });
        const { data } = await fetchSubredditFromAPI(subreddit);
        dispatch({ type: 'subreddit/subredditLoaded', payload: data });
    } catch (error) {
        dispatch({ type: 'subreddits/error' });
    }
};

export const fetchSubredditPosts = (subreddit) => async (dispatch) => {
    try {
        dispatch({ type: 'subreddits/loading' });
        const { data } = await fetchSubredditPostsFromAPI(subreddit);
        const { children } = data;
        const subredditPosts = children.map(child => child.data);
        dispatch({ type: 'subreddits/subredditsLoaded', payload: subredditPosts });
    } catch (error) {
        dispatch({ type: 'subreddits/error' });
    }
};

