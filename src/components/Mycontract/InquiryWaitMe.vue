<template>
  <div class='InquiryWaitMe'>
    <div class='contractTitle' style="text-align: left;">
      <input type="text" class="signer-name" placeholder="如合同名称/签署人" v-model="inputVal1" :maxlength = 50>
      <el-select v-model="value" v-if="isBusiness==1&& accountLevel!=2" @visible-change="getAccount()" @change="selectParam(value)" placeholder="请选择账号类型">
        <el-option
          v-for="item in options"
          :key="item.accountCode"
          :label="item.accountName"
          :value="item.accountCode">
        </el-option>
      </el-select>
      <span id='text'>发起时间：</span>
      <el-date-picker
        style='width:140px;margin-right:20px'
        height='height:40px'
        v-model="filters.column.create_start_date"
        type="date"
        placeholder="开始时间"
        format="yyyy-MM-dd"
        :picker-options="pickerBeginDateBefore"
      >
      </el-date-picker>
      <el-date-picker
        style='width:140px;margin-right:20px'
        height='height:40px'
        v-model="filters.column.create_end_date"
        type="date"
        placeholder="结束时间"
        format="yyyy-MM-dd"
        :picker-options="pickerBeginDateAfter"
      >
      </el-date-picker>
      <el-checkbox
        style='padding-right:20px'
        v-model="checked"
      ></el-checkbox>
      <b class='info' style='font-size: 12px;display: inline-block;margin-left: -18px;'>永久有效</b>
      <el-button type="primary" @click='contractInquiryWaitMe' style='margin-left:20px;letter-spacing:5px;'>搜索</el-button>
    </div>
    <div class="list-body">
      <div class='table'>
        <div class="waitMeImg" v-if="num === 0">
          <img src="/static/images/notavailable.png" alt="">
        </div>
        <el-table
          :data="tableData2"
          :header-cell-style="getRowClass"
          style="width: 100%;text-align:center"
          v-loading="loading"
          element-loading-text="拼命加载中"
          v-cloak
          v-else
          @selection-change="handleSelectionChange"
          ref="multipleTable"
        >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="contractName"
            label="合同名称"
            style="text-align:center"
            width="250"
            :show-overflow-tooltip= true
          >
          </el-table-column>
          <el-table-column
            prop="signers"
            label="签署人"
            width="250"
            :show-overflow-tooltip= true
          >
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="发起时间"
            width="150">
          </el-table-column>
          <el-table-column
            prop="validTime"
            label="结束时间"
            width="150">
          </el-table-column>
          <el-table-column
            prop="contractStatus"
            label="当前状态"
            width="150">
          </el-table-column>
          <el-table-column
            prop="operation"
            label="操作"

          >
            <template slot-scope="scope">
              <el-button @click="signClick(scope.row)" type="primary" size="mini" v-if ='scope.row.operation === 1  && (scope.row.isCreater?accountCode == scope.row.operator:true)'>签&nbsp;&nbsp;署</el-button>
              <el-tooltip content="短信通知签署方" effect="light" placement="right" v-else-if ='scope.row.operation === 2 && scope.row.isCreater  && accountCode == scope.row.operator' >
                <el-button @click="remindClick(scope.row)" type="primary" size="mini">提&nbsp;&nbsp;醒</el-button>
              </el-tooltip>
              <el-button @click="downloadClick(scope.row)" type="primary" size="mini" v-else-if ='scope.row.operation === 3' >下&nbsp;&nbsp;载</el-button>
              <el-button @click="seeClick(scope.row)" type="primary" size="mini" v-else-if ='scope.row.operation === 4 && scope.row.isCreater && accountCode == scope.row.operator ' >延&nbsp;&nbsp;期</el-button>
              <el-button @click="rowLockClick(scope.row)" type="primary" size="mini">详&nbsp;&nbsp;情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 数据表格 end -->
        <div class="batch-download-btn-area" v-if="num">
          <button  @click="batchDownload"  class="batch-download-btn">
            <span>批量下载</span>
          </button>
        </div>
      </div>
      <div class='pagetion'>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange2"
          :current-page="currentPage1"
          :page-size="10"
          layout="total,prev, pager, next, jumper"
          :total= Number(num)>
        </el-pagination>
      </div>

    </div>

  </div>
</template>

