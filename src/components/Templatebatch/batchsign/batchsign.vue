<template>
  <div class='batchsign'>
    <batchsigns></batchsigns>
    <Bottom></Bottom>
  </div>
</template>
<script>
import batchsigns from './batchsigns'
import Bottom from '../../../common/components/Bottom'
export default {
  name: 'batchsign',
  components: {
    batchsigns,
    Bottom
  }
}
</script>
