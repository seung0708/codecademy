import { subreddits } from "../components/App";
import { FETCH_SUBREDDITS } from "./actionTypes";

const initialState = {
    subreddits: [], 
    loadings: false, 
    error: null 
}

export default function subredditsReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_SUBREDDITS: 
            return {
                ...state, 
                loading: false, 
                subreddits: action.payload.subreddits
            }
    }
}