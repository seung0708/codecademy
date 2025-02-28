import {createStore, applyMiddleware} from 'reduex';
import thunkMiddleware from 'redux-thunk';
import { subredditsReducer } from './reducers/subredditsReducer';

const store = createStore(
    subredditsReducer, 
    applyMiddleware(thunkMiddleware)
)

export default store; 