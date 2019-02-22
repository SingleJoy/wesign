<template>
  <div class="Login">
    <div class="login-nav">
      <div class="logo-zq">
        <img src="/static/images/Login/modification-logo.png" alt="">
      </div>
      <div class="logo-content">
        <span>还没账号？</span>
        <span @click="toRegister" class="simulation">
        <span class="register">立即注册</span>
			    <img src="/static/images/Login/goback-right.png" alt="">
      </span>
      </div>
    </div>
    <div class="user-login">
      <div>
        <div class="contain-login">
          <div class="login-body-left">
            <p style="font-size: 2.5rem;">电子合同+，用合约重构交易</p>
            <!-- <p style="font-size: 2.5rem;">更快，更安全的电子合同解决方案</p>
					  <p style="margin-top: 15px;">众签应用互联网云技术，用最快的方式解决互联网在线签署及其司法效力等</p>
					  <p>问题。使用众签让你的工作，生活更美好，更随意。</p> -->
          </div>
          <div class="login-wrap">
            <div class="ms-login">
              <!-- <div class="water-qrurl-code" >
							<a :style="{backgroundImage: 'url(' + img + ')' }" class="sy_close"></a>
						</div> -->
              <div class='center-user'>
                <div class='user'>
                  <h2 class='userInfo'>用户登录</h2>
                  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px">
                    <el-form-item prop="username">
                      <el-input v-model="ruleForm.username" placeholder="请输入手机号" class="login-input" :maxlength="11" @focus="focus1"></el-input><i class="icon-user"></i>
                    </el-form-item>
                    <el-form-item prop="password" style="margin-bottom: 1.25rem;">
                      <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password"  @keyup.enter.native="submitForm('ruleForm')" :maxlength="16"></el-input><i class="icon-suo"></i>
                    </el-form-item>

                    <el-form-item  v-if="showGraphic">

                      <el-input :maxlength=4 placeholder="请输入验证码" class="messageInput"  v-model="graphic" @keyup.enter.native="submitForm('ruleForm')" style="width: 70%;"></el-input>

                      <img :src="base64"  @click="getVerifyCode('ruleForm')"  class="verifyCode">
                    </el-form-item>
                    <p style="font-size:12px;color:#999;margin-bottom: 1.375rem;">
                      <a class='submit' href="javascript:void(0)" @click="forgetPassWord">忘记密码?</a>
                      <a  class="experience submit" href="javascript:void(0)" @click="toExperience">免费体验</a>
                    </p>
                    <div class="login-btn">
                      <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    </div>

                  </el-form>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import cookie from "@/common/js/getTenant";
  import Img from "../../../static/images/Login/qrcode.png";
  import { validateMoblie } from "@/common/js/validate";
  import md5 from "js-md5";
  import { mapActions, mapState } from "vuex";
  import server from "@/api/url";
  import {login,bindEnterprises,homePage,phoneStatus,getVerifyCodeImg} from '@/api/login'
  export default {
    name: "Login",
    data() {
     var checkName = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入手机号"));
        } else if (!validateMoblie(value)) {
          callback(new Error("手机号输入错误"));
        } else {
         var params = {
            username: this.ruleForm.username
          };

          server.verficate(params).then(res => {
            if (res.data == 0) {
             //用户手机号数据库存在

              if(!this.showGraphic){
               var params={
                  phone:this.ruleForm.username
                }
                phoneStatus(params).then(res=>{

                  //用户手机号存在 校验是否请求验证码  1需要请求  0不需要 已经输入验证码的话不需要再请求
                  if(res.data.resultCode==1){
                    this.showGraphic=true;
                    this.$message({
                      showClose: true,
                      message: "对不起，您当天累计输错密码超过5次，需要填写验证码进行校验",
                      type: "error"
                    });
                    getVerifyCodeImg(this.ruleForm.username).then(res=>{
                      this.base64=res.data;
                    }).catch(error=>{

                    })
                  }else{

                  }
                }).catch(error=>{

                })
              }

              callback();
            } else {
              callback(new Error("此用户不存在"));
            }
          }).catch(error => {

          });
        }
      };
     var checkPassWord = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else {
          callback();
        }
      };
      return {
        baseURL:this.baseURL.BASE_URL,
        ruleForm: {
          username: "",
          password: "",
        },
        graphic:'',
        rules: {
          username: [{ validator: checkName, trigger: "blur" }],
          password: [{ validator: checkPassWord, trigger: "blur" }]
        },
        img: Img,
        tenantNum: [],
        selectedEnterprise: null,
        radio: 0,
        verifyCodeImg:'',   //图形验证码
        verfiedParam:'',
        showGraphic:false,
        t:'',
        base64:''
      };
    },

    methods: {
      focus1(){
        this.showGraphic=false;

      },
      toRegister(){
        this.$router.push('/Register')
      },
      toExperience(){
        this.$router.push('/DemoRegister')
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
           var pass = md5(this.ruleForm.password);
            if(this.showGraphic){

              if(!this.graphic){
                this.$message({
                  showClose: true,
                  message: "请输入验证码",
                  type: "error"
                });

              }else{
                this.verfiedParam={
                  username: this.ruleForm.username,
                  password: pass,
                  verifyCode:this.graphic
                }
              }
            }else {
              this.verfiedParam={
                username: this.ruleForm.username,
                password: pass,
              }
            }

            login(this.verfiedParam).then(res=>{
              if (res.data.resultCode === "1") {
                sessionStorage.setItem("mobile",this.ruleForm.username)
                this.Login();
              } else {
                this.$message({
                  showClose: true,
                  message: res.data.resultMessage,
                  type: "error"
                });

              }
            }).catch(error=>{

            })
          }else{

          }
        });

      },
      getVerifyCode(formName){
        this.$refs[formName].validate(valid => {
          if (valid){
            getVerifyCodeImg(this.ruleForm.username).then(res=>{
              this.base64=res.data;
            }).catch(error=>{

            })
          }else{

          }
        });

      },
      //登录
      Login(){
       var bindParams={
          mobile: this.ruleForm.username
        }
        bindEnterprises(bindParams).then(response=>{
         var stateCode = response.data.bindTenantNum; //绑定企业个数 一个的话直接跳首页

          var loginParam={
            mobile:this.ruleForm.username,
          };
          if (stateCode == "1") {
            if(response.data.dataList[0].length>0){
                var urlParam =  response.data.dataList[0][0].interfaceCode;
                var accountMoney =  response.data.dataList[0][0].accountMoney;
                var enterpriseName = response.data.dataList[0][0].enterpriseName;
                var mobile = response.data.dataList[0][0].mobile;
                var auditStatus = response.data.dataList[0][0].auditStatus;  //个人认证状态
                var accountCode = response.data.dataList[0][0].accountCode;
                var accountLevel = response.data.dataList[0][0].accountLevel;
                var accountStatus = response.data.dataList[0][0].accountStatus;  //企业认证状态
                sessionStorage.setItem("enterpriseName", enterpriseName);
                sessionStorage.setItem('accountCode',accountCode);
                sessionStorage.setItem('accountLevel',accountLevel);
                sessionStorage.setItem("interfaceCode", urlParam);
                sessionStorage.setItem('auditStatus',auditStatus);
                sessionStorage.setItem('mobile',mobile);
                sessionStorage.setItem('accountMoney',accountMoney);
            }else{
                var urlParam =  response.data.dataList[1][0].interfaceCode;
                var interfaceCode =  response.data.dataList[1][0].interfaceCode;
                var accountMoney =  response.data.dataList[1][0].accountMoney;
                var enterpriseName = response.data.dataList[1][0].enterpriseName;
                var mobile = response.data.dataList[1][0].mobile;
                var accountCode = response.data.dataList[1][0].accountCode;
                var accountLevel = response.data.dataList[1][0].accountLevel;
                var accountStatus = response.data.dataList[1][0].accountStatus;
                var authorizerCode = response.data.dataList[1][0].authorizerCode;
                var auditStatus = response.data.dataList[1][0].auditStatus;
                sessionStorage.setItem("enterpriseName", enterpriseName);
                sessionStorage.setItem("interfaceCode", interfaceCode);
                sessionStorage.setItem('accountCode',accountCode);
                sessionStorage.setItem('accountLevel',accountLevel);
                sessionStorage.setItem('authorizerCode',authorizerCode);
                sessionStorage.setItem('mobile',mobile);
                sessionStorage.setItem('auditStatus',auditStatus);
                sessionStorage.setItem('accountMoney',accountMoney);
                }
            if(accountStatus==2){
              this.$router.push('/ActivateChildAccount');
            }else if(accountStatus==6){
              this.$message({
                showClose: true,
                duration: 1000,
                message: "此账号已被冻结",
                type: "warning"
              });
            }else{

              server.login(loginParam,urlParam).then(res => {
                //先判断是否为实名用户，再根据isBusiness 判断是否有发起合同10次限制
                //判断是否为实名用户 auditSteps=3 已实名
                if(res.data.dataList[1].auditSteps!=3){
                  this.$message({
                    showClose: true,
                    duration: 1000,
                    message: "登录成功",
                    type: "success"
                  });
                  cookie.set("tenant", res.data.dataList); //存入cookie 所需信息
                  this.$store.dispatch("tabIndex", { tabIndex: 0 }); //导航高亮
                  this.$router.push("/Merchant");
                }else{
                  this.$message({
                    showClose: true,
                    duration: 1000,
                    message: "登录成功",
                    type: "success"
                  });
                  cookie.set("tenant", res.data.dataList);
                  this.$store.dispatch("tabIndex", { tabIndex: 0 });
                  this.$router.push("/Home");
                }
              }).catch(error => {

              });
            }
          }else {
            sessionStorage.setItem("companyList",JSON.stringify(response.data.dataList)); //角色列表
            this.$router.push("/Role");
          }
        }).catch(error=>{

        })
      },

      forgetPassWord() {
        this.$router.push("/FoundUser");
      },
      variety(el) {
        this.selectedEnterprise = el;
      },

      changeClick() {
        if (this.selectedEnterprise == "" || this.selectedEnterprise == null) {
          this.selectedEnterprise = this.tenantNum[0];
        }
       var param={
          mobile: this.selectedEnterprise.mobile,
          interfaceCode: this.selectedEnterprise.interfaceCode
        }
        homePage(param,this.selectedEnterprise.interfaceCode).then(res=>{
          if (res.data.dataList[1].isBusiness == "0") {
            this.$message({
              showClose: true,
              duration: 1000,
              message: "登录成功",
              type: "success"
            });
            cookie.set("tenant", res.data.dataList); //存入cookie 所需信息
            this.$store.dispatch("tabIndex", { tabIndex: 0 }); //导航高亮
            this.$router.push("/Merchant");
          } else {
            this.$message({
              showClose: true,
              duration: 1000,
              message: "登录成功",
              type: "success"
            });
            cookie.set("tenant", res.data.dataList); //存入cookie 所需信息
            this.$store.dispatch("tabIndex", { tabIndex: 0 }); //导航高亮
            this.$router.push("/Home");
          }
        }).catch(error=>{

        })
      }
    },
    mounted() {
      sessionStorage.clear();
      cookie.remove('tenant');
      document.documentElement.style.fontSize = document.documentElement.clientWidth / 120 + "px";
      window.onresize = function temp() {
        document.documentElement.style.fontSize =
          document.documentElement.clientWidth / 120 + "px"
      };
    }
  };
