/*
* @Author: wangjia
* @Date: 2018-06-06 17:38:37
* @Last Modified by: wangjia
* @Last Modified time: 2018-06-27 18:44:05
*/
<template>
  <div class="Login">
    <div class="login-nav">
		<div class="logo-zq"><img src="../../../static/images/Login/modification-logo.png" alt=""></div>
		<div class="logo-content">
			<span>还没账号？</span>
			<span class="register" @click="toRegister">立即注册</span>
			<img src="../../../static/images/Login/goback-right.png" alt="">
		</div>
	</div>
	<div class="user-login">
		<div>
			<div class="contain-login">
				<div class="login-body-left">
					<p style="font-size: 2.5rem;">更快，更安全的电子合同解决方案</p>
					<p style="margin-top: 15px;">众签应用互联网云技术，用最快的方式解决互联网在线签署及其司法效力等</p>
					<p>问题。使用众签让你的工作，生活更美好，更随意。</p>
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
								<el-input v-model="ruleForm.username" placeholder="请输入手机号" class="login-input" :maxlength="11"></el-input><i class="icon-user"></i>
							</el-form-item>
							<el-form-item prop="password" style="margin-bottom: 1.25rem;">
								<el-input type="password" placeholder="请输入密码" v-model="ruleForm.password"  @keyup.enter.native="submitForm('ruleForm')" :maxlength="16"></el-input><i class="icon-suo"></i>
							</el-form-item>
							<p style="font-size:12px;color:#999;margin-bottom: 1.375rem;">
								<a id='submit' href="javascript:void(0)" @click="forgetPassWord">忘记密码?</a>
							</p>
							<div class="login-btn">
								<el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
							</div>
							<!-- <div class="login-operate">
								<div class="register" @click="toRegister">
								<p></p>
								<span>立即注册</span>
								</div>
								<div class="experience" @click="toExperience">
								<p></p>
								<span>免费体验</span>
								</div>
							</div> -->

						</el-form>
						</div>
					</div>
					</div>
				</div>
				<div class="fade" id="fade"></div>
				<div class="succ-pop" id="succ-pop">
					<span class="login-cancel" @click="cancelLogin">+</span>
					<div class="su-pop">
					<h5 class="title">
						选择企业角色
					</h5>
					<div class="central_section" v-for="(item,index) in tenantNum" :key="index">
						<p>
						<el-radio v-model="radio" :label=index @change="variety(item)">{{item.enterpriseName}}</el-radio>
						</p>
					</div>
					</div>
					<el-button class="select-btn"  type="primary" round @click="changeClick">确&nbsp;&nbsp;定</el-button>
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
  export default {
    name: "Login",
    data() {
      var checkName = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入手机号"));
        } else if (!validateMoblie(value)) {
          callback(new Error("手机号输入错误"));
        } else {
          let params = {
            username: this.ruleForm.username
          };
            server.verficate(params).then(res => {
                if (res.data === 0) {
                    callback();
                } else {
                    callback(new Error("此用户不存在"));
                }
            }).catch(error => {});
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
        ruleForm: {
          username: "",
          password: ""
        },
        rules: {
          username: [{ validator: checkName, trigger: "blur" }],
          password: [{ validator: checkPassWord, trigger: "blur" }]
        },
        img: Img,
        tenantNum: [],
        selectedEnterprise: null,
        radio: 0
      };
    },
    methods: {
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
            this.$http
              .get(process.env.API_HOST + "v1/tenant/login", {
                params: {
                  username: this.ruleForm.username,
                  password: pass
                }
              })
              .then(response => {
                if (response.data.resultCode === "1") {
                  this.$http.get(process.env.API_HOST + "v1.4/user/bindEnterprises", {
                    params: {
                      mobile: this.ruleForm.username
                    }
                  }).then(response => {
                        var stateCode = response.data.bindTenantNum; //绑定企业个数 一个的话直接跳首页
                        let param={
                            mobile:this.ruleForm.username,
                        };
                        if (stateCode == "1") {
                            if(response.data.dataList[0].length>0){
                                var urlParam =  response.data.dataList[0][0].interfaceCode;
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
                            }else{
                                var urlParam =  response.data.dataList[1][0].interfaceCode;
                                var interfaceCode =  response.data.dataList[1][0].interfaceCode;
                                var enterpriseName = response.data.dataList[1][0].enterpriseName;
                                var mobile = response.data.dataList[1][0].mobile;
                                var accountCode = response.data.dataList[1][0].accountCode;
                                var accountLevel = response.data.dataList[1][0].accountLevel;
                                var accountStatus = response.data.dataList[1][0].accountStatus;
                                var authorizerCode = response.data.dataList[1][0].authorizerCode;
                                var auditStatus = response.data.dataList[1][0].auditStatus;
                                var mobile = response.data.dataList[1][0].mobile;
                                sessionStorage.setItem("enterpriseName", enterpriseName);
                                sessionStorage.setItem("interfaceCode", interfaceCode);
                                sessionStorage.setItem('accountCode',accountCode);
                                sessionStorage.setItem('accountLevel',accountLevel);
                                sessionStorage.setItem('authorizerCode',authorizerCode);
                                sessionStorage.setItem('mobile',mobile);
                                sessionStorage.setItem('auditStatus',auditStatus);
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
                                server.login(param,urlParam).then(res => {
                                        if (res.data.dataList[1].isBusiness == "0") {  //未付费
                                            // 不是众签商户
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
                                                // can.user = res.data.dataList;
                                            }

                                        } else {
                                            this.$message({
                                                showClose: true,
                                                duration: 1000,
                                                message: "登录成功",
                                                type: "success"
                                            });
                                            cookie.set("tenant", res.data.dataList);
                                            this.$store.dispatch("tabIndex", { tabIndex: 0 });
                                            this.$router.push("/Home");
                                            can.user = res.data.dataList;
                                        }


                                }).catch(error => {

                                });
                            }
                        }else {
                            sessionStorage.setItem("companyList",JSON.stringify(response.data.dataList)); //角色列表
                            this.$router.push("/Role");
                        }
                    }).catch(error => {

                    });
                } else {
                  this.$message({
                    showClose: true,
                    message: "账户或密码错误",
                    type: "error"
                  });
                }
              });
          }else{

          }
        });

      },

      forgetPassWord() {
        this.$router.push("/FoundUser");
      },
      variety(el) {
        this.selectedEnterprise = el;
      },
      cancelLogin() {
        document.getElementById("fade").style.display = "none";
        document.getElementById("succ-pop").style.display = "none";
      },
      changeClick() {
        if (this.selectedEnterprise == "" || this.selectedEnterprise == null) {
          this.selectedEnterprise = this.tenantNum[0];
        }
        this.$http
          .get(process.env.API_HOST + "v1.4/tenant/" + this.selectedEnterprise.interfaceCode + "/homePage",
            {params: {
                mobile: this.selectedEnterprise.mobile,
                interfaceCode: this.selectedEnterprise.interfaceCode
              }
            }
          )
          .then(res => {
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
          });
      }
    },
    mounted() {
      sessionStorage.clear();
      cookie.remove('tenant');

      document.documentElement.style.fontSize = document.documentElement.clientWidth / 120 + "px";
      window.onresize = function temp() {
        document.documentElement.style.fontSize =
          document.documentElement.clientWidth / 120 + "px";
      };
    }
  };
