<template>
  <div class='Contract'>
    <Contents></Contents>
    <Bottom></Bottom>
  </div>
</template>
<script>
import Contents from './Contents'
import Bottom from '../../common/components/Bottom'
export default {
  name: 'Contract',
    components: {
      Contents,
      Bottom
  }
}
</script>
