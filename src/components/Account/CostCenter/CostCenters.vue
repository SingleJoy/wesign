<template>
    <div class="CostCenters">

      <div class="tab">
        <div class="btn-default" @click="AccoutCenter">账户中心</div>
        <div class=" btn-active" style="margin-left: -5px;"  @click="CostCenter">费用中心</div>
      </div>

      <div class="content-tabs">
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
        activeName:'first',
      }

    },
    methods:{
      AccoutCenter(){
        this.$router.push('/Account')
      },
      CostCenter(){
        this.$router.push('/CostCenter')
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

</style>

<style >
  #tab-first,#tab-second,#tab-third{
    font-size: 16px;
  }
  .content-tabs{
    padding: 20px 20px 0px 20px;
  }
  .content-tabs-view {
    padding: 0 20px 20px 20px;
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
