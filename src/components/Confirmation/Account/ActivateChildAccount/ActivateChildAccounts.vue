<template>

  <div class="ActivateChildAccounts">

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
                <img src="../../../../../static/images/Default/contract-img.jpg">
              </div>

              <div class="scan-code">

                <el-tooltip class="item" effect="dark" content="微信扫一扫" placement="top">
                  <img src="../../../../../static/images/Default/default-scan-code.png" alt="微信扫一扫"  class="wechat-img">
                </el-tooltip>
                <div class="wechat-scan-tips">
                  请用微信扫一扫上<br/>
                  方二维码完成签署
                </div>



              </div>

              <div class="active-button">
                <a class="sure-active"  @click="sureBtn" href="javascript:void(0)">确认激活</a>
              </div>

            </div>

          </div>


        </div>

      </div>
    </div>
  </div>
</template>



<script>
  import Accounts from '../Accounts'
  export default {
    component:{
      Accounts
    },
    data() {
      return {

      }
    },
    methods:{
      sureBtn(){

      },
    }
  }
</script>
<style lang="stylus">
  @import "../../../../styles/Confirmation/Account/ChildAccount.styl";
  .content-body>p.title{
    background: url("../../../../../static/images/Common/title.png") no-repeat;
  }
</style>
