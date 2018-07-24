<template>
    <div class='BuyProduct'>
        <MuTop></MuTop>
        <BuyProducts></BuyProducts>
        <Bottom></Bottom>
    </div>
</template>
<script>
import MuTop from '../../common/components/MuTop'
import BuyProducts from './BuyProducts'
import Bottom from '../../common/components/Bottom'
export default {
  
  name: 'Merchant',
  components: {
    MuTop,
    BuyProducts,
    Bottom
  }
}
</script>