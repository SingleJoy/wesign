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
			:page-size="10"
			layout="prev, pager, next, total, jumper"
			:total="totalItemNumber">
			</el-pagination>
		</div>
	</div>
</template>
<script>
import server from '@/api/url.js'
export default {
	name: "charges",
	data() {
        return {
			interfaceCode: sessionStorage.getItem("interfaceCode"),
			totalItemNumber: 0,
          	tableData: [

			],
		}
	},
	methods: {
        //修改table样式
		tableRowStyle({ row, rowIndex }) {
			return 'border: 1px solid red;'
        },
        //修改th样式
		tableHeaderColor({ row, column, rowIndex, columnIndex }) {
			if (rowIndex === 0) {
				return 'background-color: rgb(245, 245, 245);font-weight: bold;color: #333333;'
			}
		},
		handleSizeChange(val) {

        },
        //点击切换列表数据
		handleCurrentChange(val) {
			this.getList(val, 10);
        },
        //获取列表数据
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
				this.totalItemNumber = res.data.totalItemNumber;
				this.tableData = res.data.contents;
			}).then(error => {

			})
		}
	},
	created() {

  //第一次进去页面获取列表
		this.getList(1,10);
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

