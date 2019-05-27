<template>
  <div class="OrderList">
    <Top></Top>
    <BatchContractLists></BatchContractLists>
    <Bottom></Bottom>
  </div>
</template>
<script>
  import BatchContractLists from './BatchContractLists';
  import Bottom from '@/common/components/Bottom';
  import Top from "@/common/components/Top";
  export default {
    name: 'OrderList',
    components:{
      BatchContractLists,
      Top,
      Bottom
    },

  }
</script>
<style lang="scss" scoped>


</style>

