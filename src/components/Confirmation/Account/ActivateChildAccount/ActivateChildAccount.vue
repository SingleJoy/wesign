<template>
  <div class="EditChildAccount">
   
    <ActivateChildAccounts></ActivateChildAccounts>
    <Bottom></Bottom>
  </div>
</template>
<script>


  import ActivateChildAccounts from './ActivateChildAccounts.vue'
  import Bottom from '@/common/components/Bottom.vue'
  export default {
    name: 'ActivateChildAccount',
    components: {
      Bottom,
      ActivateChildAccounts
    },
    data(){
      return{
        clickOnce:false,
      }
    },
   methods:{
     
   }
  }
</script>
<style scoped>
  @import "../../../../common/styles/Tops.css";

</style>




