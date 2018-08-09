<template>
  <div class="MuTop">
    <nav class='nav'>
      <p class='logo'>
        <img src="../../../static/images/logo2.png" alt="">
      </p>
      <ul id='ul'>
        <router-link to='/Merchant' @click.native="tabActive(0)"><li :class="{'active-tab':tabIndex==0}"><a href="javascript:void(0);">首页</a></li></router-link>
        <router-link to='/Procontract' @click.native="tabActive(1)"><li :class="{'active-tab':tabIndex==1}"><a href="javascript:void(0);">我的合同</a></li></router-link>
        <router-link to='/BuyProduct' @click.native="tabActive(2)"><li :class="{'active-tab':tabIndex==2}"><a href="javascript:void(0);">我的模板</a></li></router-link>
        <router-link to='/BuyProduct' @click.native="tabActive(3)"><li :class="{'active-tab':tabIndex==3}"><a href="javascript:void(0);">签约室</a></li></router-link>
        <li :class="{'active-tab':tabIndex==4}" @click="dialogVisible(4)" style='color:#fff;cursor:pointer'>版本</li>
      </ul>
      <ol class='btns'>
        <li><router-link to='/BuyProduct'><a href="javascript:void(0);">模板发起</a></router-link></li>
        <li>
          <a href="javascript:void(0);" @click='choice'>上传发起</a>
          <!-- </el-upload> -->
        </li>
        <li @click="amendPassWord"><img src="../../../static/images/back.png" alt=""><a href="javascript:void(0);">退出</a></li>
        <!-- <li id='dloa'  @click="centerDialogVisible = true"><img src="../../../static/images/setup.png" alt=""><a href="javascript:void(0);">修改密码</a></li> -->
        <li :class="{'active-tab':tabIndex==5}" style="margin-left:30px;"><router-link to='/Account'  @click.native="tabActive(5)"><img src="../../../static/images/setup.png" alt=""><a href="javascript:void(0);">我的账户</a></router-link></li>
      </ol>
      <div id='update'>
      </div>
    </nav>
    <div id="dilog">
      <div class='box'>
        <div class='box-container'>
          <!-- <h2>版本更新内容</h2>
          <p>1.更新了UI风格，使用更舒心</p>
          <p>2.优化了原版本使用卡顿的现象</p>
          <p>3.增加了众签在线客服，随时为您服务</p>
          <p>4.增加了新手教程，通过引导使用户更容易上手</p> -->
          <a href="javascript:void(0);" id='close' @click='closes'>X</a>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import "../styles/MuTop.css";
</style>
<style>
  #dilog{
    width:100%;
    height: 100%;
    background:#000;
    position: absolute;
    z-index:1000;
    background-color:rgba(0,0,0,0.5);
    top:0;
    left:0;
    display:none;
    }
  .box{
    width:360px;
    height: 430px;
    background:url('../../../static/images/Top/version-info.gif');

    position: absolute;
    left:0;
    top:0;
    right: 0;
    bottom:0;
    margin: auto;
  }
  .box .container{
    margin-top:180px;
  }
  .box .container h2{
    text-align:center;
  }
   .box .container p{
    line-height:30px;
    padding-left:30px;
    color:#999;
  }
  .box .container p:nth-child(2){
    padding-left:30px;
    padding-top:20px;
  }
  #close{
    position: absolute;
    right:-30px;
    top:-16px;
    width:30px;
    height: 30px;
    color:#fff;
    background:#ccc;
    border-radius:50%;
    text-align:center;
    line-height:30px;
  }
  .el-dialog--center .el-dialog__footer {
    margin-top: -17px;
  }
    .loginOut{
    height:200px !important;
    width:400px !important;
    overflow: hidden !important;
  }
  .dlstyle{
    width:400px  !important;
    height: 380px !important;
    overflow: hidden !important;
  }
  .dilog{
    width:656px;
    height:300px;
    position: absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin:auto;
    z-index:1000;
    border-radius:10px;
    background:url('../../../static/images/Login/context.png');
    background-size:100% 100%;
  }
   .dilog .left{
      float: left;
      width:252px;
      height:191px;
      background:#fff;
      margin-left:63px;
      margin-top:50px;
      background:url('../../../static/images/Login/b2b.png');
      background-size:100% 100%;

   }
    .dilog .left .upload-demo{
       width:252px !important;
      height:191px ;
    }
   .dilog .right{
      float: left;
      width:252px;
      height:191px;
      background:#fff;
      margin-left:30px;
      margin-top:50px;
      background:url('../../../static/images/Login/b2c.png');
      background-size:100% 100%;
   }
  .active-tab{
    border-bottom: 3px solid red;
    font-weight: 700;

  }
