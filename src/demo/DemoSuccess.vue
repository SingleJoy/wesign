<template>
  <div >
    <div class="Tops" style="position: relative">
      <nav class='nav'>
        <p class='logo'>
          <img src="../../static/images/logo2.png" alt="">
        </p>

      </nav>
    </div>

    <div class="demoSuccess-content"  >

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


      <div class="sign-success-tips">
        <p>  https://www.zqsign.com/h5/#/DemoLogin</p>
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

        this.$router.push("/Register")
      }

    },
    created() {

    }
  }
</script>
<style scoped>
  .demoSuccess-content{
    width: 1200px;
    clear: both;
    margin: 20px auto;
    position: relative;
    height: 1100px;
    /*background-color: #fff;*/
    background: url("../../static/images/Demo/demo-succ.png") no-repeat;
  }
  .demoSuccess-content>.step-modal> .expression{
    width: 110px;
    height: 120px;
    z-index: 1004;
    position: absolute;
    background: url("../../static/images/Demo/expression.png") no-repeat;
    left: 1100px;
    top:420px
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
    background: url("../../static/images/Demo/demo-sign-success02.png") no-repeat;
  }
  .demoSuccess-content>.step-modal>.dialog{
    width: 335px;
    height: 234px;
    z-index: 1002;
    position: absolute;
    left: 790px;
    top: 320px;

    background: url("../../static/images/Demo/dialog-big.png") no-repeat;
  }
  .demoSuccess-content>.step-modal>.dialog>p{

    padding:20px 15px;
    text-align: left;
    color: #fff;
    font-size: 16px;
    line-height: 25px;
  }
  .demoSuccess-content>.step-modal>.dialog>.demo-btn{
   margin-left: 10px;

  }
  .demoSuccess-content>.step-modal>.dialog>.demo-btn>a,.step2-dialog>.demo-btn>a{
    width: 120px;
    height: 40px;
    display: inline-block;
    font-size: 16px;
    line-height: 40px;
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
    position: relative;
    margin-left: 725px;
    top: 625px;
    z-index: 1003;
    }
  .sign-success-tips>p{
    color: #666;
    font-size: 14px;
  }
  .sign-success-tips>.scan-code {

    margin-top: 15px;
  }

  .sign-success-tips>.scan-code>img{
    width: 100px;
    height: 100px;
  }


</style>