</script>

<style lang="scss" scoped>
//   @import "../../../static/icon/iconfont.css";
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
    font-weight: 500;
  }

  .user {
    width: 22.5rem;
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
  .experience>span{
    right: -6em;
    top:15px;
    color: #f95b5f;
    display: block;
    width: 60px;
  }
  .experience{
    position: absolute;
    margin-left: 10.9375em;
    margin-top: 20px;
  }
  .experience p{
    width: 51px;
    height: 51px;

    background: url("../../../static/images/Login/expercise.png")  no-repeat;
  }

  #submit {
    color: #4091fb;
  }
  .fade {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
    display: none;
  }
  /*弹出层*/
  .succ-pop {
    width: 500px;
    height: 400px;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -150px;
    z-index: 999;
    border-radius: 5px;
    background: url("../../../static/images/Login/context.png") no-repeat;
    display: none;
  .login-cancel {
    font-size: 24px;
    position: absolute;
    right: 11px;
    top: 10px;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 50%;
    transform: rotate(135deg);
    width: 28px;
    text-align: center;
    cursor: pointer;
  }
  }
  .su-pop {
    width: 420px;
    height: 240px;
    background: #fff;
    position: fixed;
    margin-top: 50px;
    margin-left: 40px;

    overflow-y: auto;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  .title {
    border: none;
  }
  }
  .succ-pop h5.title {
    text-align: left;
    font-size: 16px;
    color: #66ccff;
    margin-top: 20px;
    font-family: 幼圆;
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
    height: 40rem;
    overflow:hidden;
    background: url('../../../static/images/Login/new-login.png') no-repeat;
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
        color:#409EFF;
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
</style>
