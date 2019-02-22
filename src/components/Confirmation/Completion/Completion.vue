<template>
  <div class='Completion'>
      <Topes></Topes>
      <Completions></Completions>
      <Bottom></Bottom>
  </div>
</template>
<script>
  import Topes from '../../../common/components/Topes.vue'
  import Completions from './Completions.vue'
  import Bottom from '../../../common/components/Bottom.vue'
  export default {
    name: 'Completion',
     components: {
          Topes,
          Bottom,
          Completions
      }
  }
</script>

