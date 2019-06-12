<template>
  <div class='Successes'>
    <div class='step' style="width: 600px;">  <!--步骤条 -->
      <ul>
        <li class="active"><i class='el-icon-document'></i><b>上传文件</b></li>
        <p></p>
        <li class="active"><i class='el-icon-goods'></i><b>签署设置</b></li>
        <p></p>
        <li class="active"><i class='el-icon-edit'></i><b>指定位置</b></li>
        <!-- <p></p>
        <li class="active"><i class='el-icon-menu'></i><b>合同签署</b></li> -->
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
      <div class='oneInfo'>
        <p><h3 class='infoss'>合同信息</h3></p>
        <ul id='oneInfos'>
          <li><p ><span>合同名称：</span>
            <el-tooltip placement="top">
              <div slot="content">{{contractName}}</div>
              <span class='contractTextInfo'>{{contractName}}</span>
            </el-tooltip>
            <a href="javascript:void(0);" @click="seeContractImg" style="color:#4091fb;">查看合同</a>
          </p></li>
          <li><p><span>截至时间：</span><span>{{validTime}}</span></p></li>
          <li>签署人员：</li>
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
      <dl class='second'>
        <dd><h3>合同分享</h3></dd>
        <dd><p><span>合同链接：</span><span id="contractAddress">{{contractLink}}</span></p></dd>  <!--加查看对应合同地址-->
        <dd>
          <dl>
            <dt><img src="/static/images/Room/hand.png" alt=""></dt>
            <dd>
              <p><a href="javascript:void(0);" @click='handleCopy(contractLink,$event)'>复制链接</a></p>

            </dd>
          </dl>
        </dd>
      </dl>
      <dl class='third'>
        <dd><h3>签约室分享</h3></dd>
        <dd><p><span>签约室链接：</span><span id='contractAddress1'>{{roomLink}}</span></p></dd>  <!--加查看对应合同地址-->
        <dd>
          <dl>
            <dt><img src="/static/images/Room/room.png" alt=""></dt>
            <dd>
              <p><a href="javascript:void(0);" @click='handleCopy(roomLink,$event)'>复制链接</a></p>

            </dd>
          </dl>
        </dd>
      </dl>
    </div>
    <div class='btns'>
      <el-button type="primary" style='width:200px' @click="lookDetails">查看详情</el-button>
      <router-link to='/Home'><el-button type="primary" style='width:200px'>返回首页</el-button></router-link>
    </div>
    <el-dialog title="合同详情图片" :visible.sync="dialogTableVisible" custom-class="showDialogs">
      <div v-for="(item,index) in imgList" :key="index" >
        <img :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractImagePath='+item" alt="" style='width:100%;'>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {state, actions,mutations} from '@/store/index';
  import clip from '@/common/js/clipboard.js' // use clipboard directly
  import cookie from '@/common/js/getTenant'
  import {getContractDetails,getSignLink} from '@/api/personal'
  import {contractimgs} from '@/api/detail'

  export default {
    data () {
      return {
        baseURL:this.baseURL.BASE_URL,
        signUser:[],
        validTime:'',
        dialogTableVisible:false,
        imgList:[],
        contractLink:'',
        roomLink:'',
        interfaceCode:cookie.getJSON('tenant')[1].interfaceCode,
        contractNo:sessionStorage.getItem("contractNo"),
        contractName:sessionStorage.getItem("contractName"),
      }
    },
    methods: {
      lookDetails () { //查看详情
        //存入cookie 所需信息
        cookie.set("state", 'Home');
        this.$router.push('/ContractInfo')
        this.$store.dispatch('tabIndex',{tabIndex:1});
      },
      seeContractImg (){
        this.$loading.show(); //显示
        let data =[];
        let t=Math.random();
        contractimgs(this.interfaceCode,this.contractNo,t).then(res=>{
            for (let i = 0; i < res.data.length;i++) {
                let contractImagePath = res.data[i].contractImagePath
                data[i] = contractImagePath
                this.$loading.hide(); //隐藏
            }
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

      this.roomLink = cookie.getJSON('tenant')[1].signRoomLink;
       getContractDetails(this.interfaceCode,this.contractNo).then(res=>{
            this.signUser = res.data.signUserVo
            let contractVo = res.data.contractVo
            this.validTime = contractVo.validTime
        }).catch(error=>{

        })
      getSignLink(this.interfaceCode,this.contractNo).then(res=>{
            this.contractLink = res.data
        }).catch(error=>{

        })

    },
    mounted() {

      sessionStorage.removeItem("type");
      sessionStorage.removeItem("needSign");
    }
  }
</script>

<style scoped>
  @import "../../styles/Success/Successes.css";
  @import "../../common/styles/SigningSteps.css";
  .contractTextInfo{
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

</style>
<style>
  .showDialogs{
    position: relative !important;
    -webkit-box-sizing: border-box !important;
    box-sizing: border-box !important;
    height: 700px !important;
    /* overflow-y: scroll !important; */
  }
</style>
