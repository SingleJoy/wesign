<template>

  <div class="Invoices">



    <div class="Invoices-body" style="background-color: #fff;">
      <!--<div class="content-tabs">-->
        <!--<ul>-->
          <!--<li class="default-tab-style" :class="{'active-tab-router':isA,'default-tab-router':!isA}" @click="tabClick('A')"><a href="javascript:void(0);">充值记录</a></li>-->
          <!--<li class="default-tab-style" :class="{'active-tab-router':isB,'default-tab-router':!isB}" @click="tabClick('B')"><a href="javascript:void(0);">发票管理</a></li>-->
          <!--<li class="default-tab-style" :class="{'active-tab-router':isC,'default-tab-router':!isC}" @click="tabClick('C')"><a href="javascript:void(0);">对账单</a></li>-->
        <!--</ul>-->

      <!--</div>-->
      <div class="data-content" >
        <el-table
          :data="tableData"
          stripe
          style="width: 100%;text-align: center"
          :row-style="tableRowStyle"
          :header-cell-style="tableHeaderColor">
          <el-table-column
            prop="transactionName"
            label="发票号码"
            width="250"
            align="center">
          </el-table-column>
          <el-table-column
            prop="rechargeAmount"
            label="金额"
            width="150"
            align="center">
          </el-table-column>
          <el-table-column
            prop="paymentMode"
            label="发票类型"
            width="170"
            align="center">
          </el-table-column>
          <el-table-column
            prop="prepaidTime"
            label="开票时间"
            width="200"
            align="center">
          </el-table-column>
          <el-table-column
            prop="accountBalance"
            label="账户余额"
            width="200"
            align="center">
          </el-table-column>

          <el-table-column
            prop="operation"
            label="操作"
            width="200"
            style="text-align: center;">
            <template slot-scope="scope" style="text-align: center;">

              <el-button @click="rowLockClick()" type="primary" size="mini">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="padding-top: 50px;text-align: center;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="3"
            layout="prev, pager, next, total, jumper"
            :total="6">
          </el-pagination>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import Charge from '../Charge/Charge'
  import Invoice from '../Invoice/Invoice'

  export default {
    name: "Invoices",
    components:{
      Charge,
      Invoice
    },
    data(){
      return{
        isA:false,
        isB:true,
        isC:false,
        tableData: [
          {
            transactionName: '64646464646364643',
            rechargeAmount: '5000',
            paymentMode: '对公账户打款',
            prepaidTime: '2017-1-12 09:20:09',
            accountBalance: '5000',
          },],
        currentPage:1,
      }
    },
    methods:{
      tableRowStyle({ row, rowIndex }) {
        return 'border: 1px solid red;'
      },
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: rgb(245, 245, 245);font-weight: bold;color: #333;'
        }
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      rowLockClick(){

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

        }
      },
      //查看详情
      rowLockClick(){
        this.$router.push('/CostCenter/InvoiceDetail');
      },
      AccountCenter(){
        this.$router.push('/Account')
      },
      CostCenter(){
        this.$router.push('/CostCenter')
      },
    }
  }
</script>

<style scoped>
  @import "../../../../styles/Account/CostCenter/CostCenter.scss";
  @import "../../../../common/styles/tabs-router.scss";
  .data-content{
   padding: 0 15px;
    margin-top: 20px;
    background-color: #fff;
  }
  .data-content .el-table__header-wrapper tr th {
    text-align: center !important;
  }
</style>
