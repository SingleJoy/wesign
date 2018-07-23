<template>
  <div class='Mycontract'>
    <Top></Top>
    <Mycontracts></Mycontracts>
    <Bottom></Bottom>
  </div>
</template>
<script>
import Top from '../../common/components/Top'
import  Mycontracts from './Mycontracts'
import Bottom from '../../common/components/Bottom'
export default {
  name: 'Mycontract',
  components: {
    Top,
    Mycontracts,
    Bottom
  }
}
</script>

