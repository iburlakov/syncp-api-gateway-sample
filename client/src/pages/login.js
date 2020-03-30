import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';

import axios from 'axios';

import {useAuth} from '../components/authContext';

function Login(props) {

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthTokens } = useAuth();

    function postLogin() {
        // setAuthTokens("test token");
        // setLoggedIn(true);

        //axios.get("/auth")
        axios.get("http://localhost:3081/auth")
            .then(result => {
                if (result.status === 200) {
                    setAuthTokens(result.data);
                    setLoggedIn(true);
                } else {
                    setIsError(true);
                }
            }).catch(e => {
                setIsError(true);
 
            });
    }

    if (isLoggedIn) {
        return <Redirect to="/browser" />;
      }

    return (
        <div>
            <p>login with syncplicity</p>
            {/* <form> */}
                <input id="email" type="text" value={userName} onChange={e => setUserName(e.target.value)}></input>
                <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)}></input>
                <button onClick={postLogin}>login</button>
            {/* </form> */}
            <a href="https://api.syncplicity.com/oauth/authorize?response_type=code&client_id=4fd3c282-ed2a-46eb-a259-0a89e2a14f4e">login in syncplicity</a>
            {isError && <p>failed to login</p>}
        </div>
    );
}

export default Login;