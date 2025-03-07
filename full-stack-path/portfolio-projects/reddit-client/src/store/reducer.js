import { combineReducers } from "redux";
import postsReducer from "../features/posts/redux/postsSlice";
import filterReducer from "../features/filter/redux/filterSlice";
import subredditsReducer from "./subredditsSlice";
import searchReducer from "../features/search/redux/searchSlice";

const rootReducer = combineReducers({
    subredditData: subredditsReducer,
    postsData: postsReducer,
    filterData: filterReducer,
    searchData: searchReducer
})

export default rootReducer;