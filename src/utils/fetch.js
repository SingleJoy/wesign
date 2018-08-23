/**
 * auth:nw 
 * date:2018-8-22
 */

import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import {Message} from 'element-ui'

const MSG_ERROR = '服务器错误，请稍候重试';

const Axios = axios.create({
  baseURL: process.env.BASE_API,    // api的base_url
  timeout: 5000,                    // request timeout
  responseType: "json",
//   withCredentials: true,            // 是否允许带cookie这些
})
// 请求拦截
Axios.interceptors.request.use((config)=>{
    //做点什么
    return config;
  },(error)=>{
      //做点什么
    return Promise.reject(error);
  });

// 响应时拦截
Axios.interceptors.response.use((response)=> {
    //做点什么
    return response;
  },(error)=> {
    //做点什么
    return Promise.reject(error);
  });

export default Axios;

