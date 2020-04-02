import React, {useState, useEffect} from 'react';

import {useParams} from 'react-router-dom';

import {useAuth} from '../components/authContext';

import client from '../components/syncClient';

import List from '../controls/browser/list';

function Browser(props) {
    const {token, setToken} = useAuth();
   
    const [cache, setCache] = useState({});

    const { sid, fid } = useParams();

    function loadSyncpoints() {
        client.getSyncpoints(token.access_token)
            .then(data => {
                console.log("loaded syncpoints")
                
                setCache({syncpoints: data, ...cache});
            })
            .catch(err => 
            {
                if (err.response && err.response.status == 401) {
                    setToken();
                }
            });
    }

    function loadFolder(syncpointId, folderId) {
        client.getContent(token.access_token, sid, fid)
            .then(data => {
                console.log("loaded folder content")
               
                let tmp = cache && cache.folders ? cache.folders : {};
                tmp[fid] = data;
                setCache({folders: tmp, ...cache});
            })
            .catch(err => 
            {
                if (err.response && err.response.status == 401) {
                    setToken();
                }
            });
    }

    useEffect(() => {
        if (!cache.syncpoints) {
            loadSyncpoints();
        }   else {
            if (sid && fid) {
                if (cache.folders && cache.folders[fid]) {
                    return;
                }
    
                loadFolder(sid, fid);
            }
        }
    },[sid, fid, cache]);

    // TODO: add error handling show an error message
    return (
        <>
            <div className='row bg-dark text-white p-3 mb-2'>
                <div className='col-md'>
                    <h4 className='my-0 font-weight-normal'>Item</h4>
                </div>
                <div className='col-md-3'>
                    <h4 className='my-0 font-weight-normal'>Modified</h4>
                </div>
                <div className='col-md-2'>
                    <h4 className='my-0 font-weight-normal'>Size</h4>
                </div>
            </div>
            <List cache={cache} folderId={fid} />
        </>
    );
}

export default Browser;