<template>
    <div class='Templatecomplete'>
        <Top></Top>
        <Templatecompletes></Templatecompletes>
        <Bottom></Bottom> 
    </div>
</template>
<script>
import Top from '../../../common/components/Top'
import Templatecompletes from './Templatecompletes'
import Bottom from '../../../common/components/Bottom'
export default {
  name: 'Templatecomplete',
    components: {
      Top,
      Bottom,
      Templatecompletes
  }
}
</script>
