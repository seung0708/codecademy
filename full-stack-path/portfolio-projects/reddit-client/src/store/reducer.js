import { combineReducers } from "redux";

import subredditsReducer from "./subredditsSlice";

const rootReducer = combineReducers({
    subreddits: subredditsReducer
})

export default rootReducer;