<template>
  <div class='Error'>
    <Top></Top>
    <div class='server'>
      <p class='animated lightSpeedIn'><img src="/static/images/Server/Server.png" alt=""></p>
      <h4>啊哦~系统繁忙中，3秒后自动返回，请点击下面按钮返回首页……</h4>
      <el-button type="primary" style='margin-left:542px;'>返回首页</el-button>
    </div>
    <Bottom></Bottom>
  </div>
</template>
<script>
import Top from './Top'
import Bottom from './Bottom'
export default {
  name: 'Error',
  components: {
    Top,
    Bottom
  }
}
</script>
<style scoped>
  @import "../styles/Server.css";
</style>
