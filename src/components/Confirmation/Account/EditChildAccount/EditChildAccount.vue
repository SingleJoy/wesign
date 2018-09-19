<template>
  <div class="EditChildAccount">
    <Top v-if="Jurisdiction == true"></Top>
    <mu-top v-else></mu-top>
    <EditChildAccounts></EditChildAccounts>
    <Bottom></Bottom>
  </div>
</template>
<script>
  import cookie from '@/common/js/getTenant'
  import Top from '@/common/components/Top.vue'
  import MuTop from '@/common/components/MuTop.vue'
  import EditChildAccounts from './EditChildAccounts.vue'
  import Bottom from '@/common/components/Bottom.vue'
  export default {
    name: 'EditChildAccount',
    components: {
      Top,
      MuTop,
      Bottom,
      EditChildAccounts
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

