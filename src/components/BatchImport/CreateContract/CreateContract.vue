<template>
    <div class="signing-contain">
        <div class="Tops">
            <nav class='nav'>
                <p class='logo'>
                    <img src="/static/images/logo2.png" alt="">
                </p>
                <div class='buttons'>
                    <el-button type="info" style='background:#ccc' :disabled="hasClick" @click="SigleTempCancel">取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</el-button>
                    <el-button style='color:#4091fb' @click="nextStepFit" :loading=loading>一键签署</el-button>
                </div>
            </nav>
        </div>
        <div class="main-batch">
            <div class="main-batch-title">
                <div class="create-batch">创建合同</div>
            </div>
            <div class="create-batch-number">
                <span>批量编号</span>
                <span>{{conOrderNo}}</span>
            </div>
            <div class="create-batch-table">
                <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%"
                    :row-style="tableRowStyle"
                    :header-cell-style="tableHeaderColor">
                    <el-table-column
                        prop="contractName"
                        label="合同名称"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="signers"
                        label="签署人名称"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="发起时间"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="validTime"
                        label="截止时间"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        label="当前状态"
                        align="center">
                            <template slot-scope="scope">
                                <div>
                                    {{
                                        scope.row.contractStatus == "0" ? "已过期" : (scope.row.contractStatus == 1 ? "待我签署" : (scope.row.contractStatus == 2 ? "待他人签署":"已生效"))
                                    }}
                                </div>
                            </template> 
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center"
                        width="200">
                        <template slot-scope="scope">
                            <el-button @click="previewContract(scope.row)" type="text" size="small">查看</el-button>
                        </template>
                    </el-table-column>
		        </el-table>
                <div class="block">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[10, 20, 50, 100]"
                        :current-page="1"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalItemNumber">
                    </el-pagination>
                </div>
            </div>
        </div>
        <el-dialog title="合同详情图片"  :visible.sync="dialVisible" custom-class="createContractDialogs" :before-close="hideDialog">
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
                           <span class="content">{{contractSignInfo.contractName}}</span>
                       </li>
                        <li>
                           <span class="info-title">签署截止日期：</span>
                           <span class="content">{{contractSignInfo.validTimeStr}}</span>
                       </li>
                   </ul>
                </div>
                <div class="signer-info-box">
                    <p>签署人员</p>
                    <ul>
                       <li>
                           <span class="info-title">姓名：</span>
                           <span class="content">{{contractSignInfo.userName}}</span>
                       </li>
                        <li>
                           <span class="info-title">身份证号：</span>
                           <span class="content">{{contractSignInfo.idCard}}</span>
                       </li>
                       <li>
                           <span class="info-title">手机号码：</span>
                           <span class="content">{{contractSignInfo.mobile}}</span>
                       </li>
                   </ul>
                </div>
            </div>
           
        </el-dialog>
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
        <Bottom></Bottom>
    </div>
