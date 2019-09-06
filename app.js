const express = require('express');
const path = require('path')
//const bodyParser = require('body-parser');

const config = require('./config');
const storage = require('./storage');
const client = require('./syncpClient');
const {handleError} = require('./common');

app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.use(express.json());

app.get('/login', (req, res)=> {
    res.render('pages/login', 
    {
        appId: config.appId
    });
});

app.get('/auth', (req, res) => {
    const code = req.query.code;
    client.oauth.auth(code, config.appId, config.appSecret)
        .then(token => {
            storage[token.user_email] = token;

            res.redirect(`/app/${token.user_email}`);
        })
        .catch(err => handleError(res, err));
});

app.get('/refresh/:email', (req, res) => {
    const token =  storage[req.params.email];

    client.oauth.refresh(token.refresh_token, config.appId, config.appSecret)
        .then(newToken => {
            storage[token.user_email] = newToken;

            res.redirect(`/app/${token.user_email}`);
        })
        .catch(err => handleError(res, err));
});

app.get('/app', (req, res) => {
    res.send(req.query);
});

app.get('/syncpoints/:email', (req, res) => {
    const token =  storage[req.params.email];

    const accessToken =  token.access_token;

    client.syncp.getSyncpoints(accessToken)
        .then(syncpoints => {
            res.status(200).json(syncpoints.map((sp, i, arr) => {
                return {id: sp.Id, name: sp.Name, rootFolderId: sp.RootFolderId};
            }));
        })
        .catch(err => handleError(res, err));
});

app.get('/folders/:email/:syncpointId/:folderId', (req, res) => {
    const token = storage[req.params.email];

    const accessToken =  token.access_token;

    client.syncp.getFolders(accessToken, req.params.syncpointId, req.params.folderId)
        .then(syncpoints => {
            res.status(200).send(syncpoints.map((f, i, arr) => {return {id: f.FolderId, name: f.Name};}));
        })
        .catch(err => handleError(res, err));
});

app.get('/files/:email/:syncpointId/:folderId', (req, res) => {
    const token = storage[req.params.email];

    const accessToken =  token.access_token;

    client.syncp.getFiles(accessToken, req.params.syncpointId, req.params.folderId)
    .then(syncpoints => {
        res.status(200).send(syncpoints.map((f, i, arr) => {return {id: f.FileId, name: f.Filename};}));
    })
    .catch(err => handleError(res, err));
});

app.get('/link/:email', (req, res) => {

    res.send(req.params.email);
 });

app.post('/link/:email', (req, res) => {
    const token = storage[req.params.email];
    const data = req.body;

    const accessToken =  token.access_token;

    client.syncp.createLink(accessToken, data.syncpointId, data.virtualPath)
    .then(links => {
        res.status(200).send(links.map((l, i, a) => {
            return { 
                landingUrl: l.LandingPageUrl,
                downlaodUrl: l.DownloadUrl
            };
        }));
    })
    .catch(err => handleError(res, err));
});

// error handling
app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});

module.exports = app;