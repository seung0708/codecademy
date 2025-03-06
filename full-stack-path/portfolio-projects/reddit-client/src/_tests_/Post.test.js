import {screen, render} from '@testing-library/react'
import Post from '../components/Post';

const mockPost = {
    title: 'Test Post',
    description: null, 
    preview: { images: [{ source: { url: 'test.jpg' } }] },
    is_video: false,
    header_img: 'test.jpg',  
    media: null
};

describe('Post component', () => {
    test('renders post title and description', () => {
        const postWithDesc = {
            ...mockPost,
            description: 'Test Description',
            header_img: null 
        };
        render(<Post subreddit={postWithDesc} />);
        expect(screen.getByText('Test Post')).toBeInTheDocument();
        expect(screen.getByText('Test Description...')).toBeInTheDocument();
    });

    test('renders image for non-video posts', () => {
        render(<Post subreddit={mockPost} />);
        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('src', 'test.jpg');
    });
    
    test('truncates long descriptions', () => {
        const longPost = {
            ...mockPost,
            description: 'A'.repeat(300),
            header_img: null 
        };
        render(<Post subreddit={longPost} />);
        expect(screen.getByText(`${'A'.repeat(200)}...`)).toBeInTheDocument();
    });
});