import React  from 'react';

import {useAuth} from '../../components/authContext';

import LoginButton from './loginButton';
import LogoutButton from './logoutButton';

export default function User() {
    const {token} = useAuth()

    return (
        <div>
            {token
                ? <><span className="p-2 text-dark">{token.user_email}</span><LogoutButton /></>
                : <LoginButton />}
        </div>
    )
}