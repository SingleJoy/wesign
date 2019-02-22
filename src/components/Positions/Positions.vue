<template>
  <div class='Positions'>
			<Pcontract></Pcontract>
			<Bottom></Bottom>
  </div>
</template>
<script>
import Pcontract from './Pcontract'
import Bottom from '../../common/components/Bottom'
export default {
  name: 'Positions',
    components: {
		Pcontract,
		Bottom
 	}
}
</script>
