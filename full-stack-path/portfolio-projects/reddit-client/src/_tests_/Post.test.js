import React from 'react';
import {screen, render} from '@testing-library/react'
import Post from '../components/Post';

describe('Post componnent', () => {
    test('renders post title and image', () => {
        const mockPost = {
            title: 'Why React is the Best UI Library', 
            img: '/assets/lautaro-andreani-xkBaqlcqeb4-unsplash.jpg'
        }

        render(<Post post={mockPost} />);

        // Test if title is rendered
        const title = screen.getByText(mockPost.title);
        expect(title).toBeInTheDocument();

        // Test if image is rendered
        const image = screen.getByAltText(mockPost.title);
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", mockPost.img);

    })
})