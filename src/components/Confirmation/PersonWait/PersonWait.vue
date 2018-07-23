<template>
    <div class='Payment'>
        <person-waits></person-waits>
        <Bottom></Bottom>
    </div>
</template>
<script>
  import PersonWaits from './PersonWaits.vue'
  import Bottom from '../../../common/components/Bottom.vue'
    export default {
        name: 'Payment',
         components: {
            Bottom,
            PersonWaits
        }
    }
</script>