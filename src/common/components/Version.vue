<template>
  <div class="Version">
    <div id="dialog">
      <div class="box">
        <div class="box-container">
          <a href="javascript:void(0);" id='close' @click='closes'>X</a>
        </div>
        <div class="box-text">
          <h4>1.全新定义计费方式，完成实名即送十份合同</h4>
          <h4>2.账单自动生成，对账更方便</h4>
          <h4>3.新增在线电子发票，开票更快捷</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name:'Version',
    props: ['message'],
    methods:{
      closes(){
        this.showVersion=false;
        this.$emit("closeVersion",this.showVersion)

      }
    }
  }
</script>
<style lang="scss" scoped>
  .Version{
     #dialog{
      width:100%;
      height: 100%;
      position: absolute;
      z-index:1000;
      background-color:rgba(0,0,0,0.5);
      top:0;
      left:0;
      right:0;
      bottom:0;
      margin:auto;
      }
  .box{
      width:529px;
      height: 417px;
      background:url('/static/images/Top/version-info1.6.2.png') no-repeat;
      background-size: 100% 100%;
      position: absolute;
      left:0;
      top:0;
      right: 0;
      bottom:0;
      margin: auto;
     .box-container a{
       position: absolute;
       right:0;
       top:10px;
       width:30px;
       height: 30px;
       color:#fff;
        background:#ccc;
        border-radius:50%;
        text-align:center;
       line-height:30px;
      }
      .box-text{
        margin-top:250px;
        padding-left: 70px;
        h4{
          color: #666;
          font-size: 16px;
          line-height: 32px;
          font-weight: normal;
          font-family: "微软雅黑";
        }
      }
    }


  }

</style>
