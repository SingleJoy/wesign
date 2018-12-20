<template>
  <div class="PackagePurchases">
    <div class="PackagePurchases-main">
      <div class="main-header">
        <p class="title">套餐列表</p>
        <div class="right">
          <p>
            <a class="back-account" @click="backLast" href="javascript:void(0);">
              <span class="back-png"></span>返回
            </a>
            <b class="accountBalance"  id="accountBalance" style="font-size: 20px;">账户余额 : <span style="font-size: 30px">{{accountMoney}}元</span></b>
          </p>

        </div>
      </div>
      <div class="main-body">

        <div class="b2c-list list-common">
          <div class="b2c-list-title">对个人合同</div>
          <div class="list-content">
            <ul>
              <li v-for="(item,index) in B2cListArray" :key="index" @click="buyGoods(item)">
                <a href="javascript:void(0);">{{item.goodsName}}</a>
                <div>
                  <p><span>{{item.goodsPrice}}元</span></p>
                  <p>份数 : <span>{{item.goodsNum}}份</span></p>
                </div>
              </li>
            </ul>
          </div>
          <div class="clear"></div>
        </div>
        <div class="b2b-list list-common">
          <div class="b2c-list-title">对企业合同</div>
          <div class="list-content">
            <ul>
              <li v-for="(item,index) in B2bListArray" :key="index" @click="buyGoods(item)">
                <a href="javascript:void(0);">{{item.goodsName}}</a>
                <div>
                  <p><span>{{item.goodsPrice}}元</span></p>
                  <p>份数 : <span>{{item.goodsNum}}份</span></p>
                </div>
              </li>
            </ul>
          </div>
          <div class="clear"></div>
        </div>


      </div>
      <div class="main-header">
        <p class="title">购买记录</p>
      </div>
      <div class="package-table">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          :row-style="tableRowStyle"
          :header-cell-style="tableHeaderColor">
          <el-table-column
            prop="goodsName"
            label="套餐名称"
            width="300"
            align="center">
          </el-table-column>
          <el-table-column
            prop="goodsNum"
            label="合同份数"
            width="300"
            align="center">
          </el-table-column>
          <el-table-column
            prop="orderMoney"
            label="扣款金额"
            width="300"
            align="center">
          </el-table-column>
          <el-table-column
            prop="payTimeStr"
            label="购买时间"
            align="center">
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

    </div>

    <el-dialog :visible.sync="PurchaseDialog" width="450px" custom-class="PurchaseDialog" center>
      <div class="dialog-content">
        <div class="header">是否确认购买<span>【{{goodsName}}】</span></div>
        <div class="body">
          <p>扣款金额:<span>{{goodsPrice}}元</span></p>
          <p>支付方式 : 账户余额</p>
          <b>购买套餐前请确保账户余额充足，账户余额不足可能导致此次交易失败</b>

        </div>
        <div class="footer">
          <el-button @click="packageBuy(item)" :disabled="once" style="margin: 0 auto;background-color: #4091fb;width: 120px;color: #fff;">购买合同套餐</el-button>
        </div>
      </div>

    </el-dialog>

  </div>
</template>

