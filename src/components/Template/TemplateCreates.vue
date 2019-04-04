<template>
    <div class='Template'>
        <div class='main'>
            <div class="common-top">
                <div class="common-top-tab">
                    <div :class="[activeTab?'btn-active':'btn-default']" @click="signCreate">单次发起合同</div>
                    <div :class="[activeTab?'btn-default':'btn-active']" style="margin-left: -5px;" @click="batchCreate">批量发起合同</div>
                </div>
            </div>
            <div class="template-body">
                <div class="template-title">
                    <div class="title-bg">
                        <span class="title-name">模板列表</span>
                        <span class="title-tip" v-if="activeTab==1">单次发起合同：一次发起一份合同，合同签署方数量以模板限定签署方数量为准</span>
                        <span class="title-tip" v-if="activeTab==0">批量发起合同：一次批量发起多份合同，发起方与每个签署方签署一份独立合同</span>
                         <span class="search-btn">
                            <input type="text" id='textInfoModel' placeholder="请输入模板名称" max-length='20' v-model="inputTempBatch">
                            <el-button type="primary"  style='margin-left:5px;letter-spacing:5px;' @click="queryTempBatch">搜索</el-button>
                        </span>
                   </div>

                </div>

                <div class="line"></div>
                <div class="template-list">
                    <ul>
                        <li v-for="(item,index) in contractList" :key="index" >
                            <div class="contract-box">
                                <div class="contract-content">
                                    <div class="content-left">
                                        <p>{{item.templateName}}</p>
                                    </div>
                                    <div class="content-right">
                                        <h3>{{item.templateName}}</h3>
                                        <p class="item-name">
                                            <span class="initiator item-default">发起方角色：</span>
                                            <span class="initiator">{{item.Character}}</span>
                                        </p>
                                        <p class="item-name">
                                            <span class="initiator item-default">绑定账号：</span>
                                            <span class="initiator">{{item.Character}}</span>
                                        </p>
                                        <p class="item-name">
                                            <span class="initiator item-default">累计发起：</span>
                                            <span class="initiator-total"><span class="total-num">{{item.total}}</span>次</span>
                                        </p>
                                        <p class="item-name upload-time">
                                            <span class="initiator item-default">上传时间：</span>
                                            <span class="initiator">{{item.tempalateDate}}</span>
                                        </p>
                                        <p >
                                            <span class="item-option">
                                                <img src="/static/images/Multiparty/see.png" alt="">
                                                <span>在线预览</span>
                                            </span>

                                            <span class="item-option">
                                                <img src="/static/images/Multiparty/creater.png" alt="">
                                                <span>立即发起</span>
                                            </span>

                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="line"></div>
                        </li>
                    </ul>
                    <div class='pagetion'>
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-size="10"
                        layout="total,prev, pager, next, jumper"
                        :total=Number(this.total)>
                        </el-pagination>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>
<script>
import server from "@/api/url";
import cookie from '@/common/js/getTenant'

