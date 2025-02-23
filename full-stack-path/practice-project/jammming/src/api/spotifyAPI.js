export const fetchResultsData = async (accessToken, input) => {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${input}&type=track`, {
        method: 'GET',
        headers: { 
            Authorization: 'Bearer ' + accessToken 
        }
    })

    const {tracks} = await response.json()
    return tracks?.items;
}

export const fetchPlaylistsData = async (accessToken) => {
    const response = await fetch(`https://api.spotify.com/v1/me/playlists`, {
        method: 'GET',
        headers: { 
            Authorization: 'Bearer ' + accessToken 
        }
    })

    const {items} = await response.json()
    return items
}

export const createPlaylist = async (userId, accessToken, name = 'Playlist name') => {
    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: { 
            Authorization: 'Bearer ' + accessToken 
        }, 
        body: JSON.stringify({
            name

        })
    })

    const result = await response.json() 
    return result; 
}

export const addTrackToPlaylist = async (accessToken, playlistId, tracks) => {
    const uris = tracks.map(track => track.uri)
    console.log(uris)
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST', 
        headers: { 
            Authorization: 'Bearer ' + accessToken 
        },
        body: JSON.stringify({
            uris
        })

    })
    const data = await response.json() 
    console.log(data)
}