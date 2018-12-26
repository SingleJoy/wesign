<template>
  <div class="Top">
    <nav class='nav'>
      <p class='logo'>
        <img src="/static/images/Top/v1.6-logo.png" alt="logo图">
      </p>
      <ul id='ul'>
        <li><router-link to='/Home'>首页</router-link></li>
        <li><router-link to='/Mycontract'>我的合同</router-link></li>
        <li><router-link to='/Multiparty'>我的模板</router-link></li>
        <li><router-link  to='/Room'  v-show="accountLevel!=2">签约室</router-link></li>
        <li @click="dialogVisible"><a href="javascript:void(0);">版本</a></li>
        <li class="contract-add no-border"><router-link  to='/MultipartyUp'>模板发起</router-link></li>
        <li class="contract-add no-border" @click='choice'><a href="javascript:void(0);">上传发起</a></li>
        <li v-if="Jurisdiction"><router-link to='/Account'><img src="/static/images/setup.png" alt="">我的账户</router-link></li>
        <li v-else><router-link to='/NoReal'><img src="/static/images/setup.png" alt="">我的账户</router-link></li>
        <li class="login-out-btn no-border" @click='amendPassWord'><a><img src="/static/images/back.png" alt="">退出</a></li>
      </ul>
      <div id='update'></div>
    </nav>

    <div class='dialogbg' v-show="popup">
      <div class='upload-dilog'>
        <a  href="javascript:void(0);" id="upload-dilog-close" class="upload-dilog-close" @click="shut">X</a>
        <div style="color:#4091fb;text-align:center;font-size:16px;margin-top:20px;font-weight:bold;font-family: 微软雅黑;">请选择对手方身份</div>
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
            <img src="/static/images/Login/v1.6-geren.png" alt="">
          </el-upload>
        </div>
        <div class='rightDilog'>
          <el-upload
            ref='upload'
            class="upload-demo"
            :action='uploadUrl()'
            :data=Type
            :before-upload="handleChange1"
            :on-success="fileSuccess1"
            :show-file-list= false
            :limit=1
            accept='.docx,.pdf,.doc,.txt'
            element-loading-text="拼命上传中"
            element-loading-background="rgba(0, 0, 0, 0.5)"
          >
            <img src="/static/images/Login/v1.6-qiye.png" alt="">
          </el-upload>
          <p style='clear:both;color:red; text-align:center; margin-left:-288px;padding:10px;'><i class='el-icon-warning'></i>请先选择对手身份个人或者企业</p>
        </div>
      </div>
    </div>

    <template>
      <Version v-show="showVersion" :showVersion="showVersion" @closeVersion="closeVersion"></Version>
    </template>

  </div>
