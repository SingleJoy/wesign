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
 
</style>

<script>

export default {
  name: 'ContractList',
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


