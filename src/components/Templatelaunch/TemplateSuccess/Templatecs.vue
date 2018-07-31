<template>
  <div class='Templatecs' style="margin-top: 20px;height: 850px;">
    <div class='main'>
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
    <div class='state'>
      <dl class='stateInfo'>
        <dt>
          <img src="../../../../static/images/Credentials/Personal/Authentication/authentication.png"/>
        </dt>
        <dd>
          <span>恭喜,合同签署成功！</span>
          <p>众签已将该合同通过短信方式通知其他签署人</p>
        </dd>
      </dl>
    </div>
    <!-- 合同所有信息开始 -->
    <div class='contractInfo'>
        <div class='twoInfo'>
            <p><h3 class='infoss'>合同信息</h3></p>
          <ul id='twoInfos' style="text-align: left;">
            <li><p ><span>合同名称：</span>
            <el-tooltip placement="top">
              <div slot="content">{{this.$store.state.contractName1}}</div>
              <span id='textInfonfo' style="width:150px;overflow:ellipsis;">{{this.$store.state.contractName1}}</span>
            </el-tooltip>
            <a href="javascript:void(0);" @click="seeContractImg" style='color:#22a7ea'>查看合同</a>
            </p></li>
            <li><span>截止时间：</span><span>{{validTime}}</span></li>
            <li style='float:left'>签署人员：</li>
            <ol id='details'>
              <li v-for="(item,index) in signUser" :key="index">
                <el-tooltip placement="top">
                  <div slot="content">{{item.signUserName}}</div>
                  <span class='name' >{{item.signUserName}}</span>
                </el-tooltip>
                <a style='color:#22a7ea; cursor: default;' href="javascript:void(0);" v-if="item.signStatus == 1">已签署</a>
                <a style='color:red; cursor: default;' href="javascript:void(0);" v-else>未签署</a>
              </li>
            </ol>
          </ul>
        </div>
         <dl class='second'>
          <dd><h3>合同分享</h3></dd>
          <dd><p><span>合同链接：</span><span id='contractAddress'>{{dataURL}}</span></p></dd>  <!--加查看对应合同地址-->
          <dt id='roomInfo'><img src="../../../../static/images/Room/hand.png" alt=""></dt>
          <dd clas='adressInfo'>
            <a href="javascript:void(0);" @click='handleCopy(dataURL,$event)' style='padding-left: 36px;padding-top: 72px;display: inline-block;
            color: #22a7ea;'>复制链接</a>
          </dd>
        </dl>
        <dl class='third'>
          <dd><h3>签约室分享</h3></dd>
          <dd><p><span>签约室链接：</span><span id='contractAddress1'>{{roomlink}}</span></p></dd>  <!--加查看对应合同地址-->
          <dt id='roomInfo'><img src="../../../../static/images/Room/room.png" alt=""></dt>
          <dd clas='adressInfo'>
            <a href="javascript:void(0);" @click='handleCopy(roomlink,$event)' style='padding-left: 36px;padding-top: 72px;display: inline-block;
            color: #22a7ea;'>复制链接</a>
          </dd>
        </dl>
    </div>
    <div class='btns'>
        <el-button type="primary" style='width:200px' @click="lookDetails">查看详情</el-button>
        <router-link to='/Home'><el-button type="primary" style='width:200px'>返回首页</el-button></router-link>
    </div>
    <el-dialog title="合同详情图片" :visible.sync="dialogTableVisible"  custom-class="showDialogs">
      <div v-for="(item,index) in imgList" :key="index" >
        <!-- <img :src="[`${this.baseURL.BASE_URL}`+'/v1/tenant/contract/img?contractUrl='+item]" alt="" style='width:100%'> -->
        <img :src="['http://testwesign.zqsign.com/restapi/wesign/v1/tenant/contract/img?contractUrl='+item]" alt="" style='width:100%'>
      </div>
    </el-dialog>
    </div>
  </div>
</template>

<style scoped>
  @import "../../../styles/Templatecomplete/Templates.css";
</style>

<script>
import clip from '@/common/js/clipboard.js' // use clipboard directly
import clipboard from '@/common/directive/clipboard/index.js' // use clipboard by v-directive
import { mapActions, mapState } from 'vuex'
import cookie from '@/common/js/getTenant'
import {prohibit} from '@/common/js/prohibitBrowser'
export default {
  data () {
    return {
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
      this.$store.dispatch('contractsInfo',{contractNo:this.$store.state.contractNo1})
      this.$router.push('/ContractInfo')
    },
    seeContractImg (){
      this.$loading.show(); //显示
      var data =[];
      this.$http.get(process.env.API_HOST+'v1/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode + '/contract/'+this.$store.state.contractNo1+'/contractimgs').then(function (res) {
        if(res.sessionStatus == '0'){
          this.$router.push('/Server')
        } else {
        for (let i = 0; i < res.data.length;i++) {
        let contractUrl = res.data[i].contractUrl
        data[i] = contractUrl
        this.$loading.hide(); //隐藏
        }
        this.imgList = data
        }
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
    this.roomlink = cookie.getJSON('tenant')[1].signRoomLink
    var contractName = sessionStorage.getItem('contractName')
    var contractNo = sessionStorage.getItem('contractNo')

    if (contractName) {
      contractName = JSON.parse(contractName)
      if ( this.$store.state.contractName1 == ''){
        this.$store.state.contractName1 = contractName
      }
    }
    if (contractNo) {
      contractNo = JSON.parse(contractNo)
      if ( this.$store.state.contractNo1 == ''){
        this.$store.state.contractNo1 = contractNo
      }
    }
    let url = process.env.API_HOST+'v1/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode + '/getContractDetails/'+this.$store.state.contractNo1;
    this.$http.get(process.env.API_HOST+'v1/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode + '/getContractDetails/'+this.$store.state.contractNo1).then(function (res) {
      if(res.sessionStatus == '0'){
          this.$router.push('/Server')
        } else {
     this.signUser = res.data.signUserVo
     var contractVo = res.data.contractVo
     this.validTime = contractVo.validTime
        }
    })

    this.$http.get(process.env.API_HOST+'v1/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode +'/contract/'+this.$store.state.contractNo1).then(function (res) {
      if(res.sessionStatus == '0'){
          this.$router.push('/Server')
        } else {
     this.dataURL = res.bodyText
        }
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
  overflow-y: scroll !important;
}
.contractAddress{
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width:230px;
  vertical-align:sub;
  color:#22a7ea;
}
.showDialogs{
  position: relative !important;
  -webkit-box-sizing: border-box !important;
  box-sizing: border-box !important;
  height: 800px !important;
  overflow-y: scroll !important;
}
#contractAddress{
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width:230px;
  vertical-align:sub;
  color:#22a7ea;
}
#contractAddress1{
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width:230px;
  vertical-align:sub;
  color:#22a7ea;
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
