/* B2B发起接口 */

import request from "../utils/fetch";

export function echoContractSetting(interfaceCode,contractNo) {
  return request({
    url: "/v1.4/tenant/" + interfaceCode + "/contract/"+contractNo+'/echoContractSetting',
    method: "get",
  })
}

export function contractimgs(interfaceCode,contractNo){
  return request({
    url: "/v1.4/tenant/" + interfaceCode + "/contract/"+contractNo+'/contractimgs',
    method: "get",
  })
}

export function setting(param){
  return request({
    url: "/v1.4/tenant/" + interfaceCode + "/contract/"+contractNo+'/setting',
    method: "post",
    params: param
  })
}
