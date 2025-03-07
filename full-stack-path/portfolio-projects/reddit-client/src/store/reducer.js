import { combineReducers } from "redux";
import postsReducer from "../features/posts/redux/postsSlice";
import filterReducer from "../features/filter/filterSlice";
import subredditsReducer from "./subredditsSlice";

const rootReducer = combineReducers({
    subredditData: subredditsReducer,
    postsData: postsReducer,
    filterData: filterReducer
})

export default rootReducer;