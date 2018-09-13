<template>
  <div class='ContractInfos' style="margin-top: 20px;">
    <div class='main'>
      <div class='first' style="display: inherit;">
        <p style="line-height: 60px;float: left;">
          <span>我的合同</span>
          <span style="color:#22a7ea" v-if='status=="已截止"'>>&nbsp;合同延期 (您可以点击修改签署截止日期或者勾选永久来改变合同状态)</span>
          <span style="color:#22a7ea" v-else> >合同详情</span>
        </p>

        <p id="sign-icon" v-if="accountCode!= operator && accountName">
          <span class="department">{{accountName}}</span>
          <!-- <span>张丽华</span> -->
        </p>

        <p>
          <a class="backHome back-home" @click="backHome" href="javascript:void(0);">返回</a>
          <!-- <span  v-if='status=="已截止" && accountCode == operator' class="extension-btn" @click="extensionClick()">延&nbsp;&nbsp;期</span> -->
        </p>

      </div>
      <p class='second'>
        <img src="../../../static/images/ContractInfo/uploading.png" alt="" class='pic'>
        <span class='text'>
               <strong>当前状态：</strong>
               <span>{{status}}</span>
             </span>
      </p>
      <div class='three' style="text-align: left;">
        <p class='details'>
          <strong>合同文件：</strong><span class="contract_Name">{{contractName}}</span>
          <a href="javascript:void(0);" @click="seeContractImg">查看</a>
          <a href="javascript:void(0);" @click="downloadClick">下载</a>
          <strong>发起方式：</strong><span>{{createType}}</span>
          <strong>签署截止日期：</strong><span>{{validTime}}</span>
        </p>
        <img src="../../../static/images/ContractInfo/launch.png" alt="" class='pics'>
      </div>
      <el-dialog title="合同详情图片" :visible.sync="dialogTableVisible"  custom-class='showDialogs'>

            <div v-for="(item,index) in imgList" :key="index" >
               <img :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractUrl='+item" alt="" style='width:100%;'>
            </div>
          </el-dialog>
          <div class='table' style="width: 1200px;padding: 20px 15px;box-sizing: border-box;">
              <el-table
                :data="tableData2"
                style="width: 100%;text-align:center"
                :header-cell-style="getRowClass"
                >
                <el-table-column
                prop="signUserName"
                label="姓名"
                style="text-align:center"
                width="250">
                </el-table-column>
                <el-table-column
                prop="mobile"
                label="手机号"
                width="200">
                </el-table-column>
                <el-table-column
                prop="idCard"
                label="身份证号码"
                width="300">
                </el-table-column>
                <el-table-column
                prop="signStatus"
                label="状态"
                width="250"
                >
                <template slot-scope="scope">
                  <el-button  type="text" size="small" v-if ='scope.row.signStatus === 1 '>已签署</el-button>
                  <el-button  type="text" size="small" v-if ='scope.row.signStatus === 0 ' style="color:red;">未签署</el-button>
                </template>
              </el-table-column>
              <el-table-column
                prop="operation"
                label="操作"
                width="200"
                >
                <template slot-scope="scope">
                    <el-button  type="text" size="mini" v-if ='scope.row.signStatus === 0 && scope.row.mobile != signMobile && scope.row.isCreater && status != "已截止" && accountCode == operator' @click="remindSignClick(scope.row)">提醒签署</el-button>
                    <!-- <el-button @click="signClick(scope.row)" type="primary" size="mini" v-if ='scope.row.signStatus == 0 && scope.row.userCode==interfaceCode && accountCode == operator'>签&nbsp;&nbsp;署</el-button> -->
                </template>
              </el-table-column>
            </el-table>
            </div>
            <img src="../../../static/images/ContractInfo/history.png" alt="" class='pic-a' style="display:block;margin-left:12px;margin-top:20px;" >
            <div style="margin-top: 30px;margin-left: 70px;">
              <img v-if="History.length>1"  style="position: relative;z-index: 999;left: -20px;" src="../../../static/images/Contractinfo/sign_step.png" alt="">
              <el-steps direction="vertical" :active=0>
                <el-step :title=item.signUserName+item.logInfo
                    :description=item.signTime
                    v-for="(item,index) in History"
                    :key="index" icon="el-icon-location"
                    :class="{'currentStep':index == 0}"
                    style="font-size: 40px;height:100px;">
                </el-step>
              </el-steps>

      </div>
    </div>
  </div>
