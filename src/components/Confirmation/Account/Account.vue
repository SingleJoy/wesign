<template>
  <div class='Account'>
      <Top v-if="Jurisdiction == true"></Top>
      <mu-top v-else></mu-top>
      <Accounts></Accounts>
      <Bottom></Bottom>
  </div>
</template>
<script>
  import cookie from '@/common/js/getTenant'
  import Top from '../../../common/components/Top.vue'
  import MuTop from '../../../common/components/MuTop.vue'
  import Accounts from './Accounts.vue'
  import Bottom from '../../../common/components/Bottom.vue'
  export default {
    name: 'Account',
    components: {
      Top,
      MuTop,
      Bottom,
      Accounts
    },
    data(){
      return{
        Jurisdiction:true
      }
    },
    created() {
    //   var Status = cookie.getJSON('tenant')[1].isBusiness
    //   if(Status == '0'){
    //     this.Jurisdiction = false
    //   }
        var auditSteps = cookie.getJSON('tenant')[1].auditSteps;
        if(auditSteps == 3){
            this.Jurisdiction = true

        }else {
            this.Jurisdiction = false
        }
    }
  }
</script>

