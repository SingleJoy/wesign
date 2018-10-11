<template>
	<div class="BusinessRegisters">
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
				<div class="layer_close" @click="close()">
					<span class="layer_close_left"></span>
					<span class="layer_close_rigth">X</span>
				</div>
				<div class="layer_character">
					<img src="../../../static/images/Credentials/Enterprise/Register/agreement.jpg" alt="">
				</div>
			</div>
		</div>
		<div class="Topes">
			<nav class='nav'>
				<p class='logo'>
				<img src="../../../static/images/logo2.png" alt="">
				</p>
			</nav>
		</div>
		<section class="contain">
			<div class="image_register">
				<img src="../../../static/images/Common/title.png" alt="">
				<div class="register">注&nbsp;&nbsp;&nbsp;&nbsp;册</div>
			</div>
			<div class="shadow">
				<div class="content">
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="300px" class="demo-ruleForm">
						<el-form-item label="企业名称" prop="tenantName">
							<el-input :disabled="forbid" placeholder="请输入企业名称" v-model="ruleForm.tenantName" style="width: 330px;"></el-input>
						</el-form-item>
						<el-form-item label="被授权人手机号" prop="mobile">
							<el-input :disabled="forbid" maxlength="11" placeholder="请输入手机号" v-model="ruleForm.mobile" style="width: 330px;"></el-input>
						</el-form-item>
						<el-form-item label="姓名" prop="userName">
							<el-input :disabled="forbid" placeholder="请输入姓名" v-model="ruleForm.userName" style="width: 330px;"></el-input>
						</el-form-item>
						<el-form-item label="验证码" prop="code">
							<el-input style="width: 330px;" value="157347" maxlength="6" v-model="ruleForm.code" placeholder="请输入短信验证码" class="">
								<el-button id="elButton" slot="append"  type="primary" style="width: 140px;" @click="sendCode()" ref="code">获取验证码</el-button>
							</el-input>
						</el-form-item>
						<el-form-item label="请输入密码" prop="password">
							<el-input :disabled="isPassword" placeholder="请输入密码"  v-model="ruleForm.password" type="password" style="width: 330px;"></el-input>
						</el-form-item>
						<el-form-item label="再次确认密码" prop="newpassword">
							<el-input placeholder="请再次输入密码" :disabled="isPassword" v-model="ruleForm.newpassword" type="password" style="width: 330px;"></el-input>
						</el-form-item>
						<el-form-item>
							<el-checkbox v-model="checked" @change="iAgreen()" class="iagree">我同意</el-checkbox>
							<a href="javascript:;" class="agreement" @click="protocol()">《微签用户使用协议》</a>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<div class="submit">
				<el-button :disabled="isClick" type="primary" class="reg_button" style="width: 200px;"  @click="submitForm('ruleForm')">注册</el-button>
			</div>
		</section>
	</div>
</template>

