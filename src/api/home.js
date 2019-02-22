import request from '../utils/fetch'

export  function templateList(param,interfaceCode){
    return request({
        url: "/api/v1/tenant/" + interfaceCode + "/templateList",
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

export function homePageContractLists(param,interfaceCode){
    return request({
        url: "/api/v1.4/tenant/" + interfaceCode + "/homePageContractLists",
        method: "get",
        params: param
    })
}

