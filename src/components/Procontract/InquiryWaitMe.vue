<template>
  <div class='InquiryWaitMe'>
    <div class='contractTitle' style="border:none;text-align:left;padding-left:20px;">
      <input type="text" class="signer-name" placeholder="如合同名称/签署人" v-model="inputVal1" :maxlength = 50>
      <el-select v-model="value" v-if="isBusiness==1&& accountLevel!=2" @change="selectParam(value)" placeholder="请选择账号类型">
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
        <div class="totalImg" v-if="num === 0">
          <img src="/static/images/notavailable.png" alt="">
        </div>
        <el-table
          :data="tableData2"
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
            width="240"
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
            width="140">
          </el-table-column>
          <el-table-column
            prop="validTime"
            label="结束时间"
            width="140">
          </el-table-column>
          <el-table-column
            prop="contractStatus"
            label="当前状态"
            width="140">
          </el-table-column>
          <el-table-column prop="operation" label="操作" >
            <template slot-scope="scope">
              <!-- <el-button @click="signClick(scope.row)" type="primary" size="mini" v-if ='scope.row.operation === 1 && (scope.row.isCreater?accountCode == scope.row.operator:true)'>签&nbsp;&nbsp;署</el-button> -->
              <el-button @click="downloadClick(scope.row)" type="primary" size="mini" v-if ='scope.row.operation === 3' >下&nbsp;&nbsp;载</el-button>
              <el-button @click="rowLockClick(scope.row)" type="text" size="mini">详&nbsp;&nbsp;情</el-button>
              <el-button v-if="$store.state.showFilingTypeUnRec" type="text" size="small" @click="folderClick(scope.row)">重新归档</el-button>
              <el-button v-else type="text" size="small" @click="folderClick(scope.row)">归档</el-button>
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
          @current-change="handleCurrentChange2"
          :current-page="currentPage1"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total= Number(num)>
        </el-pagination>
      </div>
    </div>
    <el-dialog title="合同归档" :visible.sync="dialogChooseFolder"  custom-class="dialogChooseFolder">
      <template>
        <el-radio-group v-model="showFilingNo"  >
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
  import cookie from "@/common/js/getTenant";
  import moment from "moment";
  import {b2bContrants} from "@/api/detail";
  import {state, actions,mutations} from '@/store/index';
  import {addContractFiling, contractFiling, contractFilings,
    deleteContractFiling, updateContractFiling}
    from '@/api/folder'
  export default {
    name: "InquiryWaitMe",
    data() {
      return {
        interfaceCode:cookie.getJSON('tenant')[1].interfaceCode,
        contractNo:sessionStorage.getItem("contractNo"),
        accountCode:sessionStorage.getItem('accountCode'),
        accountLevel:sessionStorage.getItem('accountLevel'),
        isBusiness:cookie.getJSON('tenant')[1].isBusiness,
        queryAccountCode:this.accountLevel==2?sessionStorage.getItem('accountCode'):'',
        value:'',
        options:[],
        currentPage1: 1,
        everyPage:10,
        value8: "",
        value9: "",
        tableData2: [],
        num: "",
        loading: true,
        inputVal1: "",
        checked: false,
        inquiry: false,
        filters: {
          column: {
            create_start_date: null,
            create_end_date: null
          }
        },
        pickerBeginDateBefore: {
          disabledDate: time => {
            let beginDateVal = this.filters.column.create_end_date;
            if (beginDateVal) {
              return time.getTime() > beginDateVal;
            }
          }
        },
        pickerBeginDateAfter: {
          disabledDate: time => {
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
      };
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
      getData(requestVo) {
        let data = [];
        let isCreater = '';
        if(!requestVo){

          requestVo ={
            'pageNo':'1',
            'pageSize':this.everyPage,
            'contractStatus':'1',
            'filingNo':this.$store.state.showFilingNo,
          };
        }
        b2bContrants(requestVo,this.interfaceCode).then(res=>{

          for (let i = 0; i < res.data.content.length; i++) {
            let obj = {};
            if (res.data.content[i].creater == this.interfaceCode) {
              isCreater = true;
            } else {
              isCreater = false;
            }
            obj.contractName = res.data.content[i].contractName;
            obj.contractNum = res.data.content[i].contractNum;
            obj.createTime = res.data.content[i].createTime;
            obj.signers = res.data.content[i].signers;
            obj.contractStatus = res.data.content[i].contractStatus;
            obj.validTime = res.data.content[i].validTime;
            obj.contractType = res.data.content[i].contractType;
            obj.operator = res.data.content[i].operator;
            obj.isCreater = isCreater;
            obj.operation = "";
            switch (obj.contractStatus) {
              case "1":
                obj.contractStatus = "待我签署";
                obj.operation = 1;
                break;
              case "2":
                obj.contractStatus = "待他人签署";
                obj.operation = 2;
                break;
              case "3":
                obj.contractStatus = "已生效";
                obj.operation = 3;
                break;
              default:
                obj.contractStatus = "已截止";
                obj.operation = 4;
                break;
            }
            data[i] = obj;
          }
          this.tableData2 = data;
          this.num = res.data.totalItemNumber;
          this.loading = false;
        }).catch(error=>{

        })
      },
      handleCurrentChange2(val) {
        if (
          this.inputVal1 !== "" ||
          this.filters.column.create_start_date !== "" ||
          this.filters.column.create_end_date !== "" ||
          this.checked !== false
        ) {
          if (this.checked == true) {
            var perpetualValid = "1";
          } else {
            var perpetualValid = "";
          }
          if (this.inquiry == true) {
            var start = this.filters.column.create_start_date;
            var end = this.filters.column.create_end_date;
            if (start == null) {
              start = null;
            } else {
              start = moment(start)
                .format()
                .slice(0, 10);
            }
            if (end == null) {
              end = "";
            } else {
              end = moment(end)
                .format()
                .slice(0, 10);
            }
            let requestVo = {
              'contractName': this.inputVal1,
              'queryTimeStart': start,
              'queryTimeEnd': end,
              'perpetualValid': perpetualValid,
              'pageNo': val,
              'pageSize':this.everyPage,
              'contractStatus': "1",
              'accountCode':this.queryAccountCode,
              'filingNo':this.$store.state.showFilingNo,

            };
            this.getData(requestVo);
          } else {
            let requestVo = {
              'pageNo': val,
              'pageSize':this.everyPage,
              'contractStatus': "1",
              'accountCode':this.queryAccountCode,
              'filingNo':this.$store.state.showFilingNo,
            };
            this.getData(requestVo);
          }
        } else {
          let requestVo = {
            'pageNo': val,
            'pageSize':this.everyPage,
            'contractStatus': "1",
            'accountCode':this.queryAccountCode,
            'filingNo':this.$store.state.showFilingNo,
          };
          this.getData(requestVo);
        }
      },
      handleSizeChange(val) {
        this.everyPage=val;
        this.getData();
      },
      selectParam(value){
        this.queryAccountCode=value
      },
      contractInquiryWaitMe() {
        if (this.checked == true) {
          var perpetualValid = "1";
        } else {
          var perpetualValid = "";
        }
        var start = this.filters.column.create_start_date;
        var end = this.filters.column.create_end_date;
        if (start == null) {
          start = null;
        } else {
          start = moment(start)
            .format()
            .slice(0, 10);
        }
        if (end == null) {
          end = "";
        } else {
          end = moment(end)
            .format()
            .slice(0, 10);
        }
        let requestVo = {
          'contractName': this.inputVal1,
          'queryTimeStart': start,
          'queryTimeEnd': end,
          'perpetualValid': perpetualValid,
          'pageNo': "1",
          'pageSize':this.everyPage,
          'contractStatus': "1",
          'accountCode':this.queryAccountCode,
          'filingNo':this.$store.state.showFilingNo,
        };
        this.getData(requestVo);
        this.$message({
          showClose: true,
          message: "查询成功!",
          type: "success"
        });
        this.inquiry = true;
      },
      rowLockClick(row) {
        if (row.contractType == "0") {
          this.$store.dispatch("contractsInfo", { contractNo: row.contractNum });
          sessionStorage.setItem("contractNo", row.contractNum);
          cookie.set('state','list')
          this.$router.push("/CompanyExb");
        } else {
          this.$store.dispatch("contractsInfo", { contractNo: row.contractNum });
          sessionStorage.setItem("contractNo", row.contractNum);
          cookie.set('state','list')
          this.$router.push("/ContractInfo");
        }
      },
      signClick(row) {
        //待我签署
        if (row.contractType == "0") {
          this.$store.dispatch("contractsInfo", { contractNo: row.contractNum });
          sessionStorage.setItem("contractNo", row.contractNum);
          this.$router.push("/Dimension");
        } else {
          this.$store.dispatch("contractsInfo", { contractNo: row.contractNum });
          sessionStorage.setItem("contractNo", row.contractNum);
          this.$router.push("/Contract");
        }
      },
      downloadClick(row) {
        //下载
        let url = process.env.API_HOST + "v1/contract/" + this.interfaceCode + "/" + row.contractNum;
        let up = document.createElement("a");
        document.body.appendChild(up);
        up.setAttribute("href", url);
        up.click();
      },

      // 查询所有归档文件夹接口
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
      }
    },
    created() {

    }
  };
</script>

<style lang='scss' scoped>
  @import "../../styles/Multiparty/Multiparties.scss";
  @import "../../common/styles/BatchDownLoad.scss";
</style>

<style lang='scss'>
  @import "../../common/styles/dialog.scss";
  .totalImg{
    width: 153px;
    margin: 300px auto;
    height: 89px;
    margin-bottom: 175px;
  }
  .totalImg>img{
    width: 100%;
    height:100%;
  }
</style>

