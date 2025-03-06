import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import App from '../components/App';
import rootReducer from '../store/reducer';

const store = createStore(
    rootReducer,
    {
        subredditData: {
            list: [],
            categories: ['reactjs', 'javascript', 'programming'],
            loading: false,
            error: null
        }
    },
    applyMiddleware(thunk)
);

describe('App Component', () => {
    test('renders header', () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );
        expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    test('renders main content area', () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );
        expect(screen.getByRole('main')).toBeInTheDocument();
    });
});