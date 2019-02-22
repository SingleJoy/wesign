<template>
  <div class="loading">
    <img src="/static/images/load.gif" alt="">
  </div>
</template>

<script>
  export default {
    name: 'loading',
    data () {
      return {}
    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .loading{
    position: fixed;
    top:0;
    left:0;
    z-index:121;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  .loading>img{
    margin:5rem auto;
  }
</style>
