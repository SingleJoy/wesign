<template>
  <div class='Signaturesetting'>
     <Signaturesettings></Signaturesettings>
     <Bottom></Bottom> 
  </div>
</template>
<script>
//import Tops from '../../../common/components/TempTop.vue'
import Signaturesettings from './Signaturesettings'
import Bottom from '../../../common/components/Bottom'
export default {
  name: 'Signaturesetting',
  components: {
      Signaturesettings,
      Bottom
  }
}
</script>
