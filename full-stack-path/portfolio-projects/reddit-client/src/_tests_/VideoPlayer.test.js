import {render, screen, fireEvent} from '@testing-library/react'
import VideoPlayer from '../components/VideoPlayer';

window.HTMLMediaElement.prototype.load = jest.fn();
window.HTMLMediaElement.prototype.play = jest.fn();
window.HTMLMediaElement.prototype.pause = jest.fn();

describe('VideoPlayer Component', () => {
    test('renders video element', () => {
      render(<VideoPlayer mpdUrl="test.mpd" />);
      const videoElement = screen.getByRole('video');
      expect(videoElement).toBeInTheDocument();
    });

    test('handles missing mpdUrl', () => {
      render(<VideoPlayer mpdUrl={null} />);
      const videoElement = screen.getByRole('video');
      expect(videoElement).toBeInTheDocument();
    });
});