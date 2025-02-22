export const searchTracks = async (accessToken, input) => {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${input}&type=track`, {
        method: 'GET',
        headers: { 
            Authorization: 'Bearer ' + accessToken 
        }
    })

    const {tracks} = await response.json()
    console.log(Array.isArray(tracks?.items))
    console.log(tracks?.items)
    return tracks?.items;
}