</script>

<style lang="scss" scoped>

  .el-button--primary{
    background-color: #4091fb;
  }
  .Login {
    width: 100%;
  // height: 350px;
  .select-btn {
    background-color: #fff;
    color: #666;
  }
  .select-btn:hover {
    border: 2px solid #44caf7;
    color: #4091fb;
  }
  }
  .login-wrap {
    width: 100%;

    background: #f4f2f2;
  }
  .userInfo {
    color: #333333;
    text-align: center;
    font-size: 1.5rem;
  }
  .verifyCode{
    float: right;
    margin-top: 7px;
  }

  .user {
  // width: 22.5rem;
    width: 350px;
    position: absolute;
    right: 0%;
    top: 8.75rem;
    background: #fff;
    padding: 1.875rem;
    border-radius: 15px;
    box-sizing: border-box;
  }
  .login-logo {
    width: 100px;
    height: 50px;
    margin-top: -10px;
    margin-left: 85px;
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
  .sy_close:hover {
    background-position: -1px -46px;
  }
  .icon-user {
    position: absolute;
    right: 20px;
    top: 32px;
  }
  .icon-suo {
    position: absolute;
    right: 20px;
  }

  .login-input {
    margin-top: 1.75rem;
  }
  .login-btn {
    text-align: center;
  }
  .login-btn button {
    width: 100%;
    height: 40px;
  }
  .login-operate {
    position: relative;
    height: 80px;
  }

  .experience {
    float: right;
  }

  .submit{
    color: #4091fb;
    display: inline-block;
  }

  .succ-pop h5.title {
    text-align: left;
    font-size: 16px;
    color: #66ccff;
    margin-top: 20px;
    margin-left: 30px;
  }
  .central_section {
    text-align: left;
    margin-top: 20px;
    margin-left: 30px;
  }
  .el-button.is-round {
    border-radius: 5px !important;
    padding: 12px 23px !important;
    width: 280px !important;
    height: 57px !important;
    position: fixed !important;
    margin-left: 110px !important;
    margin-top: 320px !important;
    font-size: 16px !important;
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
  // background-color: #000;
  // width: 30px;
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
  .user-login{
    width: 100%;
    height: 44rem;
    overflow:hidden;
    background: url('/static/images/Login/new-login.png') no-repeat;
    background-size: 100% 100%;
  }
  .contain-login {
    width: 75rem;
    margin: 0 auto;
    height: 40rem;
    position: relative;
  }
  .login-top{
    height: 70px;
    margin-right: 70px;
  }
  .login-top-right{
    float: right;
  .login-click-btn{
    color:#4091fb;
    cursor: pointer;
  }
  }
  .login-body-left{
    position: absolute;
    left: 0;
    top: 6.875rem;
    color: #fff;
  }
  input:-webkit-autofill {
    background-color: #FAFFBD;
    background-image: none;
    color: #000;
  }
  .user {
    position: absolute;
    right: 0;
    top: 8.75rem;
  }
  .simulation {
    cursor: pointer;
  }
</style>
