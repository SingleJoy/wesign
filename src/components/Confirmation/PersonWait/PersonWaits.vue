<template>
<div>
  <div class="Topes">
    <nav class='nav'>
      <p class='logo'>
        <img src="../../../../static/images/logo2.png" alt="">
      </p>
      <div class='buttons'>

      </div>
    </nav>
  </div>
  <div class='Enterprises'>
    <div class='step'>
      <ul>
        <li class="active"><i class='el-icon-document'></i><b>注册</b></li>
        <p></p>
        <li class="active"><i class='el-icon-goods'></i><b>个人认证</b></li>
        <p></p>
        <li><i class='el-icon-edit'></i><b>企业认证</b></li>
        <p></p>
        <li><i class='el-icon-menu'></i><b>打款确认</b></li>
        <p></p>
        <li><i class='el-icon-check'></i><b>完成</b></li>
      </ul>
    </div>
    <div class='productes'>
      <div class='center'>
        <div class='container'>
          <div class="content-title">
            <ul>
              <li><b style="padding-left: 15px;">证件上传</b></li>
              <li><b>信息确认</b></li>
              <li><b>完成</b></li>
            </ul>
          </div>
          <div class="header-title">

            <div class="title-content">
              <p class="content-img">
                <img src="../../../../static/images/Credentials/Personal/Authentication/checking.png" height="155" width="360"/>
              </p>
              <p class="content-info" >
                <b>你的实名认证申请正在进行人工审核，请耐心等待...</b>
                <br/>
                <br/>
                <span> 预计24小时内给你答复</span>
              </p>
               <router-link to='/'><el-button type="primary" style='width:330px;margin-top: 40px;'>返回登录页</el-button></router-link>
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
    name: 'Authentications',
    data() {
      return {

      }
    }
  }
</script>
<style scoped>
  @import "../../../styles/Confirmation/PersonWait/PersonWait.css";
  @import "../../../common/styles/Topes.css";
  @import "../../../common/styles/SigningSteps.css";
</style>

