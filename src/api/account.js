/* 我的账户、实名认证相关组件 */
import request from '../utils/fetch'

export function getDate(){
    return request({
        url: "/api/v1.5/user/getDate",
        method: "get",
        params: ''
    })
}
//modifyPassword 修改密码
export function modifyPassword(param) {
  return request({
    url: "api/v1.4/tenant/modifyPassword",
    method: "post",
    data: param
  })
}

// secondAccounts 查询二级账号(数量)

export function secondAccounts(interfaceCode) {
  return request({
    url: "api/v1.5/tenant/"+interfaceCode+"/secondAccounts",
    method: "get",
    params:''
  })
}

//updateAccountStatus 更新二级账号状态
export function updateAccountStatus(interfaceCode,param) {
  return request({
    url: "api/v1.5/tenant/"+interfaceCode+"/updateAccountStatus",
    method: "post",
    data:param
  })
}
//createSignature创建新签章
export function createSignature(params) {
  return request({
    url: "api/v1.5/tenant/createSignature",
    method: "get",
    params:params
  })
}

//getSignatures 查询签章
export function getSignatures(interfaceCode) {
  return request({
    url: "api/v1.5/tenant/"+interfaceCode+"/getSignatures",
    method: "get",
    params:''
  })
}
//getSignatures 查询签章 老接口  暂时留着
export function getSignature(interfaceCode) {
  return request({
    url: "api/v1.4/tenant/"+interfaceCode+"/getSignature",
    method: "get",
    params:''
  })
}

// UpdateAccountSignature 修改签章
export function UpdateAccountSignature(interfaceCode,sealNo) {
  return request({
    url: "api/v1.5/tenant/"+interfaceCode+"/signature/"+sealNo+"/UpdateAccountSignature",
    method: "get",
    params:''
  })
}

// getCertificate  查询证书
export function getCertificate(interfaceCode) {
  return request({
    url: "api/v1.5/tenant/"+interfaceCode+"/getCertificate",
    method: "get",
    params:''
  })
}


// getAccountInformation  获取账户信息
export function getAccountInformation(accountCode) {
  return request({
    url: "api/v1.5/tenant/"+accountCode+"/getAccountInformation",
    method: "get",
    params:''
  })
}
// auditStatus  未实名查询认证状态
export function auditStatus_(interfaceCode) {
  return request({
    url: "api/v1.4/tenant/"+interfaceCode+"/auditStatus",
    method: "get",
    params:''
  })
}

// templateList 查询一级账户模板列表
export function templateList(interfaceCode) {
  return request({
    url: "api/v1/tenant/"+interfaceCode+"/templateList",
    method: "get",
    params:''
  })
}


// addAccount,新增二级账户
export function addAccount(interfaceCode,param) {
  return request({
    url: "api/v1.5/tenant/"+interfaceCode+"/addAccount",
    method: "post",
    data:param
  })
}

// updateAccount
export function updateAccount(interfaceCode,param) {
  return request({
    url: "api/v1.5/tenant/"+interfaceCode+"/updateAccount",
    method: "post",
    data:param
  })
}
// getAccountInfo  查询二级账户信息
export function getAccountInfo(interfaceCode,param) {
  return request({
    url: "api/v1.5/tenant/"+interfaceCode+"/getAccountInfo",
    method: "get",
    params:param
  })
}
// SignAuthbook  二级账号激活  签署授权书
export function SignAuthbook(param) {
  return request({
    url: "api/v1.5/user/SignAuthbook",
    method: "post",
    data:param
  })
}

//authorizerCode
export function getSignatureImg(accountCode,authorizerCode,t) {
  return request({
    url: "api/v1.4/contract/"+accountCode+'/user/'+authorizerCode+'/getSignatureImg/?=t'+t,
    method: "get",
    params:''
  })
}

//getAuthBookImg
export function getAuthBookImg(param) {
  return request({
    url:"1.5/user/getAuthBookImg",
    method: "get",
    params:param
  })
}
// qRCode 移动端签署图片二维码数据回显
export function qRCode(authorizerCode,param) {
  return request({
    url: "api/v1.4/user/"+authorizerCode+'/qRCode',
    method: "get",
    params: param
  })
}
// showSignRoomInfo
export  function showSignRoomInfo(interfaceCode) {
  return request({
    url:"api/v1/tenant/"+interfaceCode+'signRoom/showSignRoomInfo',
    method:"post",
    data:""
  })
}

//saveSignRoomName
export  function saveSignRoomName(interfaceCode,param) {
  return request({
    url:"api/v1/tenant/"+interfaceCode+'signRoom/saveSignRoomName',
    method:"get",
    params:param
  })
}
