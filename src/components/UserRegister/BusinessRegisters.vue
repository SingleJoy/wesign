<template>
	<div class="BusinessRegisters">
		<div class="Topes">
			<nav class='nav'>
				<p class='logo'>
				<img src="../../../static/images/logo2.png" alt="">
				</p>
			</nav>
		</div>
		<section class="contain">
			<div class="image_register">
				<img src="../../../static/images/Login/title.png" alt="">
				<div class="register">注&nbsp;&nbsp;&nbsp;&nbsp;册</div>
			</div>
			<div class="shadow">
				<div class="content">
					<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="300px" class="demo-ruleForm">
						<el-form-item label="企业名称" prop="companyname">
							<el-input value="企业名称" :disabled=forbid v-model="ruleForm.companyname" style="width: 330px;"></el-input>
						</el-form-item>
						<el-form-item label="被授权人手机号" prop="mobile">
							<el-input maxlength="11" :disabled=forbid value="15734742257" v-model="ruleForm.mobile" style="width: 330px;"></el-input>
						</el-form-item>
						<el-form-item label="姓名" prop="username">
							<el-input value="姓名" v-model="ruleForm.username" style="width: 330px;"></el-input>
						</el-form-item>
						<el-form-item label="验证码" prop="code">
							<el-input style="width: 330px;" value="157347" maxlength="6" v-model="ruleForm.code" placeholder="请输入短信验证码" class="">
								<el-button id="elButton" slot="append" style="style: background-color: #16a8f2; color: #fffffff; width: 140px;" @click="sendCode()" ref="code">获取验证码</el-button>
							</el-input>
						</el-form-item>
						<el-form-item label="请输入密码" :disabled=forbid prop="password">
							<el-input value="asdasd123" v-model="ruleForm.password" type="password" style="width: 330px;"></el-input>
						</el-form-item>
						<el-form-item label="再次确认密码" :disabled=forbid prop="newpassword">
							<el-input value="asdasd123" v-model="ruleForm.newpassword" type="password" style="width: 330px;"></el-input>
						</el-form-item>
						<el-form-item>
							<el-checkbox v-model="checked" class="iagree">我同意</el-checkbox>
							<a href="#" class="agreement">《微签注册使用协议》</a>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<div class="submit">
				<el-button type="primary" class="reg_button" style="width: 200px;" @click="comRegister()">注册</el-button>
			</div>
		</section>
	</div>
</template>

