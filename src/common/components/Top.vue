<template>
  <div class="Top">
    <nav class='nav'>
      <p class='logo'>
        <img src="../../../static/images/logo2.png" alt="">
      </p>
      <ul id='ul'>
        <router-link to='/Home' @click.native="tabActive(0)"><li :class="{'active-tab':tabIndex==0}"><a href="javascript:void(0);">首页</a></li></router-link>
        <router-link to='/Mycontract' @click.native="tabActive(1)"><li :class="{'active-tab':tabIndex==1}"><a href="javascript:void(0);">我的合同</a></li></router-link>
        <router-link to='/Multiparty' @click.native="tabActive(2)"><li :class="{'active-tab':tabIndex==2}"><a href="javascript:void(0);">我的模板</a></li></router-link>
        <router-link to='/Room' @click.native="tabActive(3)"><li :class="{'active-tab':tabIndex==3}"><a href="javascript:void(0);">签约室</a></li></router-link>
        <li :class="{'active-tab':tabIndex==4}" @click="dialogVisible(4)" style='color:#fff;cursor:pointer'>版本</li>
      </ul>
      <ol class='btns'>
        <li><router-link to='/Multiparty'><a href="javascript:void(0);">模板发起</a></router-link></li>
        <li><a href="javascript:void(0);" @click='choice'>上传发起</a></li>
        <li @click="amendPassWord"><img src="../../../static/images/back.png" alt=""><a href="javascript:void(0);">退出</a></li>
         <li :class="{'active-tab':tabIndex==5}" style="margin-left:30px;">
           <router-link  @click.native="tabActive(5)" to='/Account'>
             <img src="../../../static/images/setup.png" alt="">
             <a href="javascript:void(0);">我的账户</a>
           </router-link>
         </li>
      </ol>

      <div id='update'>
      </div>
    </nav>

   <div class='dialogbg' v-show="popup">

     <div class='upload-dilog'>
           <a  href="javascript:void(0);" id="upload-dilog-close" class="upload-dilog-close" @click="shut">X</a>
          <div style="color:#22a7ea;text-align:center;font-size:16px;margin-top:20px;font-weight:bold;font-family: 微软雅黑;">请选择对手方身份</div>
          <div class='leftDilog'>
              <el-upload
            ref='upload'
            class="upload-demo"
            :action='urlloadUrl()'
            :before-upload="handleChange"
            :on-success="fileSuccess"
            :show-file-list= false
            :limit=1
            accept='.docx,.pdf,.doc,.txt'
            element-loading-text="拼命上传中"
            element-loading-background="rgba(0, 0, 0, 0.5)"
            >
            <img src="../../../static/images/Login/geren.png" alt="">
            </el-upload>
          </div>
            <div class='rightDilog'>
              <el-upload
              ref='upload'
              class="upload-demo"
              :action='uploadUrl()'
              :data=Type
              :before-upload="handleChange"
              :on-success="fileSuccess1"
              :show-file-list= false
              :limit=1
              accept='.docx,.pdf,.doc,.txt'
              element-loading-text="拼命上传中"
              element-loading-background="rgba(0, 0, 0, 0.5)"
              >
              <img src="../../../static/images/Login/qiye.png" alt="">
              </el-upload>
            <p style='clear:both;color:red; text-align:center; margin-left:-288px;padding:10px;'><i class='el-icon-warning'></i>请先选择对手身份个人或者企业</p>
          </div>
      </div>
   </div>

    <div id="dilog">
        <div class='box'>
          <div class='box-container'>
            <a href="javascript:void(0);" id='close' @click='closes'>X</a>
          </div>
        </div>
      </div>
  </div>
</template>
<style lang="scss" scoped>
@import "../styles/Top.css";

.el-tabs__item.is-active{
  color:#fff
}
.el-tabs__item:hover{
  color:#fff
}
.el-tabs__item{
  color:#fff
}
.el-tabs__active-bar{
  background-color:red
}
.el-tabs__nav-wrap::after{
  height:0
}
.dialogbg{
  background:#000;
  background:rgba(0,0,0,.3);
  width:100%;
  height:1080px;
  position: absolute;
  left:0;
  top:0;
  z-index: 1999;

}
  #dilog{
    width:100%;
    height: 100%;

    position: absolute;
    z-index:1000;
    background-color:rgba(0,0,0,0.5);
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
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
  .active-tab{
    border-bottom: 3px solid red;
    font-weight: 700;
  }
  //默认会给当前路由加上此类名
  // .router-link-exact-active li{
  //   border-bottom: 3px solid red;
  //   font-weight: 700;
  // }
</style>
<script>
import cookie from '@/common/js/getTenant'
export default {
  name: 'Top',
      data() {
      return {
        fullscreenLoading: false,
        popup:false,
        Type:{contractType:'0'},
        uploadFile:true,
        interfaceCode:cookie.getJSON('tenant')[1].interfaceCode,
        tabIndex:''
      }
    },
    methods: {
      choice(){
        this.popup =!this.popup
      },
      urlloadUrl(){
        // return `${this.baseURL.BASE_URL}/v1/tenant/${this.interfaceCode}/contractfile`
        return `http://192.168.1.15:8080/zqsign-web-wesign/restapi/wesign/v1/tenant/${this.interfaceCode}/contractfile`
      },
      uploadUrl(){
        // return `${this.baseURL.BASE_URL}/wesign/v1.4/tenant/${this.interfaceCode}/contractfile`
        return `http://192.168.1.15:8080/zqsign-web-wesign/restapi/wesign/v1.4/tenant/${this.interfaceCode}/contractfile`
      },
      handleChange (name) {
        this.$loading.show();
        var max_size = 5;// 5M
        var fileContName = name.name.replace(/\s+/g, "")
        var reg= /[.](docx|pdf|doc|txt|DOCX|PDF|DOC|TXT)$/
        if(!reg.test(fileContName)){
          this.$message({
            showClose: true,
            message: '只能传pdf,doc,txt,docx格式的文件',
            type: 'error'
          });
          this.$refs.upload.clearFiles()
          this.uploadFile = false
          this.$loading.hide();
          return false

        } else if( name.size > max_size*1024*1024){
          this.$message({
            showClose: true,
            message: '文件大小超过限制',
            type: 'error'
          });
          this.$refs.upload.clearFiles()
          this.uploadFile = false
          this.$loading.hide();
          return false

        } else if(fileContName.length >50){
          this.$message({
            showClose: true,
            message: '上传文件名称不得超过50字符！',
            type: 'error'
          });
          this.$refs.upload.clearFiles()
          this.uploadFile = false
          this.$loading.hide();
          return false

        } else {
          this.loading2 = true
          this.uploadFile = true
        }
      },
      shut() {
        this.popup=!this.popup
      },
      fileSuccess(name, file, fileList){  //上传文件，传参数 contractName contractNo 渲染 Contractsigning.vue
      this.$loading.hide();
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
        this.$loading.hide();
        var contractName = file.name.replace(/\s+/g, "")
        var contractNo = file.response.contractNo
        var resultCode = file.response.resultCode
        if( this.uploadFile == true ){
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
        this.tabIndex = value
        var dilog = document.getElementById('dilog')
        dilog.style.display='block'
      },
      closes(){
        this.tabIndex = this.$store.state.tabIndex
        var dilog = document.getElementById('dilog')
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
      },
       tabActive(value){
        this.$store.dispatch('tabIndex',{tabIndex:value});
        this.tabIndex = this.$store.state.tabIndex;

      },
    },
    created(){
      // console.log(this.$store.state.tabIndex)
      this.tabIndex = this.$store.state.tabIndex;
    },


}
</script>

