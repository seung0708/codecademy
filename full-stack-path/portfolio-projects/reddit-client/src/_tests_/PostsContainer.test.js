import React from 'react';
import {screen, render} from '@testing-library/react'
import PostsContainer from '../components/PostsContainer';
import { posts } from '../mock-data';

describe('PostList Component', () => {
    test('should render a list of posts', () => {
        render(<PostsContainer posts={posts} />)

        posts.forEach(post => {
            const title = screen.getByText(post.title)
            console.log(title.textContent)
            expect(title).toBeInTheDocument();
        })
    });
    test('should render no posts available message when there are not posts', () => {
        render(<PostsContainer posts={[]} />)
    
    })
})