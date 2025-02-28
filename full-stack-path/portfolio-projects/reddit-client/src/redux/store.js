import {configureStore} from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import subredditsReducer from './reducer';

const store = createStore(
    subredditsReducer, 
    applyMiddleware(thunk)
)

export default store; 