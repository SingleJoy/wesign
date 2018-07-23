<template>
  <div class='Contractsigning'>
     <!-- <Tops></Tops> -->
     <Contractsignings></Contractsignings>
     <Bottom></Bottom> 
  </div>
</template>
<script>
// import Tops from '../../common/components/Tops'
import Contractsignings from '../../components/Contractsigning/Contractsignings'
import Bottom from '../../common/components/Bottom'
export default {
  name: 'Contractsigning',
  components: {
      Contractsignings,
      Bottom
  }
}
</script>
