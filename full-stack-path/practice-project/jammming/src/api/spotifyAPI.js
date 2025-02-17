export const getTracks = async (accessToken) => {
    const response = await fetch('https://api.spotify.com/v1/tracks', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + accessToken }
    })

    const data = await response.json()
    console.log(data)
}