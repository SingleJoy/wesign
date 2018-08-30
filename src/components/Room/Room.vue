<template>
  <div class='Room'>
      <Top></Top>
    <keep-alive>
      <Rooming></Rooming>
    </keep-alive>
      <Bottom></Bottom>
  </div>
</template>
<script>
import Top from '../../common/components/Top'
import Rooming from './Rooming'
import Bottom from '../../common/components/Bottom'
export default {
  name: 'Room',
  components: {
    Top,
    Rooming,
    Bottom
  }
}
</script>

