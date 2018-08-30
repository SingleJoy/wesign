<template>
  <div class="EditChildNoActive">
    <Top v-if="Jurisdiction == true"></Top>
    <mu-top v-else></mu-top>
    <EditChildNoActives></EditChildNoActives>
    <Bottom></Bottom>
  </div>
</template>
<script>
  import cookie from '@/common/js/getTenant'
  import Top from '@/common/components/Top.vue'
  import MuTop from '@/common/components/MuTop.vue'
  import EditChildNoActives from './EditChildNoActives.vue'
  import Bottom from '@/common/components/Bottom.vue'
  export default {
    name: 'EditChildNoActive',
    components: {
      Top,
      MuTop,
      Bottom,
      EditChildNoActives
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

