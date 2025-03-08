import { fetchPostFromAPI } from '../../../api/reddit';

const initialState = {
    comments: {
        post: null,
        commentsData: []
    },
    loading: false,
    error: false
}

export default function commentsReducer(state = initialState, action) {
    switch(action.type) {
        case 'comments/loading': {
            return {
                ...state,
                loading: true
            }
        }
        case 'comments/error': 
            return {
                ...state,
                loading: false, 
                error: true
            }
        case 'comments/commentsLoaded':
            return {
                ...state, 
                loading: false, 
                comments: action.payload
            }
        default: 
            return state;
    }
}

export const fetchComments = (subreddit, id) => async (dispatch) => {
    try {
        dispatch({ type: 'comments/loading' });
        const results = await fetchPostFromAPI(subreddit, id);
        const [postData, commentsData] = results;
        console.log('postData', postData.data.children[0].data)
        console.log('commentsData', commentsData.data.children)
        const comments = commentsData.data.children.map(child => child.data)
        dispatch({ type: 'comments/commentsLoaded', payload: { post: postData.data.children[0].data, comments } });
    } catch (error) {
        dispatch({ type: 'comments/error' });
    }
};
