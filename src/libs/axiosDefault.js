const axios = require('axios');
const config = require('~src/config');

const axiosDefaultInstance = axios.create();

axiosDefaultInstance.defaults.withCredentials = true;
axiosDefaultInstance.defaults.headers.cookie = config.authorization.cookie;
axiosDefaultInstance.defaults.headers['User-Agent'] = config.userAgent;

module.exports = axiosDefaultInstance;
