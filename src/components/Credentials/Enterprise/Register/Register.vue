<template>
  <div class='Completion'>
      <registers></registers>
      <Bottom></Bottom>
  </div>
</template>
<script>
  import Registers from './Registers.vue'
  import Bottom from '@/common/components/Bottom.vue'
  export default {
    name: 'Completion',
     components: {
        Bottom,
        Registers
      }
  }
</script>
