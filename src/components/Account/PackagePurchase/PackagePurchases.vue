<template>
  <div class="PackagePurchases">
    <div class="PackagePurchases-main">
      <div class="main-header">
        <p class="title">套餐列表</p>
        <div class="right">
          <p>
            <a class="backHome back-home" @click="backLast" href="javascript:void(0);">
              <span class="back-png"></span>返回
            </a>
            <b class="accountBalance"  id="accountBalance" style="font-size: 20px;">账户余额 : <span style="font-size: 30px">{{accountBalance}}元</span></b>
          </p>

        </div>
      </div>
      <div class="main-body">

        <div class="b2c-list list-common">
          <div class="b2c-list-title">对个人合同</div>
          <div class="list-content">
            <ul>
              <li v-for="(item,index) in B2cListArray" :key="index">
                <a href="javascript:void(0);">{{item.name}}</a>
                <div>
                  <p><span>{{item.price}}元</span></p>
                  <p>份数 : <span>{{item.num}}份</span></p>
                </div>
              </li>
            </ul>
          </div>
          <div class="clear"></div>
        </div>
        <div class="b2b-list list-common">
          <div class="b2c-list-title">对企业合同</div>
          <div class="list-content">
            <ul>
              <li v-for="(item,index) in B2bListArray" :key="index">
                <a href="javascript:void(0);">{{item.name}}</a>
                <div>
                  <p><span>{{item.price}}元</span></p>
                  <p>份数 : <span>{{item.num}}份</span></p>
                </div>
              </li>
            </ul>
          </div>
          <div class="clear"></div>
        </div>


      </div>
      <div class="main-header">
        <p class="title">购买记录</p>
      </div>
      <div class="package-table">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          :row-style="tableRowStyle"
          :header-cell-style="tableHeaderColor">
          <el-table-column
            prop="packageName"
            label="套餐名称"
            width="300"
            align="center">
          </el-table-column>
          <el-table-column
            prop="contractNum"
            label="合同份数"
            width="300"
            align="center">
          </el-table-column>
          <el-table-column
            prop="amountNum"
            label="扣款金额"
            width="300"
            align="center">
          </el-table-column>
          <el-table-column
            prop="transactionTime"
            label="购买时间"
            align="center">
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="1"
            layout="prev, pager, next, total, jumper"
            :total="totalItemNumber">
          </el-pagination>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: "PackagePurchases",
    data() {
      return {
        interfaceCode:sessionStorage.getItem("interfaceCode"),
        accountBalance:'20000',  //账户余额
        B2cListArray:         //b2c列表数据
          [
            {name:'套餐A',price:'2000',num:'1000'},
            {name:'套餐B',price:'3000',num:'1600'},
            {name:'套餐C',price:'5000',num:'2800'},
            {name:'套餐D',price:'10000',num:'6000'},
            {name:'套餐E',price:'15000',num:'12000'},
            {name:'套餐F',price:'15000',num:'12000'},
            {name:'套餐G',price:'15000',num:'12000'},
            {name:'套餐H',price:'15000',num:'12000'},
          ],
        B2bListArray:   //b2b列表数据
          [
            {name:'套餐A',price:'2000',num:'1000'},
            {name:'套餐B',price:'3000',num:'1600'},
            {name:'套餐C',price:'5000',num:'2800'},
            {name:'套餐D',price:'10000',num:'5000'},
            {name:'套餐D',price:'20000',num:'12000'},
          ],
        totalItemNumber: 0,
        tableData: [

        ],
        currentPage: 4,
      }
    },
    methods:{
      tableRowStyle({ row, rowIndex }) {
        return 'border: 1px solid red;'
      },
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: rgb(245, 245, 245);font-weight: bold;color: #333333;'
        }
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.getList(val,1);
      },
      backLast(){
       this.$router.push('/Account')
      }
    },
    created() {

    },


  }
</script>

<style lang="scss" scoped>
  @import "../../../styles/Account/PackagePurchase/PackagePurchases.scss";
</style>
