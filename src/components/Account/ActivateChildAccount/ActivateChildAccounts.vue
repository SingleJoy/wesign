<template>
  <div>
    <div class="Tops">
      <nav class='nav'>
        <p class='logo'>
          <img src="/static/images/Top/v1.6-logo.png" alt="logo图">
        </p>
        <div class='buttons'>
          <el-button type="info" style='background:#ccc' @click="activeCancel" :disabled="clickOnce">取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</el-button>
          <div v-if="showActive" class="active-button">
            <a class="sure-active"  @click="sureActive" href="javascript:void(0)">确认激活</a>
          </div>
        </div>

      </nav>
    </div>
    <div class="ActivateChildAccounts">

      <div class="main" style="margin-top: 100px;">

        <div class="container">

          <div class="content">

            <div class="content-body">

              <p class="title">激活子账号</p>

              <div class="border-bottom"  ></div>

              <div class="active-account" style="margin-left: 0;">
                <div class="active-account-tips">
                  请您仔细阅读一下授权书内容，如确定无任何异议后，请您在确定身份认证后，签署提交
                </div>

                <div class="active-account-contract-img" style="margin-left: 225px">

                  <img :src="[authorizationImg]" id="activateImg">

                </div>

                <div class="scan-code" id="smCode">

                  <el-tooltip class="item" effect="dark" content="微信扫一扫" placement="top">
                    <img :src="[qrSignImg]" alt="微信扫一扫"  class="wechat-img" id="wechat-img" >


                  </el-tooltip>
                  <div class="wechat-scan-tips">
                    请用微信扫一扫上<br/>
                    方二维码完成签署
                  </div>

                </div>

                <el-dialog
                  :visible.sync="dialogAgreement"
                  width="400px"
                  center>
                  <div  class="send-code">为确保是您本人愿意签署，请点击获取验证码。<br/>
                    认证通过后，认证授权书即时生效</div>
                  <div style="color: #333;text-align: left;padding-bottom: 10px;font-weight: bold;">{{mobileShowFirst}}&nbsp;<sub >****</sub>&nbsp;{{mobileShowLast}}</div>
                  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">

                    <el-form-item prop="code">
                      <el-input type="text" placeholder="请输入短信验证码" class="forget-messageInput" v-model="ruleForm.smsCode" style="width: 200px;"></el-input>
                      <el-button type="primary" class="forget-messageButton" @click="sendCode" id="code" style="margin-left: 20px;">获取</el-button>
                    </el-form-item>

                    <div class="forget-btn">
                      <el-button type="primary" @click="submitForm('ruleForm')" style="width: 295px;" :disabled="once">提&nbsp;&nbsp;交</el-button>
                    </div>
                  </el-form>
                </el-dialog>
                <!--签署图片-->
                <div id="hidden" style="display:none">
                  <img :src="[contractSignImg]"  id="signImg" style="height:125px;width:125px">
                </div>
                <div id="signCanvas" style="display:none;position: absolute;top:550px;left: 390px">
                  <img :src="[canvasTest]"  id="signCanvasImg" style="height:63px;width:125px">
                </div>
              </div>

            </div>


          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import cookie from '@/common/js/getTenant'
  import {validateSmsCode} from '@/common/js/validate'
  import server from "@/api/url";
  import {SignAuthbook,getSignatureImg,getAuthBookImg,qRCode} from '@/api/account'
  export default {

    data() {
      // 校验验证码
      let validateCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value!== ''&&!validateSmsCode(value)) {
          callback(new Error('验证码密码长度是6位'))
        }
      };

      return {
        baseURL:this.baseURL.BASE_URL,
        showActive:false,
        dialogAgreement:false,  //验证码弹窗
        ruleForm: {
          smsCode: '',         //验证码
        },
        rules:{
          smsCode: [
            { required: true, validator: validateCode, trigger: 'blur' }
          ],
        },
        clickOnce:false,
        contractSignImg:'',
        // smsNoVer:'',  // 短信编码
        qrSignImg:'',
        smsCodeNum:0,
        smsNo:false,
        repeat:false,
        flag:false,
        once:false,
        authorizationImg:'',
        timer:null,
        canvasTest:'',
        interfaceCode:sessionStorage.getItem("interfaceCode"),
        mobile:sessionStorage.getItem("mobile"),
        smsCode:'',   //短信码
        smsNoVer:'',   //
        appId:'',  //验证码返回appId
        show:'',
        mobileShowFirst:'',
        mobileShowLast:'',
      }
    },
    // 组件销毁前清除定时器
    beforeDestroy() {
      clearInterval(this.timer);
      this.timer = null;
    },
    methods:{

      activeCancel(){
        this.$router.push("/")
      },
      sureActive(){
        if(this.canvasTest == null ||this.canvasTest == ''){
          this.$alert('你还未在移动端签署面板完成扫码签名','提示', {
            confirmButtonText: '确定'
          })
        }else{
          this.dialogAgreement=true
        }
      },

      //获取验证码
      sendCode(){
        if(this.repeat == false){
          this.repeat = true;
          let codeType = '0';
          let count = 60;
          let curCount = count;
          let timer = null;

          this.sms = true;
          let params={'mobile': this.mobile, 'sendType': codeType,'interfaceCode':this.interfaceCode};
          server.smsCodeOld(params).then(res=> {

            this.smsNoVer=res.data.smsNo   //短信编号
            this.appId=res.data.appId     //appId
            let resultCode = res.data.resultCode;
            let smsNo = res.data.smsNo;
            let smsCode = res.data.smsCode;
            let message = res.data.resultMessage;
            if (resultCode === '1') {
              this.smsNo = true;
              this.smsCodeNum +=1;
              if(this.smsCodeNum == 3){
                this.isDisabled = true
              } else{
                this.isDisabled = false
              }
              let codeInfo = document.getElementById('code')
              codeInfo.innerText =  curCount + '秒'
              this.smsNum = smsNo

              codeInfo.setAttribute('disabled', 'true')
              let that = this
              timer = setInterval(function () {
                codeInfo.innerText =  (curCount - 1) + '秒'
                if (curCount === 0) {
                  codeInfo.innerText = '获取'
                  clearInterval(timer)
                  codeInfo.removeAttribute('disabled')
                  that.repeat = false
                } else {
                  curCount--
                }
              }, 1000)
            }else{
              let that =this;
              that.smsNo = false
              that.repeat = false
              this.$alert(res.data.resultMessage,'提示', {
                confirmButtonText: '确定'
              })

            }
          }).catch(error=>{

          })
        }
      },

      contractCancel() {    //取消操作
        this.clickOnce=true;

        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, ' 确定将返回首页'),
            h('i', { style: 'color: teal' }, '')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              clearInterval(this.timer)
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done();
                if(cookie.getJSON('tenant')[1].isBusiness == '0'){
                  this.$store.dispatch('tabIndex',{tabIndex:0});  //导航高亮
                  this.$router.push('/Merchant');
                }else{
                  this.$store.dispatch('tabIndex',{tabIndex:0});  //导航高亮
                  this.$router.push('/Home');
                }
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 50);
              }, 100);
            } else {
              this.clickOnce=false;
              done();
            }
          }
        })
      },

      submitForm(formName){
        if(!this.repeat){
          this.$message({
            type: 'error',
            message: '请先获取短信验证码!'
          });
          return false
        }
        let accountCode = sessionStorage.getItem("accountCode");
        let authorizerCode = sessionStorage.getItem("authorizerCode");
        let signatureImg = this.canvasTest;
        this.$nextTick(()=> {
          this.$loading.show("正在提交数据，请等待...");
        });
        this.$refs[formName].validate((valid) => {
          let params={
            'mobile': this.mobile,
            'smsNo': this.smsNoVer,
            'smsCode': this.ruleForm.smsCode,
            'appId': this.appId
          };

          server.valiteSmsCode(params).then(res => {

            this.$nextTick(()=> {
              this.$loading.hide();
            });
            if (res.data.resultCode != 1) {
              this.$message({
                showClose: true,
                message: res.data.resultMessage,
                type: 'error'
              });
              this.flag=false;
            } else {
              this.$nextTick(()=> {
                this.$loading.show("数据提交成功，正在校验...");
              });
              let params={
                'authorizerCode': authorizerCode,
                'mobile': this.mobile,
                'smsNo': this.smsNoVer,
                'appId': this.appId,
                'smsCode': this.ruleForm.smsCode,
                'signatureImg': signatureImg,
                'accountCode': accountCode,
              };

              if(this.flag){
                return false
              }
              this.flag=true;
              SignAuthbook(params).then(res=> {

                this.$nextTick(()=> {
                  this.$loading.hide();
                });
                if(res.data.resultCode == '1'){
                  let param={
                    mobile:sessionStorage.getItem("mobile"),
                  };
                  let urlParam=sessionStorage.getItem("interfaceCode");
                  this.$nextTick(()=> {
                    this.$loading.show("激活成功，正在初始化数据，请等待...");
                  });
                  setTimeout(()=>{
                    this.flag=false;
                  },1500);

                  server.login(param,urlParam).then(res => {
                    cookie.set("tenant", res.data.dataList); // 存入cookie 所需信息
                    this.$store.dispatch("tabIndex", { tabIndex: 0 }); //导航高亮
                    this.$nextTick(()=> {
                      this.$loading.hide();
                    });
                    sessionStorage.setItem('accountStatus','1');
                    this.$router.push("/Home");
                  })
                }else {

                  this.$nextTick(()=>{
                    this.$loading.show("激活失败，请刷新页面重新激活...");
                    this.$router.push("/ActivateChildAccount");
                  });
                  this.fullscreenLoading = true;
                  setTimeout(() => {
                    this.fullscreenLoading = false;
                  }, 3000);

                }

              }).catch(error=>{

              })
            }
          }).catch(error=>{

          })
        })
      },
      pollingPanel(timer){ //轮询手写面板

        let accountCode = sessionStorage.getItem('accountCode');
        let authorizerCode = sessionStorage.getItem('authorizerCode');
        let t = Math.random();
        getSignatureImg(accountCode,authorizerCode,t).then(res=> {
          this.canvasTest =  res.data;

          if(this.canvasTest!= '') {
            let smCode = document.getElementById('smCode')
            smCode.style.display ='none';
            let  signCanvas= document.getElementById('signCanvas')
            signCanvas.style.display ='block';
            this.showActive = true;
          }
          setTimeout(() => {
            if(this.canvasTest!=''){
              clearInterval(this.timer)
            }
          },1000)
        }).catch(error=>{

        })

      }
    },
    created(){
      this.$loading.show();
      this.mobileShowFirst=this.mobile.substring(0,3);
      this.mobileShowLast=this.mobile.substring(7,11);

      let accountStatus=sessionStorage.getItem("accountStatus")
      if(accountStatus==1){
        this.$router('/Home');
      }
      let accountCode=sessionStorage.getItem("accountCode");
      let authorizerCode=sessionStorage.getItem("authorizerCode");
      //
      let  requestNo={'interfaceCode':this.interfaceCode,'accountCode':accountCode,'authorizerCode':authorizerCode};
      getAuthBookImg(requestNo).then(res=>{
        this.authorizationImg=res.data;
      }).catch(error=>{

      });

      let params={
        'contractNo':accountCode
      }
      qRCode(authorizerCode,params).then(res=> {
        this.qrSignImg=res.data;
      }).catch(error=>{

      });
      this.$loading.hide(); //隐藏
      let that = this
      let timer = null
      this.timer = setInterval(function () {
        that.pollingPanel(this.timer)
      }, 3000)

    },

  }
