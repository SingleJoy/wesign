<template>
  <div class='TemplateInfo'>
      <Top></Top>
			<TemplateInfos></TemplateInfos>
			<Bottom></Bottom>
  </div>
</template>
<script>
import Top from '@/common/components/Top'
import TemplateInfos from './TemplateInfos'
import Bottom from '@/common/components/Bottom'
export default {
  name: 'TemplateInfo',
    components: {
    Top,
		TemplateInfos,
		Bottom
 	}
}
</script>
