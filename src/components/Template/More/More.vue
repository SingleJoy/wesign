<template>
    <div class='More'>
       <Top></Top>
        <Mores></Mores>
        <Bottom></Bottom>  
    </div>
</template>
<script>
import Top from '../../../common/components/Top'
import Mores from './Mores'
import Bottom from '../../../common/components/Bottom'
export default {
  name: 'More',
   components: {
    Top,
    Mores,
    Bottom
  }
}
</script>
<style>

</style>


