import React, {useState, useEffect} from 'react';

import {useAuth} from '../components/authContext';

import client from '../components/syncClient';

import User from '../controls/user'

function Browser(props) {
    const {authTokens, setAuthTokens} = useAuth();
   
    const [cache, setCache] = useState(new Array());
    const [error, setError] = useState();

    const accessToken = authTokens.access_token;


    useEffect(() => {
        console.log('effect')

        client.syncp.getSyncpoints(authTokens.access_token)
            .then(data => {
                setCache(data)
            })
            .catch(err => setError(err.message));
      }, []);
    

    return (
        <div>
            <User />
            <p>{error && 
                <span>{error}</span>}
            </p>
            
            <ul>
                 {cache.map((item, index) => <li>{index}: {item.Name}</li>)} 
            </ul>
        </div>
    );
}

export default Browser;