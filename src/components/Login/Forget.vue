<template>
  <div>
    <div class="login-nav">
      <div class="logo-zq"><img src="/static/images/Login/modification-logo.png" alt=""></div>
      <div class="logo-content">
        <span>已有账号，</span>
        <span class="simulation" @click="register()">
          <span class="register">立即登录</span>
          <img src="/static/images/Login/goback-right.png" alt="">
        </span>
      </div>
    </div>
    <div class="forget-wrap">
      <div class="ms-forget">
        <div class="login-body-left">
          <p style="font-size: 2.5rem;">电子合同+，用合约重构交易</p>
          <!-- <p style="font-size: 2.5rem;">更快，更安全的电子合同解决方案</p>
					<p style="margin-top: 15px;">众签应用互联网云技术，用最快的方式解决互联网在线签署及其司法效力等</p>
					<p>问题。使用众签让你的工作，生活更美好，更随意。</p> -->
        </div>
        <div class="form-forget">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="">
            <h2 class="forget-logo">忘记密码</h2>
            <el-form-item prop="username">
              <el-input v-model="ruleForm.username" placeholder="请输入手机号码" class="forget-input" :maxlength=11></el-input>
            </el-form-item>
            <!-- <el-form-item prop="message"> -->
            <el-form-item prop="code">
              <el-input v-model="ruleForm.code" maxlength="6" placeholder="请输入短信验证码" class="">
                <el-button slot="append" @click='sendCode' id='code'>获取验证码</el-button>
              </el-input>
              <!-- </el-form-item> -->
              <!-- <el-input type="text" placeholder="请输入短信验证码" class='forget-messageInput' v-model="ruleForm.message" style="width: 200px;"></el-input>
						  <el-button type="primary" class="forget-messageButton" @click='sendCode' id='code' style="margin-left: 20px;">获取</el-button> -->
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="ruleForm.password" type="password" placeholder="请设置登录密码"></el-input>
            </el-form-item>
            <el-form-item prop="passwordAgain">
              <el-input v-model="ruleForm.passwordAgain" type="password" placeholder="请再次输入登录密码"></el-input>
            </el-form-item>
            <div class="forget-btn">
              <el-button type="primary" @click="submitForm('ruleForm')">确&nbsp;&nbsp;认</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {validateMoblie, validateSmsCode, validatePassWord} from '@/common/js/validate'
  import md5 from 'js-md5'
  import cookie from '@/common/js/getTenant'
  import {valitedUser,valitedSmsCode,changePassword,sendSmsCode} from '@/api/login'
  export default {
    data () {

      let checkName = (rule,value,callback) => {   //判断手机号（正则，长度，非空验证，用户是否是注册用户）
        if (value === ''){
          callback(new Error('请输入手机号'))
          this.disCode = true
        } else if (!validateMoblie(value)){
          callback(new Error('手机号输入错误'))
          this.disCode = true
        } else {
          let param ={
            'username':this.ruleForm.username
          }
          valitedUser(param).then(res=>{
            if (res.data === 0) {
              this.disCode = false
              callback()
            } else {
              callback(new Error('此用户不存在'))
              this.disCode = true
            }
          }).catch(error=>{
            this.disCode = true
            this.$message({
              message: '出错啦',
              type: 'warning'
            })
          })
        }
      }
      let checkMessage = (rule,value,callback) => {   //判断短信验证码（长度，非空验证）
        if (value === ''){
          callback(new Error('请输入短信验证码'));
        } else if (!validateSmsCode(value)){
          callback(new Error('验证码格式不正确'));
        } else {
          callback();
        }
      }
      let checkPassWord = (rule,value,callback) => {  //判断密码（长度，非空验证）
        if (value === ''){
          callback(new Error('请输入密码'))
        } else if (value.length < 8 || value.length > 16) {
          callback(new Error('密码长度必须为8-16位'))
        }else if (!validatePassWord(value)){
          callback(new Error('密码格式为数字+字母'))
        } else {
          callback()
        }
      }
      let checkPassWordAgain = (rule,value,callback) => { //再次判断密码（长度，非空验证,一致性）
        if (value === "") {
          callback(new Error("请输入密码"));
        } else if(!validatePassWord(value)) {
          callback(new Error("密码格式不对"));
        } else if(value !== this.ruleForm.password){
          callback(new Error("两次输入密码不一致"));
        } else {
          callback();
        }
      }

      return {
        ruleForm: {
          username: '',
          message: '',
          code: '',
          password: '',
          passwordAgain: '',
          appId:'',
          smsNo: '',
          iscode: '',
          disCode:false,
          mobile:'',
          getCode:false
        },
        rules: {
          username: [
            { validator: checkName, trigger: 'blur' }
          ],
          code:[
            { validator: checkMessage, trigger: 'blur' }
          ],
          password: [
            { validator: checkPassWord, trigger: 'blur' }
          ],
          passwordAgain:[
            { validator:checkPassWordAgain, trigger: 'blur' }
          ]
        },
        smsNum :''
      }
    },
    methods: {
      register() {
        this.$router.push('/');
      },
      submitForm(formName) {
        if(!this.getCode){
          this.$message({
            message: '请先获取验证码！',
            type: 'warning'
          })
          return false
        }
        if(this.ruleForm.mobile != this.ruleForm.username){//校验发送验证码的手机和提交时的手机是否是一个
          this.$message({
            message: '请检查手机号是否正确',
            type: 'warning'
          })
          return false
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //验证码是否正确
            let param={
              'mobile': this.ruleForm.username,
              'smsNo': this.smsNo,
              'smsCode': this.ruleForm.code,
              'appId': this.appId
            }
            valitedSmsCode(param).then(res=>{
              if(res.data.resultCode == 1) {
                let pass = md5(this.ruleForm.password);
                let user = {'mobile':this.ruleForm.username,'newPassword':pass};
                changePassword(user).then(res=>{
                  let resultCode = res.data.resultCode
                  if (resultCode == '1') {
                    this.$message({
                      message: '修改密码成功',
                      type: 'success'
                    })
                    this.$router.push('/')
                  }
                  else{
                    this.$message({
                      message: res.data.resultMessage,
                      type: 'error'
                    })
                  }
                }).catch(error=>{
                })
              }else {
                this.$message({
                  showClose: true,
                  message: res.data.resultMessage,
                  type: 'error'
                });
              }
            }).catch(error=>{

            })
          } else {
            return false;
          }
        });
      },
      sendCode(){
        if(!this.ruleForm.username){
          this.$message({
            message: '请输入手机号',
            type: 'warning'
          })
          return
        }else if(!validateMoblie(this.ruleForm.username)){
          this.$message({
            message: '手机号输入错误',
            type: 'warning'
          })
          return
        }
        if(this.disCode){
          return
        }

        var codeType = '0'
        var InterValObj = 60
        var count = 60
        var curCount = count
        var timer = null
        let param={
          'userName': this.ruleForm.username,
          'sendType': codeType
        };
        sendSmsCode(param).then(res=>{
          var appId = res.data.appId
          this.appId = appId
          var resultCode = res.data.resultCode
          var smsNo = res.data.smsNo
          this.smsNo = res.data.smsNo
          var smsCode = res.data.smsCode
          this.ruleForm.mobile = res.data.mobile  //发送验证码后返回的手机号
          if (resultCode === '0') {
            this.iscode = true;
            this.getCode = true;
            var codeInfo = document.getElementById('code')
            codeInfo.innerText =  curCount + '秒后获取'
            this.smsNum = smsNo
            codeInfo.setAttribute('disabled', 'true')
            timer = setInterval(function () {
              codeInfo.innerText =  (curCount - 1) + '秒后获取'
              if (curCount === 0) {
                codeInfo.innerText = '重新获取验证码'
                clearInterval(timer)
                codeInfo.removeAttribute('disabled')
              } else {
                curCount--
              }
            }, 1000)
          }else{
            this.getCode=false;
            this.$message({
              message: res.data.resultMessage,
              type: 'warning'
            })
          }
        }).catch(error=>{

        })
      }
    }
  }
