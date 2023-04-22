import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL= process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN= process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        loading: false,
    }

    const [state, dipatch] = useReducer(githubReducer, initialState)

    // Get initial users (testing)
    const fetchUsers = async () => {

        setLoading();

        const response = await fetch(`${GITHUB_URL}/users`, {
            Authorization: `token ${GITHUB_TOKEN}`
        })
        const data = await response.json();

        dipatch({
            type: 'GET_USERS',
            payload: data,
        })
    }

    // set loading 
    const setLoading = () => dipatch({
        type: 'SET_LOADING',
    })

    return <GithubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        fetchUsers
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext