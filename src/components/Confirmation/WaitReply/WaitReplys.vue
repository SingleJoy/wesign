/*
* @Author: wangjia
* @Date: 2018-06-19 16:24:23
* @Last Modified by: wangjia
* @Last Modified time: 2018-07-03 17:49:06
*/
<template>
  <div>
    <div class="Topes"  style="position: fixed;top:0;z-index: 999;">
      <nav class='nav'>
        <p class='logo'>
          <img src="../../../../static/images/logo2.png" alt="">
        </p>
        <div class='buttons'>
          <el-button type="info" style='background:#ccc' @click="cancelSign">取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</el-button>
          <!-- <el-button style='color:#22a7ea'>提&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;交</el-button> -->
        </div>
      </nav>
    </div>
    <div class='Enterprises' style="margin-top: 100px;z-index: 9;">
      <div class='step' style="width:720px;">
        <ul>
          <li class="active"><i class='el-icon-document'></i><b>注册</b></li>
          <p></p>
          <li class="active"><i class='el-icon-goods'></i><b>个人认证</b></li>
          <p></p>
          <li class="active"><i class='el-icon-edit'></i><b>企业认证</b></li>
          <p></p>
          <li class="active"><i class='el-icon-menu'></i><b>打款确认</b></li>
          <p></p>
          <li><i class='el-icon-check'></i><b>完成</b></li>
        </ul>
      </div>
      <div class='productes'>

        <div class='centerTo'>

          <div class='container'>
            <div class="header-title1">
              <p class="content-img-wait">
                <img src="../../../../static/images/Confirmation/WaitReply/waitReply.png" height="40" width="40"/>
              </p>
              <p class="content-info-a">
                <span>请在下方输入框中填写众签给您企业对公账户小额打款金额</span>
                <br>
                <span class="cpoint">请仔细检查打款金额，填写错误3次，账户将会被冻结</span>
              </p>
            </div>
            <div class='second'>
              <span style='display: inline-block;margin-left: -20px;'>打款金额</span>
              <el-input
                style='width:330px;height:48px;'
                placeholder="请输入内容"
                v-model="trans_money"
              >
              </el-input>

              <p id='moneyInfo' style='font-size:12px;color:red;text-align:center;'></p>
            </div>
            <div class='second'>
              <span style='margin-left:-46px;'>企业开户名称</span>
              <el-input
                style='width:330px;height:48px;'
                placeholder="请输入内容"
                v-model="payeeName"
                :disabled= disabled
              >
              </el-input>
            </div>
            <div class='second'>
              <span style='margin-left:-46px;'>企业开户银行</span>
              <el-input
                style='width:330px;height:48px;'
                placeholder="请输入内容"
                v-model="bankName"
                :disabled= disabled
              >
              </el-input>
            </div>
            <div class='second'>
              <span style='margin-left:-46px;'>开户所在省份</span>
              <el-input
                style='width:330px;height:48px;'
                placeholder="请输入内容"
                v-model="provincialName"
                :disabled= disabled
              >
              </el-input>
            </div>
            <div class='second'>
              <span style='margin-left:-46px;'>开户所在城市</span>
              <el-input
                style='width:330px;height:48px;'
                placeholder="请输入内容"
                v-model="cityName"
                :disabled= disabled
              >
              </el-input>
            </div>
            <div class='second'>
              <span style='margin-left:-46px;'>开户支行名称</span>
              <el-input
                style='width:330px;height:48px;'
                placeholder="请输入内容"
                v-model="InstitutionalName"
                :disabled= disabled
              >
              </el-input>

            </div>
            <div class='second'>
              <span style='margin-left:-50px;'>企业银行账号</span>
              <el-input
                style='width:330px;height:48px;'
                placeholder="请输入内容"
                v-model="bankDeposit"
                :disabled= disabled
              >
              </el-input>
              <p id='errorInfo'></p>
            </div>
            <div class="edit-btn" >
              <!-- <el-button type="primary" style="width: 160px;" @click="reviseInformation" v-if="click == false">编辑</el-button>
              <el-button type="primary" style="width: 160px;" @click="successInformation" v-else>完成</el-button> -->
              <el-button type="primary" style="width: 330px;height: 40px;z-index: 999;position: relative;" @click="validateSMS">提交</el-button>
            </div>

          </div>
        </div>

      </div>
    </div>

    <!--<div class="modal " v-show ="paymentsTips == true">-->
      <!--<div class="modal-box" style="width: 400px;height: 220px;">-->
        <!--<div class="modal-header">-->
          <!--<div class="modal-header-title">-->
            <!--<div>提示</div>-->
          <!--</div>-->
          <!--<a href="javascript:void(0);" @click="close" class="close">X</a>-->
        <!--</div>-->
        <!--<div class="modal-body-account">-->
          <!--<div style="height: 50px;margin: 40px 20px 30px 20px;">-->

            <!--&lt;!&ndash;弹窗1&ndash;&gt;-->

            <!--<div style="font-size: 14px;color: #333;"  v-show="respondsValue=='1' ">-->
              <!--<div style="text-align: center">-->
                <!--打款成功-->
              <!--</div>-->

            <!--</div>-->


            <!--<div style="font-size: 14px;color: #333;"  v-show="respondsValue=='-5' ">-->
              <!--<div style="text-align: center">-->
                <!--商户打款冻结-->
              <!--</div>-->
              <!--<div style="text-align: center; margin-top: 10px;">-->
                <!--你还剩余 <span style="color: red;">{{number}}</span>次机会-->
              <!--</div>-->
            <!--</div>-->

            <!--<div style="font-size: 14px;color: #333;"  v-show="respondsValue=='-1' ">-->
              <!--<div style="text-align: center">-->
                <!--对公账户打款失败，请检查信息后重新输入，打款失败三次后认证流程就会被冻结-->
              <!--</div>-->
              <!--<div style="text-align: center; margin-top: 10px;">-->
                <!--你还剩余 <span style="color: red;">{{number}}</span>次机会-->
              <!--</div>-->
            <!--</div>-->

            <!--&lt;!&ndash;弹窗2&ndash;&gt;-->
            <!--<div style="font-size: 14px;color: #333;"  v-show="respondsValue=='2' ">-->
              <!--<div>-->
                <!--正在打款中，请耐心等待...-->
              <!--</div>-->
            <!--</div>-->

            <!--&lt;!&ndash;弹窗3&ndash;&gt;-->
            <!--<div style="font-size: 14px;color: #666;"  v-show="respondsValue=='3' ">-->
              <!--<div>-->
                <!--您输入的金额与打款金额不匹配，请确认后重新填写-->
              <!--</div>-->
            <!--</div>-->

            <!--&lt;!&ndash;弹窗4&ndash;&gt;-->
            <!--<div style="font-size: 14px;color: #666;"  v-show="respondsValue=='-5' ">-->
              <!--<div style="text-align: center">-->
                <!--对不起，改账号已被冻结，请联系众签客服处理-->
              <!--</div>-->
              <!--<div style="text-align: center;margin-top: 20px;">-->
                <!--联系电话 400-0000-6923-->
              <!--</div>-->
            <!--</div>-->

          <!--</div>-->

          <!--<div class="modal-footer">-->
            <!--<a href="javascript:void(0);" class="btn btn-quit" @click="close" style="width: 150px">确定</a>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->

  </div>
