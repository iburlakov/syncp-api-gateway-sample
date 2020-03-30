const express = require('express');
const path = require('path')
//const bodyParser = require('body-parser');

const config = require('./config');
//const storage = require('./storage');
//const client = require('./syncpClient');
const {handleError} = require('./common');

var cors = require('cors')
//var app = express()
const qs = require('qs');



app = express();


app.use(express.static('front'));

app.use(cors());

app.use(express.json());

// host react app in express
app.use(express.static(path.join(__dirname, '../build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.get('/noop', (req, res)=> {
    console.log(process.env.NODE_ENV);
    res.status("200").send('OK');
});

const axios = require('axios');
const client = axios.create({
    baseURL: 'https://api.syncplicity.com/'
});


app.post('/api/auth', (req, res) => {
    const code =  req.body.code;
    console.log(req.body);
    console.log(req.body.code);
    console.log(config.appId);
    console.log(config.appSecret);

    auth(code, config.appId, config.appSecret)
        .then(token => {
            //storage[token.user_email] = token;
            console.log('got token' + token);
            res.send(token).status(200);
        })
        .catch(err => {

            console.log(err.message);
            res.status(500).send(err.message);
        });
});

app.get('api/refresh/:email', (req, res) => {
    // TODO: store refresh token in strorage
    res.status(501);
 });

function handleErrorI(err) {
    console.log(`ERROR ${err.response.config.method} ${err.response.config.url} -> ${err.response.status}:${err.response.statusText} -> ${JSON.stringify(err.response.data)}`);
    
    throw err;
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
        .then(response => response.data)
        .catch(handleErrorI);
}

function refresh(refreshToken, clientId, clientSecret) {
    const authToken =  Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    return client.post('oauth/token',
        qs.stringify({ 
            grant_type:'refresh_token',
            refresh_token: refreshToken
        }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Authorization": `Basic ${authToken}`
            }
        })
        .then(response => response.data)
        .catch(handleErrorI);
}

// app.get('/refresh/:email', (req, res) => {
//     const token =  storage[req.params.email];

//     client.oauth.refresh(token.refresh_token, config.appId, config.appSecret)
//         .then(newToken => {
//             storage[token.user_email] = newToken;

//             res.redirect(`/app/${token.user_email}`);
//         })
//         .catch(err => handleError(res, err));
// });

// app.get('/app_old', (req, res) => {
//     res.send(req.query);
// });

// app.get('/syncpoints/:email', (req, res) => {
//     const token =  storage[req.params.email];

//     const accessToken =  token.access_token;

//     client.syncp.getSyncpoints(accessToken)
//         .then(syncpoints => {
//             res.status(200).json(syncpoints.map((sp, i, arr) => {
//                 return {id: sp.Id, name: sp.Name, rootFolderId: sp.RootFolderId};
//             }));
//         })
//         .catch(err => handleError(res, err));
// });

// app.get('/folders/:email/:syncpointId/:folderId', (req, res) => {
//     const token = storage[req.params.email];

//     const accessToken =  token.access_token;

//     client.syncp.getFolders(accessToken, req.params.syncpointId, req.params.folderId)
//         .then(syncpoints => {
//             res.status(200).send(syncpoints.map((f, i, arr) => {return {id: f.FolderId, name: f.Name};}));
//         })
//         .catch(err => handleError(res, err));
// });

// app.get('/files/:email/:syncpointId/:folderId', (req, res) => {
//     const token = storage[req.params.email];

//     const accessToken =  token.access_token;

//     client.syncp.getFiles(accessToken, req.params.syncpointId, req.params.folderId)
//     .then(syncpoints => {
//         res.status(200).send(syncpoints.map((f, i, arr) => {return {id: f.FileId, name: f.Filename};}));
//     })
//     .catch(err => handleError(res, err));
// });

// app.get('/link/:email', (req, res) => {

//     res.send(req.params.email);
//  });

// app.post('/link/:email', (req, res) => {
//     const token = storage[req.params.email];
//     const data = req.body;

//     const accessToken =  token.access_token;

//     client.syncp.createLink(accessToken, data.syncpointId, data.virtualPath)
//     .then(links => {
//         res.status(200).send(links.map((l, i, a) => {
//             return { 
//                 landingUrl: l.LandingPageUrl,
//                 downlaodUrl: l.DownloadUrl
//             };
//         }));
//     })
//     .catch(err => handleError(res, err));
// });

// error handling
app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});

module.exports = app;