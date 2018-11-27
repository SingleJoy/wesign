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
export function b2bDetail(contractNum){
    return request({
        url: "/api/v1.4/contract/" + contractNum +"/signFinish",
        method: "get",
        params: '' 
    })
}
/* b2b合同图片 */
export function b2bImgs(interfaceCode,contractNum){
    return request({
        url: "/api/v1.4/tenant/" + interfaceCode +'/contract/' + contractNum +"/contractimgs",
        method: "get",
        params: '' 
    })
}


/* b2c 合同详情 */
export function b2cContrantsDetail(interfaceCode,contractNo){
    return request({
        url: "/api/v1/tenant/" + interfaceCode +'/contract/'+ contractNo+"/getContractDetails",
        method: "get",
        params: '' 
    })
}
/* b2c合同图片 */
export function b2cImgs(interfaceCode,contractNum){
    return request({
        url: "/api/v1/tenant/" + interfaceCode + '/contract/' + contractNum +"/contractimgs",
        method: "get",
        params: '' 
    })
}


/* 签署历史 */
export function contractSignUserInfo(param,contractNum){
    return request({
        url: "/api/v1.4/contract/" + contractNum +"/contractSignUserInfo",
        method: "get",
        params: param
    })
}

/* 提醒 */
export function remind(param,interfaceCode,contractNum){
    return request({
        url: "/api/v1/tenant/" + interfaceCode + "/contract/" + contractNum +"/remind",
        method: "get",
        params: param
    })
}


