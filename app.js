const express = require('express');
const path = require('path')

const config = require('./config');
const storage = require('./storage');
const client = require('./syncpClient');
const {handleError} = require('./common');

app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

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

app.get('/app', (req, res) => {

});

app.get('/syncpoints/:email', (req, res) => {
    const token =  storage[req.params.email];

    const accessToken =  token.access_token;

    client.syncp.syncpoints(accessToken)
        .then(syncpoints => {
            res.status(200).send(syncpoints.map((sp, i, arr) => {return {id: sp.Id, name: sp.Name};}));
        })
        .catch(err => handleError(res, err));
});

module.exports = app;