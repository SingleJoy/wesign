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
import {state, actions,mutations} from '@/store/index';
export default {
  name: 'Mycontract',
  components: {
    Top,
    Mycontracts,
    Bottom
  },

  beforeRouteLeave(to, from, next) {

    if(to.name!='CompanyContract'){
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

