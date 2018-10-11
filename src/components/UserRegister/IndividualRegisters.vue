<template>
	<div class="Login">
		<div class="layer" v-show="isShow">
			<div class="reminder" v-show="isShowSkip">
				<div class="reminder_img">
					<img src="../../../static/images/Credentials/Enterprise/Register/register-dialog.gif" alt="">
				</div>
				<div class="reminder_text">
					<span>您已完成注册，请使用账号密码进行登录即将跳转至登录页面&nbsp;&nbsp;</span>
					<span class="count_down">{{count}}</span>
				</div>
			</div>
			<div class="layer_content" v-show="isShowClose">
				<div class="layer_close">
					<span class="layer_close_left"></span>
					<span class="layer_close_right" @click="close()">X</span>
				</div>
				<div class="layer_character">
					<img src="../../../static/images/Credentials/Enterprise/Register/new-agreement.png" alt="">
				</div>
			</div>
		</div>
		<div class="login-nav">
			<div class="logo-zq"><img src="../../../static/images/Login/modification-logo.png" alt=""></div>
			<div class="logo-content">
				<span>已有账号，</span>
				<span @click="login()" class="simulation">
					<span class="register">立即登录</span>
					<img src="../../../static/images/Login/goback-right.png" alt="">
				</span>
			</div>
		</div>
		<div class="login-wrap">

			<div class="ms-login">
			<!-- <div class="water-qrurl-code" >
				<a :style="{backgroundImage: 'url(' + img + ')' }" class="sy_close"></a>
			</div> -->
				<div class='center'>
					<div class="login-body-left">
						<p style="font-size: 2.5rem;">电子合同+，用合约重构交易</p>
						<!-- <p style="font-size: 2.5rem;">更快，更安全的电子合同解决方案</p> -->
						<!-- <p style="margin-top: 15px;">众签应用互联网云技术，用最快的方式解决互联网在线签署及其司法效力等</p>
						<p>问题。使用众签让你的工作，生活更美好，更随意。</p> -->
					</div>
					<div class='user'>
					<h2 class='userInfo'>用户注册</h2>
					<el-form label-width="0px" :model="ruleForm" ref="ruleForm" :rules="rules">
						<el-form-item prop="username">
						<el-input v-model="ruleForm.username" placeholder="请输入手机号" :disabled="userDisabled" maxlength="11" class="login-input"></el-input><i class="icon-user"></i>
						</el-form-item>
						<el-form-item prop="code">
							<el-input v-model="ruleForm.code" maxlength="6" placeholder="请输入短信验证码" class="">
								<el-button slot="append" id="elButton" :disabled="isDisabled" @click="sendCode()">获取验证码</el-button>
							</el-input>
						</el-form-item>
						<el-form-item prop="password">
						<el-input type="password" v-model="ruleForm.password" :disabled="passwordDisabled" placeholder="请输入密码"></el-input><i class="icon-suo"></i>
						</el-form-item>
						<el-form-item prop="newPassword">
						<el-input type="password" v-model="ruleForm.newPassword" :disabled="passwordDisabled"  placeholder="请再次输入密码"></el-input><i class="icon-suo"></i>
						</el-form-item>
						<el-form-item>
						<el-checkbox v-model="checked" @change="iAgreen()" class="iagree">我同意</el-checkbox>
						<a href="javascript:void(0);" @click="protocol()" class="agreement">《微签注册使用协议》</a>
						</el-form-item>
						<div class="login-btn" @keyup.enter.native="submitForm('ruleForm')">
							<el-button type="primary"  @click="submitForm('ruleForm')" :disabled="isClick">注册</el-button>
						</div>
					</el-form>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
