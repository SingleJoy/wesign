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
              <el-input v-model="ruleForm.bankAccount" auto-complete="off" placeholder="请输入企业银行账号" style="width: 330px;height:40px;"></el-input>
            </el-form-item>

            <el-form-item label="银行名称" :label-width="formLabelWidth" prop="bankName">
              <el-input v-model="ruleForm.bankName" auto-complete="off" placeholder="请输入银行名称" :maxlength= "30" style="width: 330px;height:40px;" ></el-input>
            </el-form-item>


            <el-form-item label="开户行支行所在省市" :label-width="formLabelWidth" prop="bankArea">

              <el-input placeholder="请输入开户行支行所在省市"  v-model="ruleForm.bankArea" style="width: 330px;height:40px;"></el-input>
            </el-form-item>

            <el-form-item label="支行银行名称" :label-width="formLabelWidth" prop="bankBranchName">
              <el-input v-model="ruleForm.bankBranchName" auto-complete="off" placeholder="请输入支行银行名称" :maxlength= "30" style="width: 330px;height:40px;" ></el-input>
            </el-form-item>

          </el-form>

          <div class="edit-btn" >
            <el-button type="info" style="background:#ccc;width: 200px;height: 40px" >返&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;回</el-button>

            <el-button type="primary" style="width: 200px;height: 40px;" @click="submit('ruleForm')" :disbled="once">提交</el-button>
          </div>

        </div>

      </div>

    </div>
  </div>

</template>
<script>
  import server from '@/api/url.js'
  import {validateOpenName,TrimAll,validateDecimal,validateBankAccountNumber} from '@/common/js/validate'
  export default {
    name: 'EnterprisePayments',

    data () {
      var validatePaymentNum=(rule,value,callback)=>{
        if (value === '') {
          callback(new Error('请输入打款金额'));
        }else if(TrimAll(value)!==''&&validateDecimal(value)){
          callback(new Error('打款金额填写只能在0.01~0.99之间'));
        }else {
          callback()
        }
      }

      return {
        ruleForm: {
          paymentNum:'',  //打款金额
          enterpriseName:'',//企业名称
          bankAccount:'', //企业银行账号
          bankName:'' ,//银行名称
          bankArea:[], //开户行支行所在省市
          bankBranchName:'',  //支行银行名称
        },
        once:false, //提交按钮单次点击
        rules:{
          paymentNum: [
            {validator: validatePaymentNum, trigger: 'blur' }
          ],

        },
        interfaceCode:sessionStorage.getItem("interfaceCode"),
        formLabelWidth:'200px',

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
      //提交
      submit(formName){
        if(this.ruleForm.paymentNum==''){
          this.$alert('打款金额不可为空', '提示',{
            confirmButtonText: '确定'
          });
          return false
        }else if(validateDecimal(this.ruleForm.paymentNum)){
          this.$alert('打款金额必须是0.01~0.99之间', '提示',{
            confirmButtonText: '确定'
          });
          return false
        }else{
          this.once=true;
          let param ={'trans_money':this.paymentNum};

          server.verifyRemittance(param,this.interfaceCode).then(res => {
            if (res.data.resultCode == 0) {
              this.$message({
                showClose: true,
                message:res.data.resultMessage,
                type: 'error'
              })

            } else if (res.data.resultCode == 1) {
              this.$alert(res.data.resultMessage, '提示', {
                confirmButtonText: '确定'
              }).then(() => {
                this.$router.push('/EnterpriseRegisterSucc')
              })
            }

          })
        }
        },

      //轮询
      pollingPanel(timer){ //轮询手写面板

        server.moneyStatus(this.interfaceCode).then(function (res) {

          if(res.data.resultCode=='1') {
            setTimeout(() => {
              if(this.canvasTest!=''){
                clearInterval(this.timer)
              }
            },1000)
          }else{

            this.$message({
              showClose: true,
              message:res.data.resultMessage,
              type: 'error'
            })
          }

        })
      }

    },
    created() {
      let companyName=sessionStorage.getItem("companyName");
      this.enterpriseName=companyName;
      //查询企业银行信息
      server.getBank(this.interfaceCode).then(response =>{
        if (response.data.resultCode == '1') {
          this.ruleForm.bankAccount = response.data.data.to_acc_no; //收款人银行帐号
          this.ruleForm.bankName = response.data.data.to_bank_name; //收款人银行名称
          this.ruleForm.bankArea = response.data.data.to_pro_name+response.data.data.to_city_name; //收款人开户行省市名
          this.ruleForm.bankBranchName = response.data.data.to_acc_dept; //收款人开户行机构名

        } else {
          this.$alert(response.data.resultMessage,'打款认证', {
            confirmButtonText: '确定'
          })
        }
      })

      //轮询查找打款进度信息
      let that = this
      let timer = null
      this.timer = setInterval(function () {
        that.pollingPanel(this.timer)
      }, 3000)
    }
  }
</script>

<style lang="stylus">
  @import "../../../common/styles/Topes.css";
  @import "../../../common/styles/SigningSteps.css";
  @import "../../../styles/EnterpriseCertificate/EnterprisePayment.styl";

</style>
