<template>
  <div class="PackageBuys">
    <div class="PackageBuys-main">
      <div class="main-header">
        <p class="title">选择金额</p>
        <div class="right">
          <p>
            <a class="backHome back-home" @click="backHome" href="javascript:void(0);">
              <span class="back-png"></span>返回</a>
            <b class="accountBalance"   style="font-size: 20px">账户余额 : <span style="font-size: 30px">{{accountBalance}}元</span></b>
          </p>

        </div>
      </div>
      <div class="main-body">

        <div class="amount-content">
          <div class="amount-list">
            <ul>
              <li v-for="(item,index)  in amountList" :key="index" :class="{'active':(isActive==index)}" @click="tabList(index,item.num)"  ref="index">
                {{item.num}}元
              </li>
            </ul>
          </div>
          <div class="warn-tips">
            <div class="tip-header">温馨提示:</div>
            <div class="tip-body">
              <h4>
                1.充值成功后您的充值额将会存储到余额中，您可在【我的账户】-【账户信息】中查看
              </h4>
              <h4>
                2.您可以使用您账户中的余额购买合同套餐（余额不足将会导致购买失败）
              </h4>
            </div>
          </div>
        </div>


      </div>
      <div class="main-header" style="margin-top: 20px;">
        <p class="title">支付方式</p>
        <div class="right">
          <p>
            <b class="accountBalance" style="margin-top: 15px;">客服电话 : 400-0000-6923</b>
          </p>

        </div>
      </div>
      <div class="main-body">

        <div class="pay-content">
          <div class="pay-list">
            <ul>
              <li v-for="(item,index)  in amountPayList" :key="item.index" :class="{'active':(isPayActive==item.index)}" @click="tabPayList(item.index)" >
                <p></p>
              </li>
            </ul>
          </div>
          <div class="pay-operate">
            <div class="qrcode">
              <!--<img :src="[qrcodeUrl]" >-->
              <img src="/static/images/Account/PackageBuy/default-qrcode.png" >
            </div>
            <div class="show-pay-num">

              <p><span>实付款 : </span>￥<b>{{payNum}}.00</b></p>

            </div>

          </div>

        </div>

        <div class="goToPay">
          <a class="payNow" href="javascript:void(0);">立即支付</a>
        </div>

        <div class="warn-content">
          <div class="warn-tips" style="width: 50%;">
            <div class="tip-header">对公账户到账时间比较慢，建议使用支付宝和微信支付！:</div>
            <div class="tip-body">
              <h4>账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：0200095709200070521</h4>
              <h4>开  户  行：中国工商银行股份有限公司北京成府路支行</h4>
              <h4>开  户  行：中国工商银行股份有限公司北京成府路支行</h4>
            </div>
          </div>
          <div class="warn-tips">
            <div class="tip-header">温馨提示:</div>
            <div class="tip-body">
              <h4>1.建议打款金额为整数</h4>
              <h4>2.对公账户打款成功后，请联系众签客服（确认是否到账）</h4>
              <h4>3.因银行业务原因，对公账户打款到账可能会有2~24小时等待时间</h4>
            </div>
          </div>
        </div>

      </div>
    </div>


    <el-dialog :visible.sync="bugSuccessDialog" width="450px" custom-class="bug-success-dialog" center>
      <div class="dialog-content">
        <div class="header">账户余额充值成功</div>
        <div class="body">
          <p>当前账户余额为<span>{{accountBalance}}元</span></p>
          <p style="font-size: 14px;">您现在可以去购买合同套餐啦！！！</p>
        </div>
        <div class="footer">
          <a href="javascript:void(0);" @click="packageBuy">购买合同套餐</a>
        </div>
      </div>

    </el-dialog>


  </div>
</template>

<script>
  import {buyGoods} from '@/api/purchase'
  export default {
    name: "PackageBuys",
    data(){
      return{
        accountBalance:sessionStorage.getItem("accountMoney"),   //账户余额
        amountList:[
          {num:'399'},
          {num:'499'},
          {num:'599'},
        ],
        amountPayList:[
          {name:'支付宝',index:'0'},
          {name:'微信',index:'1'}
        ]
        ,
        isActive:'0',  //默认第一个套餐
        isPayActive:'0',  //默认支付宝支付
        qrcodeUrl:'',
        payNum:'399',
        bugSuccessDialog:false,
      }
    },
    methods:{
      backHome(){
        this.$router.push('/Account')
      },
      tabList(index,payNum){
        this.isActive=index;
        this.payNum=payNum;
      },
      tabPayList(index){
        this.isPayActive=index;
      },
      packageBuy(){
        this.$router.push('/PackagePurchase')
      }
    },
    created(){

    }

  }
</script>

<style lang="scss" scoped>
  @import "../../../styles/Account/PackageBuy/PackageBuy.scss";
</style>
