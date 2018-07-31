<template>
  <div class='CompanyExam'>
      <div class='main'>
          <p class='first' style="display: inherit;">

            <span>我的合同</span>
            <span v-if='status=="已截止"'>>&nbsp;合同延期 (您可以点击修改签署截止日期或者勾选永久来改变合同状态)</span>
            <span v-else style="padding-right: 75%;">>合同详情</span>
            <a class="backHome back-home" @click="backHome" href="javascript:void(0);">返回</a>
          </p>
          <p class='second'>
             <img src="../../../static/images/ContractInfo/uploading.png" alt="" class='pic'>
             <span class='text'>
               <strong>当前状态：</strong>
               <span>{{status}}</span>
             </span>
          </p>
          <div class='three'>
            <p class='details2' style="text-align:left;">
              <strong>合同文件：</strong>
              <span class="lengthLimit">
                {{contractName}}

               </span>
               <a href="javascript:void(0);" @click="seeContractImg">查看</a>
               <a href="javascript:void(0);" @click="downloadClick">下载</a>
               <strong>发起方式：</strong><span>{{createType}}</span>
               <strong>签署截止日期：</strong><span>{{validTime}}</span>
               <strong style="margin-right: 30px;font-weight: normal;float: right;display: inline-block;">
                 业务场景：{{businessScenario}}
               </strong>

            </p>
             <img src="../../../static/images/ContractInfo/launch.png" alt="" class='pic-a' style="display:block;margin-left:5px;margin-top:20px;" >
          </div>
          <el-dialog title="合同详情图片" :visible.sync="dialogTableVisible">
            <div v-for="(item,index) in imgList" :key="index" >
               <!-- <img :src="[`${this.baseURL.BASE_URL}`+'/v1/tenant/contract/img?contractUrl='+item]" alt="" style='width:100%;'> -->
               <img :src="['http://testwesign.zqsign.com/restapi/wesign/v1/tenant/contract/img?contractUrl='+item]" alt="" style='width:100%;'>
            </div>
          </el-dialog>
          <div class='table' style="width: 1200px;">
              <el-table
                :data="tableData2"
                style="width:100%;text-align:center"
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
                width="215">
                </el-table-column>
                <el-table-column
                prop="userName"
                label="姓名"
                width="200">
                </el-table-column>
                <el-table-column
                prop="mobile"
                label="手机号"
                width="205">
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
                width="170"
                >
                <template slot-scope="scope">
                  <el-button  type="text" size="small" v-if ='scope.row.signStatus === 0 && scope.row.mobile != signMobile && scope.row.isCreater && scope.row.contractStatus != "已截止" ' @click="remindSignClick(scope.row)">提醒签署</el-button>
                </template>
              </el-table-column>
            </el-table>
            </div>
            <img src="../../../static/images/ContractInfo/history.png" alt="" class='pic-a' style="display:block;margin-left:12px;margin-top:20px;" >
            <div style="height: 560px;margin-top: 30px;margin-left: 70px;">
            <el-steps direction="vertical" :active=History.length>
              <el-step :title=item.signUserName+item.logInfo  :description=item.signTime v-for="(item,index) in History" :key="index" icon="el-icon-location" style="font-size: 40px;"></el-step>
            </el-steps>
            </div>
      </div>
  </div>
</template>
<style>
  .back-home{
    background: url("../../../static/images/ContractInfo/back-home.png") no-repeat 10px 10px;
    width: 60px;height: 30px;padding-left:35px;color: #333;line-height: 45px;vertical-align: middle;
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
#app{
  overflow: hidden
}
.el-dialog{
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
import cookie from '@/common/js/getTenant'
export default {
  name: 'CompanyExam',
  data() {
    return {
      tableData2: [],
      contractNo:'',
      contractName:'',
      validTime:'',
      status:'',
      createType:'',
      dialogTableVisible: false,
      imgList:[],
      signMobile:'',
      History:[],
      businessScenario:'',
      ContractCode:'',
    };
  },
  methods: {

    remindSignClick (row) {
      //  var notificationReq = {"type":'0',"contractNo":this.ContractCode,"userCode":row.userCode,"mobile":row.mobile}
        var remindParam = {
          userCode:row.userCode,
          contractType:0
        }
        this.$http.get(process.env.API_HOST+'v1/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode +'/contract/'+ this.ContractCode +'/remind',{params: remindParam},{emulateJSON:true}).then(function (res) {
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
      this.$http.get(process.env.API_HOST+'v1.4/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode +'/contract/'+this.ContractCode+'/contractimgs').then(function (res) {
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
      var url = process.env.API_HOST+'v1/contract/'+ cookie.getJSON('tenant')[1].interfaceCode +'/'+ this.ContractCode;
      var download = document.createElement('a');
      document.body.appendChild(download)
      download.setAttribute('href',url);
      download.click()
    },
    seeContractDetails () {
      var data =[];
      let url = process.env.API_HOST+'v1.4/contract/'+this.ContractCode+'/signFinish';
      let currentFaceCode = cookie.getJSON('tenant')[1].interfaceCode;
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
        var contractStatus = res.data.data.status
        var isCreater='';
        if(currentFaceCode == res.data.data.interfaceCode){
            isCreater = true
        }else{
            isCreater = false
        }
        for (let i = 0; i < signUserVo.length;i++) {
          var obj = {}
          obj.signUserName = signUserVo[i].signUserName
          obj.email = signUserVo[i].email
          obj.userName = signUserVo[i].userName
          obj.mobile = signUserVo[i].mobile
          obj.idCard = signUserVo[i].idCard
          obj.signStatus = signUserVo[i].signStatus
          obj.userCode = signUserVo[i].authorizerCode;
          obj.status = signUserVo[i].status;
          obj.isCreater = isCreater;
          obj.contractStatus = contractStatus
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
        this.tableData2 = data;

        this.$http.get(process.env.API_HOST+'v1.4/contract/'+this.ContractCode+'/contractSignUserInfo',{params:{'contractNoZq':contractNoZq}}).then(function (res) {
          this.History = res.data.dataList
        })
        }
      })
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return 'background:#EFEFEF'
      } else {
        return ''
      }
    },
    backHome(){
      // console.log("state"+cookie.getJSON('state'))
      if(cookie.getJSON('tenant')[1].isBusiness != '0'){
        if(cookie.getJSON('state') == 'A' || cookie.getJSON('state') == 'G'){
          this.$router.push("/Home")
        }else if(cookie.getJSON('state') == 'B'){
          this.$router.push("/Mycontract")
        }else if(cookie.getJSON('state') == 'H'){
          this.$router.push("/Merchant")
        }else{
          this.$router.push("/CompanyContract")
        }
      }
    }
  },
  created() {
    this.signMobile = cookie.getJSON('tenant')[0].mobile;
    var contractNo = sessionStorage.getItem('contractNo')
    if (contractNo) {
      contractNo = JSON.parse(contractNo)
      this.ContractCode = contractNo
    }
    this.seeContractDetails ()
  }
}
</script>
<style scoped>
  @import "../../styles/CompanyExam/CompanyExam.css";
</style>
