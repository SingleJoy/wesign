<template>
  <div class="OrderList">
    <Top></Top>
    <OrderLists></OrderLists>
    <Bottom></Bottom>
  </div>
</template>
<script>
import OrderLists from './OrderLists';
import Bottom from '@/common/components/Bottom';
import Top from "@/common/components/Top";
  export default {
    name: 'OrderList',
    components:{
      OrderLists,
      Top,
      Bottom
    },

  }
</script>
<style lang="scss" scoped>


</style>

