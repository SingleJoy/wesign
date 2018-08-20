'use strict'

const baseURL = require('./global');
module.exports = {
  NODE_ENV: '"production"',
  API_HOST:'""+baseURL.BASE_URL+ "/restapi/wesign/"',
  VERSION:''+new Date().getTime()+''
}
