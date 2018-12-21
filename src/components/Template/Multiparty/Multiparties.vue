<template>
  <div class='Multiparties'>
    <div class='main'>
      	<div class="">

				<el-tabs class="multi-tab" v-model="activeName">
					<el-tab-pane label="单次发起合同" name="first">
							<singleTemplate></singleTemplate>
					</el-tab-pane>
					<el-tab-pane label="批量发起合同" name="second">
						<batchTemplate></batchTemplate>
					</el-tab-pane>
				</el-tabs>

      	</div>
    </div>
  </div>
</template>
<style lang="scss">
  @import "../../../styles/Multiparty/Multiparties.scss";
  @import "../../../common/styles/content.scss";

.multi-tab{
	.el-tabs__header{
		background: #fff;
		margin-bottom: 20px;
		height: 126px;
		.el-tabs__active-bar{
			height:0;
		}
		.el-tabs__nav-scroll{
			padding:0;
			line-height: 48px;
			text-align: center;
			padding-top:38px;
			.el-tabs__nav{
				float:none;
			}
		}
		.el-tabs__item.is-top{
			width: 300px;
			height: 48px;
			background: #fff;
			border: 1px solid #4091fb;
			cursor: pointer;
			outline: none;
			   -webkit-box-shadow: none;
			box-shadow: none;
			line-height: 48px;
			text-align: center;
			display: inline-block;
			vertical-align: bottom;
			padding:0;
		}
		.el-tabs__item.is-active{
			border:none;
			width: 300px;
			height: 48px;
			background: #4091fb;
			color: #fff;
			cursor: pointer;
			outline: none;
			   -webkit-box-shadow: none;
			box-shadow: none;
			line-height: 48px;
			text-align: center;
			display: inline-block;
			vertical-align: bottom;
			padding:0;
		}
	}
	.el-tabs__nav-wrap::after{
		height:0;
	}
}

</style>
<script>
import SingleTemplate from './SingleTemplate'
import BatchTemplate from './BatchTemplate'
export default {
  name: 'Multiparties',
  components: { SingleTemplate,BatchTemplate },
  data() {
    return {
	//   activeTab: '1',
	  activeName:'first'
    }
  },
  methods:{
	// signCreate:function () {
    //    this.activeTab = 1
    // },
    // batchCreate:function () {
    //   this.activeTab = 0
    // }
  }
}
</script>


