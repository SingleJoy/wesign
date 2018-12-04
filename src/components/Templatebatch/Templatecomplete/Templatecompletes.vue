<template>
  <div class='Templatecompletes' style="clear:both;margin-top: 20px;">
    <div class="main" >
      <div class='step' style="width: 720px;">  <!--步骤条 -->
        <ul>
          <li class="active"><i class='el-icon-document'></i><b>选择模板</b></li>
          <p></p>
          <li class="active"><i class='el-icon-goods'></i><b>签署设置</b></li>
          <p></p>
          <li class="active"><i class='el-icon-edit'></i><b>填充信息</b></li>
          <p></p>
          <li class="active"><i class='el-icon-menu'></i><b>合同签署</b></li>
          <p></p>
          <li class="active"><i class='el-icon-check'></i><b>完成</b></li>
        </ul>
      </div>
      <!-- 合同返回用户成功or失败 -->
      <div class="state">
        <div class="stateInfo">
          <div>
            <img src="../../../../static/images/contract-success.png" alt="" style="margin-top: 40px;">
          </div>
          <div style="margin-left: 30px;">
            <span>恭喜,合同签署成功！</span>

            <p style="margin-top: 30px;">众签已将该合同通过短信方式通知其他签署人</p>
          </div>
        </div>
      </div>
      <!-- 合同所有信息开始 -->
      <div class='contractInfo'>

        </div>
        <div class='btns'>
            <el-button @click="goHome" type="primary" style='width:200px'>返回首页</el-button>
        </div>
    </div>
  </div>
</template>

<style scoped>
  @import "../../../styles/Templatecomplete/Templatecompletes.css";
  @import "../../../common/styles/SigningSteps.css";
</style>

<script>
import {prohibit} from '@/common/js/prohibitBrowser'
export default {
    mounted() {
        prohibit()
        sessionStorage.removeItem("type");
    },
    methods:{
        goHome(){
            this.$store.dispatch('tabIndex',{tabIndex:0});
             this.$router.push('/Home')

        }
    }

}
</script>
