/* 合同归档相关组件 */
import request from '../utils/fetch'



/* 合同归档-新增   addContractFiling */
export  function addContractFiling(interfaceCode,accountCode) {
  return request({
    url:"api/restapi/wesign/v1.7.2/tenant/"+interfaceCode+'/contract/'+accountCode+'/addContractFiling',
    method:"get",
    data:''
  })
}


/* 合同归档-新增   合同归档-重命名 */
export  function updateContractFiling(interfaceCode,accountCode,params) {
  return request({
    url:"api/restapi/wesign/v1.7.2/tenant/"+interfaceCode+'/contract/'+accountCode+'/updateContractFiling',
    method:"get",
    data:params
  })
}

/* 合同归档-新增   合同归档-删除 */
export  function deleteContractFiling(interfaceCode,accountCode,params) {
  return request({
    url:"api/restapi/wesign/v1.7.2/tenant/"+interfaceCode+'/contract/'+accountCode+'/deleteContractFiling',
    method:"get",
    data:params
  })
}

