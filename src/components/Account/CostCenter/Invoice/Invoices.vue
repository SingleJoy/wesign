<template>
  <div class="Invoices">
    <div class="Invoices-body" style="background-color: #fff;">
      <div class="data-content" >
            <el-table
                :data="tableData"
                stripe
                style="width: 100%;text-align: center"
                :header-cell-style="tableHeaderColor">
                <el-table-column
                    prop="invoiceId"
                    label="发票号码"
                    width="400"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="totalMoney"
                    label="金额"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="invoiceType"
                    label="发票类型"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="invoiceTime"
                    label="开票时间"
                    align="center">
                </el-table-column>
                <!-- <el-table-column
                    prop="accountBalance"
                    label="账户余额"
                    width="200"
                    align="center">
                </el-table-column> -->
                <el-table-column
                    prop="operation"
                    label="操作"
                    width="200"
                    align="center">
                    <template slot-scope="scope">
                        <el-button @click="viewDetail(scope.row)" type="text" size="small" v-if="scope.row.invoiceType=='电子发票'">查看详情</el-button>
                        <el-button type="text" size="small" v-if="scope.row.invoiceType=='纸质发票'"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block" style="text-align: center;margin: 60px;">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="10"
                    layout="prev, pager, next, total, jumper"
                    :total="totalItemNumber">
                </el-pagination>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import server from '@/api/url.js'
export default {
    name: "Invoices",

    data(){
      	return{
			interfaceCode: '',
			totalItemNumber: 0,
			tableData: [
				{
					transactionName: '64646464646364643',
					rechargeAmount: '5000',
					paymentMode: '对公账户打款',
					prepaidTime: '2017-1-12 09:20:09',
					accountBalance: '5000',
				}
			],
			currentPage:1,
		}
    },
    methods:{
		//修改table的th的样式
		tableHeaderColor({ row, column, rowIndex, columnIndex }) {
			if (rowIndex === 0) {
				return 'background-color: rgb(245, 245, 245);font-weight: bold;color: #333;'
			}
		},
		handleSizeChange(val) {

        },
        //点击页码切换列表
		handleCurrentChange(val) {
			this.getList(val,10)
		},
		//查看详情
		viewDetail(scope){
			this.$router.push({path:'/CostCenter/InvoiceDetail', query: {invoiceId: scope.invoiceId}});
		},
		//发票列表分页
		getList(pageNum, pageSize) {
			let param = {
				pageNum: pageNum,
				pageSize: pageSize
			}
			server.queryinvoiceList(param,this.interfaceCode).then(res => {
				let content = res.data.content;
				for(var i = 0; i < content.length; i++) {
					if(content[i].invoiceType == 0) {
						content[i].invoiceType = "电子发票";
					} else if(content[i].invoiceType == 1) {
						content[i].invoiceType = "纸质发票";
                        this.isShow = false;
					}
				}
				this.totalItemNumber = res.data.totalItemNumber;
				this.tableData = res.data.content;
			}).catch(error => {

			})
		}
	},
	created() {
		this.interfaceCode = sessionStorage.getItem("interfaceCode");
		//第一次进入页面获取发票列表
		this.getList(1,10);
	}
}
</script>

<style scoped>


</style>
