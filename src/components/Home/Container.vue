<template>
  <div class='Container' style="margin-top: 20px;">
    <div class='main' style="background-color: #fff;">
      <div class='main_left'>
        <div class='upload' style='border:none;'>
          <div style='cursor:pointer;'  @click='choice' class="el-upload__text">

            <div class="content-upload">
               <h3>上传发起合同</h3>
              <div class="content-body">
                 <div class="circle">+</div>
                 <div class="tips">
                    <p>上传发起</p><br/>
                     <span>点击上传文件到此处</span>
                 </div>
                <div class="footer">
                  <span>文件支持.docx / pdf/ .txt / .doc文件，文件大小不超过5M</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div  class="main_left_down">
          <p class='context1'>
            模板发起合同
          </p>
          <div class='icons'>
            <div  class='single' v-if='count>0'>
              <div v-for="(item,index) in arr" :key="index" >
                <div class='one' v-on:click="jumper(item,index)" style='border: 1px solid #ccc;margin-left: 5px;'>
                  <img src="../../../static/images/Container/icons_1.png" alt="">
                  <span style='color:#22a7ea'>{{item.name}}</span>
                </div>
              </div>
              <div class='two'  v-if='arr.length>2' @click='otherTemplate'>
                <span>选择其他>></span>
              </div>
            </div>
            <div class='more' v-else>
              <div class='more1'>
                <h3><img src="../../../static/images/single.png" alt=""><span @click='more'>了解模板>></span></h3>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class='main_right'>
        <p style='clear:both;text-align:left;'>合同概括</p>
        <div class='right1' @click="animated">
          <span>{{waitMe}}</span>
          <span>待我签署</span>
        </div>
        <div class='right2' @click='wait'>
          <span>{{waitOther}}</span>
          <span>待他人签署</span>
        </div>
        <div class='right3' @click='takeEff'>
          <span>{{takeEffect}}</span>
          <span>已生效</span>
        </div>
        <div class='right4'  @click='end'>
          <span>{{deadline}}</span>
          <span>已截止</span>
        </div>
      </div>
      <div class='main_table' style="padding-bottom:20px">

        <div class='title' style="padding: 0;">
          <h1 style="padding-left: 15px;"><img src="../../../static/images/Container/title.png" alt=""></h1>
          <a href="javascript:void(0);" @click='jump'>查看更多>></a>
        </div>

        <div class='table' style="clear: both;width: ">
          <el-table
            :header-cell-style="getRowClass"
            v-loading="loading"
            element-loading-text="拼命加载中"
            :data="tableData"
            style="width: 100%;text-align:center"
            :row-class-name="tableRowClassName"
            v-cloak
          >
            <el-table-column
              prop="contractName"
              label="合同名称"
              width="250"
              style="text-align:center"
              :show-overflow-tooltip='true'
            >
            </el-table-column>
            <el-table-column
              prop="signers"
              label="签署人"
              width="210"
              :show-overflow-tooltip='true'
            >
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="发起时间"
              width="170">
            </el-table-column>
            <el-table-column
              prop="validTime"
              label="截止时间"
              width="170">
            </el-table-column>
            <el-table-column
              prop="contractStatus"
              label="当前状态"
              width="160">
            </el-table-column>
            <el-table-column
              prop="operation"
              label="操作"
              width="200"
            >
              <template slot-scope="scope">
                <el-button @click="signClick(scope.row)" type="primary" size="mini" v-if ='scope.row.operation === 1 '>签&nbsp;&nbsp;署</el-button>
                <el-tooltip content="短信通知签署方" effect="light" placement="right" v-else-if ='scope.row.operation === 2 && scope.row.flag == true' >
                  <el-button @click="remindClick(scope.row)" type="primary" size="mini">提&nbsp;&nbsp;醒</el-button>
                </el-tooltip>
                <el-button @click="downloadClick(scope.row)" type="primary" size="mini" v-else-if ='scope.row.operation === 3' >下&nbsp;&nbsp;载 </el-button>
                <el-button @click="seeClick(scope.row)" type="primary" size="mini" v-else-if='scope.row.flag == true' >延&nbsp;&nbsp;期</el-button>
                <el-button @click="rowLockClick(scope.row)" type="primary" size="mini">详&nbsp;&nbsp;情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class='dialogbg' v-show="popupContainer">

      <div class='upload-dilog'>
        <a  href="javascript:void(0);" id="upload-dilog-close" class="upload-dilog-close" @click="shut">X</a>
        <div style="color:#22a7ea;text-align:center;font-size:16px;margin-top:20px;font-weight:bold;font-family: 微软雅黑;">请选择对手方身份</div>
        <div class='leftDilog'>
          <el-upload
            ref='upload'
            class="upload-demo"
            :action='urlloadUrl()'
            :before-upload="handleChange"
            :on-success="fileSuccess"
            :show-file-list= false
            :limit=1
            accept='.docx,.pdf,.doc,.txt'
            element-loading-text="拼命上传中"
            element-loading-background="rgba(0, 0, 0, 0.5)"
          >
            <img src="../../../static/images/Login/geren.png" alt="">
          </el-upload>
        </div>
        <div class='rightDilog'>
          <el-upload
            ref='upload'
            class="upload-demo"
            :action='uploadUrl()'
            :data=Type
            :before-upload="handleChange"
            :on-success="fileSuccess1"
            :show-file-list= false
            :limit=1
            accept='.docx,.pdf,.doc,.txt'
            element-loading-text="拼命上传中"
            element-loading-background="rgba(0, 0, 0, 0.5)"
          >
            <img src="../../../static/images/Login/qiye.png" alt="">
          </el-upload>
          <p style='clear:both;color:red; text-align:center; margin-left:-288px;padding:10px;'><i class='el-icon-warning'></i>请先选择对手身份个人或者企业</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapActions, mapState } from "vuex";
  import cookie from "@/common/js/getTenant";

  export default {
    name: "Container",
    methods: {
      getRowClass({ row, column, rowIndex, columnIndex }) {
        if (rowIndex == 0) {
          return "background:#f5f5f5;text-align:center;font-weight:bold;";
        } else {
          return "";
        }
      },
      tableRowClassName({ row, rowIndex }) {
        if (rowIndex === 1) {
          return "warning-row";
        } else if (rowIndex === 3) {
          return "success-row";
        }
        return "";
      },
      otherTemplate() {
        this.$store.dispatch('tabIndex',{tabIndex:2});  //导航高亮
        this.$router.push("/Multiparty");
      },
      jumper(item, index) {
        if (item.templateSpecies == "batch") {
          this.$store.dispatch("template", {
            templateName: item.name,
            templateNo: item.templateNo
          });

          this.$store.dispatch("templateType", {templateGenre: item.templateSpecificType});
          sessionStorage.setItem("templateName", JSON.stringify(item.name));
          sessionStorage.setItem("templateNo", JSON.stringify(item.templateNo));
          sessionStorage.setItem( "templateGenre", JSON.stringify(item.templateSpecificType));
          // console.log(this.$store.state.templateGenre,'fillidcardreference')
          this.$router.push("/batchSetting");
        } else {
          this.$store.dispatch("template", {
            templateName: item.name,
            templateNo: item.templateNo
          });
          sessionStorage.setItem("templateName", JSON.stringify(item.name));
          sessionStorage.setItem("templateNo", JSON.stringify(item.templateNo));
          this.$router.push("/Fillinformation");
        }
      },
      animated() {
        //待我签署
        this.$store.dispatch('tabIndex',{tabIndex:1});  //导航高亮
        sessionStorage.setItem("second", "second");
        this.$router.push("Mycontract");
      },
      wait() {
        //待他人签署
         this.$store.dispatch('tabIndex',{tabIndex:1});  //导航高亮
        sessionStorage.setItem("second", "third");
        this.$router.push("Mycontract");
      },
      takeEff() {
        //已生效
         this.$store.dispatch('tabIndex',{tabIndex:1});  //导航高亮
        sessionStorage.setItem("second", "fourth");
        this.$router.push("Mycontract");
      },
      end() {
        //已截止
        this.$store.dispatch('tabIndex',{tabIndex:1});  //导航高亮
        sessionStorage.setItem("second", "five");
        this.$router.push("Mycontract");
      },
      signClick(row) {
        //签署
        if (row.contractType == "0") {
          this.$store.dispatch("contractsInfo", { contractNo: row.contractNum });
          sessionStorage.setItem("contractNo", JSON.stringify(row.contractNum));
          this.$router.push("/Dimension");
        } else {
          this.$store.dispatch("contractsInfo", { contractNo: row.contractNum });
          sessionStorage.setItem("contractNo", JSON.stringify(row.contractNum));
          this.$router.push("/Contract");
        }
      },
      remindClick(row) {
        //提醒
        var remindParam={
          contractType:row.contractType==0?0:1
        };
        this.$http.get(process.env.API_HOST + "v1/tenant/" + cookie.getJSON("tenant")[1].interfaceCode + "/contract/" + row.contractNum +"/remind",{params:remindParam}).then(function(res) {
          var resultCode = res.data.resultCode;
          var resultMessage = res.data.resultMessage;
          if (resultCode === "0") {
            this.$message({
              showClose: true,
              message: resultMessage,
              type: "success"
            });
          } else if (resultCode === "2") {
            this.$message({
              showClose: true,
              message: resultMessage,
              type: "success"
            });
          } else {
            this.$message({
              showClose: true,
              message: resultMessage,
              type: "error"
            });
          }
        });
      },
      urlloadUrl() {
        // return `${this.baseURL.BASE_URL}/v1/tenant/${
        //   this.interfaceCode
        // }/contractfile`;
        return `https://www.zqsign.com/restapi/wesign/v1/tenant/${this.interfaceCode}/contractfile`
      },
      uploadUrl() {
        // return `${this.baseURL.BASE_URL}/v1.4/tenant/${
        //   this.interfaceCode
        // }/contractfile`;
        return `https://www.zqsign.com/restapi/wesign/v1.4/tenant/${this.interfaceCode}/contractfile`
      },
      seeClick(row) {
        //延期
        if (row.contractType == "0") {
          sessionStorage.setItem("contractNo", JSON.stringify(row.contractNum));
          cookie.set("state", "E");
          this.$router.push("/CompanyExc");
        } else {
          this.$store.dispatch("contractsInfo", { contractNo: row.contractNum });
          sessionStorage.setItem("contractNo", JSON.stringify(row.contractNum));
          cookie.set("state", "D");
          this.$router.push("/ContractDelay");
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
      },
      choice() {
        this.popupContainer = !this.popupContainer;
      },
      shut() {
        this.popupContainer = !this.popupContainer;
      },
      jump() {
        this.$store.dispatch('tabIndex',{tabIndex:1});  //导航高亮
        this.$router.push("/Mycontract");
      },
      more() {
        this.$store.dispatch('tabIndex',{tabIndex:2});  //导航高亮
        this.$router.push("/More");
      },
      rowLockClick(row) {
        //查看
        if (row.contractType == "0") {
          this.$store.dispatch("contractsInfo", { contractNo: row.contractNum });
          sessionStorage.setItem("contractNo", JSON.stringify(row.contractNum));
          cookie.set("state", "A");
          this.$router.push("/CompanyExa");//企业对企业
        } else {
          this.$store.dispatch("contractsInfo", { contractNo: row.contractNum });
          sessionStorage.setItem("contractNo", JSON.stringify(row.contractNum));
          cookie.set("state", "B");
          this.$router.push("/ContractInfo");//企业对个人
        }
      },
      handleChange(name) {
        this.$loading.show();
        var max_size = 5; // 5M
        var fileContName = name.name.replace(/\s+/g, "");
        var reg = /[.](docx|pdf|doc|txt|DOCX|PDF|DOC|TXT)$/;
        if (!reg.test(fileContName)) {
          this.$message({
            showClose: true,
            message: "只能传pdf,doc,txt,docx格式的文件",
            type: "error"
          });
          this.$refs.upload.clearFiles();
          this.uploadFile = false;
          this.$loading.hide();
          return false;
        } else if (name.size > max_size * 1024 * 1024) {
          this.$message({
            showClose: true,
            message: "文件大小超过限制",
            type: "error"
          });
          this.$refs.upload.clearFiles();
          this.uploadFile = false;
          this.$loading.hide();
          return false;
        } else if (fileContName.length > 50) {
          this.$message({
            showClose: true,
            message: "上传文件名称不得超过50字符！",
            type: "error"
          });
          this.$refs.upload.clearFiles();
          this.uploadFile = false;
          this.$loading.hide();
          return false;
        } else {
          this.loading2 = true;
          this.uploadFile = true;
        }
      },
      fileSuccess(name, file, fileList) {
        //上传文件，传参数 contractName contractNo 渲染 Contractsigning.vue
        this.$loading.hide();
        var contractName = file.name.replace(/\s+/g, "");
        var contractNo = file.response.contractNo;
        var resultCode = file.response.resultCode;
        if (this.uploadFile == true) {
          this.$message({
            showClose: true,
            message: "上传成功",
            type: "success"
          });
          var index1 = contractName.lastIndexOf(".");
          var suffix = contractName.slice(0, index1);
          this.$store.dispatch("fileSuccess1", {
            contractName: suffix,
            contractNo: contractNo
          });
          sessionStorage.setItem("contractName", JSON.stringify(suffix));
          sessionStorage.setItem("contractNo", JSON.stringify(contractNo));
          this.$router.push("/Contractsigning");
        }
      },
      fileSuccess1(name, file, fileList) {
        //上传文件，传参数 contractName contractNo 渲染 Contractsigning.vue
        this.$loading.hide();
        var contractName = file.name.replace(/\s+/g, "");
        var contractNo = file.response.contractNo;
        var resultCode = file.response.resultCode;
        if (this.uploadFile == true) {
          this.$message({
            showClose: true,
            message: "上传成功",
            type: "success"
          });
          var index1 = contractName.lastIndexOf(".");
          var suffix = contractName.slice(0, index1);
          this.$store.dispatch("fileSuccess1", {
            contractName: suffix,
            contractNo: contractNo
          });
          sessionStorage.setItem("contractName", JSON.stringify(suffix));
          sessionStorage.setItem("contractNo", JSON.stringify(contractNo));
          this.$router.push("/Signature"); //更改路由地址
        }
      }
    },
    data() {
      return {
        popupContainer: false,
        tableData: [],
        download: "",
        loading: true,
        loading2: false,
        count: "",
        waitMe: "",
        waitOther: "",
        takeEffect: "",
        deadline: "",
        arr: [],
        uploadFile: true,
        interfaceCode: cookie.getJSON("tenant")?cookie.getJSON("tenant")[1].interfaceCode:'',
        Type: { contractType: "0" }
      };
    },
    created() {
      var data = [];

      var flag = "";
      var isCreater = "";
      var requestVo = { pageNo: "1", pageSize: "7", contractStatus: "0" };
      let url =
        process.env.API_HOST +
        "v1.4/tenant/" +
        cookie.getJSON("tenant")[1].interfaceCode +
        "/homePageContractLists";
      let currentFaceCode = cookie.getJSON("tenant")[1].interfaceCode;
      this.$http.get(url, { params: requestVo }).then(function(res) {
        if (res.data.sessionStatus == "0") {
          this.$router.push("/Server");
        } else {
          for (let i = 0; i < res.data.content.length; i++) {
            if (res.data.content[i].creater == currentFaceCode) {
              flag = true;
            } else {
              flag = false;
            }
            res.data.content[i].flag = flag;
            var obj = {};
            obj.contractName = res.data.content[i].contractName;
            obj.contractNum = res.data.content[i].contractNum;
            obj.createTime = res.data.content[i].createTime;
            obj.signers = res.data.content[i].signers;
            obj.contractStatus = res.data.content[i].contractStatus;
            obj.validTime = res.data.content[i].validTime;
            obj.contractType = res.data.content[i].contractType;
            obj.flag = res.data.content[i].flag;
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
            }
            data[i] = obj;
          }
          this.tableData = data;
          this.loading = false;
        }
      });
      this.$http
        .get(
          process.env.API_HOST +
          "v1/tenant/" +
          cookie.getJSON("tenant")[1].interfaceCode +
          "/waitForMeSign"
        )
        .then(function(res) {
          this.waitMe = res.data.count;
        });
      this.$http
        .get(
          process.env.API_HOST +
          "v1/tenant/" +
          cookie.getJSON("tenant")[1].interfaceCode +
          "/waitForOtherSign"
        )
        .then(function(res) {
          this.waitOther = res.data.count;
        });
      this.$http
        .get(
          process.env.API_HOST +
          "v1/tenant/" +
          cookie.getJSON("tenant")[1].interfaceCode +
          "/takeEffect"
        )
        .then(function(res) {
          this.takeEffect = res.data.count;
        });
      this.$http
        .get(
          process.env.API_HOST +
          "v1/tenant/" +
          cookie.getJSON("tenant")[1].interfaceCode +
          "/deadline"
        )
        .then(function(res) {
          this.deadline = res.data.count;
        });
      this.$http.get(process.env.API_HOST + "v1/tenant/"+cookie.getJSON("tenant")[1].interfaceCode + "/templateList"
        )
        .then(function(res) {
          if (res.data.sessionStatus == "0") {
            this.$router.push("/Server");
          } else {
            this.arr = res.data.slice(0, 3);
            this.count = res.data.length;
          }
        });
    },
    mounted() {
      sessionStorage.removeItem("type");
      sessionStorage.removeItem("contractNo");
    }
  };
