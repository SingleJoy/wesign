<template>
  <div class='Completions'>
    <div class='step' style="width: 720px;">
        <ul>
          <li class="active"><i class='el-icon-document'></i><b>注册</b></li>
          <p></p>
          <li class="active"><i class='el-icon-goods'></i><b>个人认证</b></li>
          <p></p>
          <li class="active"><i class='el-icon-edit'></i><b>企业认证</b></li>
          <p></p>
          <li class="active"><i class='el-icon-menu'></i><b>打款确认</b></li>
          <p></p>
          <li class="active"><i class='el-icon-check'></i><b>完成</b></li>
        </ul>
    </div>
    <div class='container' >
      <!--<h2 class='title1' style='text-align:left;border-top: 1px solid #ddd;padding: 20px 0 0 20px;'>-->
        <!--<img src="../../../../static/images/Confirmation/Enterprise/title.jpg" alt="">-->
      <!--</h2>-->
      <div class='success'>
        <p>
          <img src="../../../../static/images/Confirmation/Payment/pic.jpg" alt="">
        </p>
        <p>恭喜，已完成实名认证！</p>
      </div>
      <div class='centerOne'>
        <div class='center' style="padding-top: 20px;">
          <div class='first'>
            <dl>
              <dd>数字证书</dd>
              <dt><img src="../../../../static/images/Confirmation/Completion/shiming.jpg" alt=""></dt>
            </dl>
            <ul>
              <li>
                <span style="padding-left:40px;text-align: left;">序列号：</span>
                <span class="certificate-num" style="padding-left:25px;">{{certificateNo}}</span>

              </li>
              <li style="width: 300px;">
                <span class="" style="text-align: left;padding-left:40px;">颁发给:</span>
                <span class="certificate-to">{{userName}}</span>
              </li>
              <li  style=" overflow:hidden;text-overflow:ellipsis; white-space:nowrap;display:inline-block;"><span>有效起始日期：</span><span>{{certificateStartTime}}</span></li>
              <li  style=" overflow:hidden;text-overflow:ellipsis; white-space:nowrap;display:inline-block;"><span>有效截至日期：</span><span>{{certificateDueTime}}</span></li>
            </ul>
          </div>
          <div class='twoProuct'>
            <p style="margin-top:37px;">
              <!-- <img :src="[`${this.baseURL.BASE_URL}`+'/v1/tenant/contract/img?contractUrl='+this.signBadgePath]" alt="" style="width:170px;"> -->
               <img :src="['http://testwesign.zqsign.com/restapi/wesign/v1/tenant/contract/img?contractUrl='+this.signBadgePath]" alt="" style='width:170px'>
            </p>
          </div>
          <div style='clear:both;text-align:center;'>
              <router-link to='/'><el-button type="primary" style='width:330px;margin-top:35px;'>返回登录页</el-button></router-link>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Completion',
    data(){
      return{
        certificateNo:'',
        userName:'',
        certificateDueTime:'',
        certificateStartTime:'',
        signBadgePath:''
      }
    },
    methods:{

    },
    created() {
      //显示个人证书信息、企业签章信息
      var interfaceCode = sessionStorage.getItem('interfaceCode')
      interfaceCode = JSON.parse(interfaceCode)
      this.$http.get(process.env.API_HOST+'v1.4/tenant/'+interfaceCode+'/authSuccess').then(response =>{

      if (response.data.resultCode == '1') {
          this.userCode = response.data.userCode //授权人编号
          this.certificateNo = response.data.data.certificateNo //证书编号
          this.userName = response.data.data.username  //授权人用户名
          this.mobile = response.data.data.mobile //证件号(授权人手机号)
          this.certificateDueTime =response.data.data.certificateDueTime //失效有效期
          this.certificateStartTime =response.data.data.certificateStartTime //起始有效期
          this.privateKey = response.data.data.privateKey //私钥
          this.signBadgePath = response.data.data.signBadgePath //签章地址
          } else {
            this.$message({
              showClose: true,
              message: response.data.resultMessage,
              type: 'error'
            })
          }
        })
    }
  }
</script>
<style scoped>
  @import "../../../styles/Confirmation/Completion/Completions.css";
</style>
