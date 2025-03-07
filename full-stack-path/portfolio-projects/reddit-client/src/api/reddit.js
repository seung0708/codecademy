
export async function fetchPostsFromAPI() {
    const response = await fetch('https://www.reddit.com/.json')
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return response.json()
}

export async function fetchPopularPostsByCategory(category) {
    console.log(category)
    const response = await fetch(`https://www.reddit.com/r/popular/${category}.json`)

    if(!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json();
}

export async function searchFromAPI(query) {
    const response = await fetch(`https://www.reddit.com/search.json?q=${query}`)
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return response.json();
    
}