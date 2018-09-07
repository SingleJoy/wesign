<template>
  <div class="Tops">
    <nav class='nav'>
      <p class='logo'>
        <img src="../../../static/images/logo2.png" alt="">
      </p>
      <div class='buttons'>
        <el-button type="info" style='background:#ccc' @click="centerDialogVisible=true">取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</el-button>
        <el-button style='color:#22a7ea' @click="nextStepFit">下一步</el-button>
      </div>
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="25%"
        top='35vh'
        center>
        <span style="margin-left: 111px;">3秒后跳转回首页</span>
      </el-dialog>
    </nav>
  </div>
</template>
<style scoped>
@import "../styles/Tops.css";
</style>
<script>
export default {
  name: 'Tops',
  data() {
    return {
      centerDialogVisible: false
    }
  },
  methods: {
   nextStepFit () {

   }
  }
}
</script>
