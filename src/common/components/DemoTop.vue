<template>
  <div class="Top">
    <nav class='nav'>
      <p class='logo'>
        <img src="/static/images/Top/v1.6-logo.png" alt="logo图">
      </p>
      <ul id='ul' style="display: inline-block;">
        <li :class="{'active-tab':tabIndex==1}"><a href="javascript:void(0);">首页</a></li></router-link>
        <li ><a href="javascript:void(0);">我的合同</a></li></router-link>
        <li ><a href="javascript:void(0);">我的模板</a></li></router-link>
        <li ><a href="javascript:void(0);">签约室</a></li></router-link>
        <li  style='color:#fff;cursor:pointer;font-size:16px;'>版本</li>
        <!--<li><a href="javascript:void(0);" style="background: #fff; border-radius: 5px; padding: 14px;border: none;-->
        <!--color: #4091fb;font-weight: 500;margin-right: 16px;">模板发起</a></li>-->
        <li style="margin-left: 20px;"><a href="javascript:void(0);" style="background: #fff; border-radius: 5px; padding: 14px;border: none;
         color: #4091fb;font-weight: 500;margin-right: 16px;">上传发起</a></li>
        <li :class="{'active-tab':tabIndex==5}" >
          <router-link  @click.native="tabActive(5)" to='/Account'>
            <img src="/static/images/setup.png" alt="">
            <a href="javascript:void(0);">我的账户</a>
          </router-link>
        </li>
        <li ><img src="/static/images/back.png" alt=""><a href="javascript:void(0);">退出</a></li>


      </ul>

    </nav>



  </div>
</template>
<style lang="scss" scoped>
  @import "../styles/DemoHomeTop.scss";
  .Top .nav a{
    font-size: 16px;
  }
  .el-tabs__item.is-active{
    color:#fff
  }
  .el-tabs__item:hover{
    color:#fff
  }
  .el-tabs__item{
    color:#fff
  }
  .el-tabs__active-bar{
    background-color:red
  }
  .el-tabs__nav-wrap::after{
    height:0
  }



  .el-dialog--center .el-dialog__footer {
    margin-top: -17px;
  }
  .loginOut{
    height:200px !important;
    width:400px !important;
    overflow: hidden !important;
  }
  .dlstyle{
    width:400px  !important;
    height: 360px !important;
    overflow: hidden !important;
  }
  .active-tab{
    border-bottom: 3px solid red;
    font-weight: 700;
  }
</style>
<script>


  export default {
    name: 'Top',
    data(){
      return{
        tabIndex:'1',
      }
    }


  }
</script>

