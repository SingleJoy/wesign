<template>
    <div class='Merchant'>
        <MuTop></MuTop>
        <Merchants></Merchants>
        <Bottom></Bottom>
    </div>
</template>
<script>
import MuTop from '../../common/components/MuTop'
import Merchants from './Merchants'
import Bottom from '../../common/components/Bottom'
export default {
  name: 'Merchant',
  components: {
    MuTop,
    Merchants,
    Bottom
  }
}
</script>

