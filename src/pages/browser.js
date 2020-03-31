import React, {useState, useEffect} from 'react';

import {Link, Route, Switch, useParams, useRouteMatch} from 'react-router-dom';

import {useAuth} from '../components/authContext';
import {CacheContext} from '../components/cacheContext';

import client from '../components/syncClient';

import List from '../controls/list';
import Items from '../controls/items';

import User from '../controls/user';
import Loading from '../controls/loading';
import SyncpointItem from '../controls/syncpointItem';

function Browser(props) {
    const {authTokens, setAuthTokens} = useAuth();
   
    //const [syncpoints, setSyncpoints] = useState();

    //const [cache, setCache] = useState();
    
    //const [error, setError] = useState();

    const accessToken = authTokens.access_token;

    //let { sid, fid } = useParams();

    
    const [cache, setCache] = useState();
    // const setCache = (data) => {
    //     setCacheState(data);
    // }


    // useEffect(() => {
    //     if (sid>0) {
    //         client.getContent(authTokens.access_token, sid, fid)
    //         .then(data => {
    //             console.log("loaded content")
    //             const newCache = cache[data.FolderId] = data;
    //             setCache(newCache);
    //             //setSyncpoints(data)
    //         })
    //         .catch(err => setError(err.message));

    //         return;
    //     }

    //     client.getSyncpoints(authTokens.access_token)
    //         .then(data => {
    //             console.log("loaded syncpoints")
                
    //             setSyncpoints(data)
    //         })
    //         .catch(err => setError(err.message));
    // }, []);

    let { path, url } = useRouteMatch();


    return (
        <CacheContext.Provider value={{ cache, setCache}}>
        <div>
            <Switch>
                <Route exact path={path}>
                    <h3>list of syncpoint</h3>
                    <List />
                </Route>
                <Route path={`${path}/:sid/:fid`}>
                    <h3>list of content</h3>
                    <Items />
                </Route>
            </Switch>
            
            {/* //<List /> */}
        </div>
        </CacheContext.Provider>
    );

    
    // if (!syncpoints) {
    //     return (<Loading />);
    // } else if (sid > 0) {
    //     if (fid > 0) {
    //         return (<div>not implemented</div>);

    //     } else {

    //     }

    // } else {

    //     return (
    //         <div>
    //         <User />
    //         <p>{error && 
    //             <span>{error}</span>}
    //         </p>
    //         <ul>
               
    //               {syncpoints.map((item, index) => <li>{index}:
    //               <a onClick={onClick}>{syncpoints.Name</a>
    //               {/* <Link onClick>item.Name</Link> */}
    //             {/* <SyncpointItem syncpoint={item} /></li>)}  */}
    //         </ul>
    //     </div>
    //         );
    //}
}

export default Browser;