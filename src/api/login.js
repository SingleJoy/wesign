import request from '../utils/fetch'
// import axios from 
const service = {
    login(param) {
        console.log(param)
        return request({
            url: '/api/v1/tenant',
            method: 'get',
            params:param
        })
    },
}
export default service;


