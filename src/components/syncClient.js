import axios from 'axios';

// TODO convert to class  or single object


const client = axios.create({
    baseURL: 'https://api.syncplicity.com/'
});

function handleError(err) {
    console.log(`ERROR ${err.response.config.method} ${err.response.config.url} -> ${err.response.status}:${err.response.statusText} -> ${JSON.stringify(err.response.data)}`);
    
    throw err;
}

// function auth(code, clientId, clientSecret) {
//     const authToken =  Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

//     return client.post('oauth/token',
//         qs.stringify({ 
//             grant_type:'authorization_code',
//             response_type:'code',
//             code: code
//         }),
//         {
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 "Authorization": `Basic ${authToken}`
//             }
//         })
//         .then(response => response.data)
//         .catch(handleError);
// }

// function refresh(refreshToken, clientId, clientSecret) {
//     const authToken =  Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

//     return client.post('oauth/token',
//         qs.stringify({ 
//             grant_type:'refresh_token',
//             refresh_token: refreshToken
//         }),
//         {
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 "Authorization": `Basic ${authToken}`
//             }
//         })
//         .then(response => response.data)
//         .catch(handleError);
// }

function getSyncpoints(accessToken) {
    return client.get('syncpoint/syncpoints.svc',
        {
            headers: {
                'Accept': "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        })
        .then(response => response.data)
        .catch(handleError);          
}

function getFolders(accessToken, syncpointId, paretnFolderId) {

    return client.get(`sync/folder_folders.svc/${syncpointId}/folder/${paretnFolderId}/folders`,
        {
            headers: {
                'Accept': "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        })
        .then(response => response.data)
        .catch(handleError);          
}
function getFiles(accessToken, syncpointId, paretnFolderId) {
    return client.get(`sync/folder_files.svc/${syncpointId}/folder/${paretnFolderId}/files`,
    {
        headers: {
            'Accept': "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    })
    .then(response => response.data)
    .catch(handleError);   
}

function createLink(accessToken, syncpointId, virtualPath) {
    console.log({ 
        SyncPointId: syncpointId,
        VirtualPath: virtualPath
    });
    return client.post(`syncpoint/links.svc`,
        [{ 
            SyncPointId: syncpointId,
            VirtualPath: virtualPath
        }],
        {
            headers: {
                'Accept': "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        })
        .then(response => {
            console.log(response.status);
            console.log(response.statusText);

            return response;
        })
        .then(response => response.data)
        .catch(handleError);   
} 

export default {
    // oauth : {
    //     auth: auth,
    //     refresh: refresh
    // },
    syncp : {
        getSyncpoints,
        getFolders,
        getFiles,
        createLink
    }
};