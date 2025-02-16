import assert from 'assert';
import { trackList } from '../src/sample-data';

describe('Track filtering', () => {
    const filterTracks = (tracks, searchQuery) => {
        if (!searchQuery || searchQuery.trim() === '') {
            return [];
        }

        return tracks.filter(track => 
            track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
            track.album.toLowerCase().includes(searchQuery.toLowerCase())

        );
    };

    it('should return an empty array when no input is given', () => {
        const searchQuery = '';
        const filteredTracks = filterTracks(trackList, searchQuery)
        console.log(filteredTracks)
        assert.equal(filteredTracks.length, 0, 'Should return empty arry for no input');
    })

    it('should filter tracks based on search query', () => {
        const searchQuery = 'whiplash';
        const filteredTracks = filterTracks(trackList, searchQuery);
        
        // Assert that tracks containing 'whiplash' are included
        const whiplashTrack = filteredTracks.find(track => 
            track.name.toLowerCase().includes(searchQuery)
        );
        assert.ok(whiplashTrack, 'Should find tracks containing "whiplash"');
    });

    it('should return empty array when no matches found', () => {
        const searchQuery = 'xyznotfound';
        const filteredTracks = filterTracks(trackList, searchQuery);
        
        assert.equal(filteredTracks.length, 0, 'Should return empty array for no matches');
    });
});