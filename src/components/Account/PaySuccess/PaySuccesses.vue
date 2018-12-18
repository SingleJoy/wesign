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
        <el-button type="info" style="background:#ccc;width: 150px;" @click="packagePurchase">继续充值</el-button>
        <el-button style="background:#4091fb;width: 150px;color: #fff;" @click="packageBuy">购买套餐</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {GetQueryString} from '@/common/js/InterceptUrl'
  import {prohibit} from '@/common/js/prohibitBrowser'
  import {aliPayReturn} from '@/api/purchase'
  import server from '@/api/url'
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
            server.login(params,this.interfaceCode).then(res=>{

              sessionStorage.setItem('interfaceCode',this.interfaceCode);
              sessionStorage.setItem('accountCode',this.accountCode);
              sessionStorage.setItem('mobile',this.mobile);
               sessionStorage.setItem("enterpriseName", res.data.dataList[1].companyName);
               sessionStorage.setItem("email", res.data.dataList[0].email);
               // sessionStorage.setItem("accountLevel", res.dataList[1].accountLevel);
               // sessionStorage.setItem("accountMoney", res.dataList[1].accountMoney);
               // sessionStorage.setItem("auditStatus", res.dataList[1].auditStatus);
               // sessionStorage.setItem("authorizerCode", res.dataList[1].authorizerCode);


            }).catch(error=>{

            })
            this.show=true;
          }else{
            this.$alert(res.data.resultMessage, '提示',{
              confirmButtonText: '确定'
            }).then(()=>{
              this.$router.push('/')
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
