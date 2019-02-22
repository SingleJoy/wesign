<template>
  <div class='Fillinformation'>
    <!-- <Tops></Tops> -->
    <Fillinformations></Fillinformations>
    <Bottom></Bottom>
  </div>
</template>
<script>
// import Tops from '../../../common/components/Tops'
import Fillinformations from './Fillinformations'
import Bottom from '../../../common/components/Bottom'
export default {
  name: 'Fillinformation',
  components: {
    Fillinformations,
    Bottom
  }
}
</script>