</template>
<script>
  import {validateDecimal} from '@/common/js/validate'
  import cookie from '@/common/js/getTenant'
  export default {
    name: 'Enterprises',
    data() {
      return {
        trans_money:'',
        // bankSmsCode:'',
        payeeName:'',
        bankDeposit:'',
        bankName:'',
        provincialName:'',
        cityName:'',
        InstitutionalName:'',
        click:false,
        disabled:true,
        respondsValue:'',
        number:''
      }
    },
    methods:{
      //取消操作
      money(){
        if(this.trans_money>=1){
            // this.$alert('打款金额填写格式错误！','打款', {
            //   confirmButtonText: '确定'
            // })
             this.$message({
              showClose: true,
              message: '打款金额填写错误！',
              type: 'error'
            })
            return false
        }
        if(!validateDecimal(this.trans_money)){
          if(this.trans_money==''){
            // this.$alert('打款金额为必填','打款', {
            //   confirmButtonText: '确定'
            // })
             this.$message({
              showClose: true,
              message: '打款金额为必填',
              type: 'error'
            })
          }else{
            // this.$alert('打款金额填写格式错误！','打款', {
            //   confirmButtonText: '确定'
            // })
            this.$message({
              showClose: true,
              message: '打款金额填写格式错误！',
              type: 'error'
            })
          }

          return false
        }
      },
      cancelSign() {    //取消操作
        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, ' 确定将返回登录页'),
            h('i', { style: 'color: teal' }, '')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done();
                this.$router.push('/')
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 50);
              }, 100);
            } else {
              done();
            }
          }
        })
      },
      // 验证企业打款验证码
      validateSMS() {
        if(this.money() == false){
          return false
        }
        var interfaceCode = cookie.getJSON('tenant')[1].interfaceCode
        this.$http.get(process.env.API_HOST+'v1.4/tenant/'+interfaceCode+'/remittance',{params:{
            'trans_money':this.trans_money,
          }}).then(response =>{
          if (response.data.resultCode == '1') {
            this.$message({
              showClose: true,
              message: response.data.resultMessage,
              type: 'success'
            })
            this.$router.push('/Completion')
          }else{
               this.$alert(response.data.resultMessage,'打款失败', {
               confirmButtonText: '确定'
            })
          }
        })
      }
    },
    created() {
      //查询银行信息
<<<<<<< HEAD
      var interfaceCode = sessionStorage.getItem('interfaceCode')
      interfaceCode = JSON.parse(interfaceCode)
=======
      var interfaceCode = cookie.getJSON('tenant')?cookie.getJSON('tenant')[1].interfaceCode:'';
>>>>>>> 3c5a9eaf262974e550aa1a1929be14ac18c94d42
      var accountSteps = sessionStorage.getItem('accountSteps')
      var testStatus = 1;
      this.$http.get(process.env.API_HOST+'v1.4/tenant/'+interfaceCode+'/getBank').then(response =>{
        if (response.data.resultCode == '1') {
          this.payeeName = response.data.data.to_acc_name; // 收款人姓名
          this.bankDeposit = response.data.data.to_acc_no; //收款人银行帐号
          this.bankName = response.data.data.to_bank_name; //收款人银行名称
          this.provincialName = response.data.data.to_pro_name; //收款人开户行省名
          this.cityName = response.data.data.to_city_name; //收款人开户行市名
          this.InstitutionalName = response.data.data.to_acc_dept; //收款人开户行机构名

        } else {
          this.$alert(response.data.resultMessage,'打款认证', {
            confirmButtonText: '确定'
          }).then(()=>{

          })
        }
      })
      if(accountSteps){
        // console.log(13123)
        this.$http.get(process.env.API_HOST+'v1.4/tenant/'+interfaceCode+'/findTenantMakeMoneyStatus').then(response =>{
          if (response.data.resultCode == '1') {
           // this.respondsValue=1;
            this.$alert('打款成功','提示', {
              confirmButtonText: '确定'
            }).then(()=>{
              // this.$router.push('/Payment')
            })
          } else if(response.data.resultCode == '-5'){

            this.$alert('商户打款冻结','提示', {
              confirmButtonText: '确定'
            })
          } else if(response.data.resultCode == '-1'){
            this.$alert('对公账户打款失败，请检查信息后重新输入，打款失败三次后认证流程就会被冻结，您还剩余'+ response.data.data+'次机会','提示', {
              confirmButtonText: '确定'
            }).then(()=>{
              this.$router.push('/Payment')
            })
          } else if(response.data.resultCode == '0'){

            this.$alert('正在打款中，请等待...','提示', {
              confirmButtonText: '确定'
            })
            // this.respondsValue=0;
          } else if(response.data.resultCode == '-4'){
            this.$alert('对不起，该账号已被冻结，请联系众签客服处理！联系电话 400-0000-6923.','提示', {
              confirmButtonText: '确定'
            })
            // this.respondsValue=-4;
          }
        })
      }else{


      }

    }
  }
</script>
<style scoped>
  @import "../../../styles/Confirmation/WaitReply/WaitReply.css";
  @import "../../../common/styles/Topes.css";
</style>
