<template>
<div>
  <div class="Topes">
    <nav class='nav'>
      <p class='logo'>
        <img src="../../../../../static/images/logo2.png" alt="">
      </p>
      <div class='buttons'>

      </div>
    </nav>
    </div>
  <div class='Enterprises'>
    <div class='step' style="width:720px;">
      <ul>
        <li class="active"><i class='el-icon-document'></i><b>注册</b></li>
        <p></p>
        <li class="active"><i class='el-icon-goods'></i><b>个人认证</b></li>
        <p></p>
        <li ><i class='el-icon-edit'></i><b>企业认证</b></li>
        <p></p>
        <li ><i class='el-icon-menu'></i><b>打款确认</b></li>
        <p></p>
        <li ><i class='el-icon-check'></i><b>完成</b></li>
      </ul>
    </div>
    <div class='productes'>
      <div class='center'>
        <div class='container'>
          <div class="header-title-5">
            <div class="title-content">
              <p class="content-img">
                <img src="../../../../../static/images/Credentials/Personal/Authentication/authentication.png" height="100" width="100"/>
              </p>
              <p class="content-info" >
                <b>恭喜，您已完成实名认证</b>
                <br/>
                <br/>
                 <span >{{num}}秒后自动跳转企业认证</span>
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
</template>
<script>
  import {prohibit} from '@/common/js/prohibitBrowser'
  export default {
    name: 'Authentication',
    data() {
      return {
        num:3
      }
    },
    mounted() {
      prohibit()
    },
    created() {
    var timer = null
     var that = this
      timer = setInterval(function () {
          that.num--
          if(that.num == 0){
            clearInterval(timer)
            that.$router.push('/Enterprise')
          }
      }, 1000)
    }
  }
</script>
<style scoped>
  @import "../../../../styles/Credentials/Personal/Authentication/Authentication.css";
  @import "../../../../common/styles/Topes.css";
</style>

