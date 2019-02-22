<template>
  <div class='ContractDelay'>
    <Top></Top>
    <contract-delays></contract-delays>
    <Bottom></Bottom>
  </div>
</template>
<script>
import Top from '../../common/components/Top'
import ContractDelays from './ContractDelays.vue'
import Bottom from '../../common/components/Bottom'
export default {
  name: 'Contract',
    components: {
      Top,
      ContractDelays,
      Bottom
  }
}
</script>
