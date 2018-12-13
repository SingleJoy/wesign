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
