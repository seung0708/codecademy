import React from 'react';
import { render, screen } from '@testing-library/react';
import VideoPlayer from '../components/VideoPlayer';

jest.mock('dashjs', () => ({
    MediaPlayer: jest.fn().mockImplementation(() => ({
        create: jest.fn().mockReturnThis(),
        initialize: jest.fn(),
        attachView: jest.fn(),
        attachSource: jest.fn(),
        reset: jest.fn()
    }))
}));

describe('VideoPlayer Component', () => {
    test('renders video element', () => {
        render(<VideoPlayer mpdUrl="test.mpd" />);
        const videoElement = screen.getByTestId('video-player');
        expect(videoElement).toBeInTheDocument();
    });

    test('handles missing mpdUrl', () => {
        render(<VideoPlayer mpdUrl={null} />);
        const videoElement = screen.getByTestId('video-player');
        expect(videoElement).toBeInTheDocument();
    });
});