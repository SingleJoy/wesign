<template>
  <div >
    <div class="Tops" style="position: relative">
      <nav class='nav'>
        <p class='logo'>
          <img src="../../static/images/logo2.png" alt="">
        </p>

      </nav>
    </div>


    <div class="demoSuccess-content" style="margin-top: 20px;height: 1250px;" >
      <div class="step" style="width:720px;">  <!--步骤条 -->
        <ul>
          <li class="active"><i class='el-icon-document'></i><b>上传文件</b></li>
          <p></p>
          <li class="active"><i class='el-icon-goods'></i><b>签署设置</b></li>
          <p></p>
          <li class="active"><i class='el-icon-edit'></i><b>指定位置</b></li>
          <p></p>
          <li class="active"><i class='el-icon-menu'></i><b>合同签署</b></li>
          <p></p>
          <li class="active"><i class='el-icon-check'></i><b>完成</b></li>
        </ul>
      </div>
      <div class="demoSuccess-img">

      </div>
      <div class="step-modal" >

        <div class="expression"></div>
        <div class="dialog">
          <p>合同发起完成啦！<br/>
            您可以扫描【链接二维码】完成签署体验。
            也可以点击【立即注册】成为微签用户，
            完成实名认证即送10次发起签约次数!
          </p>
          <div class="demo-btn">
            <a href="javascript:void(0);" @click="experienceAgain" class="last">再次体验</a>
            <a href="javascript:void(0);" @click="initiatingContract" class="next">立即注册</a>
          </div>
        </div>
      </div>

      <!--<div class="demo-sign-success">-->

      <!--</div>-->

      <div class="sign-success-tips">
        <p>  https:www.zqsign.com</p>
        <div class="scan-code">
          <img src="../../static/images/Demo/demo-scan.png">
        </div>
      </div>



       <div class="look-detail">
         <a href="javascript:void(0);">查看详情</a>
       </div>
    </div>


    <Bottom></Bottom>
    <div class="demo-modal"></div>
  </div>

</template>
<script>
  import Bottom from '@/common/components/Bottom'

  import {prohibit} from '@/common/js/prohibitBrowser'
  export default {
    name: 'DemoSuccess',
    components:{
      Bottom
    },
    data() {
      return {


      }
    },
    methods: {
      experienceAgain(){
        this.$router.push("/DemoHome")
      },
      initiatingContract(){

        this.$router.push("/IndividualRegister")
      }

    },
    created() {

    }
  }
</script>
<style scoped>

  @import "../common/styles/demo/DemoTops.css";
  @import "../common/styles/demo/DemoSigningSteps.css";
  .demoSuccess-content>.step-modal> .expression{
    width: 110px;
    height: 120px;
    z-index: 1004;
    position: absolute;
    background: url("../../static/images/Demo/expression.png") no-repeat;
    left: 1100px;
    top:420px
  }

  .demoSuccess-content{
    width: 1200px;
    margin: 20px auto;
    background-color: #fff;
    position: relative;

  }
  .demo-modal{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 1001;
    background: rgba(0, 0, 0, 0.5);
    overflow-x: hidden;
    overflow-y: auto;
  }
  .demoSuccess-content> .step-modal>.direction{
    width: 320px;
    height: 150px;
    z-index: 1002;
    position: absolute;
    left: 530px;
    top: 235px;
    background: url("../../static/images/Demo/nextStep.png") no-repeat;
  }

  .demoSuccess-img{
    width: 902px;
    height: 1041px;
    z-index: 1002;
    position: absolute;
    left: 100px;
    top: 180px;
    background: url("../../static/images/Demo/demo-sign-success1.png") no-repeat;
  }
  .demoSuccess-content>.step-modal>.dialog{
    width: 310px;
    height: 200px;
    z-index: 1002;
    position: absolute;
    left: 790px;
    top: 320px;

    background: url("../../static/images/Demo/dialog.png") no-repeat;
  }
  .demoSuccess-content>.step-modal>.dialog>p{

    padding:10px 15px;
    text-align: left;
    color: #fff;
    font-size: 14px;
    line-height: 25px;
  }
  .demoSuccess-content>.step-modal>.dialog>.demo-btn{
   margin-left: 20px;

  }
  .demoSuccess-content>.step-modal>.dialog>.demo-btn>a,.step2-dialog>.demo-btn>a{
    width: 90px;
    height: 30px;
    display: inline-block;
    font-size: 14px;
    line-height: 30px;
    text-align: center;
    border-radius: 10px;
  }
  .demoSuccess-content>.step-modal>.dialog>.demo-btn>a.last,.step2-dialog>.demo-btn>a.last{
    border: 2px solid #fff;
    color: #fff;
    margin-left:30px;
  }
  .demoSuccess-content>.step-modal>.dialog>.demo-btn>a.next,.step2-dialog>.demo-btn>a.next{
    background-color: #fff;
    color: #4091fb;
    margin-left: 10px;

  }
  .demo-sign-success{
    width: 1160px;
    height: 250px;
    z-index: 1002;
    position: absolute;
    left: 20px;
    top: 500px;
    background: url("../../static/images/Demo/demo-sign-success1.png") no-repeat;
  }
 .look-detail>a{
   position: relative;
   margin: 620px auto 0 auto;
   display: block;
   width: 300px;
   height: 40px;
   text-align: center;
   line-height: 40px;
   background-color: #4091fb;
   color: #fff;
   font-size: 16px;
   border-radius: 5px;
 }
  .sign-success-tips{
    z-index: 1002;
    left: 715px;
    top:665px;
    position: absolute;

  }
  .sign-success-tips>p{
    color: #666;
    font-size: 14px;
  }
  .sign-success-tips>.scan-code {

    margin-top: 10px;
  }

  .sign-success-tips>.scan-code>img{
    width: 120px;
    height: 120px;
  }


</style>


