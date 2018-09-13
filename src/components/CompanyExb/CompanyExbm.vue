<template>
  <div class='CompanyExbm'>
    <div class='main'>
      <!-- <p class='first' style="display: inherit;">
        <span>我的合同</span>
        <span v-if='status=="已截止"'>>&nbsp;合同延期 (您可以点击修改签署截止日期或者勾选永久来改变合同状态)</span>
        <span v-else style="padding-right: 75%;">>合同详情</span>
          <a  class="backHome back-home" href="javascript:void(0);"  @click="backHome" >返回</a>
          <span v-if='status=="已截止"' class="extension-btn" @click="extensionClick()">延&nbsp;&nbsp;期</span>

      </p> -->
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
                <!-- <span  v-if='status=="已截止" && operator == accountCode' class="extension-btn" @click="extensionClick()">延&nbsp;&nbsp;期</span> -->
            </p>

        </div>
      <p class='second'  >
        <img src="../../../static/images/ContractInfo/uploading.png" alt="" class='pic'>
        <span class='text'>
               <strong>当前状态：</strong>
               <span>{{status}}</span>
             </span>
      </p>
      <div class='three'>
        <p class='details2' style="text-align:left;">
          <strong>合同文件：</strong><span class="lengthLimit">{{contractName}}</span>
          <a href="javascript:void(0);" @click="seeContractImg">查看</a>
          <a href="javascript:void(0);" @click="downloadClick">下载</a>
          <strong>发起方式：</strong><span>{{createType}}</span>
          <strong>签署截止日期：</strong><span>{{validTime}}</span>
          <strong style="padding-left: 41px;font-weight: normal;">业务场景：</strong><span>{{businessScenario}}</span>
        </p>
        <img src="../../../static/images/ContractInfo/launch.png" alt="" class='pic-a' style="display:block;margin-left:8px;margin-top:20px;" >
      </div>
      <el-dialog title="合同详情图片" :visible.sync="dialogTableVisible" custom-class='showDialogs'>
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
            label="企业名称"
            style="text-align:center"
            width="210">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            width="230">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="姓名"
            width="200">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号"
            width="200">
          </el-table-column>
          <el-table-column
            prop="signStatus"
            label="状态"
            width="180"
          >
            <template slot-scope="scope">
              <el-button  type="text" size="small" v-if ='scope.row.signStatus === 1 '>已签署</el-button>
              <el-button  type="text" size="small" v-if ='scope.row.signStatus === 0 ' style="color:red;">未签署</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="operation"
            label="操作"
            width="180"
          >
            <template slot-scope="scope">
              <!-- <el-button  type="text" size="small" v-if ='scope.row.signStatus === 0 && scope.row.mobile != signMobile && status!="已截止"' @click="remindSignClick(scope.row)">提醒签署</el-button> -->
                <el-button @click="signClick(scope.row)" type="primary" size="mini" v-if ='scope.row.signStatus == 0 && scope.row.userCode==interfaceCode && accountCode == operator'>签&nbsp;&nbsp;署</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
        <img src="../../../static/images/ContractInfo/history.png" alt="" class='pic-a' style="display:block;margin-left:12px;margin-top:20px;" >
        <div style="margin-top: 30px;margin-left: 70px;">
            <img v-if="History.length>1" style="position: relative;z-index: 999;left: -20px;" src="../../../static/images/Contractinfo/sign_step.png" alt="">
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
  .back-home{
    background: url("../../../static/images/ContractInfo/back-home.png") no-repeat 10px 10px;
    width: 60px;height: 30px;padding-left:35px;color: #333;line-height: 45px;vertical-align: middle;
  }
  .el-table--scrollable-x .el-table__body-wrapper{
    overflow: hidden;
  }
  .currentStep .el-step__icon{
    color:#22a7ea;
  }
  .el-tabs__nav-scroll{
    font-size: 16px;
    color: #333;
  }
  .el-step__title.is-process,.el-step__description.is-process{
    color:#22a7ea
  }
  #tab-first,#tab-second,#tab-third,#tab-fourth,#tab-five{
    font-size: 16px;
  }
  .el-table th>.cell{
    text-align: center;
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

  .showDialogs{
    height: 700px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .backHome{
    float: right;
    margin-right: 20px;
    margin-top: 10px;
    font-size: 16px;
  }
</style>
<script>
  import { mapActions, mapState } from 'vuex'
  import { Switch } from 'element-ui';
  import cookie from '@/common/js/getTenant';
  import server from '@/api/url';
  export default {
    name: 'CompanyExbm',
    data() {
      return {
        baseURL:this.baseURL.BASE_URL,
        tableData2: [],
        contractNo:'',
        contractName:'',
        validTime:'',
        status:'',
        accountLevel:'',
        createType:'',
        dialogTableVisible: false,
        imgList:[],
        signMobile:'',
        History:[],
        businessScenario:'',
        interfaceCode:cookie.getJSON('tenant')?cookie.getJSON('tenant')[1].interfaceCode:'',
        accountName:'',
        accountCode :sessionStorage.getItem('accountCode'),
        operator:''
      };
    },
    methods: {
      remindSignClick (row) {
        // var notificationReq = {"type":'0',"contractNo":this.$store.state.rowNumber,"userCode":row.userCode,"mobile":row.mobile}
        var remindParam = {
          userCode:row.userCode,
          contractType:0
        }
        this.$http.get(process.env.API_HOST+'v1/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode + this.$store.state.rowNumber +'/remind', {params:remindParam},{emulateJSON:true}).then(function (res) {
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
      seeContractImg (){
        this.$loading.show(); //显示
        var data =[];
        this.$http.get(process.env.API_HOST+'v1.4/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode +'/contract/'+this.$store.state.rowNumber+'/contractimgs').then(function (res) {
          if(res.data.sessionStatus == '0'){
            this.$router.push('/Server')
          } else {
            for (let i = 0; i < res.data.dataList.length;i++) {
              let contractUrl = res.data.dataList[i].contractUrl
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
    signClick(){
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
    //延期
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
      seeContractDetails () {
        var data =[];
        let url = process.env.API_HOST+'v1.4/contract/'+this.$store.state.rowNumber+'/signFinish';
        this.$http.get(url).then(function (res) {
          if(res.data.sessionStatus == '0'){
            this.$router.push('/Server')
          } else {
            var contractType = res.data.data.contractType
            if(contractType == '0'){
              this.businessScenario = '企业对企业'
            }
            var contractNoZq = res.data.data.contractNoZq
            this.contractName = res.data.data.contractName
            var type = res.data.data.contractType
            switch (type) {
              case '1':
                this.createType = '模板发起'
                break;
              default:
                this.createType = '上传发起'
                break;
            }
            this.status = res.data.data.status
            this.operator = res.data.data.operator
            // switch ( this.status ){
            // case "signing":
            //   this.status = '签署中'
            //   break;
            // case "archive":
            //   this.status = '已生效'
            //   break;
            // default:
            //   this.status = '已截止'
            //   break;
            // }
            this.validTime = res.data.data.validTime
            var signUserVo = res.data.dataList
            for (let i = 0; i < signUserVo.length;i++) {
              var obj = {}
              obj.signUserName = signUserVo[i].signUserName
              obj.email = signUserVo[i].email
              obj.userName = signUserVo[i].userName
              obj.mobile = signUserVo[i].mobile
              obj.idCard = signUserVo[i].idCard
              obj.signStatus = signUserVo[i].signStatus
              obj.userCode = signUserVo[i].userCode
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

            this.$http.get(process.env.API_HOST+'v1.4/contract/'+this.$store.state.rowNumber+'/contractSignUserInfo',{params:{'contractNoZq':contractNoZq}}).then(function (res) {
              this.History = res.data.dataList
            })
          }
        })
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {
        if (rowIndex == 0) {
          return 'background:#efefef;font-weight:bold;'
        } else {
          return ''
        }
      },
      backHome(){
        // console.log("state"+cookie.getJSON('state'))
        if(cookie.getJSON('state') == 'C'||cookie.getJSON('state') == 'H' ){
          this.$router.push("/Merchant")
        }else if(cookie.getJSON('state') == 'C2'){
          this.$router.push("/Procontract")
        }else if(cookie.getJSON('state') == 'G'){
          this.$router.push("/Home")
        }
      }
    },
    created() {
        this.signMobile = cookie.getJSON('tenant')[0].mobile;
        var contractNo = sessionStorage.getItem('contractNo');
        var accountLevel = sessionStorage.getItem('accountLevel');
        var accountCode = sessionStorage.getItem('accountCode');
        var detailAccountCode = sessionStorage.getItem('detailAccountCode');
        if (contractNo) {
            // contractNo = JSON.parse(contractNo);
            this.contractNo = contractNo;
            if ( this.$store.state.rowNumber == ''){
            this.$store.state.rowNumber = contractNo
            }
        }
        this.seeContractDetails ();
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
<style scoped>
  @import "../../styles/CompanyExbm/CompanyExbm.css";

</style>