<script>
	import { validateMoblie, validatePassWord, validateSmsCode } from "@/common/js/validate";
	import {GetQueryString} from '@/common/js/InterceptUrl';
	import Qs from 'qs'
	import md5 from "js-md5";
	import server from "@/api/url";
	export default {
		name: "BusinessRegisters",
		data() {
			var checkCompany = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('公司名称不能为空'));
				}
			};
			var checkMobile= (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请输入手机号"));
				} else if (!validateMoblie(value)) {
					callback(new Error("手机号输入错误"));
				} else {
					callback();
				}
			}
			var checkUsername = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('姓名不能为空'));
				}
			};
			var checkCode = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请输入验证码"));
				} else if(!validateSmsCode(value)){
					callback("验证码格式不正确");
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
			var checkNewPass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				checked: false,
				num: '',
				smsNo: '',
				smsCode: '',
				appId: '',
				forbid: false,
				ruleForm: {
					companyname: '众签',
					mobile: '15734742257',
					username: '杨波',
					code: '236521',
					password: 'asdasd123',
					newpassword: 'asdasd123',	
				},
				rules: {
					companyname: [
						{ validator: checkCompany, trigger: 'blur' }
					],
					mobile: [
						{ validator: checkMobile, trigger: 'blur' }
					],
					username: [
						{ validator: checkUsername, trigger: 'blur' }
					],
					code: [
						{ validator: checkCode, trigger: 'blur' }
					],
					password: [
						{ validator: checkPassWord, trigger: 'blur' }
					],
					newpassword: [
						{ validator: checkNewPass, trigger: 'blur' }
					]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
				if (valid) {
					alert('submit!');
				} else {
					console.log('error submit!!');
					return false;
				}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			comRegister() {
				//验证企业名称是否正确
				if (this.ruleForm.companyname === "") {
					this.$message({
						showClose: true,
						message: '请输入企业名称',
						type: 'error'
					});
					return false;
				};
				//验证姓名是否正确
				if (this.ruleForm.username === "") {
					this.$message({
						showClose: true,
						message: '请输入企业名称',
						type: 'error'
					});
					return false;
				};
				//验证被授权人手机号是否正确
				if (this.ruleForm.mobile === "") {
					this.$message({
						showClose: true,
						message: '请输入手机号',
						type: 'error'
					});
					return false;
				} else if (!validateMoblie(this.ruleForm.mobile)) {
					this.$message({
						showClose: true,
						message: '手机号输入错误',
						type: 'error'
					});
					return false;
				}
				//验证密码是否正确
				if (this.ruleForm.password === "") {
					this.$message({
						showClose: true,
						message: '请输入密码',
						type: 'error'
					});
					return false;
				} else if (this.ruleForm.password.length < 8 || this.ruleForm.password.length > 16) {
					this.$message({
						showClose: true,
						message: '密码长度必须为8-16位',
						type: 'error'
					});
					return false;
				} else if (!validatePassWord(this.ruleForm.password)){
					this.$message({
						showClose: true,
						message: '密码格式为数字+字母',
						type: 'error'
					});
					return false;
				}

				//验证码是否正确
				if (this.ruleForm.code === "") {
					this.$message({
						showClose: true,
						message: '请输入验证码',
						type: 'error'
					});
					return false;
				} else if(!validateSmsCode(this.ruleForm.code)){
					this.$message({
						showClose: true,
						message: '验证码格式不正确',
						type: 'error'
					});
					return false;
				} 
				//验证再次输入密码是否正确
				if (this.ruleForm.newPassword === "") {
					this.$message({
						showClose: true,
						message: '请输入密码',
						type: 'error'
					});
					return false;
				} else if(!this.ruleForm.newPassword !== this.ruleForm.pass){
					this.$message({
						showClose: true,
						message: '两次输入密码不一致',
						type: 'error'
					});
					return false;
				};
				//验证码是否有效
				this.$http.get(process.env.API_HOST + 'v1.4/sms', {
					params: {
						'mobile': this.ruleForm.mobile, 'smsNo': this.smsNo, 'smsCode': this.ruleForm.code, 'appId': this.appId
					}
				}).then(res => {
					if(res.body.resultCode == 1) {
						thiscompangSave();
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
						message: '111',
						type: 'error'
					});
				})
				
				
			},
			//发送验证码
			sendCode() {
				if(!this.ruleForm.mobile) {
					this.$message({
						showClose: true,
						message: "请输入手机号",
						type: 'error'
					});
					//return false;
				} else if (!validateMoblie(this.ruleForm.mobile)){
					this.$message({
						showClose: true,
						message: "手机号输入错误",
						type: 'error'
					});
					//return false;
				} else {
					let btnValue = document.getElementById("elButton");
					btnValue.innerText = 60;
					let i = 60;
					let timer = setInterval(function() {
						i--;
						btnValue.innerText = i + '秒后获取';
						if(i <= 0) {
							btnValue.innerText = "重新获取验证码";
							clearInterval(timer)
						}
					}, 1000);
					this.num = Math.random()
					//校验手机号是否存在
					server.verficate({'username': this.ruleForm.mobile}).then(res => {
						this.iscode = true;
						if (res.data === 0) {
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
					'tenantName': this.ruleForm.companyname,
					'userName':this.ruleForm.username,
					'mobile':this.ruleForm.mobile,
					'password':md5(this.ruleForm.newpassword),
					'appId':this.appId
				};
				//企业商户注册提交
				server.companyRegister(params,{emulateJSON: true})
				.then(res => {
					console.log(res)
					if (res.data.resultCode == '1') {
						this.$message({
						showClose: true,

						message: res.data.resultMessage,
						type: 'success'
						})
						sessionStorage.setItem('interfaceCode', this.interfaceCode);
						//this.$router.push('/Pupload');
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
		// created() {
		// 	this.interfaceCode = GetQueryString("appId");
		// 	sessionStorage.setItem('interfaceCode', this.interfaceCode);
		// 	server.getCompanyRegister(this.interfaceCode,{emulateJSON: true}).then(res => {
		// 		if (res.data.resultCode == '1') {
		// 		this.$message({
		// 			showClose: true,
		// 			message: '您已拥有微签账号，无需重新设置密码',
		// 			type: 'success'
		// 		})
		// 		sessionStorage.setItem('userCode',res.data.data.authorizerCode)
		// 		sessionStorage.setItem('mobile', res.data.data.mobile)
		// 		sessionStorage.setItem('enterpriseName', res.data.data.tenantName)
		// 		this.disabled = true
		// 		this.forbid = true
		// 		this.EnterpriseName = res.data.data.tenantName
		// 		this.userName = res.data.data.userName
		// 		this.phone = res.data.data.mobile
		// 		this.passWord = '******'
		// 		this.verifyPassWord ='******'
		// 		this.accountStatus = res.data.data.accountStatus;

		// 		if(this.accountStatus =='1'){
		// 			var dialog = document.getElementById('register-dialog');
		// 			dialog.style.display='block';
		// 			var that=this;
		// 			var timer = null;
		// 			timer = setInterval(function () {
		// 			that.num--;
		// 			if(that.num == 0){
		// 				clearInterval(timer)
		// 				that.$router.push('/')
		// 			}
		// 			}, 1000)

		// 		}
		// 		else if(this.accountStatus=='0'){

		// 		}
		// 		return false
		// 		} else{
		// 		this.$message({
		// 			showClose: true,
		// 			message: '您未拥有微签账号，需设置密码',
		// 			type: 'success'
		// 		})
		// 		sessionStorage.setItem('userCode',res.data.data.authorizerCode)
		// 		sessionStorage.setItem('mobile', res.data.data.mobile)
		// 		sessionStorage.setItem('enterpriseName',res.data.data.tenantName)
		// 		this.disabled = true
		// 		this.EnterpriseName = res.data.data.tenantName
		// 		this.userName = res.data.data.userName
		// 		this.phone = res.data.data.mobile
		// 		}
		// 	}).catch(error => {
				
		// 	})
		// }
	}
</script>


<style lang="stylus" scoped>
@import "../../common/styles/Topes.css";
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
		width 70px
		margin 20px auto
		
</style>
<style scoped>
.el-input-group__append button.el-button, .el-input-group__append div.el-select .el-input__inner, .el-input-group__append div.el-select:hover .el-input__inner, .el-input-group__prepend button.el-button, .el-input-group__prepend div.el-select .el-input__inner, .el-input-group__prepend div.el-select:hover .el-input__inner{
	background-color: #16a8f2;
	color: #ffffff;
}
</style>