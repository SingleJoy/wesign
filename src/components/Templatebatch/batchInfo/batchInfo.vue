<template>
  <div class='batchInfo'>
    <!-- <Tops></Tops> -->
    <batchInfos></batchInfos>
    <Bottom></Bottom>
  </div>
</template>
<script>
// import Tops from '../../../common/components/Tops'
import batchInfos from './batchInfos'
import Bottom from '../../../common/components/Bottom'
export default {
  name: 'batchInfo',
  components: {
    batchInfos,
    Bottom
  }
}
</script>
