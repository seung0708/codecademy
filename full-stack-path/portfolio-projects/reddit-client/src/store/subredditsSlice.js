const initialState = {
    posts: [],
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
        case 'subreddits/subredditsLoaded':
            return {
                ...state, 
                loading: false, 
                posts: action.payload
            }
        default: 
            return state;
    }
}
