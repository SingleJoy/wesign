<template>
 	<div class="charges">
		<el-table
			:data="tableData"
			stripe
			style="width: 100%"
			:row-style="tableRowStyle"
			:header-cell-style="tableHeaderColor">
			<el-table-column
				prop="transactionName"
				label="交易流水号"
				width="300"
				align="center">
			</el-table-column>
			<el-table-column
				prop="rechargeAmount"
				label="充值金额"
				width="200"
				align="center">
			</el-table-column>
			<el-table-column
				prop="paymentMode"
				label="支付方式"
				align="center">
			</el-table-column>
			<el-table-column
				prop="prepaidTime"
				label="充值时间"
				width="200"
				align="center">
			</el-table-column>
			<el-table-column
				prop="accountBalance"
				label="账户余额"
				width="200"
				align="center">
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
	name: "charges",
	data() {
        return {
          	tableData: [
				{
					transactionName: '64646464646364643',
					rechargeAmount: '5000',
					paymentMode: '对公账户打款',
					prepaidTime: '2017-1-12 09:20:09',
					accountBalance: '5000',
				},
				{
					transactionName: '64646464646364643',
					rechargeAmount: '5000',
					paymentMode: '对公账户打款',
					prepaidTime: '2017-1-12 09:20:09',
					accountBalance: '5000',
				},
				{
					transactionName: '64646464646364643',
					rechargeAmount: '5000',
					paymentMode: '对公账户打款',
					prepaidTime: '2017-1-12 09:20:09',
					accountBalance: '5000',
				},
				{
					transactionName: '64646464646364643',
					rechargeAmount: '5000',
					paymentMode: '对公账户打款',
					prepaidTime: '2017-1-12 09:20:09',
					accountBalance: '5000',
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
		}
	}
}
</script>

<style lang="stylus" scoped>
.charges
	width 1200px
	margin 20px auto
	background-color #fff
	padding 15px
	.block
		text-align center
		margin 60px
</style>

