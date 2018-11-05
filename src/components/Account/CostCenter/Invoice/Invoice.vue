<template>
	<div class="Invoice">
     <Invoices></Invoices>
	</div>
</template>

<style>

</style>

<script>
  import Invoices from "./Invoices.vue"
	export default {
	  name:'Invoice',
    components:{
      Invoices
    },
		data() {
			return {

			}
		}
	}
</script>