//import cookie from "@/common/js/getTenant";
//import Img from "../../../static/images/Login/qrcode.png";
import { validateMoblie, validatePassWord, validateSmsCode, } from "@/common/js/validate";
import md5 from "js-md5";
//import { mapActions, mapState } from "vuex";
import server from "@/api/url";
import {GetQueryString} from '@/common/js/InterceptUrl'
export default {
	name: "IndividualRegisters",
	data() {
		//校验手机号
		let checkName = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入手机号"));
			} else if (!validateMoblie(value)) {
				callback(new Error("手机号输入错误"));
			} else {
				callback()
			}
		};
		//校验验证码
		let checkCode = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入验证码"));
			}else if(!validateSmsCode(value)) {
				callback("验证码格式不正确");
			}
			else {
				callback();
			}
		};
		//校验密码
		let checkPassWord = (rule, value, callback) => {
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
		let checkNewPassWord = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入密码"));
			} else if(!validatePassWord(value)) {
				callback(new Error("密码格式不对"));
			} else if(value !== this.ruleForm.password){
				callback(new Error("两次输入密码不一致"));
			} else {
				callback();
			}
		};
		return {
			checked: false,
            interfaceCode: Math.random(),
            userDisabled:false,
            passwordDisabled:false,
			smsNo: '',
			smsCode: '',
			codeSure: false,
			iscode: false,
			isDisabled: false,
			isClick: true,
			isShow: false,
			isShowSkip: false,
			isShowClose: false,
			count: 3,
			ruleForm: {
				username: "",
				code: "",
				password: "",
				newPassword: "",
			},
			//表单验证
			rules: {
				username: [{ validator: checkName, trigger: "blur" }],
				code: [{ validator: checkCode, trigger: "blur" }],
				password: [{ validator: checkPassWord, trigger: "blur" }],
				newPassword: [{ validator: checkNewPassWord, trigger: "blur" }],
			},
		};
	},
	created(){
		//回车键登录
		var _this = this;
		document.onkeydown = function(e) {
			var key = window.event.keyCode;
			if (key == 13) {
				if(_this.isClick == false) {
					_this.submitForm('ruleForm');
				}
			}
        }
        // let getinterfaceCode =  GetQueryString("appId");
        // if(getinterfaceCode){
        //     this.interfaceCode = getinterfaceCode
        //     server.getUrlMobile(getinterfaceCode).then(res=>{
        //         if (res.data.resultCode == '1') {
        //             this.$message({
        //                 showClose: true,
        //                 message: '您已拥有微签账号，无需重新设置密码',
        //                 type: 'success'
        //             })
        //         }
        //         let molie = res.data.data.mobile;
        //         let psaaword = res.data.data.password;
        //         let params = {
        //             username: res.data.data.mobile
        //         };
        //         this.ruleForm.username = molie;
        //         server.verficate(params).then(res => {
        //              if (res.data === 0) {
        //                 this.userDisabled = true;
        //                 if(!psaaword){
        //                     this.ruleForm.password="test111111";
        //                     this.ruleForm.newPassword="test111111";
        //                     this.passwordDisabled = true;
        //                 }
        //                 callback();
        //             } else {
        //                 callback(new Error("此用户不存在"));
        //             }
        //         }).catch(error=>{

        //         })
        //     }).catch(error=>{

        //     })
        // }



	},
	methods: {
		//跳转到登录
		login() {
			this.$router.push('/');
		},

		iAgreen() {
			this.isClick = !this.isClick;
			return false;
		},
		//微签注册协议查看
		protocol() {
			this.isShow = true;
			this.isShowClose = true;
		},
		//关闭注册协议
		close() {
			this.isShow = false;
			this.isShowClose = false;
		},
		//点击获取验证码
		sendCode() {
			if(!this.ruleForm.username) {
				this.$message({
					showClose: true,
					message: "请输入手机号",
					type: 'error'
				});
				return false;
			} else if (!validateMoblie(this.ruleForm.username)){
				this.$message({
					showClose: true,
					message: "手机号输入错误",
					type: 'error'
				});
				return false;
			} else {
				//校验手机号是否存在
				server.verficate({'username': this.ruleForm.username}).then(res => {
					this.iscode = true;
					if (res.data == 0) {
                        this.$alert('此用户已存在您可直接去登录', '提示', {
                            confirmButtonText: '确定',
                        }).then(() => {
                            this.$router.push('/')
                        }).catch(() => {

                        });
					} else {
						this.codeSure = true;
						//倒计时
						let _this = this;
						this.isDisabled = true;
						let btnValue = document.getElementById("elButton");
						btnValue.innerText = 60 + '秒后获取';
						let i = 60;
						let timer = setInterval(function() {
							i--;
							btnValue.innerText = i + '秒后获取';
							if(i <= 0) {
								btnValue.innerText = "重新获取验证码";
								_this.isDisabled= false;
								clearInterval(timer);
							}
						}, 1000);
                        //获取验证码
                        let param={
                            mobile: this.ruleForm.username,
                            interfaceCode:this.interfaceCode
                        }
                        server.smsCode(param).then(res=>{
                            if(res.data.resultCode == 1) {
								this.smsNo = res.data.smsNo;
								this.appId= res.data.appId
							} else {
								this.$message({
									showClose: true,
									message: res.data.resultMessage,
									type: 'error'
								});
							}

                        }).catch(errot=>{

                        })


					}
				}).catch(error => {

				})
			}
		},
		//个人注册操作
		submitForm(formName) {
			//校验填写内容是否正确
			this.$refs[formName].validate((valid) => {
				if(valid) {
					if(this.codeSure) {
						//验证码是否正确
						this.$http.get(process.env.API_HOST + 'v1.4/sms', {
							params: {
								'mobile': this.ruleForm.username, 'smsNo': this.smsNo, 'smsCode': this.ruleForm.code, 'appId': this.appId
							}
						}).then(res => {
							if(res.body.resultCode == 1) {
								//个人注册提交
								server.individualRegister({
                                    'mobile': this.ruleForm.username,
                                    'password': md5(this.ruleForm.password),
                                    }).then( res=> {
									if(res.data.resultCode === '1') {
										this.isShow = true;
										this.isShowSkip = true;
										let _this = this;
										let setTimer = setInterval(function() {
											_this.count = _this.count - 1;
											if(_this.count <= 0) {
												clearInterval(setTimer);
												_this.$router.push('/')
											}
										}, 1000);
										//this.$router.push('/');
									} else {
											this.$message({
												showClose: true,
												message: res.data.resultMessage,
												type: 'error'
											});
										}
									}).catch(error => {
										this.$message({
											showClose: true,
											message: res.data.resultMessage,
											type: 'error'
										});
								});
							} else {
								this.$message({
									showClose: true,
									message: res.data.resultMessage,
									type: 'error'
								});
							}

						}).catch(error => {
							this.$message({
								showClose: true,
								message: res.data.resultMessage,
								type: 'error'
							});
						})
					} else {
						this.$message({
							showClose: true,
							message: "请先获取验证码",
							type: 'error'
						});
					}
				} else {
					return false
				}
			});
		}
	}
}
</script>

