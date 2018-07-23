<template>
  <div class='batchSetting'>
     <batchSettings></batchSettings>
     <Bottom></Bottom> 
  </div>
</template>
<script>
//import Tops from '../../../common/components/TempTop.vue'
import batchSettings from './batchSettings'
import Bottom from '../../../common/components/Bottom'
export default {
  name: 'batchSetting',
  components: {
      batchSettings,
      Bottom
  }
}
</script>
