<template>
  <div class='CompanyExbm'>
    <div class='main'>

      <div class="first" style="display: inherit;">
        <p style="line-height: 60px;float: left;">
          <span>我的合同</span>
          <span style="color:#4091fb" v-if='status=="已截止"'>>&nbsp;合同延期 (您可以点击修改签署截止日期或者勾选永久来改变合同状态)</span>
          <span style="color:#4091fb" v-else> >合同详情</span>
        </p>

        <p id="sign-icon" v-if="accountCode!= operator && accountName && (this.interfaceCode == this.sponsorInterfaceCode)">
          <span class="department">{{accountName}}</span>

        </p>

        <p>
          <a class="backHome back-home" @click="backHome" href="javascript:void(0);">返回</a>
          <!-- <span  v-if='status=="已截止" && operator == accountCode' class="extension-btn" @click="extensionClick()">延&nbsp;&nbsp;期</span> -->
        </p>

      </div>
      <p class="second">
            <div class="title">签署文件</div>
            <span class="text">
               <strong>当前状态：</strong>
               <span>{{status}}</span>
             </span>
      </p>
      <div class="three">
        <p class="details2" style="text-align:left;">
          <strong>合同文件：</strong><span class="lengthLimit">{{contractName}}</span>
          <a href="javascript:void(0);" @click="seeContractImg">查看</a>
          <a href="javascript:void(0);" @click="downloadClick">下载</a>
          <strong>发起方式：</strong><span>{{createType}}</span>
          <strong>签署截止日期：</strong><span>{{validTime}}</span>
          <strong style="padding-left: 41px;font-weight: normal;">业务场景：</strong><span>{{businessScenario}}</span>
        </p>
        <div class="title" style="margin-top: 15px">签署人员</div>
      </div>
      <el-dialog title="合同详情图片" :visible.sync="dialogTableVisible" custom-class='showDialogs'>
        <div v-for="(item,index) in imgList" :key="index" >
          <img :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractUrl='+item" alt="" style='width:100%;'>
        </div>
      </el-dialog>
      <div class="table" style="width: 1200px;padding:15px;box-sizing: border-box;">
        <el-table
          :data="tableData2"
          style="width: 100%;text-align:center"
          :header-cell-style="getRowClass"
        >
          <el-table-column
            prop="signUserName"
            label="企业名称"
            style="text-align:center"
            width="240">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            width="200">
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
            width="170"
          >
            <template slot-scope="scope">
              <el-button  type="text" size="small" v-if ='scope.row.signStatus === 1 '>已签署</el-button>
              <el-button  type="text" size="small" v-if ='scope.row.signStatus === 0 ' style="color:red;">未签署</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="operation"
            label="操作"
            width="160"
          >
            <template slot-scope="scope">
              <!-- <el-button  type="text" size="small" v-if ='scope.row.signStatus === 0 && scope.row.mobile != signMobile && status!="已截止"' @click="remindSignClick(scope.row)">提醒签署</el-button> -->
              <!-- <el-button @click="signClick(scope.row)" type="primary" size="mini" v-if ='scope.row.signStatus == 0 && scope.row.userCode==interfaceCode && accountCode == operator'>签&nbsp;&nbsp;署</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="title" style="margin-top: 15px">合同历史</div>
      <div style="margin-top: 30px;margin-left: 70px;">
        <img v-if="History.length>1" style="position: relative;z-index: 999;left: -20px;"  src="/static/images/ContractInfo/sign_step.png" alt="">
        <el-steps direction="vertical" :active=0>
          <el-step :title=item.signUserName+item.logInfo
                   :description=item.signTime
                   v-for="(item,index) in History"
                   :key="index" icon="el-icon-location"
                   :class="{'currentStep':index == 0}"
                   style="font-size: 40px;height:100px;flex-basis: auto;">
          </el-step>
        </el-steps>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .CompanyExbm .main .title{
    height: 46px;
    margin: -65px 0 0 15px;
    line-height: 46px;
    padding-left: 40px;
    color: #fff;
    font-size: 20px;
    padding-top: 0 !important;
    border-top: none !important;
    background: url("/static/images/Common/title.png") no-repeat;
  }
  .CompanyExbm .main .text{
    margin-top: -30px;
    float: right;
    padding-right: 50px;
  }
  .back-home{
    background: url("/static/images/ContractInfo/back-home.png") no-repeat 10px 10px;
    width: 60px;height: 30px;padding-left:35px;color: #333;line-height: 45px;vertical-align: middle;
  }
  .el-table--scrollable-x .el-table__body-wrapper{
    overflow: hidden;
  }
  .currentStep .el-step__icon{
    color:#4091fb;
  }
  .el-tabs__nav-scroll{
    font-size: 16px;
    color: #333;
  }
  .el-step__title.is-process,.el-step__description.is-process{
    color:#4091fb
  }
  #tab-first,#tab-second,#tab-third,#tab-fourth,#tab-five{
    font-size: 16px;
  }
  .el-table th>.cell{
    text-align: center;
  }
  .showDialogs .el-dialog__body{
        padding: 0px 20px;
         color: #606266;
        font-size: 14px;
        overflow-y: scroll;
        height: 649px;
        box-sizing: border-box;
  }
  .main .first #sign-icon{
    background: url("/static/images/ContractInfo/detail_sign.png") no-repeat;
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
    // overflow-y: scroll;
    overflow: hidden;
  }
  .backHome{
    float: right;
    margin-right: 20px;
    margin-top: 10px;
    font-size: 16px;
  }
