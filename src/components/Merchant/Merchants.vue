<template>
  <div class='Merchants'>

    <div v-show="topTip == false" class="main_tips" id="main_tips">
      <span style="text-align: left;padding-left: 10px;">您还未完成实名认证，为了不影响您正常业务办理，请进入<span class="to-account" @click="toMyAccount">【我的账户】</span>完成实名认证</span>
      <span class="cancelBtn" @click="cancelTip">X</span>
    </div>

    <div class='main'>

      <div class='main_left'>
        <!--<div class='upload' style='cursor:point'>-->
        <!--<div style='cursor:pointer;'  @click='choice' class="el-upload__text"><img src="../../../static/images/add1.png" alt="" style='width:679px;'></div>-->
        <!--</div>-->
        <div class='merchant-upload' style='border:none;'>
          <div style='cursor:pointer;'  @click='choice' class="el-upload__text">
            <img src="../../../static/images/add1.png" alt="" style='width:680px;height:152px;'>
          </div>

        </div>
        <p class='context' style="text-align: left;">
          模板发起合同
        </p>
        <div class='icons'>
          <div  class='single' v-if='count>0'>
            <div v-for="(item,index) in arr" :key="index">
              <div class='one' v-on:click="jumper(item,index)" style='border: 1px solid #ccc;'>
                <img src="../../../static/images/Container/icons_1.png" alt="">
                <span style='color:#22a7ea'>{{item.name}}</span>
              </div>
            </div>
            <div class='two'>
              <span>选择其他>></span>
            </div>
          </div>
          <div class='more' v-else>
            <div class='more1'>
              <h3><img src="../../../static/images/single.png" alt=""><span @click='more'>了解模板>></span></h3>
            </div>
          </div>
        </div>
      </div>
      <div class='main_right'>
        <p style='clear:both;text-align: left;'>合同概括</p>
        <div class='right1' @click="animated">
          <span>{{waitMe}}</span>
          <span>待我签署</span>
        </div>
        <div class='right2' @click='wait'>
          <span>{{waitOther}}</span>
          <span>待他人签署</span>
        </div>
        <div class='right3' @click='takeEff'>
          <span>{{takeEffect}}</span>
          <span>已生效</span>
        </div>
        <div class='right4'  @click='end'>
          <span>{{deadline}}</span>
          <span>已截止</span>
        </div>
      </div>
      <div class='main_table'>
        <div class='Merchant-title'>
          <h1><img src="../../../static/images/Container/title.png" alt=""></h1>
          <a href="javascript:void(0);" @click='jump'>查看更多>></a>
        </div>
        <div class='table'>
          <el-table
            :header-cell-style="getRowClass"
            v-loading="loading"
            element-loading-text="拼命加载中"
            :data="tableData"
            style="width: 100%;text-align:center"
            :row-class-name="tableRowClassName"
            v-cloak
          >
            <el-table-column
              prop="contractName"
              label="合同名称"
              width="250"
              style="text-align:center"
              :show-overflow-tooltip='true'
            >
            </el-table-column>
            <el-table-column
              prop="signers"
              label="签署人"
              width="200"
              :show-overflow-tooltip='true'
            >
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="发起时间"
              width="170">
            </el-table-column>
            <el-table-column
              prop="validTime"
              label="截止时间"
              width="170">
            </el-table-column>
            <el-table-column
              prop="contractStatus"
              label="当前状态"
              width="160">
            </el-table-column>
            <el-table-column
              prop="operation"
              label="操作"
              width="200"
            >
              <template slot-scope="scope">
                <el-button @click="signClick(scope.row)" type="primary" size="mini" v-if ='scope.row.operation === 1 && auditStatus == 2'>签&nbsp;&nbsp;署</el-button>
                <el-button @click="downloadClick(scope.row)" type="primary" size="mini" v-else-if ='scope.row.operation === 3' >下&nbsp;&nbsp;载 </el-button>
                <!-- <el-button @click="seeClick(scope.row)" type="primary" size="mini" v-else >延&nbsp;&nbsp;期</el-button> -->
                <el-button @click="rowLockClick(scope.row)" type="primary" size="mini">详&nbsp;&nbsp;情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapActions, mapState } from 'vuex'
  import cookie from '@/common/js/getTenant'

  export default {
    name: 'Merchants',
    methods: {
      getRowClass({ row, column, rowIndex, columnIndex }) {
        if (rowIndex == 0) {
          return 'background:#f5faf7'
        } else {
          return ''
        }
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      toMyAccount(){
        this.$router.push('/Account')
      },
      cancelTip(){

        document.getElementById("main_tips").style.display="none";
      },
      jumper (item,index) {
        if( item.templateSpecies == 'batch'){
          this.$store.dispatch('template',{templateName:item.name,templateNo:item.templateNo})
          this.$store.dispatch('templateType',{templateGenre:item.templateSpecies})
          sessionStorage.setItem('templateName', JSON.stringify(item.name))
          sessionStorage.setItem('templateNo', JSON.stringify(item.templateNo))
          sessionStorage.setItem('templateGenre',JSON.stringify(item.templateSpecies))
          this.$router.push('/batchSetting')
        } else {
          this.$store.dispatch('template',{templateName:item.name,templateNo:item.templateNo})
          sessionStorage.setItem('templateName', JSON.stringify(item.name))
          sessionStorage.setItem('templateNo', JSON.stringify(item.templateNo))
          this.$router.push('/Fillinformation')
        }
      },
      animated () {                                                                   //待我签署
        sessionStorage.setItem('second','second')
        this.$router.push('Procontract')
      },
      wait () {                                                                       //待他人签署
        sessionStorage.setItem('second','third')
        this.$router.push('Procontract')
      },
      takeEff (){                                                                  //已生效
        sessionStorage.setItem('second','fourth')
        this.$router.push('Procontract')
      },
      end () {                                                                         //已截止
        sessionStorage.setItem('second','five')
        this.$router.push('Procontract')
      },
      signClick (row) { //签署
        if(row.contractType == '0'){
          this.$store.dispatch('contractsInfo',{contractNo:row.contractNum})
          sessionStorage.setItem('contractNo', JSON.stringify(row.contractNum))
          this.$router.push('/Dimension')
        }else{
          this.$store.dispatch('contractsInfo',{contractNo:row.contractNum})
          sessionStorage.setItem('contractNo', JSON.stringify(row.contractNum))
          this.$router.push('/Contract')
        }
      },
      downloadClick (row) { //下载
        var url = process.env.API_HOST+'v1/contract/'+ cookie.getJSON('tenant')[1].interfaceCode +'/'+ row.contractNum;
        var up = document.createElement('a');
        document.body.appendChild(up)
        up.setAttribute('href',url);
        up.click()
      },
      choice(){
        this.$router.push('/BuyProduct')
      },
      jump () {
        this.$router.push('/Procontract')
      },
      more (){
        this.$router.push('/BuyProduct')
      },
      rowLockClick (row) { //查看
        if(row.contractType == '0'){
          this.$store.dispatch('contractsInfo',{contractNo:row.contractNum})
          sessionStorage.setItem('contractNo', JSON.stringify(row.contractNum))
          cookie.set('state','C')
          this.$router.push('/CompanyExb')
        }else{
          this.$store.dispatch('contractsInfo',{contractNo:row.contractNum})
          sessionStorage.setItem('contractNo', JSON.stringify(row.contractNum))
          this.$router.push('/ContractInfo')
        }
      }
    },
    data() {
      return {
        popup:false,
        topTip:true,
        tableData: [],
        download :'',
        loading: true,
        loading2:false,
        count:"",
        waitMe:'',
        waitOther:'',
        takeEffect:'',
        deadline:'',
        arr: [],
        uploadFile:true,
        interfaceCode:cookie.getJSON('tenant')[1].interfaceCode,
        auditStatus:''
      }
    },
    created() {
      this.auditStatus = cookie.getJSON('tenant')[1].auditStatus
      var authStatus = cookie.getJSON('tenant')[0].authStatus
      var auditStatus = cookie.getJSON('tenant')[1].auditStatus
      if(authStatus != '1' || auditStatus != '2'){
        this.topTip = false
      }
      var data =[];
      var requestVo ={'pageNo':'1','pageSize':'7','contractStatus':'0'};
      let url = process.env.API_HOST+'v1.4/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode +'/homePageContractLists';
      this.$http.get(url, {params: requestVo}).then(function (res) {
        if(res.data.sessionStatus == '0'){
          this.$router.push('/Server')
        } else {
          for (let i = 0; i < res.data.content.length;i++) {
            var obj = {}
            obj.contractName = res.data.content[i].contractName;
            obj.contractNum = res.data.content[i].contractNum;
            obj.createTime = res.data.content[i].createTime;
            obj.signers =  res.data.content[i].signers;
            obj.contractStatus =  res.data.content[i].contractStatus;
            obj.validTime =  res.data.content[i].validTime
            obj.contractType = res.data.content[i].contractType
            obj.operation = ''
            switch (obj.contractStatus){
              case "1":
                obj.contractStatus="待我签署";
                obj.operation = 1
                break;
              case "2":
                obj.contractStatus="待他人签署";
                obj.operation = 2
                break;
              case "3":
                obj.contractStatus="已生效";
                obj.operation = 3
                break;
              default:
                obj.contractStatus="已截止";
                obj.operation = 4
            }
            data[i] = obj
          }
          this.tableData = data
          this.loading = false
        }
      })
      this.$http.get(process.env.API_HOST+'v1.4/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode +'/waitForMeSign').then(function (res) {
        this.waitMe = res.data.count
      })
      this.$http.get(process.env.API_HOST+'v1.4/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode +'/waitForOtherSign').then(function (res) {
        this.waitOther = res.data.count
      })
      this.$http.get(process.env.API_HOST+'v1.4/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode +'/takeEffect').then(function (res) {
        this.takeEffect = res.data.count
      })
      this.$http.get(process.env.API_HOST+'v1.4/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode +'/deadline').then(function (res) {
        this.deadline = res.data.count
      })
      this.count = 0
    },
    mounted() {
      sessionStorage.removeItem("type")
      sessionStorage.removeItem("contractNo")
    }
  }
