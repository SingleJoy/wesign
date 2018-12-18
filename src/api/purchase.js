/* 登录充值购买套餐 */
import request from '../utils/fetch'

/* 套餐列表 */
export function getGoods(){
  return request({
    url: "api/v1.7/goods/getGoods",
    method: "post",
    params: ''
  })
}

/* 购买 */
export function buyGoods(interfaceCode,param){
  return request({
    url: "api/v1.7/goods/"+interfaceCode+"/buyGoods",
    method: "post",
    data: param
  })
}

/* 查询购买记录 */
export function getOrderList(interfaceCode,param){
  return request({
    url: "api/v1.7/tenant/"+interfaceCode+"/getOrderList",
    method: "get",
    params: param
  })
}

// 支付宝
export function aliPay(param) {
  return request({
    url: "api/aliPay/pcPay",
    method: "post",
    data: param
  })
}

//支付宝回调
export function aliPayReturn(param) {
  return request({
    url: "api/alipay/returnUrl",
    method: "get",
    params: param
  })
}


// 微信
export function wxpay(param) {
  return request({
    url: "api/wxpay/scanCode",
    method: "post",
    data: param
  })
}

//轮询微信支付成功状态

export function getWxpayStatus(param) {
  return request({
    url: "api/getWxpayStatus",
    method: "post",
    data: param
  })
}
