
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

export async function fetchSubredditFromAPI(subreddit) {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}/about.json`)
    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return response.json();
}

export async function fetchSubredditPostsFromAPI(subreddit) {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`)
    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return response.json();
}