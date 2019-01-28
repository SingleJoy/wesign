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
import {state, actions,mutations} from '@/store/index';
export default {
  name: 'Mycontract',
  components: {
    Top,
    CompanyContracts,
    Bottom
  },
  beforeRouteLeave(to, from, next) {

    if(to.name!='Mycontract'){
      this.$store.dispatch('showFilingNo',{showFilingNo:null});
      this.$store.dispatch('nowIndex',{nowIndex:0});
      this.$store.dispatch('isBtnActive',{isBtnActive:true});
      sessionStorage.removeItem('B2BPanelActiveName');
      sessionStorage.removeItem('B2CPanelActiveName');
    }
    next(vm => {

    });

  },
}
</script>
