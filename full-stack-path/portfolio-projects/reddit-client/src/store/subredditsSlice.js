import { searchSubreddits, getSubredditCategory } from "../api/reddit";
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
        case 'subreddits/subredditCategory': 
            return {
                ...state, 
                posts: action.payload
            
            }
        default: 
            return state;
    }
}

export function fetchSearchResults(query) {
    return async dispatch => {
        console.log(query)
        dispatch({type: 'subreddits/setQuery', payload: query})
        if(query !== '') {
            const {data} = await searchSubreddits(query)
            const {children} = data; 
            const searchResults = children.map(child => child.data)
            console.log(searchResults)
            dispatch({type: 'subreddits/subredditsLoaded', payload: searchResults})
        }
    }
}

export function fetchSubredditsByCategory(category) {
    return async dispatch => {
        const {data} = await searchSubreddits(category)
        //console.log(data)
        const {children} = data; 
        const results = children.map(child => child.data)
        dispatch({type: 'subreddits/subredditCategory', payload: results})
    }
}