<template>
  <div class='Contract'>
    <Forget></Forget>
    <QRcode></QRcode>
    <Bottom></Bottom>
  </div>
</template>
<script>
import QRcode from '../../common/components/QRcode'
import Forget from './Forget.vue'
import Bottom from '../../common/components/Bottom'
export default {
  name: 'Contract',
    components: {
      QRcode,
      Forget,
      Bottom
  }
}
</script>