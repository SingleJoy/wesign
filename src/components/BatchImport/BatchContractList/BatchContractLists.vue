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
                <b>{{conOrderNo}}</b>
            </span>
                </div>
                <div class="sign-operate" @click="signAll()">
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
                        :header-cell-style="tableHeaderColor"
                         @selection-change="handleSelectionChange">
                        <el-table-column
                            type="selection"
                            align="center"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            prop="contractName"
                            label="合同名称"
                            width="250"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="signers"
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
                            prop="validTime"
                            label="截止时间"
                            width="200"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="contractStatus"
                            label="当前状态"
                            width="120"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="operation"
                            label="操作"
                            align="center">
                            <template slot-scope="scope">
                                <el-button  type="text" size="mini" @click="singleSign(scope.row)">签署</el-button>
                                <el-button  type="text" size="mini" @click="previerContract(scope.row)">查看</el-button>
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
        <el-dialog title="合同详情图片"  :visible.sync="dialVisible" custom-class="showDialogs" :close-on-click-modal='false'>
            <div class="img-body">
                <div v-for="(item,index) in imgList" :key="index" >
                    <img :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractUrl='+item.contractFileImagePath" alt="" style='width:100%;'>
                </div>

            </div>
            <div class="contract-detail">
                <div class="contract-info-box">
                    <p>合同信息</p>
                    <ul>
                        <li>
                            <span class="info-title">合同名称：</span>
                            <span class="content">{{contractDetail.contractName}}</span>
                        </li>
                        <li>
                            <span class="info-title">签署截止日期：</span>
                            <span class="content">{{contractDetail.validTimeStr}}</span>
                        </li>
                    </ul>
                </div>
                <div class="signer-info-box">
                    <p>签署人员</p>
                    <ul>
                        <li>
                            <span class="info-title">姓名：</span>
                            <span class="content">{{contractDetail.userName}}</span>
                        </li>
                        <li>
                            <span class="info-title">身份证号：</span>
                            <span class="content">{{contractDetail.idCard}}</span>
                        </li>
                        <li>
                            <span class="info-title">手机号码：</span>
                            <span class="content">{{contractDetail.mobile}}</span>
                        </li>
                    </ul>
                </div>
            </div>

        </el-dialog>
    </div>
</template>
<script>
    import {getcontracts,contractkeywordsignNew,getContractImages,signleKeyWordSign} from '@/api/template.js'
    export default {
        name: 'OrderLists',
        data () {
            return {
                baseURL:this.baseURL.BASE_URL,
                dialVisible:false,
                imgList:[],
                tableData:[],
                pageNum:1,
                totalItemNumber:0,
                interfaceCode:sessionStorage.getItem("interfaceCode"),
                accountCode:sessionStorage.getItem("accountCode"),
                conOrderNo:sessionStorage.getItem("conOrderNo"),
                paramsList:[],  //批量签署合同参数数组
                contractDetail:{
                    contractName:'',
                    validTimeStr:'',
                    userName:'',
                    idCard:'',
                    mobile:'',
                }
            }
        },
        methods:{
            // 查看合同
            previerContract(val){
                this.dialVisible = true;
                let param = {
                    contractNo:val.contractNo
                }
                getContractImages(param).then(res=>{
                    if(res.data.resultCode ==1){
                        this.contractDetail = res.data.data;
                        this.imgList = res.data.dataList;
                    }else{

                    }
                }).catch(err=>{
                    
                })

            },
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
            signAll(){
                if(this.paramsList.length==0){
                    this.$message({
                        type: 'warning',
                        message: '请勾选要签署的合同'
                    });
                }else{
                    let param = {
                        signContractVoList:this.paramsList
                    }
                    contractkeywordsignNew(this.interfaceCode,this.conOrderNo,JSON.stringify(param)).then(res=>{
                        if(res.data.responseCode == 1){
                            this.$router.push('/batchSigning')
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.data.responseMsg
                            });
                        }

                    }).catch(error=>{

                    })
                }
                
            },
            singleSign(val){
                sessionStorage.setItem('signleContract',JSON.stringify(val))
                this.$router.push('./SingleSigning')

            },
            //一键签署和单个签署
            handleSelectionChange(value){
                let val = value[0];
                let contractObj = {
                    contractNo:val.contractNo,
                    contractName:val.contractName,
                    mobile:val.mobile
                }
                this.paramsList.push(contractObj)
            },
            getData(){
                let params={
                    pageNo:this.pageNum,
                    pageSize:10,
                };
                getcontracts(this.accountCode,this.conOrderNo,params).then(res=>{

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
<style lang="scss">
    @import "../../../common/styles/content.scss";
    .BatchContractLists {
        .el-dialog__wrapper{
            .img-body{
                img{
                    width:100%;
                    margin-bottom: 10px;
                }
            }
            .showDialogs{
                margin-top: 44px!important;
                width: 780px;
                .el-dialog__header{
                    background: #fff;
                    border-bottom: 1px solid #dad4d4;
                }
                .el-dialog__body{
                    height: 787px;
                    overflow: auto;
                    background: #eaeaea;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    padding: 10px 20px;
                }
                /* 滚动槽 */
                .el-dialog__body::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                .el-dialog__body::-webkit-scrollbar-track {
                    border-radius: 3px;
                    background: rgba(0,0,0,0.06);
                    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.08);
                }
                /* 滚动条滑块 */
                .el-dialog__body::-webkit-scrollbar-thumb {
                    border-radius: 3px;
                    background: rgba(0,0,0,0.12);
                    -webkit-box-shadow: inset 0 0 10px rgba(0,0,0,0.2);
                }
            }
            .contract-detail{
                position: absolute;
                right: -311px;
                top: 90px;
                ul li {
                    line-height: 14px;
                    margin-top:20px;
                    .info-title{
                        font-size: 14px;
                        color:#666
                    }
                    .content{
                        font-size: 14px;
                        color:#333;
                    }
                }
                .contract-info-box{
                    width: 291px;
                    height: 185px;
                    background: #ebf2fc;
                    border-radius: 5px;
                    padding: 20px 10px;
                    box-sizing: border-box;
                    p{
                        font-size: 18px;
                        color:#4091fb;
                        border-bottom: 1px dashed #4091fb;
                        padding-bottom: 20px;
                        line-height: 18px;
                    }

                }
                .signer-info-box{
                    width: 291px;
                    height: 185px;
                    background: #fdf6f1;
                    margin-top:20px;
                    border-radius: 5px;
                    box-sizing: border-box;
                    padding: 20px 10px;
                    p{
                        font-size: 18px;
                        color:#FBBB40;
                        padding-bottom: 20px;
                        line-height: 18px;
                        border-bottom: 1px dashed #FBBB40;
                    }
                }

            }

        }
    }
</style>
<style lang="scss" scoped>
    @import "../../../styles/BatchImport/BatchContractList/BatchContractList.scss";
</style>

