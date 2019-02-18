/* 签署面板接口 */
import request from "../utils/fetch";


//移动端签署面板  签署成功后提交签署图片
export function saveSignatureImg(signToken,param) {
  return request({
    url: "api/v1.4/signToken/"+signToken+'/saveSignatureImg',
    method: "post",
    data: param
  })
}
