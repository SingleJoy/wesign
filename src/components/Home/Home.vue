<template>
    <div class='Home'>
        <Top></Top>
        <Container></Container>
        <Bottom></Bottom>
    </div>
</template>
<script>
import Top from '../../common/components/Top'
import Container from './Container'
import Bottom from '../../common/components/Bottom'
export default {
  name: 'Home',
  components: {
    Top,
    Container,
    Bottom
  }
}
</script>

