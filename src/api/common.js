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

// exitAndDeleteSession 退出
export function exitAndDeleteSession(param){
  return request({
    url:"api/v1/tenant/exitAndDeleteSession",
    method:"get",
    params:param
  })
}

 //批量下载合同
export function downloadContracts(interfaceCode,param) {
  return request({
    url:"api/v1.7/contract/"+interfaceCode+"/downloadContracts",
    method:"post",
    data:param
  })
}
