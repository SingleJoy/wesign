<template>
  <div class='SignSuccess'>
    <Top v-if="Jurisdiction == true"></Top>
    <mu-top v-else></mu-top>
    <sign-succes></sign-succes>
    <Bottom></Bottom>
  </div>
</template>
<script>
  import Top from '../../common/components/Top.vue'
  import MuTop from '../../common/components/MuTop.vue'
  import SignSucces from './SignSucces'
  import Bottom from '../../common/components/Bottom'
  import cookie from '@/common/js/getTenant'
  export default {
    name: 'SignSuccess',
    components: {
      Top,
      Bottom,
      SignSucces,
      MuTop
    },
    data(){
      return{
        Jurisdiction:true
      }
    },
    created() {
      var Status = cookie.getJSON('tenant')[1].isBusiness
      if(Status == '0'){
        this.Jurisdiction = false
      }
    }
  }
</script>
