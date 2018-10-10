<template>
  <div class='Rooming'>
    <div class='main'>
      <div class='top'>
        <p class='set'>
        <div class="title">签约室设置</div>
        </p>
        <p class='copy'>
          <span>签约室链接:</span>
          <el-input type='text' v-model="inputData" style='width:200px;' :disabled="true"></el-input>
          <el-button type="primary" size="small" @click='handleCopy(inputData,$event)'>复制链接</el-button>
        </p>
      </div>
      <div class='content'>
      <div class='cleft'>
        <b v-if="showImage==true"><img :src="baseURL+'/restapi/wesign/v1/showSignRoomLogo?fileId='+signRoomLogo" alt=""></b>

        <b v-if="showImage==false"><img src="../../../static/images/Room/room-logo.png"  ></b>

        <p class='inputInfo' style='text-align: center;width: 220px;font-weight:bolder'>{{message}}</p>
        <!-- <h6 id='text' style="position:absolute;left:100px;">欢迎来到众签签约室</h6> -->
      </div>
      <dl class='cright' style="text-align:left;">
        <dd>签约室欢迎语设置：</dd>
         <dd>

           <el-input
              placeholder="欢迎语"
              v-model="message"
              :maxlength=18
              clearable
              >
            </el-input>
          <span>企业logo：
          <!-- <el-button type="primary" style='margin-left:13px;' size="small">立即上传</el-button> -->
          <el-upload
            class="upload-demo"
            :action='urlloadUrl()'
            :data="uploadData"
            :on-change="handleChange"
            :show-file-list= false
            :on-success="fileSuccess"
            accept="image/*"
            >
            <el-button size="small" type="primary" style='margin-left:80px;'>立即上传</el-button>
          </el-upload>
          </span>
          </dd>
        <dt>
          <div style="margin-top:27px">
             <img :src="baseURL+'/restapi/wesign/v1/showSignRoomLogo?fileId='+signRoomLogo"  id="id" v-if="showImage==true">
             <img src="../../../static/images/Room/room-logo.png" style="height:150px;width:150px" v-else-if="showImage==false">
          </div>
        </dt>
        <dd><a href="javascript:void(0);">* 支持jpg、png等格式，最佳尺寸是430X320， 建议使用矢量图</a>
          <br><a href="javascript:void(0);">* gif格式图片不得大于1M，否则压缩时失效。</a></dd>
        <el-button type="primary" style='margin-left:140px;margin-top:30px;padding:8px 20px' @click="saveImg">保&nbsp;&nbsp;&nbsp;&nbsp;存</el-button>
      </dl>
    </div>
    </div>
  </div>
</template>
<script>
import clip from '@/common/js/clipboard.js' // use clipboard directly
import clipboard from '@/common/directive/clipboard/index.js' // use clipboard by v-directive
import cookie from '@/common/js/getTenant'
export default {
  name: 'Rooming',
  data () {
    return {
      baseURL:this.baseURL.BASE_URL,
      inputData: '',
      signRoomLogo:'',
      dropzone: '',
      message:'用合约重构交易',
      interfaceCode:cookie.getJSON('tenant')[1].interfaceCode,
      uploadData:{
        signRoomName:'用合约重构交易'
      },
      value1:'',
      value2:'',
      file:'',
      showImage:true
    }
  },
  methods: {
    urlloadUrl(){
      return `${this.baseURL}/restapi/wesign/v1/tenant/${this.interfaceCode}/signRoom/saveSignRoomInfo`
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
    handleChange(file, fileList) {
      this.file = file
    },
    fileSuccess(name, file, fileList){  //上传文件，传参数 contractName contractNo 渲染 Contractsigning.vue
      this.signRoomLogo = file.name
      this.showImg();
      if(this.signRoomLogo){
        this.showImage=true
      }else{
        this.showImage=false
      }
    },
    // fileError(name, file, fileList){
    //   console.log(name,file,fileList)
    // },
    showImg () {
      this.$http.post(process.env.API_HOST+'v1/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode +'/signRoom/showSignRoomInfo',{emulateJSON:true}).then(function (res) {

        if(res.data.sessionStatus == '0'){
          this.$router.push('/Server')
        } else {
        this.inputData = res.data.data.signRoomLink;
        this.signRoomLogo = res.data.data.signRoomLogo;
        this.message = res.data.data.signRoomName;
          if(this.signRoomLogo==null ||this.signRoomLogo=='null'){
            this.showImage=false

          }else{
            this.showImage=true
          }
        }
      })
    },
    saveImg () {
      this.$http.get(process.env.API_HOST+'v1/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode +'/signRoom/saveSignRoomName',{params:{'signRoomName':this.message,'saveState':'1'}}).then(function (res) {
        if(res.data.sessionStatus == '0'){
          this.$router.push('/Server')
        } else {
        var infoStatus = res.data.status      //签约室后台返回状态
        var infomessage = res.data.message    //签约室后台返回正确值
        if(infoStatus == true) {
          this.$message({
          message: infomessage,
          type: 'success'
          });
        }
        }
      })
    }
  },
  mounted() {
    this.showImg()
  },
}
</script>
<style scoped>
  @import "../../styles/Room/Rooming.css";
  .inputInfo{
    position: absolute;
    top: 219px;
    left: 20px;
    font-size: 12px;
    color: #666;
  }
  .upload-demo{
    margin-top: -24px !important;
  }
  .Rooming .main .title{
    height: 46px;
    margin: 0px 0 0 15px;
    line-height: 46px;
    padding-left: 40px;
    color: #fff;
    font-size: 20px;
    padding-top: 0 !important;
    border-top: none !important;
    background: url("../../../static/images/Common/title.png") no-repeat;
  }
</style>


