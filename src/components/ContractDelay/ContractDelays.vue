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
      <div class="title">签署文件</div>
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
          <el-button type="primary" plain size='medium' :disabled="hasClick" @click="dateModified">保存</el-button>
        </p>
        <div class="title" style="margin-top: 15px">签署人员</div>
      </div>
      <el-dialog title="合同详情图片" :visible.sync="dialogTableVisible" custom-class='showDialogs'>
        <div v-for="(item,index) in imgList" :key="index" >
          <img :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractImagePath='+item" alt="" style='width:100%;'>
        </div>
      </el-dialog>
      <div class='table' style="width: 1200px;padding:15px;box-sizing: border-box;">
        <el-table
          :header-cell-style="getRowClass"
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
            width="220"
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
<style scoped>
  .ContractDelays .main .title{
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
  .ContractDelays .main .text{
    margin-top: -30px;
    float: right;
    padding-right: 50px;
  }
  .back-home{
    background: url("/static/images/ContractInfo/back-home.png") no-repeat 10px 10px;
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

  .showDialogs .el-dialog__body{
      padding: 0px 20px;
    color: #606266;
    font-size: 14px;
    overflow-y: scroll;
    height: 649px;
    box-sizing: border-box;
  }
  .backHome{
    float: right;
    margin-top: 10px;
    font-size: 16px;
  }
</style>
<script>
  import {state, actions,mutations} from '@/store/index';

  import cookie from '@/common/js/getTenant';
  import {showSignRoomInfo} from '@/api/account';
  import {notification} from '@/api/list';
  import {contractimgs,getContractDetails,updateContractTime} from '@/api/detail';
  export default {
    name: 'ContractDelays',
    data() {
      return {
        baseURL:this.baseURL.BASE_URL,
        tableData2: [],
        contractName:'',
        validTimes:new Date(),
        status:'',
        hasClick:true,
        createType:'',
        dialogTableVisible: false,
        imgList:[],
        checked3:false,
        signMobile:'',
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        contractNo:sessionStorage.getItem('contractNo'),
        interfaceCode:cookie.getJSON('tenant')[1].interfaceCode,
      }
    },
    methods: {
      getRowClass({ row, column, rowIndex, columnIndex }) {
        if (rowIndex == 0) {
          return "background:#f5f5f5;text-align:center;font-weight:bold;";
        } else {
          return "";
        }
      },
      remindSignClick (row) {
        showSignRoomInfo(this.interfaceCode).then(res=>{
          let status = res.data.data.status
          let signRoomLink = res.data.data.signRoomLink
          let resultCode = res.data.data.resultCode
          let params = {
            "type":'0',
            "contractNo":this.contractNo,
            "userCode":row.userCode,
            "signRoomLink":signRoomLink,
            "mobile":row.mobile
          }
          notification(this.interfaceCode,params).then(res=> {
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
        }).catch(error=>{

        })
      },
      seeContractImg (){
        this.$loading.show(); //显示
        let data =[];
        let t=Math.random();
        contractimgs(this.interfaceCode,this.contractNo,t).then(res=> {
          for (let i = 0; i < res.data.length;i++) {
            let contractImagePath = res.data[i].contractImagePath;
            data[i] = contractImagePath;
          }
            this.$loading.hide(); //隐藏
          this.imgList = data
        }).catch(error=>{

        })
        this.dialogTableVisible = true
      },
      downloadClick () {
        let url = process.env.API_HOST+'v1/contract/'+ this.interfaceCode +'/'+this.contractNo;
        let download = document.createElement('a');
        document.body.appendChild(download)
        download.setAttribute('href',url);
        download.click()
      },
      dateInput () {
        this.hasClick = false;
        this.checked3 = false
      },
      checkedBox () {
        if(this.checked3 == true){
          this.validTimes = ''
        }
        if(this.checked3 == true){
          this.hasClick = false
        }else{
          this.hasClick = true
        }
      },
      seeContractSign(){
        let data =[];
        let t=Math.random();
        getContractDetails(this.interfaceCode,this.contractNo,t).then(res=> {
          let contractVo = res.data.contractVo
          let signUserVo = res.data.signUserVo
          let type = contractVo.createType
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
            let obj = {}
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

        }).catch(error=>{

        })
      },
      dateModified () {  // 修改日期
        let perpetualValid = ''
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
          return false
        } else {
          this.hasClick = true;
          let params={
            'validTime':this.validTimes,
            'perpetualValid':perpetualValid
          };
          updateContractTime(params,this.interfaceCode,this.contractNo).then(res=> {

            if( res.data.resultCode == 0){
              this.$message({
                showClose: true,
                message: res.data.resultMessage,
                type: 'success'
              });
              this.seeContractSign()
            }

          }).catch(error=>{

          })
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

      this.seeContractSign()
    }
  }
</script>
<style scoped>
  @import "../../styles/ContractDelay/ContractDelaies.css";
</style>
