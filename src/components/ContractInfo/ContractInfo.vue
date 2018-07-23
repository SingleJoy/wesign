<template>
  <div class='ContractInfo'>
    <Top></Top>
    <ContractInfos></ContractInfos>
    <Bottom></Bottom>
  </div>
</template>
<script>
import Top from '../../common/components/Top'
import ContractInfos from './ContractInfos'
import Bottom from '../../common/components/Bottom'
export default {
  name: 'Contract',
    components: {
      Top,
      ContractInfos,
      Bottom
  }
}
</script>


