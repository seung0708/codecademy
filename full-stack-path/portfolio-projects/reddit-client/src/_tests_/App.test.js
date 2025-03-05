import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../store';
import App from '../components/App';

const store = createStore(rootReducer);


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
    })
})