<template>
    <div class="CostCenters">

      <div class="top-tabs">
        <div class="tab">
          <div class="btn-default" @click="AccountCenter">账户中心</div>
          <div class="btn-active" style="margin-left: -5px;"  @click="CostCenter">费用中心</div>
        </div>
      </div>

      <div class="content-tabs">
        <ul>
          <li class="default-tab-style" :class="{'active-tab-router':isA,'default-tab-router':!isA}" @click="tabClick('A')"><a href="javascript:void(0);">充值记录</a></li>
          <li class="default-tab-style" :class="{'active-tab-router':isB,'default-tab-router':!isB}" @click="tabClick('B')"><a href="javascript:void(0);">发票管理</a></li>
          <li class="default-tab-style" :class="{'active-tab-router':isC,'default-tab-router':!isC}" @click="tabClick('C')"><a href="javascript:void(0);">对账单</a></li>
        </ul>

      </div>

    </div>
</template>



<script>
  import Charge from './Charge/Charge'
  import Invoice from './Invoice/Invoice'
  import Bill from './Bill/Bill'

  export default {
    name:'CostCenters',
    components:{
      Charge,
      Bill,
      Invoice
    },

    data(){
      return{
        isA:true,
        isB:false,
        isC:false,
        tableData: [
          {
            transactionName: '64646464646364643',
            rechargeAmount: '5000',
            paymentMode: '对公账户打款',
            prepaidTime: '2017-1-12 09:20:09',
            accountBalance: '5000',
          },
          {
            transactionName: '325243634634',
            rechargeAmount: '5000',
            paymentMode: '对公账户打款',
            prepaidTime: '2017-1-12 09:20:09',
            accountBalance: '5000',
          }
        ]

      }

    },
    methods:{
      AccountCenter(){
        this.$router.push('/Account')
      },
      CostCenter(){
        this.$router.push('/CostCenter')
      },
      tabClick(showTab){
        let show=showTab;
        if(show=='A'){
          this.isA=true;
          this.isB=false;
          this.isC=false;
          this.$router.push('/Charge')
        }else if(show=='B'){
          this.isA=false;
          this.isB=true;
          this.isC=false;
          this.$router.push('/Invoice')
        }else if(show=='C'){
          this.isA=false;
          this.isB=false;
          this.isC=true;
          this.$router.push('/Bill')
        }
      }

    }
  }

</script>
<style lang="scss" scoped>
  @import "../../../styles/Account/CostCenter/CostCenter.scss";
  @import "../../../common/styles/tabs-router.scss";

</style>

<style >
  .router-active{
    border-bottom: 2px solid #4091fb;
  }
  #tab-first,#tab-second,#tab-third{
    font-size: 16px;
  }
  .content-tabs .el-tabs__item.is-active {
    color: #4091fb;
    border-bottom: 2px solid #4091fb;
  }
  .content-tabs .el-tabs__item {
    height: 58px;
    line-height: 58px;
  }


</style>
