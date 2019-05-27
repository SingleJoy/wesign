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
import Top from "../../../common/components/DemoTop";
  export default {
    name: 'OrderList',
    components:{
      OrderLists,
      Top,
      Bottom
    },
    data () {
      return {

      }
    },

    created() {

    }
  }
</script>
<style lang="scss" scoped>

  .OrderLists{

  }
</style>

