<template>
	<div class="PackageBuy">
    <Top></Top>
    <PackageBuys></PackageBuys>
    <bottom></bottom>
  </div>
</template>

<script>
  import Top from '@/common/components/Top'
  import Bottom from '@/common/components/Bottom'
  import PackageBuys from './PackageBuys'
	export default {
		name: "PackageBuy",
    components:{
      PackageBuys,
      Top,
      Bottom
    }
	}
</script>

<style scoped>

</style>
