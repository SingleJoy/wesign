// /**
//  *  封装 AXIOS 统一Url
//  * 
//  */
import axios from 'axios'
import {Message} from 'element-ui'
import cookie from '@/common/js/getTenant'
import router from '../../router/index'
axios.defaults.timeout = 1000;  //请求等待时间限制    初始化 
axios.defaults.baseURL ='';      //请求地址           初始化

//http request 拦截器
axios.interceptors.request.use(
  config => {
    const token = cookie.getJSON('tenant');                     //注意使用的时候需要引入cookie方法，推荐js-cookie
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type':'application/x-www-form-urlencoded'
    }
    if(token){
      config.params = {'token':token}
    }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
)

//http response 拦截器
axios.interceptors.response.use(
  response => {
    if(response.data.sessionStatus =='0'){
      router.push({
        path:"/Server",
        querry:{redirect:router.currentRoute.fullPath}                  //从哪个页面跳转
      })
    }
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)
axios.interceptors.request.use(config=> {
  config.data = JSON.stringify(config.data);
}, err=> {
  Message.error({message: '请求超时!'});
  return Promise.resolve(err);
})
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url,params){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
    .then(response => {
      resolve(response);
    })
    .catch(err => {
      reject(err)
    })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.post(url,data)
      .then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
  })
}

 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.patch(url,data)
      .then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(url,data)
      .then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
  })
}

