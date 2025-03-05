import {screen, render, fireEvent} from '@testing-library/react'
import Post from '../components/Post';

const mockPost = {
    title: 'Test Post',
    description: 'Test Description',
    preview: { images: [{ source: { url: 'test.jpg' } }] },
    is_video: false,
    media: null
  };

describe('Post componnent', () => {
    test('renders post title and description', () => {
        render(<Post subreddit={mockPost} />);
        expect(screen.getByText('Test Post')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
    })

    test('renders image for non-video posts', () => {
        render(<Post subreddit={mockPost} />);
        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('src', 'test.jpg');
      });
    
      test('truncates long descriptions', () => {
        const longPost = {
          ...mockPost,
          description: 'A'.repeat(300)
        };
        render(<Post subreddit={longPost} />);
        expect(screen.getByText(/^A{200}\.\.\.$/)).toBeInTheDocument();
      });
})