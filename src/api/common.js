import request from '../utils/fetch'



/* 验证验证码 */
export function valitedSmsCode(param){
    return request({
        url: "/api/v1.4/sms",
        method: "get",
        params: param
    })
}
/* 发送验证码 */
export function sendSmsCodefourth(param){
    return request({
        url:"api/v1.4/sms/sendCode",
        method:"post",
        params:param
    })
}

