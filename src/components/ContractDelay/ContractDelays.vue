<template>
  <div class='ContractDelays'>
      <div class='main'>
          <p class='first' style="display:inherit;">
            <span >我的合同</span>
            <span >>合同延期 (您可以点击修改签署截止日期或者勾选永久来改变合同状态)</span>
            <a class="backHome back-home" href="javascript:void(0);" @click="backHome" style="padding-left: 40px;">
              返回
            </a>
          </p>
          <p class='second'>
             <img src="../../../static/images/ContractInfo/uploading.png" alt="" class='pic'>
             <span class='text'>
               <strong>当前状态：</strong>
               <span>{{status}}</span>
             </span>
          </p>
          <div class='three'>
            <p class='details1'>
              <strong>合同文件：</strong>
              <el-tooltip placement="top">
                <div slot="content">{{contractName}}</div>
                <span style='display:inline-block;width:150px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align:sub'>{{contractName}}</span>
              </el-tooltip>
              <a href="javascript:void(0);" @click="seeContractImg">查看</a>
              <a href="javascript:void(0);" @click="downloadClick">下载</a>
              <strong>发起方式：</strong><span>{{createType}}</span>
              <strong>签署截止日期：</strong>
              <span>
                <el-date-picker
                style='width:138px;margin-right:20px'
                height='height:40px'
                v-model="validTimes"
                type="date"
                :editable= false
                :clearable= false
                format="yyyy-MM-dd 23:59:59"
                value-format="yyyy-MM-dd 23:59:59"
                @change="dateInput"
                :picker-options="pickerOptions0"
                >
              </el-date-picker>
              </span>
              <el-checkbox v-model="checked3" @change='checkedBox'>永久有效</el-checkbox>
              <el-button type="primary" plain size='medium' @click="dateModified">保存</el-button>
            </p>
            <div style="text-align:left;">
              <img src="../../../static/images/ContractInfo/launch.png" alt="" class='pics1'>
            </div>
          </div>
          <el-dialog title="合同详情图片" :visible.sync="dialogTableVisible" custom-class='contract-info'>
            <div v-for="(item,index) in imgList" :key="index" >
               <!-- <img :src="[`${this.baseURL.BASE_URL}`+'/v1/tenant/contract/img?contractUrl='+item]" alt="" style='width:100%;'> -->
               <img :src="['http://192.168.1.15:8080/zqsign-web-wesign/restapi/wesign/v1/tenant/contract/img?contractUrl='+item]" alt="" style='width:100%;'>
            </div>
          </el-dialog>
          <div class='table'>
              <el-table
                :data="tableData2"
                style="width: 100%;text-align:center"
                >
                <el-table-column
                prop="signUserName"
                label="姓名"
                style="text-align:center"
                width="240">
                </el-table-column>
                <el-table-column
                prop="mobile"
                label="手机号"
                width="240">
                </el-table-column>
                <el-table-column
                prop="idCard"
                label="身份证号码"
                width="270">
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
                width="200">
                <!-- <template slot-scope="scope">
                  <el-button  type="text" size="small" v-if ='scope.row.signStatus === 0 &&scope.row.mobile !=signMobile && status!="已截止"' @click="remindSignClick(scope.row)">提醒签署</el-button>
                </template> -->
              </el-table-column>
            </el-table>
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
.contract-info{
  height: 700px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.backHome{
    float: right;
    margin-top: 10px;
    font-size: 16px;
  }
</style>
<script>
import { mapActions, mapState } from 'vuex'
import { Switch } from 'element-ui';
import cookie from '@/common/js/getTenant'
export default {
  name: 'ContractInfos',
  data() {
    return {
      tableData2: [],
      contractNo:'',
      contractName:'',
      validTimes:new Date(),
      status:'',
      createType:'',
      dialogTableVisible: false,
      imgList:[],
      checked3:false,
      signMobile:'',
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      }
    }
  },
  methods: {
    remindSignClick (row) {
      this.$http.post(process.env.API_HOST+'v1/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode +'/signRoom/showSignRoomInfo').then(function (res) {
        var status = res.data.data.status
        var signRoomLink = res.data.data.signRoomLink
        var resultCode = res.data.data.resultCode
        let notificationReq = {"type":'0',"contractNo":this.$store.state.rowNumber,"userCode":row.userCode,"signRoomLink":signRoomLink,"mobile":row.mobile}
        this.$http.post(process.env.API_HOST+'v1/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode +'/notification',notificationReq,{emulateJSON:true}).then(function (res) {
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
      })
    },
    seeContractImg (){
      this.$loading.show(); //显示
      var data =[];
      this.$http.get(process.env.API_HOST+'v1/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode +'/contract/'+this.$store.state.rowNumber+'/contractimgs').then(function (res) {
        for (let i = 0; i < res.data.length;i++) {
        let contractUrl = res.data[i].contractUrl
        data[i] = contractUrl
        this.$loading.hide(); //隐藏
        }
        this.imgList = data
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
    dateInput () {
      this.checked3 = false
    },
    checkedBox () {
      if(this.checked3 == true){
        this.validTimes = ''
      }
    },
    seeContractSign(){
      var data =[];
      let url = process.env.API_HOST+'v1/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode +'/getContractDetails/'+this.$store.state.rowNumber;
      this.$http.get(url).then(function (res) {
        if(res.data.sessionStatus == '0'){
          this.$router.push('/Server')
        } else {
        var contractVo = res.data.contractVo
        var signUserVo = res.data.signUserVo
        var type = contractVo.createType
        this.contractNo = contractVo.contractNo
        this.contractName = contractVo.contractName

        if(contractVo.validTime == '永久有效'){
          this.checked3 = true
          this.validTimes=''
        } else {

          this.validTimes = contractVo.validTime
        }
        this.status = contractVo.status
        switch (contractVo.perpetualValid) {
          case '1':
            this.checked3 = true
            break;
          default:
            this.checked3 = false
            break;
        }
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
        for (let i = 0; i < signUserVo.length;i++) {
          var obj = {}
          obj.signUserName = signUserVo[i].signUserName
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
        }
      })
    },
    dateModified () {  // 修改日期
      var perpetualValid = ''
      if (this.checked3 == true){
        perpetualValid = '1'
      } else {
        perpetualValid = '0'
      }
      if(this.validTimes =='' && this.checked3 == false){
        this.$message({
          showClose: true,
          message: '请选择时间选项!',
          type: 'error'
        })
        return
      } else {
        this.$http.post(process.env.API_HOST+'v1/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode +'/contract/'+this.$store.state.rowNumber+'/updateContractTime',{'validTime':this.validTimes,'perpetualValid':perpetualValid},{emulateJSON:true}).then(function (res) {
          if(res.data.sessionStatus == '0'){
          this.$router.push('/Server')
        } else {
        if( res.data.resultCode == 0){
          this.$message({
            showClose: true,
            message: res.data.resultMessage,
            type: 'success'
          });
          this.seeContractSign()
        }
        }
        })
      }
    },
    backHome(){
      // console.log("state"+cookie.getJSON('state'))
      if(cookie.getJSON('state') == 'D'){
        // 首页合同列表进入
        this.$router.push("/Home")
      }else if(cookie.getJSON('state') == 'D1'){
        // 合同列表进入
        this.$router.push("/Mycontract")
      }else {
        // 其他页面进入
        this.$router.push("/");
      }
    }
  },
  created() {
    this.signMobile = cookie.getJSON('tenant')[0].mobile;
    // console.log(cookie.getJSON('tenant'),this.signMobile)
    var contractNo = sessionStorage.getItem('contractNo')
    if (contractNo) {
      contractNo = JSON.parse(contractNo)
      if ( this.$store.state.rowNumber == ''){
        this.$store.state.rowNumber = contractNo
      }
    }
    this.seeContractSign()
  }
}
</script>
<style scoped>
  @import "../../styles/ContractDelay/ContractDelaies.css";
</style>
