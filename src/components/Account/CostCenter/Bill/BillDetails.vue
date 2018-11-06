<template>
    <div class="BillDetails">
        <div class="BillDetails-tabs">
                <div class="download" @click="download()">下载</div>
                <div class="account-title">
                    <div class="account-title-left">{{getTitle}}</div>
                    <div class="account-title-right">
                        <div class="date">日期：{{createTime}}</div>
                        <div class="unit">单位/份</div>
                    </div>
                </div>
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%"
                    :header-cell-style="tableHeaderColor"
                    :row-style="tableRowStyle">
                    <el-table-column
                        fixed
                        prop="signType"
                        label="签署场景"
                        row-class-name="changeTr"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="signNum"
                        label="本月使用量"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="rechargeNum"
                        label="本月充值量"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="totalSignNum"
                        label="累计使用用量"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="totalRechargeNum"
                        label="累计充值用量"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="contractNum"
                        label="剩余用量"
                        align="center"
                        width="200">
                    </el-table-column>
                </el-table>
        </div>
    </div>
</template>
<script>
import Charge from '../Charge/Charge'
import Invoice from '../Invoice/Invoice'
import server from '../../../../api/url.js'
export default {
    name: 'BillDetails',
    data() {
        return{
            interfaceCode: '',
            getTitle: '',
            createTime: '',
            tableData: [
               
            ]
        }
    },
    components:{
        Charge,
        Invoice
    },
    methods:{
        AccoutCenter(){
            this.$router.push('/Account')
        },
        CostCenter(){
            this.$router.push('/CostCenter')
        },
        changeTr() {
            return 'color: blue;'
        },
        tableHeaderColor({ row, column, rowIndex, columnIndex }) {
			if (rowIndex === 0) {
				return 'color: #333333;height: 84px; font-size: 18px;'
            }
        },
        tableRowStyle({ row, column, rowIndex, columnIndex }) {
            return 'height: 84px;color: #666666;font-size: 18px;'
        },
        download() {
            const billTitle = this.$route.query.billTitle
            var url = "/api/v1.6/tenant/" + this.interfaceCode + "/" + billTitle + "/downloadWesignBill";
            var download = document.createElement('a');
            document.body.appendChild(download)
            download.setAttribute('href',url);
            download.click()
        }
    },
    created() {
        const billTitle = this.$route.query.billTitle
        this.interfaceCode = sessionStorage.getItem('interfaceCode');
        server.queryStatementDetail(this.interfaceCode, billTitle).then(res => {
            const dataList = res.data.dataList;
            for(let i = 0; i < dataList.length; i++) {
                if(dataList[i].signType == 0) {
                    dataList[i].signType = "对企业签署";
                } else if(dataList[i].signType == 1){
                    dataList[i].signType = "对个人签署";
                }
            }
            this.getTitle = dataList[0].companyName + dataList[0].billTitle;
            this.createTime = dataList[0].createTime;
            this.tableData = dataList;
        }).then(error => {

        }) 
    }
}
</script>
<style lang="scss" scoped>
  @import "../../../../styles/Account/CostCenter/CostCenter.scss";
</style>
<style>
.BillDetails .BillDetails-tabs .el-tabs__item.is-active {
    color: #4091fb;
    border-bottom: 2px solid #4091fb;
}
.BillDetails .BillDetails-tabs .el-tabs__item {
    height: 58px;
    line-height: 58px;
}
.BillDetails .BillDetails-tabs .el-table--border {
    border: 2px solid #4091fb;
    border-top: 1px solid #4091fb;
}
.BillDetails .BillDetails-tabs .el-table--border td{
    border-right: 1px solid #4091fb;
    border-bottom: 1px solid #4091fb;
}
.BillDetails .BillDetails-tabs .el-table th.is-leaf {
    border-right: 1px solid #4091fb;
    border-bottom: 1px solid #4091fb;
}
</style>

<style lang="scss" scoped>
#tab-first,#tab-second,#tab-third{
    font-size: 16px;
}
.BillDetails{
    .BillDetails-tabs{
        margin-bottom: 20px;
        .download{
            text-align: right;
            margin-bottom: 10px;
            color: #4091fb;
            cursor: pointer;
        }
        .account-title{
            height: 84px;
            display: flex;
            border: 2px solid #4091fb;
            border-bottom: 1px dashed #4091fb;
            .account-title-left{
                line-height: 84px;
                text-align: center;
                flex: auto;
            }
            .account-title-right{
                width: 200px;
                border-left: 1px solid #4091fb;
                .date{
                    text-align: center;
                    margin-top: 14px;
                }
                .unit{
                    text-align: right;
                    margin-right: 36px;
                    margin-top: 16px;
                    font-size: 18px;
                    color: #666666;
                }
            }
        }
    }
}
</style>


