<template>
    <div class='Complete'>
        <Top></Top>
        <Completes></Completes>
        <Bottom></Bottom>
    </div>
</template>
<script>
import Top from '../../common/components/Top'
import Completes from './Completes'
import Bottom from '../../common/components/Bottom'
export default {
  name: 'Complete',
    components: {
      Top,
      Bottom,
      Completes
  }
}
</script>
