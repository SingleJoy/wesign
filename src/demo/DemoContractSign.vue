<template>
  <div >
    <div class="Tops" style="position: relative">
      <nav class="nav">
        <p class="logo">
          <img src="../../static/images/logo2.png" alt="">
        </p>
      </nav>
    </div>


    <div class="demoTemplateFill-content" style="margin-top:20px;" >

      <div class="step-modal" >

      </div>

      <div class="demo-sign-operate" @click="handlerShowSeal">

      </div>
      <div class="demo-seal" v-show="showSeal">
        <img src="../../static/images/Demo/demo-seal.png">
      </div>

      <div class="template-contract"></div>

      <div class="template-fill-info">
        <div class="pointer"></div>
        <div class="expression"></div>
        <div class="dialog">
          <p>点击签署将会在预先指定的位置上<br/>加盖企业公章

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
    name: 'DemoAddPerson',
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
        this.$router.push("/DemoAddPerson")
      },
      nextStep(){
        this.$router.push("/DemoSuccess")

      },
      handlerShowSeal(){
        this.showSeal=true
      }

    },
    created() {

    }
  }
</script>
<style scoped>

  @import "../common/styles/demo/DemoTops.css";
  @import "../common/styles/demo/DemoSigningSteps.css";

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
  .demo-sign-operate{
    width: 135px;
    height: 131px;
    z-index: 1005;
    position: absolute;
    background: url("../../static/images/Demo/demo-sign-operate.png") no-repeat;
    left: 940px;
    top: 240px;
    cursor: pointer;
  }

  .demo-seal{
    width: 214px;
    height: 196px;
    z-index: 1004;
    position: absolute;
    background: url("../../static/images/Demo/demo-seal.png") no-repeat;
    left: 650px;
    top: 280px;
  }
  .direction{
    width: 320px;
    height: 150px;
    z-index: 1002;
    position: absolute;
    left: 530px;
    top: -60px;
    background: url("../../static/images/Demo/nextStep.png") no-repeat;
  }
  .step-modal{
    width: 1200px;
    height: 1100px;
    position: relative;
    z-index: 1001;
    background: url("../../static/images/Demo/template-contract2.png") no-repeat;
    margin-top: 20px;
  }
  .demoTemplateFill-content >.template-contract{
    width: 908px;
    height: 821px;
    z-index: 1002;
    position: absolute;
    left: 258px;
    top: 230px;
    /*background: url("../../static/images/Demo/contract02.png") no-repeat;*/
    background: url("../../static/images/Demo/demo-detail03.jpg") no-repeat;
  }

  .template-fill-info{
    position: absolute;
    top:460px;
    left: 840px;
    z-index: 1003;
  }
  .template-fill-info>.expression{
    width: 110px;
    height: 120px;
    z-index: 1004;
    position: absolute;
    background: url("../../static/images/Demo/expression.png") no-repeat;
    left: 245px;
    top:115px
  }
  .template-fill-info>.dialog{
    width: 305px;
    height: 200px;
    position: absolute;
    background: url("../../static/images/Demo/dialog.png") no-repeat;
  }
  .template-fill-info>.dialog>p{
    padding:20px 15px;
    text-align: center;
    color: #fff;
    font-size: 16px;
    line-height: 25px;
  }
  .template-fill-info>.dialog>.demo-btn>a{
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
  .template-fill-info>.dialog>.demo-btn>a.last{
    border: 2px solid #fff;
    color: #fff;
    margin-left:30px;
  }
  .template-fill-info>.dialog>.demo-btn>a.next{
    background-color: #fff;
    color: #4091fb;
    margin-left: 10px;

  }
  .pointer{
    width: 95px;
    height: 67px;
    z-index: 1002;
    position: absolute;
    left: 130px;
    top:-85px;
    background: url("../../static/images/Demo/pointer-up.png") no-repeat;
  }
  .fill-in-blank{
    width: 249px;
    height: 46px;
    left: 870px;
    z-index: 1003;
    position: absolute;
    background: url("../../static/images/Demo/information-input.png") no-repeat ;
    border-radius: 5px;
  }

</style>


