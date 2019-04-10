<template>
  <div class="PaySuccesses">
    <div class="PaySuccesses-main">
      <div class="mascot" v-if="show">
        <img src="/static/images/Account/PaySuccess/mascot.png">
        <h2 >支付成功啦！</h2>
      </div>
      <div class="PaySuccesses-info" v-if="show">
         <div class="list">
           <p class="list-item">
             <span>交易流水号:</span>
             <b>{{out_trade_no}}</b>
           </p>
           <p class="list-item">
             <span>充值金额:</span>
             <b style="color: #4091fb;font-size: 30px;">￥{{tradeMoney}}</b>
           </p>
           <p class="list-item">
             <span>充值时间:</span>
             <b>{{timestamp}}</b>
           </p>
         </div>
      </div>
      <div class="PaySuccesses-operate" v-if="show">
        <el-button type="info" style="background:#ccc;width: 150px;" @click="packageBuy">继续充值</el-button>
        <el-button style="background:#4091fb;width: 150px;color: #fff;" @click="packagePurchase">购买套餐</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import cookie from "@/common/js/getTenant";
  import {GetQueryString} from '@/common/js/InterceptUrl'
  import {prohibit} from '@/common/js/prohibitBrowser'
  import {aliPayReturn} from '@/api/purchase'
  import {bindEnterprises,homePage} from '@/api/login'

  export default {
    name: "PaySuccesses",
    data(){
      return{
        trade_no:'',  //订单编号
        tradeMoney:'',   //订单金额
        timestamp:'',
        out_trade_no:'',     //商户编号
        interfaceCode:'',
        accountCode:'',
        show:false
      }
    },
    methods:{
      packagePurchase(){
        this.$router.push('/PackagePurchase');
      },
      packageBuy(){
        this.$router.push('/packageBuy');
      },
    },
    created(){

     let total_amount=GetQueryString('total_amount');
     let timestamp=GetQueryString('timestamp').substring(0,19);
     let out_trade_no=GetQueryString('out_trade_no');

     this.timestamp=timestamp;
     this.out_trade_no=out_trade_no;
     this.total_amount=total_amount;
     let params={
       'out_trade_no':this.out_trade_no,
       'total_amount':this.total_amount
     };
      aliPayReturn(params).then(res=>{
          if(res.data.resultCode=='1'){
            this.interfaceCode=res.data.data.interfaceCode;
            this.accountCode=res.data.data.accountCode;
            this.tradeMoney=res.data.data.tradeMoney;
            this.mobile=res.data.data.mobile;
            let params = {
              mobile:this.mobile,
            };
            homePage(params,this.interfaceCode).then(res=>{
              sessionStorage.setItem('interfaceCode',this.interfaceCode);
              sessionStorage.setItem('accountCode',this.accountCode);
              sessionStorage.setItem('mobile',this.mobile);
              sessionStorage.setItem("enterpriseName", res.data.dataList[1].companyName);
              sessionStorage.setItem("email", res.data.dataList[0].email);
              cookie.set("tenant", res.data.dataList); //存入cookie 所需信息
            }).catch(error=>{

            });

            bindEnterprises(params).then(res=>{
              let item={};
             for(let i=0;i<res.data.dataList[0].length;i++){
               if(this.interfaceCode==res.data.dataList[0][i].interfaceCode){
                 item=res.data.dataList[0][i];
               }
             }
              sessionStorage.setItem('accountCode',item.accountCode);      //账户编号
              sessionStorage.setItem('accountLevel',item.accountLevel);      //账号类型一二级
              sessionStorage.setItem('authorizerCode',item.authorizerCode);      	//授权人编号
              sessionStorage.setItem('mobile',item.mobile);      				  //手机号
              sessionStorage.setItem('interfaceCode',item.interfaceCode);
              sessionStorage.setItem('auditStatus',item.auditStatus);

              sessionStorage.setItem('userCode',item.userCode);
              sessionStorage.setItem('accountMoney',item.accountMoney);
              sessionStorage.setItem("companyList",JSON.stringify(res.data.dataList)); //角色列表
            }).catch(error=>{

            })

            this.show=true;
          }else{
            this.$alert(res.data.resultMessage, '提示',{
              confirmButtonText: '确定',
            }).then(()=>{
              this.$router.push('/')
            }).catch(()=>{

            })

          }
      }).catch(error=>{

      })
    },
    mounted() {
      prohibit()
    }
  }
</script>

<style lang="scss"scoped>
  @import "../../../styles/Account/PaySuccess/PaySuccess.scss";

</style>
<style>
  .el-message-box__headerbtn{
    display: none;
  }
</style>
