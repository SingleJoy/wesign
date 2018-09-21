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
    

    
}
export default service;


