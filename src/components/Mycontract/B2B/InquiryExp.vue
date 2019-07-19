<template>
  <div class="InquiryExpired">
    <div class='contractTitle' style="text-align: left;">
      <input type="text" class="signer-name" placeholder="如合同名称/签署人"  v-model="inputVal4" :maxlength = 50>
      <el-select v-model="value" v-if="isBusiness==1 && accountLevel!=2" @visible-change="getAccount()" @change="selectParam(value)" placeholder="全部">
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
      <el-button type="primary" @click='contractInquiryExpired' style='margin-right: 41px;letter-spacing:5px;'>搜索</el-button>
    </div>
    <div class="list-body">
      <div class='table'>
        <div class="expiredImg" v-if="num === 0">
          <img src="/static/images/notavailable.png" alt="">
        </div>
        <el-table
          :header-cell-style="getRowClass"
          :data="tableInformation"
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
            width="240">
          </el-table-column>
          <el-table-column
            prop="signers"
            label="签署人"
            width="250">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="发起时间"
            width="150">
          </el-table-column>
          <el-table-column
            prop="validTime"
            label="截止时间"
            width="150">
          </el-table-column>
          <el-table-column
            prop="contractStatus"
            label="当前状态"
            width="120">
          </el-table-column>
          <el-table-column
            prop="operation"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button @click="affixClick(scope.row)" type="primary" size="mini" v-if ='scope.row.operation === 1  && (scope.row.isCreater?accountCode == scope.row.operator:true)'>签&nbsp;&nbsp;署</el-button>

              <el-tooltip content="短信通知签署方" effect="light" placement="right" v-else-if ='scope.row.operation === 2 && scope.row.isCreater  && accountCode == scope.row.operator' >
                <el-button @click="warnClick(scope.row)" type="primary" size="mini">提&nbsp;&nbsp;醒</el-button>
              </el-tooltip>

              <el-button @click="downloadClick(scope.row)" type="primary" size="mini" v-else-if ='scope.row.operation === 3' >下&nbsp;&nbsp;载</el-button>
              <el-button @click="lookClick(scope.row)" type="primary" size="mini" v-else-if ='scope.row.operation === 4 && scope.row.isCreater  && accountCode == scope.row.operator' >延&nbsp;&nbsp;期</el-button>
              <el-button @click="rowlookClick(scope.row)" type="text" size="mini">详&nbsp;&nbsp;情</el-button>
              <el-button v-if="$store.state.showFilingType" type="text" size="small" @click="folderClick(scope.row)">归档</el-button>
              <el-button v-else type="text" size="small" @click="folderClick(scope.row)">重新归档</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 数据表格 end -->
        <div class="batch-download-btn-area" v-if="num">
          <button  @click="batchDownload"  class="batch-download-btn">
            <span>批量下载</span>
          </button>

          <button  @click="batchFolder"  class="folder-download-btn" style="margin-top: 20px;margin-bottom: 30px;padding-bottom: 30px">
            <span>批量归档</span>
          </button>
        </div>
      </div>
      <div class='pagetion'>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange5"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total= Number(num)>
        </el-pagination>
      </div>
    </div>

    <el-dialog title="合同归档" :visible.sync="dialogChooseFolder"  custom-class="dialogChooseFolder">

      <template>
        <el-radio-group v-model="showFilingNo" >
          <el-radio  label=""  class="folderListCheck"  title="默认文件夹">
            默认文件夹
          </el-radio>
          <el-radio v-for="item in folderList" :label="item.filingNo"  :key="item.filingNo"  class="folderListCheck" :name=item.filingNo :title="item.filingName">
            {{item.filingName}}
          </el-radio>
        </el-radio-group>
        <div class="operate">

          <el-button type="primary" class="folder-quit" @click="quit" >取消</el-button>
          <el-button type="primary" class="folder-sure" @click="folderSure" >确定</el-button>
        </div>
      </template>

    </el-dialog>
  </div>
