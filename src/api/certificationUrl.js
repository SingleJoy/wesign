import request from '../utils/fetch'
const service = {
  
    //营业执照上传
    license(param) {
        return request({
            url: '/api/v1.6/tenant/creditPhotoOcr',
            method: 'post',
            params:param
        })
    },
    //身份证提交
    IdCard(param) {
        return request({
            url: '/api/v1.6/user/authentication',
            method: 'post',
            params:param
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
            url: '/api/v1/sms/sendCode',
            method: 'post',
            params:param
        })
    }

    
}
export default service;


