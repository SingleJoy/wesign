<template>
  <div >

    <div class="Top">
      <nav class='nav'>
        <p class='logo'>

          <img src="/static/images/Top/v1.6-logo.png" alt="logo图">
        </p>

      </nav>
    </div>



    <div class="demoTemplateFill-content" style="margin-top:20px;" >

      <div class="step-modal" >

      </div>
      <div class=" demo-detail">
         <img src="/static/images/Demo/demo-detail04.jpg">

      </div>

      <div class="template-contract">
        <img class="fill-info-right" src="/static/images/Demo/fill-info-right.png">
      </div>

      <div class="template-fill-info">
        <!--<div class="pointer"></div>-->
        <div class="expression"></div>
        <div class="dialog">
          <p>  模板中的参数可根据您的要求定义<br/>
            模板和参数组成一份完整的合同
          </p>
          <div class="demo-btn">
            <a href="javascript:void(0);" @click="lastStep" class="last">上一步</a>
            <a href="javascript:void(0);" @click="nextStep" class="next">下一步</a>
          </div>
        </div>
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
    name: 'DemoTemplateFill',
    components:{
      Bottom
    },
    data() {
      return {
        showSeal:false

      }
    },
    methods: {
      lastStep(){
        this.$router.push("/DemoTemplateList")
      },
      nextStep(){

        this.$router.push("/DemoAddPerson")


      },


    },
    created() {

    }
  }
</script>
<style scoped>

  .demoTemplateFill-content{
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

  .demo-seal{
    width: 214px;
    height: 196px;
    z-index: 1004;
    position: absolute;
    background: url("/static/images/Demo/demo-seal.png") no-repeat;
    left: 500px;
    top: 530px;
  }
  .direction{
    width: 320px;
    height: 150px;
    z-index: 1002;
    position: absolute;
    left: 530px;
    top: -60px;
    background: url("/static/images/Demo/nextStep.png") no-repeat;
  }
  .demoTemplateFill-content .step-modal{
    width: 1200px;
    height: 1100px;
    position: relative;
    z-index: 1001;
    background: url("/static/images/Demo/template-contract4.png") no-repeat;
    margin-top: 20px;
  }
  .fill-info-right{
    position: absolute;
    left: 625px;
    z-index: 1003;
  }
  .demo-detail{
    width: 616px;
    height: 820px;
    z-index: 1003;
    position: absolute;
    left: 258px;
    top: 230px;
    overflow: hidden;
  }
  .template-contract{
    width: 908px;
    height: 821px;
    z-index: 1002;
    position: absolute;
    left: 258px;
    top: 230px;


  }

  .demoTemplateFill-content .template-fill-info{
    position: absolute;
    top:45px;
    left:850px;
    z-index: 1003;
  }
  .demoTemplateFill-content .template-fill-info>.expression{
    width: 110px;
    height: 120px;
    z-index: 1004;
    position: absolute;
    background: url("/static/images/Demo/expression.png") no-repeat;
    left: 275px;
    top:90px
  }
 .demoTemplateFill-content  .template-fill-info>.dialog{
    width: 305px;
    height: 200px;
    position: absolute;
    background: url("/static/images/Demo/dialog.png") no-repeat;
  }
  .demoTemplateFill-content .template-fill-info>.dialog>p{
    padding:20px 15px;
    text-align: center;
    color: #fff;
    font-size: 16px;
    line-height: 25px;
  }
  .demoTemplateFill-content .template-fill-info>.dialog>.demo-btn>a{
    position: relative;
    width: 120px;
    height: 40px;
    display: inline-block;
    font-size: 16px;
    line-height: 40px;
    text-align: center;
    border-radius: 10px;
    z-index: 1005;
  }
 .demoTemplateFill-content .template-fill-info>.dialog>.demo-btn>a.last{
    border: 2px solid #fff;
    color: #fff;
    margin-left:30px;
  }
 .demoTemplateFill-content .template-fill-info>.dialog>.demo-btn>a.next{
    background-color: #fff;
    color: #4091fb;
    margin-left: 10px;

  }
  .pointer{
    width: 95px;
    height: 67px;
    z-index: 1002;
    position: absolute;
    left: 230px;
    top:-85px;
    background: url("/static/images/Demo/pointer.png") no-repeat;
  }

  .Top {
    width: 100%;
    height: 80px;
    background: #4091fb;
    overflow: hidden;
  }

  .Top .nav{
    width: 1200px;
    margin: 0 auto;
    height: 80px;
    overflow:hidden;
  }
  .Top .nav .logo{
    float: left;
    margin-right: 40px;
  }
  .Top .nav .logo img{
    margin-top: 18px;
  }



</style>


