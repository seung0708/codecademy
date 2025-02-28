
export async function fetchSubreddits() {
    const response = await fetch('https://www.reddit.com/subreddits.json')
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return response.json()
}