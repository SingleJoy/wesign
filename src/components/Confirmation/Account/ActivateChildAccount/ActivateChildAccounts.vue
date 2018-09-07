<template>
  <div class="ActivateChildAccounts" style="margin-top: 100px;">

    <div class="main" >

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
                  <!--<img src="../../../../../static/images/Default/default-scan-code.png" alt="微信扫一扫"  class="wechat-img" else>-->

                </el-tooltip>
                <div class="wechat-scan-tips">
                  请用微信扫一扫上<br/>
                  方二维码完成签署
                </div>


              </div>

              <div class="active-button">
                <!--<a class="sure-active"  @click="dialogAgreement = true" href="javascript:void(0)">确认激活</a>-->
                <a class="sure-active"  @click="sureActive" href="javascript:void(0)">确认激活</a>
              </div>

              <el-dialog
                :visible.sync="dialogAgreement"
                width="400px"
                center>
                <div  class="send-code">已向您账户绑定的手机号发送验证码 请注意查收</div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">

                  <el-form-item prop="code">
                    <el-input type="text" placeholder="请输入短信验证码" class="forget-messageInput" v-model="ruleForm.smsCode" style="width: 200px;"></el-input>
                    <el-button type="primary" class="forget-messageButton" @click="sendCode" id="code" style="margin-left: 20px;">获取</el-button>
                  </el-form-item>

                  <div class="forget-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')" style="width: 200px;" :disabled="once">提&nbsp;&nbsp;交</el-button>
                  </div>
                </el-form>
              </el-dialog>
              <!--签署图片-->
              <div id="hidden" style="display:none">
                <img :src="[contractSignImg]"  id="signImg" style="height:125px;width:125px">
              </div>
              <div id="signCanvas" style="display:none;position: absolute;top:560px;left: 380px">
                <img :src="[canvasTest]"  id="signCanvasImg" style="height:63px;width:125px">
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
  import Accounts from '../Accounts'
  import {validateSmsCode} from '@/common/js/validate'
  import server from "@/api/url";
  export default {
    component:{
      Accounts
    },
    beforeRouteLeave:(to,from,next)=>{
      clearInterval(this.timer);
    },
    data() {
      // 校验验证码
      var validateCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value!== ''&&!validateSmsCode(value)) {
          callback(new Error('验证码密码长度是6位'))
        }
      }

      return {
        baseURL:this.baseURL.BASE_URL,
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
        once:false,
        authorizationImg:'',
        timer:null,
        canvasTest:'',
        interfaceCode:sessionStorage.getItem("interfaceCode"),
        mobile:sessionStorage.getItem("mobile"),
        smsCode:'',   //短信码
        smsNoVer:'',   //
        appId:''  //验证码返回appId
      }
    },
    methods:{
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
          var codeType = '0';
          var count = 60;
          var curCount = count;
          var timer = null;

          let mobile=sessionStorage.getItem("mobile")
          this.sms = true;
          this.$http.post(process.env.API_HOST+'v1.4/sms/sendCode', {'mobile': mobile, 'sendType': codeType,'interfaceCode':this.interfaceCode}, {emulateJSON: true}).then(function (res) {
            // this.smsCode=res.data.smsCode
            this.smsNoVer=res.data.smsNo   //短信编号
            this.appId=res.data.appId     //appId


            var resultCode = res.data.resultCode;
            var smsNo = res.data.smsNo;
            var smsCode = res.data.smsCode;
            var message = res.data.resultMessage;
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
        let accountCode = sessionStorage.getItem("accountCode");
        let authorizerCode = sessionStorage.getItem("authorizerCode");
        let signatureImg = this.canvasTest;
        this.$refs[formName].validate((valid) => {

          this.$http.get(process.env.API_HOST + 'v1.4/sms', {
            params: {
              'mobile': this.mobile, 'smsNo': this.smsNoVer, 'smsCode': this.ruleForm.smsCode, 'appId': this.appId
            }
          }).then(res => {
            if (res.data.resultCode != 1) {

                this.$message({
                  showClose: true,
                  message: res.data.resultMessage,
                  type: 'error'
                })

            } else {
              this.$http.post(process.env.API_HOST + 'v1.5/user/SignAuthbook', {
                'authorizerCode': authorizerCode,
                'mobile': this.mobile,
                'smsNo': this.smsNoVer,
                'appId': this.appId,
                'smsCode': this.ruleForm.smsCode,
                'signatureImg': signatureImg,
                'accountCode': accountCode,
              }, {emulateJSON: true}).then(function (res) {
                console.log(res.data)
                if(res.data.resultCode == '1'){
                  let param={
                    mobile:sessionStorage.getItem("mobile"),
                    // accountCode:accountCode?accountCode:''
                  };

                  let urlParam=sessionStorage.getItem("interfaceCode");

                  server.login(param,urlParam).then(res => {
                    cookie.set("tenant", res.data.dataList); // 存入cookie 所需信息
                    this.$store.dispatch("tabIndex", { tabIndex: 0 }); //导航高亮
                    this.$router.push("/Home");

                  })
                }

              })
            }

          })

        })

      },

      pollingPanel(timer){ //轮询手写面板


        let accountCode = sessionStorage.getItem('accountCode');
        let authorizerCode = sessionStorage.getItem('authorizerCode');

        this.$http.get(process.env.API_HOST+'v1.4/contract/'+ accountCode +'/user/'+authorizerCode+'/getSignatureImg').then(function (res) {
          this.canvasTest =  res.bodyText
          console.log(res.bodyText)
          if(res.bodyText != '') {
            let smCode = document.getElementById('smCode')
                  smCode.style.display ='none';
            let  signCanvas= document.getElementById('signCanvas')
                  signCanvas.style.display ='block';
          }
          setTimeout(() => {
            if(this.canvasTest!=''){


              clearInterval(this.timer)


            }
          },1000)
        })
      }
    },
    created(){

      let accountCode=sessionStorage.getItem("accountCode");
      let authorizerCode=sessionStorage.getItem("authorizerCode");


	  //
      let  requestNo={'interfaceCode':this.interfaceCode,'accountCode':accountCode,'authorizerCode':authorizerCode};
      this.$http.get(process.env.API_HOST+'v1.5/user/getAuthBookImg', {params:requestNo}).then(function (res) {

        this.authorizationImg=res.bodyText;
      })


      let qrUrl =process.env.API_HOST+'v1.4/user/'+authorizerCode+'/qRCode';
      this.$http.get(qrUrl,{params:{'contractNo':accountCode}}).then(function (res) {

        this.qrSignImg=res.bodyText;
      });

      let that = this
      let timer = null
      this.timer = setInterval(function () {
        that.pollingPanel(this.timer)
      }, 3000)

    },

  }
</script>
<style lang="stylus">
  @import "../../../../styles/Confirmation/Account/ChildAccount.styl";
  .content-body>p.title{
    background: url("../../../../../static/images/Common/title.png") no-repeat;
  }
  .send-code{
    margin: 15px 0;
    font-size: 14px;
    color: #666;
  }
</style>
