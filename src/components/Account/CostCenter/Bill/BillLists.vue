<template>
    <div class="BillLists">
		<el-table
			:data="tableData"
			stripe
			style="width: 100%"
			:row-style="tableRowStyle"
			:header-cell-style="tableHeaderColor">
			<el-table-column
				prop="accountTitle"
				label="对账单标题"
				width="400"
				align="center">
			</el-table-column>
			<el-table-column
				prop="createTime"
				label="生成时间"
				width="400"
				align="center">
			</el-table-column>
			<el-table-column
				label="操作"
				width=""
				align="center">
				<template slot-scope="scope">
					<el-button @click="viewDetail(scope.row)" type="text" size="small">查看详情</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="block">
			<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="currentPage"	
			:page-size="3"
			layout="prev, pager, next, total, jumper"
			:total="6">
			</el-pagination>
		</div>
    </div>
</template>

<script>
export default {
	name: "BillLists",
	data() {
        return {
          	tableData: [
				{
					accountTitle: '2018-10月度账单',
					createTime: '2017-1-12',
				},
				{
					accountTitle: '2018-10月度账单',
					createTime: '2017-1-12',
				},
				{
					accountTitle: '2018-10月度账单',
					createTime: '2017-1-12',
				},
				{
					accountTitle: '2018-10月度账单',
					createTime: '2017-1-12',
				},
				{
					accountTitle: '2018-10月度账单',
					createTime: '2017-1-12',
				},
			],
			currentPage: 4
		}
	},
	methods: {
		tableRowStyle({ row, rowIndex }) {
			return 'border: 1px solid red;'
		},
		tableHeaderColor({ row, column, rowIndex, columnIndex }) {
			if (rowIndex === 0) {
				return 'background-color: rgb(245, 245, 245);font-weight: bold;color: #333333;'
			}
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
		},
		viewDetail() {
			this.$router.push('/CostCenter/BillDetail');
		}
	}
}
</script>

<style lang="stylus" scoped>
.BillLists
	margin 20px auto
	background-color #fff
	.block
		text-align center
		margin 60px
</style>
