<template>
  <div class='SignSuccess'>
    <Top></Top>
    <SignSucces></SignSucces>
    <Bottom></Bottom>
  </div>
</template>
<script>
  import Top from '@/common/components/Top.vue'
  import SignSucces from './SignSucces'
  import Bottom from '@/common/components/Bottom'
  export default {
    name: 'SignSuccess',
    components: {
      Top,
      Bottom,
      SignSucces,
    },

  }
</script>
