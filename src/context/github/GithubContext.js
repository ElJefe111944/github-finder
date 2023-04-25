import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
    }

    const [state, dipatch] = useReducer(githubReducer, initialState)

    // Search Users
    const searchUsers = async (text) => {

        setLoading();

        const params = new URLSearchParams({
            q: text
        })

        const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
            Authorization: `token ${GITHUB_TOKEN}`
        })
        const { items } = await response.json();

        dipatch({
            type: 'GET_USERS',
            payload: items,
        })
    }

    // Search User - Individual
    const searchUser = async (login) => {

        setLoading();

        const response = await fetch(`${GITHUB_URL}/users/${login}`, {
            Authorization: `token ${GITHUB_TOKEN}`
        })
        // if not found redirect to 404
        if (response.status === 404) {
            window.location = '/not-found';
        } else {
            // get data
            const data = await response.json();

            dipatch({
                type: 'GET_USER',
                payload: data,
            });
        }
    }

    // Get user repos 
    const getUserRepos = async (login) => {

        setLoading();

        const response = await fetch(`${GITHUB_URL}/users/${login}/repos`, {
            Authorization: `token ${GITHUB_TOKEN}`
        })
        // if not found redirect to 404
        if (response.status === 404) {
            window.location = '/not-found';
        } else {
            // get data
            const data = await response.json();

            dipatch({
                type: 'GET_USER_REPOS',
                payload: data,
            });
        }
    }

    // set loading 
    const setLoading = () => dipatch({
        type: 'SET_LOADING',
    })

    // clear search
    const clearSearch = () => dipatch({
        type: 'CLEAR_SEARCH',
    })

    return <GithubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        searchUsers,
        searchUser,
        clearSearch,
        getUserRepos
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext