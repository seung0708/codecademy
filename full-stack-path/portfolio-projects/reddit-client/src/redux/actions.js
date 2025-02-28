import { FETCH_SUBREDDITS } from "./actionTypes";
import { getSubreddits } from "../apis/reddit";

export const fetchSubreddits = async (dispatch) => {
    const {data} = await getSubreddits(); 
    const {children} = data
    dispatch({type: FETCH_SUBREDDITS, payload: children})
}