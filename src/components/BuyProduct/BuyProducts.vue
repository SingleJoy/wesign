<template>
  <div class='BuyProducts'>
    <div class='products'>
      <div class='main'>
        <img src="/static/images/Container/product-new1.png" alt="" style='padding-top:140px;'>
        <br>
        <br>
        <br>

      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Merchants',
    methods: {
      back () {
        this.$router.push('Merchant')
      }
    }
  }
</script>
<style>
  .BuyProducts{
    width: 100%;
    height: 100%;
  }
  .products>.main{
    width: 1200px;
    margin: 20px auto;
    background: #FFF;
    text-align: center;
    height:800px;
  }
</style>
