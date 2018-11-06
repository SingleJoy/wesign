<template>
	<div class="InvoiceDetails">
     <div class="invoice-info">
         <p class="title" style="position: relative;">发票信息</p>
     </div>

  </div>
</template>

<script>

	export default {
		name: "InvoiceDetails",
    components:{

    },
    data(){
		  return{

      }
    },
    methods:{

    }
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

  .InvoiceDetails .invoice-info .title{
   height: 46px;
   margin: 20px 0 0 15px;
   line-height: 46px;
   padding-left: 40px;
   color: #fff;
   font-size: 20px;
   padding-top: 0 !important;
   border-top: none !important;
   background: url('../../../../../static/images/Common/title.png') no-repeat;
 }
</style>
