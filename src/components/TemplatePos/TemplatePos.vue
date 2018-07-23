<template>
  <div class='TemplatePos'>
      <!-- <Tops></Tops> -->
			<TemplatePoses></TemplatePoses>
			<Bottom></Bottom>
  </div>
</template>
<script>
// import Tops from '../../common/components/Tops'
import TemplatePoses from './TemplatePoses'
import Bottom from '../../common/components/Bottom'
export default {
  name: 'TemplatePos',
    components: {
		TemplatePoses,
		Bottom
 	}
}
</script>
