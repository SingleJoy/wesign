<template>
	<div class="InvoiceDetails">
		<div class="invoice-info">
			<div class="invoice-info-show">
				<div class="invoice-title">
					<div class="invoice-title-detail">发票详情</div>
				</div>
				<div class="invoice-img">
					<div class="invoice-code buy-common invoice-commom">{{invoiceList.invoiceCode}}</div>
					<div class="invoice-number buy-common invoice-commom">{{invoiceList.invoiceNum}}</div>
					<div class="invoice-date buy-common invoice-commom">{{invoiceList.invoiceTime}}</div>
					<div class="invoice-checking buy-common invoice-commom">{{invoiceList.checkCode}}</div>
					<div class="buy-unit buy-common">{{invoiceList.invoiceTitle}}</div>
					<div class="buy-identify buy-common">{{invoiceList.invoiceTaxNo}}</div>
					<div class="buy-location buy-common"></div>
					<div class="buy-bank buy-common"></div>
					<div class="buy-pwd buy-common">中国银行321022154558874554788</div>
					<div class="shop-name buy-common shop-common">{{invoiceList.invoiceContent}}</div>
					<div class="shop-model buy-common shop-common"></div>
					<div class="shop-unit buy-common shop-common"></div>
					<div class="shop-num buy-common shop-common">1</div>
					<div class="shop-price buy-common shop-common">{{invoiceList.invoiceMoney}}</div>
					<div class="shop-money buy-common shop-common">{{invoiceList.invoiceMoney}}</div>
					<div class="shop-tax-rate buy-common shop-common">3%</div>
					<div class="shop-tax-paid buy-common shop-common">taxMoney</div>
					<div class="shop-total-big buy-common">五千两百元</div>
					<div class="shop-total-small buy-common">{{invoiceList.totalMoney}}</div>
					<div class="market-name buy-common market-common">北京众签科技有限公司</div>
					<div class="market-identify buy-common market-common">91110108085515424L</div>
					<div class="market-location buy-common market-common">北京市海淀区海淀大街3号1幢400-0000-6923</div>
					<div class="market-bank buy-common market-common">中国工商银行股份有限公司北京成府路支行0200095709200070521</div>
					<!-- <div>备注备注</div>
					<div>收款人</div>
					<div>复核</div> -->
					<div class="market-pepole buy-common">薛珂琪</div>
				</div>
			</div>
			<div class="invoice-info-particulars">
				<div class="invoice-title">
					<div class="invoice-title-detail">交易信息</div>
				</div>
				<div class="invoice-info-table">
					<el-table
						:data="tableData"
						border
						style="width: 100%"
						:header-cell-style="tableHeaderColor"
						:row-style="tableRowStyle">
						<el-table-column
							fixed
							prop="rechargeId"
							label="交易流水号"
							row-class-name="changeTr"
							align="center">
						</el-table-column>
						<el-table-column
							prop="rechargeName"
							label="订单详情"
							align="center">
						</el-table-column>
						<el-table-column
							prop="rechargeMoney"
							label="充值金额"
							align="center">
						</el-table-column>
						<el-table-column
							prop="rechargeTime"
							label="充值时间"
							align="center">
						</el-table-column>
						<el-table-column
							prop="rechargeType"
							label="支付方式"
							align="center">
						</el-table-column>
					</el-table>
				</div>
			</div>
			<div class="download" @click="download()">
				<el-button type="primary">下载到本地</el-button>
			</div>
		</div>
	</div>
</template>

