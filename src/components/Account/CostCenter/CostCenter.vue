<template>
  <div class="CostCenter">
    <Top></Top>
    <CostCenters></CostCenters>
    <Bottom></Bottom>
  </div>
</template>

<style>

</style>

<script>
 import CostCenters from './CostCenters'
 import Top from '@/common/components/Top.vue'
 import Bottom from '@/common/components/Bottom.vue'
  export default {
    name:'CostCenter',
    components:{
      CostCenters,
      Top,
      Bottom
    },
    data(){
      return{

      }
    },

  }

</script>
