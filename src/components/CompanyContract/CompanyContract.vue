<template>
  <div class='CompanyContract'>
    <Top></Top>
    <CompanyContracts></CompanyContracts>
    <Bottom></Bottom>
  </div>
</template>
<script>
import Top from '../../common/components/Top'
import CompanyContracts from './CompanyContracts'
import Bottom from '../../common/components/Bottom'
export default {
  name: 'Mycontract',
  components: {
    Top,
    CompanyContracts,
    Bottom
  }
}
</script>