
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

// Search Users
export const searchUsers = async (text) => {

    const params = new URLSearchParams({
        q: text
    })

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
        Authorization: `token ${GITHUB_TOKEN}`
    })
    const { items } = await response.json();

    return items;
}

     // Search User - Individual
export const searchUser = async (login) => {

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
        Authorization: `token ${GITHUB_TOKEN}`
    })
    // if not found redirect to 404
    if (response.status === 404) {
        window.location = '/not-found';
    } else {
        // get data
        const data = await response.json();
        return data;
    }
}

// Get user repos 
export const getUserRepos = async (login) => {

    const params = new URLSearchParams({
        sort: 'created',
        per_page: 10
    })

    const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
        Authorization: `token ${GITHUB_TOKEN}`
    })
    // if not found redirect to 404
    if (response.status === 404) {
        window.location = '/not-found';
    } else {
        // get data
        const data = await response.json();
        return data;
    }
}