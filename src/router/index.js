import Vue from 'vue'
import Router from 'vue-router'
import cookie from '@/common/js/getTenant'
// demo 演示
import DemoRegister from "../demo/DemoRegister.vue";   //demo注册/登录
import DemoHome from '../demo/DemoHome.vue'   //demo首页
import DemoTemplateList from '../demo/DemoTemplateList.vue'   //demo 模板列表
import DemoAddPerson from '../demo/DemoAddPerson.vue'   //demo添加签署人
import DemoSuccess from '../demo/DemoSuccess.vue'   //demo添加签署人
import DemoTemplateFill from '../demo/DemoTemplateFill.vue'   //demo添加签署人
import DemoContractSign from '../demo/DemoContractSign.vue'   //demo添加签署人

Vue.use(Router)

function loadComponent(view) {
    return () => import (/* webpackChunkName: "view-[request]" */ `@/components/${view}.vue`)
}

function loadCommonComponent(view) {
    return () => import (/* webpackChunkName: "view-[request]" */ `@/common/components/${view}.vue`)
}

export const router = new Router({
//   mode: "history",
    routes: [{

            path: '/',
            name: 'User',
            component:loadComponent('Login/User'),
            meta: {
                auth: false
            }
        }, {
            path: '/Register',
            name: 'Register',
            component: loadComponent('UserRegister/Register'),
            meta: {
                auth: false
            }
        }, {
            path: '/Bind',
            name: 'BindCompany',
            component: loadComponent('UserRegister/BindCompany'),
            meta: {
                auth: false
            }
        }, {
            path: '/BusinessRegister',
            name: 'BusinessRegister',
            component: loadComponent('UserRegister/BusinessRegister'),
            meta: {
                auth: false
            }
        }, {
            path:'/EnterpriseCertificate',
            name:'EnterpriseCertificate',
            component:loadComponent('EnterpriseCertificate/EnterpriseCertificate'),
            meta:{
                auth:false
            }
        }, {
            path:'/ContractList',
            name:'ContractList',
            component:loadComponent('ContractList/ContractList'),
            meta:{
                auth:true
            }
        }, {
            path:'/CompanyExc',
            name:'CompanyExc',
            component:loadComponent('CompanyExc/CompanyExc'),
            meta:{
                auth:true
            }
        },{
            path: '/Forget',
            name: 'Forget',
            component: loadComponent('Login/Forget'),
            meta: {
                auth: false
            }
        },{
            path: '/FoundUser',
            name: 'FoundUser',
            component: loadComponent('Login/FoundUser'),
            meta: {
                auth: false
            }
        }, {
            path: '/Role',
            name: 'Role',
            component: loadComponent('Login/Role')
        },{
            path: '/Home',
            name: 'Home',
            component: loadComponent('Home/Home'),
            meta: {
                keepAlive: true,
                auth: true
            }
        },{
            path: '/Contract',
            name: 'Contract',
            component: loadComponent('Contract/Contract'),
            meta: {
                auth: true
            }
        },{
            path: '/Contractsigning',
            name: 'Contractsigning',
            component: loadComponent('Contractsigning/Contractsigning'),
            meta: {
                auth: true
            }
        },{
            path: '/Complete',
            name: 'Complete',
            component: loadComponent('Complete/Complete'),
            meta: {
                auth: true
            }
        },{
            path: '/Multiparty',   //我的模板
            name: 'Multiparty',
            component: loadComponent('Template/Multiparty/Multiparty'),
            meta: {
                auth: true
            }
        }, {
            path: '/MultipartyUp',  //模板发起
            name: 'MultipartyUp',
            component: loadComponent('Template/Multiparty/Multiparty'),
            meta: {
                auth: true
            }
        },{
            path: '/Positions',
            name: 'Positions',
            component: loadComponent('Positions/Positions'),
            meta: {
                auth: true
            }
        },{
            path: '/Error',
            name: 'Error',
            component:loadCommonComponent('Error'),
            meta: {
                auth: false
            }
        },{
            path: '/Server',
            name: 'Server',
            component: loadCommonComponent('Server'),
            meta: {
                auth: false
            }
        }, {
            path: '/Mycontract',
            name: 'Mycontract',
            component: loadComponent('Mycontract/Mycontract'),
            meta: {
                keepAlive: true,
                auth: true
            }
        }, {
            path: '/Room',
            name: 'Room',
            component: loadComponent('Room/Room'),
            meta: {
                auth: true
            }
        },{
            path: '/ContractInfo',
            name: "/ContractInfo",
            component: loadComponent('ContractInfo/ContractInfo'),
            meta: {
                auth: true
            }
        }, {
            path: '/Signaturesetting',
            name: 'Signaturesetting',
            component: loadComponent('Templatelaunch/Signaturesetting/Signaturesetting'),
            meta: {
                auth: true
            }
        },{
            path: '/Contractsign',
            name: 'Contractsign',
            component: loadComponent('Templatelaunch/Contractsign/Contractsign'),
            meta: {
                auth: true
            }
        }, {
            path: '/Specifiedposition',
            name: 'Specifiedposition',
            component: loadComponent('Templatelaunch/Specifiedposition/Specifiedposition'),
            meta: {
                auth: true
            }
        }, {
            path: '/Fillinformation',
            name: 'Fillinformation',
            component: loadComponent('Templatelaunch/Fillinformation/Fillinformation'),
            meta: {
                auth: true
            }
        },{
            path: '/Templatecomplete',
            name: 'Templatecomplete',
            component: loadComponent('Templatebatch/Templatecomplete/Templatecomplete'),
            meta: {
                auth: true
            }
        }, {
            path: '/batchInfo',
            name: 'batchInfo',
            component: loadComponent('Templatebatch/batchInfo/batchInfo'),
            meta: {
                auth: true
            }
        }, {
            path: '/batchSetting',
            name: 'batchSetting',
            component: loadComponent('Templatebatch/batchSetting/batchSetting'),
            meta: {
                auth: true
            }
        }, {
            path: '/batchsign',
            name: 'batchsign',
            component: loadComponent('Templatebatch/batchsign/batchsign'),
            meta: {
                auth: true
            }
        },{
            path: '/ContractDelay',
            name: 'ContractDelay',
            component: loadComponent('ContractDelay/ContractDelay'),
            meta: {
                auth: true
            }
        },{
            //暂无模板
            path: '/More',
            name: 'More',
            component: loadComponent('Template/More/More'),
            meta: {
                auth: true
            }
        },{
            //模板多位置签署完成
            path: '/Templates',
            name: 'Templates',
            component: loadComponent('Templatelaunch/TemplateSuccess/Templates'),   
            meta: {
                auth: true
            }
        },{
            //平台方是否签署
            path: '/Whether',
            name: 'Whether',
            component: loadComponent('Whether/Whether'),
            meta: {
                auth: true
            }
        },{
            path: '/Success',
            name: 'Success',
            component: loadComponent('Success/Success'),
            meta: {
                auth: true
            }
        },{
            //平台方是否签署(模板成功)
            path: '/TemplateInfo',
            name: 'TemplateInfo',
            component: loadComponent('TemplateInfo/TemplateInfo'),
            meta: {
                auth: true
            }
        },{
            //平台方是否签署    (模板)
            path: '/TemplatePos',
            name: 'TemplatePos',
            component: loadComponent('TemplatePos/TemplatePos'),
            meta: {
                auth: true
            }
        },{
            path: '/EnterprisePayment',
            name: 'EnterprisePayment',
            component: loadComponent('EnterpriseCertificate/EnterprisePayment/EnterprisePayment'),
            meta: {
                auth: true
            }
        },{
            path: '/EnterpriseRegisterSucc',
            name: 'EnterpriseRegisterSucc',
            component: loadComponent('EnterpriseCertificate/EnterpriseRegisterSucc/EnterpriseRegisterSucc'),
        }, {
            path: '/Account',
            name: 'Account',
            component: loadComponent('Account/Account'),
            meta: {
                auth: true
            }
        },{
            path: '/EditChildNoActive',
            name: 'EditChildNoActive',
            component: loadComponent('Account/EditChildNoActive/EditChildNoActive'),
            meta: {
                auth: true
            }
        },{
            path: '/NoReal',
            name: 'NoReal',
            component: loadComponent('Account/NoReal/NoReal'),
            meta: {
                auth: true
            }
        }, {
             //新增二级子账号
            path: '/AddChildAccount',
            name: 'AddChildAccount',
            component: loadComponent('Account/AddChildAccount/AddChildAccount')

        }, {
            //编辑二级子账号
            path: '/EditChildAccount',
            name: 'EditChildAccount',
            component: loadComponent('Account/EditChildAccount/EditChildAccount')
        },{ 
            //激活二级子账号
            path: '/ActivateChildAccount',
            name: 'ActivateChildAccount',
            component: loadComponent('Account/ActivateChildAccount/ActivateChildAccount'),
            meta: {
                auth: false
            }
        },{
            //套餐购买
            path: '/PackagePurchase',
            name: 'PackagePurchase',
            component: loadComponent('Account/PackagePurchase/PackagePurchase'),
            meta: {
                auth: false
            }
        },{
        //充值
            path: '/PackageBuy',
            name: 'PackageBuy',
            component: loadComponent('Account/PackageBuy/PackageBuy'),
            meta: {
                auth: false
            }
        },{
            path: '/PaySuccess',
            name: 'PaySuccess',
            component: loadComponent('Account/PaySuccess/PaySuccess'),
            meta: {
                auth: false
            }
        },{
            path: '/Signature',
            name: 'Signature',
            component: loadComponent('Signature/Signature'),
            meta: {
                auth: true
            }
        },{
            path: '/Place',
            name: 'Place',
            component: loadComponent('Place/Place'),
            meta: {
                auth: true
            }
        },{
            path: '/Dimension',
            name: 'Dimension',
            component: loadComponent('Dimension/Dimension'),
            meta: {
                auth: true
            }
        }, {
            path: '/Mobile',
            name: 'Mobile',
            component: loadComponent('Mobile/Canvas/Sign'),
            meta: {
                auth: false
            }
        },{
            path: '/MobileSuccess',
            name: 'MobileSuccess',
            component: loadComponent('Mobile/MobileSuccess/Success'),
            meta: {
                auth: false
            }
        },{
            path: '/SignSuccess',
            name: 'SignSuccess',
            component: loadComponent('SignSuccess/SignSuccess'),
            meta: {
                auth: true
            }
        },{
            path: '/CompanyExa',
            name: 'CompanyExa',
            component: loadComponent('CompanyExa/CompanyExa'),
            meta: {
                auth: true
            }
        },{
            path: '/BuyProduct',
            name: 'BuyProduct',
            component: loadComponent('BuyProduct/BuyProduct'),
            meta: {
                auth: false
            }
        },{
            path: '/BuyProductTemplate',   //未实名模板发起
            name: 'BuyProductTemplate',
            component: loadComponent('BuyProduct/BuyProduct'),
            meta: {
                auth: false
            }
        },{
            path: '/BuyProductUp',   //未实名上传发起
            name: 'BuyProductUp',
            component: loadComponent('BuyProduct/BuyProduct'),
            meta: {
                auth: false
            }
        }, {
            path: '/BuyProductRoom',        //未实名签约室
            name: 'BuyProductRoom',
            component: loadComponent('BuyProduct/BuyProduct'),
            meta: {
            auth: false
            }
        },{
            path: '/Merchant',
            name: 'Merchant',
            component: loadComponent('Merchant/Merchant'),
            meta: {
                auth: false
            }
        },{
            path: '/Procontract',
            name: 'Procontract',
            component: loadComponent('Procontract/Procontract'),
            meta: {
                auth: true
            }
        },{
            path: '/CompanyExb',
            name: 'CompanyExb',
            component: loadComponent('CompanyExb/CompanyExb'),
            meta: {
                auth: true
            }
        }, {
            //充值记录
            path: '/Charge',
            name: 'Charge',
            component: loadComponent('Account/CostCenter/Charge/Charge'),
            meta: {
                auth: true
            }
        },{
            // 账户中心
            path: '/CostCenter',
            redirect: '/CostCenter/BillDetail',
            name: 'CostCenter',
            component: loadComponent('Account/CostCenter/CostCenter'),
            children: [{
                    component: loadComponent('Account/CostCenter/Bill/BillDetail'),
                    path: "/CostCenter/BillDetail"
                }, {
                    component: loadComponent('Account/CostCenter/Bill/BillList'),
                    path: "/CostCenter/BillList"
                }, {
                    component: loadComponent('Account/CostCenter/Charge/Charge'),
                    path: "/CostCenter/Charge"
                },{
                    component: loadComponent('Account/CostCenter/Invoice/Invoices'),
                    path: "/CostCenter/Invoice"
                }, {
                    component: loadComponent('Account/CostCenter/Invoice/InvoiceDetail'),
                    path: "/CostCenter/InvoiceDetail"
                },
            ],
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
        },{
            path: '/DemoHome',
            name: 'DemoHome',
            component: DemoHome,
            meta: {
                auth: false,
                keepAlive: true

            }
        },{
            path: '/DemoTemplateList',
            name: 'DemoTemplateList',
            component: DemoTemplateList,
            meta: {
                auth: false,
                keepAlive: true
            }
        }, {
            path: '/DemoAddPerson',
            name: 'DemoAddPerson',
            component: DemoAddPerson,
            meta: {
                auth: false,
                keepAlive: true
            }
        },{
            path: '/DemoSuccess',
            name: 'DemoSuccess',
            component: DemoSuccess,
            meta: {
                auth: false,
                keepAlive: true
            }
        },{
            path: '/DemoTemplateFill',
            name: 'DemoTemplateFill',
            component: DemoTemplateFill,
            meta: {
                auth: false,
                keepAlive: true
            }
        },{
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



