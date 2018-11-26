import request from '../utils/fetch'

/* 合同列表 */

/* b2b 合同 */
export function b2bContrants(param,interfaceCode){
    return request({
        url: "/api/v1.4/tenant/" + interfaceCode +"/b2bContrants",
        method: "get",
        params: param 
    })
}

export function remind(param,interfaceCode,contractNum){
    return request({
        url: "/api/v1/tenant/" + interfaceCode + "/contract/" + contractNum +"/remind",
        method: "get",
        params: param
    })
}
/* b2c合同 */
export function b2cContrants(param,interfaceCode){
    return request({
        url: "/api/v1/tenant/" + interfaceCode +"/contracts",
        method: "get",
        params: param
    })
}