</script>

<style scoped>
  .el-input-group__append button.el-button, .el-input-group__append div.el-select .el-input__inner, .el-input-group__append div.el-select:hover .el-input__inner, .el-input-group__prepend button.el-button, .el-input-group__prepend div.el-select .el-input__inner, .el-input-group__prepend div.el-select:hover .el-input__inner{
    background-color: #4091fb;
    color: #ffffff;
  }
  .el-button--primary {
    background-color: #4091fb;
  }
  .forget-wrap{
    width: 100%;
    height: 40rem;
    overflow:hidden;
    background: url('/static/images/Login/new-login.png') no-repeat;
    background-size: 100% 100%;
  }
  /* .water-qrurl-code{
  position: absolute;
  left: 0;
  top: 0;
  width: 42px;
  height: 42px;
  z-index: 2;
  margin-left: 338px;
  background-repeat: no-repeat;
  background-position: -1px -1px;
  } */
  .forget-logo{
    width: 100px;
    margin-top:-10px;
    margin-left: 100px;
    color:#333333;
    font-size: 1.5rem;
    /* font-family: '幼圆'; */
  }
  .sy_close {
    width: 42px;
    height: 42px;
    position: absolute;
    cursor: pointer;
    z-index: 3;
    background-repeat: no-repeat;
    background-position: -1px -1px;
  }
  .sy_close:hover{
    background-position: -1px -46px;
  }

  .icon-suo{
    position: absolute;
    right: 20px;
  }
  .ms-forget{
    width: 75rem;
    height: auto;
    margin: 0 auto;
    border-radius: 10px;
    position: relative;
  }
  .form-forget{
    width: 22.5rem;
    position: absolute;
    background: #fff;
    padding: 1.875rem;
    border-radius: 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    right: 0;
    top: 7.75rem;
  }
  .forget-input{
    margin-top: 20px;

  }
  .forget-messageInput{
    width: 210px;
  }
  .forget-messageButton{
    margin-left: 12px;
  }
  .forget-btn{
    text-align: center;
  }
  .forget-btn button{
    width:100%;
    height:40px;
  }
  #submit{
    color: #4091fb;
    float:right;
    margin-top:10px;
  }
  .login-body-left{
    position: absolute;
    left: 0;
    top: 6.875rem;
    color: #fff;
  }
  .login-nav {
    background-color: #fff;
    height: 80px;
    line-height: 80px;
    padding: 0 50px;
  }
  .logo-zq {
    display: inline-block;
  }
  .logo-zq img {
    vertical-align: middle;
  }
  .logo-content {
    display: inline-block;
    float: right;
  }
  .logo-content img {
    vertical-align: middle;
  }
  .register {
    color: #4091fb;
    cursor: pointer;
  }
  .simulation {
    cursor: pointer;
  }
</style>
