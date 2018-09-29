<template>
  <div class='Contract'>
    <LoginTop></LoginTop>
     <div class="Login">


    <div class="login-wrap">
      <div class="ms-login">
        <div class='center'>
          <div class='user'>
            <h2 class='userInfo'>用户登录</h2>
            <el-form  label-width="0px" :model="ruleForm" ref="ruleForm" :rules="rules">
                <el-form-item prop="username">
                    <el-input placeholder="请输入姓名" v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item prop="mobile">
                    <el-input v-model="ruleForm.mobile" maxlength="11" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input v-model="ruleForm.code" maxlength="6" placeholder="请输入短信验证码">
                        <el-button slot="append" id="elButton" :disabled="isDisabled" @click="sendCode()">获取验证码</el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="experience('ruleForm')">立即体验</el-button>
                </div>
                <div class="giveUp" @click="abandon()">放弃体验</div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
    <Bottom></Bottom>
  </div>
</template>
<script>
import LoginTop from '../common/components/LoginTop'
import Bottom from '../common/components/Bottom'
import server from "@/api/url";
import { validateMoblie, validateSmsCode} from "@/common/js/validate";
export default {
    name: 'Contract',
        components: {
        LoginTop,
        Bottom
    },
    data () {
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
            if (value === '') {
                return callback(new Error('姓名不能为空'));
            } else {
                callback();
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
        return {
            interfaceCode: Math.random(),
            smsNo: '',
            appId: '',
            isDisabled: false,
            ruleForm: {
                username: "",
                code: "",
                mobile: ""
            },
            //表单验证
            rules: {
                username: [{required: true, validator: checkUsername, trigger: "blur" }],
                mobile: [{required: true, validator: checkMobile, trigger: 'blur' }],
                code: [{required: true, validator: checkCode, trigger: "blur" }],
            },
        }
    },
    methods: {
        abandon() {
            this.$router.push('/');
        },
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
                    mobile: this.ruleForm.mobile,
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
        },
        experience(formName) {
            //校验填写内容是否正确
			this.$refs[formName].validate((valid) => {
				if(valid) {
					//验证码是否正确
					this.$http.get(process.env.API_HOST + 'v1.4/sms', {
						params: {
							'mobile': this.ruleForm.mobile, 'smsNo': this.smsNo, 'smsCode': this.ruleForm.code, 'appId': this.appId
						}
					}).then(res => {
                        if(res.data.resultCode == 1) {
                            this.$router.push('/DemoHome');
                        } else {
                            this.$message({
                                showClose: true,
                                message: '短信验证码输入错误',
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
					return false
				}
			});
        }
    }
}
</script>
<style lang="scss" scoped>
  @import "../../static/icon/iconfont.css";
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
    width: 77.5rem;
    height: 34rem;
    background: url("../../static/images/Login/try.png") no-repeat;
    position: absolute;
    background-size: 100%;
    top: 50%;
    left: 50%;
    margin-left: -39rem;
    margin-top: -10rem;
  }
  .userInfo {
    color: #409EFF;

    text-align: center;
    font-size: 2.25rem;
    margin-bottom: 1.5rem;
  }

  .user {
    width: 21rem;
    height: 28rem;
    position: absolute;
    right: 10%;
    top: 5rem;
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
    height: 36px;
  }
  .giveUp {
      font-size: 14px;
      margin-top: 15px;
      color: #409EFF;
      float: right;
      cursor: pointer;
  }
 .el-input-group__append button.el-button, .el-input-group__append div.el-select .el-input__inner, .el-input-group__append div.el-select:hover .el-input__inner, .el-input-group__prepend button.el-button, .el-input-group__prepend div.el-select .el-input__inner, .el-input-group__prepend div.el-select:hover .el-input__inner{
		background-color: #409EFF;
		color: #ffffff;
	}
</style>
