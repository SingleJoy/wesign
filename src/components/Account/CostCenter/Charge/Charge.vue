<template>
  	<div class="charge">
		<Top></Top>
		<Charges></Charges>
		<Bottom></Bottom>
  	</div>
</template>

<script>
import Top from '@/common/components/Top.vue'
import Bottom from '@/common/components/Bottom.vue'
import Charges from './Charges.vue'
export default {
	name: "Charge",
	components:{
		Top, Bottom, Charges
	},
	data(){
		return{

		}
	}
}
</script>

<style scoped>

</style>
