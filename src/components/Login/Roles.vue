
<template>
  <div class="Role">
    <div class="main">

      <div class="role-body">
        <div class="role-top">
          <p>请选择企业角色</p>
        </div>
        <div class="role-content">


        </div>
    </div>
    </div>
    
   
    
  </div>
</template>

<script>
  import server from "@/api/login";
  export default {
    name:'Role',
    data () {

      return {
        ruleForm: {
          username: '',
          password: ''
        },
       
    }
    },
    methods: {
     
     
    },
    mounted() {
     
    }
  }
</script>

<style lange="scss" scope>
  @import "../../common/styles/content.css";
</style>