</template>

<script>
  import cookie from '@/common/js/getTenant'
  import moment  from 'moment'
  import server from "@/api/url";
  import {b2bContrants,remind} from '@/api/list'
  import {state, actions,mutations} from '@/store/index';
  import {addContractFiling, contractFiling, contractFilings,
    deleteContractFiling, updateContractFiling}
    from '@/api/folder'
  export default {
    name:'InquiryExpired',
    data() {
      return {
        interfaceCode:cookie.getJSON('tenant')[1].interfaceCode,
        accountCode:sessionStorage.getItem('accountCode'),
        accountLevel:sessionStorage.getItem('accountLevel'),
        isBusiness:cookie.getJSON('tenant')[1].isBusiness,
        options: [],
        queryAccountCode:this.accountLevel==2?sessionStorage.getItem('accountCode'):'',
        hasQuery:false,
        value:'',
        currentPage4: 1,
        everyPage:10,
        value8: '',
        value9: '',
        tableInformation: [],
        num: '',
        inquiry:false,
        loading: true,
        inputVal4:'',
        filters: {
          column: {
            create_start_date: null,
            create_end_date: null
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
        dialogChooseFolder:false,
        folderList:[],
        batchFolderListNo:'',
        defaultContractNum:'',
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
        let currentFaceCode = cookie.getJSON('tenant')[1].interfaceCode;
        if(!requestVo){
          requestVo ={
            'pageNo':'1',
            'pageSize':this.everyPage,
            'contractStatus':'4',
            'accountCode':this.accountLevel==2?this.accountCode:'',
            'filingNo':this.$store.state.showFilingNo,
            'accountLevel':sessionStorage.getItem("accountLevel"),
          };
        }
        b2bContrants(requestVo,this.interfaceCode).then(res=>{
          for (let i = 0; i < res.data.content.length;i++) {
            if(res.data.content[i].creater == currentFaceCode){
              isCreater = true;
            }else{
              isCreater = false;
            }
            let obj = {}
            obj.contractName = res.data.content[i].contractName;
            obj.contractNum = res.data.content[i].contractNum;
            obj.createTime = res.data.content[i].createTime;
            obj.signers =  res.data.content[i].signers;
            obj.contractStatus =  res.data.content[i].contractStatus;
            obj.validTime =  res.data.content[i].validTime;
            obj.contractType = res.data.content[i].contractType;
            obj.operator = res.data.content[i].operator;
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
          this.tableInformation = data;
          this.num = res.data.totalItemNumber
          this.loading = false

        }).catch(error=>{

        })
      },
      handleCurrentChange5(val) {
        this.currentPage4 = val;
        this.queryAccountCode = this.accountLevel==2?sessionStorage.getItem('accountCode'):this.queryAccountCode;
        if ( this.inputVal4 !== ''  || this.filters.column.create_start_date !== '' || this.filters.column.create_end_date !=='' ) {
          if(this.inquiry == true){
            let start = this.filters.column.create_start_date
            let end =   this.filters.column.create_end_date
            if(start == null) {start =null}else{start = moment(start).format().slice(0,10)}
            if(end==null){end=''}else{end = moment(end).format().slice(0,10)}
            let requestVo ={
              "contractName":this.inputVal4,
              "queryTimeStart":start,
              "queryTimeEnd":end,
              'pageNo':val,
              'pageSize':this.everyPage,
              'contractStatus':'4',
              // 'accountCode':this.accountLevel==2?this.accountCode:''
              "accountCode":this.queryAccountCode,
              'filingNo':this.$store.state.showFilingNo,
              'accountLevel':sessionStorage.getItem("accountLevel"),
            };
            this.getData (requestVo)
          }else{
            let requestVo ={
              'pageNo':val,
              'pageSize':this.everyPage,
              'contractStatus':'4',
              'accountCode':this.queryAccountCode,
              'filingNo':this.$store.state.showFilingNo,
              'accountLevel':sessionStorage.getItem("accountLevel"),
            };
            this.getData (requestVo)
          }
        } else {
          let requestVo ={
            'pageNo':val,
            'pageSize':this.everyPage,
            'contractStatus':'4',
            'accountCode':this.queryAccountCode,
            'filingNo':this.$store.state.showFilingNo,
            'accountLevel':sessionStorage.getItem("accountLevel"),
          };
          this.getData (requestVo)
        }
      },
      handleSizeChange(val) {
        this.everyPage=val;
        this.getData();
      },
      selectParam(value) {
        this.queryAccountCode = value;
      },
      contractInquiryExpired () {
        this.queryAccountCode = this.accountLevel==2?sessionStorage.getItem('accountCode'):this.queryAccountCode;
        let start = this.filters.column.create_start_date
        let end =   this.filters.column.create_end_date
        if(start == null) {start =null}else{start = moment(start).format().slice(0,10)}
        if(end==null){end=''}else{end = moment(end).format().slice(0,10)}
        let requestVo ={
          // "accountCode":this.queryAccountCode?this.queryAccountCode:this.accountCode,
          "accountCode":this.queryAccountCode,
          "contractName":this.inputVal4,
          "queryTimeStart":start,
          "queryTimeEnd":end,
          'pageNo':'1',
          'pageSize':this.everyPage,
          'contractStatus':'4',
          'filingNo':this.$store.state.showFilingNo,
          'accountLevel':sessionStorage.getItem("accountLevel"),
        };
        this.getData (requestVo)
        this.currentPage4 = 1;
        this.inquiry = true
      },
      rowlookClick (row) {
        // console.log(row)
        if(row.contractType == '0'){
          this.$store.dispatch('contractsInfo',{contractNo:row.contractNum})
          sessionStorage.setItem('contractNo', row.contractNum)
          sessionStorage.setItem("detailAccountCode",row.operator) //查看详情时二级账户的accountCode
          cookie.set('state','List')
          this.$router.push('/CompanyExa')
        }else{
          this.$store.dispatch('contractsInfo',{contractNo:row.contractNum})
          sessionStorage.setItem('contractNo', row.contractNum)
          sessionStorage.setItem("detailAccountCode",row.operator) //查看详情时二级账户的accountCode
          this.$router.push('/ContractInfo')
        }
        this.$store.dispatch('tabIndex',{tabIndex:1});
      },
      affixClick (row) { //签署
        if(row.contractType == '0'){
          this.$store.dispatch('contractsInfo',{contractNo:row.contractNum})
          sessionStorage.setItem('contractNo', row.contractNum)
          this.$router.push('/Dimension')
        }else{
          this.$store.dispatch('contractsInfo',{contractNo:row.contractNum})
          sessionStorage.setItem('contractNo', row.contractNum)
          this.$router.push('/Contract')
        }
      },
      warnClick (row) { //提醒
        let param={
          contractType:0,
          remindType:0
        }
        remind(param,this.interfaceCode,row.contractNum).then(res=>{
          let resultCode = res.data.resultCode
          let resultMessage = res.data.resultMessage
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
        let url = process.env.API_HOST+'v1/contract/'+ cookie.getJSON('tenant')[1].interfaceCode + '/'+ row.contractNum;
        let up = document.createElement('a');
        document.body.appendChild(up)
        up.setAttribute('href',url);
        up.click()
      },
      lookClick(row){  //延期
        if(row.contractType == '0'){
          sessionStorage.setItem('contractNo', row.contractNum)
          cookie.set('state','List')
          this.$router.push('/CompanyExc')
        }else{
          this.$store.dispatch('contractsInfo',{contractNo:row.contractNum})
          sessionStorage.setItem('contractNo', row.contractNum)
          this.$router.push('/ContractDelay')
        }
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
          let interfaceCode = cookie.getJSON('tenant')[1].interfaceCode;
          let accountCode = sessionStorage.getItem('accountCode');
          let enterpriseName = sessionStorage.getItem('enterpriseName');
          server.queryContractLists(interfaceCode).then(res=>{
            if(res.data.resultCode == 1){
              this.options=res.data.dataList;
              this.options.unshift({accountCode:'',accountName:'全部'},{accountCode:accountCode,accountName:enterpriseName})
              this.hasQuery=true;
            }
          })
        }
      },
      folderClick(row){

        this.defaultContractNum=row.contractNum;
        contractFilings(this.interfaceCode,this.accountCode).then(res=>{
          if(res.data.resultCode=='1'){
            this.folderList=res.data.dataList;
            this.showFilingNo=this.$store.state.showFilingNo;
            if(this.$store.state.folderNum<1){
              this.$message({
                type: 'error',
                message: '暂无可归档的文件夹，您可点击“默认文件夹”后的加号，新增自定义文件夹'
              });
              return false;
            }
            this.dialogChooseFolder=true;
          }
        }).catch(error=>{

        })
      },
      contractFiling(filingNo){
        let params={
          oldFilingNo:this.$store.state.showFilingNoDefault,
          newFilingNo:this.showFilingNo,
          contractNo:this.defaultContractNum
        };
        contractFiling(this.interfaceCode,this.accountCode,params).then(res=>{
          this.showFilingNo=this.$store.state.showFilingNoDefault;
          if(res.data.resultCode=='1'){
            this.dialogChooseFolder=false;
            this.getData();
            this.$emit('setFolder');
            this.$message({
              type: 'success',
              message: res.data.resultMessage
            });
          }else{
            this.dialogChooseFolder=false;
            this.showFilingNo='';
            this.$message({
              type: 'error',
              message: res.data.resultMessage
            });
          }
        }).catch(error=>{

        })
      },
      batchFolder(){
        let length = this.multipleSelection.length;
        let str = '';
        this.downloadList = this.downloadList.concat(this.multipleSelection);
        if(length < 1){
          this.$message({
            showClose: true,
            message: '请先勾选想要归档合同文件',
            type: "error"
          });
          return false
        }else {
          for (let i = 0; i < length; i++) {
            str += this.multipleSelection[i].contractNum + ',';
          }
          this.defaultContractNum=str;
        }
        contractFilings(this.interfaceCode,this.accountCode).then(res=>{
          if(res.data.resultCode=='1'){
            this.folderList=res.data.dataList;
            this.showFilingNo=this.$store.state.showFilingNo;
            if(this.$store.state.folderNum<1){
              this.$message({
                type: 'error',
                message: '暂无可归档的文件夹，您可点击“默认文件夹”后的加号，新增自定义文件夹'
              });
              return false;
            }
            this.dialogChooseFolder=true;
          }
        }).catch(error=>{

        })

      },
      folderSure(){
        let fillingNo=this.showFilingNo;

        this.contractFiling(fillingNo);
      },

      quit(){
        this.showFilingNo=this.$store.state.showFilingNoDefault;
        this.dialogChooseFolder=false;
      },
      changeDefaultFillNo(){
        this.showFilingNo=this.$store.state.showFilingNoDefault;
      },
      //重置二级账号帅选条件
      defaultSelectValue(){
        this.value='';
      }
    },
    created() {

    }
  }
</script>

<style lang='scss' scoped>
  @import "../../../styles/Multiparty/Multiparties.scss";
  @import "../../../common/styles/BatchDownLoad.scss";
</style>

<style lang='scss'>
  @import "../../../common/styles/dialog.scss";
  .expiredImg{
    width: 153px;
    margin: 300px auto;
    height: 89px;
    margin-bottom: 175px;
  }
  .expiredImg>img{
    width: 100%;
    height:100%;
  }
  .el-button--primary:focus{
    background: #eee;
    border-color: #95989d;
    color: #333;
  }
</style>
