require('dotenv').config();

module.exports = {
    port: Number.parseInt(process.env.PORT),
    appId: process.env.APP_ID,
    appSecret: process.env.APP_SECRET,
    useHttps: process.env.USE_HTTPS === 'true'
};