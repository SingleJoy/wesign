<template>

  <div class="ActivateChildAccounts">

    <div class="main" >

      <div class="container">

        <div class="content">

          <div class="content-body">

            <p class="title">激活子账号</p>

            <div class="border-bottom"  ></div>

            <div class="active-account"></div>

          </div>


        </div>

      </div>
    </div>
  </div>
</template>



<script>
  import Accounts from '../Accounts'
	export default {
    component:{
      Accounts
    },
		data() {
			return {

			}
		}
	}
</script>
<style lang="stylus">
  @import "../../../../styles/Confirmation/Account/ChildAccount.styl";
  .content-body>p.title{
    background: url("../../../../../static/images/Common/title.png") no-repeat;
  }
</style>
