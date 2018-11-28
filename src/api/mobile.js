/* 签署面板接口 */
import request from "../utils/fetch";


//模板信息填充  页面回退  数据回显
export function saveSignatureImg(signToken,param) {
  return request({
    url: "api/v1.4/signToken/"+signToken+'/saveSignatureImg',
    method: "post",
    params: param
  })
}
