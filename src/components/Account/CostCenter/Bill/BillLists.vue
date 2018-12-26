<template>
    <div class="BillLists">
		<el-table
			:data="tableData"
			stripe
			style="width: 100%"
			:row-style="tableRowStyle"
			:header-cell-style="tableHeaderColor">
			<el-table-column
				prop="billTitle"
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
			:page-size="7"
			layout="prev, pager, next, total, jumper"
			:total="totalItemNumber">
			</el-pagination>
		</div>
    </div>
</template>

<script>
import server from '@/api/url.js'
export default {
	name: "BillLists",
	data() {
        return {
			interfaceCode: sessionStorage.getItem("interfaceCode"),
			totalItemNumber: 0,
      tableData: [

			],
			currentPage: 1
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
			// console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			this.getList(val);
		},
		viewDetail(scope) {
			this.$router.push({path:'/CostCenter/BillDetail', query: {billTitle: encodeURI(scope.billTitle)}});
		},
		getList(pageNum) {
			let params = {
				pageNum: pageNum,
				pageSize: 7
			};
			server.queryStatementList(params, this.interfaceCode).then(res => {
				this.tableData = res.data.contents;
				this.totalItemNumber = res.data.totalItemNumber
			}).then(error => {

			})
		}
	},
	created() {

		this.getList(1,1)
	}
}
</script>

<style lang="stylus" scoped>
.BillLists
	background-color #fff
	.block
		text-align center
		margin 60px
</style>
