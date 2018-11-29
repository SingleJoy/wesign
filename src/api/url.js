import request from '../utils/fetch'
const service = {
  //登录前验证用户
  verficate(param) {
    return request({
      url: "/api/v1/tenant",
      method: "get",
      params: param
    });
  },
  sendCode(param){
    return request({
      url: "/api/v1.4/sms/sendCode",
      method: "post",
      params: param
    });
  },
  //图形验证码获取token
  getImgToken(param){
    return request({
      url: "/api/v1.6/sms/sendToken",
      method: "get",
      params: param
    });
  },
  //登录接口
  login(param, urlParam) {
    return request({
      url: "/api/v1.4/tenant/" + urlParam + "/homePage",
      method: "get",
      params: param
    });
  },
  //模板列表
  templateList(param, interfaceCode) {
    return request({
      url: "/api/v1/tenant/" + interfaceCode + "/templates",
      method: "get",
      params: param
    });
  },
  //查看合同详情
  contractInfo(param, interfaceCode) {
    return request({
      url:
      "/api/v1/tenant/" +
      interfaceCode +
      "/contract/" +
      param.contractNo +
      "/contractimgs",
      method: "get",
      params: ""
    });
  },

  /**
   * 首页概括数据请求  二级账号需要accountCode
   */

  //待我签署
  waitForMeSign(param, interfaceCode) {
    return request({
      url: "/api/v1/tenant/" + interfaceCode + "/waitForMeSign",
      method: "get",
      params: param
    });
  },
  //待他人签署
  waitForOtherSign(param, interfaceCode) {
    return request({
      url: "/api/v1/tenant/" + interfaceCode + "/waitForOtherSign",
      method: "get",
      params: param
    });
  },
  //已生效
  takeEffect(param, interfaceCode) {
    return request({
      url: "/api/v1/tenant/" + interfaceCode + "/takeEffect",
      method: "get",
      params: param
    });
  },
  //已截止
  deadline(param, interfaceCode) {
    return request({
      url: "/api/v1/tenant/" + interfaceCode + "/deadline",
      method: "get",
      params: param
    });
  },
  //小B
  bwaitForMeSign(param,interfaceCode){
    return request({
      url: "/api/v1.4/tenant/" + interfaceCode + "/waitForMeSign",
      method: "get",
      params: param
    })
  },
  bwaitForOtherSign(param,interfaceCode){
    return request({
      url: "/api/v1.4/tenant/" + interfaceCode + "/waitForOtherSign",
      method: "get",
      params: param
    })
  },
  btakeEffect(param,interfaceCode){
    return request({
      url: "/api/v1.4/tenant/" + interfaceCode + "/takeEffect",
      method: "get",
      params: param
    })
  },
  bdeadline(param,interfaceCode){
    return request({
      url: "/api/v1.4/tenant/" + interfaceCode + "/deadline",
      method: "get",
      params: param
    })
  },
  //首页合同列表
  contractLists(param, interfaceCode) {
    return request({
      url: "/api/v1.4/tenant/" + interfaceCode + "/homePageContractLists",
      method: "get",
      params: param
    });
  },
  //筛选查询合同列表
  queryContractLists(interfaceCode) {
    return request({
      url: "/api/v1.5/tenant/" + interfaceCode + "/getAccounts",
      method: "get",
      params: ""
    });
  },
  //获取详情页账户名
  getAccountName(param, interfaceCode) {
    return request({
      url: "/api/v1.5/tenant/" + interfaceCode + "/getAccountName",
      method: "get",
      params: param
    });
  },
  //获取模板列表
  contractTemplate(param, accountCode) {
    return request({
      url: "/api/v1.5/tenant/" + accountCode + "/getAccountTemplates",
      method: "get",
      params: param
    });
  },
  //个人注册
  individualRegister(param) {
    return request({
      url: "/api/v1.6/tenant/register",
      method: "post",
      params: param
    });
  },
  //企业注册
  companyRegister(param) {
    return request({
      url: "/api/v1.4/tenant/register",
      method: "post",
      params: param
    });
  },

  //验证码
  smsCode(param) {
    return request({
      url: "/api/v1.6/sms/sendCode",
      method: "post",
      params: param
    });
  },
  //验证码 微签1.6之前老接口使用
  smsCodeOld(param) {
    return request({
      url: "/api/v1.4/sms/sendCode",
      method: "post",
      params: param
    });
  },
  //查询企业注册
  getCompanyRegister(interfaceCode) {
    return request({
      url: "/api/v1.4/tenant/" + interfaceCode + "/userIsExist",
      method: "get"
      //params: param
    });
  },

  //查询企业银行信息接口
  getBank(interfaceCode) {
    return request({
      url: "/api/v1.4/tenant/" + interfaceCode + "/getBank",
      method: "get"
    });
  },
  //打款金额接口
  moneyStatus(interfaceCode) {
    return request({
      url: "/api/v1.6/tenant/" + interfaceCode + "/moneyStatus",
      method: "get",
      params: ""
    });
  },
  // 查询打款进度
  verifyRemittance(param, interfaceCode) {
    return request({
      url: "/api/v1.6/tenant/" + interfaceCode + "/verifyRemittance",
      method: "post",
      params: param
    });
  },
  // 查询认证完成商户信息
  authSuccess(interfaceCode) {
    // console.log(interfaceCode);
    return request({
      url: "/api/v1.4/tenant/" + interfaceCode + "/authSuccess",
      method: "get",
      params: ""
    });
  },
  //解冻打款验证
  unfreezeRemittance(param) {
    return request({
      url: "/api/v1.6/tenant/unfreezeRemittance",
      method: "post",
      params: param
    });
  },
  //10次发起验证
  authorityUpload(param,interfaceCode) {
    return request({
      url: "/api/v1.6/tenant/" + interfaceCode + "/conNum",
      method: "get",
      params: param
    });
  },

  //注册链接获取手机号/
  getUrlMobile(interfaceCode) {
    return request({
      url: "/api/v1.4/tenant/" + interfaceCode + "/userIsExist",
      method: "get",
      params: ""
    });
  },
  //企业绑定
  bindEnterpress(mobile) {
    return request({
      url: "/api/v1.4/tenant/register",
      method: "post",
      params: mobile
    });
  },

  //校验验证码
  valiteSmsCode(param) {
    return request({
      url: "/api/v1.4/sms",
      method: "get",
      params: param
    });
  },
  queryStatementList(param, interfaceCode) {
    return request({
      url: "/api/v1.6/tenant/" + interfaceCode + "/getAllWesignBill",
      method: "get",
      params: param
    });
  },
  //个人账户 -> 费用中心 -> 充值记录
  rechargeRecord(param, interfaceCode) {
    return request({
      url: "/api/v1.6/tenant/" + interfaceCode + "/getRechargRecordPage",
      method: "get",
      params: param
    });
  },
  //个人账户->费用中心->查询对账单列表
  queryStatementList(param, interfaceCode) {
    return request({
      url: "/api/v1.6/tenant/" + interfaceCode + "/getAllWesignBill",
      method: "get",
      params: param
    });
  },
  //个人账户 -> 费用中心 -> 查询对账单详情
  queryStatementDetail(interfaceCode, billTitle) {
    return request({
      url:
      "/api/v1.6/tenant/" +
      interfaceCode +
      "/" +
      billTitle +
      "/getWesignBillDetail",
      method: "get"
    });
  },
  //个人账户 -> 费用中心 -> 查询发票列表
  queryinvoiceList(param,interfaceCode) {
    return request({
      url: "/api/v1.6/tenant/" + interfaceCode + "/getInvoiceList",
      method: "get",
      params: param
    });
  },
  queryinvoiceDetail(param,interfaceCode) {
    return request({
      url: "/api/v1.6/tenant/" + interfaceCode + "/getInvoice",
      method: "get",
      params: param
    });
  }

};
export default service;
