/* 我的账户、实名认证相关组件 */
import request from '../utils/fetch'

export function getDate(){
    return request({
        url: "/api/v1.5/user/getDate",
        method: "get",
        params: '' 
    })
}