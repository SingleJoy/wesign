<template>
    <div class="QRcode">
        <div class="code-box">
            <div class="code-first"> 
                <p>微信公众号</p>
                <img src="/static/images/Login/QRcode-login.png" alt="">
            </div>
            <div class="wx-program">
                <p>微信小程序</p>
                <img src="/static/images/Login/wx-program.jpg" alt="">
            </div>
        </div>
        
    </div>
</template>
<style scoped>
.QRcode {
    text-align: center;
    margin-top: 30px;
}
img {
    margin-top: 10px;
    width: 100px;
}
.code-box{
    display: flex;
    margin: 0 auto;
    justify-content: center;
}
.code-first{
    margin-right: 70px;
}
</style>

