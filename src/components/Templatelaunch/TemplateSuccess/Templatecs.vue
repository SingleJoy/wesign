<template>
  <div class="Templatecs" style="margin-top: 20px;height: 850px;">
    <div class="main">
      <div class='step' style="width:870px;">  <!--步骤条 -->
        <ul>
          <li class="active"><i class='el-icon-document'></i><b>选择模板</b></li>
          <p></p>
          <li class="active"><i class='el-icon-edit'></i><b>填充信息</b></li>
          <p></p>
          <li class="active"><i class='el-icon-goods'></i><b>签署设置</b></li>
          <p></p>
          <li class="active"><i class='el-icon-edit'></i><b>指定位置</b></li>
          <p></p>
          <li class="active"><i class='el-icon-menu'></i><b>合同签署</b></li>
          <p></p>
          <li class="active"><i class='el-icon-check'></i><b>完成</b></li>
        </ul>
      </div>
      <!-- 合同返回用户成功or失败 -->
      <div class="state">
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
      <div class='contractInfo'>
        <div class='twoInfo'>
            <p class='infoss'>合同信息</p>
            <!-- <dd><h3 class='infoss'>合同信息</h3></dd> -->
            <ul id='twoInfos' style="text-align: left;">
                <li><p><span>合同名称：</span>
                <el-tooltip placement="top">
                    <div slot="content">{{templateName}}</div>
                    <span id='textInfonfo' style="width:150px;overflow:ellipsis;">{{templateName}}</span>
                </el-tooltip>
                <a href="javascript:void(0);" @click="seeContractImg" style='color:#4091fb'>查看合同</a>
                </p></li>
                <li><span>截止时间：</span><span>{{validTime}}</span></li>
                <li style='float:left'>签署人员：</li>
                <ol id='details'>
                <li v-for="(item,index) in signUser" :key="index">
                    <el-tooltip placement="top">
                    <div slot="content">{{item.signUserName}}</div>
                    <span class='name' >{{item.signUserName}}</span>
                    </el-tooltip>
                    <a style='color:#4091fb; cursor: default;' href="javascript:void(0);" v-if="item.signStatus == 1">已签署</a>
                    <a style='color:red; cursor: default;' href="javascript:void(0);" v-else>未签署</a>
                </li>
                </ol>
            </ul>
        </div>
        <dl class='second'>
          <!-- <dd><h3>合同分享</h3></dd> -->
          <p class='infoss'>合同分享</p>
          <dd><p><span>合同链接：</span><span id='contractAddress'>{{dataURL}}</span></p></dd>  <!--加查看对应合同地址-->
          <dt id='roomInfo'><img src="/static/images/Room/hand.png" alt=""></dt>
          <dd clas='adressInfo'>
            <a href="javascript:void(0);" @click='handleCopy(dataURL,$event)' style='padding-left: 36px;padding-top: 72px;display: inline-block;
            color: #4091fb;'>复制链接</a>
          </dd>
        </dl>
        <dl class='third'>
          <!-- <dd><h3>签约室分享</h3></dd> -->
          <p class='infoss'>签约室分享</p>
          <dd><p><span>签约室链接：</span><span id='contractAddress1'>{{roomlink}}</span></p></dd>  <!--加查看对应合同地址-->
          <dt id='roomInfo'><img src="/static/images/Room/room.png" alt=""></dt>
          <dd clas='adressInfo'>
            <a href="javascript:void(0);" @click='handleCopy(roomlink,$event)' style='padding-left: 36px;padding-top: 72px;display: inline-block;
            color: #4091fb;'>复制链接</a>
          </dd>
        </dl>
      </div>
      <div class='btns'>
        <el-button type="primary" style='width:200px' @click="lookDetails">查看详情</el-button>
        <router-link to='/Home'><el-button type="primary" style='width:200px'>返回首页</el-button></router-link>
      </div>
      <el-dialog title="合同详情图片" :visible.sync="dialogTableVisible"  custom-class="showDialogs">
        <div v-for="(item,index) in imgList" :key="index" >
          <img :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractName=zqsign&contractImagePath='+item" alt=""  style='width: 100%'>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<style scoped>
  @import "../../../styles/Templatecomplete/Templates.css";
  @import "../../../common/styles/SigningSteps.css";
</style>

<script>
  import clip from '@/common/js/clipboard.js' // use clipboard directly
  import clipboard from '@/common/directive/clipboard/index.js' // use clipboard by v-directive
  import {state, actions,mutations} from '@/store/index';
  import cookie from '@/common/js/getTenant'
  import {prohibit} from '@/common/js/prohibitBrowser'
  import {contractimgs,getContractDetails} from "@/api/detail"
  import {getSignLink} from "@/api/personal"
  export default {
    data () {
      return {
        baseURL:this.baseURL.BASE_URL,
        interfaceCode:sessionStorage.getItem("interfaceCode"),
        contractNo:sessionStorage.getItem("contractNo"),
        contractName:sessionStorage.getItem("contractName"),
        templateName:'',
        signUser:[],
        validTime:'',
        dialogTableVisible:false,
        imgList:[],
        dataURL:'',
        roomlink:''
      }
    },
    methods: {
      lookDetails () { //查看详情

        this.$router.push('/ContractInfo');
        cookie.set("state", "Home");
        this.$store.dispatch('tabIndex',{tabIndex:1});
      },
      seeContractImg (){
        this.$loading.show(); //显示
        let data =[];
        let t=Math.random();
        contractimgs(this.interfaceCode ,this.contractNo,t).then(res=> {

            for (let i = 0; i < res.data.length;i++) {
              let contractImagePath = res.data[i].contractImagePath;
              data[i] = contractImagePath;
            }
            this.$loading.hide(); //隐藏
            this.imgList = data;

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
      },
    },
    created() {
      this.roomlink = cookie.getJSON('tenant')[1].signRoomLink;
      let t=Math.random();
      getContractDetails(this.interfaceCode,this.contractNo,t).then(res=>{
          this.signUser = res.data.signUserVo
          var contractVo = res.data.contractVo
          this.validTime = contractVo.validTime
          this.templateName = contractVo.contractName

      }).catch(error=>{

      })

      getSignLink(this.interfaceCode,this.contractNo).then(res=> {
          this.dataURL = res.data
      }).catch(error=>{

      })
    },
    mounted() {
      prohibit()
      sessionStorage.removeItem("needsign");
    }
  }
</script>
<style>
  .showDialogs{
    position: relative !important;
    -webkit-box-sizing: border-box !important;
    box-sizing: border-box !important;
    height: 800px !important;
    /* overflow-y: scroll !important; */
  }
  .contractAddress{
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width:230px;
    vertical-align:sub;
    color:#4091fb;
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
  #roomInfo{
    width:167px;
    height: 125px;
    float: left;
    padding-top:25px;
  }
  #roomInfo>img{
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