<script>
  import cookie from '@/common/js/getTenant'
  import moment  from 'moment'
  import server from "@/api/url";
  import {b2cContrants,remind} from '@/api/list'
  import {state, actions,mutations} from '@/store/index';

  export default {
    name:'InquiryWaitMe',
    data() {
      return {
        options: [],
        queryAccountCode:this.accountLevel==2?sessionStorage.getItem('accountCode'):'',
        value:'',
        interfaceCode:cookie.getJSON('tenant')[1].interfaceCode,
        accountCode:sessionStorage.getItem('accountCode'),
        accountLevel:sessionStorage.getItem('accountLevel'),
        isBusiness:cookie.getJSON('tenant')[1].isBusiness,
        currentPage1: 1,
        value8:  '',
        value9: "",
        hasQuery:false,
        tableData2: [],
        num: '',
        loading: true,
        inputVal1:'',
        checked:false,
        inquiry:false,
        filters: {
          column: {
            create_start_date:null,
            create_end_date:null
          },
        },
        pickerBeginDateBefore:{
          disabledDate: (time) => {
            let beginDateVal = this.filters.column.create_end_date;
            if (beginDateVal) {
              return time.getTime() > beginDateVal;
            }
          }
        },
        pickerBeginDateAfter:{
          disabledDate: (time) => {
            let beginDateVal = this.filters.column.create_start_date;
            if (beginDateVal) {
              return time.getTime() < beginDateVal;
            }
          }
        },
        multipleSelection: [],    //全选按钮的数组
        downloadList:[],  //要下载的数组
        showFilingNo:this.$store.state.showFilingNo,
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //批量下载请求
      batchDownload(){
        let length = this.multipleSelection.length;
        let str = '';
        this.downloadList = this.downloadList.concat(this.multipleSelection);
        if(length < 1){
          this.$message({
            showClose: true,
            message: '请先勾选想要下载的合同文件',
            type: "error"
          });

        }else{
          for (let i = 0; i < length; i++) {
            str += this.multipleSelection[i].contractNum + ',';
          }

          let url = '/api/v1.7/contract/'+this.interfaceCode+'/downloadContracts?interfaceCode='+this.interfaceCode+'&contractNoArray='+str;
          let up = document.createElement('a');
          document.body.appendChild(up);
          up.setAttribute('href', url);
          up.click();

          self.multipleSelection = [];
          this.$refs.multipleTable.clearSelection();
        }
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {
        if (rowIndex == 0) {
          return 'background:#f5f5f5;font-weight:bold;'
        } else {
          return ''
        }
      },
      getData (requestVo) {
        let data =[];
        let isCreater='';
        let currentFaceCode = cookie.getJSON("tenant")[1].interfaceCode;

        if(!requestVo){
           requestVo ={
            'pageNo':'1',
            'pageSize':'10',
            'contractStatus':'1',
            'accountCode':this.accountLevel==2?this.accountCode:'',
             'filingNo':this.$store.state.showFilingNo,
          };
        }

        b2cContrants(requestVo,this.interfaceCode).then(res=>{
          for (let i = 0; i < res.data.content.length;i++) {
            if (res.data.content[i].creater == currentFaceCode) {
              isCreater = true;
            } else {
              isCreater = false;
            }
            var obj = {}
            obj.contractName = res.data.content[i].contractName;
            obj.contractNum = res.data.content[i].contractNum;
            obj.createTime = res.data.content[i].createTime;
            obj.signers =  res.data.content[i].signers;
            obj.validTime =  res.data.content[i].validTime;
            obj.contractStatus =  res.data.content[i].contractStatus;
            obj.operator = res.data.content[i].operator
            obj.isCreater = isCreater;
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
                break;
            }
            data[i] = obj
          }
          this.tableData2 = data
          this.num = res.data.totalItemNumber
          this.loading = false
        }).catch(error=>{

        })
      },
      handleCurrentChange2(val) {
        this.currentPage1 = val
        this.queryAccountCode = this.accountLevel==2?sessionStorage.getItem('accountCode'):this.queryAccountCode;
        if ( this.inputVal1 !== '' || this.filters.column.create_start_date !== '' ||  this.filters.column.create_end_date !=='' || this.checked !== false) {
          if (this.checked == true) {
            var perpetualValid = '1'
          } else {
            var perpetualValid = ''
          }
          if(this.inquiry == true){
            var start = this.filters.column.create_start_date
            var end =   this.filters.column.create_end_date
            if(start == null) {start =null}else{start = moment(start).format().slice(0,10)}
            if(end==null){end=''}else{end = moment(end).format().slice(0,10)}
            var requestVo ={
              "contractName":this.inputVal1,
              "queryTimeStart":start,
              "queryTimeEnd":end,
              'perpetualValid':perpetualValid,
              'pageNo':val,
              'pageSize':'10',
              'contractStatus':'1',
              'accountCode':this.queryAccountCode,
              'filingNo':this.$store.state.showFilingNo,
            };
            this.getData (requestVo)
          }else{
            var requestVo ={
              'pageNo':val,
              'pageSize':'10',
              'contractStatus':'1',
              'accountCode':this.queryAccountCode,
              'filingNo':this.$store.state.showFilingNo,
            };
            this.getData (requestVo)
          }
        } else {
          var requestVo ={
            'pageNo':val,
            'pageSize':'10',
            'contractStatus':'1',
            'accountCode':this.queryAccountCode,
            'filingNo':this.$store.state.showFilingNo,
          };
          this.getData (requestVo)
        }
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      selectParam(value){
        this.queryAccountCode=value
      },
      contractInquiryWaitMe () {
        this.queryAccountCode = this.accountLevel==2?sessionStorage.getItem('accountCode'):this.queryAccountCode;
        if (this.checked == true) {
          var perpetualValid = '1'
        } else {
          var perpetualValid = ''
        }
        var start = this.filters.column.create_start_date
        var end =   this.filters.column.create_end_date
        if(start == null) {start =null}else{start = moment(start).format().slice(0,10)}
        if(end==null){end=''}else{end = moment(end).format().slice(0,10)}
        var requestVo ={
          "accountCode":this.queryAccountCode,
          "contractName":this.inputVal1,
          "queryTimeStart":start,
          "queryTimeEnd":end,
          'perpetualValid':perpetualValid,
          'pageNo':'1',
          'pageSize':'10',
          'contractStatus':'1',
          'filingNo':this.$store.state.showFilingNo,
        };
        this.getData (requestVo)
        this.currentPage1 = 1;
        this.$message({
          showClose: true,
          message: '查询成功!',
          type: 'success'
        });
        this.inquiry = true
      },
      rowLockClick (row) {
        this.$store.dispatch('contractsInfo',{contractNo:row.contractNum})
        sessionStorage.setItem('contractNo', row.contractNum)
        sessionStorage.setItem("detailAccountCode",row.operator) //查看详情时二级账户的accountCode
        cookie.set('state','List')
        this.$store.dispatch('tabIndex',{tabIndex:1});
        this.$router.push('/ContractInfo')

      },
      signClick (row) { //待我签署
        this.$store.dispatch('contractsInfo',{contractNo:row.contractNum})
        sessionStorage.setItem('contractNo', row.contractNum)
        this.$router.push('/Contract')
      },
      remindClick (row) { //提醒
        let param={
          'contractType':1,
          'remindType':0
        }
        remind(param,this.interfaceCode,row.contractNum).then(res=>{
          var resultCode = res.data.resultCode
          var resultMessage = res.data.resultMessage
          if ( resultCode === '0') {
            this.$message({
              showClose: true,
              message: resultMessage,
              type: 'success'
            });
          } else {
            this.$message({
              showClose: true,
              message: resultMessage,
              type: 'error'
            });
          }
        }).catch(error=>{

        })
      },
      downloadClick (row) { //下载
        var url = process.env.API_HOST+'v1/contract/'+ this.interfaceCode + '/'+ row.contractNum;
        var up = document.createElement('a');
        document.body.appendChild(up)
        up.setAttribute('href',url);
        up.click()
      },
      // getStartTime(){ //日期
      //   var d = this.value8;
      //   this.formStartTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() +' '+'00:00:00';
      // },
      // /*得到搜索条件的结束时间*/
      // getEndTime(){
      //   var d = this.value9;
      //   this.formEndTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() +' '+'23:59:59';
      // }
      getAccount(){
        if(!this.hasQuery){

          let accountCode = sessionStorage.getItem('accountCode');
          let enterpriseName = sessionStorage.getItem('enterpriseName');
          server.queryContractLists(this.interfaceCode).then(res=>{
            if(res.data.resultCode == 1){
              this.options=res.data.dataList;
              this.options.unshift({accountCode:'',accountName:'全部'},{accountCode:accountCode,accountName:enterpriseName})
              this.hasQuery=true;
            }
          })
        }
      }
    },
    created() {

    }
  }
</script>

<style lang='scss' scoped>
  @import '../../styles/Multiparty/Multiparties.scss';
  @import "../../common/styles/BatchDownLoad.scss";
</style>

<style>
  .waitMeImg{
    width: 153px;
    margin: 300px auto;
    height: 89px;
    margin-bottom: 175px;
  }
  .waitMeImg>img{
    width: 100%;
    height:100%;
  }
  .el-button--primary:focus{
    background: #eee;
    border-color: #95989d;
    color: #333;
  }
</style>