</template>
<style lang="scss" scoped>
  @import "../styles/Top.scss";
  .dialogbg {
    background: #000;
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 1080px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1999;
  }
  .Top .nav a{
    font-size: 16px;
  }
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
  .left-num{
    margin-left: 80px;
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
  .active-tab{
    border-bottom: 3px solid red;
    font-weight: 700;
  }
  .customer-service{
    width: 200px!important;
    height: 50px!important;
    background: url('/static/images/Common/customer-service.gif') no-repeat !important;
    margin-left: 80px;
  }
</style>
<script>
  import cookie from '@/common/js/getTenant'
  import Version from '@/common/components/Version.vue'
  import server from "@/api/url";
  import {exitAndDeleteSession} from "@/api/common";
  export default {
    name: 'Top',
    components:{
      Version
    },
    data() {
      return {
        baseURL:this.baseURL.BASE_URL,
        showVersion:false, //版本号默认不显示
        fullscreenLoading: false,
        popup:false,
        Type:{contractType:'0'},
        uploadFile:true,
        interfaceCode:cookie.getJSON('tenant')?cookie.getJSON('tenant')[1].interfaceCode:'',
        accountCode:sessionStorage.getItem('accountCode')?sessionStorage.getItem('accountCode'):'',
        accountLevel:sessionStorage.getItem("accountLevel"),
        tabIndex:'',
        auditStatus:"" ,  //企业实名情况 2表示实名通过大B号  其他数字表示实名未通过 小B号
        oneAccount:sessionStorage.getItem("auditStatus"),
        Jurisdiction:true,
        showAccount:true,
        isBusiness: cookie.getJSON("tenant")?cookie.getJSON("tenant")[1].isBusiness:'',
        contractNum:cookie.getJSON("tenant")[1].contractNum="null"?10:cookie.getJSON("tenant")[1].contractNum,    //合同剩余次数contractNum
        b2bNum:'',
        b2cNum:'',
      }
    },
    methods: {
        loginOut(){
            this.$router.push('/')
        },
      choice(){

        if(this.isBusiness==0){
            this.popup =!this.popup;
            this.getContractNum();
        }else if(cookie.getJSON('tenant')[1].createContractRole== 1){
          this.$alert('您暂无上传发起权限','提示', {
            confirmButtonText: '确定'
          })
        }else{
             this.popup =!this.popup;
             this.getContractNum();

        }
      },
      //合同剩余发起次数
      getContractNum(){
        let param={
            t:Math.random()
        }
        server.authorityUpload(param,this.interfaceCode).then(res=>{
          if(res.data.resultCode == 1){
            this.contractNum = res.data.data;
            this.b2bNum = res.data.data.b2bNum;
            this.b2cNum = res.data.data.b2cNum;
          }else{
            this.$message({
              showClose: true,
              message: res.data.resultMessage,
              type: "error"
            });
          }
        }).catch(error=>{

        })
      },

      urlloadUrl(){
        return `${this.baseURL}/restapi/wesign/v1/tenant/${this.interfaceCode}/contractfile?accountCode=${this.accountCode}`
      },
      uploadUrl(){
        return `${this.baseURL}/restapi/wesign/v1.4/tenant/${this.interfaceCode}/contractfile?accountCode=${this.accountCode}`
      },
      handleChange(name) {
        this.$loading.show();
        let max_size = 5; // 5M
        let fileContName = name.name.replace(/\s+/g, "");
        let reg = /[.](docx|pdf|doc|txt|DOCX|PDF|DOC|TXT)$/;
        if (!reg.test(fileContName)) {
          this.$message({
            showClose: true,
            message: "只能传pdf,doc,txt,docx格式的文件",
            type: "error"
          });
          this.$refs.upload.clearFiles();
          this.uploadFile = false;
          this.$loading.hide();
          return false;
        }
        else if (name.size > max_size * 1024 * 1024) {
          this.$message({
            showClose: true,
            message: "文件大小超过限制",
            type: "error"
          });
          this.$refs.upload.clearFiles();
          this.uploadFile = false;
          this.$loading.hide();
          return false;
        }
        else if (fileContName.length > 50) {
          this.$message({
            showClose: true,
            message: "上传文件名称不得超过50字符！",
            type: "error"
          });
          this.$refs.upload.clearFiles();
          this.uploadFile = false;
          this.$loading.hide();
          return false;
        }
        else if((this.b2bNum>=0)&&(this.b2cNum<=0)){
          this.$confirm(
          <div class="warn-num">
            <p class="title" style="font-size:16px;text-align:center;">对不起，您的对个人签约次数已用尽!</p>
            <div class="customer-service"></div>
            </div>,'提示', {showCancelButton:'取消'})
          this.$refs.upload.clearFiles();
          this.uploadFile = false;
          this.$loading.hide();

          return false
        }
        else if((this.b2bNum<=0)&&(this.b2cNum<=0)){

          this.$confirm(
          <div class="warn-num">
            <p class="title" style="font-size:16px;text-align:center;">对不起，您的签约次数已用尽!</p>
            <div class="customer-service"></div>
            </div>,'提示', {showCancelButton:'取消'})

          this.$refs.upload.clearFiles();
          this.uploadFile = false;
          this.$loading.hide();

          return false
        }
        else {
          this.loading2 = true;
          this.uploadFile = true;
        }
      },
      handleChange1(name) {
        this.$loading.show();
        let max_size = 5; // 5M
        let fileContName = name.name.replace(/\s+/g, "");
        let reg = /[.](docx|pdf|doc|txt|DOCX|PDF|DOC|TXT)$/;
        if (!reg.test(fileContName)) {
          this.$message({
            showClose: true,
            message: "只能传pdf,doc,txt,docx格式的文件",
            type: "error"
          });
          this.$refs.upload.clearFiles();
          this.uploadFile = false;
          this.$loading.hide();
          return false;
        }
        else if (name.size > max_size * 1024 * 1024) {
          this.$message({
            showClose: true,
            message: "文件大小超过限制",
            type: "error"
          });
          this.$refs.upload.clearFiles();
          this.uploadFile = false;
          this.$loading.hide();
          return false;
        }
        else if (fileContName.length > 50) {
          this.$message({
            showClose: true,
            message: "上传文件名称不得超过50字符！",
            type: "error"
          });
          this.$refs.upload.clearFiles();
          this.uploadFile = false;
          this.$loading.hide();
          return false;
        }
        else if((this.b2bNum<=0)&&(this.b2cNum>=0)){
          this.$confirm(
          <div class="warn-num ">
            <p class="title" style="font-size:16px;text-align:center;">对不起，对企业合同份数已用尽</p>
            <div class="customer-service"></div>
            </div>,'提示', {showCancelButton:'取消'})

          this.$refs.upload.clearFiles();
          this.uploadFile = false;
          this.$loading.hide();

          return false
        }
        else if((this.b2bNum<=0)&&(this.b2cNum<=0)){

          this.$confirm(
          <div class="warn-num">
            <p class="title" style="font-size:16px;text-align:center;">对不起，您的签约次数已用尽!</p>
            <div class="customer-service"></div>
            </div>,'提示', {showCancelButton:'取消'})

          this.$refs.upload.clearFiles();
          this.uploadFile = false;
          this.$loading.hide();

          return false
        }
        else {
          this.loading2 = true;
          this.uploadFile = true;
        }
      },
      shut() {
        this.popup=!this.popup
      },
      fileSuccess(name, file, fileList){  //上传文件，传参数 contractName contractNo 渲染 Contractsigning.vue
        this.$loading.hide();
        let contractName = file.name.replace(/\s+/g, "")
        let contractNo = file.response.contractNo
        let resultCode = file.response.resultCode
        if(  this.uploadFile == true ){
          this.$message({
            showClose: true,
            message: '上传成功',
            type: 'success'
          });
          let index1=contractName.lastIndexOf(".");
          let suffix=contractName.slice(0,index1);
          this.$store.dispatch('fileSuccess1',{contractName:suffix,contractNo:contractNo})
          sessionStorage.setItem('contractName', suffix)
          sessionStorage.setItem('contractNo', contractNo)
          this.$router.push('/Contractsigning')
        }
      },
      fileSuccess1(name, file, fileList){  //上传文件，传参数 contractName contractNo 渲染 Contractsigning.vue
        this.$loading.hide();
        let contractName = file.name.replace(/\s+/g, "")
        let contractNo = file.response.contractNo
        let resultCode = file.response.resultCode
        if( this.uploadFile == true ){
          this.$message({
            showClose: true,
            message: '上传成功',
            type: 'success'
          });
          let index1=contractName.lastIndexOf(".");
          let suffix=contractName.slice(0,index1);
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
        exitAndDeleteSession().then(res=> {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: 'success'
            })
            this.$router.push('/')

        }).catch(error=>{

        })
      },
      tabActive(value){
        this.$store.dispatch('tabIndex',{tabIndex:value});
        this.tabIndex = this.$store.state.tabIndex;

      },
    },
    created(){
      this.getContractNum();
      let auditSteps = cookie.getJSON('tenant')[1].auditSteps;
      if(auditSteps == 3){
        this.Jurisdiction = true
      }else {
        this.Jurisdiction = false
      }

    },

  }
</script>


