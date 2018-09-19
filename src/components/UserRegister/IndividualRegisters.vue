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
			<el-form label-width="0px" :model="ruleForm" :rules="rules">
			  <el-form-item prop="username">
				<el-input v-model="ruleForm.username" placeholder="请输入手机号" class="login-input" ></el-input><i class="icon-user"></i>
			  </el-form-item>
			   <el-form-item prop="code">
				   <el-input v-model="ruleForm.code" placeholder="请输入短信验证码" class="">
						<el-button slot="append">获取验证码</el-button>
					</el-input>
			  </el-form-item>
			  <el-form-item prop="password">
				<el-input type="password" v-model="ruleForm.password" placeholder="请输入密码"></el-input><i class="icon-suo"></i>
			  </el-form-item>
			  <el-form-item prop="newPassword">
				<el-input type="password" v-model="ruleForm.newPassword" placeholder="请再次输入密码"></el-input><i class="icon-suo"></i>
			  </el-form-item>
			  <el-form-item>
				 <el-checkbox v-model="checked" class="iagree">我同意</el-checkbox>
				 <a href="#" class="agreement">《微签注册使用协议》</a>
			  </el-form-item>
			  <div class="login-btn">
				<el-button type="primary">注册</el-button>
			  </div>
			  <p style="font-size:12px;color:#999;padding-top: 15px;">
				  <a href="javascript:void(0)" id='submit'>,立即登录</a>
				  <a href="javascript:void(0)" class="account">已有账号</a>
				</p>
			</el-form>
		  </div>
		</div>
	  </div>
	</div>

  </div>
</template>

<script>
import cookie from "@/common/js/getTenant";
import Img from "../../../static/images/Login/qrcode.png";
import { validateMoblie, validatePassWord } from "@/common/js/validate";
import md5 from "js-md5";
import { mapActions, mapState } from "vuex";
import server from "@/api/url";
export default {
name: "",
data() {
    var checkName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!validateMoblie(value)) {
        callback(new Error("手机号输入错误"));
      } else {

	  }
	};
	var checkCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
		callback();
	  }
	};
	var checkPassWord = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value.length < 8 || value.length > 16) {
          callback(new Error('密码长度必须为8-16位'))
        } else if (!validatePassWord(value)){
          callback(new Error('密码格式为数字+字母'))
        }else {
          callback();
        }
      }
    var validateChildPassWord = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if(!validatePassWord(value)) {
        callback(new Error("密码格式不对"));
      } else {
		 callback(); 
	  }
	};
	let checkNewPassWord = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if(!validatePassWord(value)) {
        callback(new Error("密码格式不对"));
      } else if(!value !== this.ruleForm.pass){
		 callback(new Error("两次输入密码不一致")); 
	  } else {
		  callback();
	  }
	};
    return {
	checked: false,
      ruleForm: {
		username: "",
		code: "",
        password: ""
      },
      rules: {
        username: [{ validator: checkName, trigger: "blur" }],
		code: [{ validator: checkCode, trigger: "blur" }],
		password: [{ validator: checkPassWord, trigger: "blur" }],
		newPassword: [{ validator: checkNewPassWord, trigger: "blur" }],
      },
      img: Img,
      tenantNum: [],
      selectedEnterprise: null,
      radio: 0
    };
  },
}
</script>

<style lang="scss" scoped>
  @import "../../../static/icon/iconfont.css";
  .el-input-group__append button.el-button, .el-input-group__append div.el-select .el-input__inner, .el-input-group__append div.el-select:hover .el-input__inner, .el-input-group__prepend button.el-button, .el-input-group__prepend div.el-select .el-input__inner, .el-input-group__prepend div.el-select:hover .el-input__inner{
	  background-color: #16a8f2;
	  color: #ffffff;
  }
  .agreement {
	  color: #16a8f2;
  }
  
  .Login {
	width: 100%;
	height: 350px;
  }
  .select-btn {
	background-color: #fff;
	color: #666;
  }
  .select-btn:hover {
	border: 2px solid #44caf7;
	color: #22a7ea;
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
	background: url("/static/images/Login/userRegister.png") no-repeat;
	position: absolute;
	background-size: 100%;
	top: 50%;
	left: 50%;
	margin-left: -39rem;
	margin-top: -10rem;
  }
  .userInfo {
	color: #16a8f2;

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
	top: 3rem;
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
.account {
	float: right;
	color: #666666;
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
