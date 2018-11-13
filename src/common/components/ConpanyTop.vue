<template>
  <div class="ConpanyTop">
    <nav class='nav'>
      <p class='logo'>
        <img src="../../../static/images/Top/v1.6-logo.png" alt="logo图">
      </p>
      <ul id='ul'>
        <router-link to='/Home'><li><a href="javascript:void(0);">首页</a></li></router-link>
        <router-link to='/Mycontract'><li><a href="javascript:void(0);">我的合同</a></li></router-link>
        <router-link to='/Multiparty' ><li style="visibility:  hidden;"><a href="javascript:void(0);">我的模板</a></li></router-link>
        <router-link to='/Room'><li style="visibility:  hidden;"><a href="javascript:void(0);">签约室</a></li></router-link>
        <li  @click="dialogVisible" style='color:#fff;cursor:pointer;visibility:  hidden;'>版本</li>
      </ul>
      <ol class='btns'>
        <li style="visibility:  hidden;"><router-link to='/Multiparty'><a href="javascript:void(0);">模板发起</a></router-link></li>
        <li style="visibility:  hidden;">
          <!-- <el-upload
          ref='upload'
          class="upload-demo"
          :action='urlloadUrl()'
          :before-upload="handleChange"
          :on-success="fileSuccess"
          :show-file-list= false
          :limit=1
          accept='.docx,.pdf,.doc,.txt'
          v-loading.fullscreen.lock="fullscreenLoading"
          element-loading-text="拼命上传中"
          element-loading-background="rgba(0, 0, 0, 0.75)"
          > -->
          <a href="javascript:void(0);" @click='choice'>上传发起</a>
          <!-- </el-upload> -->
        </li>
        <li @click="amendPassWord"><img src="../../../static/images/back.png" alt=""><a href="javascript:void(0);">退出</a></li>
        <li id='dloa'  @click="centerDialogVisible = true"><img src="../../../static/images/setup.png" alt=""><a href="javascript:void(0);">修改密码</a></li>
      </ol>
      <template>
        <Version v-show="showVersion" :showVersion="showVersion" @closeVersion="closeVersion"></Version>
      </template>
      <div id='update'>
        <el-dialog
          custom-class='dlstyle'
          title="修改密码"
          :visible.sync="centerDialogVisible"
          width="360px"
          top="30vh"
          center
          @close="closeDialog('ruleForm')"
        >
          <div id='logner'>
            <el-form :model="ruleForm" :rules="rules" ref='ruleForm' class="demo-ruleForm" label-width="85px">
              <el-form-item label="原密码：" prop="oldPassWord">
                <el-input v-model="ruleForm.oldPassWord" type="password" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="新密码：" prop="newPassWord">
                <el-input v-model="ruleForm.newPassWord" type="password" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码：" prop="checkPassWord">
                <el-input v-model="ruleForm.checkPassWord" type="password" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
          <el-button @click="resetForm('ruleForm')" size='medium'>取 消</el-button>
          <el-button type="primary"  @click="submitForm('ruleForm')" size="medium">确 定</el-button>
        </span>
        </el-dialog>
      </div>
    </nav>
    <div class='dilog' v-show="popup">
      <div class='left'>
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
          <img src="../../../static/images/Login/b2c.png" alt="">
        </el-upload>
      </div>

      <div class='right'>
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
          <img src="../../../static/images/Login/b2b.png" alt="">
        </el-upload>
        <p style='clear:both;color:red; text-align:center; margin-left:-288px;padding:10px;'><i class='el-icon-warning'></i>请先选择对手身份个人或者企业</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
  @import "../styles/Top.css";
</style>
<style>

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
  .dilog .left .upload-demo{
    width:252px !important;
    height:191px ;
  }

  .ConpanyTop{
    background:#4091fb;
  }
</style>
<script>
  import md5 from 'js-md5'
  import {validatePassWord} from '@/common/js/validate'
  import cookie from '@/common/js/getTenant'
  import Version from '@/common/components/Version.vue'
  export default {
    name: 'ConpanyTop',
    components:{
      Version
    },

    data() {
      var validateOldPassWord = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入原密码'));
        } else {
          this.$http.get(process.env.API_HOST+'/tenant/login',{params:{"username":cookie.getJSON('tenant').mobile,"password":md5(this.ruleForm.oldPassWord)}}).then(function (res) {
            var backCode = res.data.resultCode
            if( backCode === '0'){
              callback(new Error('原密码输入错误!'));
            } else {
              callback();
            }
          })
        }
      };
      var validateNewPassWord = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else if (value.length < 8 || value.length > 16) {
          callback(new Error('密码长度必须为8-16位'))
        } else if (!validatePassWord(value)){
          callback(new Error('密码格式为数字+字母'))
        }else {
          callback();
        }
      }
      var validateCheckPassWord = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.newPassWord) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
      return {
        baseURL:this.baseURL.BASE_URL,
        fullscreenLoading: false,
        centerDialogVisible: false,
        popup:false,
        Type:{contractType:'0'},
        interfaceCode:cookie.getJSON('tenant')[0].interfaceCode,
        ruleForm: {
          oldPassWord: '',
          newPassWord: '',
          checkPassWord:''
        },
        rules:{
          oldPassWord: [
            { validator: validateOldPassWord, trigger: 'blur' }
          ],
          newPassWord: [
            { validator: validateNewPassWord, trigger: 'blur' }
          ],
          checkPassWord:[
            { validator: validateCheckPassWord, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      choice(){
        this.popup =!this.popup
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
        this.showVersion=true;
      },
      closeVersion(){
        this.showVersion=false;
      },
      closeDialog (formName) {
        this.$refs[formName].resetFields()
        this.centerDialogVisible = false
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
        this.centerDialogVisible = false
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.get(process.env.API_HOST+'/tenant/'+ cookie.getJSON('tenant')[0].interfaceCode + '/password',{params:{"oldPassword":md5(this.ruleForm.oldPassWord),"newPassword":md5(this.ruleForm.newPassWord)}}).then(function (res) {
              if(res.data.sessionStatus == '0'){
                this.$router.push('/Server')
              } else {
                var resultCode = res.data.resultCode
                if ( resultCode === '0') {
                  this.$message({
                    showClose: true,
                    message: '修改密码成功!',
                    type: 'success'
                  });
                  this.centerDialogVisible = false
                  this.$router.push('/')
                } else {
                  this.$message({
                    showClose: true,
                    message: '修改密码失败!',
                    type: 'error'
                  });
                  this.resetForm (formName)
                }
              }
            })
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      signOut () {
        this.$http.get(process.env.API_HOST+'/tenant/exitAndDeleteSession').then(function (res) {
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

