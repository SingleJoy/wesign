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

    beforeDestroy() {
      this.$store.dispatch('showFilingNo',{showFilingNo:''});
      this.$store.dispatch('showFilingNoDefault',{showFilingNoDefault:''});
      this.$store.dispatch('nowIndex',{nowIndex:0});
      this.$store.dispatch('isBtnActive',{isBtnActive:true});
      this.$store.dispatch('PanelActiveName',{PanelActiveName:'first'});
      this.$store.dispatch('showFilingType',{showFilingType:true});
      this.$store.dispatch('showFilingTypeUnRec',{showFilingTypeUnRec:false});
    },
  }
</script>

