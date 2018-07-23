<template>
    <div class='Success'>
        <Top></Top>
        <Successes></Successes>
        <Bottom></Bottom> 
    </div>
</template>
<script>
import Top from '../../common/components/Top'
import Successes from './Successes'
import Bottom from '../../common/components/Bottom'
export default {
  name: 'Success',
    components: {
      Top,
      Bottom,
      Successes
  }
}
</script>
