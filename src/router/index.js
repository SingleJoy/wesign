import Vue from 'vue'
import Router from 'vue-router'
import cookie from '@/common/js/getTenant'
//b2c
import User from '../components/Login/User.vue'                                   //登录
import Forget from '../components/Login/Forget.vue'                               //忘记密码
import FoundUser from '../components/Login/FoundUser.vue'

import Role from '../components/Login/Role.vue'                                  //登录角色选择
                      

import Home from '../components/Home/Home.vue'                                    //主页
import Contract from '../components/Contract/Contract.vue'                        //点击签署
import Contractsigning from '../components/Contractsigning/Contractsigning.vue'   //签署设置页面
import Complete from '../components/Complete/Complete.vue'                        //签署成功页面
import Multiparty from '../components/Template/Multiparty/Multiparty.vue'         //选择单人或批量签署
import Positions from '../components/Positions/Positions.vue'                     //多位置签署页面
import Error from '../common/components/Error.vue'                                //服务器繁忙
import Server from '../common/components/Server.vue'                              //登陆失效页面
import Mycontract from '../components/Mycontract/Mycontract.vue'                  //我的合同
import Room from '../components/Room/Room.vue'                                    //签约室
import ContractInfo from '../components/ContractInfo/ContractInfo.vue'            //合同详情
import Signaturesetting from '../components/Templatelaunch/Signaturesetting/Signaturesetting.vue'//模板签署设置
import Contractsign from '../components/Templatelaunch/Contractsign/Contractsign.vue'  //模板合同签署
import Specifiedposition from '../components/Templatelaunch/Specifiedposition/Specifiedposition.vue'//模板指定位置
import Fillinformation from '../components/Templatelaunch/Fillinformation/Fillinformation.vue'//模板填充信息
import TotalContract from '../components/Mycontract/TotalContract.vue' // 全部合同
import InquiryWaitMe from '../components/Mycontract/InquiryWaitMe.vue' // 待我签署合同
import batchInfo from '../components/Templatebatch/batchInfo/batchInfo.vue'  //批量模板填充信息
import batchSetting from '../components/Templatebatch/batchSetting/batchSetting.vue'  //批量模板签署设置
import Templatecomplete from '../components/Templatebatch/Templatecomplete/Templatecomplete.vue'//批量模板签署完成
import Templates from '../components/Templatelaunch/TemplateSuccess/Templates.vue' //模板多位置签署完成
import batchsign from '../components/Templatebatch/batchsign/batchsign.vue'
import ContractDelay from '../components/ContractDelay/ContractDelay.vue' // 合同延期
import More from '../components/Template/More/More.vue'                   //暂无模板
import Whether from '../components/Whether/Whether.vue'                  //平台方是否签署
import Success from '../components/Success/Success.vue'                  //平台方是否签署(成功)
import TemplatePos from '../components/TemplatePos/TemplatePos.vue'                           //平台方是否签署    (模板)
import TemplateInfo from '../components/TemplateInfo/TemplateInfo.vue'             //平台方是否签署(模板成功)

//b2b
import Company from '../components/Company/Company.vue'                                           //b2b 首页
import Enterprise from '../components/Confirmation/Enterprise/Enterprise.vue'                     //企业认证
import Payment from '../components/Confirmation/Payment/Payment.vue'                              //打款
import WaitReply from '../components/Confirmation/WaitReply/WaitReply.vue'                        //等待中
import Completion from '../components/Confirmation/Completion/Completion.vue'                     //认证完成
import Account from '../components/Confirmation/Account/Account.vue'                              //个人账户(签章，账号管理)
import PersonWait from '../components/Confirmation/PersonWait/PersonWait.vue'                     //个人认证等待
import Signature from '../components/Confirmation/Signature/Signature.vue'                        //企业签署设置
import Place from '../components/Place/Place.vue'                                                 //b2b多位置
import Dimension from '../components/Dimension/Dimension.vue'                                    //b2b 二维码
import Mobile from '../components/Mobile/Canvas/Sign.vue'                                          //签名面板
import MobileSuccess from '../components/Mobile/MobileSuccess/Success.vue'                        //签名面板成功
import SignSuccess from '../components/SignSuccess/SignSuccess.vue'                               //b2b 签署成功
import CompanyExa from '../components/CompanyExa/CompanyExa.vue'                                  //b2b 合同详情
import Register from '../components/Credentials/Enterprise/Register/Register.vue'                 //b2b 注册企业
import Pupload from '../components/Credentials/Personal/Pupload/Pupload.vue'                 //b2b 个人认证（OCR）
import ErrorPupload from '../components/Credentials/Personal/ErrorPupload/ErrorPupload.vue'       //b2b 手持证件照
import Information from '../components/Credentials/Personal/Information/Information.vue'     //b2b 个人认证（三要素）
import Authentication from '../components/Credentials/Personal/Authentication/Authentication.vue'  //b2b 个人认证（三要素认证成功）
import BuyProduct from '../components/BuyProduct/BuyProduct.vue'                                   //B2B 无权限
import Merchant from '../components/Merchant/Merchant.vue'                                         //b2b 无权限首页
import Procontract from '../components/Procontract/Procontract.vue'                                //b2b 合同列表 (小b)
import CompanyContract from '../components/CompanyContract/CompanyContract.vue'                    //b2b 合同列表 （大b）
import CompanyExb from '../components/CompanyExb/CompanyExb.vue'                                   //小B详情
import CompanyExc from '../components/CompanyExc/CompanyExc.vue'                                   //合同延期
Vue.use(Router)

