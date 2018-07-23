<template>
  <div class='Contract'>
    <LoginTop></LoginTop>
    <Forget></Forget>
    <Bottom></Bottom>
  </div>
</template>
<script>
import LoginTop from '../../common/components/LoginTop'
import Forget from './Forget.vue'
import Bottom from '../../common/components/Bottom'
export default {
  name: 'Contract',
    components: {
      LoginTop,
      Forget,
      Bottom
  }
}
</script>