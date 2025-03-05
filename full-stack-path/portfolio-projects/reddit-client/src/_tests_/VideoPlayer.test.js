import {render, screen, fireEvent} from '@testing-library/react'
import VideoPlayer from '../components/VideoPlayer';

jest.mock('dashjs', () => ({
    MediaPlayer: () => ({
      create: jest.fn(),
      initialize: jest.fn(),
      attachView: jest.fn(),
      attachSource: jest.fn(),
      on: jest.fn()
    })
  }));
  
  describe('VideoPlayer', () => {
    test('renders video element', () => {
      render(<VideoPlayer mpdUrl="test.mpd" />);
      expect(screen.getByRole('video')).toBeInTheDocument();
    });
  });