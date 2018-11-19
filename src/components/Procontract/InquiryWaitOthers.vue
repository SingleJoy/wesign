<template>
	<div class="InquiryWaitOthers">
		<div class='contractTitle' style="border:none;text-align:left;padding-left:20px;">
			<input type="text" id='textInfo' placeholder="如合同名称/签署人"  v-model="inputVal2" :maxlength = 50>
			 <el-select v-model="value" v-if="isBusiness==1&& accountLevel!=2"  @change="selectParam(value)" placeholder="请选择账号类型">
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
				v-model="checked">
			</el-checkbox>
			<b class='info' style='font-size: 12px;display: inline-block;margin-left: -18px;'>永久有效</b>
			<el-button type="primary" @click='contractInquiryWaitOthers' style='margin-left:20px;letter-spacing:5px;'>搜索</el-button>
		</div>
		<div class="list-body">
			<div class='table'>
				<div class="waitOtherImg" v-if="num === 0">
					<img src="../../../static/images/notavailable.png" alt="">
				</div>
				<el-table
					:data="tableData2"
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
					width="200">
					</el-table-column>
					<el-table-column
					prop="validTime"
					label="截止时间"
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
					<el-button @click="signClick(scope.row)" type="primary" size="mini" v-if ='scope.row.operation === 1 '>签&nbsp;&nbsp;署</el-button>
					<el-button @click="downloadClick(scope.row)" type="primary" size="mini" v-else-if ='scope.row.operation === 3' >下&nbsp;&nbsp;载</el-button>
					<el-button @click="rowLockClick(scope.row)" type="primary" size="mini">详&nbsp;&nbsp;情</el-button>
					</template>
					</el-table-column>
				</el-table>
			</div>
			<div class='pagetion'>
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange3"
					:current-page="currentPage2"
					:page-size="10"
					layout="total,prev, pager, next, jumper"
					:total= Number(num)>
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
import cookie from "@/common/js/getTenant";
import moment from "moment";
import server from "@/api/url";
export default {
  name: "InquiryWaitMe",
  data() {
    return {
        accountCode:sessionStorage.getItem('accountCode'),
        accountLevel:sessionStorage.getItem('accountLevel'),
        isBusiness:cookie.getJSON('tenant')[1].isBusiness,
        queryAccountCode:"",
        value:'',
        options:[],
        currentPage2: 1,
        value8: "",
        value9: "",
        tableData2: [],
        num: "",
        loading: true,
        inputVal2: "",
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
        }
    };
  },
  methods: {
    getData(requestVo) {
      var data = [];
      // let url = process.env.API_HOST+'v1/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode + '/contracts';
      let url =
        process.env.API_HOST +
        "v1.4/tenant/" +
        cookie.getJSON("tenant")[1].interfaceCode +
        "/b2bContrants";
      this.$http.get(url, { params: requestVo }).then(function(res) {
        if (res.data.sessionStatus == "0") {
          this.$router.push("/Server");
        } else {
          for (let i = 0; i < res.data.content.length; i++) {
            var obj = {};
            obj.contractName = res.data.content[i].contractName;
            obj.contractNum = res.data.content[i].contractNum;
            obj.createTime = res.data.content[i].createTime;
            obj.signers = res.data.content[i].signers;
            obj.contractStatus = res.data.content[i].contractStatus;
            obj.validTime = res.data.content[i].validTime;
            obj.contractType = res.data.content[i].contractType;
            obj.operator = res.data.content[i].operator;
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
        }
      });
    },
    handleCurrentChange3(val) {
      if (
        this.inputVal2 !== "" ||
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
          var requestVo = {
            contractName: this.inputVal2,
            queryTimeStart: start,
            queryTimeEnd: end,
            perpetualValid: perpetualValid,
            pageNo: val,
            pageSize: "10",
            contractStatus: "2",
          };
          this.getData(requestVo);
        } else {
          var requestVo = { pageNo: val, pageSize: "10", contractStatus: "2"};
          this.getData(requestVo);
        }
      } else {
        var requestVo = { pageNo: val, pageSize: "10", contractStatus: "2"};
        this.getData(requestVo);
      }
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    selectParam(value){
      this.queryAccountCode=value
    },
    contractInquiryWaitOthers() {
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
      var requestVo = {
        contractName: this.inputVal2,
        queryTimeStart: start,
        queryTimeEnd: end,
        perpetualValid: perpetualValid,
        pageNo: "1",
        pageSize: "10",
        contractStatus: "2",
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
      //签署
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
      var url =
        process.env.API_HOST +
        "v1/contract/" +
        cookie.getJSON("tenant")[1].interfaceCode +
        "/" +
        row.contractNum;
      var up = document.createElement("a");
      document.body.appendChild(up);
      up.setAttribute("href", url);
      up.click();
    }
    // getStartTime(){ //日期
    //   var d = this.value8;
    //   this.formStartTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() +' '+'00:00:00';
    // },
    // /*得到搜索条件的结束时间*/
    // getEndTime(){
    //   var d = this.value9;
    //   this.formEndTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() +' '+'23:59:59';
    // },
  },
  created() {
    var requestVo = { pageNo: "1", pageSize: "10", contractStatus: "2"};
    this.getData(requestVo);
  }
};
</script>

<style lange='css' scoped>
@import "../../styles/Multiparty/Multiparties.scss";
</style>

<style>
.waitOtherImg {
  width: 153px;
  margin: 300px auto;
  height: 89px;
  margin-bottom: 175px;
}
.waitOtherImg > img {
  width: 100%;
  height: 100%;
}
</style>
