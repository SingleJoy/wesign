<template>
  <div class="NoReal">
    <!-- <Top v-if="Jurisdiction == true"></Top> -->
    <MuTop></MuTop>
    <NoReals></NoReals>
    <Bottom></Bottom>
  </div>
</template>
<script>
  import cookie from '@/common/js/getTenant'
  import Top from '@/common/components/Top.vue'
  import MuTop from '@/common/components/MuTop.vue'
  import NoReals from './NoReals.vue'
  import Bottom from '@/common/components/Bottom.vue'
  export default {
    name: 'NoReal',
    components: {
      Top,
      MuTop,
      Bottom,
      NoReals
    },
    data(){
      return{
        Jurisdiction:true
      }
    },
    created() {
    //   var Status = cookie.getJSON('tenant')[1].isBusiness
    //   if(Status == '0'){
    //     // 0 小B   1代表大B
    //     this.Jurisdiction = false
    //   }
    }
  }
</script>

