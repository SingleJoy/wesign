<template>
  <div class='Success'>
    <div class='section'>
      <div class='pic1'>

        <p class='first'>签署成功</p>

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
  .Success, .section {
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
    background: url('/static/images/success.gif');
    background-size:100% 100%;
  }
  .first{
    color: #2d8ad7;
    text-align: center;
    margin: 260px auto 0 auto;
    width: 70px;
  }
  .second{
    text-align: center;
  }
</style>


