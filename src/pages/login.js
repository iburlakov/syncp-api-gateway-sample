import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';

import axios from 'axios';

import {useAuth} from '../components/authContext';

import LoginButton from '../controls/loginButton';

function Login(props) {

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthTokens } = useAuth();

    if (isLoggedIn) {
        return <Redirect to="/browser" />;
        }

    return (
        <div>
            <LoginButton />
        </div>
    );
}

export default Login;