<script>
	import { validateMoblie, validatePassWord, validateSmsCode } from "@/common/js/validate";
	import {GetQueryString} from '@/common/js/InterceptUrl';
	import md5 from "js-md5";
	import server from "@/api/url";
	export default {
		name: "BusinessRegisters",
		data() {
			//校验公司名称
			let checkCompany = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('公司名称不能为空'));
				} else {
					callback();
				}
			};
			//校验手机号
			let checkMobile= (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请输入手机号"));
				} else if (!validateMoblie(value)) {
					callback(new Error("手机号输入错误"));
				} else {
					callback();
				}
			}
			//校验用户名
			let checkUsername = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('姓名不能为空'));
				} else {
					callback();
				}
			};
			//校验二维码
			let checkCode = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请输入验证码"));
				} else if(!validateSmsCode(value)){
					callback("验证码格式不正确");
				} else {
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
			//校验密码
			let validateChildPassWord = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请输入密码"));
				} else if(!validatePassWord(value)) {
					callback(new Error("密码格式不对"));
				} else {
					callback();
				}
			};
			//校验密码
			let checkNewPass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
                hasAccount:false,//是否有微签账号
				checked: false,
				num: '',
				smsNo: '',
				smsCode: '',
				appId: '',
				forbid: false,
				isDisabled: false,
				isClick: true,
				isShow: false,
				isPassword: false,
				isShowSkip: false,
				isShowClose: false,
				EnterpriseName: '',
				userName: '',
				accountStatus: '',
				interfaceCode: '',
				count: 3,
				ruleForm: {
					tenantName: '',
					mobile: '',
					userName: '',
					code: '',
					password: '',
					newpassword: '',
				},
				//验证规则
				rules: {
					tenantName: [
						{required: true, validator: checkCompany, trigger: 'blur' }
					],
					mobile: [
						{required: true, validator: checkMobile, trigger: 'blur' }
					],
					username: [
						{required: true, validator: checkUsername, trigger: 'blur' }
					],
					code: [
						{required: true, validator: checkCode, trigger: 'blur' }
					],
					password: [
						{required: true, validator: checkPassWord, trigger: 'blur' }
					],
					newpassword: [
						{required: true, validator: checkNewPass, trigger: 'blur' }
					]
				}
			};
		},
		methods: {
			//提交注册信息
			submitForm(formName) {
                if(this.hasAccount){
                     this.sendInfo()
                }else{
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            //验证码是否有效
                            this.sendInfo()
                        } else {
                            return false;
                        }
                    });
                }

            },

            sendInfo(){
                this.$http.get(process.env.API_HOST + 'v1.4/sms', {
                    params: {
                        'mobile': this.ruleForm.mobile, 'smsNo': this.smsNo, 'smsCode': this.ruleForm.code, 'appId': this.appId
                    }
                }).then(res => {
                    if(res.body.resultCode == 1) {
                        //验证码有效提交注册信息
                        this.compangSave();
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
                        message: 'res.data.resultMessage',
                        type: 'error'
                    });
                })
            },
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			//发送验证码
			sendCode() {
				if(!this.ruleForm.mobile) {
					this.$message({
						showClose: true,
						message: "请输入手机号",
						type: 'error'
					});
					return false;
				} else if (!validateMoblie(this.ruleForm.mobile)){
					this.$message({
						showClose: true,
						message: "手机号输入错误",
						type: 'error'
					});
					return false;
				} else {
					//验证码倒计时
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
					this.num = Math.random()
					//校验手机号是否存在
					server.verficate({'username': this.ruleForm.mobile}).then(res => {
						if (res.data != 0) {
							//console.log('已存在');
						} else {
							//获取验证码
							this.$http.post(process.env.API_HOST+'v1.4/sms/sendCode', {'mobile': this.ruleForm.mobile,'interfaceCode': this.num}, {emulateJSON: true}).then(function (res) {
								console.log(res);
								if(res.body.resultCode == 1) {
									this.smsNo = res.body.smsNo;
									this.appId= res.body.appId
								} else {
									this.$message({
										showClose: true,
										message: res.body.resultMessage,
										type: 'error'
									});
								}
							});

						}
					}).catch(error => {

					})
				}
			},
			compangSave() {
				//商户提交信息
				var params = {
					'interfaceCode': this.interfaceCode,
					'tenantName': this.ruleForm.tenantName,
					'userName':this.ruleForm.username,
					'mobile':this.ruleForm.mobile,
					'password':md5(this.ruleForm.newpassword),
					'appId':this.appId
				};
				//企业商户注册提交
				server.companyRegister(params,{emulateJSON: true})
				.then(res => {
					if (res.data.resultCode == '1') {
						this.$message({
							showClose: true,
							message: res.data.resultMessage,
							type: 'success'
						})
						sessionStorage.setItem('interfaceCode', this.interfaceCode);
						this.$router.push('/EnterpriseCertificate');
                    }else if(res.data.resultCode == '2'){
                         this.$message({
							showClose: true,
							message: '企业已被绑定,请去登录',
							type: 'success'
                        })
                        this.$router.push('/')

                    }else{
                        this.$message({
							showClose: true,
							message: res.data.resultMessage,
							type: 'error'
						})
                    }

				})
			},
			//同意注册协议
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
			}
		},
		created() {
			this.interfaceCode = GetQueryString("appId");
			sessionStorage.setItem('interfaceCode', this.interfaceCode);
			//获取企业信息
			server.getCompanyRegister(this.interfaceCode,{emulateJSON: true}).then(res => {
				if (res.data.resultCode == '1') {
					this.$message({
						showClose: true,
						message: '您已拥有微签账号，无需重新设置密码',
						type: 'success'
                    })
                    this.hasAccount = true;
					sessionStorage.setItem('userCode',res.data.data.authorizerCode);
					sessionStorage.setItem('mobile', res.data.data.mobile);
					sessionStorage.setItem('enterpriseName', res.data.data.tenantName);
					this.forbid = true;
					this.isPassword = true;
					this.ruleForm.tenantName = res.data.data.tenantName;
					this.ruleForm.userName = res.data.data.userName;
					this.ruleForm.mobile = res.data.data.mobile;
					this.ruleForm.password = '********';
					this.ruleForm.newpassword ='********';
                    this.accountStatus = res.data.data.accountStatus;
					if(this.accountStatus =='1'){
						this.isShow = true;
						this.isShowSkip = true;
						let _this = this;
						var setTimer = setInterval(function() {
							_this.count = _this.count - 1;
							if(_this.count <= 0) {
								clearInterval(setTimer);
								_this.$router.push('/')
							}
						}, 1000);
					} else if(this.accountStatus=='0'){

					}
					return false
				} else{
					this.$message({
						showClose: true,
						message: '您未拥有微签账号，需设置密码',
						type: 'success'
                    });
                    this.forbid = true;
                    this.isPassword = false;
                    this.hasAccount = false;
					sessionStorage.setItem('userCode',res.data.data.authorizerCode);
					sessionStorage.setItem('mobile', res.data.data.mobile);
					sessionStorage.setItem('enterpriseName',res.data.data.tenantName);
                    this.ruleForm.tenantName = res.data.data.tenantName;
					this.ruleForm.userName = res.data.data.userName;
					this.ruleForm.mobile = res.data.data.mobile;
                    this.ruleForm.forbid = false;
                    this.ruleForm.password = "" ;
					this.ruleForm.newpassword = "";
                }
			}).catch(error => {

			});
			//键盘注册
			var _this = this;
			document.onkeydown = function(e) {
				var key = window.event.keyCode;
				if (key == 13) {
					if(_this.isClick == false) {
						_this.submitForm('ruleForm');
					}
				}
			}
		}
	}
