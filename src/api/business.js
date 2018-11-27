/* B2B发起接口 */

import request from "../utils/fetch";

// B2B发起 添加对手方企业 数据回显
export function echoContractSetting(interfaceCode,contractNo) {
  return request({
    url: "api/v1.4/tenant/" + interfaceCode + "/contract/"+contractNo+'/echoContractSetting',
    method: "get",
    params: ''
  })
}

// 查看合同图片
export function contractimgs(interfaceCode,contractNo){
  return request({
    url: "api/v1.4/tenant/" +interfaceCode + "/contract/"+contractNo+'/contractimgs',
    method: "get",
    params: ''
  })
}

// 对手方企业 信息设置
export function setting(interfaceCode,contractNo,params){
  return request({
    url: "api/v1.4/tenant/" + interfaceCode + "/contract/"+contractNo+'/setting',
    method: "post",
    params: params
  })
}

//判断对手方企业是否在微签平台已实名
export function getTenantByName(params){
  return request({
    url: "api/v1.4/tenant/async/getTenantByName",
    method: "get",
    params: params
  })
}

//B2B发起 指定为签章位置后保存签章人合同信息
export function signerpositions(interfaceCode,contractNo,param){
  return request({
    url: "api/v1.4/tenant/" +interfaceCode + "/contract/"+contractNo+'/signerpositions',
    method: "post",
    params: param
  })
}

//B2B发起 指定签章位置
export function contractSignUser(contractNo) {
  return request({
    url: "api/v1.4/contract/" + contractNo + '/contractSignUser',
    method: "get",
    params: ''
  })
}


// getSignatureImg
export function getSignatureImg(contractNo,userCode,t) {
  return request({
    url: "api/v1.4/contract/" + contractNo + '/user/'+userCode+'/getSignatureImg',
    method: "get",
    params: ''
  })
}

// getSignature
export function getSignature(interfaceCode) {
  return request({
    url: "api/v1.4/tenant/" + interfaceCode +'/getSignature',
    method: "get",
    params: ''
  })
}

// qRCode 移动端签署图片二维码数据回显
export function qRCode(userCode,param) {
  return request({
    url: "api/v1.4/user/"+userCode+'/qRCode',
    method: "get",
    params: param
  })
}

// callSignerpositions
export function callSignerpositions(interfaceCode,contractNo,userCode) {
  return request({
    url: "api/v1.4/tenant/" +interfaceCode + "/contract/"+contractNo+'/user/'+userCode+'/signerpositions',
    method: "get",
    params: ''
  })
}

//contractmoresign
export function contractmoresign(interfaceCode,userCode,contractNo,param,) {
  return request({
    url: "api/v1.4/tenant/" +interfaceCode + "/user/"+userCode+'/contractmoresign/'+contractNo,
    method: "post",
    data: param
  })
}
//签署成功

export function signFinish(contractNo) {
  return request({
    url: "api/v1.4/contract/"+contractNo+'/signFinish',
    method: "get",
    params: ''
  })
}
