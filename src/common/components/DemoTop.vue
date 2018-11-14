<template>
  <div class="Top">
    <nav class='nav'>
      <p class='logo'>
        <img src="../../../static/images/Top/v1.6-logo.png" alt="logo图">
      </p>
      <ul id='ul'>
        <router-link to='/Home' @click.native="tabActive(0)"><li :class="{'active-tab':tabIndex==0}"><a href="javascript:void(0);">首页</a></li></router-link>
        <router-link to='/Mycontract' @click.native="tabActive(1)"><li :class="{'active-tab':tabIndex==1}"><a href="javascript:void(0);">我的合同</a></li></router-link>
        <router-link to='/Multiparty' @click.native="tabActive(2)"><li :class="{'active-tab':tabIndex==2}"><a href="javascript:void(0);">我的模板</a></li></router-link>
        <router-link v-if="accountLevel!=2" to='/Room' @click.native="tabActive(3)"><li :class="{'active-tab':tabIndex==3}"><a href="javascript:void(0);">签约室</a></li></router-link>
        <li :class="{'active-tab':tabIndex==4}" @click="dialogVisible(4)" style='color:#fff;cursor:pointer;font-size:16px;'>版本</li>
      </ul>
      <ol class='btns'>
        <li :class="{'left-num':accountLevel==2}"><router-link to='/Multiparty'><a href="javascript:void(0);">模板发起</a></router-link></li>
        <li><a href="javascript:void(0);" @click='choice'>上传发起</a></li>
        <li @click="amendPassWord"><img src="../../../static/images/back.png" alt=""><a href="javascript:void(0);">退出</a></li>
        <li :class="{'active-tab':tabIndex==5}" style="margin-left:20px;" v-if="Jurisdiction">
          <router-link  @click.native="tabActive(5)" to='/Account'>
            <img src="../../../static/images/setup.png" alt="">
            <a href="javascript:void(0);">我的账户</a>
          </router-link>
        </li>
        <li :class="{'active-tab':tabIndex==5}" style="margin-left:20px;" v-else>
          <router-link  @click.native="tabActive(5)" to='/NoReal'>
            <img src="../../../static/images/setup.png" alt="">
            <a href="javascript:void(0);">我的账户</a>
          </router-link>
        </li>
      </ol>

    </nav>

    <template>
      <Version v-show="showVersion" :showVersion="showVersion" @closeVersion="closeVersion"></Version>
    </template>

  </div>
</template>
<style lang="css" scoped>
  @import "../styles/DemoHomeTop.css";
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
</style>
<script>
  import cookie from '@/common/js/getTenant'
  import Version from '@/common/components/Version.vue'
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

      }
    },
    methods: {
      choice(){
        if(cookie.getJSON('tenant')[1].createContractRole== 1){
          this.$alert('您暂无发起权限','提示', {
            confirmButtonText: '确定'
          })
        }else{
          this.popup =!this.popup
        }
      },
      urlloadUrl(){
        return `${this.baseURL}/restapi/wesign/v1/tenant/${this.interfaceCode}/contractfile?accountCode=${this.accountCode}`
      },
      uploadUrl(){
        return `${this.baseURL}/restapi/wesign/v1.4/tenant/${this.interfaceCode}/contractfile?accountCode=${this.accountCode}`
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
          sessionStorage.setItem('contractName', suffix)
          sessionStorage.setItem('contractNo', contractNo)
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
          sessionStorage.setItem('contractName', suffix)
          sessionStorage.setItem('contractNo', contractNo)
          this.$router.push('/Signature')
        }
      },
      openFullScreen() {
        this.fullscreenLoading = true
      },
      dialogVisible () {

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
      },
      tabActive(value){
        this.$store.dispatch('tabIndex',{tabIndex:value});
        this.tabIndex = this.$store.state.tabIndex;

      },
    },
    created(){

      this.tabIndex = this.$store.state.tabIndex;
      // this.auditStatus=sessionStorage.getItem("auditStatus");
      // console.log(this.auditStatus);
      // if(this.auditStatus=='2'){
      //   this.oneAccount=true;
      // }else {
      //   this.oneAccount=false;
      // }
      //var Status = cookie.getJSON('tenant')[1].isBusiness;
      // console.log("Status"+Status)
      //   if(Status == '0'){
      //     this.Jurisdiction = false

      //   }else {
      //     this.Jurisdiction = true
      //   }


    },


  }
</script>

