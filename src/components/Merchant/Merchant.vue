<template>
    <div class='Merchant'>
        <MuTop></MuTop>
      <keep-alive>
        <Merchants></Merchants>
      </keep-alive>
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