</style>
<script>
import md5 from 'js-md5'
import {validatePassWord} from '@/common/js/validate'
import cookie from '@/common/js/getTenant'
export default {
  name: 'MuTop',
      data() {
      return {
        tabIndex:'',
        fullscreenLoading: false,
        popup:false,
        Type:{contractType:'0'},
        interfaceCode:cookie.getJSON('tenant')[1].interfaceCode
      }
    },
    created(){
      this.tabIndex = this.$store.state.tabIndex;
    },
    methods: {
      tabActive(value){
        this.$store.dispatch('tabIndex',{tabIndex:value});
        this.tabIndex = this.$store.state.tabIndex;
      },

      choice(){
        this.$router.push('/BuyProduct')
      },
      urlloadUrl(){
        // return `${this.baseURL.BASE_URL}/v1/tenant/${this.interfaceCode}/contractfile`
        return `http://192.168.1.15:8080/zqsign-web-wesign/restapi/wesign/v1/tenant/${this.interfaceCode}/contractfile`
      },
      uploadUrl(){
        // return `${this.baseURL.BASE_URL}/v1.4/tenant/${this.interfaceCode}/contractfile`
        return `http://192.168.1.15:8080/zqsign-web-wesign/restapi/wesign/v1.4/tenant/${this.interfaceCode}/contractfile`
      },
      handleChange (name, file, fileList) {
        var max_size = 5;// 5M
        var fileContName = name.name.replace(/\s+/g, "")
        var reg= /[.](docx|pdf|doc|txt)$/
        if(!reg.test(fileContName)){
          this.$message({
            showClose: true,
            message: '只能传pdf,doc,txt,docx格式的文件',
            type: 'error'
          });
         this.$refs.upload.clearFiles()
        } else if( name.size > max_size*1024*1024){
          this.$message({
            showClose: true,
            message: '文件大小超过限制',
            type: 'error'
          });
         this.$refs.upload.clearFiles()
        } else if(fileContName.length >50){
          this.$message({
            showClose: true,
            message: '上传文件名称不得超过50字符！',
            type: 'error'
          });
          this.$refs.upload.clearFiles()
        } else {
          this.openFullScreen()
        }

      },
      // fileSuccess(name, file, fileList){ //上传文件，传参数 contractName contractNo 渲染 Contractsigning.vue
      //  var contractName = file.name.replace(/\s+/g, "")
      //  var contractNo = file.response.contractNo
      //  var resultCode = file.response.resultCode
      //   this.fullscreenLoading = false
      //   this.$message({
      //      message: '上传成功',
      //      type: 'success'
      //   });

      //   var index1=contractName.lastIndexOf(".");
      //   var suffix=contractName.slice(0,index1);
      //   this.$store.dispatch('fileSuccess1',{contractName:suffix,contractNo:contractNo})
      //   sessionStorage.setItem('contractName', JSON.stringify(suffix))
      //   sessionStorage.setItem('contractNo', JSON.stringify(contractNo))
      //   this.$router.push('/Contractsigning')

      // },
      fileSuccess(name, file, fileList){  //上传文件，传参数 contractName contractNo 渲染 Contractsigning.vue
      var contractName = file.name.replace(/\s+/g, "")
      var contractNo = file.response.contractNo
      var resultCode = file.response.resultCode
      if(  this.uploadFile == true ){
        this.$message({
          showClose: true,
          message: '上传成功',
          type: 'success'
        });
        var index1=contractName.lastIndexOf(".");
        var suffix=contractName.slice(0,index1);
        this.$store.dispatch('fileSuccess1',{contractName:suffix,contractNo:contractNo})
        sessionStorage.setItem('contractName', JSON.stringify(suffix))
        sessionStorage.setItem('contractNo', JSON.stringify(contractNo))
        this.$router.push('/Contractsigning')
        }
      },
      fileSuccess1(name, file, fileList){  //上传文件，传参数 contractName contractNo 渲染 Contractsigning.vue
        var contractName = file.name.replace(/\s+/g, "")
        var contractNo = file.response.contractNo
        var resultCode = file.response.resultCode
        if(  this.uploadFile == true ){
          this.$message({
            showClose: true,
            message: '上传成功',
            type: 'success'
          });
          var index1=contractName.lastIndexOf(".");
          var suffix=contractName.slice(0,index1);
          this.$store.dispatch('fileSuccess1',{contractName:suffix,contractNo:contractNo})
          sessionStorage.setItem('contractName', JSON.stringify(suffix))
          sessionStorage.setItem('contractNo', JSON.stringify(contractNo))
          this.$router.push('/Signature')
        }
      },
      openFullScreen() {
        this.fullscreenLoading = true
      },
      dialogVisible (value) {
        this.tabIndex = value;
        var dilog = document.getElementById('dilog')
        dilog.style.display='block'
      },
      closes(){
        var close = document.getElementById('close')
        this.tabIndex = this.$store.state.tabIndex
        close.style.display='block'
        dilog.style.display='none'
      },
      amendPassWord() {
        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, '是否确定要退出？ '),
            h('i', { style: 'color: teal' }, '')
          ]),
          center:true,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                this.signOut()
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 500);
              }, 1000);
            } else {
              done();
              this.resubmit = true
              this.$message({
                type: 'info',
                message: '取消退出操作'
              });
            }
          }
        })
      },
      signOut () {
        this.$http.get(process.env.API_HOST+'v1/tenant/exitAndDeleteSession').then(function (res) {
          if(res.data.sessionStatus == '0'){
            this.$router.push('/')
          } else {
            this.$message({
              showClose: true,
              message: res.body.message,
              type: 'success'
            })
            this.$router.push('/')
          }
        })
      }
    }
}
</script>


