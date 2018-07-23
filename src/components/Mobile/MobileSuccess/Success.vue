<template>
  <div class='Success'>
      <div class='section'>
          <div class='pic1'>
              <!-- <img src="../../../static/img/success.gif" alt=""> -->
              <p class='first'>签署成功</p>
              <!-- <p class='second'><span>{{num}}</span>秒后返回首页</p>
        -->
          </div>
      </div>
  </div>
</template>
<script>
import {prohibit} from '@/common/js/prohibitBrowser'
export default {
  name: 'Success',
  data () {
      return { 
        num:3
      }
  },
  created () {
    prohibit()
  }
}
</script>
<style scoped>
.Success, .section
{
    width: 100%;
    height: 100%;
}
    .pic1{
        width: 260px;
        height: 260px;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        background: url('../../../../static/images/success.gif');
        background-size:100% 100%;
    }
    .first{
        color: #2d8ad7;
        text-align: center;
        margin-top: 260px;
        margin: 260px auto;
        width: 70px;
    }
    .second{
          text-align: center;
    }
</style>


