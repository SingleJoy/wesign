<template>
  <div class="EditChildAccount">
    <div class="Tops">
      <nav class='nav'>
        <p class='logo'>
          <img src="../../../../../static/images/logo2.png" alt="">
        </p>
        <div class='buttons'>
          <el-button type="info" style='background:#ccc' @click="activeCancel" :disabled="clickOnce">取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</el-button>

        </div>
      </nav>
    </div>
    <ActivateChildAccounts></ActivateChildAccounts>
    <Bottom></Bottom>
  </div>
</template>
<script>

  import Top from '@/common/components/Top.vue'
  import MuTop from '@/common/components/MuTop.vue'
  import ActivateChildAccounts from './ActivateChildAccounts.vue'
  import Bottom from '@/common/components/Bottom.vue'
  export default {
    name: 'ActivateChildAccount',
    components: {
      Top,
      MuTop,
      Bottom,
      ActivateChildAccounts
    },
    data(){
      return{
        clickOnce:false,
      }
    },
   methods:{
     activeCancel(){
       this.$router.push("/")
     }
   }
  }
</script>
<style scoped>
  @import "../../../../common/styles/Tops.css";

</style>




