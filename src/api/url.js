import request from '../utils/fetch'
import cookie from '@/common/js/getTenant'
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
    }

}
export default service;