</template>
<style lang="scss">
    .el-table--scrollable-x .el-table__body-wrapper{
        overflow: hidden;
    }
    .el-step__main{
        height: 100px;
    }
    .back-home{
        background: url("../../../static/images/ContractInfo/back-home.png") no-repeat 10px 10px;
        width:60px;height: 30px;padding-left:35px;color: #333;line-height: 45px;vertical-align: middle;
    }
    .main .first #sign-icon{
        background: url("../../../static/images/ContractInfo/detail_sign.png") no-repeat;
        height: 60px;
        position: absolute;
        text-align: center;
        display: inline-block;
        margin-left: 20px;
        background-size: cover;
        line-height: 44px;
        padding-left: 35px;
        padding-right: 15px;
        span{
            color:#fff;
            font-size: 12px;
            padding-left: 0;
        }
        .department{
            font-size: 14px;
            display: block;
            font-weight: 500;
            margin-top: 10px;
        }

    }
    .extension-btn{
        float: right;
        background: #22a7ea;
        padding: 5px 20px;
        height: 20px;
        line-height: 20px;
        border-radius: 5px;
        color: #fff;
        margin-top: 15px;
        cursor: pointer;
    }
  .el-tabs__nav-scroll{
    font-size: 16px;
    color: #333;
  }
  .currentStep .el-step__icon{
    color:#22a7ea;
  }
  .el-step__title.is-process,.el-step__description.is-process{
    color:#22a7ea!important
  }
  #tab-first,#tab-second,#tab-third,#tab-fourth,#tab-five{
    font-size: 16px;
  }
  .el-table th>.cell{
    text-align: center;
  }

  .showDialogs{
    height: 700px;
    // overflow-y: scroll;
    overflow: hidden;
  }
  .showDialogs .el-dialog__body{
    padding: 30px 20px;
    color: #606266;
    font-size: 14px;
    overflow-y: scroll;
    height: 700px;
  }
  .contract_Name{
    width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  // display: inline-block;
  }
  .backHome{
    float: right;
    margin-right: 20px;
    margin-top: 10px;
    font-size: 16px;
  }
