<template>
	<div class="InvoiceDetail">
    <Top></Top>
    <InvoiceDetails></InvoiceDetails>
    <Bottom></Bottom>
  </div>
</template>

<script>
  import Top from '@/common/components/Top.vue'
  import InvoiceDetails from './InvoiceDetails.vue'
  import Bottom from '@/common/components/Bottom.vue'
	export default {
		name: "InvoiceDetail",
    components:{
      Top,
      InvoiceDetails,
      Bottom
    },


	}
</script>

<style lang="scss" scoped>
  @import "../../../../styles/Account/CostCenter/CostCenter.scss";

</style>

<style >
  #tab-first,#tab-second,#tab-third{
    font-size: 16px;
  }
  .content-tabs .el-tabs__item.is-active {
    color: #4091fb;
    border-bottom: 2px solid #4091fb;
  }
  .content-tabs .el-tabs__item {
    height: 58px;
    line-height: 58px;
  }


</style>
