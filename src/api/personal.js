/* B2C发起接口 */
import request from '../utils/fetch'


/* b2c获取合同详情 */
export function contractImg(interfaceCode,contractNo){
    return request({
        url: "/api/v1/tenant/" + interfaceCode + "/contract/"+contractNo+"/contractimgs",
        method: "get",
        params: ''
    })
}

/* 下一步 */
export function perfectContract(param,interfaceCode,contractNo){
    return request({
        url: "/api/v1/tenant/" + interfaceCode + "/contract/"+contractNo+"/perfectContract",
        method: "post",
        data: param
    })
}
/* 数据回显 */
export function echoContractInfo(interfaceCode,contractNo){
    return request({
        url: "/api/v1/tenant/" + interfaceCode + "/contract/"+contractNo+"/echoContractInfo",
        method: "get",
        params: ''
    })
}
/* 指定位置 */
export function signerpositions (param,interfaceCode,contractNo){
    return request({
        url: "/api/v1/tenant/" + interfaceCode + "/contract/"+contractNo+"/signerpositions",
        method: "post",
        data: param
    })
}
/* 签署人列表 */
export function signUser(interfaceCode,contractNo){
    return request({
        url: "/api/v1/tenant/" + interfaceCode + "/contractSignUser/"+contractNo,
        method: "get",
        params: ''
    })
}
/* 获取合同详情 */
export function contractDetail(interfaceCode,contractNo){
    return request({
        url: "/api/v1/tenant/" + interfaceCode + "/contract/"+contractNo+"/getContractDetails",
        method: "get",
        params: ''
    })
}
/* 签署链接 */
export function getSignLink(interfaceCode,contractNo){
    return request({
        url: "/api/v1/tenant/" + interfaceCode + "/contract/"+contractNo+"/getSignLink",
        method: "get",
        params: ''
    })
}
/* b2c签署页面get请求 */
export function b2cSignPosition(interfaceCode,contractNo){
    return request({
        url: "/api/v1/tenant/"+ interfaceCode + "/contract/"+ contractNo +"/user/"+ interfaceCode + "/signerpositions",
        method: "get",
        params: ''
    })
}
/* b2c提交签署 */
export function b2cSubmitSign(interfaceCode,contractNo,param){
    return request({
        url: '/api/v1/tenant/'+ interfaceCode + '/user/'+ interfaceCode + '/contractmoresign/'+ contractNo,
        method: "post",
        data: param
    })
}
/* b2c获取签章 */
export function signature(interfaceCode) {
    return request({
      url: "api/v1/user/"+interfaceCode+'/signature',
      method: "get",
      params: ''
    })
}
/* 签署密码验证 */
export function verifySignPassword(accountCode, param) {
    return request({
        url: "api/v1.7/tenant/account/" + accountCode + "/verifySignPassword",
        method: "POST",
        data: param
    });
}
