<template>
	<div class="ContractList">
		<div class="main">
			<div class="common-top">
				<div class="common-top-tab">
					<div :class="[activeTab?'btn-active':'btn-default']" @click="EnterPer">企业对个人</div>
					<div :class="[activeTab?'btn-default':'btn-active']" style="margin-left: -5px;" @click="EnterEnter">企业对企业</div>
				</div>
			</div>
			<div class='contract-type'>
				<el-tabs v-model="activeName" tab-position="40px">
					<el-tab-pane label="全部文件" name="first">
						<total-contract></total-contract>
					</el-tab-pane>
					<el-tab-pane label="待我签署" name="second">
						<inquiry-wait-me></inquiry-wait-me>
					</el-tab-pane>
						<el-tab-pane label="待他人签署" name="third">
					<inquiry-wait-others></inquiry-wait-others>
						</el-tab-pane>
					<el-tab-pane label="已生效" name="fourth">
						<inquiry-into-force></inquiry-into-force>
					</el-tab-pane>
					<el-tab-pane label="已截止" name="five">
						<inquiry-expired></inquiry-expired>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
   </div>
</template>
<style lang="scss" scoped>

@import "../../common/styles/content.css";
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
			color: #409EFF;
			border-bottom: 2px solid #409EFF;
		}

	}

</style>

<script>
import TotalContract from './TotalContract'
import InquiryWaitMe from './InquiryWaitMe'
import InquiryWaitOthers from './InquiryWaitOthers'
import InquiryIntoForce from './InquiryIntoForce'
import InquiryExpired from './InquiryExpired'
export default {
  name: 'ContractList',
  components: { TotalContract,InquiryWaitMe,InquiryWaitOthers,InquiryIntoForce,InquiryExpired },
  data() {
    return {
      activeTab:1,
      activeName:'first',
      isActive:true,
      contractListType:1              //合同列表类型：1: B2C  2:B2B ;   0: 小b  
    }
  },
  methods:{
    EnterPer:function () {
      this.activeTab = 1;
      sessionStorage.setItem('listType','1')
    },
    EnterEnter:function () {
      this.activeTab = 0;
      sessionStorage.setItem('listType','0')
    }
  }

}
</script>
<style lange='scss' scoped>
@import '../../styles/Multiparty/Multiparties.scss';
.el-button--primary:focus{
  background: #eee;
  border-color: #95989d;
  color: #333;
}
</style>


