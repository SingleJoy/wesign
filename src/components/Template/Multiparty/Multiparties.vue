<template>
  <div class='Multiparties'>
    <div class='main' style="height:800px;">
       <div class='tab'>
          <el-tabs v-model="activeName" style="padding-left:15px;">
            <el-tab-pane label="单次发起合同" name="first">
               <single-template></single-template>
            </el-tab-pane>
            <el-tab-pane label="批量发起合同" name="second" >
               <batch-template></batch-template>
            </el-tab-pane>
        </el-tabs>
       </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
  @import "../../../styles/Multiparty/Multiparties.css";
</style>
<script>
import SingleTemplate from './SingleTemplate'
import BatchTemplate from './BatchTemplate'
export default {
  name: 'Multiparties',
  components: { SingleTemplate,BatchTemplate },
  data() {
    return {
      activeName: 'first',
    }
  }
}
</script>


