import React from 'react';
import { render, screen } from '@testing-library/react';
import Subreddit from '../components/Subreddit';


describe('Subreddit component', () => {
    test('rendering subreddits', () => {
        const mockSubreddits = ["r/webdev", "r/javascript", "r/react"];

        render(<Subreddit subreddits={mockSubreddits} />);

        // Check if each subreddit is rendered
        mockSubreddits.forEach(subreddit => {
            const subredditElement = screen.getByText(subreddit);
            expect(subredditElement).toBeInTheDocument();
        });
        
    })
})