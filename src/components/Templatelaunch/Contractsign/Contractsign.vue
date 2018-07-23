<template>
  <div class='Contractsign'>
    <Contractsigns></Contractsigns>
    <Bottom></Bottom>
  </div>
</template>
<script>
import Contractsigns from './Contractsigns'
import Bottom from '../../../common/components/Bottom'
export default {
  name: 'Contractsign',
  components: {
    Contractsigns,
    Bottom
  }
}
</script>
