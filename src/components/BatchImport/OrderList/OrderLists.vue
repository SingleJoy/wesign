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
                            prop="conOrderNo"
                            label="订单编号"
                            width="300"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="createTime"
                            label="生成时间"
                            width="300"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="templateName"
                            label="应用模板"
                            width="300"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="contractNum"
                            label="份数"
                            align="center">
                             <template slot-scope="scope">
                                 <span>{{scope.row.contractNum?scope.row.contractNum:'--'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="operation"
                            label="操作"
                            align="center">
                            <template slot-scope="scope">

                                <el-button  type="primary" size="mini" @click="lookOrderListDetail(scope.row)">查看</el-button>
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
    import {getcontractorders,getconorderlock} from '@/api/template.js'
    export default {
        name: 'OrderLists',
        data () {
            return {
                accountCode:sessionStorage.getItem("accountCode"),
                tableData:[],
                pageNum:1,
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
                this.getData();
            },
            lookOrderListDetail(row){

                let conOrderNo=row.conOrderNo;
                getconorderlock(this.accountCode,conOrderNo).then(res=>{
                    if(res.data.resultCode==1){
                        sessionStorage.setItem("conOrderNo",conOrderNo);
                        if(res.data.data.steps==0){                    // step==0 订单状态为导入数据
                            this.$router.push('/ImportData');
                        }else{
                            this.$router.push('/BatchContractList');   //step == 1 订单状态为生成合同
                        }

                    }else{                           //result == 0  签署中，合同生成中
                        this.$message({             
                            type: 'error',
                            message: res.data.resultMessage
                        });
                    }

                }).catch(error=>{

                });


            },
            getData(){
                this.$loading.show();
                let params={
                    pageNum:this.pageNum,
                    pageSize:10,
                };
                getcontractorders(this.accountCode,params).then(res=>{
                      setTimeout(()=>{
                          this.$loading.hide();
                      },1000);
                    if(res.data.resultCode==1){
                        this.totalItemNumber=res.data.data.totalItemNumber;
                        this.tableData=res.data.dataList;
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.data.resultMessage
                        });
                    }
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

