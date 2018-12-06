<template>
  <div class='ContractList'>
    <Top></Top>
    <ContractLists></ContractLists>
    <Bottom></Bottom>
  </div>
</template>
<script>
import Top from '@/common/components/Top'
import  ContractLists from './ContractLists'
import Bottom from '@/common/components/Bottom'
export default {
  name: 'ContractList',
  components: {
    Top,
    ContractLists,
    Bottom
  }
}
</script>

