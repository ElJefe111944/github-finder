import { useContext, useEffect } from "react";
import GithubContext from "../context/github/GithubContext";
import { useParams } from "react-router";

function User({ }) {

    const { user, searchUser } = useContext(GithubContext);

    const params = useParams()

    useEffect(() => {
        searchUser(params.login);
    }, [])

    return (
        <div>{user.name}</div>
    )
}

export default User;