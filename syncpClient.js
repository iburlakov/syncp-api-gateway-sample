const axios = require('axios');
const qs = require('qs');
const config = require('./config');

const client = axios.create({
    baseURL: 'https://api.syncplicity.com/'
});

function handleError(response) {
    if (response.status != 200) {
        throw new Error(`${response.status}: ${respomse.statusText}`)
    }

    return response.data;
}

function auth(code, clientId, clientSecret) {
    const authToken =  Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    return client.post('oauth/token',
        qs.stringify({ 
            grant_type:'authorization_code',
            response_type:'code',
            code: code
        }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Authorization": `Basic ${authToken}`
            }
        })
        .then(handleError);
}

function getSyncpoints(accessToken) {
    return client.get('syncpoint/syncpoints.svc',
        {
            headers: {
                'Accept': "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        })
        .then(handleError);          
}


module.exports = {
    oauth : {
        auth: auth
    },
    syncp : {
        syncpoints: getSyncpoints
    }
};