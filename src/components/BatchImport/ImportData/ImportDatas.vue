<template>
    <div class="main">
        <div class="Tops">
      <nav class='nav'>
        <p class='logo'>
          <img src="/static/images/logo2.png" alt="">
        </p>
        <div class='buttons'>
          <el-button type="info" style='background:#ccc' :disabled="hasClick" @click="SingleTempCancel">取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</el-button>
          <el-button style='color:#4091fb' @click="nextStepFit" :loading=load>生成合同</el-button>
        </div>
      </nav>
    </div>
        <div class="title" style="margin-top: 15px">导入数据</div>
        <div class="line"></div>
        <div class="import-info">
            <p class="batch-num">
                <span>批量编号：</span>
                <span class="num">{{uploadParams.conOrderNo}}</span>
            </p>
            <div class="info-box">
                <div class="importinfo-left boxshadow">
                    <div class="result-list">
                        <ul>
                            <li class="result-item  result-item-left">
                                <p>共导入数据
                                    <span>{{total}}</span>
                                    条
                                </p>
                            </li>
                                <li class="result-item result-item-center">
                                <p>校验通过
                                    <span>{{passed}}</span>
                                    条
                                </p>
                            </li>
                            <li class="result-item result-item-right">
                                <p>校验未通过
                                    <span>{{unpassed}}</span>
                                    条
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div class="result-btn">
                        <el-upload
                            class="upload-demo"
                            ref="upload"
                            :action="uploadUrl()"
                            :before-upload="handleChange"
                            :on-success="fileSuccess"
                            :show-file-list="false"
                            :file-list="fileList"
                            accept=".xls,.xlsx"
                            :data=uploadParams
                            element-loading-text="拼命上传中"
                            element-loading-background="rgba(0, 0, 0, 0.5)"
                            multiple
                        >
                            <el-button type="primary" class="continue-import">继续导入</el-button>
                        </el-upload>
                        <el-button type="primary" class="import-data" @click="downloadTemplate">导出数据</el-button>  
                    </div>
                </div>
            </div>
        </div>
        <div class="title" style="margin-top: 15px">签署人信息</div>
        <div class="line"></div>
        <div class="table" style="width: 100%;padding:15px;box-sizing: border-box;">
            <el-table
                :data="importData"
                style="width: 100%;text-align:center"
                :header-cell-style="getRowClass"
                >
                <el-table-column
                    prop="userName"
                    label="签署人名称"
                    align="center"
                    width="">
                </el-table-column>
                <el-table-column
                    prop="mobile"
                    label="手机号"
                    align="center"
                    width="">
                </el-table-column>
                <el-table-column
                    prop="idCard"
                    label="身份证号"
                    align="center"
                    width="">
                </el-table-column>
                <el-table-column
                    prop="operation"
                    align="center"
                    label="操作"
                    width=""
                >
                    <template slot-scope="scope">
                        <el-button type="primary" @click="previewContract(scope.row)" size="mini">预览</el-button>
                        <el-button type="primary" size="mini" @click="signerDel(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class='pagetion'>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total=Number(num)>
            </el-pagination>
        </div>
        <el-dialog title="合同详情图片"  :visible.sync="dialVisible" custom-class="importDataDialogs" :before-close="hideDialog">
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
    </div>
