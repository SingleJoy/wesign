<template>
	<div class="CompanyContracts">
		<div class="main">
			<div class="common-top">
			<div class="common-top-tab">
				<div class="btn-default" @click="EnterPer">企业对个人</div>
				<div class="btn-active" style="margin-left: -5px;" @click="EnterEnter">企业对企业</div>
			</div>
		</div>
		<div class='contract-type'>
			<el-tabs v-model="activeName" tab-position="40px">
			<el-tab-pane label="全部文件" name="first">
				<total-cont></total-cont>
			</el-tab-pane>
			<el-tab-pane label="待我签署" name="second">
				<inquiry-wa-me></inquiry-wa-me>
			</el-tab-pane>
			<el-tab-pane label="待他人签署" name="third">
				<inquiry-wa-other></inquiry-wa-other>
			</el-tab-pane>
			<el-tab-pane label="已生效" name="fourth">
				<inquiry-into></inquiry-into>
			</el-tab-pane>
			<el-tab-pane label="已截止" name="five">
				<inquiry-exp></inquiry-exp>
			</el-tab-pane>
			</el-tabs>
		</div>
		</div>
	</div>

</template>
<style lang="scss" scope>

@import "../../common/styles/content.scss";
  .btn-default{
    width: 300px;
    height: 46px;
    background: #fff;
    border: 1px solid #4091fb;
    cursor: pointer;
    outline: none;
    box-shadow: none;
    line-height: 48px;
    text-align: center;
    display: inline-block;
    vertical-align: bottom;
  }
  .btn-active{
    width: 300px;
    height:48px;
    background:#4091fb;
    color: #fff;
    cursor: pointer;
    outline: none;
    box-shadow: none;
    line-height: 48px;
    text-align: center;
    display: inline-block;

    vertical-align: bottom;
  }
  .el-tabs__nav-scroll{
    font-size: 16px;
    color: #333;
  }
  #tab-first,#tab-second,#tab-third,#tab-fourth,#tab-five{
    font-size: 16px;
  }
  .el-table th>.cell{
    text-align: center;
  }
  #app{
    overflow: hidden;
  }
  .el-table__row .cell{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .contract-type{
	.el-tabs__header{
		background: #fff;
		margin: 0 auto;
	}
	.el-tabs__nav-scroll{
		line-height: 58px;
		padding:0 25px;
	}
	.el-tabs__item{
		height:58px;
		line-height: 58px;
	}
	.el-tabs__item.is-active {
		color: #4091fb;
		border-bottom: 2px solid #4091fb;
	}

}
  .optPower{
    width: 630px;
    margin: 0 auto;
    padding-left: 5px;
    padding-right: 5px;
    padding-top:30px;
    padding-bottom: 18px;
  }
</style>

<script>
  import TotalCont from './TotalCont'
  import InquiryWaMe from './InquiryWaMe'
  import InquiryWaOther from './InquiryWaOther'
  import InquiryInto from './InquiryInto'
  import InquiryExp from './InquiryExp'
  export default {
    name: 'Mycontracts',
    components: { TotalCont,InquiryWaMe,InquiryWaOther,InquiryInto,InquiryExp },
    data() {
      return {
        // activeName:sessionStorage.getItem('second')
        activeName:'first',
        isActive:true
      }
    },
    methods:{
      EnterPer:function () {
        this.$router.push("/Mycontract")
      },
      EnterEnter:function () {
        this.$router.push("/CompanyContract")
      }
    }

  }
</script>
<style lange='css' scoped>
  @import '../../styles/Multiparty/Multiparties.scss';
  .el-button--primary:focus{
    background: #eee;
    border-color: #95989d;
    color: #333;
  }
</style>