export default {
  name: 'Template',
    data() {
        return {
            activeTab:1,
            inputTempBatch:'',
            contractList:[],
            currentPage:1,
            total:'1',
            requestParams:{                    //列表请求参数
                templateName:'',
                pageNum:1,
                userStatus:1,
                pageSize:10,
                templateSpecies:'single',
                order:'DESC'
            }
        }
    },
    created(){
        this.signCreate();
        this.batchCreate();
    },
    methods:{
        //单次发起合同
        signCreate(){
            this.activeTab = 1
            this.requestParams = {
                templateName:'',
                pageNum:1,
                userStatus:1,
                pageSize:10,
                templateSpecies:'single',
                order:'DESC'
            }
            this.getList(this.requestParams);
        },
        //批量发起合同
        batchCreate(){
            this.activeTab = 0;
            this.requestParams = {
                templateName:'',
                pageNum:1,
                userStatus:1,
                pageSize:10,
                templateSpecies:'batch',
                order:'DESC'
            }
            this.getList(this.requestParams);

        },
        //模板查询
        queryTempBatch(){

        },
        //获取合同列表
        getList(params){
            let list=[];
            this.contractList=[];
            server.templateList(params).then(res=>{
              for (let i = 0; i < res.data.contents.length;i++) {
                     var obj = {}
                        obj.templateNo = res.data.contents[i][1]
                        obj.templateName = res.data.contents[i][3]
                        obj.tempalateDate = res.data.contents[i][7]
                        obj.signatory = res.data.contents[i][8]
                        if (obj.signatory == '' || obj.signatory == null){
                            obj.signatory = ''
                        } else {
                            obj.signatory += '方'
                        }
                      list.push(obj)
                    }
               this.contractList = list;
               this.total = res.data.totalItemNumber
                this.loading = false;


            }).catch(erro=>{

            })
        },

        handleSizeChange(){

        },
        handleCurrentChange(){

        },

    }


}
</script>
<style lang="scss" scoped>
  	@import "../../common/styles/content.scss";


    .template-body{
        background: #fff;
        padding-bottom: 60px;
        .template-title{
             padding:20px 15px 0 15px;
            .title-bg{
                background: url('/static/images/Common/title.png') no-repeat;
                height:46px;
            }
            .title-name{
                color: #fff;
                font-size: 20px;
                font-weight: 700;
                margin-left: 28px;
                margin-top: 10px;
                display: inline-block;
                letter-spacing: 2px;
                width:204px;
            }
            .title-tip{
                font-size: 14px;
                color: red;
            }
            .search-btn{
                margin-left: 100px;
               #search-btn{
                 display: inline-block;
                 width: 200px;
                 height: 38px;
                 padding-left: 5px;
                 padding-right: 5px;
                 outline: none;
                 border: 1px solid #ddd;
                 border-radius: 3px;
                 margin-right: 20px
                }
            }
        }
        .template-list{
            .contract-box{
                padding:0px 25px;
                .contract-content{
                    overflow: hidden;
                    padding:20px 28px;
                    border:1px solid#fff;
                    .content-left{
                        cursor: pointer;
                        float: left;
                        height:270px;
                        width:180px;
                        background: #ddd;
                        position: relative;
                        p{
                            text-align: center;
                            word-wrap: break-word;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            background: #4091fb;
                            color: #fff;
                            font-size: 20px;
                            line-height: 50px;
                            height: 50px;
                            font-weight: 600;
                            position: absolute;
                            bottom: 0;
                            width: 100%;
                            visibility: hidden;
                        }
                    }
                    .content-left:hover p{
                        visibility: visible;
                        transform: visibility 3s ease-in;
                    }
                     .content-right{
                         float: left;
                         margin-left:24px;
                         h3{
                             font-size: 20px;
                             line-height: 20px;
                             margin-bottom:20px;
                             color:#4091fb;
                             font-weight: 700;
                             margin-top:14px;
                         }
                         .item-name{
                             height:34px;
                             font-size: 14px;
                             color: #666;
                             .item-default{
                                width:84px;
                                display: inline-block;
                                text-align:justify;
                                text-justify:distribute-all-lines;/*ie6-8*/
                                text-align-last:justify;/* ie9*/
                                -moz-text-align-last:justify;/*ff*/
                                -webkit-text-align-last:justify;/*chrome 20+*/
                             }
                             .total-num{
                                 font-size: 18px;
                                 color:#ff9d45;
                             }
                         }
                         .item-option{
                             float: left;
                             text-align: center;
                             margin-right: 40px;
                             cursor: pointer;
                             span{
                                color:#4091fb;
                                display: block;
                                margin-top:14px;
                             }
                         }
                        .upload-time{
                            font-size: 12px;
                            color:#999;
                        }
                     }
                }
                .contract-content:hover{
                     border:1px solid #4091fb;
                     background: #fafafa;
                     transition: border 1s linear,background 1s linear;
                }
            }

        }
    }


</style>


