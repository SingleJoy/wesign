/* 模板发起接口 */
import request from "../utils/fetch";


//模板信息填充  页面回退  数据回显
export function backContractTempSigner(interfaceCode,param) {
  return request({
    url: "api/v1/tenant/"+interfaceCode+'/backContractTempSigner',
    method: "get",
    params: param
  })
}

//getTemplateImags
export function getTemplateImags(interfaceCode,templateNo,param) {
  return request({
    url: "api/v1/tenant/"+interfaceCode+'/template/'+templateNo+'/getTemplateImags',
    method: "get",
    params:param
  })
}

//contractTemp
export function contractTemp(interfaceCode,param) {
  return request({
    url: "api/v1/tenant/"+interfaceCode+'/contractTemp/',
    method: "post",
    data:param
  })
}
// userInfo  模板填充信息
export function userInfo(interfaceCode,contractNo) {
  return request({
    url: "api/v1/tenant/"+interfaceCode+'/batchSign/'+contractNo+'/userInfo',
    method: "get",
    params:''
  })
}
// templateVal
export function templateVal(interfaceCode,templateNo,param) {
  return request({
    url: "api/v1/tenant/"+interfaceCode+'/template/'+templateNo+'/templateVal',
    method: "get",
    params:param
  })
}

//templateBatchSign
export function templateBatchSign(interfaceCode,param) {
  return request({
    url: "api/v1/tenant/"+interfaceCode+'/templateBatchSign',
    method: "post",
    data:param
  })
}

// getTemplateValAndImgs
export function getTemplateValAndImgs(interfaceCode,templateNo,accountCode) {
  return request({
    url: "api/v1/tenant/"+interfaceCode+'/template/'+templateNo+'/getTemplateValAndImgs/?accountCode='+accountCode,
    method: "get",
    params:''
  })
}

// template
export function template(interfaceCode,param) {
  return request({
    url: "api/v1/tenant/"+interfaceCode+'/template/',
    method: "post",
    data:param
  })
}

// contracttempimgs
export  function contracttempimgs(interfaceCode,contractNo) {
  return request({
    url: "api/v1/tenant/"+interfaceCode+'/contract/'+contractNo+'/contracttempimgs',
    method: "get",
    params: ''
  })
}

// contractkeywordsign
export  function contractkeywordsign(interfaceCode,contractNo) {
  return request({
    url: "api/v1/tenant/"+interfaceCode+'/user/'+interfaceCode+'/contractkeywordsign/'+contractNo,
    method: "post",
    data: ''
  })
}

//signerpositions
export  function signerpositions(interfaceCode,contractNo,param) {
  return request({
    url: "api/v1/tenant/"+interfaceCode+'/contract/'+contractNo+'/signerpositions',
    method: "post",
    data: param
  })
}
// getContractDetails
export function getContractDetails(interfaceCode,contractNo) {
  return request({
    url: "api/v1/tenant/"+interfaceCode+'/contract/'+contractNo+'/getContractDetails',
    method: "get",
    params:''
  })
}

export function contractimgs(interfaceCode,contractNo) {
  return request({
    url: "api/v1/tenant/"+interfaceCode+'/contract/'+contractNo+'/contractimgs',
    method: "get",
    params:''
  })
}

export function contractmoresign(interfaceCode,contractNo,param) {
  return request({
    url: "api/v1/tenant/"+interfaceCode+'/user/'+interfaceCode+'/contractmoresign/'+contractNo,
    method: "post",
    data: param
  })
}
