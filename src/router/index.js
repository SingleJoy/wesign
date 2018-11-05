import Vue from 'vue'
import Router from 'vue-router'
import cookie from '@/common/js/getTenant'
//b2c
import User from '../components/Login/User.vue' //登录
import Forget from '../components/Login/Forget.vue' //忘记密码
import FoundUser from '../components/Login/FoundUser.vue'

import Role from '../components/Login/Role.vue' //登录角色选择
import TemplateCreate from '../components/Template/TemplateCreate.vue' //模板发起合同列表(测试合并)
import ContractList from '../components/ContractList/ContractList.vue' //合同列表（合并组件）


import Home from '../components/Home/Home.vue' //主页
import Contract from '../components/Contract/Contract.vue' //点击签署
import Contractsigning from '../components/Contractsigning/Contractsigning.vue' //签署设置页面
import Complete from '../components/Complete/Complete.vue' //签署成功页面
import Multiparty from '../components/Template/Multiparty/Multiparty.vue' //选择单人或批量签署
import Positions from '../components/Positions/Positions.vue' //多位置签署页面
import Error from '../common/components/Error.vue' //服务器繁忙
import Server from '../common/components/Server.vue' //登陆失效页面
import Mycontract from '../components/Mycontract/Mycontract.vue' //我的合同
import Room from '../components/Room/Room.vue' //签约室
import ContractInfo from '../components/ContractInfo/ContractInfo.vue' //合同详情
import Signaturesetting from '../components/Templatelaunch/Signaturesetting/Signaturesetting.vue' //模板签署设置
import Contractsign from '../components/Templatelaunch/Contractsign/Contractsign.vue' //模板合同签署
import Specifiedposition from '../components/Templatelaunch/Specifiedposition/Specifiedposition.vue' //模板指定位置
import Fillinformation from '../components/Templatelaunch/Fillinformation/Fillinformation.vue' //模板填充信息
import TotalContract from '../components/Mycontract/TotalContract.vue' // 全部合同
import InquiryWaitMe from '../components/Mycontract/InquiryWaitMe.vue' // 待我签署合同
import batchInfo from '../components/Templatebatch/batchInfo/batchInfo.vue' //批量模板填充信息
import batchSetting from '../components/Templatebatch/batchSetting/batchSetting.vue' //批量模板签署设置
import Templatecomplete from '../components/Templatebatch/Templatecomplete/Templatecomplete.vue' //批量模板签署完成
import Templates from '../components/Templatelaunch/TemplateSuccess/Templates.vue' //模板多位置签署完成
import batchsign from '../components/Templatebatch/batchsign/batchsign.vue'
import ContractDelay from '../components/ContractDelay/ContractDelay.vue' // 合同延期
import More from '../components/Template/More/More.vue' //暂无模板
import Whether from '../components/Whether/Whether.vue' //平台方是否签署
import Success from '../components/Success/Success.vue' //平台方是否签署(成功)
import TemplatePos from '../components/TemplatePos/TemplatePos.vue' //平台方是否签署    (模板)
import TemplateInfo from '../components/TemplateInfo/TemplateInfo.vue' //平台方是否签署(模板成功)
//b2b
import Company from '../components/Company/Company.vue'                                           //b2b 首页
import Enterprise from '../components/Confirmation/Enterprise/Enterprise.vue'                     //企业认证
import Payment from '../components/Confirmation/Payment/Payment.vue'                              //打款
import EnterprisePayment from '../components/EnterpriseCertificate/EnterprisePayment/EnterprisePayment.vue'                              //企业打款
import EnterpriseRegisterSucc from '../components/EnterpriseCertificate/EnterpriseRegisterSucc/EnterpriseRegisterSucc.vue'                              //企业打款
import WaitReply from '../components/Confirmation/WaitReply/WaitReply.vue'                        //等待中
import Completion from '../components/Confirmation/Completion/Completion.vue'                     //认证完成

import Account from '../components/Account/Account.vue'                              //个人账户(签章，账号管理)
import AddChildAccount from '../components/Account/AddChildAccount/AddChildAccount.vue'                              //我的账户->新增二级账户(签章，账号管理)
import EditChildAccount from '../components/Account/EditChildAccount/EditChildAccount.vue'                              //我的账户->编辑二级账户(签章，账号管理)
import ActivateChildAccount from '../components/Account/ActivateChildAccount/ActivateChildAccount.vue'                //我的账户->激活二级账户(签章，账号管理)
import EditChildNoActive from '../components/Account/EditChildNoActive/EditChildNoActive.vue'                //我的账户->激活二级账户(签章，账号管理)
import NoReal from '../components/Account/NoReal/NoReal.vue'                //我的账户->账户未激活(签章，账号管理)
 // 费用中心
