
<template>
  <div class='Contract Demo'>
    <div class="login-nav">
      <div class="logo-zq"><img src="/static/images/Login/modification-logo.png" alt=""></div>
      <div class="logo-content simulation" @click="abandon()">
        <span class="register">放弃体验</span>
        <img src="/static/images/Login/goback-right.png" alt="">
      </div>
    </div>
    <div class="Login">
      <div class="login-wrap">
        <div class="ms-login">
          <div class='center-user'>
            <div class="login-body-left">
              <!-- <p style="font-size: 2.5rem;">更快，更安全的电子合同解决方案</p>
						<p style="margin-top: 15px;">众签应用互联网云技术，用最快的方式解决互联网在线签署及其司法效力等</p>
						<p>问题。使用众签让你的工作，生活更美好，更随意。</p> -->
              <p style="font-size: 2.5rem;">电子合同+，用合约重构交易</p>
            </div>
            <div class='user' ref="slide">
              <h2 class='userInfo'>体验登录</h2>
              <el-form  label-width="0px" :model="ruleForm" ref="ruleForm" :rules="rules">
                <el-form-item prop="username">
                  <el-input placeholder="请输入姓名" v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item prop="mobile">
                  <el-input v-model="ruleForm.mobile" maxlength="11" placeholder="请输入手机号"></el-input>
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
                  <el-input v-model="ruleForm.code" maxlength="6" placeholder="请输入短信验证码">
                    <el-button slot="append" id="elButton" :disabled="isDisabled" @click="sendCode()">获取验证码</el-button>
                  </el-input>
                </el-form-item>
                <div class="login-btn">
                  <el-button type="primary" @click="experience('ruleForm')">立即体验</el-button>
                </div>
                <!-- <div class="giveUp" @click="abandon()">放弃体验</div> -->
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <QRcode></QRcode>
    <Bottom></Bottom>
  </div>
</template>
<script>
  import QRcode from '../common/components/QRcode'
  import Bottom from '../common/components/Bottom'
  import server from "@/api/url";
  import certification from "@/api/certification";
  import md5 from "js-md5";
  import { validateMoblie, validateSmsCode} from "@/common/js/validate";
  export default {
    name: 'Contract',
    components: {
      QRcode,
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
        interfaceCode: Math.random(),
        smsNo: '',
        appId: '',
        isDisabled: true,
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
    mounted(){
      document.documentElement.style.fontSize = document.documentElement.clientWidth / 120 + "px";
      window.onresize = function temp() {
        document.documentElement.style.fontSize =
          document.documentElement.clientWidth / 120 + "px";
      };
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
            if(that.ruleForm.username==''){
              that.$message({
                showClose: true,
                message: "请输入姓名",
                type: 'error'
              });
              that.slideSuccessNoName(l);
              return false;
            }
            if(!that.ruleForm.mobile) {    //成功但未输入手机号
              that.$message({
                showClose: true,
                message: "请输入手机号",
                type: 'error'
              });
              that.slideSuccessNoName(l);
              return false;
            } else if (!validateMoblie(that.ruleForm.mobile)){
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

      getToken(){
        let param={
          // tel:this.ruleForm.username
        }
        server.getImgToken(param).then(res=>{
          this.token  = res.data.data;
        }).catch(error=>{

        })
      },
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
              _this.isDisabled= true;    //再次获取时需要重新获取图形验证的token
              _this.resetSlide();
              clearInterval(timer);
            }
          }, 1000);
          //获取验证码
          let param={
            mobile: this.ruleForm.mobile,
            interfaceCode:this.interfaceCode,
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
          }).catch(errot=>{

          })
        }
      },
      experience(formName) {
        //校验填写内容是否正确
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //验证码是否正确
            let params = {
              'mobile': this.ruleForm.mobile,
              'smsNo': this.smsNo,
              'smsCode': this.ruleForm.code,
              'appId': this.appId
            }

            certification.smsValite(params).then(res => {
              if (res.data.resultCode == 1) {
                this.$router.push('/DemoHome');
              }
              else {
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
          }
        })
      }

  }
  }
</script>
<style lang="scss" scoped>
  @import "../../static/icon/iconfont.css";
  @import "../common/styles/slideBar.scss";
  .el-button--primary {
    background-color: #4091fb;
  }
  .Login {
    width: 100%;
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
    height: 40rem;
    overflow:hidden;
    background: url('/static/images/Login/new-login.png') no-repeat;
    background-size: 100% 100%;
  }
  .center-user {
    width: 75rem;
    margin: 0 auto;
    position: relative;
  }
  .user-login{

  }
  .userInfo {
    color: #333333;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .user {
    position: absolute;
    right: 0;
    top: 8.75rem;
    background: #fff;
    padding: 1.875rem;
    border-radius: 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 360px;

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
  }
  .giveUp {
    font-size: 14px;
    margin-top: 15px;
    color: #4091fb;
    float: right;
    cursor: pointer;
  }
  .login-body-left{
    position: absolute;
    left: 0;
    top: 6.875rem;
    color: #fff;
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
  .el-input-group__append button.el-button, .el-input-group__append div.el-select .el-input__inner, .el-input-group__append div.el-select:hover .el-input__inner, .el-input-group__prepend button.el-button, .el-input-group__prepend div.el-select .el-input__inner, .el-input-group__prepend div.el-select:hover .el-input__inner{
    background-color: #4091fb;
    color: #ffffff;
  }
  .simulation {
    cursor: pointer;
  }
  .Demo .Login .imgBox{

  }
</style>
