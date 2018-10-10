<template>
  <div>
    <div class="Topes">
      <nav class='nav'>
        <p class='logo'>
          <img src="../../../../static/images/logo2.png" alt="">
        </p>

      </nav>
    </div>
    <div class="EnterprisePayments">
      <div class="step" style="width:420px;">
        <ul>
          <li class="active"><i class='el-icon-goods'></i><b>实名认证</b></li>
          <p></p>
          <li class="active"><i class='el-icon-menu'></i><b>打款确认</b></li>
          <p></p>
          <li><i class='el-icon-check'></i><b>完成</b></li>
        </ul>
      </div>
      <div class="payment-operate">
        <div class="tips">
          温馨提示：对公账户打款成功后，平台将会以短信的方式通知到您，请耐心等待<br/>
          您可以从贵公司财务处获知打款金额
        </div>
        <div class="payment-content" >

          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="account-ruleForm" size="medium">

            <el-form-item label="打款金额" :label-width="formLabelWidth" prop="paymentNum">
              <el-input v-model="ruleForm.paymentNum" auto-complete="off" placeholder="请输入打款金额" style="width: 330px;height:40px;"></el-input>
            </el-form-item>

            <el-form-item label="企业名称" :label-width="formLabelWidth" prop="enterpriseName">
              <el-input v-model="ruleForm.enterpriseName" auto-complete="off" placeholder="请输入企业名称" disabled="disabled" style="width: 330px;height:40px;"></el-input>
            </el-form-item>

            <el-form-item label="企业银行账号" :label-width="formLabelWidth" prop="bankAccount">
              <el-input v-model="ruleForm.bankAccount" auto-complete="off" placeholder="请输入企业银行账号" style="width: 330px;height:40px;" disabled="disabled"></el-input>
            </el-form-item>

            <el-form-item label="银行名称" :label-width="formLabelWidth" prop="bankName">
              <el-input v-model="ruleForm.bankName" auto-complete="off" placeholder="请输入银行名称" :maxlength= "30" style="width: 330px;height:40px;" disabled="disabled"></el-input>
            </el-form-item>


            <el-form-item label="开户行支行所在省市" :label-width="formLabelWidth" prop="bankArea">

              <el-input placeholder="请输入开户行支行所在省市"  v-model="ruleForm.bankArea" style="width: 330px;height:40px;" disabled="disabled"></el-input>
            </el-form-item>

            <el-form-item label="支行银行名称" :label-width="formLabelWidth" prop="bankBranchName">
              <el-input v-model="ruleForm.bankBranchName" auto-complete="off" placeholder="请输入支行银行名称" :maxlength= "30" style="width: 330px;height:40px;" disabled="disabled"></el-input>
            </el-form-item>

          </el-form>

          <div class="edit-btn" >
            <el-button type="info" style="width:200px;height: 40px;" @click="cancel">返&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;回</el-button>

            <el-button type="primary" style="width: 200px;height: 40px;" @click="submit" :disabled="once">提交</el-button>
          </div>

          <el-dialog
            :visible.sync="dialogAgreement"
            width="400px"
            center>

            <div  class="send-code" style="color: red;text-align: center;">
              对不起，您印证打款金额错误次数已超过五次，<br/>
              需要您验证一下信息。</div>
            <!--<div  class="send-code">为确保是您本人操作，请填写以下信息。</div>-->
            <!--<div style="color: #333;text-align: left;padding-bottom: 10px;font-weight: bold;">{{mobileShowFirst}}&nbsp;<sub >****</sub>&nbsp;{{mobileShowLast}}</div>-->
            <el-form :model="legalForm" :rules="ruleFormRules" ref="legalForm" class="code-ruleForm">


              <el-form-item label="法人姓名" prop="legalPerson">
                <el-input type="text" placeholder="请输入法人姓名"  v-model="legalForm.legalPerson" style="width: 250px;" disabled="disabled"></el-input>
              </el-form-item>


              <el-form-item prop="IDcard" label="身份证号" >
                <el-input type="text" placeholder="请输入身份证号"  v-model="legalForm.IDcard" style="width: 250px;"></el-input>
              </el-form-item>

              <el-form-item prop="legalMobile" label="手机号码">
                <el-input type="text" placeholder="请输入手机号码"  v-model="legalForm.legalMobile" style="width: 250px;"></el-input>

              </el-form-item>

              <el-form-item prop="phoneCode" label="验证码  ">
                <el-input type="text" placeholder="请输入验证码" v-model="legalForm.phoneCode" style="width:165px;margin-left: 15px"></el-input>
                <el-button type="primary" class="forget-messageButton" @click="sendCode" id="code" style="margin-left: 10px;" :disabled="repeat">获取</el-button>
              </el-form-item>

              <div class="forget-btn" style="margin-top: 20px;margin-left: 62px;">
                <el-button type="primary" @click="thaw('legalForm')" style="width: 235px;" :disabled="verifySub">提&nbsp;&nbsp;交</el-button>
              </div>

            </el-form>
          </el-dialog>

        </div>

      </div>

    </div>
  </div>

