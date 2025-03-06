import React from 'react';
import { screen } from '@testing-library/react';
import PostsContainer from '../components/PostsContainer';
import { renderWithRedux } from '../test-utils/test-utils';

const mockPosts = [
    { 
        id: 1, 
        title: 'Test Post 1',
        description: 'This is test description 1',
        is_video: false,
        header_img: null,
        preview: {
            images: [{
                source: {
                    url: 'https://test.com/image1.jpg'
                }
            }]
        }
    },
    { 
        id: 2, 
        title: 'Test Post 2',
        description: 'This is test description 2',
        is_video: false,
        header_img: null,
        preview: {
            images: [{
                source: {
                    url: 'https://test.com/image2.jpg'
                }
            }]
        }
    }
];

jest.mock('../api/reddit', () => ({
    fetchSubreddits: jest.fn(() => Promise.resolve({
        data: {
            children: mockPosts.map(post => ({ data: post }))
        }
    }))
}));

describe('PostsContainer Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('shows loading state initially', () => {
        renderWithRedux(<PostsContainer />, {
            initialState: {
                subredditData: {
                    list: [],
                    query: '',
                    categories: [],
                    loading: true,
                    error: false
                }
            }
        });

        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    test('renders posts when data is loaded', () => {
        renderWithRedux(<PostsContainer />, {
            initialState: {
                subredditData: {
                    list: mockPosts,
                    query: '',
                    categories: [],
                    loading: false,
                    error: false
                }
            }
        });

        expect(screen.getByText('Test Post 1')).toBeInTheDocument();
        expect(screen.getByText('This is test description 1...')).toBeInTheDocument();
        expect(screen.getByText('Test Post 2')).toBeInTheDocument();
        expect(screen.getByText('This is test description 2...')).toBeInTheDocument();
    });

    test('shows error message when there is an error', () => {
        renderWithRedux(<PostsContainer />, {
            initialState: {
                subredditData: {
                    list: [],
                    query: '',
                    categories: [],
                    loading: false,
                    error: true
                }
            }
        });

        expect(screen.getByTestId('error-message')).toBeInTheDocument();
        expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
});