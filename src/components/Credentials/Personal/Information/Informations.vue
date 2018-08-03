<template>
  <div class='Informations'>
    <div class="Topes">
      <nav class='nav'>
        <p class='logo'>
          <img src="../../../../../static/images/logo2.png" alt="">
        </p>
      </nav>
    </div>
    <div class='contents'>
     <div class='step' style="width: 720px;">
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
    <div style="width: 100%;border-top: 1px solid #ddd;margin-bottom:20px;"></div>
    <div class='productes'>
      <div class='center'>
        <div class='container'>
          <div class="content-title">
            <ul>
              <li><b>证件上传</b></li>
              <li><b>信息确认</b></li>
              <li><b>完成</b></li>
            </ul>
            <p class='personInfo'>
              <!-- <span>对不起！您的实名未通过</span> -->
              <span style='color:#22a7ea'>证件上传完成</span>
            </p>
          </div>
          <div class="header-title-4" style="padding:20px;background: #fafafa;">
            <div class='personUpload' style="background: #fff;height: 370px;">
              <p class="personUpload-p"><span></span><b>确认信息</b></p>
              <div class='leftInfo'>
                <h2>请确认上传信息是否正确</h2>
                <p><i style='font-style:normal'>姓名：</i><b ref='user'>{{name}}</b></p>
                <p><i style='font-style:normal'>身份证号：</i><b ref='idcode'>{{idcard}}</b></p>
              </div>
              <p class='textInfo'>温馨提示:上传单张图片大小应小于2M，可支持JPEG.JPG.PNG格式图片</p>
            </div>



            </div>
          <div class='btns' style='clear:both;width: 740px;margin: 30px auto;'>
            <router-link to='/Pupload'><el-button type="primary" style='width:200px;margin-right:10px;' >重新上传</el-button></router-link>
            <el-button type="primary" style='width:200px'  @click='submitInfo' :disabled =enjoin  >提&nbsp;&nbsp;交</el-button>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
 @import "../../../../styles/Credentials/Personal/Information/Informations.css";
 @import "../../../../common/styles/Topes.css";
</style>
<script>
  import {prohibit} from '@/common/js/prohibitBrowser'
  export default {
    name: 'Informations',
    data () {
      return {
        name:'',
        idcard:'',
        falg:false,
        enjoin:false,
      }
    },
    mounted() {
      prohibit()
    },
    methods:{
      submitInfo () {
          var userCode =sessionStorage.getItem('userCode')
          userCode = JSON.parse(userCode)
          var mobile = sessionStorage.getItem('mobile')
          mobile = JSON.parse(mobile)
          var interfaceCode = sessionStorage.getItem('interfaceCode')
          interfaceCode = JSON.parse(interfaceCode)
          if(this.falg == false){
          this.falg = true
          this.$http.post(process.env.API_HOST+'v1.4/user/'+userCode+'/authentication',{'userName':this.name,'mobile':mobile,'idCard':this.idcard,'interfaceCode':interfaceCode},{emulateJSON: true}).then(res =>{
            if(res.data.resultCode == '1'){
              this.$message({
                showClose: true,
                message: res.data.resultMessage,
                type: 'success'
              })
              this.$router.push('/Authentication')
            } else {
              this.$message({
                showClose: true,
                message: '验证不通过，请点击重新上传！！！',
                type: 'error'
              })
              this.falg = false
              this.enjoin = true
            }
          })
        }
      }
    },
    created() {
      var idcard =sessionStorage.getItem('idcard')
      var name =sessionStorage.getItem('name')
      this.name = name
      this.idcard = idcard
    }
  }
</script>
