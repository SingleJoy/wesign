/* 合同详情接口 */

import request from '../utils/fetch'

/* b2b 合同详情 */
export function b2bContrants(param,interfaceCode){
    return request({
        url: "/api/v1.4/tenant/" + interfaceCode +"/b2bContrants",
        method: "get",
        params: param
    })
}
/* b2b详情 */
export function signFinish(contractNo){
    return request({
        url: "/api/v1.4/contract/"+ contractNo +"/signFinish?t="+new Date().getTime(),
        method: "get",
        params: ''
    })
}



/* b2c 合同详情 */
export function getContractDetails(interfaceCode,contractNo,t){
    return request({
      url: "/api/v1/tenant/" + interfaceCode + "/contract/"+contractNo+"/getContractDetails?t="+t,
        method: "get",
        params: ''
    })
}
/* b2c合同图片 */
export function contractimgs(interfaceCode,contractNo,t){
    return request({
        url: "/api/v1/tenant/" + interfaceCode + '/contract/' + contractNo +"/contractimgs?t="+t,
        method: "get",
        params: ''
    })
}

// b2b合同图片
export function b2bContractimgs(interfaceCode,contractNo,t){
    return request({
        url: "/api/v1.4/tenant/" + interfaceCode + '/contract/' + contractNo +"/contractimgs?t="+t,
        method: "get",
        params: ''
    })
}

/* 签署历史 */
export function contractSignUserInfo(param,contractNo){
    return request({
        url: "/api/v1.4/contract/" + contractNo +"/contractSignUserInfo",
        method: "get",
        params: param
    })
}

/* 提醒 */
export function remind(param,interfaceCode,contractNo){
    return request({
        url: "/api/v1/tenant/" + interfaceCode + "/contract/" + contractNo +"/remind",
        method: "get",
        params: param
    })
}

// updateContractTime  修改签署日期
export function updateContractTime(param,interfaceCode,contractNo){
  return request({
    url: "/api/v1/tenant/"+interfaceCode+"/contract/"+contractNo+"/updateContractTime",
    method: "post",
    data: param
  })
}


