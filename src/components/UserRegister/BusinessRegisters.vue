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
							<el-input v-model="ruleForm.companyname" style="width: 330px;"></el-input>
						</el-form-item>
						<el-form-item label="被授权人手机号" prop="mobile">
							<el-input v-model="ruleForm.mobile" style="width: 330px;"></el-input>
						</el-form-item>
						<el-form-item label="姓名" prop="username">
							<el-input v-model="ruleForm.username" style="width: 330px;"></el-input>
						</el-form-item>
						<el-form-item label="验证码" prop="code">
							<el-input style="width: 330px;" v-model="ruleForm.code" placeholder="请输入短信验证码" class="">
								<el-button id="elButton" slot="append" style="style: background-color: #16a8f2; color: #fffffff; width: 140px;" @click="getCode()" ref="code">获取验证码</el-button>
							</el-input>
						</el-form-item>
						<el-form-item label="请输入密码" prop="password">
							<el-input v-model="ruleForm.password" type="password" style="width: 330px;"></el-input>
						</el-form-item>
						<el-form-item label="再次确认密码" prop="newpassword">
							<el-input v-model="ruleForm.newpassword" type="password" style="width: 330px;"></el-input>
						</el-form-item>
						<el-form-item>
							<el-checkbox v-model="checked" class="iagree">我同意</el-checkbox>
							<a href="#" class="agreement">《微签注册使用协议》</a>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<div class="submit">
				<el-button type="primary" class="reg_button" style="width: 200px;">注册</el-button>
			</div>
		</section>
	</div>
</template>

<script>
	import { validateMoblie, validatePassWord } from "@/common/js/validate";
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
				ruleForm: {
					companyname: '',
					mobile: '',
					username: '',
					code: '',
					password: '',
					newpassword: ''
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
				getCode() {
					let btnValue = document.getElementById("elButton");
					btnValue.innerText = 60;
					let i = 60;
					let timer = setInterval(function() {
						i--;
						btnValue.innerText = i;
						if(i <= 0) {
							btnValue.innerText = "重新获取验证码";
							clearInterval(timer)
						}
					}, 1000)
				}
			}
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