/* B2C发起接口 */
import request from '../utils/fetch'


/* b2c获取合同详情 */
export function contractImg(interfaceCode,contractNo){
    return request({
        url: "/api/v1/tenant/" + interfaceCode + "/contract/"+contractNo+"/contractimgs",
        method: "get",
        params: ''
    })
}

/* 下一步 */
export function perfectContract(param,interfaceCode,contractNo){
    return request({
        url: "/api/v1/tenant/" + interfaceCode + "/contract/"+contractNo+"/perfectContract",
        method: "get",
        params: param
    })
}
/* 数据回显 */
export function echoContractInfo(interfaceCode,contractNo){
    return request({
        url: "/api/v1/tenant/" + interfaceCode + "/contract/"+contractNo+"/echoContractInfo",
        method: "get",
        params: ''
    })
}
/* 指定位置 */

export function signerpositions (param,interfaceCode,contractNo){
    return request({
        url: "/api/v1/tenant/" + interfaceCode + "/contract/"+contractNo+"/signerpositions",
        method: "post",
        data: param
    })
}

/* 签署人列表 */

export function signUser(interfaceCode,contractNo){
    return request({
        url: "/api/v1/tenant/" + interfaceCode + "/contractSignUser/"+contractNo,
        method: "get",
        params: ''
    })
}


/* 获取合同详情 */
export function contractDetail(interfaceCode,contractNo){
    return request({
        url: "/api/v1/tenant/" + interfaceCode + "/contract/"+contractNo+"/getContractDetails",
        method: "get",
        params: ''
    })
}
/* 签署链接 */

export function signLink(interfaceCode,contractNo){
    return request({
        url: "/api/v1/tenant/" + interfaceCode + "/contract/"+contractNo+"/getSignLink",
        method: "get",
        params: ''
    })
}