<script>
  import {getGoods,getOrderList,buyGoods} from '@/api/purchase'
  export default {
    name: "PackagePurchases",
    data() {
      return {
        interfaceCode:sessionStorage.getItem("interfaceCode"),
        accountCode:sessionStorage.getItem("accountCode"),
        accountMoney:sessionStorage.getItem("accountMoney"),   //账户余额
        B2cListArray: [],        //b2c列表数据
        B2bListArray:[],   //b2b列表数据
        totalItemNumber: 0,
        tableData: [],
        currentPage: 1,
        PurchaseDialog:false,
        b2bNum:sessionStorage.getItem("b2bNum"),   //我的账户页面存储b2b剩余合同数量
        b2cNum:sessionStorage.getItem("b2cNum"),  //我的账户页面存储b2c剩余合同数量,
        goodsPrice:'',
        goodsName:'',
        params:'',
        once:false,
      }
    },
    methods:{
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
        console.log(val)
        this.getOrderListSearch(val);
        this.getGoods()
      },
      backLast(){
        this.$router.push('/Account')
      },
      getGoods(){
        getGoods().then(res=>{
          if(res.data.resultCode==1){
            let B2bListArray=[];
            let B2cListArray=[];
            if(res.data.dataList){
              for(let i=0;i<res.data.dataList.length;i++){
                if(res.data.dataList[i].goodsType==0){
                  B2bListArray.push(res.data.dataList[i])
                }else {
                  B2cListArray.push(res.data.dataList[i])
                }
              }
              this.B2bListArray=B2bListArray;
              this.B2cListArray=B2cListArray;
            }

          }else {
            this.$alert(res.data.resultMessage, '提示',{
              confirmButtonText: '确定'
            });
          }

        }).catch(error=>{

        })
      },

      getOrderListSearch(val){
        if(!val){
          val=1;       // 默认为1
        }
        let pageParams={
          pageNum:val,
          pageSize:'7'
        };
        getOrderList(this.interfaceCode,pageParams).then(res=>{
          if(res.data.resultCode==1){
            this.tableData=res.data.data.contents
            this.totalItemNumber=res.data.data.totalItemNumber

          }else {
            this.$alert(res.data.resultMessage, '提示',{
              confirmButtonText: '确定'
            });
          }
        }).catch(error=>{

        })
      },
      buyGoods(item){

        this.goodsName=item.goodsName;
        this.goodsPrice=item.goodsPrice;
        let params={
          'interfaceCode':this.interfaceCode,
          'accountCode':this.accountCode,
          'goodsName':item.goodsName,
          'goodsNo': item.goodsNo,
          'goodsNum': item.goodsNum,
          'goodsPrice': this.goodsPrice,
          'goodsStatus': item.goodsStatus,
          'goodsType':item.goodsType,
          'conSurlplusNum':(item.goodsType=='0')?this.b2bNum:this.b2cNum,
        };
        this.params=params;
        if(item.goodsPrice>this.accountMoney){

          this.$confirm(
            '对不起，您的账户余额不足以支持本次套餐购买服务请充值后再试','提示',
            {confirmButtonText: '确定',
              showCancelButton:false}).then(() => {
            this.router.push('/PackageBuy')
          }).catch(() => {

          });
        }else{
          this.PurchaseDialog=true;
        }

      },

      packageBuy(){

        this.once=true;
        this.$loading.show();
        buyGoods(this.interfaceCode,this.params).then(res=>{

          if(res.data.resultCode==1){
            this.once=false;
            this.$loading.hide();
            this.PurchaseDialog=false;
              // this.$alert(res.data.resultMessage, '提示',{
              //   confirmButtonText: '确定'
              // });
              this.$message({
                message: res.data.resultMessage,
                type: 'success'
              });

            this.PurchaseDialog=false;
            this.accountMoney=res.data.data.accountMoney;
            sessionStorage.setItem("accountMoney",this.accountMoney);

          }else if(res.data.resultCode==0){
            this.once=false;
            this.$loading.hide();
            this.$message({
              type: 'error',
              message: res.data.resultMessage,
              confirmButtonText: '确定',
              showCancelButton:'取消'}
            ).then(()=>{
              this.router.push('/PackageBuy');
            }).catch(()=>{

            })

          }
        }).catch(error=>{

        })
      }
    },
    created() {
      this.getGoods();//套餐列表数据
      this.getOrderListSearch();   //购买记录数据
    },

  }
</script>

<style lang="scss" scoped>
  @import "../../../styles/Account/PackagePurchase/PackagePurchases.scss";
  .warn-num{
   text-align:center;
     p{
       font-size:16px;
       text-align:center;
      }
     .title {
       font-size: 18px;
     }
  }
</style>
