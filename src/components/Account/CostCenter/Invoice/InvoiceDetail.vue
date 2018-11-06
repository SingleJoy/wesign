<template>
	<div class="InvoiceDetail">

    <InvoiceDetails></InvoiceDetails>

  </div>
</template>

<script>

  import InvoiceDetails from './InvoiceDetails.vue'

	export default {
		name: "InvoiceDetail",
    components:{

      InvoiceDetails,

    },


	}
</script>

<style lang="scss" scoped>
  @import "../../../../styles/Account/CostCenter/CostCenter.scss";

</style>

<style >



</style>
