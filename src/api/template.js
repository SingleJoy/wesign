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
export function getTemplateImgs(interfaceCode,templateNo,param) {
  return request({
    url: "api/v1/tenant/"+interfaceCode+'/template/'+templateNo+'/getTemplateImgs',
    method: "get",
    params:param
  })
}

//contractTemp
export function contractTemp(interfaceCode,param) {
  return request({
    url: "api/v1/tenant/"+interfaceCode+'/contractTemp',
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
    url: "api/v1/tenant/"+interfaceCode+'/template/'+templateNo+'/getTemplateValAndImgs?accountCode='+accountCode,
    method: "get",
    params:''
  })
}

// template
export function template(interfaceCode,param) {
  return request({
    url: "api/v1/tenant/"+interfaceCode+'/template',
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



export function contractmoresign(interfaceCode,contractNo,param) {
  return request({
    url: "api/v1/tenant/"+interfaceCode+'/user/'+interfaceCode+'/contractmoresign/'+contractNo,
    method: "post",
    data: param
  })
}

// 订单列表查询
export function getcontractorders(accountCode,param) {
  return request({
    url: "api/v1.9/account/"+accountCode+'/conorder/getcontractorders',
    method: "get",
    params: param
  })
}

//批量上传发起流程 api 

//模板excel下载
export function downloadTemplateExcel(templateNo) {
    return "v1.9/tenant/" + templateNo + "/downloadTemplateExcel"
}

//模板excel上传(解析校验)
export function readTemplateExcel(params) {
    return request({
        url: "v1.9/tenant/readTemplateExcel",
        method: "post",
        data: params
    })
}

//模板excel再次上传(解析校验)
export function RepeatedlyReadExcel(params) {
    return request({
        url: "v1.9/tenant/RepeatedlyReadExcel",
        method: "post",
        data: params
    })
}

//错误excel下载
export function downloadErrorExcel(orderNo, params) {
    return request({
        url: "v1.9/tenant/" + orderNo + "/downloadErrorExcel",
        method: "post",
        data: params
    })
}

