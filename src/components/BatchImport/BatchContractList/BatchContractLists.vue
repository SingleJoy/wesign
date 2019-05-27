<template>
  <div class="BatchContractLists">
    <div class="BatchContractLists-main">
      <div class="main-header">
        <div class="header-name">
          <p class="title">合同列表</p>

        </div>
        <div class="order-info">
          <span>
            订单编号:
            <b>{{orderNum}}</b>
          </span>
        </div>
        <div class="sign-operate">
           <a href="javascript:void (0);">一键签署</a>
        </div>
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
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="contractName"
              label="合同名称"
              width="250"
              align="center">
            </el-table-column>
            <el-table-column
              prop="signer"
              label="签署人"
              width="150"
              align="center">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="发起时间"
              width="200"
              align="center">
            </el-table-column>
            <el-table-column
              prop="endTime"
              label="截止时间"
              width="200"
              align="center">
            </el-table-column>
            <el-table-column
              prop="currentState"
              label="当前状态"
              width="120"
              align="center">
            </el-table-column>
            <el-table-column
              prop="operation"
              label="操作"
              align="center">
              <template slot-scope="scope">

                <el-button  type="text" size="mini" @click="sign">签署</el-button>
                <el-button  type="text" size="mini" @click="lookDetail">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
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

  export default {
    name: 'OrderLists',
    data () {
      return {
        tableData:[
          {'contractName':'合同名称111','signer':'张三','createTime':'2019-01-01','endTime':'2020-01-01','currentState':'待我签署',}
        ],
        currentPage:0,
        totalItemNumber:0,
        orderNum:2222222222
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
      handleSizeChange(value){

      },
      handleCurrentChange(){

      },
      sign(){

      },
      lookDetail(){

        this.$router.push('/ContractInfo');
      }
    },

    created() {

    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../styles/BatchImport/BatchContractList/BatchContractList.scss";
</style>

