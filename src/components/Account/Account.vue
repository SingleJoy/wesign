<template>
  <div class='Account'>
      <Top></Top>

      <Accounts></Accounts>
      <Bottom></Bottom>
  </div>
</template>
<script>
  import cookie from '@/common/js/getTenant'
  import Top from '@/common/components/Top.vue'
  import Accounts from './Accounts.vue'
  import Bottom from '@/common/components/Bottom.vue'
  export default {
    name: 'Account',
    components: {
      Top,
      Bottom,
      Accounts
    },

  }
</script>