<script>
import server from '../../../../api/url.js'
export default {
	name: "InvoiceDetails",
	components:{

	},
	data(){
		return{
			downloadUrl: '',
			tableData: [
				
			],
			invoiceList: {
				invoiceCode: '',
				invoiceNum: '',
				invoiceTime: '',
				checkCode: '',
				invoiceTitle: '',
				invoiceTaxNo: '',
				invoiceContent: '',
				invoiceMoney: '',
				taxMoney: ''
			}
		}
	},
	methods:{
        //修改table样式
		tableHeaderColor({ row, column, rowIndex, columnIndex }) {
			if (rowIndex === 0) {
				return 'color: #333333;height: 70px; font-size: 18px;'
            }
        },
        //修改tr样式
		tableRowStyle({ row, column, rowIndex, columnIndex }) {
            return 'height: 70px;color: #666666;font-size: 18px;'
        },
        //下载
		download() {
            let download = document.createElement('a');
            document.body.appendChild(download)
            download.setAttribute('href',this.downloadUrl);
            download.click()
        }
	},
	created() {
        //获取发票invoiceId
        const invoiceId = this.$route.query.invoiceId;
        //获取interfaceCode
		const interfaceCode = sessionStorage.getItem("interfaceCode");
		const param = {
			invoiceId: invoiceId
        }
        //查询发票详情
		server.queryinvoiceDetail({invoiceId:'000000000001'}, interfaceCode).then(res => {
			let rechargeList = res.data.rechargeList;
			for(var i = 0; i < rechargeList.length; i++) {
				if(rechargeList[i].rechargeType == 0) {
					rechargeList[i].rechargeType = "对公打款";
				}
            }
            //pdf下载地址获取
            this.downloadUrl = res.data.pdfUrl;
            //发票详情赋值
            this.invoiceList = res.data;
            //发票信息赋值
			this.tableData = rechargeList;
		})
	}
}
</script>
<style lang="scss">
.InvoiceDetails .invoice-info .el-tabs__item.is-active {
    color: #4091fb;
    border-bottom: 2px solid #4091fb;
}
.InvoiceDetails .invoice-info .el-tabs__item {
    height: 58px;
    line-height: 58px;
}
.InvoiceDetails .invoice-info .el-table--border {
    border: 2px solid #4091fb;
    border-top: 2px solid #4091fb;
}
.InvoiceDetails .invoice-info .el-table--border td{
    border-right: 1px solid #4091fb;
    border-bottom: 1px solid #4091fb;
}
.InvoiceDetails .invoice-info .el-table th.is-leaf {
    border-right: 1px solid #4091fb;
    border-bottom: 1px solid #4091fb;
}
</style>
<style lang="scss" scoped>
.InvoiceDetails{
    .invoice-info{
		.invoice-info-show, .invoice-info-particulars {
			.invoice-title {
				height: 46px;
				width: 188px;
				color: #fff;
				line-height: 46px;
				text-align: center;
				background: url('../../../../../static/images/Common/title.png') no-repeat;
				.invoice-title-detail {
					margin-left: -40px;
				}
			}
			.invoice-info-table {
				margin: 20px 0;
			}
			.invoice-img {
				font-size: 14px;	
				height: 758px;
				width: 1160px;
				background: url('../../../../../static/images/Account/invoice-img.png') no-repeat;
				background-size: 100%;
				margin: 20px 0;
				position: relative;
				.buy-common {
					position: absolute;
					width: 454px;
					height: 18px;
					// background-color: red;
					left: 188px;
					top: 135px;
					word-wrap: break-word; 
					word-break: break-all; 
				}
				.invoice-commom {
					width: 210px;
					left: 914px;
					top: 12px;
				}
				.invoice-code {
					
				}
				.invoice-number {
					top: 38px;
				}
				.invoice-date {
					top: 64px;
				}
				.invoice-checking {
					top: 92px;
				}
				.buy-unit {
					
				}
				.buy-identify {
					top: 162px;
				}
				.buy-location {
					top: 188px;
				}
				.buy-bank{
					top: 214px;
				}
				.buy-pwd {
					height: 100px;
					left: 686px;
					width: 431px;
				}
				.shop-common {
					top: 288px; 
					height: 160px;
				}
				.shop-name {
					left: 17px;
					width: 258px;
				}
				.shop-model {
					left: 305px;
    				width: 118px;
				}
				.shop-unit {
					left: 444px;
					width: 50px;
				}
				.shop-num {
					left: 510px;
					width: 98px;
				}
				.shop-price {
					left: 620px;
					width: 96px;
				}
				.shop-money {
					left: 728px;
					width: 156px;
				}
				.shop-tax-rate {
					left: 894px;
					width: 54px;
				}
				.shop-tax-paid {
					left: 960px;
					width: 160px;
				}
				.shop-total-big {
					top: 506px;
					left: 308px;
					width: 540px;
				}
				.shop-total-small {
					top: 506px;
					left: 958px;
					width: 160px;
				}
				.market-common {
					top: 545px;
					left: 190px;
					width: 431px;
				}
				.market-name {

				}
				.market-identify {
					top: 570px;
				}
				.market-location {
					top: 598px;
				}
				.market-bank {
					top: 622px;
				}
				.market-pepole {
					top: 678px;
					left: 718px;
					width: auto;
				}
			}
		}
        .download {
			width: 100px;
			color: #4091fb;
			margin: 20px auto;
        }
    }
}
</style>
