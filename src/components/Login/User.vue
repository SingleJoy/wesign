<template>
  <div class='Contract'>
    <LoginTop></LoginTop>
    <Login></Login>
    <Bottom></Bottom>
  </div>
</template>
<script>
import LoginTop from '../../common/components/LoginTop'
import Bottom from '../../common/components/Bottom'
import Login from './Login.vue'
export default {
  name: 'Contract',
    components: {
      LoginTop,
      Login,
      Bottom
  }
}
</script>
