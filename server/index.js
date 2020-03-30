const app = require ('./app');
const config = require ('./config');

var fs = require ('fs');
var https = require ('https');


const port = config.port + (process.env.NODE_ENV != "production" ?  1 : 0);
if (config.useHttps) {
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
  app.listen (port, () => {
    console.log (`started at ${port} on http`);
  });
}
