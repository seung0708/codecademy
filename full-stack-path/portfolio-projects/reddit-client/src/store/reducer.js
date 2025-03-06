import { combineReducers } from "redux";
import postsReducer from "../features/posts/postsSlice";
import subredditsReducer from "./subredditsSlice";

const rootReducer = combineReducers({
    subredditData: subredditsReducer,
    postsData: postsReducer
})

export default rootReducer;