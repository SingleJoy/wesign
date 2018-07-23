<template>
  <div class='Positions'>
			<Places></Places>
			<Bottom></Bottom>
  </div>
</template>
<script>
import Places from './Places'
import Bottom from '../../common/components/Bottom'
export default {
  name: 'Place',
    components: {
		Places,
		Bottom
 	}
}
</script>
