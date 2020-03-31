import React, {useEffect} from 'react';
import {Link, Route, Switch, useParams, useRouteMatch} from 'react-router-dom';


import client from '../components/syncClient';

import {useAuth} from '../components/authContext';
import {useCache} from '../components/cacheContext';


export default function List(props) {

    const {authTokens, setAuthTokens} = useAuth();
    const {cache, setCache} = useCache();

    //let { path, url } = useRouteMatch();


    useEffect(() => {
        client.getSyncpoints(authTokens.access_token)
            .then(data => {
                console.log("loaded syncpoints")
                
                setCache({syncpoints: data, ...cache});
            })
            .catch(err => 
            {
                console.log(err);

                if (err.response.status == 401) {
                    setAuthTokens();
                }
            });
    },[]);

    if (cache && cache.syncpoints) {
        return (
            <ul>
                {cache.syncpoints.map((item, i) =>
                    <li key={item.Id}>
                        {i}:<Link to={`/browser/${item.Id}/${item.RootFolderId}`}>{item.Name}</Link>
                    </li>
                )}
            </ul>
        )
    } else {
        return <p>loading...</p>
    }

  //  return (<p>List</p>);
}