export const router =  new Router({

  routes: [
    {
      path: '/',
      name: 'User',
      component: User
    },
    {
      path: '/Forget',
      name: 'Forget',
      component: Forget
    },
    {
      path: '/FoundUser',
      name: 'FoundUser',
      component: FoundUser
    },
    {
      path:'/Role',
      name:'Role',
      component: Role
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Contract',
      name: 'Contract',
      component: Contract
    },
    {
      path: '/Contractsigning',
      name: 'Contractsigning',
      component: Contractsigning
    },
    {
      path: '/Complete',
      name: 'Complete',
      component: Complete
    },
    {
      path: '/Multiparty',
      name: 'Multiparty',
      component: Multiparty
    },
    {
      path: '/Positions',
      name: 'Positions',
      component: Positions
    },
    {
      path: '/Error',
      name: 'Error',
      component: Error
    },
    {
      path: '/Server',
      name: 'Server',
      component: Server
    },
    {
      path: '/Mycontract',
      name: 'Mycontract',
      component: Mycontract,
    },
    {
      path: '/Room',
      name: 'Room',
      component: Room
    },
    {
      path: '/ContractInfo',
      name: "/ContractInfo",
      component: ContractInfo
    },
    {
      path: '/Signaturesetting',
      name: 'Signaturesetting',
      component: Signaturesetting
    },
    {
      path: '/Contractsign',
      name: 'Contractsign',
      component: Contractsign
    },
    {
      path: '/Specifiedposition',
      name: 'Specifiedposition',
      component: Specifiedposition
    },
    {
      path: '/Fillinformation',
      name: 'Fillinformation',
      component: Fillinformation
    },
    {
      path: '/Templatecomplete',
      name: 'Templatecomplete',
      component: Templatecomplete
    },
    {
      path: '/batchInfo',
      name: 'batchInfo',
      component: batchInfo
    },
    {
      path: '/batchSetting',
      name: 'batchSetting',
      component: batchSetting
    },
    {
      path: '/batchsign',
      name: 'batchsign',
      component: batchsign
    },
    {
      path: '/ContractDelay',
      name: 'ContractDelay',
      component: ContractDelay
    },
    {
      path: '/More',
      name: 'More',
      component: More
    },
    {
      path: '/Templates',
      name: 'Templates',
      component:Templates
    },
    {
      path: '/Whether',
      name: 'Whether',
      component:Whether
    },
    {
      path: '/Success',
      name: 'Success',
      component:Success
    },
    {
      path: '/TemplateInfo',
      name: 'TemplateInfo',
      component:TemplateInfo
    },
    {
      path: '/TemplatePos',
      name: 'TemplatePos',
      component:TemplatePos
    },
    {
      path: '/Company',
      name: 'Company',
      component:Company
    },
    {
      path: '/Enterprise',
      name: 'Enterprise',
      component: Enterprise
    },
    {
      path: '/Payment',
      name: 'Payment',
      component: Payment
    },
    {
      path: '/WaitReply',
      name: 'WaitReply',
      component: WaitReply
    },
    {
      path: '/Completion',
      name: 'Completion',
      component: Completion
    },
    {
      path: '/Account',
      name: 'Account',
      component: Account
    },
    {
      path: '/PersonWait',
      name: 'PersonWait',
      component: PersonWait
    },
    {
      path: '/Signature',
      name: 'Signature',
      component: Signature
    },
    {
      path: '/Place',
      name: 'Place',
      component: Place
    },
    {
      path: '/Dimension',
      name: 'Dimension',
      component: Dimension
    },
    {
      path: '/Mobile',
      name: 'Mobile',
      component: Mobile
    },
    {
      path: '/MobileSuccess',
      name: 'MobileSuccess',
      component: MobileSuccess
    },
    {
      path: '/SignSuccess',
      name: 'SignSuccess',
      component: SignSuccess
    },
    {
      path: '/CompanyExa',
      name: 'CompanyExa',
      component: CompanyExa
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Pupload',
      name: 'Pupload',
      component: Pupload
    },
    {
      path: '/ErrorPupload',
      name: 'ErrorPupload',
      component: ErrorPupload
    },
    {
      path: '/Information',
      name: 'Information',
      component: Information
    },
    {
      path: '/Authentication',
      name: 'Authentication',
      component: Authentication
    },
    {
      path: '/BuyProduct',
      name: 'BuyProduct',
      component: BuyProduct
    },
    {
      path: '/Merchant',
      name: 'Merchant',
      component: Merchant
    },
    {
      path: '/Procontract',
      name: 'Procontract',
      component: Procontract
    },
    {
      path: '/CompanyContract',
      name: 'CompanyContract',
      component: CompanyContract
    },
    {
      path: '/CompanyExb',
      name: 'CompanyExb',
      component: CompanyExb
    },
    {
      path: '/CompanyExc',
      name: 'CompanyExc',
      component: CompanyExc
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   // 导航钩子，全局钩子
//   // console.log(to,from)
//   // if(to.name == "Home"){
//       var userInfo = cookie.getJSON('tenant')
//       if(!userInfo){
//           next('/');
//       }
//   // }
  
// })
