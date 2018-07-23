<template>
    <div class='Templates'>
        <Top></Top>
        <Templatecs></Templatecs>
        <Bottom></Bottom> 
    </div>
</template>
<script>
import Top from '../../../common/components/Top'
import Templatecs from './Templatecs'
import Bottom from '../../../common/components/Bottom'
export default {
  name: 'Templates',
    components: {
      Top,
      Bottom,
      Templatecs
  }
}
</script>
