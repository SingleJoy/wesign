<template>
  <div>
    <div class="Topes">
      <nav class='nav'>
        <p class='logo'>
          <img src="../../../../static/images/logo2.png" alt="">
        </p>

      </nav>
    </div>
    <div class="EnterpriseRegisterSuccs">
      <div class="step" style="width:420px;">
        <ul>

          <li class="active"><i class='el-icon-edit'></i><b>实名认证</b></li>
          <p></p>
          <li class="active"><i class='el-icon-menu'></i><b>打款确认</b></li>
          <p></p>
          <li class="active"><i class='el-icon-check'></i><b>完成</b></li>
        </ul>
      </div>
      <div class="payment-operate">

        <div class="payment-content" >

          <div class="payment-success">

            <div class="image">
              <img src="../../../../static/images/Complete/success.png" alt="" style="margin-top: 40px;">
            </div>

            <div  class="success-tips">
              <span>恭喜,已完成实名认证</span>

            </div>

          </div>

          <div class="sign-times">
            <p>为感谢您的使用，微签已赠送您<span style="font-size: 20px;color: #ff8a00;">10</span>次发起签约次数您现在可以去发起签约啦!</p>
          </div>
        </div>

      </div>

      <div class="enterprise-certificate">

        <div class="certificate-content">
          <div class="left-side">

            <div class="card " style="margin-top: 20px;margin-left: 20px;">
              <div class="right-card-content">
                <div class="right-line" style="height: 50px;">
                  <span style="display: inline-block;width: 60px;vertical-align: top;">序列号:</span>
                  <b style="display: inline-block;width: 180px;word-wrap:break-word;vertical-align: top;">{{issuedNumber}}</b>
                </div>
                <div class="right-line">
                  <span>颁发给:</span>
                  <b>{{companyName}}</b>
                </div>

                <div class="right-line">
                  <span>有效起始时间:</span>
                  <b>{{effectiveStartTime}}</b>
                </div>
                <div class="right-line">
                  <span>有效截止时间:</span>
                  <b>{{effectiveEndTime}}</b>
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

  export default {
    name: 'EnterpriseRegisterSuccs',

    data(){
       return{

       }
    },
    methods:{

    },
    created() {

    }
  }
</script>

<style lang="stylus">
  @import "../../../common/styles/Topes.css";
  @import "../../../common/styles/SigningSteps.css";
  @import "../../../styles/EnterpriseCertificate/EnterprisePayment.styl";
  .right-card{
    background: url('/../../../../static/images/Common/numberCertificate.png') no-repeat 4px 4px;
  }
</style>
