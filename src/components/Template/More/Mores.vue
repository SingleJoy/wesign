<template>
  <div class='Mores'>
    <div class='main'>
        <div class='tab'>
          <el-tabs v-model="activeName" style="margin-left:30px;">
            <el-tab-pane label="单次发起合同" name="first">
              <div class='one'>
                <img src="../../../../static/images/Multiparty/multiparties.png" alt="">
              </div>
            </el-tab-pane>
            <el-tab-pane label="批量发起合同" name="second" >
              <div class='two' style='width:540px'>
                <img src="../../../../static/images/Multiparty/multiparties1.png" alt="">
              </div>
            </el-tab-pane>
        </el-tabs>
       </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Mores',
    data() {
    return {
      activeName: 'first',
    }
  }
}
</script>
<style>
    @import "../../../styles/Multiparty/Mores.css";
  
  .one{
    margin: 30px auto;
    width: 490px;
  }
    .two{
    margin: 30px auto;
    width: 490px;
  }
  
</style>