</script>


<style lang="stylus" scoped>
@import "../../common/styles/Topes.css";
.BusinessRegisters
	.layer
		width 100%
		height 100%
		background-color rgba(0, 0, 0, 0.7)
		position fixed
		z-index 100
		.reminder
			background-color #ffffff;
			position absolute
			top 30%
			left 0
			bottom 0
			right 0
			width 200px
			height 200px
			margin 0 auto
			border-radius 5px
			padding 30px
			.reminder_img
				width 120px
				height 120px
				margin 0 auto
				img
					width 120px
			.reminder_text
				text-align center
				padding-top 20px
				font-size 12px
				color rgb(34, 167, 234)
				line-height 20px
				.count_down
					color red
		.layer_content
			width 40%
			background-color #ffffff
			position relative
			top 5%
			left: 30%
			height: 90%
			.layer_close
				height 30px
				color #bbbbbb
				line-height 30px
				cursor pointer
				.layer_close_left
					display inline-block
					width 97%
				.layer_close_right
					display inline-block
					width 3%
			.layer_character
				overflow auto
				height 100%
				img
					height auto;
	.contain
		width 1160px
		background-color #fff
		margin 20px auto
		padding 20px
		.image_register
			position relative
			color #ffffff
			.register
				position absolute
				top 10px
				left 35px
		.shadow
			width 844px
			height 596px
			margin 0 auto
			background-color #fafafa
			padding-top 20px
			margin-top 15px
			.content
				width 800px
				height 476px
				margin 0 auto
				background-color #ffffff
				padding-top 100px
				.agreement
					color #16a8f2
		.submit
			width 200px
			margin 20px auto

</style>
<style scoped>
.el-input-group__append button.el-button, .el-input-group__append div.el-select .el-input__inner, .el-input-group__append div.el-select:hover .el-input__inner, .el-input-group__prepend button.el-button, .el-input-group__prepend div.el-select .el-input__inner, .el-input-group__prepend div.el-select:hover .el-input__inner{
	background-color: #16a8f2;
	color: #ffffff;
}
</style>
