<template>
    <div class="main">
        <div class="title" style="margin-top: 15px">导入数据</div>
        <div class="line"></div>
        <div class="import-info">
            <p class="batch-num">
                <span>批量编号：</span>
                <span class="num">{{batchNun}}</span>
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
                        <el-button type="primary" class="continue-import">继续导入</el-button>
                        <el-button type="primary" class="import-data">导出数据</el-button>
                    </div>
                </div>
                <!-- <div class="dashed-line"></div>
                <div class="importinfo-right boxshadow">
                    <p class="unpass-title">未通过原因</p>
                    <div class="reason-list">
                        <p class="item" v-for="(item,index) in reasonList" :key="index" >
                            <span>{{index+1}}</span>
                            <span>{{item.reason}}</span>
                        </p>
                    </div>
                </div> -->
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
                    prop="num"
                    label="序号"
                    align="center"
                    width="">
                </el-table-column>
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
                        <el-button type="primary" @click="previerContract(scope.row)" size="mini">预览</el-button>
                        <el-button type="primary" size="mini">删除</el-button>
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
        <el-dialog title="合同详情图片"  :visible.sync="dialVisible" custom-class="showDialogs">
            <div class="img-body">
                <div v-for="(item,index) in imgList" :key="index" >
                    <img :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractUrl='+item" alt="" style='width:100%;'>
                </div>
                <img src="https://www.zqsign.com/restapi/wesign/v1/tenant/contract/img?contractUrl=group2/M01/5E/6F/wKgAGlzsnEOAJBgYAAdpDEThwJs569.JPG" alt="">
                <img src="https://www.zqsign.com/restapi/wesign/v1/tenant/contract/img?contractUrl=group2/M01/5E/6F/wKgAGlzsnEOAJBgYAAdpDEThwJs569.JPG" alt="">
                <img src="https://www.zqsign.com/restapi/wesign/v1/tenant/contract/img?contractUrl=group2/M01/5E/6F/wKgAGlzsnEOAJBgYAAdpDEThwJs569.JPG" alt="">
                <img src="https://www.zqsign.com/restapi/wesign/v1/tenant/contract/img?contractUrl=group2/M01/5E/6F/wKgAGlzsnEOAJBgYAAdpDEThwJs569.JPG" alt="">
                <img src="https://www.zqsign.com/restapi/wesign/v1/tenant/contract/img?contractUrl=group2/M01/5E/6F/wKgAGlzsnEOAJBgYAAdpDEThwJs569.JPG" alt="">
                <img src="https://www.zqsign.com/restapi/wesign/v1/tenant/contract/img?contractUrl=group2/M01/5E/6F/wKgAGlzsnEOAJBgYAAdpDEThwJs569.JPG" alt="">
            </div>
            <div class="contract-detail">
                <div class="contract-info-box">
                    <p>合同信息</p>
                   <ul>
                       <li>
                           <span class="info-title">合同名称：</span>
                           <span class="content">租房</span>
                       </li>
                        <li>
                           <span class="info-title">签署截止日期：</span>
                           <span class="content">永久有效</span>
                       </li>
                   </ul>
                </div>
                <div class="signer-info-box">
                    <p>签署人员</p>
                    <ul>
                       <li>
                           <span class="info-title">姓名：</span>
                           <span class="content">租房</span>
                       </li>
                        <li>
                           <span class="info-title">身份证号：</span>
                           <span class="content">111111111123122232</span>
                       </li>
                       <li>
                           <span class="info-title">手机号码：</span>
                           <span class="content">111111111123122232</span>
                       </li>
                   </ul>
                </div>
            </div>
           
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:'ImportData',
    data() {
        return{
            dialVisible:false,
            imgList:[],
            num:'',
            currentPage:1,
            centerDialogVisible:false,
            batchNun:'266878779978',
            passed:'12313',
            unpassed:'12313',
            total:'3322',
            reasonList:[
                {
                    reason:'的地方的好时机发生符合发的说法卡'
                },{
                    reason:'费哦啊好多事覅滑丝胡覅都会 '
                }
            ],
            importData:[
                {
                    num:47,
                    userName:'测试',
                    mobile:'13651305434',
                    idCard:130689898989878987,
                    status:2
                },{
                    num:4,
                    userName:'测试33',
                    mobile:'13651305434',
                    idCard:130689898989878987,
                    status:2
                }
            ]
        }
    },
    methods:{
        handleSizeChange(){

        },
        handleCurrentChange(){

        },
        nextStepFit(){

        },
        // 查看合同
        previerContract(){
            this.dialVisible = true;
        },
        getRowClass({ row, column, rowIndex, columnIndex }) {
            if (rowIndex == 0) {
                return 'background:#efefef;font-weight:bold;'
            } else {
                return ''
            }
        },
    }
}
</script>

<style lang="scss">
   @import "@/common/styles/content.scss";
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
                .dashed-line{
                    height:215px;
                    border-left:1px dashed #529bfb;
                    width:1px;
                }
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
                        }
                    }
                }
                .importinfo-right{
                    .unpass-title{
                        font-size: 18px;
                        color:#4091fb;
                    }
                    .reason-list{
                        width: 495px;
                        height: 109px;
                        border:1px solid #4091fb;
                        border-radius: 3px;
                        margin-top:18px;
                        overflow:auto;
                        padding: 10px;
                        box-sizing: border-box;
                    }
                    .item{
                        margin-bottom: 14px;
                    }
                }
               
               

            }
           
        }
        /deep/ .el-dialog__wrapper{
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

