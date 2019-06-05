<template>
  <div class="OrderLists">
     <div class="OrderLists-main">
       <div class="main-header">
         <p class="title">批量合同订单</p>
       </div>
       <div class="main-body">
         <div class="package-table">
           <el-table
             :data="tableData"
             stripe
             style="width: 100%"
             :row-style="tableRowStyle"
             :header-cell-style="tableHeaderColor">
             <el-table-column
               prop="orderName"
               label="订单编号"
               width="300"
               align="center">
             </el-table-column>
             <el-table-column
               prop="createdTime"
               label="生成时间"
               width="300"
               align="center">
             </el-table-column>
             <el-table-column
               prop="applyTemplate"
               label="应用模板"
               width="300"
               align="center">
             </el-table-column>
             <el-table-column
               prop="num"
               label="份数"
               align="center">
             </el-table-column>
             <el-table-column
               prop="operation"
               label="操作"
               align="center">
               <template slot-scope="scope">

                 <el-button  type="primary" size="mini" @click="lookOrderListDetail">查看</el-button>
               </template>
             </el-table-column>
           </el-table>
           <div class="block">
             <el-pagination
               @size-change="handleSizeChange"
               @current-change="handleCurrentChange"
               :current-page="pageNum"
               :page-size="10"
               layout="prev, pager, next, total, jumper"
               :total="totalItemNumber">
             </el-pagination>
           </div>
         </div>

       </div>

     </div>
  </div>
</template>
<script>
 import {getcontractorders} from '@/api/template.js'
  export default {
    name: 'OrderLists',
    data () {
      return {
        accountCode:sessionStorage.getItem("accountCode"),
        tableData:[],
        pageNum:0,
        totalItemNumber:0
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
      handleSizeChange(){

      },
      handleCurrentChange(value){
        this.pageNum=value;
      },
      lookOrderListDetail(){
        this.$router.push('/BatchContractList')
      },
      getData(){
        let params={
          pageNum:this.pageNum,
          pageSize:10,
        };
        getcontractorders(this.accountCode,params).then(res=>{
          console.log(res)
        }).catch(error=>{

        })
      }
    },

    created() {
       this.getData()
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../styles/BatchImport/OrderList/OrderLists";
</style>

