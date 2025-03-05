import { fetchSubreddits, searchSubreddits, getSubredditCategory } from "../api/reddit";



const initialState = {
    list: [], 
    query: '', 
    categories: ['technews', 'unresolvedmysteries', 'fitness', 'askscience', 'funny'], 
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
                list: action.payload
            }
    
        case 'subreddits/setQuery': 
            return {
                ...state, 
                query: action.payload,
            }
        case 'subreddits/setList': 
            return {
                ...state, 
                list: action.payload
            }
        case 'subreddits/subredditCategory': 
            return {
                ...state, 
                list: action.payload
            
            }
        default: 
            return state;
    }
}

export function getSubreddits() {
    return async dispatch => {
        try {
            const { data } = await fetchSubreddits(); // Destructuring data from the response
            const { children } = data;  // Destructuring children from the data
            const subreddits = children.map(child => child.data);
            // Dispatch action with the correct payload
            dispatch({ type: 'subreddits/subredditsLoaded', payload: subreddits });
        } catch (error) {
            console.error('Error fetching subreddits:', error);
            // Optionally dispatch an error action if you want to handle errors
            dispatch({ type: 'subreddits/error', payload: error.message });
        }
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
            dispatch({type: 'subreddits/setList', payload: searchResults})
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