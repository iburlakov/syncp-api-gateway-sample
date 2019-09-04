require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    appId: process.env.APP_ID,
    appSecret: process.env.APP_SECRET,
    environment: process.env.ENVIRONMENT
};