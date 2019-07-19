<template>
  <div class="Version">
    <div id="dialog">
        <div class="box">
            <img :src="baseURL+'/img/version-info1.7.3.png'" alt="">
            <div class="box-container">
            <a href="javascript:void(0);" id='close' @click='closes'>X</a>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

  export default {
    name:'Version',
    props: ['message'],
    data() {
      return {
        baseURL:this.baseURL.BASE_URL,
      }
    },
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
        background: #000;
        background: rgba(0, 0, 0, 0.6);
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        z-index: 1999;
      }
  .box {
        width:529px;
        height: 417px;
        background-size: 100% 100%;
        position: absolute;
        left:0;
        top:0;
        right: 0;
        bottom:0;
        margin: auto;
      img{
        width:100%;
        height: 100%;
      }
      
     .box-container a{
       position: absolute;
       right:0;
       top:0px;
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
