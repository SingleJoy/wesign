<template>
    <div class="CostCenters">
        <div class="top-content">
            <div class="top-tabs" >
                <div class="btn-default" @click="AccountCenter">账户中心</div>
                <div class="btn-active" style="margin-left: -5px;"  @click="CostCenter">费用中心</div>
            </div>
            </div>
            <div class="content-container">
        <div class="content-tabs">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="充值记录" name="first"></el-tab-pane>
                <el-tab-pane label="发票管理" name="second"></el-tab-pane>
                <el-tab-pane label="对账单" name="third"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="content-tabs-view">
            <router-view></router-view>
        </div>
        </div>
  </div>
</template>
<script>
export default {
    name:'CostCenters',
    data(){
        return{
            activeName:'first',
        }
    },
    methods:{
        //账户中心跳转
        AccountCenter(){
            this.$router.push('/Account');
        },
        //费用中心跳转
        CostCenter(){
            this.$router.push('/CostCenter/Charge');
            this.activeName = 'first';
        },
        //切换路由
        handleClick(tab) {
            let index=tab.index;
            if(index == 0) {
                this.$router.push('/CostCenter/Charge');
            } else if (index == '1') {
                this.$router.push('/CostCenter/Invoice');
            } else if(index == '2'){
                this.$router.push('/CostCenter/BillList');
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../../styles/Account/CostCenter/CostCenter.scss";
</style>
<style lang="scss" scoped>
.content-tabs-view {
    padding: 20px;
}
.content-tabs .el-tabs__item {
    height: 58px;
    line-height: 58px;
}
</style>
