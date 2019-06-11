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

// contractkeywordsign 一键签署和单个签署
export  function contractkeywordsign(interfaceCode,contractNo) {
  return request({
    url: "api/v1/tenant/"+interfaceCode+'/user/'+interfaceCode+'/contractkeywordsign/'+contractNo,
    method: "post",
    data: ''
  })
}

// contractkeywordsign 一键签署和单个签署
export  function signleKeyWordSign(interfaceCode,contractNo) {
    return request({
      url: "api/v1.9/tenant/"+interfaceCode+'/user/'+interfaceCode+'/contract/'+contractNo +'/contractkeywordsign',
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
//订单是否被操作
export function getconorderlock(accountCode,conOrderNo) {
    let t=Math.random();
   return request({
    url: "api/v1.9/account/"+accountCode+'/conorder/'+conOrderNo+'/getconorderlock?t='+t,
    method: "get",
    params: ''
  })
}
//订单合同列表查询
export function getcontracts(accountCode,conOrderNo,params) {
    return request({
        url: "api/v1.9/account/"+accountCode+'/conorder/'+conOrderNo+'/getcontracts',
        method: "get",
        params: params
    })
}
// / 一键签署页面
export function contractkeywordsignNew(interfaceCode, conOrderNo, params) {
    return request({
        url: "api/v1.9/tenant/"+interfaceCode+'/contractkeywordsign/'+conOrderNo,
        method: "post",
        data: params,
        headers:{ 'Content-Type': 'application/json'},
        qs: "qs"
    })
}

//批量上传发起流程 api 

//模板excel下载
export function downloadTemplateExcel(templateNo) {
    return "api/v1.9/tenant/" + templateNo + "/downloadTemplateExcel"
}

//模板excel上传(解析校验)
export function readTemplateExcel(params) {
    return request({
        url: "api/v1.9/tenant/readTemplateExcel",
        method: "post",
        data: params
    })
}

//查询模板信息
export function getContractOrder(params) {
    return request({
        url: "api/v1.9/order/getContractOrder",
        method: "get",
        params: params
    })
}

//查询签署人信息/查询合同信息
export function getContractList(params) {
    return request({
        url: "api/v1.9/order/getContractList",
        method: "get",
        params: params
    })
}

//生成合同
export function createContract(interfaceCode, params) {
    return request({
        url: "api/v1.9/order/" + interfaceCode + "/createContract",
        method: "post",
        data: params
    })
}

//模板excel再次上传(解析校验)
export function RepeatedlyReadExcel(params) {
    return request({
        url: "api/v1.9/tenant/RepeatedlyReadExcel",
        method: "post",
        data: params
    })
}

//错误excel下载
export function downloadErrorExcel(orderNo) {
    return "api/v1.9/tenant/" + orderNo + "/downloadErrorExcel"
}

//合同图片预览/查看
export function getContractImages(params) {
    return request({
        url: "api/v1.9/order/getContractImages",
        method: "get",
        params: params
    })
}

//删除签署人信息
export function delContractSigner(params) {
    return request({
        url: "api/v1.9/order/delContractSigner",
        method: "post",
        data: params
    })
}

/******* 订单合同列表 *********/

//订单合同列表查询
export function getContractLists(accountCode, conOrderNo, params) {
    return request({
        url: "api/v1.9/account/" + accountCode + "/conorder/" + conOrderNo + "/getcontracts",
        method: "get",
        params: params
    })
}

// //一键签署
// export function batchContractkeywordsign(interfaceCode, conOrderNo) {
//     return request({
//         url: "api/v1.9/tenant/" + interfaceCode + "/contractkeywordsign/" + conOrderNo,
//         method: "post",
//         data: {}
//     })
// }

//轮询签署结果
export function getsignresult(interfaceCode, conOrderNo) {
    return request({
        url: "api/v1.9/tenant/" + interfaceCode + "/conorder/" + conOrderNo + "/getsignresult",
        method: "get",
        data: {}
    })
}