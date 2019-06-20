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
                <div class="sign-operate" v-if="isSIgner && currentPageCanSign" @click="signAll()">
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
                            width="55" 
                            :selectable="selectable"
                        >
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
                            label="当前状态"
                            width="120"
                            align="center">
                            <template slot-scope="scope">
                               <span>{{scope.row.contractStatus | filtercontractStatus}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="operation"
                            label="操作"
                            align="center">
                            <template slot-scope="scope">
                                <el-button  type="text" size="mini" v-if="scope.row.contractStatus == '1'" @click="singleSign(scope.row)">签署</el-button>
                                <el-button  type="text" size="mini" @click="previewContract(scope.row)">查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="pageNum"
                            :page-sizes="[10, 20, 50, 100]"
                            :page-size="10"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="totalItemNumber">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <div class="sign_dialog">
            <el-dialog
                title="校验签署密码"
                :visible.sync="dialogVisibleSign"
                :before-close="closeSign"
                width="30%">
                <div class="sign_element">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
                    <el-form-item label="请输入签署密码：" prop="password">
                    <el-input type="password" placeholder="请输入签署密码" maxlength="16" v-model="ruleForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                            <el-button @click="closeSign()">取 消</el-button>
                            <el-button type="primary" @click="submitForm('ruleForm')" :loading= load>确 定</el-button>
                        </span>
            </el-dialog>
        </div>

        <el-dialog title="合同详情图片"  :visible.sync="dialVisible" custom-class="ContractDialogs" :close-on-click-modal='false' :before-close="hideDialog">
            <div class="img-body">
                <div v-for="(item,index) in imgList" :key="index" >
                   
                    <img :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractImagePath='+item.contractImagePath" alt="" style='width:100%;'>

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
    import {getcontracts,contractkeywordsignNew,getContractImages,signleKeyWordSign,getsignresult} from '@/api/template.js';
    import {getContractDetails,contractimgs} from '@/api/detail.js';     //此处合同详情是有签章的故应调之前的老接口
    import { filtercontractStatus } from '@/common/js/filterStr.js'
    export default {
        name: 'OrderLists',
        filters: {filtercontractStatus},
        
        data () {
            var validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入签署密码'));
                } else{
                    callback()
                }
            };
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
                },
                pageNo: 1,
                pageSize: 10,
                isSIgner: true, //合同是否签署完成
                currentPageCanSign:true,  //当前页是否显示一键签署按钮 根据列表第一条数据状态判断
                dialogVisibleSign:false,
                ruleForm:{
                    password:'',
                },
                rules: {
                    password: [
                        { validator: validatePassword, trigger: 'blur' }
                    ],
                },
            }
        },
        methods:{
            hideDialog(){
                this.imgList = [];
                this.contractDetail = {};
                this.dialVisible = false;
                this.$loading.hide();
            },
            // 查看合同
            previewContract(val){
                this.dialVisible = true;
                let param = {
                    contractNo:val.contractNo,
                    conOrderNo: this.conOrderNo
                };

                this.$loading.show();

                //获取合同详情
                getContractDetails(this.interfaceCode,val.contractNo).then(res=>{  //随机数写在接口api里 避免每次都格外传入
                    // if(res.data.resultCode ==1){
                        let contractData = res.data.contractVo;
                        let signertData = res.data.signUserVo?res.data.signUserVo[0]:'';  //数组第一个代表企业 第二个代表个人
                        this.contractDetail = {
                            contractName:contractData.contractName,
                            validTimeStr:contractData.validTime,
                            userName:signertData.signUserName,
                            idCard:signertData.idCard,
                            mobile:signertData.mobile,
                        }

                }).catch(err=>{
                    
                });
                //获取合同图片

                contractimgs(this.interfaceCode,val.contractNo).then(res=>{
                    this.imgList = res.data;
                    this.$loading.hide(); //隐藏
                }).catch(err=>{

                });
            },
            selectable(row, index) {
                if(row.contractStatus == "1") {
                    return true
                } else {
                    return false;
                }
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
                this.pageSize = value;
                this.getData(this.pageNo, this.pageSize);
            },
            handleCurrentChange(value){
                this.pageNo = value;
                this.getData(this.pageNo, this.pageSize);
            },
            signAll(){
                if(this.paramsList.length==0){
                    this.$message({
                        type: 'warning',
                        message: '请勾选要签署的合同'
                    });
                }else{
                    let signVerify = cookie.getJSON('tenant')[1].signVerify;
                    if(signVerify == 1) {
                        this.dialogVisibleSign = true;
                    } else {
                        this.submitContract();
                    }
                }
                
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.validatePassword();
                    } else {
                        return false;
                    }
                });
            },
            validatePassword () {
                this.load = true;
                let signVerifyPassword = {
                    signVerifyPassword: md5(this.ruleForm.password)
                };
                const accountCode = sessionStorage.getItem("accountCode");
                verifySignPassword(accountCode, signVerifyPassword).then(res => {
                    if(res.data.resultCode == 1) {
                        this.submitContract();
                    } else {
                        this.$message({
                            type: 'error',
                            message: "签署密码错误"
                        });
                        this.repeat = true;
                        this.load = false;
                    }
                }).catch(error => {

                })
            },
            submitContract(){
                let param = {
                    signContractVoList:this.paramsList
                }
                contractkeywordsignNew(this.interfaceCode,this.conOrderNo,JSON.stringify(param)).then(res=>{
                    if(res.data.responseCode == 1){
                        this.$router.push('/BatchSigning')
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.data.responseMsg
                        });
                    }

                }).catch(error=>{

                })
            },
           
            singleSign(val){
                let contractNo=val.contractNo;
                sessionStorage.setItem('contractNo',contractNo);
                this.$router.push('./SingleSigning')

            },
            //一键签署和单个签署
            handleSelectionChange(value){
                let contractObj = [];
                for(let i = 0; i < value.length; i++) {
                    contractObj.push({
                        contractNo: value[i].contractNo,
                        contractName: value[i].contractName,
                        mobile: value[i].mobile
                    }) 
                }
                this.paramsList = contractObj;

            },
            getData(){
                let params={
                    pageNo:this.pageNo,
                    pageSize:this.pageSize,
                };
                this.$loading.show();
                getcontracts(this.accountCode,this.conOrderNo,params).then(res=>{
                    setTimeout(()=>{
                        this.$loading.hide();
                    },1000)
                    if(res.data.resultCode==1){
                        this.totalItemNumber=res.data.data.totalItemNumber;
                        this.tableData=res.data.dataList;
                        this.currentPageCanSign = res.data.dataList[0].contractStatus == 1?true:false
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.data.resultMessage
                        });
                    }
                }).catch(error=>{

                })
            },
            //查询合同是否都签署完成
            getSIgned() {
                getsignresult(this.interfaceCode, this.conOrderNo).then(res => {
                    if(res.data.resultCode == "1") {
                        let data = res.data.data,
                        failNum = data.failNum,
                        signRoomLink = data.signRoomLink,
                        successNum = data.successNum,
                        totalNum = data.totalNum;
                        if(successNum == totalNum) {
                            this.isSIgner = false;
                        }
                    }
                }).catch(error => {

                })
            }
        },

        created() {
            this.getData(this.pageNo, this.pageSize);
            // this.getSIgned();
        }
    }
</script>
<style lang="scss">
    @import "../../../common/styles/content.scss";
    .BatchContractLists {
        .el-dialog__wrapper{
            background: rgba(0,0,0,0.5);
            .img-body{
                img{
                    width:100%;
                    margin-bottom: 10px;
                }
            }
            .ContractDialogs{
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
                top: 0px;
                ul li {
                    line-height: 14px;
                    margin-top:20px;
                    .info-title{
                        font-size: 14px;
                        color:#666;
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