</style>
<script>
  import {state, actions,mutations} from '@/store/index';
  import { Switch } from 'element-ui';
  import cookie from '@/common/js/getTenant';
  import server from '@/api/url';
  import {remind,contractSignUserInfo,b2bContractimgs} from '@/api/detail';
  import {signFinish} from '@/api/business';
  export default {
    name: 'CompanyExbm',
    data() {
      return {
        baseURL:this.baseURL.BASE_URL,
        tableData2: [],
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
        operator:'',
        sponsorInterfaceCode:'',
        contractNo:sessionStorage.getItem("contractNo"),
      };
    },
    methods: {
      remindSignClick (row) {

        let remindParam = {
          userCode:row.userCode,
          contractType:0
        }
        remind(remindParam,this.interfaceCode,this.contractNo).then(res=>{
          let resultCode = res.data.resultCode
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
        }).catch(error=>{

        })
      },
      getTenant () {

      },
      seeContractImg (){
        this.$loading.show(); //显示
        let data =[];
        let t=Math.random();
        b2bContractimgs(this.interfaceCode,this.contractNo,t).then(res=>{
          for (let i = 0; i < res.data.dataList.length;i++) {
            let contractUrl = res.data.dataList[i].contractUrl
            data[i] = contractUrl
            this.$loading.hide(); //隐藏
          }
          this.imgList = data
        }).catch(error=>{

        })
        this.dialogTableVisible = true
      },
      downloadClick () {
        let url = process.env.API_HOST+'v1/contract/'+this.interfaceCode +'/'+ this.contractNo;
        let download = document.createElement('a');
        document.body.appendChild(download)
        download.setAttribute('href',url);
        download.click()
      },
      // signClick(){
      //     //签署
      //     if (this.contractType == "0") {
      //       this.$store.dispatch("contractsInfo", { contractNo: this.contractNo });
      //       sessionStorage.setItem("contractNo", this.contractNo);
      //       this.$router.push("/Dimension");
      //     } else {
      //       this.$store.dispatch("contractsInfo", { contractNo: this.contractNo });
      //       sessionStorage.setItem("contractNo", this.contractNo);
      //       this.$router.push("/Contract");
      //     }
      // },
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
        let data =[];

        signFinish(this.contractNo).then(res=>{
          let contractType = res.data.data.contractType
          if(contractType == '0'){
            this.businessScenario = '企业对企业'
          }
          let contractNoZq = res.data.data.contractNoZq
          this.contractName = res.data.data.contractName
          this.sponsorInterfaceCode = res.data.data.interfaceCode
          let type = res.data.data.contractType
          switch (type) {
            case '1':
              this.createType = '模板发起'
              break;
            default:
              this.createType = '上传发起'
              break;
          }
          this.status = res.data.data.status
          switch (this.status ){
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
          this.operator = res.data.data.operator
          this.validTime = res.data.data.validTime
          let signUserVo = res.data.dataList
          for (let i = 0; i < signUserVo.length;i++) {
            let obj = {}
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

          let param={
            contractNoZq:contractNoZq
          }
          contractSignUserInfo(param,this.ContractCode).then(res=>{
            this.History = res.data.dataList;
          }).catch(error=>{

          })
        }).catch(error=>{

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
        if(cookie.getJSON('state')=='list'){
          this.$router.push("/Procontract")
          this.$store.dispatch('tabIndex',{tabIndex:1});
        }else if(cookie.getJSON('state')=='home'){
          this.$router.push("/Merchant")
          this.$store.dispatch('tabIndex',{tabIndex:0});
        }else if(cookie.getJSON('state')== 'Home'){
          this.$router.push("/Home")
          this.$store.dispatch('tabIndex',{tabIndex:0});
        }else if(cookie.getJSON('state') == 'List'){
          this.$router.push("/Mycontract")
          this.$store.dispatch('tabIndex',{tabIndex:1});
        }


      }
    },
    created() {
      this.signMobile = cookie.getJSON('tenant')[0].mobile;

      let accountLevel = sessionStorage.getItem('accountLevel');
      let accountCode = sessionStorage.getItem('accountCode');
      let detailAccountCode = sessionStorage.getItem('detailAccountCode');

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
        }).catch(error=>{

        })
      }
    }
  }
</script>
<style scoped>
  @import "../../styles/CompanyExbm/CompanyExbm.scss";

</style>
