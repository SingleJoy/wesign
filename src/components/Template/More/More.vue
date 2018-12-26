<template>
    <div class='More'>
         <Top v-if="Jurisdiction"></Top>
         <MuTop v-else></MuTop>
        <Mores></Mores>
        <Bottom></Bottom>
    </div>
</template>
<script>
import cookie from '@/common/js/getTenant'
import Top from '@/common/components/Top'
import MuTop from '@/common/components/MuTop'
import Mores from './Mores'
import Bottom from '@/common/components/Bottom'

export default {
  name: 'More',
   components: {
    Top,
    Mores,
    Bottom,
    MuTop
  },
  data(){
    return{
      Jurisdiction:false
    }
  },
  created(){
    let Status = cookie.getJSON('tenant')[1].isBusiness;

    if(Status == 1){
      this.Jurisdiction = true
    }else {
      this.Jurisdiction =false
    }
  }
}
</script>
<style>

</style>