</script>
<style lang="css" scoped>
  @import '../../styles/Merchant/Merchants.css';
  .right1:hover,.right2:hover,.right3:hover,.right4:hover{
    -webkit-transition: all 0.5s ease-in;
    -moz-transition: all 0.5s ease-in;
    -ms-transition: all 0.5s ease-in;
    -o-transition: all 0.5s ease-in;
    -webkit-transform: scale(1.08);
    -ms-transform: scale(1.08);
    -o-transform:scale(1.08);
    -moz-transform: scale(1.08);
  }
</style>
<style>
  .main_tips{
    background:#ffff99;
    font-size:12px;
    height: 20px;
    line-height: 20px;
    width: 1200px;
    margin:3px auto;

  }
  .to-account{
    cursor: pointer;
    color:#22a7ea;
  }
  .cancelBtn{
    float: right;
    font-size: 14px;
    font-weight:bold;
    color: #999;
    cursor: pointer;
    margin-right: 10px;
  }
  .view{
    width: 100%;
    height: 100%;
    background: #000;
    position: absolute;
    z-index: 4000;
    background-color: rgba(0,0,0,0.5);

    left:0;
    top:0;

  }
  .dilogbg{
    background:#000;
    background:rgba(0,0,0,.3);
    width:100%;
    height:1080px;
    position: absolute;
    left:0;
    top:0;
    z-index: 1999;

  }
  .el-upload-dragger{
    width: 680px !important;
    height: 154px !important;
    /* margin-left: 284px !important; */
    /* margin-top: -41px !important; */
  }
  .el-table tr:nth-child(odd){
    background:#fff;
  }
  .el-table tr:nth-child(even){
    background:#f5f5f5;
  }
  .el-table th>.cell{
    text-align: none;
  }

  .el-tabs__nav-scroll{
    font-size: 16px;
    color: #333;
  }
  #tab-first,#tab-second,#tab-third,#tab-fourth,#tab-five{
    font-size: 16px;
  }
  .el-table th>.cell{
    text-align: center;
  }


  .el-table__row .cell{
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
  }

  #title{
    text-align:left !important;
  }
  .one:hover{
    border: 1px solid #22a7ea;
  }
  .two:hover{
    border: 1px solid #22a7ea;
  }
  #close{
    width:30px;
    height:30px;
    border-raduis:50%;
    text-align:center;
    line-height:30px;
    display:block;
    background:#fff;
    color:#000;
  }
</style>
