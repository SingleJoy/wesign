'use strict'

const baseURL = require('./global');

module.exports = {
  NODE_ENV: '"production"',
  // API_HOST:''+baseURL.BASE_URL+'/restapi/wesign/',
  API_HOST:'"http://192.168.1.15:8080/zqsign-web-wesign/restapi/wesign/"',
  // API_HOST:'http://192.168.1.15:8080/zqsign-web-wesign/restapi/wesign/',
  VERSION:''+new Date().getTime()+''
}
