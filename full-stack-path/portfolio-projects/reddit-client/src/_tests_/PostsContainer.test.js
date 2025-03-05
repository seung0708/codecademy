import React from 'react';
import {screen, render} from '@testing-library/react'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import PostsContainer from '../components/PostsContainer';
import { posts } from '../mock-data';
import rootReducer from '../store';

const mockPosts = [
    {
      title: 'Test Post 1',
      description: 'Description 1',
      preview: { images: [{ source: { url: 'test1.jpg' } }] },
      is_video: false
    },
    {
      title: 'Test Post 2',
      description: 'Description 2',
      preview: { images: [{ source: { url: 'test2.jpg' } }] },
      is_video: false
    }
  ];
  
  describe('PostsContainer Component', () => {
    test('shows loading state', () => {
      const store = createStore(rootReducer, {
        subreddits: { 
          list: [], 
          loading: true, 
          error: false 
        }
      });
  
      render(
        <Provider store={store}>
          <PostsContainer />
        </Provider>
      );
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
  
    test('renders posts when data is available', () => {
      const store = createStore(rootReducer, {
        subreddits: { 
          list: mockPosts, 
          loading: false, 
          error: false 
        }
      });
  
      render(
        <Provider store={store}>
          <PostsContainer />
        </Provider>
      );
      expect(screen.getByText('Test Post 1')).toBeInTheDocument();
      expect(screen.getByText('Test Post 2')).toBeInTheDocument();
    });
  
    test('shows error message', () => {
      const store = createStore(rootReducer, {
        subreddits: { 
          list: [], 
          loading: false, 
          error: true 
        }
      });
  
      render(
        <Provider store={store}>
          <PostsContainer />
        </Provider>
      );
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });