import { combineReducers } from "redux";

import subredditsReducer from "./subredditsSlice";

const rootReducer = combineReducers({
    subredditData: subredditsReducer
})

export default rootReducer;