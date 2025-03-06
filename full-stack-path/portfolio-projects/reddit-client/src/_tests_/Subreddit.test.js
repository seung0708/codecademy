import React from 'react';
import {render, screen} from '@testing-library/react'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import Subreddit from '../components/Subreddit';
import rootReducer from '../store/reducer';

const store = createStore(
    rootReducer,
    {
        subredditData: {
            categories: ['reactjs', 'javascript', 'programming'],
            loading: false,
            error: null
        }
    },
    applyMiddleware(thunk)
);

describe('Subreddit Component', () => {
    const renderWithRedux = (component) => {
        return render(
            <Provider store={store}>
                {component}
            </Provider>
        );
    };

    test('renders subreddit categories', () => {
        renderWithRedux(<Subreddit />);
        expect(screen.getByText('reactjs')).toBeInTheDocument();
        expect(screen.getByText('javascript')).toBeInTheDocument();
        expect(screen.getByText('programming')).toBeInTheDocument();
    });

    test('renders subreddits heading', () => {
        renderWithRedux(<Subreddit />);
        expect(screen.getByText('Subreddits')).toBeInTheDocument();
    });
});