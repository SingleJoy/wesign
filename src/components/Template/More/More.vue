<template>
    <div class='More'>
         <Top v-if="!Jurisdiction"></Top>
         <MuTop v-else></MuTop>
        <Mores></Mores>
        <Bottom></Bottom>
    </div>
</template>
<script>
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
      Jurisdiction:true
    }
  },
  created(){
    let Status = cookie.getJSON('tenant')[1].isBusiness;

    if(Status == '0'){
      this.Jurisdiction = false
    }else {
      this.Jurisdiction = true
    }
  }
}
</script>
<style>

</style>


