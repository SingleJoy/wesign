'use strict'

const baseURL = require('./global');
module.exports = {
  NODE_ENV: '"production"',
API_HOST:'"http://192.168.4.113:8080/zqsign-web-wesign/restapi/wesign/"',
//   API_HOST:'"http://testwesign.zqsign.com/restapi/wesign/"',
//   API_HOST:'"https://www.zqsign.com/restapi/wesign/"',
  VERSION:''+new Date().getTime()+''
}
