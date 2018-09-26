<template>
  <div >
    <div class="Tops" style="position: relative">
      <nav class='nav'>
        <p class='logo'>
          <img src="../../static/images/logo2.png" alt="">
        </p>
      </nav>
    </div>


    <div class="demoAddPerson-content" style="margin-top:20px;"  v-show="step1">
      <div class="step" style="width:720px;">  <!--步骤条 -->
        <ul>
          <li class="active"><i class='el-icon-document'></i><b>上传文件</b></li>
          <p></p>
          <li class="active"><i class='el-icon-goods'></i><b>签署设置</b></li>
          <p></p>
          <li ><i class='el-icon-edit'></i><b>指定位置</b></li>
          <p></p>
          <li><i class='el-icon-menu'></i><b>合同签署</b></li>
          <p></p>
          <li><i class='el-icon-check'></i><b>完成</b></li>
        </ul>
      </div>
      <div class="step-modal" >
        <div class="direction"></div>
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
      </div>



    </div>

    <div class="demoAddPerson-content" style="margin-top: 100px;"  v-show="step2">
      <div class="step" style="width:720px;">  <!--步骤条 -->
        <ul>
          <li class="active"><i class='el-icon-document'></i><b>上传文件</b></li>
          <p></p>
          <li class="active"><i class='el-icon-goods'></i><b>签署设置</b></li>
          <p></p>
          <li ><i class='el-icon-edit'></i><b>指定位置</b></li>
          <p></p>
          <li><i class='el-icon-menu'></i><b>合同签署</b></li>
          <p></p>
          <li><i class='el-icon-check'></i><b>完成</b></li>
        </ul>
      </div>

      <div class="step-modal2"  style="z-index: 1001;">


      </div>


      <div class="person-dialog">

      </div>

      <div class="poninter">

      </div>

      <div class="step2-dialog">

        <div class="demo-btn" style="margin-top: 90px;">
          <a href="javascript:void(0);" @click="lastStep" class="last">上一步</a>
          <a href="javascript:void(0);" @click="nextStep" class="next">下一步</a>
        </div>
      </div>


    </div>

    <Bottom></Bottom>
    <div class="modal"></div>
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
       step1:true,
       step2:false

      }
    },
    methods: {
     lastStep(){
       this.$router.push("/")
     },
      nextStep(){

        this.step1=false;
        this.step2=true;
      }

    },
    created() {

    }
  }
</script>
<style scoped>

  @import "../common/styles/Tops.css";
  @import "../common/styles/SigningSteps.css";


  .demoAddPerson-content{
    width: 1200px;
    margin: 20px auto;
    background-color: #fff;
    position: relative;

  }
  .modal{
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

  .step-modal{
    width: 1200px;
    height: 550px;
    position: relative;
    z-index: 1002;
    background: url("../../static/images/Demo/addPerson.png") no-repeat;
    margin-top: 20px;
  }
  .step-modal2{
    width: 1200px;
    height: 550px;
    position: relative;
    z-index: 1002;
    background: url("../../static/images/Demo/addPerson.png") no-repeat;
  }

  .step-modal>.direction{
    width: 320px;
    height: 150px;
    z-index: 1002;
    position: absolute;
    left: 530px;
    top: -60px;
    background: url("../../static/images/Demo/nextStep.png") no-repeat;
  }
  .person-dialog{
    width: 400px;
    height: 320px;
    z-index: 1002;
    position: absolute;
    left: 240px;
    top: 520px;
    background: url("../../static/images/Demo/demo-addperson-dialog.png") no-repeat;
  }
  .step-modal>.expression{
    width: 110px;
    height: 120px;
    z-index: 1002;
    position: absolute;
    left: 855px;
    top: -80px;
    background: url("../../static/images/Demo/expression.png") no-repeat;
  }
  .step-modal>.dialog{
    width: 305px;
    height: 200px;
    z-index: 1001;
    position: absolute;
    left: 900px;
    top: -190px;

    background: url("../../static/images/Demo/dialog.png") no-repeat;
  }
  .step-modal>.dialog>p{

    padding:20px 15px;
    text-align: center;
    color: #fff;
    font-size: 16px;
    line-height: 25px;
  }
  .step-modal>.dialog>.demo-btn>a,.step2-dialog>.demo-btn>a{
    width: 120px;
    height: 40px;
    display: inline-block;
    font-size: 16px;
    line-height: 40px;
    text-align: center;
    border-radius: 10px;
  }
  .step-modal>.dialog>.demo-btn>a.last,.step2-dialog>.demo-btn>a.last{
    border: 2px solid #fff;
    color: #fff;
    margin-left:30px;
  }
  .step-modal>.dialog>.demo-btn>a.next,.step2-dialog>.demo-btn>a.next{
    background-color: #fff;
    color: #22a7ea;
    margin-left: 10px;

  }
  .step2-dialog{
    width: 305px;
    height: 200px;
    z-index: 1002;
    position: absolute;
    left: 760px;
    top: 600px;
    background: url("../../static/images/Demo/dialog.png") no-repeat;
  }
  .poninter{
    width: 95px;
    height: 67px;
    z-index: 1002;
    position: absolute;
    left: 650px;
    top: 670px;
    background: url("../../static/images/Demo/pointer.png") no-repeat;
  }
</style>


