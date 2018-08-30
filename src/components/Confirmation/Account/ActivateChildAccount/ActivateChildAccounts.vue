<template>
  <div class="ActivateChildAccounts" style="margin-top: 100px;">

    <div class="main" >

      <div class="container">

        <div class="content">

          <div class="content-body">

            <p class="title">激活子账号</p>

            <div class="border-bottom"  ></div>

            <div class="active-account">
              <div class="active-account-tips">
                请您仔细阅读一下授权书内容，如确定无任何异议后，请您在确定身份认证后，签署提交
              </div>

              <div class="active-account-contract-img">
                <img src="../../../../../static/images/Default/contract-img.jpg" id="activateImg">

              </div>

              <div class="scan-code">

                <el-tooltip class="item" effect="dark" content="微信扫一扫" placement="top">
                  <img :src="[qrSignImg]" alt="微信扫一扫"  class="wechat-img" id="wechat-img" v-if="qrSignImg">
                  <img src="../../../../../static/images/Default/default-scan-code.png" alt="微信扫一扫"  class="wechat-img" else>

                </el-tooltip>
                <div class="wechat-scan-tips">
                  请用微信扫一扫上<br/>
                  方二维码完成签署
                </div>


              </div>

              <div class="active-button">
                <a class="sure-active"  @click="dialogAgreement = true" href="javascript:void(0)">确认激活</a>
              </div>

              <el-dialog
                :visible.sync="dialogAgreement"
                width="400px"
                center>
                <div  class="send-code">已向您账户绑定的手机号发送验证码 请注意查收</div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">

                  <el-form-item prop="code">
                    <el-input type="text" placeholder="请输入短信验证码" class="forget-messageInput" v-model="ruleForm.code" style="width: 200px;"></el-input>
                    <el-button type="primary" class="forget-messageButton" @click="sendCode" id="code" style="margin-left: 20px;">获取</el-button>
                  </el-form-item>

                  <div class="forget-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')" style="width: 200px;">提&nbsp;&nbsp;交</el-button>
                  </div>
                </el-form>
              </el-dialog>
              <!--签署图片-->
              <div id="hidden" style="display:none">
                <img :src="[contractSignImg]"  id="signImg" style="height:125px;width:125px">
              </div>
              <div id="signCanvas" style="display:none;">
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
  export default {
    component:{
      Accounts
    },
    data() {
      // 校验验证码
      var validateCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value.length!= 6) {
          callback(new Error('验证码密码长度是6位'))
        }
      }

      return {
        dialogAgreement:false,  //验证码弹窗
        ruleForm: {
          code: '',         //验证码
        },
        rules:{
          code: [
            { required: true, validator: validateCode, trigger: 'blur' }
          ],
        },
        clickOnce:false,
        contractSignImg:'',
        canvasTest:'',
        qrSignImg:'',
        smsCodeNum:0,
        smsNo:false,
        repeat:false,
      }
    },
    methods:{
      //获取验证码
      sendCode(){
        if(this.repeat == false){
          this.repeat = true;
          var codeType = '0';
          var count = 60;
          var curCount = count;
          var timer = null;
          this.sms = true;
          this.$http.post(process.env.API_HOST+'v1.4/sms/sendCode', {'mobile': this.phone, 'sendType': codeType,'interfaceCode':this.interfaceCode}, {emulateJSON: true}).then(function (res) {
            this.smval=res.data.smsCode

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
              // this.$message({
              //   showClose: true,
              //   message: message?message:'验证码获取失败',
              //   type: 'error'
              // })
              that.smsNo = false
              that.repeat = false
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
      getPosition () { //点击签署
        if (this.flag == true){
          this.flag = false
          var signPositionStr = ''
          for (let i =0 ; i<this.arr.length; i++){
            // var pageNum = this.arr[i].pageNum;
            // var offsetX = this.arr[i].offsetX;
            // var offsetY = this.arr[i].offsetY;
            let parentBox = document.getElementById('activateImg')
            // var firstImg =parentBox.getElementsByTagName('img')[1]
            // var imgWight = document.getElementById('imgSign').offsetWidth //获取合同页面的宽度
            // var imgHeight = document.getElementById('imgSign').offsetHeight//获取合同页面的高度
            let hidden =document.getElementById('wechat-img')
            // var leftX = offsetX * imgWight;
            // var topY = (pageNum - 1 + offsetY) * imgHeight;
            // // var signCanvasImg = document.getElementById('signCanvasImg').offsetHeight
            // // var topY = (pageNum - 1 + offsetY) * imgHeight + pageNum - parseInt(signCanvasImg/4);
            let signPic = document.getElementById('signImg').cloneNode(true)
            parentBox.appendChild(signPic);
            signPic.style.position= 'absolute';
            signPic.style.top= 200 + 'px'
            signPic.style.left = 300 + 'px'
            hidden.style.display='none'

          }

        }
        this.flag = false
        this.clickSign = true
      },
      submitBtn() {
        if(this.resubmit == true){
          this.resubmit = false

          const h = this.$createElement;
          this.$msgbox({
            title: '提示',
            message: h('p', null, [
              h('span', null, '是否确定要提交？ '),
              h('i', { style: 'color: teal' }, '')
            ]),
            center:true,
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '执行中...';
                setTimeout(() => {
                  this.submitContract();
                  done();
                  setTimeout(() => {
                    instance.confirmButtonLoading = false;
                  }, 50);
                }, 100);
              } else {
                done();
                this.resubmit = true
                this.$message({
                  type: 'info',
                  message: '取消签署'
                });
              }
            }
          })
        }
      },
      submitContract () { //确认签署
        this.$loading.show(); //显示
        let accountCode=sessionStorage.getItem("accountCode");
        let authorizerCode=sessionStorage.getItem("authorizerCode");

        let url = process.env.API_HOST+'v1.5/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode +'activateAccount';
        this.$http.post(url,{
          'accountCode':accountCode,
          'authorizerCode': authorizerCode,

        },{emulateJSON: true}).then(function (res) {
          if(res.data.sessionStatus == '0'){
            this.$router.push('/Server')
          } else {
            if (res.data.resultCode == 1){
              // this.centerDialogVisible = false
              this.$message({
                showClose: true,
                message: '子账号成功！',
                type: 'success'
              })
              this.$loading.hide(); //隐藏

              this.$router.push('/Home');
            }
          }
        })
      },
      pollingPanel(timer) { //轮询手写面板
        var userCode = cookie.getJSON('tenant')[0].userCode
        var contractNo = sessionStorage.getItem('contractNo')
        contractNo = JSON.parse(contractNo)
        this.$http.get(process.env.API_HOST+'v1.4/contract/'+ contractNo +'/user/'+userCode+'/getSignatureImg').then(function (res) {
          this.canvasTest =  res.bodyText
          if(res.bodyText != '') {
            var smCode = document.getElementById('smCode')
            smCode.style.display ='none';
          }
          setTimeout(() => {
            if(this.canvasTest!=''){
              let signPosit = '';

              let parentBox = document.getElementById('activateImg')

              let signCanvas =document.getElementById('signCanvas')

              let signPng = document.getElementById('signCanvasImg').cloneNode(true);
              parentBox.appendChild(signPng);
              signPng.style.position= 'absolute';
              signPng.style.top= 200 + 'px'
              signPng.style.left = 300 + 'px'
              signPng.setAttribute("id", "div-" + i);
              this.arrow.push (i)
              signCanvas.style.display='none'

              clearInterval(this.timer)
              this.signPosit = signPosit
              this.recapture = true
            }
          },1000)
        })
      }
    },
    created(){
      let accountCode=sessionStorage.getItem("accountCode");
      let authorizerCode=sessionStorage.getItem("authorizerCode");
      let  requestNo={'interfaceCode':cookie.getJSON("tenant")[1].interfaceCode,'accountCode':accountCode,'authorizerCode':authorizerCode};
      this.$http.get(process.env.API_HOST + "v1.5/user/getAuthBookImg",
        {params:requestNo}).then(function(res){

      })
      let contractNo=accountCode;
      let qrUrl =process.env.API_HOST+'v1.4/user/contract'+contractNo+'/user'+cookie.getJSON("tenant")[1].interfaceCode+'/getSignatureImg';
      this.$http.get(qrUrl).then(function (res) {
        this.qrSignImg = res.bodyText
      })

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
