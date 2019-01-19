/* 合同归档相关组件 */
import request from '../utils/fetch'



/* 合同归档-新增   addContractFiling */
export  function addContractFiling(interfaceCode,accountCode) {
  return request({
    url:"api/restapi/wesign/v1.7.2/tenant/"+interfaceCode+'/contract/'+accountCode+'/addContractFiling',
    method:"post",
    data:''
  })
}


/* 合同归档-新增   合同归档-重命名 */
export  function updateContractFiling(interfaceCode,accountCode,params) {
  return request({
    url:"api/restapi/wesign/v1.7.2/tenant/"+interfaceCode+'/contract/'+accountCode+'/updateContractFiling',
    method:"post",
    data:params
  })
}

/* 合同归档-新增   合同归档-删除 */
export  function deleteContractFiling(interfaceCode,accountCode,params) {
  return request({
    url:"api/restapi/wesign/v1.7.2/tenant/"+interfaceCode+'/contract/'+accountCode+'/deleteContractFiling',
    method:"post",
    data:params
  })
}

/* 合同归档- 归档分页查询 */
export function contractFilings(interfaceCode,accountCode,param) {
  return request({
    url:'api/restapi/wesign/v1.7.2/tenant/'+interfaceCode+'/contract/'+accountCode+'/contractFilings',
    method:'get',
    params:param
  })
}

/* 合同归档-归档合同 */
export function contractFiling(interfaceCode,accountCode,param) {
  return request({
    url:'api/restapi/wesign/v1.7.2/tenant/'+interfaceCode+'/contract/'+accountCode+'/contractFiling',
    method:'post',
    data:param
  })
}