</template>
<script>
    import server from '@/api/url.js'
    import cookie from '@/common/js/getTenant'
    import {validateOpenName,TrimAll,validateDecimal,onlyChinese,validateCard,validateMoblie,validateSmsCode} from '@/common/js/validate'
    export default {
    name: 'EnterprisePayments',

    data () {
      //校验打款金额
      var validatePaymentNum=(rule,value,callback)=>{
        if (value === '') {
          callback(new Error('请输入打款金额'));
        }else if(TrimAll(value).length>4||TrimAll(value)<0.01||TrimAll(value)>0.99){
          callback(new Error('打款金额填写只能在0.01~0.99之间'));
        }else {
          callback()
        }
      }
     //法人姓名校验
    //  var validateLegalPerson=(rule,value,callback)=>{
    //     if(value===''){
    //       callback(new Error('法人姓名不可为空'))
    //     }else if(value!==''&&!(onlyChinese(TrimAll(value)))){
    //       callback(new Error('法人姓名只能输入中文'));
    //     }else{
    //       callback()
    //     }
    //   }
      // 法人身份证号校验
      var validateIDcard=(rule,value,callback)=>{
        if(value===''){
          callback(new Error('法人身份证号不可为空'))
        }else if(value!==''&&!(validateCard(TrimAll(value)))){
          callback(new Error('身份证号格式不正确'));
        }else{
          callback()
        }
      }
      //手机号码
      var validateLegalMobile=(rule,value,callback)=>{
        if(value===''){
          callback(new Error('法人手机号不可为空'))
        }else if(value!==''&&!(validateMoblie(TrimAll(value)))){
          callback(new Error('法人手机号填写格式错误'));
        }else{
          callback()
        }
      }

      //校验6位手机验证码
      var validatePhoneCode=(rule,value,callback)=>{
        if(value===''){
          callback(new Error('验证码不为空'))
        }else if(value!==''&&!(validateSmsCode(TrimAll(value)))){
          callback(new Error('验证码只能是6位数字'));
        }else{
          callback()
        }
      }


      return {
        ruleForm: {
          paymentNum:'',  //打款金额
          enterpriseName:'',//企业名称
          bankAccount:'', //企业银行账号
          bankName:'' ,//银行名称
          bankArea:'', //开户行支行所在省市
          bankBranchName:'',  //支行银行名称
        },
        message:'',
        // mobile:sessionStorage.getItem("mobile"),
        mobileShowFirst:'',
        mobileShowLast:'',
        dialogAgreement:false,
        once:false, //提交按钮单次点击,
        verifySub:false, //五次打款验证提交

        rules:{
          paymentNum: [
            {validator: validatePaymentNum, trigger: 'blur' }
          ],

        },
        legalForm:{
          legalPerson:'',
          IDcard:'',
          legalMobile:'',
          phoneCode:'',
        },
        ruleFormRules:{
        //   legalPerson:[
        //     { required: true,validator: validateLegalPerson, trigger: 'blur' }
        //   ],
          IDcard:[
            { required: true,validator: validateIDcard, trigger: 'blur' }
          ],
          legalMobile:[
            { required: true,validator: validateLegalMobile, trigger: 'blur' }
          ],
          phoneCode:[
            { required: true,validator: validatePhoneCode, trigger: 'blur' }
          ],
        },
        interfaceCode:cookie.getJSON("tenant")?cookie.getJSON("tenant")[1].interfaceCode:'',
        formLabelWidth:'200px',
        smsCode:'',   //短信码
        smsNoVer:'',   //
        appId:'',  //验证码返回appId
        repeat:false,
        pollTimer:null   //轮询的定时器

      }
    },
    beforeDestroy() {
      clearInterval(this.timer);
      this.timer = null;
    },
    methods:{
      change (val) {
        this.province=val[0]
        this.city=val[1]
      },

      sendCode(){
        let mobile=this.legalForm.legalMobile;
        if(!mobile){
          this.$message({
            showClose: true,
            message: '手机号为空',
            type: 'error'
          })
        }else{
          this.repeat = true;

            var codeType = '0';
            var count = 60;
            var curCount = count;
            var timer = null;
            this.sms = true;
            this.$http.post(process.env.API_HOST+'v1.4/sms/sendCode',{'mobile':mobile,'sendType':codeType,'interfaceCode':this.interfaceCode}, {emulateJSON: true}).then(function (res) {

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
      // 解冻打款失败
      thaw(legalForm){
        this.verifySub = true 
        this.$refs[legalForm].validate((valid) => {
            if(valid){
                this.$http.get(process.env.API_HOST + 'v1.4/sms', {
                    params: {
                    'mobile': this.mobile, 'smsNo': this.smsNoVer, 'smsCode': this.ruleForm.smsCode, 'appId': this.appId
                    }
            }).then(res => {
                //手机号验证码检验失败
                if (res.data.resultCode != 1) {
                    this.verifySub = false  
                this.$message({
                    showClose: true,
                    message: res.data.resultMessage,
                    type: 'error'
                })
                }else {
                //手机号验证码检验成功
                this.verifySub = false  
                this.$message({
                    showClose: true,
                    message: res.data.resultMessage,
                    type: 'success'
                })
                //手机号验证码校验成功后，开始调用解冻打款确认接口

                let param ={
                    'userName':this.legalForm.legalPerson,
                    'idCard':this.legalForm.IDcard,
                    'mobile':this.legalForm.legalMobile,
                    'interfaceCode':this.interfaceCode,
                };
                server.unfreezeRemittance(param).then(function (res) {
                    if (res.data.resultCode == '1') {
                        this.verifySub = false  
                        this.$message({
                            showClose: true,
                            message: res.data.resultMessage,
                            type: 'success'
                        })
                    } else {
                    this.$message({
                        showClose: true,
                        message: res.data.resultMessage,
                        type: 'error'
                    })

                    }

                })

                }


          })
        }
        })
      },
        cancel(){
            this.$store.dispatch('tabIndex',{tabIndex:0});
            this.$router.push('/Merchant')
        },
      //提交
      submit(){
        // this.dialogAgreement=true;
        if(this.ruleForm.paymentNum==''){
          this.$alert('打款金额不可为空', '提示',{
            confirmButtonText: '确定'
          });
          return false
        }else if(this.ruleForm.paymentNum<0.01||this.ruleForm.paymentNum>0.99||this.ruleForm.paymentNum.length>4){
          this.$alert('打款金额必须是0.01~0.99之间', '提示',{
            confirmButtonText: '确定'
          });
          return false
        }else{
          this.once=true;
          let param ={'trans_money':this.ruleForm.paymentNum};
          server.verifyRemittance(param,this.interfaceCode).then(res => {
            if (res.data.resultCode == 0) {
              this.$message({
                showClose: true,
                message:res.data.resultMessage,
                type: 'error'
              })
              this.once=false;
            } else if (res.data.resultCode == 1) {
                this.once=false;
                this.$alert(res.data.resultMessage, '提示', {
                confirmButtonText: '确定'
              }).then(() => {
                    let param={
                            mobile:sessionStorage.getItem('mobile')
                    };
                    let urlParam = sessionStorage.getItem('interfaceCode')
                    server.login(param,urlParam).then(res => {           
                        cookie.set("tenant", res.data.dataList);  //更新cookie
                        this.$router.push('/EnterpriseRegisterSucc')
                    })
                
              })
                this.once=false;
            } else if(res.data.resultCode == '-4'){
                this.once=false;
                this.message=res.data.resultMessage;
                this.legalForm.legalPerson=res.data.data;
                this.dialogAgreement=true;

            }else{
                this.once=false;
                this.$message({
                    showClose: true,
                    message:res.data.resultMessage,
                    type: 'error'
                })
            }

          })
        }
        },

      //轮询
      pollingPanel(timer){ //轮询打款状态
        let that = this;
        server.moneyStatus(this.interfaceCode).then(function (res) {
            if(res.data.resultCode=='1') {
                clearInterval(that.pollTimer);
            } else if(res.data.resultCode=='-1'){
                this.$router.push('/EnterpriseCertificate')
            }else{

            }

        })
      },


    },
    created() {
      this.enterpriseName=sessionStorage.getItem("companyName");
    //   console.log(this.interfaceCode);
      // 查询企业银行信息
      server.getBank(this.interfaceCode).then(response =>{
        if (response.data.resultCode == '1') {
          this.ruleForm.bankAccount = response.data.data.to_acc_no; //收款人银行帐号
          this.ruleForm.bankName = response.data.data.to_bank_name; //收款人银行名称
          this.ruleForm.enterpriseName = response.data.data.to_acc_name; //收款人银行名称
          this.ruleForm.bankArea = response.data.data.to_pro_name+response.data.data.to_city_name; //收款人开户行省市名
          this.ruleForm.bankBranchName = response.data.data.to_acc_dept; //收款人开户行机构名

        } else if(response.data.resultCode == '0'){
          this.$message({
            showClose: true,
            message:res.data.resultMessage,
            type: 'error'
          })
        }
      })

      // 轮询查找打款进度信息

      let that = this;
      let pollTimer = null;
      this.pollTimer = setInterval(function () {
        that.pollingPanel(this.pollTimer)
      }, 3000)

    },
    destroyed:function(){
        let that =this;
        clearInterval(that.pollTimer);
    }
  }
</script>

<style lang="stylus">
  @import "../../../common/styles/Topes.css";
  @import "../../../common/styles/SigningSteps.css";
  @import "../../../styles/EnterpriseCertificate/EnterprisePayment.styl";
  .send-code{
    margin: 15px 0;
    font-size: 14px;
    color: #666;
  }
  .code-ruleForm{
    width: 500px;
    height: 300px;
  }
</style>
