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
      <div class='state'>
        <dl class='stateInfo'>
          <dt>
            <img src="../../../../static/images/Complete/success.png" alt="">
          </dt>
          <dd>
            <span>恭喜,合同签署成功！</span>
            <p>众签已将该合同通过短信方式通知其他签署人</p>
          </dd>
        </dl>
      </div>
      <!-- 合同所有信息开始 -->
      <div class='contractInfo'>

      </div>
      <div class='btns'>
          <router-link to='/Home'><el-button type="primary" style='width:200px'>返回首页</el-button></router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @import "../../../styles/Templatecomplete/Templatecompletes.css";
</style>

<script>
import {prohibit} from '@/common/js/prohibitBrowser'
export default {
  mounted() {
    prohibit()
    sessionStorage.removeItem("type");
  }
}
</script>
