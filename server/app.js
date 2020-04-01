const express = require('express');
const path = require('path')

const axios = require('axios');
var cors = require('cors')
const qs = require('qs');

const config = require('./config');

const authApiClient = axios.create({
    baseURL: 'https://api.syncplicity.com/'
});

app = express();

// TODO: remove this in production environment
app.use(cors());

app.use(express.json());

app.get('/api/noop', (req, res)=> {
    res.status("200").send('NoOp');
});

app.post('/api/auth', (req, res) => {
    const code = req.body.code;

    const appIdPlusAppSecret =  Buffer.from(`${config.appId}:${config.appSecret}`).toString('base64');

    authApiClient.post('oauth/token',
        qs.stringify({ 
            grant_type:'authorization_code',
            response_type:'code',
            code: code
        }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Authorization": `Basic ${appIdPlusAppSecret}`
            }
        })
        .then(response => response.data)
        .then(token => {
            // TODO: make sure that client doesn't get refresh token
            res.send(token).status(200);
        })
        .catch(err => {
            res.status(500).send(err.message);
        });
});

app.get('api/refresh/:email', (req, res) => {
    res.status(501);

    /* TODO: to implement refresh method, refresh token has to be persisted
    const refreshToken = ???;
    const appIdPlusAppSecret =  Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    return authApiClient.post('oauth/token',
        qs.stringify({ 
            grant_type:'refresh_token',
            refresh_token: refreshToken
        }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Authorization": `Basic ${appIdPlusAppSecret}`
            }
        })
        .then(response => res.send(response.data).status(200))
        .catch(err => res.status(500).send(err.message)); */
 });

// host react app in express
app.use(express.static(path.join(__dirname, '../build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// error handling
app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});

// start the server
const port = config.port + (process.env.NODE_ENV != "production" ?  1 : 0);
app.listen (port, () => console.log (`Started at ${port} on http`));