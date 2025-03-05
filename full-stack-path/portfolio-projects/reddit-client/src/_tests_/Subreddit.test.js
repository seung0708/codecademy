import { render, screen } from '@testing-library/react';
import Subreddit from '../components/Subreddit';

const mockSubreddit = {
    display_name: 'reactjs',
    public_description: 'The front end web development subreddit',
    banner_img: 'test-banner.jpg'
}

describe('Subreddit omponent', () => {
    test('renders subreddit name', () => {
        render(<Subreddit subreddit={mockSubreddit} />);
        expect(screen.getByText('reactjs')).toBeInTheDocument();
    })

    test('renders subreddit description', () => {
        render(<Subreddit subreddit={mockSubreddit} />);
        expect(screen.getByText('The front end web development subreddit')).toBeInTheDocument();
    })

    test('renders subreddit banner image if avaialble', () => {
        render(<Subreddit subreddit={mockSubreddit} />);
        const banner = screen.getByRole('img');
        expect(banner).toHaveAttribute('src', 'test-banner.jpg');
    })
})