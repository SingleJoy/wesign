<template>
  <div class="EditChildAccount">
    <Top v-if="Jurisdiction == true"></Top>
    <mu-top v-else></mu-top>
    <ActivateChildAccounts></ActivateChildAccounts>
    <Bottom></Bottom>
  </div>
</template>
<script>
  import cookie from '@/common/js/getTenant'
  import Top from '@/common/components/Top.vue'
  import MuTop from '@/common/components/MuTop.vue'
  import ActivateChildAccounts from './ActivateChildAccounts.vue'
  import Bottom from '@/common/components/Bottom.vue'
  export default {
    name: 'ActivateChildAccount',
    components: {
      Top,
      MuTop,
      Bottom,
      ActivateChildAccounts
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



