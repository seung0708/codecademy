import { combineReducers } from "redux";
import postsReducer from "../features/posts/redux/postsSlice";
import filterReducer from "../features/filter/redux/filterSlice";
import subredditsReducer from "../features/subreddits/redux/subredditsSlice";
import commentsReducer from "../features/comments/redux/commentsSlice";
import searchReducer from "../features/search/redux/searchSlice";

const rootReducer = combineReducers({
    subredditData: subredditsReducer,
    postsData: postsReducer,
    commentsData: commentsReducer,
    filterData: filterReducer,
    searchData: searchReducer
})

export default rootReducer;