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
<style lang="scss">
.el-tabs__item, .el-tabs__item.is-active {
    height: 58px;
    line-height: 58px;
}
.el-tabs__header{
    background: #fff;
    // margin: 0 auto;
}
.el-tabs__item.is-active {
    text-align: center;
    color: #4091fb;
    border-bottom: 2px solid #4091fb;
}
.content-tabs{
    .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2), .el-tabs--bottom .el-tabs__item.is-top:nth-child(2), .el-tabs--top .el-tabs__item.is-bottom:nth-child(2), .el-tabs--top .el-tabs__item.is-top:nth-child(2){
        padding-left: 20px;
    }
    .el-tabs--bottom .el-tabs__item.is-bottom:last-child, .el-tabs--bottom .el-tabs__item.is-top:last-child, .el-tabs--top .el-tabs__item.is-bottom:last-child, .el-tabs--top .el-tabs__item.is-top:last-child {
        padding-right: 20px;
    }
}
</style>