import CostCenter from '../components/Account/CostCenter/CostCenter.vue'                //我的账户->账户中心
import Charge from '../components/Account/CostCenter/Charge/Charge.vue'                //我的账户->账户中心->充值记录
import Bill from '../components/Account/CostCenter/Bill/Bill.vue'                //我的账户->账户中心->账单
import Invoice from '../components/Account/CostCenter/Invoice/Invoices.vue'                //我的账户->账户中心->发票


import PersonWait from '../components/Confirmation/PersonWait/PersonWait.vue'                     //个人认证等待
import Signature from '../components/Signature/Signature.vue'                        //企业签署设置
import Place from '../components/Place/Place.vue'                                                 //b2b多位置
import Dimension from '../components/Dimension/Dimension.vue'                                    //b2b 二维码
import Mobile from '../components/Mobile/Canvas/Sign.vue'                                          //签名面板
import MobileSuccess from '../components/Mobile/MobileSuccess/Success.vue'                        //签名面板成功
import SignSuccess from '../components/SignSuccess/SignSuccess.vue'                               //b2b 签署成功
import CompanyExa from '../components/CompanyExa/CompanyExa.vue'                                  //b2b 合同详情
//import Register from '../components/Credentials/Enterprise/Register/Register.vue'                 //b2b 注册企业
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
//IndividualRegister
import Register from "../components/UserRegister/Register.vue";                       //个人注册
import BusinessRegister from '../components/UserRegister/BusinessRegister.vue'                       //企业注册

import BindCompany from "../components/UserRegister/BindCompany.vue"

import EnterpriseCertificate from '../components/EnterpriseCertificate/EnterpriseCertificate.vue'   //企业认证

// demo 演示
import DemoRegister from "../demo/DemoRegister.vue";   //demo注册/登录
import DemoHome from '../demo/DemoHome.vue'   //demo首页
import DemoTemplateList from '../demo/DemoTemplateList.vue'   //demo 模板列表
import DemoAddPerson from '../demo/DemoAddPerson.vue'   //demo添加签署人
import DemoSuccess from '../demo/DemoSuccess.vue'   //demo添加签署人
import DemoTemplateFill from '../demo/DemoTemplateFill.vue'   //demo添加签署人
import DemoContractSign from '../demo/DemoContractSign.vue'   //demo添加签署人

Vue.use(Router)

