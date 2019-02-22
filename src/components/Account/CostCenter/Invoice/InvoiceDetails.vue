<template>
  <div class="InvoiceDetails">
    <div class="invoice-info">
      <div class="invoice-info-show">
        <div class="invoice-title">
          <div class="invoice-title-detail">发票详情</div>
        </div>
        <div class="invoice-content">
          <div class="invoice-img">
            <div class="invoice-code buy-common invoice-commom">{{invoiceList.invoiceCode}}</div>
            <div class="invoice-number buy-common invoice-commom">{{invoiceList.invoiceNum}}</div>
            <div class="invoice-date buy-common invoice-commom">{{invoiceList.invoiceTime}}</div>
            <div class="invoice-checking buy-common invoice-commom">{{invoiceList.checkCode}}</div>
            <div class="buy-unit buy-common">{{invoiceList.invoiceTitle}}</div>
            <div class="buy-identify buy-common">{{invoiceList.invoiceTaxNo}}</div>
            <div class="buy-location buy-common"></div>
            <div class="buy-bank buy-common"></div>
            <div class="buy-pwd buy-common">{{invoiceList.fpMw}}</div>
            <div class="shop-name buy-common shop-common">{{invoiceList.invoiceContent}}</div>
            <div class="shop-model buy-common shop-common"></div>
            <div class="shop-unit buy-common shop-common"></div>
            <div class="shop-num buy-common shop-common">1</div>
            <div class="shop-price buy-common shop-common">{{invoiceList.invoiceMoney}}</div>
            <div class="shop-money buy-common shop-common">{{invoiceList.invoiceMoney}}</div>
            <div class="shop-tax-rate buy-common shop-common">3%</div>
            <div class="shop-tax-paid buy-common shop-common">{{invoiceList.taxMoney}}</div>
            <div class="shop-total-big buy-common">{{invoiceList.toalmoney}}</div>
            <div class="shop-total-small buy-common">{{invoiceList.totalMoney}}</div>
            <div class="market-name buy-common market-common">北京众签科技有限公司</div>
            <div class="market-identify buy-common market-common">91110108085515424L</div>
            <div class="market-location buy-common market-common">北京市海淀区海淀大街3号1幢010-57625108</div>
            <div class="market-bank buy-common market-common">中国工商银行股份有限公司北京成府路支行0200095709200070521</div>
            <!-- <div>备注备注</div>
            <div>收款人</div>
            <div>复核</div> -->
            <div class="market-pepole buy-common">薛珂琪</div>
          </div>
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
              prop="tradeNo"
              label="交易流水号"
              row-class-name="changeTr"
              align="center">
            </el-table-column>
            <el-table-column
              prop="tradeContent"
              label="订单详情"
              align="center">
            </el-table-column>
            <el-table-column
              prop="tradeMoney"
              label="充值金额"
              align="center">
            </el-table-column>
            <el-table-column
              prop="rechargeTime"
              label="充值时间"
              align="center">
            </el-table-column>
            <el-table-column
              prop="tradeWay"
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
  import server from '@/api/url.js'
  export default {
    name: "InvoiceDetails",
    components:{

    },
    data(){
      return{
        downloadUrl: '',
        tableData: [],
        invoiceList: {}
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
      server.queryinvoiceDetail(param, interfaceCode).then(res => {
        let rechargeList = res.data.rechargeList;
        for(let i = 0; i < rechargeList.length; i++) {
          if(rechargeList[i].tradeWay == 0) {
            rechargeList[i].tradeWay = "对公打款";
          }else if(rechargeList[i].tradeWay == '1'){
            rechargeList[i].tradeWay = "余额";
          }else if(rechargeList[i].tradeWay == '2'){
            rechargeList[i].tradeWay = "支付宝";
          }else if(rechargeList[i].tradeWay == '3'){
            rechargeList[i].tradeWay = "微信";
          }
        }
        //pdf下载地址获取
        this.downloadUrl = res.data.pdfUrl;
        //发票详情赋值
        this.invoiceList = res.data;
        //发票信息赋值
        this.tableData = rechargeList;
      }).catch(error=>{

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
          background: url('/static/images/Common/title.png') no-repeat;
          .invoice-title-detail {
            margin-left: -40px;
          }
        }
        .invoice-info-table {
          margin: 20px 0;
        }
        .invoice-content {
          width: 852px;
          height: 578px;
          border: 2px solid #ddd;
          margin: 40px auto;
          .invoice-img {
            margin: 20px auto;
            font-size: 14px;
            height: 538px;
            width: 812px;
            background: url('/static/images/Account/invoice-img.png') no-repeat;
            background-size: 100%;
            position: relative;
            .buy-common {
              font-size: 12px;
              position: absolute;
              width: 312px;
              height: 18px;
              left: 134px;
              top: 135px;
              word-wrap: break-word;
              word-break: break-all;
              // background-color: red;
            }
            .invoice-commom {
              width: auto;
              left: 646px;
              top: 6px;
            }
            .invoice-code {

            }
            .invoice-number {
              top: 26px;
            }
            .invoice-date {
              top: 46px;
            }
            .invoice-checking {
              top: 66px;
            }
            .buy-unit {
              top: 95px;
            }
            .buy-identify {
              top: 113px;
            }
            .buy-location {
              top: 131px;
            }
            .buy-bank{
              top: 149px;
            }
            .buy-pwd {
              height: 74px;
              left: 478px;
              width: 305px;
              top: 92px;
            }
            .shop-common {
              top: 202px;
              height: 112px;
            }
            .shop-name {
              left: 10px;
              width: 186px;
            }
            .shop-model {
              left: 212px;
              width: 84px;
            }
            .shop-unit {
              left: 310px;
              width: 36px;
            }
            .shop-num {
              left: 358px;
              width: 66px;
            }
            .shop-price {
              left: 434px;
              width: 66px;
            }
            .shop-money {
              left: 510px;
              width: 108px;
            }
            .shop-tax-rate {
              left: 628px;
              width: 32px;
            }
            .shop-tax-paid {
              left: 674px;
              width: 108px;
            }
            .shop-total-big {
              top: 351px;
              left: 219px;
              width: 384px;
            }
            .shop-total-small {
              top: 351px;
              left: 672px;
              width: 110px;
            }
            .market-common {
              top: 378px;
              left: 136px;
              width: 302px;
            }
            .market-name {

            }
            .market-identify {
              top: 396px;
            }
            .market-location {
              top: 414px;
            }
            .market-bank {
              top: 432px;
            }
            .market-pepole {
              top: 472px;
              left: 494px;
              width: auto;
            }
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