</template>
<script>
import Bottom from '@/common/components/Bottom.vue';
import cookie from '@/common/js/getTenant';
import { verifySignPassword } from '@/api/personal';
import md5 from "js-md5";
import { getContractLists, getContractImages, contractkeywordsignNew } from '@/api/template'
export default {
    name: "CreateContract",
    data(){
        var validatePassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入签署密码'));
            } else{
                callback()
            }
        };
        return {
            //取消按钮操作
            hasClick: false,
            //一键签署loading标识
            loading: false,
            //验证码提交标识
            load: false,
            //合同列表总共条数
            totalItemNumber: 20,
            //合同订单编号
            conOrderNo: sessionStorage.getItem("conOrderNo"),
            //表单数据
            tableData: [],
            //分页-第几页
            pageNo: 1,
            //分页-每页显示多少条数据
            pageSize: 10,
            //查看合同详情弹框标识
            dialVisible:false,
            //查看合同详情图片列表
            imgList:[],
            //查看合同详情-合同信息
            contractSignInfo: {},
            //服务地址引用
            baseURL:this.baseURL.BASE_URL,
            //校验验证码弹框
            dialogVisibleSign: false,
            //验证码校验规则
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
    components: {
        Bottom
    },
    created() {
        //进去页面获取table数据
        this.getContractInfo(this.pageNo, this.pageSize); 
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function () {
            history.pushState(null, null, document.URL);
        });
    },
    methods: {
        hideDialog(){
            this.imgList = [];
            this.contractSignInfo = {};
            this.dialVisible = false;
        },
        //获取table数据
        getContractInfo(pageNo, pageSize) {
            let contractInfo = {
                pageNo: pageNo,
                pageSize: pageSize
            }
            const accountCode = sessionStorage.getItem("accountCode");
            getContractLists(accountCode, this.conOrderNo, contractInfo).then(res => {
                if(res.data.resultCode == "1") {
                    this.tableData = res.data.dataList;
                    this.totalItemNumber = res.data.data.totalItemNumber;
                } else {
                    
                }
            }).catch(error => {

            })
        },
        //取消按钮操作
        SigleTempCancel() {    //取消操作
            this.$store.dispatch('tabIndex',{tabIndex:0});  //导航高亮
            const h = this.$createElement;
            this.hasClick = true;
            this.$msgbox({
            title: '提示',
            message: h('p', null, [
                h('span', null, ' 确定将返回首页'),
                h('i', { style: 'color: teal' }, '')
            ]),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '执行中...';
                setTimeout(() => {
                    done();
                    this.$router.push('/Home')
                    setTimeout(() => {
                    instance.confirmButtonLoading = false;
                    }, 50);
                }, 100);
                } else {
                this.hasClick = false;
                done();
                }
            }
            })
        },
        //一键签署
        nextStepFit(){
            this.loading = true;
            let signVerify = cookie.getJSON('tenant')[1].signVerify;
            if(signVerify == 1) {
                this.dialogVisibleSign = true;
            } else {
                this.keySign();
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
        //关闭验证码弹框
        closeSign() {
            this.$message({
                type: 'info',
                message: "取消签署"
            });
            this.dialogVisibleSign = false;
            this.$refs.ruleForm.resetFields();
            this.loading = false;
        },
        validatePassword () {
            this.load = true;
            let signVerifyPassword = {
                signVerifyPassword: md5(this.ruleForm.password)
            };
            const accountCode = sessionStorage.getItem("accountCode");
            verifySignPassword(accountCode, signVerifyPassword).then(res => {
                if(res.data.resultCode == 1) {
                    this.keySign();
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
        keySign() {
            let interfaceCode = sessionStorage.getItem("interfaceCode");
            contractkeywordsignNew(interfaceCode, this.conOrderNo, JSON.stringify({})).then(res => {
               if(res.data.responseCode == "1") {
                   this.dialogVisibleSign = false;
                   this.load = false;
                   this.$router.push("/BatchSigning");
               } else {
                   this.$message({
                        showClose: true,
                        message: res.data.responseMsg,
                        type: "error"
                    });
                    this.load = false;
                    this.loading = false;
               }
            }).catch(error => {

            })
        },
        // 查看合同
        previewContract(row){

            const previewContractParams = {
                contractNo: row.contractNo
            };
            this.dialVisible = true;
            let t = Math.random();
            this.$loading.show();
            getContractImages(previewContractParams,t).then(res => {
                setTimeout(()=>{
                    this.$loading.hide();
                },1000);
                if(res.data.resultCode == "1") {
                    this.imgList = res.data.dataList;
                    this.contractSignInfo = res.data.data;
                } else {
                    this.$message({
                        showClose: true,
                        message: res.data.resultMessage,
                        type: "error"
                    });
                }
             }).catch(error => {

            })
        },
        //修改每页显示多少数据
        handleSizeChange(val) {
            this.pageSize = val;
            this.getContractInfo(this.pageNo, this.pageSize);
        },
        //点击切换分页数据
		handleCurrentChange(val) {
            this.pageNo = val;
			this.getContractInfo(this.pageNo, this.pageSize);
        },
        //修改table样式
		tableRowStyle({ row, rowIndex }) {
			return 'border: 1px solid red;'
        },
        //修改th样式
		tableHeaderColor({ row, column, rowIndex, columnIndex }) {
			if (rowIndex === 0) {
				return 'background-color: rgb(245, 245, 245);font-weight: bold;color: #333333;'
			}
		},
    }
}
</script>
<style lang="scss" scoped>
@import "../../../common/styles/Tops.css";
@import "../../../common/styles/content.scss";
.signing-contain {
    .main-batch {
        width: 1200px;
        background-color: #fff;
        margin: 0 auto;
        margin-top: 100px;
        padding: 15px;
        .main-batch-title {
            border-bottom: 1px solid #ddd;
            padding-bottom: 15px;
            .create-batch {
                height: 46px;
                line-height: 46px;
                background: url("/static/images/Common/title.png") no-repeat;
                padding-left: 40px;
                font-size: 20px;
                color: #fff;
            }
        }
        .create-batch-number {
            padding: 15px 0;
        }
        .create-batch-table {
            background-color: #fff;
        }
        .block {
            text-align: center;
            margin: 60px;
        }
            
    }
    /deep/ .el-dialog__wrapper{
        .img-body{
            img{
                width:100%;
                margin-bottom: 10px;
            }
        }
        .createContractDialogs{
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
