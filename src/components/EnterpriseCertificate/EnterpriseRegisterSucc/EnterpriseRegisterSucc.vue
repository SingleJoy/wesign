<template>
  <div class="EnterpriseRegisterSucc">
    <EnterpriseRegisterSuccs></EnterpriseRegisterSuccs>
    <Bottom></Bottom>
  </div>
</template>
<script>
  import EnterpriseRegisterSuccs from './EnterpriseRegisterSuccs.vue'
  import Bottom from '../../../common/components/Bottom.vue'
  export default {
    name: 'EnterpriseRegisterSucc',
    components: {
      Bottom,
      EnterpriseRegisterSuccs
    }
  }
</script>
