<template>
  <div>
    <div class="Topes">
      <nav class='nav'>
        <p class='logo'>
          <img src="/static/images/logo2.png" alt="">
        </p>

      </nav>
    </div>
    <div class="EnterpriseRegisterSuccs">
      <div class="step" style="width:420px;">
        <ul>

          <li class="active"><i class='el-icon-goods'></i><b>实名认证</b></li>
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
              <img src="/static/images/Common/contract-sign-success.png" alt="" style="margin-top: 10px;">
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
          <div class="left-side enterprise-certification">

            <div class="right-card-content">
              <div class="right-line" style="height: 50px;">
                <span style="display: inline-block;width: 60px;vertical-align: top;">证书编号:</span>
                <b style="display: inline-block;width: 180px;word-wrap:break-word;vertical-align: top;">{{certificateNo}}</b>
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
          <div class="right-side certification-bg">

            <div class="right-content ">
              <img :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractUrl='+signBadgePath" alt="" >

            </div>
          </div>
        </div>

      </div>

      <div class="certification-book">
         <div class="bg-png"></div>
         <div class="download">
           <p class="tips">企业实名完成<span v-if="adminType">《一般企业认证授权书》</span><span v-else>《法人说明函》</span>已经生效，<span>您已正式成为{{enterpriseName}}企业账号管理员</span></p>
           <p class="down-btn"><a href="javascript:void(0);" @click="download">点击下载</a></p>
         </div>
      </div>
      <div style="text-align: center;
    background: #4091fb;
    padding: 10px 20px;
    width: 200px;
    margin: 0 auto;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;" @click="returnIndex">返回首页</div>

    </div>
  </div>


</template>
<script>
  import server from '@/api/url.js'
   import cookie from '@/common/js/getTenant'
  export default {
    name: 'EnterpriseRegisterSuccs',

    data(){
      return{
        baseURL:this.baseURL.BASE_URL,
        certificateNo:'',
        companyName:'',
        effectiveStartTime:'',
        effectiveEndTime:'',
        enterpriseName:'' ,
        interfaceCode:cookie.getJSON("tenant")?cookie.getJSON("tenant")[1].interfaceCode:'',
        signBadgePath:'',
        downloadUrl:'',
        adminType:true, //true是法人   false是被授权人
      }
    },
    methods:{
      download(){
        let way = this.downloadUrl;
        let url = process.env.API_HOST+'v1.4/tenant/downloadFile?fileType='+way;
        let up = document.createElement('a');
        document.body.appendChild(up)
        up.setAttribute('href',url);
        up.click()
      },
      returnIndex(){
          this.$router.push("/Home")
      },
    },
    created() {
      let adminType=sessionStorage.getItem('authorizerType')
      if(adminType=='0'){
        this.adminType=false
      }else {
        this.adminType=true
      }
      server.authSuccess(this.interfaceCode).then(response =>{

        if (response.data.resultCode == '1') {
          // this.issuedNumber = response.data.userCode //授权人编号
          this.certificateNo = response.data.data.certificateNo //证书编号
          this.companyName = response.data.data.username  //授权人用户名
          // this.mobile = response.data.data.mobile //证件号(授权人手机号)

          this.effectiveEndTime =response.data.data.certificateDueTime //失效有效期
          this.effectiveStartTime =response.data.data.certificateStartTime //起始有效期

          this.signBadgePath = response.data.data.signBadgePath //签章地址
          this.downloadUrl = response.data.data.authorizationPhoto
        } else {
          this.$message({
            showClose: true,
            message: response.data.resultMessage,
            type: 'error'
          })
        }
      })

        let param={
            mobile:sessionStorage.getItem('mobile')
        };
        let urlParam = sessionStorage.getItem('interfaceCode')
        server.login(param,urlParam).then(res => {
        cookie.set("tenant", res.data.dataList);  //更新cookie

        })
    }
  }
</script>

<style lang="stylus">
  @import "../../../common/styles/Topes.css";
  @import "../../../common/styles/SigningSteps.css";
  @import "../../../styles/EnterpriseCertificate/EnterprisePayment.styl";
  @import "../../../../static/icon/iconfont.css";
  .enterprise-certification{
    background: url('/../../../../static/images/Common/numberCertificate.png') no-repeat 4px 4px;
  }
  .certification-bg{
    background: url('/../../../../static/images/EnterpriseRegister/certification1.png') no-repeat;
  }
  .certification-book>.bg-png{
    background: url('/../../../../static/images/EnterpriseRegister/certification-book.png') no-repeat;
  }
</style>
