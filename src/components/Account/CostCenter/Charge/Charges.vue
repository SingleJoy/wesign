<template>
 	<div class="charges">
		<el-table
			:data="tableData"
			stripe
			style="width: 100%"
			:row-style="tableRowStyle"
			:header-cell-style="tableHeaderColor">
			<el-table-column
				prop="rechargeId"
				label="交易流水号"
				width="300"
				align="center">
			</el-table-column>
			<el-table-column
				prop="rechargeMoney"
				label="充值金额"
				width="200"
				align="center">
			</el-table-column>
			<el-table-column
				prop="rechargeType"
				label="支付方式"
				align="center">
			</el-table-column>
			<el-table-column
				prop="rechargeTime"
				label="充值时间"
				width="200"
				align="center">
			</el-table-column>
			<!-- <el-table-column
				prop="accountBalance"
				label="账户余额"
				width="200"
				align="center">
			</el-table-column> -->
		</el-table>
		<div class="block">
			<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="1"
			:page-size="1"
			layout="prev, pager, next, total, jumper"
			:total="totalPageNumber">
			</el-pagination>
		</div>
	</div>
</template>

<script>
import server from '../../../../api/url.js'
export default {
	name: "charges",
	data() {
        return {
			interfaceCode: '',
			totalPageNumber: 0,
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
			
		},
		handleCurrentChange(val) {
			this.getList(val, 1);
		},
		getList(pageNum, pageSize) {
			let param = {
				pageNum: pageNum,
				pageSize: pageSize
			}
			server.rechargeRecord(param, this.interfaceCode).then(res => {
				let contents = res.data.contents;
				for(var i = 0; i < contents.length; i++) {
					if(contents[i].rechargeType == 0) {
						contents[i].rechargeType = "对公打款"
					}
				}
				this.totalPageNumber = res.data.totalPageNumber;
				this.tableData = res.data.contents;
			}).then(error => {

			})
		}
	},
	created() {
		this.interfaceCode = sessionStorage.getItem("interfaceCode");
		this.getList(1,1);
	}
}
</script>

<style lang="stylus" scoped>
.charges
	background-color #fff
	.block
		text-align center
		margin 60px
</style>

