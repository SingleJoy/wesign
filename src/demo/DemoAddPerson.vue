<template>
  <div >
    <div class="Tops" style="position: relative">
      <nav class='nav'>
        <p class='logo'>
          <img src="../../static/images/logo2.png" alt="">
        </p>
      </nav>
    </div>

    <div class="demoAddPerson-container" style="margin-top:20px;" >

      <div class="step-modal" >
        <div style="position: absolute;left: 500px;top:-120px;">

          <div class="expression"></div>
          <div class="dialog">
            <p>点击这里添加需要签约的签署人，<br/>
              不需要添加自己哦~~
            </p>
            <div class="demo-btn">
              <a href="javascript:void(0);" @click="lastStep" class="last">上一步</a>
              <a href="javascript:void(0);" @click="nextStep" class="next">下一步</a>
            </div>
          </div>
          <div class="pointer">

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

      }
    },
    methods: {
      lastStep(){
        this.$router.push("/DemoTemplateFill")
      },
      nextStep(){
        this.$router.push("/DemoContractSign")
      }

    },
    created() {

    }
  }
</script>
<style scoped>
  @import "../common/styles/demo/DemoTops.css";
  @import "../common/styles/demo/DemoSigningSteps.css";


  .demoAddPerson-container{
    width: 1200px;
    margin: 20px auto;
    height: 600px;
    position: relative;
    background:url("../../static/images/Demo/addPerson.png") no-repeat;

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

  .demoAddPerson-container> .step-modal{
    width: 1200px;
    height: 550px;
    position: relative;
    z-index: 1002;
    background: url("../../static/images/Demo/addPerson1.png") no-repeat;
    top: 200px;
  }


  .step-modal .direction{
    width: 320px;
    height: 150px;
    z-index: 1002;
    position: absolute;
    left: 20px;
    top:100px;
    background: url("../../static/images/Demo/nextStep.png") no-repeat;
  }
  .person-dialog{
    width: 400px;
    height: 320px;
    z-index: 1002;
    position: absolute;
    left: 20px;
    top:100px;
    background: url("../../static/images/Demo/demo-addperson-dialog.png") no-repeat;
  }
  .step-modal .expression{
    width: 110px;
    height: 120px;
    z-index: 1002;
    position: absolute;
    left: 300px;
    top:100px;
    background: url("../../static/images/Demo/expression.png") no-repeat;
  }
  .step-modal .dialog{
    width: 305px;
    height: 200px;
    z-index: 1001;
    position: absolute;
    left: 375px;
    background: url("../../static/images/Demo/dialog-right.png") no-repeat;
  }

  .step-modal .pointer{
    width: 66px;
    height: 95px;
    z-index: 1002;
    position: absolute;
    left: 610px;
    top:200px;
    background: url("../../static/images/Demo/pointer-blue.png") no-repeat;
  }
  .step-modal .dialog>p{

    padding:20px 15px;
    text-align: center;
    color: #fff;
    font-size: 16px;
    line-height: 25px;
  }
  .step-modal .dialog>.demo-btn>a,.step2-dialog>.demo-btn>a{
    width: 120px;
    height: 40px;
    display: inline-block;
    font-size: 16px;
    line-height: 40px;
    text-align: center;
    border-radius: 10px;
  }
  .step-modal .dialog>.demo-btn>a.last,.step2-dialog .demo-btn>a.last{
    border: 2px solid #fff;
    color: #fff;
    margin-left:30px;
  }
  .step-modal .dialog>.demo-btn>a.next,.step2-dialog .demo-btn>a.next{
    background-color: #fff;
    color: #4091fb;
    margin-left: 10px;

  }

</style>


