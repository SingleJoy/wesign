<template>
      <div v-html ="apply">
         {{apply}}
      </div>
</template>

<script>
  export default {
    name:"applyText",
    data(){
      return {
        apply:sessionStorage.getItem("html"),
      }
    } ,

    created(){

      this.$nextTick(()=> {
        document.forms[0].submit();
      })
    }
  }
</script>

