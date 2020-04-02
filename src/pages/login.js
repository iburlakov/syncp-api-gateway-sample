import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';

import {useAuth} from '../components/authContext';

import LoginButton from '../controls/auth/loginButton';

function Login(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);

    const {token} = useAuth();

    if (token) {
        return <Redirect to='/browser' />;
    }
    return (

        <div className="container text-center">
          <h1>Wellcome</h1>
          <p className="lead text-muted">You need to login with syncplicity accpunt to use this site</p>
          <p>
            <LoginButton />
          </p>
        </div>
    );
}

export default Login;