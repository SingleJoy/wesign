<template>
  <div class="InquiryExpired">
     <div class='contractTitle' style="text-align: left;">
      <input type="text" id='textInfo' placeholder="如合同名称/签署人"  v-model="inputVal4" :maxlength = 50>
      <el-select v-model="value" v-if="isBusiness==1 && accountLevel!=2" @visible-change="getAccount()" @change="selectParam(value)" placeholder="请选择账号类型">
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
          <img src="../../../static/images/notavailable.png" alt="">
        </div>
        <el-table
          :header-cell-style="getRowClass"
          :data="tableInformation"
          style="width: 100%;text-align:center"
          v-loading="loading"
          element-loading-text="拼命加载中"
          v-cloak
          v-else
          >
          <el-table-column
          prop="contractName"
          label="合同名称"
          style="text-align:center"
          width="250">
          </el-table-column>
          <el-table-column
          prop="signers"
          label="签署人"
          width="250">
          </el-table-column>
          <el-table-column
          prop="createTime"
          label="发起时间"
          width="190">
          </el-table-column>
          <el-table-column
          prop="validTime"
          label="截止时间"
          width="140">
          </el-table-column>
          <el-table-column
          prop="contractStatus"
          label="当前状态"
          width="150">
          </el-table-column>
            <el-table-column
          prop="operation"
          label="操作"
          width="190"
          >
          <template slot-scope="scope">
            <el-button @click="affixClick(scope.row)" type="primary" size="mini" v-if ='scope.row.operation === 1  && accountCode == scope.row.operator'>签&nbsp;&nbsp;署</el-button>

            <el-tooltip content="短信通知签署方" effect="light" placement="right" v-else-if ='scope.row.operation === 2 && scope.row.isCreater  && accountCode == scope.row.operator' >
            <el-button @click="warnClick(scope.row)" type="primary" size="mini">提&nbsp;&nbsp;醒</el-button>
            </el-tooltip>

            <el-button @click="downloadClick(scope.row)" type="primary" size="mini" v-else-if ='scope.row.operation === 3' >下&nbsp;&nbsp;载</el-button>
            <el-button @click="lookClick(scope.row)" type="primary" size="mini" v-else-if ='scope.row.operation === 4 && scope.row.isCreater  && accountCode == scope.row.operator' >延&nbsp;&nbsp;期</el-button>
            <el-button @click="rowlookClick(scope.row)" type="primary" size="mini">详&nbsp;&nbsp;情</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
      <div class='pagetion'>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange5"
          :current-page="currentPage4"
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
export default {
    name:'InquiryExpired',
    data() {
        return {
            accountCode:sessionStorage.getItem('accountCode'),
            accountLevel:sessionStorage.getItem('accountLevel'),
            isBusiness:cookie.getJSON('tenant')[1].isBusiness,
            options: [],
            queryAccountCode:'',
            hasQuery:false,
            value:'',
            currentPage4: 1,
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
            }
        }
    },
    methods: {
     getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return 'background:#f5f5f5;font-weight:bold;'
      } else {
        return ''
      }
    },
    getRecord (requestVo) {
    var data =[];
    var isCreater='';
    let currentFaceCode = cookie.getJSON('tenant')[1].interfaceCode;
    let url =  process.env.API_HOST+'v1.4/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode + '/b2bContrants';
      this.$http.get(url, {params: requestVo}).then(function (res) {
        if(res.data.sessionStatus == '0'){
          this.$router.push('/Server')
        } else {
        for (let i = 0; i < res.data.content.length;i++) {
          if(res.data.content[i].creater == currentFaceCode){
            isCreater = true;
          }else{
            isCreater = false;
          }

          var obj = {}
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
        // console.log(this.tableInformation)
        this.num = res.data.totalItemNumber
        this.loading = false

        }
      })
    },
    handleCurrentChange5(val) {
      if ( this.inputVal4 !== ''  || this.filters.column.create_start_date !== '' || this.filters.column.create_end_date !=='' ) {
        if(this.inquiry == true){
          var start = this.filters.column.create_start_date
          var end =   this.filters.column.create_end_date
          if(start == null) {start =null}else{start = moment(start).format().slice(0,10)}
          if(end==null){end=''}else{end = moment(end).format().slice(0,10)}
          var requestVo ={"contractName":this.inputVal4,"queryTimeStart":start,"queryTimeEnd":end,'pageNo':val,'pageSize':'10','contractStatus':'4','accountCode':this.accountCode};
          this.getRecord (requestVo)
        }else{
          var requestVo ={'pageNo':val,'pageSize':'10','contractStatus':'4','accountCode':this.accountCode};
          this.getRecord (requestVo)
        }
      } else {
        var requestVo ={'pageNo':val,'pageSize':'10','contractStatus':'4','accountCode':this.accountCode};
        this.getRecord (requestVo)
      }
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    selectParam(value) {
      this.queryAccountCode = value;
    },
    contractInquiryExpired () {
      var start = this.filters.column.create_start_date
      var end =   this.filters.column.create_end_date
      if(start == null) {start =null}else{start = moment(start).format().slice(0,10)}
      if(end==null){end=''}else{end = moment(end).format().slice(0,10)}
      var requestVo ={"accountCode":this.queryAccountCode?this.queryAccountCode:this.accountCode,"contractName":this.inputVal4,"queryTimeStart":start,"queryTimeEnd":end,'pageNo':'1','pageSize':'10','contractStatus':'4'};
      this.getRecord (requestVo)
      this.inquiry = true
    },
    rowlookClick (row) {
      // console.log(row)
      if(row.contractType == '0'){
        this.$store.dispatch('contractsInfo',{contractNo:row.contractNum})
        sessionStorage.setItem('contractNo', JSON.stringify(row.contractNum))
        sessionStorage.setItem("detailAccountCode",row.operator) //查看详情时二级账户的accountCode
        cookie.set('state','B2')
        this.$router.push('/CompanyExa')
      }else{
        this.$store.dispatch('contractsInfo',{contractNo:row.contractNum})
        sessionStorage.setItem('contractNo', JSON.stringify(row.contractNum))
        sessionStorage.setItem("detailAccountCode",row.operator) //查看详情时二级账户的accountCode
        this.$router.push('/ContractInfo')
      }
    },
    affixClick (row) { //签署
     if(row.contractType == '0'){
          this.$store.dispatch('contractsInfo',{contractNo:row.contractNum})
          sessionStorage.setItem('contractNo', JSON.stringify(row.contractNum))
          this.$router.push('/Dimension')
        }else{
          this.$store.dispatch('contractsInfo',{contractNo:row.contractNum})
          sessionStorage.setItem('contractNo', JSON.stringify(row.contractNum))
          this.$router.push('/Contract')
        }
    },
    warnClick (row) { //提醒

      this.$http.get(process.env.API_HOST+'v1/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode + '/contract/'+row.contractNum+'/remind',{params:{
          'contractType':0,
          'remindType':0
        }}).then(function (res) {
        if(res.data.sessionStatus == '0'){
          this.$router.push('/Server')
        } else {
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
       }
      })
    },
    downloadClick (row) { //下载
      var url = process.env.API_HOST+'v1/contract/'+ cookie.getJSON('tenant')[1].interfaceCode + '/'+ row.contractNum;
      var up = document.createElement('a');
      document.body.appendChild(up)
      up.setAttribute('href',url);
      up.click()
    },
    lookClick(row){  //延期
      if(row.contractType == '0'){
        sessionStorage.setItem('contractNo', JSON.stringify(row.contractNum))
        cookie.set('state','E1')
        this.$router.push('/CompanyExc')
      }else{
        this.$store.dispatch('contractsInfo',{contractNo:row.contractNum})
        sessionStorage.setItem('contractNo', JSON.stringify(row.contractNum))
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
    }
  },
   created() {
    var requestVo ={'pageNo':'1','pageSize':'10','contractStatus':'4','accountCode':this.accountCode};
    this.getRecord (requestVo);
  }
}
</script>

<style lange='css' scoped>
@import '../../styles/Multiparty/Multiparties.scss'
</style>

<style>
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
