<template>
    <div class="common-login">
        <div class="login-top">
            <p>
                <img src="" alt="众签">
            </p>
            <p class="login-top-right">
                <span>已有账号，</span>
                <span class="login-click-btn" @click="goLogin">立即登录</span>
            </p>

        </div>
        <div class='login-bg'>
        </div>

    </div>
 
</template>
<style lang="scss">
  @import "../styles/LoginTop.scss";
</style>

<script>
export default {
    name: 'LoginTop',
    data(){
        return{
            
            }
    },
    methods:{
        goLogin(){
            this.$router.push('/')
        }
    }
}
</script>



