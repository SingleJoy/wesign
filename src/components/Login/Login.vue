/*
* @Author: wangjia
* @Date: 2018-06-06 17:38:37
* @Last Modified by: wangjia
* @Last Modified time: 2018-06-27 18:44:05
*/
<template>
  <div class="Login">
    <div class="login-wrap">
      <div class="ms-login">
        <!-- <div class="water-qrurl-code" >
          <a :style="{backgroundImage: 'url(' + img + ')' }" class="sy_close"></a>
        </div> -->
        <div class='center'>
          <div class='user'>
            <h2 class='userInfo'>用户登录</h2>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
              <el-form-item prop="username">
                <el-input v-model="ruleForm.username" placeholder="请输入手机号" class="login-input" :maxlength="11"></el-input><i class="icon-user"></i>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password"  @keyup.enter.native="submitForm('ruleForm')" :maxlength="16"></el-input><i class="icon-suo"></i>
              </el-form-item>
              <div class="login-btn">
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
              </div>
              <p style="font-size:12px;color:#999;padding-top: 15px;"><a id='submit' href="javascript:void(0)" @click="forgetPassWord">忘记密码?</a></p>
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
        server
          .verficate(params)
          .then(res => {
            if (res.data === 0) {
              callback();
            } else {
              callback(new Error("此用户不存在"));
            }
          })
          .catch(error => {});
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
						})
						.then(response => {
							var stateCode = response.data.bindTenantNum; //绑定企业个数 一个的话直接跳首页
							var enterpriseName = response.data.dataList[0][0].enterpriseName;
							var mobile = response.data.dataList[0][0].mobile;
                            let accountCode = response.data.dataList[0][0].accountCode;
                            let accountLevel = response.data.dataList[0][0].accountLevel;
                            let accountStatus = response.data.dataList[0][0].accountStatus;
                            let authorizerCode = response.data.dataList[0][0].authorizerCode;
                            let userCode = response.data.dataList[0][0].userCode;
                                sessionStorage.setItem("enterpriseName", enterpriseName);
                                sessionStorage.setItem('accountCode',accountCode);
                                sessionStorage.setItem('accountLevel',accountLevel);
                                sessionStorage.setItem('authorizerCode',authorizerCode);
                                sessionStorage.setItem(' userCode', userCode);

							let param={
								mobile:this.ruleForm.username,
								// accountCode:accountCode?accountCode:''
							};
							let urlParam =  response.data.dataList[0][0].interfaceCode;
							if (stateCode == "1") {
                                if(accountStatus==2){
                                    this.$router.push('/ActivateChildAccount');
                                }else{
                                    server.login(param,urlParam).then(res => {
                                        if (res.data.dataList[1].isBusiness == "0") {
                                            // 不是众签商户
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
                                            cookie.set("tenant", res.data.dataList); // 存入cookie 所需信息
                                            this.$store.dispatch("tabIndex", { tabIndex: 0 }); //导航高亮
                                            this.$router.push("/Home");
                                        }
                                    }).catch(error => {

                                    });
                                }

							} else {
								sessionStorage.setItem("companyList",JSON.stringify(response.data.dataList)); //角色列表
								this.$router.push("/Role");
							}
						});
					} else {
						this.$message({
							showClose: true,
							message: "账户或密码错误",
							type: "error"
						});
					}
				});
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
        .get(
          process.env.API_HOST +
            "v1.4/tenant/" +
            this.selectedEnterprise.interfaceCode +
            "/homePage",
          {
            params: {
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
    sessionStorage.removeItem("type");
    sessionStorage.removeItem("contractNo");
    sessionStorage.removeItem("enterpriseName");
    sessionStorage.removeItem("idcard");
    sessionStorage.removeItem("interfaceCode");
    sessionStorage.removeItem("mobile");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("userCode");
    sessionStorage.removeItem("accountCode");
    sessionStorage.removeItem("accountLevel");
    sessionStorage.removeItem("authorizerCode");
    sessionStorage.removeItem("companyList");
    cookie.remove('tenant')

    document.documentElement.style.fontSize = document.documentElement.clientWidth / 120 + "px";
    window.onresize = function temp() {
      document.documentElement.style.fontSize =
        document.documentElement.clientWidth / 120 + "px";
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../../static/icon/iconfont.css";
.Login {
  width: 100%;
  height: 350px;
  .select-btn {
    background-color: #fff;
    color: #666;
  }
  .select-btn:hover {
    border: 2px solid #44caf7;
    color: #22a7ea;
  }
}
.login-wrap {
  width: 100%;

  background: #f4f2f2;
}
.center {
  // width: 77.5rem;
  // height: 34rem;
  // background:url('../../../static/images/Login/try.png') no-repeat;
  // position: absolute;
  // background-size: 100%;
  // top: 315px;
  // left: 266px;

  width: 77.5rem;
  height: 34rem;
  background: url("/static/images/Login/try.png") no-repeat;
  position: absolute;
  background-size: 100%;
  top: 50%;
  left: 50%;
  margin-left: -39rem;
  margin-top: -10rem;
}
.userInfo {
  color: #16a8f2;
  font-size: 36px;
  text-align: center;
  font-size: 2.25rem;
}

.user {
  // width: 328px;
  // height: 310px;
  // position: absolute;
  // right: 10%;
  // top: 130px;

  width: 21rem;
  height: 28rem;
  position: absolute;
  right: 10%;
  top: 8rem;
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
/* .ms-login{
      position: absolute;
      left:50%;
      top:50%;
      width:300px;
      height:240px;
      margin:-150px 0 0 -190px;
      padding:40px;
      border-radius: 5px;

  } */
.login-input {
  margin-top: 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
}
#submit {
  color: #22a7ea;
  float: right;
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
</style>