</style>
<script>
  import { mapActions, mapState } from 'vuex';
  import server from '@/api/url';
  import { Switch } from 'element-ui';
  import cookie from '@/common/js/getTenant';
  export default {
    name: 'ContractInfos',
    data() {
      return {
        baseURL:this.baseURL.BASE_URL,
        tableData2: [],
        accountLevel:'',
        contractNo:'',
        contractName:'',
        validTime:'',
        status:'',
        History:[],
        createType:'',
        dialogTableVisible: false,
        imgList:[],
        signMobile:'',
        contractType:'',
        ContractCode:'',
        interfaceCode:cookie.getJSON('tenant')?cookie.getJSON('tenant')[1].interfaceCode:'',
        accountName:'',
        operator:'',
        accountCode:sessionStorage.getItem('accountCode')
      };
    },
    methods: {
      remindSignClick (row) {
        //  var notificationReq = {"type":'0',"contractNo":this.$store.state.rowNumber,"userCode":row.userCode,"mobile":row.mobile}
        var remindParam = {
          userCode:row.userCode,
          contractType:1
        }
        this.$http.get(process.env.API_HOST+'v1/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode +'/contract/'+ this.$store.state.rowNumber +'/remind',{params:remindParam} ,{emulateJSON:true}).then(function (res) {
          var resultCode = res.data.resultCode
          if ( resultCode === '0') {
            this.$message({
              message: '短信通知成功',
              type: 'success'
            });
          } else if(resultCode === '1'){
            this.$message({
              message: '该合同本日发送短信次数已用尽！',
              type: 'error'
            });
          }
        })
      },
      getTenant () {

      },
      extensionClick(){
        if (this.contractType == "0") {
          sessionStorage.setItem("contractNo", this.contractNo);
          cookie.set("state", "E");
          this.$router.push("/CompanyExc");
        } else {
          this.$store.dispatch("contractsInfo", { contractNo: this.contractNo });
          sessionStorage.setItem("contractNo", this.contractNo);
          cookie.set("state", "D");
          this.$router.push("/ContractDelay");
        }
      },
      signClick(row){
        //签署
        if (this.contractType == "0") {
          this.$store.dispatch("contractsInfo", { contractNo: this.contractNo });
          sessionStorage.setItem("contractNo", this.contractNo);
          this.$router.push("/Dimension");
        } else {
          this.$store.dispatch("contractsInfo", { contractNo: this.contractNo });
          sessionStorage.setItem("contractNo", this.contractNo);
          this.$router.push("/Contract");
        }
      },

      seeClick(row) {
        //延期
        if (row.contractType == "0") {
          sessionStorage.setItem("contractNo", row.contractNum);
          cookie.set("state", "E");
          this.$router.push("/CompanyExc");
        } else {
          this.$store.dispatch("contractsInfo", { contractNo: row.contractNum });
          sessionStorage.setItem("contractNo", row.contractNum);
          cookie.set("state", "D");
          this.$router.push("/ContractDelay");
        }
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {
        if (rowIndex == 0) {
          return 'background:#efefef;font-weight:bold;'
        } else {
          return ''
        }
      },
      seeContractImg (){
        this.imgList =[];
        this.$loading.show(); //显示
        var data =[];
        this.$http.get(process.env.API_HOST+'v1/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode +'/contract/'+this.$store.state.rowNumber+'/contractimgs').then(function (res) {
          if(res.data.sessionStatus == '0'){
            this.$router.push('/Server')
          } else {
            for (let i = 0; i < res.data.length;i++) {
              let contractUrl = res.data[i].contractUrl
              data[i] = contractUrl
              this.$loading.hide(); //隐藏
            }
            this.imgList = data
          }
        })
        this.dialogTableVisible = true
      },
      downloadClick () {
        var url = process.env.API_HOST+'v1/contract/'+ cookie.getJSON('tenant')[1].interfaceCode +'/'+ this.$store.state.rowNumber;
        var download = document.createElement('a');
        document.body.appendChild(download)
        download.setAttribute('href',url);
        download.click()
      },
      seeContractDetails () {
        var data =[];
        var isCreater='';
        let currentFaceCode = cookie.getJSON('tenant')[1].interfaceCode;
        // 从合同列表页面进入
        if(this.$store.state.rowNumber){
          let contractNo=this.$store.state.rowNumber
          this.contractNo=contractNo;
        }else {   //签署完成页面进入
          let contractNo=sessionStorage.getItem('contractNo')
          this.contractNo=contractNo;
        }
        let url = process.env.API_HOST+'v1/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode +'/contract/'+this.contractNo+'/getContractDetails'
        this.$http.get(url).then(function (res) {
          if(res.data.sessionStatus == '0'){
            this.$router.push('/Server')
          } else {
            var contractNoZq = res.data.contractVo.contractNoZq
            var contractVo = res.data.contractVo
            var signUserVo = res.data.signUserVo
            var type = contractVo.createType
            this.contractNo = contractVo.contractNo
            this.contractType = contractVo.contractType
            this.contractName = contractVo.contractName
            this.validTime = contractVo.validTime
            this.status = contractVo.status
            this.operator = res.data.contractVo.operator
            switch (type) {
              case '1':
                this.createType = '模板发起'
                break;
              default:
                this.createType = '上传发起'
                break;
            }
            switch ( this.status ){
              case "1":
                this.status = '签署中'
                break;
              case "2":
                this.status = '已生效'
                break;
              default:
                this.status = '已截止'
                break;
            }
            if(currentFaceCode == res.data.contractVo.interfaceCode){
              isCreater = true
            }else{
              isCreater = false
            }
            for (let i = 0; i < signUserVo.length;i++) {
              var obj = {}
              obj.signUserName = signUserVo[i].signUserName
              obj.mobile = signUserVo[i].mobile
              obj.idCard = signUserVo[i].idCard
              obj.signStatus = signUserVo[i].signStatus
              obj.userCode = signUserVo[i].userCode
              obj.isCreater = isCreater
              switch ( obj.signStatus ){
                case "0":
                  obj.signStatus = 0
                  break;
                default:
                  obj.signStatus = 1
                  break;
              }
              if (obj.idCard === null || obj.idCard === 'undefined') {
                obj.idCard = ''
              }
              data[i] = obj
            }
            this.tableData2 = data
            this.$http.get(process.env.API_HOST+'v1.4/contract/'+this.contractNo+'/contractSignUserInfo',{params:{'contractNoZq':contractNoZq}}).then(function (res) {
              this.History = res.data.dataList
            })
          }

        })
      },
      backHome(){
        // console.log("state"+cookie.getJSON('state'))
        if(cookie.getJSON('state') == 'A' || cookie.getJSON('state') == 'B'){
            if(cookie.getJSON('state') == 'A'){
                this.$store.dispatch('tabIndex',{tabIndex:1});
            }else{
                this.$store.dispatch('tabIndex',{tabIndex:0});
            }
            this.$router.push("/Home")
        }else{
          this.$router.push("/Mycontract")
        //   this.$store.dispatch('tabIndex',{tabIndex:1});
        }
      }
    },

  created() {
    this.signMobile = cookie.getJSON('tenant')[0].mobile
    var contractNo = sessionStorage.getItem('contractNo');
    var accountLevel = sessionStorage.getItem('accountLevel');
    var accountCode = sessionStorage.getItem('accountCode');
    var detailAccountCode = sessionStorage.getItem('detailAccountCode');
    if (contractNo) {
        // contractNo = JSON.parse(contractNo)
        if ( this.$store.state.rowNumber == ''){
          this.contractNo = contractNo;
          this.$store.state.rowNumber = contractNo
        }
      }
      this.seeContractDetails()
      //判断是不是二级账户如果是不请求顶部显示部门姓名
      if(accountLevel != 2){
        let param={
            accountCode:detailAccountCode
        }
        server.getAccountName(param,this.interfaceCode).then(res=>{
            if(res.data.resultCode == 1){
                this.accountName = res.data.data
            }
        }).catch({

        })
      }
    }
  }
</script>
<style>
  @import "../../styles/ContractInfo/ContractInfos.css";
</style>
