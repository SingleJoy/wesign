<template>
  <div class='Contract'>
    <!-- <LoginTop></LoginTop> -->
    <Login></Login>
    <QRcode></QRcode>
    <Bottom></Bottom>
  </div>
</template>
<script>
import LoginTop from '@/common/components/LoginTop'
import QRcode from '@/common/components/QRcode'
import Bottom from '@/common/components/Bottom'
import Login from './Login.vue'
export default {
  name: 'Contract',
    components: {
      LoginTop,
      QRcode,
      Login,
      Bottom
  }
}
</script>
