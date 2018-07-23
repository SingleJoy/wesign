<template>
    <div class='SignSuccess'>
        <Top></Top>
        <sign-succes></sign-succes>
        <Bottom></Bottom>
    </div>
</template>
<script>
import Top from '../../common/components/Top'
import SignSucces from './SignSucces'
import Bottom from '../../common/components/Bottom'
export default {
  name: 'SignSuccess',
    components: {
      Top,
      Bottom,
      SignSucces
  }
}
</script>
