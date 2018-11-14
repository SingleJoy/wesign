<template>
  <div class="Top">
    <nav class='nav'>
      <p class='logo'>
        <img src="../../../static/images/Top/v1.6-logo.png" alt="logo图">
      </p>
      <p  class="signout-btn" @click="amendPassWord"><img src="../../../static/images/back.png" alt=""><a href="javascript:void(0);">退出</a></p>
    </nav>
  </div>

</template>
<style lang="scss" scoped>
@import "../styles/Top.scss";
.signout-btn{
  float: right;
  margin-top: 25px;
  a{
    float: right;
    color: #fff;
    margin-left: 10px;
  }
}

</style>
<script>
import cookie from '@/common/js/getTenant'
export default {
  name: 'Top',
      data() {
      return {
        baseURL:this.baseURL.BASE_URL,
        fullscreenLoading: false,
        popup:false,
        Type:{contractType:'0'},
        uploadFile:true,
        interfaceCode:cookie.getJSON('tenant')?cookie.getJSON('tenant')[1].interfaceCode:'',
        tabIndex:''
      }
    },
    methods: {
      amendPassWord() {
        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, '是否确定要退出？ '),
            h('i', { style: 'color: teal' }, '')
          ]),
          center:true,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                this.signOut()
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 500);
              }, 1000);
            } else {
              done();
              this.resubmit = true
              this.$message({
                type: 'info',
                message: '取消退出操作'
              });
            }
          }
        })
      },
      signOut () {
        this.$http.get(process.env.API_HOST+'v1/tenant/exitAndDeleteSession').then(function (res) {
          if(res.data.sessionStatus == '0'){
            this.$router.push('/')
          } else {
            this.$message({
              showClose: true,
              message: res.body.message,
              type: 'success'
            })
            this.$router.push('/')
          }
        })
      },
       tabActive(value){
        this.$store.dispatch('tabIndex',{tabIndex:value});
        this.tabIndex = this.$store.state.tabIndex;

      },
    }


}
</script>

