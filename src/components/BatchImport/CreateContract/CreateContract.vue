<template>
    <div>
        <div class="Tops">
            <nav class='nav'>
                <p class='logo'>
                    <img src="/static/images/logo2.png" alt="">
                </p>
                <div class='buttons'>
                <el-button type="info" style='background:#ccc' :disabled="hasClick" @click="batchSigleCancel">取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</el-button>
                <el-button style='color:#4091fb' @click="keySign" :loading=load>一键签署</el-button>
                </div>
            </nav>
        </div>
        <div class="main-batch">
            <div class="main-batch-title">
                <div class="create-batch">创建合同</div>
            </div>
            <div class="create-batch-number">
                <span>批量编号</span>
                <span>1245453432413432324</span>
            </div>
            <div class="create-batch-table">
                <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%"
                    :row-style="tableRowStyle"
                    :header-cell-style="tableHeaderColor">
                    <el-table-column
                        prop="tradeNo"
                        label="序号"
                        width="150"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="tradeMoney"
                        label="合同名称"
                        width="300"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="tradeWay"
                        label="签署人名称"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="充值时间"
                        width="200"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center"
                        width="200">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        </template>
                    </el-table-column>
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
        </div>
        <Bottom></Bottom>
    </div>
</template>
<script>
import Bottom from '@/common/components/Bottom.vue'
export default {
    name: "CreateContract",
    data(){
        return {
            hasClick: false,
            load: false,
            totalItemNumber: 20,
            tableData: [
                {
                    tradeNo: "001",
                    tradeMoney: "借款方极乐世界",
                    tradeWay: "小明",
                    phone: "15745451254"
                },
                {
                    tradeNo: "002",
                    tradeMoney: "借款方极乐世界1",
                    tradeWay: "小明1",
                    phone: "15745451254"
                },
                {
                    tradeNo: "003",
                    tradeMoney: "借款方极乐世界2",
                    tradeWay: "小明2",
                    phone: "15745451254"
                }
			],
        }
    },
    components: {
        Bottom
    },
    methods: {
        batchSigleCancel() {

        },
        keySign() {

        },
        handleClick(row) {
            console.log(row)
        },
        //修改每页显示多少数据
        handleSizeChange(val) {

        },
        //点击切换分页数据
		handleCurrentChange(val) {
			// this.getList(val, 10);
        },
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
    }
}
</script>
<style lang="scss" scoped>
    @import "../../../common/styles/Tops.css";
    .main-batch {
        width: 1200px;
        background-color: #fff;
        margin: 0 auto;
        margin-top: 100px;
        padding: 15px;
        .main-batch-title {
            border-bottom: 1px solid #ddd;
            padding-bottom: 15px;
            .create-batch {
                height: 46px;
                line-height: 46px;
                background: url("/static/images/Common/title.png") no-repeat;
                padding-left: 40px;
                font-size: 20px;
                color: #fff;
            }
        }
        .create-batch-number {
            padding: 15px 0;
        }
        .create-batch-table {
            background-color: #fff;
        }
        .block {
            text-align: center;
            margin: 60px;
        }
            
    }

</style>