<style lang="scss" scoped>
	@import "../../../static/icon/iconfont.css";
	.el-input-group__append button.el-button, .el-input-group__append div.el-select .el-input__inner, .el-input-group__append div.el-select:hover .el-input__inner, .el-input-group__prepend button.el-button, .el-input-group__prepend div.el-select .el-input__inner, .el-input-group__prepend div.el-select:hover .el-input__inner{
		background-color: #4091fb;
		color: #ffffff;
	}
	.el-button--primary {
		background-color: #4091fb;
	}
	.user .el-form .el-form-item {
		margin-bottom: 1.4rem;
	}
	.agreement {
		color: #4091fb;
	}

	.Login {
	width: 100%;
	}
	.layer {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		position: fixed;
		z-index: 100;
		top: 0;
	}
	.reminder {
		background-color: #ffffff;
		position: absolute;
		top: 30%;
		left: 0;
		bottom: 0;
		right: 0;
		width: 200px;
		height: 200px;
		margin: 0 auto;
		border-radius: 5px;
		padding: 30px;
	}
	.reminder_img {
		width: 120px;
		height: 120px;
		margin: 0 auto;
	}
	.reminder_img img {
		width: 120px;
	}
	.reminder_text {
		text-align: center;
		padding-top: 20px;
		font-size: 12px;
		color: rgb(34, 167, 234);
		line-height: 20px;
	}
	.count_down {
		color: red;
	}
	.layer_content {
		width: 40%;
		background-color: #ffffff;
		position: relative;
		top: 5%;
		left: 30%;
		height: 90%;
	}

	.layer_close {
		height: 30px;
		color: #bbbbbb;
		line-height: 30px;
	}
	.layer_close_right {
		float: right;
		width: 3%;
		cursor: pointer;
	}
	.layer_character {
		overflow-y: auto;
		height: 100%;
		background-color: #fff;
	}
	.layer_character img {
		width: 100%;
	}

	.select-btn {
		background-color: #fff;
		color: #666;
	}
	.select-btn:hover {
	border: 2px solid #44caf7;
	color: #4091fb;
	}
	.login-wrap {
	width: 100%;
    height: 40rem;
    overflow:hidden;
    background: url('../../../static/images/Login/new-login.png') no-repeat;
    background-size: 100% 100%;
	}
	.center {
	// width: 77.5rem;
	// height: 34rem;
	// background:url('../../../static/images/Login/try.png') no-repeat;
	// position: absolute;
	// background-size: 100%;
	// top: 315px;
	// left: 266px;

		width: 75rem;
		height: auto;
		margin: 0 auto;
		border-radius: 10px;
		position: relative;
	}
	.userInfo {
	color: #333333;
	text-align: center;
	font-size: 1.5rem;
	}

	.user {
	    width: 24.5rem;
		position: absolute;
		background: #fff;
		padding: 1.875rem;
		border-radius: 15px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		position: absolute;
		right: 0;
		top: 3.75rem;
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
	margin-top: 30px;
	}
	.login-btn {
	text-align: center;
	}
	.login-btn button {
	width: 100%;
	height: 40px;
	margin-top: -0.625em;
	}
	#submit {
	color: #4091fb;
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
.login-body-left{
    position: absolute;
    left: 0;
    top: 6.875rem;
    color: #fff;
}
.simulation {
  cursor: pointer;
}
</style>
