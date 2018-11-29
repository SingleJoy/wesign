/* 登录忘记密码 */
import request from '../utils/fetch'

/* 登录 */
export function login(param){
    return request({
        url: "/api/v1/tenant/login",
        method: "get",
        params: param
    })
}
/* 获取绑定企业 */
export function bindEnterprises(param){
    return request({
        url: "/api/v1.4/user/bindEnterprises",
        method: "get",
        params: param
    })
}
/* 主页登录 */
export function homePage(param,interfaceCode){
    return request({
        url: "/api/v1.4/tenant/"+ interfaceCode+ "/homePage",
        method: "get",
        params: param
    })
}
/* 验证用户是否存在 */
export function valitedUser(param){
    return request({
        url: "/api/v1/tenant",
        method: "get",
        params: param
    })
}


/* 验证验证码 */
export function valitedSmsCode(param){
    return request({
        url: "/api/v1.4/sms",
        method: "get",
        params: param
    })
}

/* 修改密码 */
export function changePassword(param){
    return request({
        url: "/api/v1.4/tenant/changePassword",
        method: "get",
        params: param
    })
}

/* 发送验证码 */
export function sendSmsCode(param){
    return request({
        url:"api/v1/sms/sendCode",
        method:"post",
        params:param
    })
}