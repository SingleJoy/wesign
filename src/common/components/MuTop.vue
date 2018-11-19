<template>
  <div class="MuTop">
    <nav class='nav'>
      <p class='logo'>
        <img src="../../../static/images/Top/v1.6-logo.png" alt="logo图">
      </p>
      <ul id='ul'>
        <!-- <router-link to='/Merchant' @click.native="tabActive(0)"><li :class="{'active-tab':tabIndex==0}"><a href="javascript:void(0);">首页</a></li></router-link>
        <router-link to='/Procontract' @click.native="tabActive(1)"><li :class="{'active-tab':tabIndex==1}"><a href="javascript:void(0);">我的合同</a></li></router-link>
        <router-link to='/BuyProduct' @click.native="tabActive(2)"><li :class="{'active-tab':tabIndex==2}"><a href="javascript:void(0);">我的模板</a></li></router-link>
        <router-link v-if="accountLevel!=2" to='/BuyProduct' @click.native="tabActive(3)"><li :class="{'active-tab':tabIndex==3}"><a href="javascript:void(0);">签约室</a></li></router-link>
        <li :class="{'active-tab':tabIndex==4}" @click="dialogVisible(4)" style='color:#fff;cursor:pointer;font-size:16px;'>版本</li> -->
        <li><router-link to='/Merchant'>首页</router-link></li>
        <li><router-link to='/Procontract'>我的合同</router-link></li>
        <li><router-link to='/BuyProduct'>我的模板</router-link></li>
        <li v-if="accountLevel!=2"><router-link  to='/BuyProductRoom'>签约室</router-link></li>
        <li @click="dialogVisible"><a >版本</a></li>
        <li class="contract-add no-border"><router-link  to='/BuyProductTemplate'>模板发起</router-link></li>
        <li class="contract-add no-border"><router-link  to='/BuyProductUp'>上传发起</router-link></li>
        <li v-if="Jurisdiction"><router-link to='/Account'><img src="../../../static/images/setup.png" alt="">我的账户</router-link></li>
        <li v-else><router-link to='/NoReal'><img src="../../../static/images/setup.png" alt="">我的账户</router-link></li>
        <li class="login-out-btn no-border" @click='amendPassWord'><a><img src="../../../static/images/back.png" alt="">退出</a></li>

      </ul>
      <!-- <ol class='btns'>
        <li><router-link to='/BuyProduct'><a href="javascript:void(0);">模板发起</a></router-link></li>
        <li>
          <a href="javascript:void(0);" @click='choice'>上传发起</a>
        </li>
        <li @click="amendPassWord"><img src="../../../static/images/back.png" alt=""><a href="javascript:void(0);">退出</a></li>
        <li :class="{'active-tab':tabIndex==5}" style="margin-left:20px;" v-if="(Jurisdiction)">
          <router-link to='/Account'  @click.native="tabActive(5)">
            <img src="../../../static/images/setup.png" alt="">
            <a href="javascript:void(0);">我的账户</a>
          </router-link>
        </li>
        <li :class="{'active-tab':tabIndex==5}" style="margin-left:20px;" v-else>
          <router-link to='/NoReal'  @click.native="tabActive(5)">
            <img src="../../../static/images/setup.png" alt="">
            <a href="javascript:void(0);">我的账户</a>
          </router-link>
        </li>
      </ol> -->
      <div id='update'>
      </div>
    </nav>

    <template>
      <Version v-show="showVersion" :showVersion="showVersion" @closeVersion="closeVersion"></Version>
    </template>
  </div>
</template>
<style scoped>
  @import "../styles/MuTop.css";
</style>
<style>
  .MuTop .nav a{
    font-size:16px;
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
    height: 360px !important;
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
  .active-tab{
    border-bottom: 3px solid red;
    font-weight: 700;

  }
</style>
<script>
  import md5 from 'js-md5'
  import {validatePassWord} from '@/common/js/validate'
  import cookie from '@/common/js/getTenant'
  import Version from '@/common/components/Version.vue'
  export default {
    name: 'MuTop',
    components:{
      Version
    },
    data() {
      return {
        baseURL:this.baseURL.BASE_URL,
        showVersion:false, //版本号默认不显示
        tabIndex:'',
        fullscreenLoading: false,
        popup:false,
        Type:{contractType:'0'},
        interfaceCode:cookie.getJSON('tenant')[1].interfaceCode,
        accountLevel:sessionStorage.getItem("accountLevel"),

        oneAccount:sessionStorage.getItem("auditStatus"),
        Jurisdiction:true,


      }
    },
    created(){
      this.tabIndex = this.$store.state.tabIndex;
      this.auditStatus=sessionStorage.getItem("auditStatus");

      var Status = cookie.getJSON('tenant')[1].isBusiness
      if(Status == '0'){
        this.Jurisdiction = false
      }else {
        this.Jurisdiction = true
      }


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
        return `${this.baseURL}/restapi/wesign/v1/tenant/${this.interfaceCode}/contractfile`
      },
      uploadUrl(){
        return `${this.baseURL}/restapi/wesign/v1.4/tenant/${this.interfaceCode}/contractfile`
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
          sessionStorage.setItem('contractName', suffix)
          sessionStorage.setItem('contractNo', contractNo)
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
          sessionStorage.setItem('contractName', suffix)
          sessionStorage.setItem('contractNo', contractNo)
          this.$router.push('/Signature')
        }
      },
      openFullScreen() {
        this.fullscreenLoading = true
      },
      dialogVisible (value) {

        this.showVersion=true;
      },
      closeVersion(){
        this.showVersion=false;
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


