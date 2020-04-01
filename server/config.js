require('dotenv').config();

module.exports = {
    port: Number.parseInt(process.env.PORT),
    apiHost: process.env.API_HOST,
    appId: process.env.APP_ID,
    appSecret: process.env.APP_SECRET
};