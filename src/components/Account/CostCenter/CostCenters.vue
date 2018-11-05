<template>
    <div class="CostCenters">

      <div class="top-tabs">
        <div class="tab">
          <div class="btn-default" @click="AccountCenter">账户中心</div>
          <div class="btn-active" style="margin-left: -5px;"  @click="CostCenter">费用中心</div>
        </div>
      </div>

      <div class="content-tabs">
<!--<<<<<<< HEAD-->
        <!--<ul>-->
          <!--<li class="default-tab-style" :class="{'active-tab-router':isA,'default-tab-router':!isA}" @click="tabClick('A')"><a href="javascript:void(0);">充值记录</a></li>-->
          <!--<li class="default-tab-style" :class="{'active-tab-router':isB,'default-tab-router':!isB}" @click="tabClick('B')"><a href="javascript:void(0);">发票管理</a></li>-->
          <!--<li class="default-tab-style" :class="{'active-tab-router':isC,'default-tab-router':!isC}" @click="tabClick('C')"><a href="javascript:void(0);">对账单</a></li>-->
        <!--</ul>-->

<!--=======-->
        <!-- <el-tabs v-model="activeName" tab-position="40px">
          <el-tab-pane label="充值记录" name="first">
            <Charge></Charge>
          </el-tab-pane>
          <el-tab-pane label="发票管理" name="second">
            <Invoice></Invoice>
          </el-tab-pane>
          <el-tab-pane label="对账单" name="third">
            <BillList></BillList>
          </el-tab-pane>

        </el-tabs> -->
         <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="充值记录" name="" @tab-click="changeSwitch()">
          </el-tab-pane>
          <el-tab-pane label="发票管理" name=""></el-tab-pane>
          <el-tab-pane label="对账单" name=""></el-tab-pane>
      </el-tabs>
      </div>
      <div class="content-tabs-view">
        <router-view></router-view>

      </div>
    </div>
</template>



<script>
  import Charge from './Charge/Charge'
  import Invoice from './Invoice/Invoice'
  import BillList from './Bill/BillList'

  export default {
    name:'CostCenters',
    components:{
      Charge,
      BillList,
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
      },


      handleClick(tab, event) {
        // this.$router.push('/BillDetail');
        if(tab.index == 0) {
          this.$router.push('/CostCenter/Charge');
        } else if (tab.index == 1) {

        } else if(tab.index == 2){
          this.$router.push('/CostCenter/BillList');

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
<<<<<<< HEAD
=======
  .content-tabs{
    padding: 20px 20px 0px 20px;
  }
  .content-tabs-view {
    padding: 0 20px 20px 20px;
  }
>>>>>>> 6b5685078bd726ff81101a38e2cdde41078ed031
  .content-tabs .el-tabs__item.is-active {
    color: #4091fb;
    border-bottom: 2px solid #4091fb;
  }
  .content-tabs .el-tabs__item {
    height: 58px;
    line-height: 58px;
  }


</style>
