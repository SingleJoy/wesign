<template>
  <div class='Server'>
      <Top></Top>
      <div class='error' style="margin-top: 20px;">
          <p class='animated fadeInUp'><img src="../../../static/images/Error/rock.png" alt=""></p>
          <h3>sorry</h3>
          <h4>您访问的页面已离开地球</h4>
          <h5>因长时间未操作，本次登录已失效，请重新登录</h5>
          <router-link to='/'><el-button type="primary" style='margin-left:542px;'>返回登录页</el-button></router-link>
      </div>
      <Bottom></Bottom>
  </div>
</template>
<script>
import Top from './Top'
import Bottom from './Bottom'
export default {
  name: 'Server',
  components: {
    Top,
    Bottom
  }
}
</script>
<style scoped>
  @import "../styles/Error.css";
</style>

