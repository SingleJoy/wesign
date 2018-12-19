<template>
  <div>
    <div class="ContractList">
      <div class="main">
        <div class="common-top">
          <div class="common-top-tab">
            <div :class="[activeTab?'btn-active':'btn-default']" @click="EnterPer">企业对个人</div>
            <div :class="[activeTab?'btn-default':'btn-active']" style="margin-left: -5px;" @click="EnterEnter">企业对企业</div>
          </div>
        </div>
        <!-- <div class='contract-type'>
				  <el-tabs v-model="activeName" tab-position="40px">
					  <el-tab-pane label="全部文件" name="first">
					  </el-tab-pane>
					  <el-tab-pane label="待我签署" name="second">
						  <inquiry-wait-me></inquiry-wait-me>
					  </el-tab-pane>
						  <el-tab-pane label="待他人签署" name="third">
					  <inquiry-wait-others></inquiry-wait-others>
						  </el-tab-pane>
					  <el-tab-pane label="已生效" name="fourth">
						  <inquiry-into-force></inquiry-into-force>
					  </el-tab-pane>
					  <el-tab-pane label="已截止" name="five">
						  <inquiry-expired></inquiry-expired>
					  </el-tab-pane>
				  </el-tabs>
			  </div> -->
      </div>
    </div>
    <div class='contractTitle' style="text-align: left;">
      <input type="text" id='textInfo' placeholder="如合同名称/签署人" v-model="inputVal" @keyup.enter.native="contractInquiry()" :maxlength = 50>
      <el-select v-model="value" v-if="accountLevel !=2" @change="selectParam(value)" placeholder="请选择账号类型">
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
      >
      </el-checkbox>
      <b class='info' style='font-size: 12px;display: inline-block;margin-left: -18px;'>永久有效</b>
      <el-button type="primary" @click='contractInquiry' style="margin-left:20px;letter-spacing:5px;">搜索</el-button>
      <div class="list-body">
        <div class="totalImg" v-if="num === 0">
          <img src="/static/images/notavailable.png" alt="">
        </div>
        <el-table
          :header-cell-style="getRowClass"
          :data="tableInformation"
          style="width: 100%;
              text-align:center"
          v-loading="loading"
          element-loading-text="拼命加载中"
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
            :show-overflow-tooltip= true >
          </el-table-column>

          <el-table-column
            prop="signers"
            label="签署人"
            width="250"
            :show-overflow-tooltip= true>
          </el-table-column>
          <el-table-column
            prop="createTime"
            clearable=true
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
            width="150">
          </el-table-column>
          <el-table-column
            prop="operation"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="affixClick(scope.row)" type="primary" size="mini" v-if ='scope.row.operation === 1  && accountCode == scope.row.operator'>签&nbsp;&nbsp;署</el-button>
              <el-tooltip content="短信通知签署方" effect="light" placement="right" v-else-if ='scope.row.operation === 2 && scope.row.isCreater  && accountCode == scope.row.operator' >
                <el-button @click="warnClick(scope.row)" type="primary" size="mini">提&nbsp;&nbsp;醒</el-button>
              </el-tooltip>
              <el-button @click="downloadClick(scope.row)" type="primary" size="mini" v-else-if ='scope.row.operation === 3' >下&nbsp;&nbsp;载</el-button>
              <el-button @click="lookClick(scope.row)" type="primary" size="mini" v-else-if ='scope.row.operation === 4 && scope.row.isCreater  && accountCode == scope.row.operator'>延&nbsp;&nbsp;期</el-button>
              <el-button @click="rowlookClick(scope.row)" type="primary" size="mini">详&nbsp;&nbsp;情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 数据表格 end -->
        <div style="position: absolute;margin-top:50px;" v-if="num">
          <el-button type="primary" @click="batchDownload" v-loading.fullscreen.lock="fullscreenLoading">批量下载</el-button>
        </div>
      </div>
    </div>

  </div>
</template>
<style lang="scss" scoped>
  @import "../../common/styles/content.scss";
  @import '../../styles/Multiparty/Multiparties.scss';
</style>

<script>

  export default {
    name: 'ContractList',
    data() {
      return {
        activeTab:1,
        activeName:'first',
        isActive:true,
        contractListType:1,              //合同列表类型：1: B2C  2:B2B ;   0: 小b
        inputVal:'',
        filters: {
          column: {
            create_start_date: null,
            create_end_date: null
          },
        },
        multipleSelection: [],    //全选按钮的数组
        downloadList:[],  //要下载的数组
        fullscreenLoading: false,
      }
    },
    methods:{
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
          this.fullscreenLoading=true;
          let url = '/api/v1.7/contract/'+this.interfaceCode+'/downloadContracts?interfaceCode='+this.interfaceCode+'&contractNoArray='+str;
          let up = document.createElement('a');
          document.body.appendChild(up);
          up.setAttribute('href', url);
          up.click();
          setTimeout(() => {
            this.fullscreenLoading = false;
          }, 1500);
          self.multipleSelection = [];
          this.$refs.multipleTable.clearSelection();
        }
      },
      EnterPer:function () {
        this.activeTab = 1;
        sessionStorage.setItem('listType','1')
      },
      EnterEnter:function () {
        this.activeTab = 0;
        sessionStorage.setItem('listType','0')
      }
    }

  }
</script>


