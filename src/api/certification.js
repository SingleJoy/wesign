import request from '../utils/fetch'
const service = {

    //营业执照上传
    license(param) {
        return request({
            url: '/api/v1.6/tenant/creditPhotoOcr',
            method: 'post',
            data:param
        })
    },
    //验证手机号
    valiteMobile(param) {
        return request({
            url: '/api/v1/tenant',
            method: 'get',
            params:param
        })
    },
    //验证码
    smsCode(param) {
        return request({
            url: '/api/v1.4/sms/sendCode',
            method: 'post',
            data:param
        })
    },
    //验证码校验
    smsValite(param) {
        return request({
            url: '/api/v1.4/sms',
            method: 'get',
            params:param
        })
    },
    //营业执照信息提交
    licenseInfo(param) {
        return request({
            url: '/api/v1.6/tenant/authentication',
            method: 'post',
            data:param
        })
    },
     //身份证提交
     IdCardInfo(param) {
        return request({
            url: '/api/v1.6/user/authentication',
            method: 'post',
            data:param
        })
    },
    //银行信息
    bankInfo(param,interfaceCode) {
        return request({
            url: '/api/v1.4/tenant/'+interfaceCode+'/bank',
            method: 'post',
            data:param
        })
    },
    //信息回显v1.6/tenant/{interfaceCode}/tenantDetails
    companyInfoDetail(param,interfaceCode) {
        return request({
            url: '/api/v1.6/tenant/'+interfaceCode+'/tenantDetails',
            method: 'get',
            params:param
        })
    },
      //登录接口
      login(param) {
        return request({
        url: '/api/v1/tenant/login',
        method: 'get',
        params: param
        })
    },
}
export default service;


