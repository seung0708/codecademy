import { fetchSubreddits } from "../apis/reddit";
const initialState = []

export default function subredditsReducer(state = initialState, action) {
    switch(action.type) {
        case 'subreddits/subredditsLoaded':
            return action.payload
        default: 
            return state;
    }
}

export async function getSubreddits(dispatch, getState) {
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