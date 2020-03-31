import React, {useEffect} from 'react';
import {Link, Route, Switch, useParams, useRouteMatch} from 'react-router-dom';

import client from '../components/syncClient';

import {useAuth} from '../components/authContext';
import {useCache} from '../components/cacheContext';


export default function Items() {

    const {authTokens, setAuthTokens} = useAuth();
    const {cache, setCache} = useCache();

    const { sid, fid } = useParams();
    //debugger;
    useEffect(() => {
        client.getContent(authTokens.access_token, sid, fid)
            .then(data => {
                //debugger;
                console.log("loaded folder content")
                let tmp = cache && cache.folders ? cache.folders : {};//[fid] = data;
                tmp[fid] = data;
                setCache({folders: tmp, ...cache});
            })
            .catch(err => 
            {
                console.log(err);

                if (err.response.status == 401) {
                    setAuthTokens();
                }
            });
    }, [sid, fid]);
    console.log([sid, fid]);
    if (cache && cache.folders && cache.folders[fid]) {
        return (
            <ul>
                <li>
                    {cache.folders[fid].ParentFolderId ?
                    <Link to={`/browser/${sid}/${cache.folders[fid].ParentFolderId}`}>...</Link> :
                    <Link to={`/browser`}>...</Link>}
                </li>
                {!!cache.folders[fid] && !!cache.folders[fid].Folders &&

                    cache.folders[fid].Folders.map((item, i) => 
                    <li key={item.FolderId}>
                        {i}:<Link to={`/browser/${sid}/${item.FolderId}`}>{item.Name}</Link>
                    </li>)
                }

                {!!cache.folders[fid] && !!cache.folders[fid].Files && 
                    cache.folders[fid].Files.map((item, i) => 
                        <li key={item.FileId}>{i}:{item.Filename}</li>)
                }
            </ul>
        )
    } else {
        return <p>loading...</p>
    }

  //  return (<p>List</p>);
}