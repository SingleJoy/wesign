<template>
  <div class='CompanyExbm'>
    <div class='main'>
      <!-- <p class='first' style="display: inherit;">
        <span>我的合同</span>
        <span v-if='status=="已截止"'>>&nbsp;合同延期 (您可以点击修改签署截止日期或者勾选永久来改变合同状态)</span>
        <span v-else style="padding-right: 75%;">>合同详情</span>
            <a class="backHome back-home" href="javascript:void(0);"  @click="backHome" >返回</a>
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
      <div class='three'>
        <p class='details2' style="text-align:left;">
          <strong>合同文件：</strong><span class="lengthLimit" style="vertical-align: middle;">{{contractName}}</span>
          <a href="javascript:void(0);" @click="seeContractImg">查看</a>
          <a href="javascript:void(0);" @click="downloadClick">下载</a>
          <strong>发起方式：</strong><span>{{createType}}</span>

          <strong style="padding-left: 15px;">签署截止日期：</strong>

          <el-date-picker
            style='width:138px;margin-right:10px'
            height='height:40px'
            v-model="validTime"
            type="date"
            :editable= false
            :clearable= false
            format="yyyy-MM-dd 23:59:59"
            value-format="yyyy-MM-dd 23:59:59"
            @change="dateInput"
            :picker-options="pickerOptions0"
          >
          </el-date-picker>

          <el-checkbox v-model="checked3" @change='checkedBox'>永久有效</el-checkbox>
          <el-button type="primary" plain size='medium' @click="dateModified" style="margin-left: 10px;">确认</el-button>
          <strong style="font-weight: normal;margin-left: 15px;">业务场景：</strong><span>{{businessScenario}}</span>

        </p>
        <img src="../../../static/images/ContractInfo/launch.png" alt="" class='pic-a' style="display:block;margin-left:8px;margin-top:20px;" >
      </div>
      <el-dialog title="合同详情图片" :visible.sync="dialogTableVisible"  custom-class='contract-info'>
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
  .main .first #sign-icon{
        background: url("../../../static/images/ContractInfo/detail_sign.png") no-repeat;
        height: 60px;
        width: 140px;
        position: absolute;
        text-align: center;
        display: inline-block;
        margin-left: 20px;
        background-size: cover;
        line-height: 44px;
        padding-left: 20px;
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
  .el-table--scrollable-x .el-table__body-wrapper{
    overflow: hidden;
  }
  .el-step__title.is-process,.el-step__description.is-process{
    color:#22a7ea
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
    name: 'CompanyExcm',
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
            rowNumber:'',
            pickerOptions0: {
            disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7;
            }
            },
            checked3:false,
            interfaceCode:cookie.getJSON('tenant')?cookie.getJSON('tenant')[1].interfaceCode:'',
            accountName:'',
            accountCode :sessionStorage.getItem('accountCode'),
            operator:''
        };
    },
    methods: {
      seeContractImg (){
        this.$loading.show(); //显示
        var data =[];
        this.$http.get(process.env.API_HOST+'v1.4/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode +'/contract/'+this.rowNumber+'/contractimgs').then(function (res) {
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
        var url = process.env.API_HOST+'v1/contract/'+ cookie.getJSON('tenant')[1].interfaceCode +'/'+ this.rowNumber;
        var download = document.createElement('a');
        document.body.appendChild(download)
        download.setAttribute('href',url);
        download.click()
      },
      seeContractDetails () {
        var data =[];
        let url = process.env.API_HOST+'v1.4/contract/'+this.rowNumber+'/signFinish';
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
            this.operator = res.data.data.operator
            switch (type) {
              case '1':
                this.createType = '模板发起'
                break;
              default:
                this.createType = '上传发起'
                break;
            }
            this.status = res.data.data.status
             if(res.data.data.perpetualValid == '1'){
               this.checked3 = true
             }else{
               this.checked3 = false
             }
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

            this.$http.get(process.env.API_HOST+'v1.4/contract/'+this.rowNumber+'/contractSignUserInfo',{params:{'contractNoZq':contractNoZq}}).then(function (res) {
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
      dateInput () {
        this.checked3 = false
      },
      checkedBox () {
        if(this.checked3 == true){
          this.validTime = ''
        }
      },
      dateModified () {  // 修改日期
        var perpetualValid = ''
          if (this.checked3 == true){
            perpetualValid = '1'
          } else {
            perpetualValid = '0'
          }
          if(this.validTime =='' && this.checked3 == false){
            this.$message({
              showClose: true,
              message: '请选择时间选项!',
              type: 'error'
            })
            return  false
          } else {
            this.$http.post(process.env.API_HOST+'v1/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode +'/contract/'+this.rowNumber+'/updateContractTime',{'validTime':this.validTime,'perpetualValid':perpetualValid},{emulateJSON:true}).then(function (res) {
              if(res.data.sessionStatus == '0'){
                this.$router.push('/Server')
              } else {
                if( res.data.resultCode == 0){
                  this.$message({
                    showClose: true,
                    message: res.data.resultMessage,
                    type: 'success'
                  });
                  this.seeContractDetails()
                }
              }
            })
          }
      },
      backHome(){
        // console.log("state"+cookie.getJSON('state'))
        if(cookie.getJSON('state') == 'E'){

          this.$router.push("/Home")
        }else if(cookie.getJSON('state') == 'E1'){
          this.$router.push("/CompanyContract")
        }
      }
    },
    created() {
        this.signMobile = cookie.getJSON('tenant')[0].mobile
        var contractNo = sessionStorage.getItem('contractNo');
        var accountLevel = sessionStorage.getItem('accountLevel');
        var accountCode = sessionStorage.getItem('accountCode');
        if (contractNo) {
            // contractNo = JSON.parse(contractNo)
            this.rowNumber = contractNo
        }
        this.seeContractDetails ()
        //判断是不是二级账户如果是不请求顶部显示部门姓名
        if(accountLevel != 2){
            let param={
                accountCode:accountCode
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
