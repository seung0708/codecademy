import { fetchPopularPostsByCategory } from '../../api/reddit'

const initialState = {
    filteredPosts: [],
    filteredLoading: false,
    filteredError: false,
    categories: ['hot', 'new', 'rising', 'top']
}

export default function filterReducer(state = initialState, action) {
    switch(action.type) {
        case 'filter/loading': {
            return {
                ...state,
                filteredLoading: true
            }
        }
        case 'filter/error': 
            return {
                ...state,
                filteredLoading: false, 
                filteredError: true
            }
        case 'filter/postsLoaded':
            return {
                ...state, 
                filteredLoading: false, 
                filteredPosts: action.payload
            }
        case 'filter/category': 
            return {
                ...state, 
                filteredPosts: action.payload
            }
        default: 
            return state;
    }
}

export function fetchSubredditsByCategory(category) {
    return async dispatch => {
        const {data} = await fetchPopularPostsByCategory(category)
        const {children} = data; 
        const results = children.map(child => child.data)
        dispatch({type: 'filter/postsLoaded', payload: results})
    }
}