</template>
<script>
import { getContractOrder, getContractList, createContract, downloadErrorExcel, delContractSigner, getContractImages } from '@/api/template'
export default {
    name:'ImportData',
    data() {
        return{
            //预览签署人信心
            contractSignInfo: {},
            //预览弹框标识
            dialVisible:false,
            //预览签署人信息图片列表
            imgList:[],
            //签署人列表总条数
            num: 0,
            //签署人当前显示页数
            currentPage:1,
            //签署人分页第几页
            pageNo: 1,
            //签署人分页每页显示多少页
            pageSize: 10,
            //检验通过数据
            passed:'',
            //检验未通过数据
            unpassed:'',
            //本次共导入数据
            total:'',
            //生成合同单点操作
            hasClick:false,
            //生成合同load提示
            load: false,
            //服务地址
            baseURL:this.baseURL.BASE_URL,
            //签署人列表数据
            importData:[],
            //上传文件列表
            fileList:[],
            //批量编号
            uploadParams: {
                conOrderNo: sessionStorage.getItem("conOrderNo")
            },
        }
    },
    methods:{
        hideDialog(){
            this.imgList = [];
            this.contractSignInfo = {};
            this.dialVisible = false;
        },
        //导出错误数据
        downloadTemplate() {
            let downloadUrl = downloadErrorExcel(this.uploadParams.conOrderNo);
            let downloadTag = document.createElement('a');
            document.body.appendChild(downloadTag)
            downloadTag.setAttribute('href',downloadUrl);
            downloadTag.click()
        },
        //继续上传地址
        uploadUrl() {
            return `${this.baseURL}/restapi/wesign/v1.9/tenant/RepeatedlyReadExcel`
        },
        //上传文件
        handleChange(name){
            this.$loading.show();
            let max_size = 10; // 5M
            let fileContName = name.name.replace(/\s+/g, "");
            let reg = /[.](xls|xlsx)$/;
            if (!reg.test(fileContName)) {
                this.$message({
                    showClose: true,
                    message: "只能传excel格式的文件",
                    type: "error"
                });
                this.$refs.upload.clearFiles();
                this.$loading.hide();
                return false;
            } else if (name.size > max_size * 1024 * 1024) {
                this.$message({
                    showClose: true,
                    message: "文件大小超过限制",
                    type: "error"
                });
                this.$refs.upload.clearFiles();
                this.$loading.hide();
                return false;
            }else if (fileContName.length > 50) {
                this.$message({
                    showClose: true,
                    message: "上传文件名称不得超过50字符！",
                    type: "error"
                });
                this.$refs.upload.clearFiles();
                this.$loading.hide();
                return false;
            }else {
                
            }
            this.$loading.hide()
        },
        //上传文件成功回显
        fileSuccess(res){
            if(res.resultCode == "1") {
                this.getSignerInfo(this.pageNo, this.pageSize);
                let params = {
                    conOrderNo: res.data.conOrderNo
                }
                this.getImportInfo(params);
            } else {
                this.$message({
                    showClose: true,
                    message: res.data.resultMessage,
                    type: "error"
                });
            }
        },
        //切换分页每页显示数据
        handleSizeChange(pageSize){
            this.pageSize = pageSize;
            this.getSignerInfo(this.pageNo, this.pageSize);
        },
        //切换分页显示第几页
        handleCurrentChange(pageNo){
            this.pageNo = pageNo;
            this.getSignerInfo(this.pageNo, this.pageSize);
        },
        //删除签署人
        signerDel(row) {
            let delParams = {
                contractNo: row.contractNo,
                userCode: row.userCode,
                conOrderNo: this.uploadParams.conOrderNo,
                mobile: row.mobile,
            }
            this.$confirm('此操作删除该签署人, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delContractSigner(delParams).then(res => {
                    if(res.data.resultCode == "1") {
                        const searchParams = {
                            conOrderNo: delParams.contractNo
                        }
                        this.getImportInfo(searchParams);
                        this.getSignerInfo(this.pageNo, this.pageSize);
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.resultMessage
                        });
                    }
                }).catch(error => {

                })
                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        //生成合同
        nextStepFit(){
            if(!this.importData.length) {
                this.$message({
                    showClose: true,
                    message: "签署人不能为空",
                    type: "warning"
                });
                return;
            }
            this.load = true;
            let params = {
                conOrderNo: this.uploadParams.conOrderNo
            }
            let interfaceCode = sessionStorage.getItem("interfaceCode");
            createContract(interfaceCode, params).then(res => {
               if(res.data.resultCode == "1") {
                   this.load = false;
                   this.$router.push("/CreateContract");
               } else {
                    this.$message({
                        showClose: true,
                        message: res.data.resultMessage,
                        type: "error"
                    });
                    this.load = false;
               }
            }).catch(error => {

            })
        },
        //取消
        SingleTempCancel() {    //取消操作
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
        // 预览合同
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
        //修改table样式
        getRowClass({ row, column, rowIndex, columnIndex }) {
            if (rowIndex == 0) {
                return 'background:#efefef;font-weight:bold;'
            } else {
                return ''
            }
        },
        //导入数据信息
        getImportInfo(params) {
            getContractOrder(params).then(res => {
                if(res.data.resultCode == "1") {
                    this.total = res.data.data.totalItem
                    this.passed = res.data.data.successItem
                    this.unpassed = res.data.data.failureItem
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
        //获取签署人信息
        getSignerInfo(pageNo, pageSize){
            let signParams = {
                conOrderNo: this.uploadParams.conOrderNo,
                pageNo: pageNo,
                pageSize: pageSize,
            };
            getContractList(signParams).then(res => {
                if(res.data.resultCode == "1") {
                    this.importData = res.data.dataList;
                    this.num = res.data.data.totalItemNumber;
                } else {
                    this.$message({
                        showClose: true,
                        message: res.data.resultMessage,
                        type: "error"
                    });
                }
            }).catch(error => {

            })
        }
    },
    created() {
        const params = {
            conOrderNo: this.uploadParams.conOrderNo
        };
        this.getImportInfo(params)
        this.getSignerInfo(this.pageNo, this.pageSize);
    }
}
</script>

<style lang="scss">
    @import "../../../common/styles/Tops.css";
    @import "../../../common/styles/content.scss";
    .ImportData .main{
        background: #fff;
        margin-top:105px;
        box-sizing: border-box;
        padding: 10px 15px;
            .title{
            height: 46px;
            line-height: 46px;
            padding-left: 40px;
            color: #fff;
            font-size: 20px;
            padding-top: 0 !important;
            border-top: none !important;
            background: url(/static/images/Common/title.png) no-repeat;
            margin-top: 20px;
        }
        .import-info{
            padding-left:10px;
            border-bottom: 1px dashed #999;
            padding-bottom: 14px;
            .batch-num{
                font-size: 16px;
                .num{
                    color:#529bfb;
                }
            }
            .info-box{
                width: 754px;
                margin: 0 auto;
                margin-top: 20px;
                display: flex;
                justify-content: space-between;
                // .dashed-line{
                //     height:215px;
                //     border-left:1px dashed #529bfb;
                //     width:1px;
                // }
                .boxshadow{
                    // box-shadow: 1px 2px 10px #ccc;
                    border-radius: 3px;
                    width:537px;
                }
                .importinfo-left{
                    width:560px;
                    padding:0 10px;
                    display: flex;
                     .result-list ul{
                        display: flex;
                        box-sizing: border-box;
                    }
                    .result-item{
                        width: 174px;
                        text-align: center;
                        height: 121px;
                        box-sizing: border-box;
                        border-radius: 3px;
                        p{
                            margin-top:90px;
                        }
                    }
                    .result-item-left{
                        background: url('/static/images/BatchImport/batch-total.png') no-repeat;
                        span{
                            font-size: 18px;
                            color:#529bfb
                        }
                    }
                    .result-item-center{
                        background: url('/static/images/BatchImport/batch-pass.png') no-repeat;
                        span{
                            font-size: 18px;
                            color:#fb9c40
                        }
                    }
                    .result-item-right{
                        background: url('/static/images/BatchImport/batch-unpass.png') no-repeat;
                        span{
                            font-size: 18px;
                            color:#ff0000
                        }
                    }
                    .result-item img{
                        width:100%
                    }
                    .result-item-center{
                        margin:0 18px;
                    }
                    .result-btn{
                        text-align: center;
                        margin-top:20px;
                        margin-left: 30px;
                        .el-button+.el-button {
                            margin-left: 0;
                            margin-top: 20px;
                        }
                        .el-button{
                            background: #fff;
                            color: #4091fb;
                            width: 140px;
                            height: 36px;
                        }
                        .import-data{
                            color: #FB9C40;
                            border-color:#FB9C40;
                            margin-top: 15px;
                        }
                    }
                }
                // .importinfo-right{
                //     .unpass-title{
                //         font-size: 18px;
                //         color:#4091fb;
                //     }
                //     .reason-list{
                //         width: 495px;
                //         height: 109px;
                //         border:1px solid #4091fb;
                //         border-radius: 3px;
                //         margin-top:18px;
                //         overflow:auto;
                //         padding: 10px;
                //         box-sizing: border-box;
                //     }
                //     .item{
                //         margin-bottom: 14px;
                //     }
                // }
            }
           
        }
        /deep/ .el-dialog__wrapper{
            .img-body{
                img{
                    width:100%;
                    margin-bottom: 10px;
                }
            }
            .importDataDialogs{
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

