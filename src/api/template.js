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
    params:param
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
export function templateVal(interfaceCode,templateNo) {
  return request({
    url: "api/v1/tenant/"+interfaceCode+'/template/'+templateNo+'/templateVal',
    method: "get",
    params:''
  })
}

//templateBatchSign
export function templateBatchSign(interfaceCode,param) {
  return request({
    url: "api/v1/tenant/"+interfaceCode+'/templateBatchSign',
    method: "post",
    params:param
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
    params:param
  })
}
