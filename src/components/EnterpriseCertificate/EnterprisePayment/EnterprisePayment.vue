<template>
  <div class="EnterprisePayment">
    <EnterprisePayments></EnterprisePayments>
    <Bottom></Bottom>
  </div>
</template>
<script>
  import EnterprisePayments from './EnterprisePayments.vue'
  import Bottom from '../../../common/components/Bottom.vue'
  export default {
    name: 'EnterprisePayment',
    components: {
      Bottom,
      EnterprisePayments
    }
  }
</script>
