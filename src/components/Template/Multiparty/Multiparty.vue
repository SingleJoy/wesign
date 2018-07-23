<template>
  <div class='Multiparty'>
    <Top></Top>
    <Multiparties></Multiparties>
    <Bottom></Bottom>
  </div>
</template>
<script>
import Top from '../../../common/components/Top'
import Multiparties from './Multiparties'
import Bottom from '../../../common/components/Bottom'
export default {
  name: 'Multiparty',
    components: {
      Top,
      Multiparties,
      Bottom
  }
}
</script>

