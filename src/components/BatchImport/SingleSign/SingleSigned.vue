
<template>
    <div>
        <Top></Top>
        <div class="Completes">
            <div class="state" style="padding-top:200px;">
                <div class="stateInfo">
                    <div>
                        <img src="/static/images/Common/contract-sign-success.png" alt="" style="margin-top: 10px;">
                    </div>
                    <div style="margin-left: 30px;">
                        <span>恭喜,合同签署成功！</span>

                        <p style="margin-top: 30px;">众签已将该合同通过短信方式通知其他签署人</p>
                    </div>
                </div>
            </div>
            <!-- 合同所有信息开始 -->
            <div class="contractInfo">
                <div class="oneInfo">
                    <h3 class='infoss'>合同信息</h3>
                    <ul id="oneInfos">
                        <li><p ><span>合同名称：</span>
                            <el-tooltip placement="top">
                                <div slot="content">{{getContractName}}</div>
                                <span id='nameInfo'>{{getContractName}}</span>
                            </el-tooltip>
                            <a href="javascript:void(0);" @click="seeContractImg" style='color:#4091fb'>查看合同</a>
                        </p></li>
                        <li><p><span>截止时间：</span><span>{{validTime}}</span></p></li>
                        <li style='float:left'>签署人员：</li>
                        <ol id='details'>
                            <li v-for="(item,index) in signUser" :key="index">
                                <el-tooltip placement="top">
                                    <div slot="content">{{item.signUserName}}</div>
                                    <span class='name'>{{item.signUserName}}</span>
                                </el-tooltip>
                                <span style='color:#4091fb;'  v-if="item.signStatus == 1">已签署</span>
                                <span style='color:red;'  v-else>未签署</span>
                            </li>
                        </ol>
                    </ul>
                </div>
                <dl class="second">
                    <dd><h3>合同分享</h3></dd>
                    <dd><p><span>合同链接：</span><span id='contractAddress'>{{contractlink}}</span></p></dd>  <!--加查看对应合同地址-->
                    <dt class="roomInfo"><img src="/static/images/Room/hand.png" alt=""></dt>
                    <dd clas='adressInfo'>
                        <a href="javascript:void(0);" @click='handleCopy(contractlink,$event)' style='padding-left: 36px;padding-top: 72px;display: inline-block;
                    color: #4091fb;'>复制链接</a>
                    </dd>
                </dl>
                <dl class='third'>
                    <dd><h3>签约室分享</h3></dd>
                    <dd><p><span>签约室链接：</span><span id='contractAddress1'>{{roomlink}}</span></p></dd>  <!--签约室链接：-->
                    <dt class="roomInfo"><img src="/static/images/Room/room.png" alt=""></dt>
                    <dd class='adressInfo'>
                        <a href="javascript:void(0);" @click='handleCopy(roomlink,$event)' style='padding-left: 36px;padding-top: 72px;display: inline-block;
                    color: #4091fb;'>复制链接</a>
                    </dd>
                </dl>
            </div>
            <div class='btns'>
                <el-button type="primary" style='width:200px' @click="lookDetails">查看详情</el-button>
                <router-link to='/Home'><el-button type="primary" style='width:200px'>返回首页</el-button></router-link>
            </div>
            <el-dialog title="合同详情图片" :visible.sync="dialogTableVisible" custom-class="singleSignedDialogs">
                <div v-for="(item,index) in imgList" :key="index" >
                    <img :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractImagePath='+item" alt="" style='width:100%;'>
                </div>
            </el-dialog>

        </div>
        <Bottom></Bottom>
    </div>
</template>

<script>
    import {state, actions,mutations} from '@/store/index';
    import {prohibit} from '@/common/js/prohibitBrowser'
    import cookie from '@/common/js/getTenant'
    import clip from '@/common/js/clipboard.js' // use clipboard directly
    import clipboard from '@/common/directive/clipboard/index.js' // use clipboard by v-directive
    import {signLink,getSignLink} from '@/api/personal'
    import {signfinish} from '@/api/common'
    import {contractimgs} from '@/api/detail';
    import Top from '@/common/components/Top.vue'
    import Bottom from '@/common/components/Bottom.vue'
    export default {
        data () {
            return {
                baseURL:this.baseURL.BASE_URL,
                interfaceCode:cookie.getJSON('tenant')[1].interfaceCode,
                signUser:[],
                validTime:'',
                dialogTableVisible:false,
                imgList:[],
                contractlink:'',
                roomlink:'',
                getContractName:'', //显示的合同名称
                contractNo:sessionStorage.getItem('contractNo'), //合同编号
                contractName:sessionStorage.getItem('contractName'), //合同编号
            }
        },
        components: {
            Top,
            Bottom
        },
        methods: {
            lookDetails () { //查看详情
                this.$store.dispatch('tabIndex',{tabIndex:1});
                cookie.set("state", "Home");
                this.$router.push('/ContractInfo')
            },
            seeContractImg (){

                this.$loading.show(); //显示
                let data =[];

                contractimgs(this.interfaceCode,this.contractNo).then(res=>{
                    for (let i = 0; i < res.data.length;i++) {
                        let contractImagePath = res.data[i].contractImagePath
                        data[i] = contractImagePath
                    }
                    this.$loading.hide(); //隐藏
                    this.imgList = data
                }).catch(error=>{

                })
                this.dialogTableVisible = true
            },
            handleCopy(text, event) {
                clip(text, event)
            },
            clipboardSuccess() {
                this.$message({
                    message: '复制成功',
                    type: 'success',
                    duration: 1500
                })
            }
        },
        created() {
            this.roomlink = cookie.getJSON('tenant')[1].signRoomLink;

            signfinish(this.contractNo).then(res=>{
                if(res.data.resultCode==1){
                    this.signUser = res.data.dataList;
                    this.validTime = res.data.data.validTime;
                    this.getContractName = res.data.data.contractName;
                    this.contractlink = res.data.data.contractlink;
                }

            }).catch(error=>{

            });

        },
        mounted() {
            prohibit();
            sessionStorage.removeItem("type");
            sessionStorage.removeItem("needSign");
        }
    }
</script>

<style scoped>
    @import "../../../styles/Complete/Completes.scss";
    @import "../../../common/styles/SigningSteps.css";
    #nameInfo{
        display: inline-block;
        width: 150px;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
        vertical-align: bottom;
    }
    #details li {
        padding-left: 40px;
    }
    #details li .name{
        width: 64px;
        display: inline-block;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
        vertical-align: bottom;
    }
</style>

<style>
    .singleSignedDialogs{
        position: relative !important;
        -webkit-box-sizing: border-box !important;
        box-sizing: border-box !important;
        min-height: 700px !important;
        /* overflow-y: scroll !important; */
    }
    #contractAddress{
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width:230px;
        vertical-align:sub;
        color:#4091fb;
    }
    #contractAddress1{
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width:230px;
        vertical-align:sub;
        color:#4091fb;
    }
    .roomInfo{
        width:167px;
        height: 125px;
        float: left;
        padding-top:25px;
    }
    .roomInfo>img{
        width:100%;
        height: 100%;
    }
    .adressInfo{
        float: left;
    }
    .adressInfo a{
        padding-left:10px;
    }
</style>

