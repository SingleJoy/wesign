import request from '../utils/fetch'
const service = {
    //登录前验证用户
    verficate(param) {
        return request({
            url: '/api/v1/tenant',
            method: 'get',
            params:param
        })
    },
    //登录接口
    login(param,urlParam) {
        return request({
            url: '/api/v1.4/tenant/'+urlParam+'/homePage',
            method: 'get',
            params:param
        })
    },
    //模板列表
    templateList(param,interfaceCode) {
        return request({
            url:'/api/v1/tenant/'+ interfaceCode + '/templates',
            method:'get',
            params:param
        })
    },
    //查看合同详情
    contractInfo(param,interfaceCode) {
        return request({
            url:'/api/v1/tenant/'+ interfaceCode +'/contract/'+param.contractNo+'/contractimgs',
            method:'get',
            params:''
        })
    },

    /**
     * 首页概括数据请求  二级账号需要accountCode
     */

    //待我签署
    waitForMeSign(param,interfaceCode) {
        return request({
            url:'/api/v1/tenant/'+ interfaceCode +'/waitForMeSign',
            method:'get',
            params:param
        })
    },
    //待他人签署
    waitForOtherSign(param,interfaceCode) {
        return request({
            url:'/api/v1/tenant/'+ interfaceCode +'/waitForOtherSign',
            method:'get',
            params:param
        })
    },
    //已生效
    takeEffect(param,interfaceCode) {
        return request({
            url:'/api/v1/tenant/'+ interfaceCode +'/takeEffect',
            method:'get',
            params:param
        })
    },
    //已截止
    deadline(param,interfaceCode) {
        return request({
            url:'/api/v1/tenant/'+ interfaceCode +'/deadline',
            method:'get',
            params:param
        })
    },
    //首页合同列表
    contractLists(param,interfaceCode) {
        return request({
            url:'/api/v1.4/tenant/'+ interfaceCode +'/homePageContractLists',
            method:'get',
            params:param
        })
    },
    //筛选查询合同列表
    queryContractLists(interfaceCode) {
        return request({
            url:'/api/v1.5/tenant/'+interfaceCode+'/getAccounts',
            method:'get',
            params:''
        })
    },
    //获取详情页账户名
    getAccountName(param,interfaceCode) {
        return request({
            url:'/api/v1.5/tenant/'+interfaceCode+'/getAccountName',
            method:'get',
            params:param
        })
    },
     //获取模板列表
    contractTemplate(param,accountCode) {
        return request({
            url:'/api/v1.5/tenant/'+accountCode+'/getAccountTemplates',
            method:'get',
            params:param
        })
    },


















  //查询企业银行信息接口
  getBank(param,interfaceCode){
      return request({
        url:'/api/v1.4/tenant/'+interfaceCode+'/getBank',
        method:'get',
        params:''
      })
  },
  //打款金额接口
  moneyStatus(param,interfaceCode){
     return request({
       url:'/api/wesign/v1.6/tenant/'+interfaceCode+'/moneyStatus',
       method:'get',
       params:''
     })
  },
  // 查询打款进度
  verifyRemittance(param,interfaceCode){
    return request({
      url:'/api/wesign/v1.6/tenant/'+interfaceCode+'/verifyRemittance',
      method:'get',
      params:parmas
    })
  },

  authSuccess(param,interfaceCode){
    return request({
      url:'/api/v1.4/tenant/'+interfaceCode+'/authSuccess',
      method:'get',
      params:parmas
    })
  },



}
export default service;