</script>
<style lang="stylus">
  @import "../../../styles/Account/ChildAccount.styl";
  .content-body>p.title{
    background: url("/static/images/Common/title.png") no-repeat;
  }
  .send-code{
    margin: 15px 0;
    font-size: 14px;
    color: #666;
  }
  .Tops{
    width: 100%;
    height: 80px;
    background:#4091fb;
    overflow:hidden;
  }
  .nav{
    width: 1200px;
    margin: 0 auto;
    height: 80px;
    overflow:hidden;
    position: relative;

  }
  .nav .logo{
    float: left;
    margin-right: 70px;
  }
  .nav .logo img{
    margin-top: 18px;
  }
  .nav ul{
    margin-left: 80px;
    line-height: 80px;
  }
  .nav ul li{
    float: left;
    // padding: 0 22px 0 22px;
  }

  .nav ul li a{
    color: #fff;
  }
  .nav .btns{
    margin-left: 5px;
    /* line-height: 80px; */
  }
  .nav .btns li{
    float: left;
    width: 90px;
    height: 44px;
  }
  .nav .btns li:nth-child(1){
    float: left;
    width: 90px;
    height: 44px;
    background: #fff;
    line-height: 44px;
    border-radius: 5px;
    text-align: center;
    margin-top: 17px;
    margin-right: 24px;
  }
  .nav .btns li:nth-child(2){
    float: left;
    width: 90px;
    height: 44px;
    background: #fff;
    line-height: 44px;
    border-radius: 5px;
    text-align: center;
    margin-top: 17px;
  }
  .nav .btns li:nth-child(1) a{
    color: #4091fb;
  }
  .nav .btns li:nth-child(2) a{
    color: #4091fb;
  }
  .nav .btns li:nth-child(3){
    width: 116px;
    float: left;
    line-height: 80px;
    margin-left: 30px;
    text-align: center;
  }
  .nav .btns li:nth-child(3) img{
    vertical-align:middle;
  }
  .nav .btns li:nth-child(3) a{
    color: #fff;
    font-size: 14px;
  }

  .nav .btns li:nth-child(4){
    float: left;
    line-height: 80px;
    margin-left: -6px;
    text-align: center;
  }
  .nav .btns li:nth-child(4) img{
    vertical-align:middle;
  }
  .nav .btns li:nth-child(4) a{
    color: #fff;
    font-size: 14px;
  }

  /* buttonsć ˇĺź */
  .buttons{
    position: absolute;
    right: 10px;
    top: 20px;
  }
  .active-button{
    float:right
  }
  .sure-active{
    display: block;
    width: 100px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background-color: #fff;
    font-size: 16px;
    color: #4091fb;
    border-radius: 5px;
    margin-left: 10px;
  }
</style>
<style scope>
  .wc-loading-wrapper{
    width: 180px!important;
  }
</style>
