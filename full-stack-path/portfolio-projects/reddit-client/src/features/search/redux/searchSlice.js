import { searchFromAPI } from "../../../api/reddit";
const initialState = {
    query: '',
    loading: false,
    error: false,
    searchResults: []
}

export default function searchReducer(state = initialState, action) {
    switch(action.type) {
        case 'search/loading': {
            return {
                ...state,
                loading: true
            }
        }
        case 'search/error': 
            return {
                ...state,
                loading: false, 
                error: true
            }
        case 'search/query': 
            return {
                ...state, 
                query: action.payload
            }
        case 'search/searchResults': 
            return {
                ...state, 
                searchResults: action.payload
            }
        default: 
            return state;
    }
}

export function fetchSearchResults(query) {
    return async dispatch => {
        dispatch({type: 'search/loading'})
        try {
            const {data} = await searchFromAPI(query)
            const {children} = data; 
            const searchResults = children.map(child => child.data)
            dispatch({type: 'search/searchResults', payload: searchResults})
        } catch (error) {
            dispatch({type: 'search/error'})
        }
    }
}