<template>
  <div class='Whether'>
      <!-- <Tops></Tops> -->
			<Whethers></Whethers>
			<Bottom></Bottom>
  </div>
</template>
<script>
// import Tops from '../../common/components/Tops'
import Whethers from './Whethers'
import Bottom from '../../common/components/Bottom'
export default {
  name: 'Whether',
    components: {
		Whethers,
		Bottom
 	}
}
</script>
