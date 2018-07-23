<template>
  <div class='Contract'>
    <Dimensions></Dimensions>
    <Bottom></Bottom>
  </div>
</template>
<script>
import Dimensions from './Dimensions'
import Bottom from '../../common/components/Bottom'
export default {
  name: 'Contract',
    components: {
      Dimensions,
      Bottom
  }
}
</script>
