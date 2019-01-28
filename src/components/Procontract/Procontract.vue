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
import {state, actions,mutations} from '@/store/index';
export default {
  name: 'Procontract',
  components: {
    MuTop,
    Procontracts,
    Bottom
  },
  beforeDestroy(){
    this.$store.dispatch('showFilingNo',{showFilingNo:null});
    this.$store.dispatch('nowIndex',{nowIndex:0});
    this.$store.dispatch('isBtnActive',{isBtnActive:true});
    sessionStorage.removeItem('b2cPanelActiveName');

  }
}
</script>

