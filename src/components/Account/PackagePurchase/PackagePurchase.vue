<template>
	<div class="PackagePurchase">
     <Top></Top>
     <PackagePurchases></PackagePurchases>
     <Bottom></Bottom>
  </div>
</template>

<script>
  import Top from '@/common/components/Top.vue'

  import Bottom from '@/common/components/Bottom.vue'
  import PackagePurchases from './PackagePurchases'
	export default {
		name: "PackagePurchase",
    components:{
      PackagePurchases,
      Top,
      Bottom
    },
	}
</script>

<style lang="scss" scoped>
</style>