export const router = new Router({
//   mode: "history",
  routes: [{
      path: '/',
      name: 'User',
      component: User,
      meta: {
        auth: false
      }
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register,
      meta: {
        auth: false
      }
    },
    {
        path: '/Bind',
        name: 'BindCompany',
        component: BindCompany,
        meta: {
          auth: false
        }
      },
    {
      path: '/BusinessRegister',
      name: 'BusinessRegister',
      component: BusinessRegister,
      meta: {
        auth: false
      }
    },
    {
        path:'/EnterpriseCertificate',
        name:'EnterpriseCertificate',
        component:EnterpriseCertificate,
        meta:{
            auth:false
        }
    },
    {
        path:'/ContractList',
        name:'ContractList',
        component:ContractList,
        meta:{
            auth:true
        }
    },
    {
      path: '/Forget',
      name: 'Forget',
      component: Forget,

      meta: {
        auth: false
      }
    },
    {
      path: '/FoundUser',
      name: 'FoundUser',
      component: FoundUser,

      meta: {
        auth: false
      }
    },
    {
      path: '/Role',
      name: 'Role',
      component: Role
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: true,
        auth: true
      }
    },
    {
      path: '/Contract',
      name: 'Contract',
      component: Contract,
      meta: {
        auth: true
      }
    },
    {
      path: '/TemplateCreate',
      name: 'TemplateCreate',
      component: TemplateCreate,
      meta: {
        keepAlive: true,
        auth: true
      }
    },
    {
      path: '/Contractsigning',
      name: 'Contractsigning',
      component: Contractsigning,
      meta: {
        auth: true
      }
    },
    {
      path: '/Complete',
      name: 'Complete',
      component: Complete,
      meta: {
        auth: true
      }
    },
    {
      path: '/Multiparty',
      name: 'Multiparty',
      component: Multiparty,
      meta: {
        auth: true
      }
    },
    {
      path: '/Positions',
      name: 'Positions',
      component: Positions,
      meta: {
        auth: true
      }
    },
    {
      path: '/Error',
      name: 'Error',
      component: Error,
      meta: {
        auth: false
      }
    },
    {
      path: '/Server',
      name: 'Server',
      component: Server,
      meta: {
        auth: false
      }
    },
    {
      path: '/Mycontract',
      name: 'Mycontract',
      component: Mycontract,
      meta: {
        keepAlive: true,
        auth: true
      }
    },
    {
      path: '/Room',
      name: 'Room',
      component: Room,
      meta: {
        auth: true
      }
    },
    {
      path: '/ContractInfo',
      name: "/ContractInfo",
      component: ContractInfo,
      meta: {
        auth: true
      }
    },
    {
      path: '/Signaturesetting',
      name: 'Signaturesetting',
      component: Signaturesetting,
      meta: {
        auth: true
      }
    },
    {
      path: '/Contractsign',
      name: 'Contractsign',
      component: Contractsign,
      meta: {
        auth: true
      }
    },
    {
      path: '/Specifiedposition',
      name: 'Specifiedposition',
      component: Specifiedposition,
      meta: {
        auth: true
      }
    },
    {
      path: '/Fillinformation',
      name: 'Fillinformation',
      component: Fillinformation,
      meta: {
        auth: true
      }
    },
    {
      path: '/Templatecomplete',
      name: 'Templatecomplete',
      component: Templatecomplete,
      meta: {
        auth: true
      }
    },
    {
      path: '/batchInfo',
      name: 'batchInfo',
      component: batchInfo,
      meta: {
        auth: true
      }
    },
    {
      path: '/batchSetting',
      name: 'batchSetting',
      component: batchSetting,
      meta: {
        auth: true
      }
    },
    {
      path: '/batchsign',
      name: 'batchsign',
      component: batchsign,
      meta: {
        auth: true
      }
    },
    {
      path: '/ContractDelay',
      name: 'ContractDelay',
      component: ContractDelay,
      meta: {
        auth: true
      }
    },
    {
      path: '/More',
      name: 'More',
      component: More,
      meta: {
        auth: true
      }
    },
    {
      path: '/Templates',
      name: 'Templates',
      component: Templates,
      meta: {
        auth: true
      }
    },
    {
      path: '/Whether',
      name: 'Whether',
      component: Whether,
      meta: {
        auth: true
      }
    },
    {
      path: '/Success',
      name: 'Success',
      component: Success,
      meta: {
        auth: true
      }
    },
    {
      path: '/TemplateInfo',
      name: 'TemplateInfo',
      component: TemplateInfo,
      meta: {
        auth: true
      }
    },
    {
      path: '/TemplatePos',
      name: 'TemplatePos',
      component: TemplatePos,
      meta: {
        auth: true
      }
    },
    {
      path: '/Company',
      name: 'Company',
      component: Company,
      meta: {
        auth: true
      }
    },
    {
      path: '/Enterprise',
      name: 'Enterprise',
      component: Enterprise,
      meta: {
        auth: false
      }
    },
    {
      path: '/Payment',
      name: 'Payment',
      component: Payment,
      meta: {
        auth: false
      }
    },
    {
        path: '/EnterprisePayment',
        name: 'EnterprisePayment',
        component: EnterprisePayment,
        meta: {
            auth: true
        }
    },
    {
      path: '/EnterpriseRegisterSucc',
      name: 'EnterpriseRegisterSucc',
      component: EnterpriseRegisterSucc,
    },
    {
      path: '/WaitReply',
      name: 'WaitReply',
      component: WaitReply,
      meta: {
        auth: false
      }
    },
    {
      path: '/Completion',
      name: 'Completion',
      component: Completion,
      meta: {
        auth: true
      }
    },
    {
      path: '/Account',
      name: 'Account',
      component: Account,
      meta: {
        auth: true
      }
    },
    {
      path: '/EditChildNoActive',
      name: 'EditChildNoActive',
      component: EditChildNoActive,
      meta: {
        auth: true
      }
    },
    {
      path: '/NoReal',
      name: 'NoReal',
      component: NoReal,
      meta: {
        auth: true
      }
    },
    //新增二级子账号
    {
      path: '/AddChildAccount',
      name: 'AddChildAccount',
      component: AddChildAccount

    },
    //编辑二级子账号
    {
      path: '/EditChildAccount',
      name: 'EditChildAccount',
      component: EditChildAccount
    },
    //激活二级子账号
    {
      path: '/ActivateChildAccount',
      name: 'ActivateChildAccount',
      component: ActivateChildAccount,
      meta: {
        auth: false
      }
    },
    {
      path: '/PersonWait',
      name: 'PersonWait',
      component: PersonWait,
      meta: {
        auth: false
      }
    },
    {
      path: '/Signature',
      name: 'Signature',
      component: Signature,
      meta: {
        auth: true
      }
    },
    {
      path: '/Place',
      name: 'Place',
      component: Place,
      meta: {
        auth: true
      }
    },
    {
      path: '/Dimension',
      name: 'Dimension',
      component: Dimension,
      meta: {
        auth: true
      }
    },
    {
      path: '/Mobile',
      name: 'Mobile',
      component: Mobile,
      meta: {
        auth: false
      }
    },
    {
      path: '/MobileSuccess',
      name: 'MobileSuccess',
      component: MobileSuccess,
      meta: {
        auth: false
      }
    },
    {
      path: '/SignSuccess',
      name: 'SignSuccess',
      component: SignSuccess,
      meta: {
        auth: true
      }
    },
    {
      path: '/CompanyExa',
      name: 'CompanyExa',
      component: CompanyExa,
      meta: {
        auth: true
      }
    },
    // {
    //   path: '/Register',
    //   name: 'Register',
    //   component: Register,
    //   meta: {
    //     auth: false
    //   }
    // },
    {
      path: '/Pupload',
      name: 'Pupload',
      component: Pupload,
      meta: {
        auth: false
      }
    },
    {
      path: '/ErrorPupload',
      name: 'ErrorPupload',
      component: ErrorPupload,
      meta: {
        auth: false
      }
    },
    {
      path: '/Information',
      name: 'Information',
      component: Information,
      meta: {
        auth: false
      }
    },
    {
      path: '/Authentication',
      name: 'Authentication',
      component: Authentication,
      meta: {
        auth: false
      }
    },
    {
      path: '/BuyProduct',
      name: 'BuyProduct',
      component: BuyProduct,
      meta: {
        auth: false
      }
    },
    {
      path: '/Merchant',
      name: 'Merchant',
      component: Merchant,
      meta: {
        auth: false
      }
    },
    {
      path: '/Procontract',
      name: 'Procontract',
      component: Procontract,
      meta: {
        auth: true
      }
    },
    {
      path: '/CompanyContract',
      name: 'CompanyContract',
      component: CompanyContract,
      meta: {
        auth: true
      }
    },
    {
      path: '/CompanyExb',
      name: 'CompanyExb',
      component: CompanyExb,
      meta: {
        auth: true
      }
    },
    //充值记录
    {
      path: '/Charge',
      name: 'Charge',
      component: Charge,
      meta: {
        auth: true
      }
    },
    // 账户中心
    {
      path: '/CostCenter',
      name: 'CostCenter',
      component: CostCenter,
      meta: {
        auth: true
      }
    },
    // 账户中心->账单管理
    {
      path: '/Bill',
      name: 'Bill',
      component: Bill,
      meta: {
        auth: true
      }
    },
    // 账户中心->充值记录
    {
      path: '/Charge',
      name: 'Charge',
      component: Charge,
      meta: {
        auth: true
      }
    },
    // 账户中心->发票管理
    {
      path: '/Invoice',
      name: 'Invoice',
      component: Invoice,
      meta: {
        auth: true
      }
    },

    //微签1.6 体验demo
    {
      path: '/DemoRegister',
      name: 'DemoRegister',
      component: DemoRegister,
      meta: {
        auth: false,
        keepAlive: true

      }
    },
    {
      path: '/DemoHome',
      name: 'DemoHome',
      component: DemoHome,
      meta: {
        auth: false,
        keepAlive: true

      }
    },
    {
      path: '/DemoTemplateList',
      name: 'DemoTemplateList',
      component: DemoTemplateList,
      meta: {
        auth: false,
        keepAlive: true
      }
    },
    {
      path: '/DemoAddPerson',
      name: 'DemoAddPerson',
      component: DemoAddPerson,
      meta: {
        auth: false,
        keepAlive: true
      }
    },
    {
      path: '/DemoSuccess',
      name: 'DemoSuccess',
      component: DemoSuccess,
      meta: {
        auth: false,
        keepAlive: true
      }
    },
    {
      path: '/DemoTemplateFill',
      name: 'DemoTemplateFill',
      component: DemoTemplateFill,
      meta: {
        auth: false,
        keepAlive: true
      }
    },
    {
      path: '/DemoContractSign',
      name: 'DemoContractSign',
      component:DemoContractSign,
      meta: {
        auth: false,
        keepAlive: true
      }
    },

  ],
  scrollBehavior(to, from, savedPosition) {
    if(savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})


//确保要调用 next 方法，否则钩子就不会被 resolved;
//需要再meta中添加auth认证 否则会死循环
//this.$message 会报错 需要绑定到vue实例上

router.beforeEach((to, from, next) => {
	var userInfo = cookie.getJSON('tenant')
	if (to.meta.auth == true) {
		if (!userInfo) {
			Vue.prototype.$message({
				showClose: true,
				duration: 1000,
				message: "请登录",
				type: 'warning'
			})
			setTimeout(function(){
				next({
					path: '/'
				}),9000
			})
		}else {
			next()
		}
	} else {
		next()
	}
})



