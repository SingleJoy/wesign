<template>
  <div class='Procontract'>
    <MuTop></MuTop>
    <Procontracts></Procontracts>
    <Bottom></Bottom>
  </div>
</template>
<script>
import MuTop from '../../common/components/MuTop'
import  Procontracts from './Procontracts'
import Bottom from '../../common/components/Bottom'
export default {
  name: 'Procontract',
  components: {
    MuTop,
    Procontracts,
    Bottom
  }
}
</script>

