import { fetchPostsFromAPI } from "../../api/reddit";

const initialState = {
    posts: [],
    loading: false,
    error: false
}

export default function postsReducer(state = initialState, action) {
    switch(action.type) {
        case 'posts/loading': 
            return {
                ...state,
                loading: true
            }
        case 'posts/error': 
            return {
                ...state,
                loading: false, 
                error: true
            }
        case 'posts/postsLoaded': 
            return {
                ...state, 
                loading: false, 
                posts: action.payload
            }
        default: 
            return state;
    }
}

export function fetchPosts() {
    return async dispatch => {
        try {
            const { data } = await fetchPostsFromAPI(); // Destructuring data from the response
            const { children } = data;  // Destructuring children from the data
            const posts = children.map(child => child.data);
            // Dispatch action with the correct payload
            dispatch({ type: 'posts/postsLoaded', payload: posts });
        } catch (error) {
            console.error('Error fetching posts:', error);
            // Optionally dispatch an error action if you want to handle errors
            dispatch({ type: 'posts/error', payload: error.message });
        }
    }
}