</script>
<style lang="css" scoped>
  @import "../../styles/Container.css";
  .right1:hover,
  .right2:hover,
  .right3:hover,
  .right4:hover {
    -webkit-transition: all 0.5s ease-in;
    -moz-transition: all 0.5s ease-in;
    -ms-transition: all 0.5s ease-in;
    -o-transition: all 0.5s ease-in;
    -webkit-transform: scale(1.08);
    -ms-transform: scale(1.08);
    -o-transform: scale(1.08);
    -moz-transform: scale(1.08);
  }

  .view {
    width: 100%;
    height: 100%;
    background: #000;
    z-index: 4000;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 0;
    top: 0;
  }
  .dialogbg {
    background: #000;
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 1080px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1999;
  }
  .el-upload-dragger {
    width: 680px !important;
    height: 154px !important;

  }
  .el-table tr:nth-child(odd) {
    background: #fff;
  }
  .el-table tr:nth-child(even) {
    background: #f5f5f5;
  }
  .el-table th>.cell {
    text-align: center;
  }
  .has-gutter tr th{
    text-align: center !important;
  }

  .el-tabs__nav-scroll {
    font-size: 16px;
    color: #333;
  }
  #tab-first,
  #tab-second,
  #tab-third,
  #tab-fourth,
  #tab-five {
    font-size: 16px;
  }
  .el-table th > .cell {
    text-align: center;
  }

  .el-table__row .cell {
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
  }

  #title {
    text-align: left !important;
  }
  .one:hover {
    border: 1px solid #22a7ea;
  }
  .two:hover {
    border: 1px solid #22a7ea;
  }
  #close {
    width: 30px;
    height: 30px;
    border-raduis: 50%;
    text-align: center;
    line-height: 30px;
    display: block;
    background: #fff;
    color: #000;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    width:100%;
    height:100%;
  }
  .el-button--primary:focus{
    background: #eee;
    border-color: #95989d;
    color: #333;
  }
</style>
