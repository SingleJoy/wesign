<template>
  <div class="Login">
    <div class="layer" v-show="isShow">
      <div class="reminder" v-show="isShowSkip">
        <div class="reminder_img">
          <img src="/static/images/Credentials/Enterprise/Register/register-dialog.gif" alt="">
        </div>
        <div class="reminder_text">
          <span>{{successText}}&nbsp;&nbsp;</span>
          <span class="count_down">{{count}}</span>
        </div>
      </div>

      <div class="layer_content" v-show="isShowClose">
        <div class="layer_close">
          <span class="layer_close_left"></span>
          <span class="layer_close_right" @click="close()">X</span>
        </div>
        <div class="layer_character">
          <img src="/static/images/Credentials/Enterprise/Register/new-agreement.png" alt="">
        </div>
      </div>
      <div class="layer_content" v-show="CDNisShowClose">
        <div class="layer_close">
          <span class="layer_close_left"></span>
          <span class="layer_close_right" @click="close()">X</span>
        </div>
        <div class="layer_character">
          <img src="/static/images/Credentials/Enterprise/Register/CDN-agreement.jpg" alt="">
        </div>
      </div>
      <div class="layer_content" v-show="CouldisShowClose">
        <div class="layer_close">
          <span class="layer_close_left"></span>
          <span class="layer_close_right" @click="close()">X</span>
        </div>
        <div class="layer_character">
          <img src="/static/images/Credentials/Enterprise/Register/Could-agreement.jpg" alt="">
        </div>
      </div>
    </div>

    <div class="login-nav">
      <div class="logo-zq"><img src="/static/images/Login/modification-logo.png" alt=""></div>
      <div class="logo-content">
        <span>已有账号，</span>
        <span @click="login()" class="simulation">
					<span class="register">立即登录</span>
					<img src="/static/images/Login/goback-right.png" alt="">
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
            <!-- <p style="font-size: 2.5rem;">更快，更安全的电子合同解决方案</p>
						<p style="margin-top: 15px;">众签应用互联网云技术，用最快的方式解决互联网在线签署及其司法效力等</p>
						<p>问题。使用众签让你的工作，生活更美好，更随意。</p> -->
          </div>
          <div class='user' ref="slide" >
            <h2 class='userInfo'>用户注册</h2>
            <el-form label-width="0px" :model="ruleForm" ref="ruleForm" :rules="rules">
              <el-form-item prop="username">
                <el-input v-model="ruleForm.username" placeholder="请输入手机号" @change="resetSlide($event)" :disabled="userDisabled" :maxlength="11" class="login-input"></el-input><i class="icon-user"></i>
              </el-form-item>
              <el-form-item>
                <div class="slide_box" onselectstart="return false;"  @mouseover="slideSuccess && mouseoverFn($event)" @mouseout="!ismouseUp && mouseoutFn($event)">
                  <div class="imgBox" v-if="slideShow">
                    <img class="verImg" :src="'../../../static/images/'+number+'.png'" alt="">
                    <div class="verify" :style="verifyStyle" ref="verify"></div>
                    <div class="verified" :style="verifiedStyle"></div>
                    <span class="refresh" @click="changeImg">切换</span>
                  </div>
                  <div class="handle" ref="handle" :disabled="!slideSuccess">
                    <span class="bg" :style="bgStyle"></span>
                    <span class="swiper" ref="swiper" onselectstart="return false;" :style="swiperStyle" @mousedown="slideSuccess&&mousedownFn($event)">{{slideStatue}}</span>
                    <span class="slide_text">{{slideText}}</span>
                  </div>
                </div>
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
              <el-form-item style="margin-bottom: 5px;" class="agree-style">
                <el-checkbox v-model="checked" @change="iAgreen" class="iagree" style="margin-right: 0;">我同意</el-checkbox>
                <a href="javascript:void(0);" @click="protocol" class="agreement">《微签注册使用协议》</a>
                <a href="javascript:void(0);" @click="CDNprotocol" class="agreement">《SLA》</a>
                <a href="javascript:void(0);" @click="Couldprotocol" class="agreement">《云平台协议》</a>
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
  import { validateMoblie, validatePassWord, validateSmsCode } from "@/common/js/validate";

  import md5 from "js-md5";
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
        ismouseUp:false,
        slideSuccess:true,
        verY:'',     //top值
        verX:'',      //
        number:'00',
        verifyStyle:{},
        verifiedStyle:{},
        swiperStyle:{},
        bgStyle:{},
        slideText:'向右拖动滑块拼图验证',
        slideShow:false,
        slideStatue:'>>',
        token:'',
        checked: false,
        interfaceCode:'',
        userDisabled:false,
        passwordDisabled:false,
        smsNo: '',
        smsCode: '',
        codeSure: false,
        iscode: false,
        isDisabled: true,
        isClick: true,
        isShow: false,
        isShowSkip: false,
        successText:'您已完成注册，请使用账号密码进行登录，即将跳转至登录页面',
        isShowClose:false,
        CDNisShowClose:false,
        CouldisShowClose:false,
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
      let getinterfaceCode =  GetQueryString("appId");
      if(getinterfaceCode){
        this.interfaceCode = getinterfaceCode;
        server.getUrlMobile(getinterfaceCode).then(res=>{
          if(res.data.resultCode == 0){
            this.ruleForm.username = res.data.data.mobile;
            this.userDisabled = true;
          }else if(res.data.resultCode==1){
            this.isShow = true;
            this.isShowSkip = true;
            this.successText = '您已完成注册，请使用账号密码进行登录，即将跳转至登录页面'
            let _this = this;
            let setTimer = setInterval(function() {
              _this.count = _this.count - 1;

              if(_this.count <= 0) {
                clearInterval(setTimer);
                _this.$router.push('/')
              }
            }, 1000);

          }else if(res.data.resultCode==2){
            this.isShow = true;
            this.isShowSkip = true;
            this.successText = '您已完成注册，请使用账号密码进行企业绑定，即将跳转至企业绑定页面'
            let _this = this;
            let setTimer = setInterval(function() {
              _this.count = _this.count - 1;

              if(_this.count <= 0) {
                clearInterval(setTimer);
                _this.$router.push('/Bind?appId='+getinterfaceCode)
              }
            }, 1000);
          }


        }).catch(error=>{

        })
      }

    },

    mounted(){
      var imgIndex = Math.round(Math.random() * 2);
      this.number = imgIndex+''+imgIndex;
      var imgH = 200;
      // 随机生成坐标（图片框固定宽度为300px，高度不定）
      this.verX = 100 * (2 + Math.random())-40, //小于290保证
        this.verY = imgH / 4 + Math.random() * imgH / 2;
      this.verifyStyle={
        display:'block',
        top:this.verY+'px',
        'backgroundPosition':-this.verX+'px'+' '+-this.verY+'px',
        'backgroundImage':'url(static/images/'+this.number+'.png)'
      }
      this.verifiedStyle={
        display: 'block',
        left: this.verX+'px',
        top: this.verY+'px'
      }
    },
    methods: {

      mouseoverFn(e){

        this.slideShow=true
      },
      mouseoutFn(e){
        this.slideShow=false
      },
      mousedownFn(e){
        e=window.event||e;
        if(document.all){        //只有ie识别
          e.cancelBubble=true;
        }else{
          e.stopPropagation();
        }
        this.ismouseUp = true;
        this.slideShow=true
        var disX = e.clientX - document.getElementsByClassName('swiper')[0].getBoundingClientRect().left,    //鼠标位置距离当前元素位置
          disY = e.clientY - document.getElementsByClassName('swiper')[0].getBoundingClientRect().top,
          curX = e.clientX;        //鼠标当前位置
        this.swiperStyle={
          background:'#4391fb',
          color:'#fff'
        }
        let that = this;
        var l,maxWin;
        var sildeMove = that.$refs.slide;   //暂存slide节点 删除move事件
        that.$refs.slide.onmousemove = function(e){
          e=window.event||e;
          if(document.all){        //只有ie识别
            e.cancelBubble=true;
          }else{
            e.stopPropagation();
          };
          l = e.clientX - disX - that.$refs.handle.getBoundingClientRect().left;  //移动距离
          maxWin = that.$refs.handle.getBoundingClientRect().width-41;//最大滑动距离
          // console.log(l,maxWin,that.$refs.handle.getBoundingClientRect().width)
          if(l < 0){
            l = 0
          }else if(l>maxWin){
            l = maxWin;
            sildeMove.onmousemove = null;
            that.slideFaild(l);
          };
          that.swiperStyle={
            background:'#4391fb',
            color:'#fff',
            left:l+'px',
          };
          that.verifyStyle={
            display:'block',
            top:that.verY+'px',
            'backgroundPosition':-that.verX+'px'+' '+-that.verY+'px',
            left:l + 2+'px',
            'backgroundImage':'url(static/images/'+that.number+'.png)'
          };
          that.bgStyle={
            width:l+'px'
          }
          that.slideText='';
        };
        that.$refs.slide.onmouseup = function(e){
          sildeMove.onmousemove = null;
          sildeMove.onmouseup = null;
          that.slideShow=false
          that.ismouseUp = true;
          if(Math.abs(l-that.verX) < 4){
            if(!that.ruleForm.username) {//成功但未输入手机号
              that.$message({
                showClose: true,
                message: "请输入手机号",
                type: 'error'
              });
              that.slideSuccessNoName(l);
              return false;
            } else if (!validateMoblie(that.ruleForm.username)){
              that.$message({
                showClose: true,
                message: "手机号输入错误",
                type: 'error'
              });
              that.slideSuccessNoName(l);
              return false;

            } else {               //滑动成功
              that.getToken();
              that.bgStyle = {
                width:l+'px',
                background:'#d2f4ef'
              }
              that.swiperStyle={
                background:'#52ccba',
                color:'#fff',
                left:l+'px',
              }

              that.slideSuccess = false;
              that.slideText='>>';
              that.slideShow=false;
              that.ismouseUp = false;
            }
            that.isDisabled = false;
          }else{                         //滑动失败
            that.slideFaild(l);
          }
        }
      },

      //切换图片
      changeImg(){
        var imgIndex = Math.round(Math.random() * 2);
        this.number = imgIndex+''+imgIndex;
        this.verifyStyle={
          display:'block',
          top:this.verY+'px',
          'backgroundPosition':-this.verX+'px'+' '+-this.verY+'px',
          'backgroundImage':'url(static/images/'+this.number+'.png)'
        }

      },
      //滑动成功后修改手机号
      resetSlide(){
        let that =this;
        if(!that.slideSuccess){
          setTimeout(function(){
            that.bgStyle = {
              width:0,
              background:'#5997ec'
            }
            that.swiperStyle={
              background:'#fff',
              left:0,
              color:'#adaaaa'
            }
            that.isDisabled = true;
            that.slideStatue = '>>';
            that.slideShow=false;
            that.slideSuccess = true;
            that.slideText="向右拖动滑块拼图验证"
          },500)
        }

      },
      //滑动成功但未输入手机号或手机号输入格式不正确
      slideSuccessNoName(l){
        let that = this;
        that.bgStyle = {
          width:l+'px',
          background:'#d2f4ef'
        }

        that.swiperStyle={
          background:'#52ccba',
          color:'#fff',
          left:l+'px',
        }
        that.slideShow=false;
        setTimeout(function(){
          that.bgStyle = {
            width:0+'px',
            background:'#fff'
          }
          that.swiperStyle={
            background:'#fff',
            color:'#adaaaa',
            left:0+'px',
          }
          that.ismouseUp = false;
          that.changeImg();
          that.slideText="向右拖动滑块拼图验证"
        },500)
      },

      //slide滑动失败
      slideFaild(l){
        let that = this;
        that.bgStyle = {
          width:l+'px',
          background:'#ff5c57'
        }
        that.swiperStyle={
          background:'#ce2b26',
          color:'#fff',
          left:l+'px',
        }
        that.slideStatue = 'X';
        that.isDisabled = true;
        that.slideShow=false;
        setTimeout(function(){
          that.bgStyle = {
            width:0,
            background:'#5997ec'
          }
          that.swiperStyle={
            background:'#fff',
            left:0,
            color:'#adaaaa'
          }
          that.changeImg();
          that.slideStatue = '>>';
          that.slideShow=false;
          that.slideText="向右拖动滑块拼图验证";
          that.ismouseUp = false;
        },500)
      },
      //跳转到登录
      login() {
        this.$router.push('/');
      },
      //获取token
      getToken(){
        let param={
          // tel:this.ruleForm.username
        }
        server.getImgToken(param).then(res=>{
          this.token  = res.data.data;
        }).catch(error=>{

        })
      },
      iAgreen() {
       this.isClick =!this.isClick;
        return false;
      },
      CDNprotocol(){
        this.isShow = true;
        this.CDNisShowClose=true;

      },
      Couldprotocol(){
        this.isShow = true;
        this.CouldisShowClose=true;

      },
      //微签注册协议查看
      protocol() {
        this.isShow = true;
        this.isShowClose = true;
      },
      //关闭注册协议
      close() {
        this.isShow = false;
        this.CDNisShowClose=false;
        this.CouldisShowClose=false;
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
          server.verficate({
            'username': this.ruleForm.username
          }).then(res => {
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
                  _this.isDisabled= true;    //再次获取时需要重新获取图形验证的token
                  _this.resetSlide();
                  clearInterval(timer);
                }
              }, 1000);
              //获取验证码
              let param={
                mobile: this.ruleForm.username,
                interfaceCode:Math.random(),
                token:(md5(md5(this.token))).substring(0,6)
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

              }).catch(error=>{

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
              let param={
                'mobile': this.ruleForm.username,
                'smsNo': this.smsNo,
                'smsCode': this.ruleForm.code,
                'appId': this.appId
              }
              server.valiteSmsCode(param).then(res => {
                if(res.data.resultCode == 1) {
                  //个人注册提交
                  server.individualRegister({
                    'mobile': this.ruleForm.username,
                    'password': md5(this.ruleForm.password),
                    'interfaceCode':this.interfaceCode
                  }).then( res=> {
                    if(res.data.resultCode === '1') {
                      this.isShow = true;
                      this.isShowSkip = true;
                      this.successText = '您已完成注册，请使用账号密码进行登录，即将跳转至登录页面'
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
  @import "../../common/styles/slideBar.scss";
  .el-input-group__append button.el-button, .el-input-group__append div.el-select .el-input__inner, .el-input-group__append div.el-select:hover .el-input__inner, .el-input-group__prepend button.el-button, .el-input-group__prepend div.el-select .el-input__inner, .el-input-group__prepend div.el-select:hover .el-input__inner{
    background-color: #4091fb;
    color: #fff;
  }
  .el-button--primary {
    background-color: #4091fb;
  }
  .user .el-form .el-form-item {
    margin-bottom: 1.4rem;
  }
  .agreement {
    color: #4091fb;
    font-size: 12px;
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
    background-color: #fff;
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
    background-color: #fff;
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
    background: url('/static/images/Login/new-login.png') no-repeat;
    background-size: 100% 100%;
  }
  .center {
    width: 75rem;
    height: auto;
    margin: 0 auto;
    border-radius: 10px;
    position: relative;
  }
  .userInfo {
    color: #333;
    text-align: center;
    font-size: 1.5rem;
  }
  .user {
    width: 384px;
    position: absolute;
    background: #fff;
    padding: 1.875rem;
    border-radius: 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    right: 0;
    top: 4.5rem;
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
    margin-top: 15px;
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
    background: url("/static/images/Login/context.png") no-repeat;
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
<style>
  .agree-style .el-form-item__content{
    line-height: 25px;
  }
  .agree-style .el-checkbox__label{
    font-size: 12px;
  }
</style>
