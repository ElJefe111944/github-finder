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

    const [state, dispatch] = useReducer(githubReducer, initialState)


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

            dispatch({
                type: 'GET_USER',
                payload: data,
            });
        }
    }

    // Get user repos 
    const getUserRepos = async (login) => {

        setLoading();

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

            dispatch({
                type: 'GET_USER_REPOS',
                payload: data,
            });
        }
    }

    // set loading 
    const setLoading = () => dispatch({
        type: 'SET_LOADING',
    })

    // clear search
    const clearSearch = () => dispatch({
        type: 'CLEAR_SEARCH',
    })

    return <GithubContext.Provider value={{
        ...state,
        dispatch,
        searchUser,
        clearSearch,
        getUserRepos
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext