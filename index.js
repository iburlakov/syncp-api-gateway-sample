const app = require('./app');
const config = require('./config');

var fs = require('fs')
var https = require('https')

if (config.environment == 'local') {
    https.createServer({
        key: fs.readFileSync('./keys/server.key'),
        cert: fs.readFileSync('./keys/server.cert')},
        app)
        .listen(config.port, () => {
            console.log(`started at ${config.port} on https`);
        });
} else {
    app.listen(config.port, () =>{
        console.log(`started at ${config.port} on http`);
    });
}