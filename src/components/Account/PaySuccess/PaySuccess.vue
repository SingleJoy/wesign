
<template>
  <div class="PaySuccess">
    <div class="Topes">
      <nav class='nav'>
        <p class='logo'>
          <img src="/static/images/Top/v1.6-logo.png" alt="logo图">
        </p>
      </nav>
    </div>
    <PaySuccesses></PaySuccesses>
    <Bottom></Bottom>
  </div>
</template>

<script>

  import Bottom from '@/common/components/Bottom.vue'
  import PaySuccesses from './PaySuccesses'
  export default {
    name: "PaySuccess",
    components:{

      Bottom,
      PaySuccesses
    },
    data(){
      return{

      }
    },
    methods:{

    },
    created(){

    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../common/styles/Topes.css";

</style>
