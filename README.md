This is a sample of using [Syncplicity API](https://developer.syncplicity.com/apis/) in SPA application. 

## Info

App is written in [React](https://reactjs.org/) with using [hooks](https://reactjs.org/docs/hooks-intro.html). The app is bootstrapped using [Create React App](https://github.com/facebook/create-react-app) toolchain.

For dealing with [OAuth 2.0 Authorization Code Grand](https://oauth.net/2/grant-types/authorization-code/) flow node server is used to exchange secret code and access token, without passing refresh token to the client.

## Running locally

### npm run server 
Starts node server 
### npm run client
Starts react application in separate dev server

## Environment variables

TODO

## Setup application of Syncplicity API portal

TODO


## Hosting on Heroku

I've choosed [Heroku](https://heroku.com/) to run the application, cause it's relatively chip and provides very nice git-like way to publish code.

The usual flow of publishing the changes is simple pushing changes to heroku remote via git commant line tool.



## Outdated

### Running app under HTTPS

It's possible to run node server under HTTPS, to do that:

* generate keys and certs, do not forget to add *keys* folder to *.gitignore*.

   ```shell
   mkdir -p keys; openssl req -nodes -new -x509 -keyout keys/server.key -out keys/server.cert
   ```

* start server with HTTPS support like this

    ```javascript
    var fs = require ('fs');
    var https = require ('https');
    var app = require('express')();

    https.createServer (
        {
            key: fs.readFileSync ('./keys/server.key'),
            cert: fs.readFileSync ('./keys/server.cert'),
        }, app)
        .listen (5000);

    ```
But this doe not make sence, since if you node serer hosts react app in development, hot reload will not work. Use proxying requests from react to server running on different port instead.