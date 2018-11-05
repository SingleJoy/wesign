<template>
    <div class="CostCenters">
      <div class="tab">

        <div class="btn-active" >账户中心</div>
        <div class="btn-default" style="margin-left: -5px;" >费用中心</div>
      </div>

      <div class="content-tabs">
        <el-tabs v-model="activeName" tab-position="40px">
          <el-tab-pane label="充值记录" name="first">
            <Charge></Charge>
          </el-tab-pane>
          <el-tab-pane label="发票管理" name="second">
            <Invoice></Invoice>
          </el-tab-pane>
          <el-tab-pane label="对账单" name="third">
            <Bill></Bill>
          </el-tab-pane>

        </el-tabs>
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
        activeName:'first',
      }

    }
  }

</script>
<style lang="scss" scoped>
  @import "../../../styles/Account/CostCenter/CostCenter.scss";

</style>

