import React, {useState, useEffect} from 'react';

import {useAuth} from '../components/authContext';

import LoginButton from './loginButton';
import LogoutButton from './logoutButton';


export default function User() {
    const {authTokens} = useAuth()

    return (
        <div>
            {
                authTokens
                    ? <div>
                        <p>
                            <span>{authTokens.user_email} </span>
                            <LogoutButton />
                        </p>
                    </div>
                    : <LoginButton />
            }
        </div>
    )
}