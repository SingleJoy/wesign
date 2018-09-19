<template>
  <div class="forget-wrap">
    <div class="ms-forget">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="">
        <h2 class="forget-logo">忘记密码</h2>
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入手机号码" class="forget-input" :maxlength=11></el-input>
        </el-form-item>
        <el-form-item prop="message">
          <el-input type="text" placeholder="请输入短信验证码" class='forget-messageInput' v-model="ruleForm.message" style="width: 200px;"></el-input>
          <el-button type="primary" class="forget-messageButton" @click='sendCode' id='code' style="margin-left: 20px;">获取</el-button>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password" type="password" placeholder="请设置登录密码"></el-input>
        </el-form-item>
        <el-form-item prop="passwordAgain">
          <el-input v-model="ruleForm.passwordAgain" type="password" placeholder="请再次输入登录密码"></el-input>
        </el-form-item>
        <div class="forget-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">提&nbsp;&nbsp;交</el-button>
          <router-link to='/'><p style="font-size:12px;line-height:30px;color:#999;"><a id='submit' href="javascript:void(0)">返回登录</a></p></router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {validateMoblie} from '@/common/js/validate'
  import md5 from 'js-md5'
  import cookie from '@/common/js/getTenant'
  export default {
    data () {

      var checkName = (rule,value,callback) => {   //判断手机号（正则，长度，非空验证，用户是否是注册用户）
        if (value === ''){
          callback(new Error('请输入手机号'))
          this.disCode = true
        } else if (!validateMoblie(value)){
          callback(new Error('手机号输入错误'))
          this.disCode = true
        } else {
          this.$http.get(process.env.API_HOST+'v1/tenant',{params:{
              'username':this.ruleForm.username
            }}).then(response =>{
            if (response.body === 0) {
              this.disCode = false
              callback()
            } else {
              callback(new Error('此用户不存在'))
              this.disCode = true
            }
          }).catch((err) => {
            this.disCode = true
            this.$message({
              message: '出错啦',
              type: 'warning'
            })
          })
        }
      }
      var checkMessage = (rule,value,callback) => {   //判断短信验证码（长度，非空验证）
        if (value === ''){
          callback(new Error('请输入短信验证码'))
        } else if (value.length < 6){
          callback(new Error('短信验证码长度必须为6位'))
        } else {
          this.$http.get(process.env.API_HOST+'v1/sms',{params:{
              'userName':this.ruleForm.username,'smsNo': this.smsNum,'smsCode': value,'appId':this.appId
            }}).then(response =>{
            if (response.body === 0) {
              callback()
              this.getCode = true
            } else {
              callback(new Error('短信验证码填写错误'))
              this.getCode = false
            }
          })
        }
      }
      var checkPassWord = (rule,value,callback) => {  //判断密码（长度，非空验证）
        if (value === ''){
          callback(new Error('请输入密码'))
        } else if (value.length < 8 || value.length > 16) {
          callback(new Error('密码长度必须为8-16位'))
        } else {
          callback()
        }
      }
      var checkPassWordAgain = (rule,value,callback) => { //再次判断密码（长度，非空验证,一致性）
        if (value === ''){
          callback(new Error('请再次输入密码'))
        } else if (value.length < 8 || value.length > 16) {
          callback(new Error('密码长度必须为8-16位'))
        } else if (value !== this.ruleForm.password){
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }

      return {
        ruleForm: {
          username: '',
          message: '',
          password: '',
          passwordAgain: '',
          appId:'',
          disCode:false,
          mobile:'',
          getCode:false
        },
        rules: {
          username: [
            { validator: checkName, trigger: 'blur' }
          ],
          message:[
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
      submitForm(formName) {
        if(this.ruleForm.mobile != this.ruleForm.username){//校验发送验证码的手机和提交时的手机是否是一个
          this.$message({
                  message: '请检查手机号是否正确',
                  type: 'warning'
                })
          return false
        } 
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var pass = md5(this.ruleForm.password);
            var user = {'mobile':this.ruleForm.username,'newPassword':pass}
            this.$http.post(process.env.API_HOST+'v1.4/tenant/changePassword',user,{emulateJSON: true}).then(response =>{
              var resultCode = response.data.resultCode
              if (resultCode === '1') {
                this.$message({
                  message: '修改密码成功',
                  type: 'success'
                })
                this.$router.push('/')
              }
            })
          } else {
            return false;
          }
        });
      },
      sendCode(){
        if(this.ruleForm.username == ''){
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

        this.$http.post(process.env.API_HOST+'v1/sms/sendCode', {'userName': this.ruleForm.username, 'sendType': codeType}, {emulateJSON: true}).then(function (res) {
          var appId = res.data.appId
          this.appId = appId
          var resultCode = res.data.resultCode
          var smsNo = res.data.smsNo
          var smsCode = res.data.smsCode
          this.ruleForm.mobile = res.data.mobile  //发送验证码后返回的手机号
          if (resultCode === '0') {
            var codeInfo = document.getElementById('code')
            codeInfo.innerText =  curCount + '秒'
            this.smsNum = smsNo
            codeInfo.setAttribute('disabled', 'true')
            timer = setInterval(function () {
              codeInfo.innerText =  (curCount - 1) + '秒'
              if (curCount === 0) {
                codeInfo.innerText = '获取'
                clearInterval(timer)
                codeInfo.removeAttribute('disabled')
              } else {
                curCount--
              }
            }, 1000)
          }else{
            this.$message({
            message: res.data.resultMessage,
            type: 'warning'
          })
          }
        })
      }
    }
  }
</script>

<style scoped>
  .forget-wrap{
    position: relative;
    width:1200px;
    height:600px;
    background: url("../../../static/images/Login/forget_word.png") no-repeat;
    background-size: 1200px;
    margin:-60px auto 0 auto;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
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
    height: 50px;
    margin-top:-10px;
    margin-left: 100px;
    color:#409EFF;
    font-family: '幼圆';
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

    width:300px;
    height:345px;
    margin:-200px 0 0 760px;
    padding:40px;
    border-radius: 10px;


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
    height:36px;
  }
  #submit{
    color: #22a7ea;
    float:right;
    margin-top:10px;
  }



</style>
