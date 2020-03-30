const app = require ('./app');
const config = require ('./config');

var fs = require ('fs');
var https = require ('https');

const port = Number.parseInt(config.port) + 1;

if (config.useHttps && false) {
  https
    .createServer (
      {
        key: fs.readFileSync ('./keys/server.key'),
        cert: fs.readFileSync ('./keys/server.cert'),
      },
      app
    )
    .listen (port, () => {
      console.log (`started at ${port} on https`);
    });
} else {
  app.listen (port + 1, () => {
    console.log (`started at ${port} on http`);
  });
}
