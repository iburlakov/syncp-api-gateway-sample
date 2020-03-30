import React, {useState, useEffect} from 'react';

import {useAuth} from '../components/authContext';


export default function User() {
    const {authTokens, setAuthTokens} = useAuth()
    
    
    function logOut() {
        setAuthTokens(null);
    };

    if (authTokens) {
        return (
            <div>  
                <p>{authTokens.user_email} from {authTokens.user_company_name}</p> <button onClick={logOut}>logout</button>
            </div>
        );
    } else {
        return (
            <div>
            not authenticated 
            </div>
        );
    }
}