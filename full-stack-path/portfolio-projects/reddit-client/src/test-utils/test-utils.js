import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from '../store/reducer';

const defaultState = {
    subredditData: {
        list: [],
        query: '',
        categories: [],
        loading: false,
        error: false
    }
};

export function renderWithRedux(
    ui,
    {
        initialState = defaultState,
        store = createStore(
            rootReducer,
            initialState,
            applyMiddleware(thunk)
        ),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>;
    }

    return {
        store,
        ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    };
}

export function createTestStore(initialState = defaultState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    );
}
