/*
* @Author: wangjia
* @Date: 2018-06-19 11:29:05
* @Last Modified by: wangjia
* @Last Modified time: 2018-07-04 14:27:19
*/
<template>
  <div>
    <div class="Topes">
      <nav class='nav'>
        <p class='logo'>
          <img src="../../../../../static/images/logo2.png" alt="">
        </p>
        <div class='buttons'>

        </div>
      </nav>
    </div>
    <div class='Enterprises'>
      <div class='step' style="width: 720px;">
        <ul>
          <li class="active"><i class='el-icon-document'></i><b>注册</b></li>
          <p></p>
          <li><i class='el-icon-goods'></i><b>个人认证</b></li>
          <p></p>
          <li><i class='el-icon-edit'></i><b>企业认证</b></li>
          <p></p>
          <li><i class='el-icon-menu'></i><b>打款确认</b></li>
          <p></p>
          <li><i class='el-icon-check'></i><b>完成</b></li>
        </ul>
      </div>
      <div class='productes'>
        <div class="title" style="padding: 20px 0 0 15px;">
          <div style="display: block;">
            <img src="../../../../../static/images/Credentials/Enterprise/Register/register.png" alt="" >
          </div>
        </div>
        <div class='center' style="margin-top: 50px;">
          <div class='container'>
            <div class='second'>
              <span >企业全称</span>
              <el-input
                style='width:330px;'
                placeholder="请输入内容"
                v-model="EnterpriseName"

                :disabled= disabled
              >
              </el-input>
              <p class="tips">若此处企业全称与您所在的公司企业全称名字不符，请联系合同发起方，重新发起合同。</p>
            </div>
            <div class='second'>
              <span >手机号</span>
              <el-input
                style='width:330px;'
                placeholder="请输入内容"
                v-model="phone"

                :disabled= disabled
              >
              </el-input>
            </div>
            <div class='second'>
              <span>姓名</span>
              <el-input
                style='width:330px;'
                placeholder="请输入姓名"
                v-model="userName"

                :disabled= disabled
              >
              </el-input>
            </div>
            <div class='second'>
              <span>验证码</span>
              <el-input
                style='width:330px;'
                placeholder="验证码"
                v-model="smsCode"

              >
              </el-input>
              <el-button  type="primary" style="margin-left: -125px;width: 120px;height: 40px;z-index: 999;position: relative;" @click='getSmsCode' id='code'>获取验证码</el-button>
            </div>
            <div class='second'>
              <span>请设置密码</span>
              <el-input
                style='width:330px;'
                placeholder="请输入密码"
                type='password'
                v-model="passWord"

                :disabled= forbid
              >
              </el-input>
            </div>
            <div class='second'>
              <span >再次确认密码</span>
              <el-input
                style='width:330px;'
                placeholder="请再次输入密码"
                type='password'
                v-model="verifyPassWord"
                :disabled= forbid
              >
              </el-input>
            </div>
            <div class='second' style="margin-left:68px;">
              <el-checkbox v-model="agree" name="type" @change='changEvent'></el-checkbox>
              <b style="color:#424242;font-size: 14px;padding-left: 15px;">我同意<b style="padding-left: 10px;color:#22a7ea;cursor: pointer;" @click="dialogAgreement = true">《微签使用协议》</b></b>
            </div>
            <div class='second'>
              <div class="edit-btn" >
                <!-- <el-button type="primary" style="width: 200px;">返回</el-button> -->
                <el-button  type="primary" style="width: 330px;margin-left: 80px;" :disabled='flag' @click="submitFrom">提交</el-button>
              </div>
            </div>
            <el-dialog
              :visible.sync="dialogAgreement"
              width="40%"
            >
              <img src="../../../../../static/images/Credentials/Enterprise/Register/agreement.jpg" alt="" style="width:100%;height:100%;">
            </el-dialog>


          </div>
        </div>
      </div>
    </div>

    <div id="register-dialog">
      <div class='box'>
        <div class='box-container'>

        </div>
        <p style="text-align: center;padding-top: 20px;font-size: 12px;color: #22a7ea;line-height: 20px;">
          您已完成注册，请使用账号密码进行登录
          即将跳转至登录页面<span style="color:red;padding-left: 10px;">{{num}}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  import { Message } from 'element-ui';
  import {validateMoblie,validatePassWord} from '../../../../common/js/validate.js'
  import {GetQueryString} from '@/common/js/InterceptUrl'
  import {prohibit} from '@/common/js/prohibitBrowser'
  import md5 from 'js-md5'
  export default {
    name: 'Register',
    data() {
      return {
        interfaceCode:'',
        EnterpriseName:'',
        phone:'',
        userName:'',
        smsCode:'',
        passWord:'',
        verifyPassWord:'',
        agree:false,
        appId:'',
        smsNum:'',
        disabled:false,
        forbid:false,
        dialogAgreement:false,
        flag:true,
        sms:false,
        smval:null,
        repeat:false,
        accountStatus:'',
        num:3,
        verCode:false,
        verifyMobile:'',
        isDisabled:false,
        smsCodeNum:0,
        smsNo:false,
      }
    },
    mounted() {
      prohibit()
    },
    methods:{
      validateEntName() {
        if( this.EnterpriseName == ''){
          this.$message({
            showClose: true,
            message: '企业全称（必填项）',
            type: 'warning'
          })
          return false
        }
      },
      validatePhone() {
        if( this.phone == ''){
          this.$message({
            showClose: true,
            message: '手机号（必填项）',
            type: 'warning'
          })
          return false
        } else if(!validateMoblie(this.phone)){
          this.$message({
            showClose: true,
            message: '手机号格式不正确！',
            type: 'warning'
          })
          return false
        }
      },
      validateUserName() {
        if( this.userName == ''){
          this.$message({
            showClose: true,
            message: '姓名（必填项）',
            type: 'warning'
          })
          return false
        }
      },
      validatePassWords() {
        if( this.passWord == ''){
          this.$message({
            showClose: true,
            message: '密码（必填项）',
            type: 'warning'
          })
        }else if (this.passWord.length < 8 || this.passWord.length > 16) {
          this.$message({
            showClose: true,
            message: '密码长度为8-16位',
            type: 'warning'
          })
        } else if (!validatePassWord(this.passWord)){
          this.$message({
            showClose: true,
            message: '密码格式为数字+字母',
            type: 'warning'
          })
        }
        return false
      },
      validateVerifyPassWord() {
        if( this.verifyPassWord == ''){
          this.$message({
            showClose: true,
            message: '密码（必填项）',
            type: 'warning'
          })
          return false
        } else if (this.verifyPassWord != this.passWord){
          this.$message({
            showClose: true,
            message: '两次密码填写不一致',
            type: 'error'
          })
          return false
        }
      },
      getSmsCode() {
        if(this.repeat == false){
          this.repeat = true
          var codeType = '0'
          var InterValObj = 60
          var count = 60
          var curCount = count
          var timer = null
          this.sms = true
          this.$http.post(process.env.API_HOST+'v1.4/sms/sendCode', {'mobile': this.phone, 'sendType': codeType,'interfaceCode':this.interfaceCode}, {emulateJSON: true}).then(function (res) {
            this.smval=res.data.smsCode
            var appId = res.data.appId
            this.appId = appId
            // console.log('我拿到了appId哦')
            var resultCode = res.data.resultCode;
            var smsNo = res.data.smsNo;
            var smsCode = res.data.smsCode;
            var message = res.data.resultMessage;
            if (resultCode === '1') {
              this.smsNo = true
              this.smsCodeNum +=1
              if(this.smsCodeNum == 3){
                this.isDisabled = true
              } else{
                this.isDisabled = false
              }
              var codeInfo = document.getElementById('code')
              codeInfo.innerText =  curCount + '秒'
              this.smsNum = smsNo

              codeInfo.setAttribute('disabled', 'true')
              var that = this
              timer = setInterval(function () {
                codeInfo.innerText =  (curCount - 1) + '秒'
                if (curCount === 0) {
                  codeInfo.innerText = '获取'
                  clearInterval(timer)
                  codeInfo.removeAttribute('disabled')
                  that.repeat = false
                } else {
                  curCount--
                }
              }, 1000)
            }else{
              let that =this;
              // this.$message({
              //   showClose: true,
              //   message: message?message:'验证码获取失败',
              //   type: 'error'
              // })
              that.smsNo = false
              that.repeat = false
            }
          })
        }
      },

      // validateSmsCode() {
      //   if( this.smsCode == ''){
      //     this.$message({
      //       showClose: true,
      //       message: '验证码（必填项）',
      //       type: 'error'
      //     })
      //     return false
      //   } else{
      //     this.$http.get(process.env.API_HOST+'v1.4/sms',{params:{
      //       'mobile':this.phone,'smsNo': this.smsNum,'smsCode': this.smsCode,'appId':this.appId
      //     }}).then(response =>{
      //       if (response.data.resultCode != 1 ) {
      //         this.verCode = false;
      //         if(this.sms == true){
      //            this.$message({
      //             showClose: true,
      //             message: response.data.resultMessage,
      //             type: 'error'
      //           })
      //         }

      //         return false
      //       }else{
      //         this.verCode = true;
      //         return true
      //       }

      //     })
      //   if(this.verCode == false){
      //     return false
      //   }else{
      //      return true
      //   }
      //   }
      // },
      changEvent(){
        if(this.agree==false){
          this.flag=true
        }else if(this.agree==true){
          this.flag=!this.flag
        }
      },

      submitFrom() {
        if(this.validateEntName() == false) {
          return false
        }
        if(this.validatePhone() == false) {
          return false
        }
        if(this.validateUserName() == false) {
          return false
        }
        if(this.sms == false) {
          this.$message({
            showClose: true,
            message: '请先获取验证码',
            type: 'error'
          })
          return false
        }
        if(this.passWord ==''){
          if(this.validatePassWords() == false) {
            return false
          }
          if(this.validateVerifyPassWord() == false) {
            return false
          }
        }
        if( this.smsCode == ''){
          this.$message({
            showClose: true,
            message: '验证码（必填项）',
            type: 'error'
          })
          return false
        } else{
          this.$http.get(process.env.API_HOST+'v1.4/sms',{params:{
              'mobile':this.phone,'smsNo': this.smsNum,'smsCode': this.smsCode,'appId':this.appId
            }}).then(response =>{
            if (response.data.resultCode != 1 ) {
              this.verCode = false;
              if(this.sms == true){
                this.$message({
                  showClose: true,
                  message: response.data.resultMessage,
                  type: 'error'
                })
              }
            }else{
              this.verCode = true;
              this.vertifySuccess()
            }

          })

        }
      },
      vertifySuccess(){
        this.$http.post(process.env.API_HOST+'v1.4/tenant/register', {'interfaceCode': this.interfaceCode,'tenantName':this.EnterpriseName,'userName':this.userName,'mobile':this.phone,'password':md5(this.passWord),'appId':this.appId}, {emulateJSON: true}).then(function (res) {
          if (res.data.resultCode == '1') {
            this.$message({
              showClose: true,
              message: res.data.resultMessage,
              type: 'success'
            })
            sessionStorage.setItem('interfaceCode', this.interfaceCode)
            this.$router.push('/Pupload')
          } else if(res.data.resultCode == '2'){

            if(res.data.dataList[1].authAccountStatus == '0'){
              this.$message({
                showClose: true,
                message: res.data.resultMessage,
                type: 'error'
              })
              this.$router.push('/')
            }else if(res.data.dataList[1].authAccountStatus == '1'){
              var authStatus = res.data.dataList[0].authStatus //是否通过状态
              var auditSteps = res.data.dataList[0].auditSteps //个人认证步数
              var auditStatus = res.data.dataList[1].auditStatus   //企业通过状态
              var companySteps = res.data.dataList[1].auditSteps  //企业认证步骤
              sessionStorage.setItem('enterpriseName',res.data.dataList[1].companyName)
              if(authStatus == '1' && auditStatus == '2'){
                this.$message({
                  showClose: true,
                  message: '您已通过个人和企业注册！',
                  type: 'success'
                })
                this.$router.push('/')
              } else if(authStatus != '1' && auditSteps == '1'){
                if(authStatus == '0'){
                  sessionStorage.setItem('userCode',res.data.dataList[0].userCode)
                  sessionStorage.setItem('interfaceCode',res.data.dataList[1].interfaceCode)
                  this.$router.push('/Pupload')
                }else{
                  sessionStorage.setItem('userCode',res.data.dataList[0].userCode)
                  sessionStorage.setItem('interfaceCode',res.data.dataList[1].interfaceCode)
                  this.$router.push('/ErrorPupload')
                }
              } else if(authStatus != '1' && auditSteps == '2'){
                this.$router.push('/PersonWait')
              }else if( auditStatus != '2' && companySteps == '1'){
                // sessionStorage.setItem('enterpriseName',res.data.dataList[1].companyName)
                sessionStorage.setItem('interfaceCode',res.data.dataList[1].interfaceCode)
                this.$router.push('/Enterprise')
              }else if( auditStatus != '2' && companySteps == '2'){
                sessionStorage.setItem('interfaceCode',res.data.dataList[1].interfaceCode)
                this.$router.push('/Payment')
              }else if( auditStatus != '2' && companySteps == '3'){
                sessionStorage.setItem('interfaceCode',res.data.dataList[1].interfaceCode)
                this.$router.push('/WaitReply')
              }
            }
          }else {
            this.$message({
              showClose: true,
              message: res.data.resultMessage,
              type: 'error'
            })
          }
        })
      }
    },
    created() {
      this.interfaceCode = GetQueryString("appId");
      sessionStorage.setItem('interfaceCode', this.interfaceCode);
      this.$http.get(process.env.API_HOST+'v1.4/tenant/'+this.interfaceCode+'/userIsExist').then(res =>{
        if (res.data.resultCode == '1') {
          this.$message({
            showClose: true,
            message: '您已拥有微签账号，无需重新设置密码',
            type: 'success'
          })
          sessionStorage.setItem('userCode',res.data.data.authorizerCode)
          sessionStorage.setItem('mobile', res.data.data.mobile)
          sessionStorage.setItem('enterpriseName', res.data.data.tenantName)
          this.disabled = true
          this.forbid = true
          this.EnterpriseName = res.data.data.tenantName
          this.userName = res.data.data.userName
          this.phone = res.data.data.mobile
          this.passWord = '******'
          this.verifyPassWord ='******'
          this.accountStatus = res.data.data.accountStatus;

          if(this.accountStatus =='1'){
            var dialog = document.getElementById('register-dialog');
            dialog.style.display='block';
            var that=this;
            var timer = null;
            timer = setInterval(function () {
              that.num--;
              if(that.num == 0){
                clearInterval(timer)
                that.$router.push('/')
              }
            }, 1000)

          }
          else if(this.accountStatus=='0'){

          }
          return false
        } else{
          this.$message({
            showClose: true,
            message: '您未拥有微签账号，需设置密码',
            type: 'success'
          })
          sessionStorage.setItem('userCode',res.data.data.authorizerCode)
          sessionStorage.setItem('mobile', res.data.data.mobile)
          sessionStorage.setItem('enterpriseName',res.data.data.tenantName)
          this.disabled = true
          this.EnterpriseName = res.data.data.tenantName
          this.userName = res.data.data.userName
          this.phone = res.data.data.mobile
        }
      })
    }
  }
</script>
<style scoped>
  @import "../../../../styles/Credentials/Enterprise/Register/Register.css";
  @import "../../../../common/styles/Topes.css";
  @import "../../../../common/styles/SigningSteps.css";

  #register-dialog{
    width:100%;
    height: 100%;
    background-color:rgba(0,0,0,0.5);
    position: absolute;
    z-index:1000;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
    display:none;
  }
  #register-dialog>.box{
    /*border: 1px solid #22a7ea;*/
    border-radius: 4px;
    width:200px;
    height: 200px;
    background: #f5f5f5;
    position: absolute;
    left:0;
    top:0;
    right: 0;
    bottom:0;
    margin: auto;
    padding: 30px;
  }
  #register-dialog>.box>.box-container{
    /*border: 1px solid #22a7ea;*/
    width:120px;
    height: 120px;
    background:url('../../../../../static/images/Credentials/Enterprise/Register/register-dialog.gif') no-repeat;
    background-size: 120px 120px;
    margin-left: 40px;

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


</style>
