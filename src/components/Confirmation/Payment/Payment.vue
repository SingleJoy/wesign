<template>
    <div class='Payment'>
        <Payments></Payments>
        <Bottom></Bottom>
    </div>
</template>
<script>
  import Payments from './Payments.vue'
  import Bottom from '../../../common/components/Bottom.vue'
    export default {
        name: 'Payment',
         components: {
            Bottom,
            Payments
        }
    }
</script>
