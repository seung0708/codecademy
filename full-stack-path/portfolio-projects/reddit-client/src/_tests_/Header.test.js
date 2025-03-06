import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import Header from '../components/Header';
import rootReducer from '../store/reducer';

const store = createStore(
    rootReducer,
    {
        subredditData: {
            list: [],
            loading: false,
            error: null
        }
    },
    applyMiddleware(thunk)
);

describe('Header Component', () => {
    const renderWithRedux = (component) => {
        return render(
            <Provider store={store}>
                {component}
            </Provider>
        );
    };

    test('renders reddit logo', () => {
        renderWithRedux(<Header />);
        const logo = screen.getByAltText('logo');
        expect(logo).toBeInTheDocument();
    });

    test('renders search component', () => {
        renderWithRedux(<Header />);
        expect(screen.getByPlaceholderText('Search Reddit')).toBeInTheDocument();
    });
});