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
                  <span>文件支持.docx / pdf / .txt / .doc文件，文件大小不超过5M</span>
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
                  <img src="/static/images/Container/home-icon-v1.6.png" alt="">
                  <span style='color:#4091fb'>{{item.name}}</span>
                </div>
              </div>
              <div class='two'  v-if='arr.length>2' @click='otherTemplate'>
                <span>选择其他>></span>
              </div>
            </div>
            <div class='more' v-else>
              <div class='more1'>
                <h3><img src="/static/images/single.png" alt=""><span @click='more'>了解模板>></span></h3>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class='main_right'>
        <p style='clear:both;text-align:left;'>合同概括</p>
        <div class='right1' @click="animated">
          <span>{{waitForMeSign}}</span>
          <span>待我签署</span>
        </div>
        <div class='right2' @click='wait'>
          <span>{{waitForOtherSign}}</span>
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

        <div class="table-left" style="padding: 0;">
          <div class="title">近期合同</div>
          <a href="javascript:void(0);" @click='jump'>查看更多>></a>
        </div>

        <div class='table' style="clear: both;">
          <el-table
            :header-cell-style="getRowClass"
            v-loading="loading"
            element-loading-text="拼命加载中"
            :data="tableData"
            style="width: 100%;text-align:center"
            :row-class-name="tableRowClassName"
            v-cloak
            @selection-change="handleSelectionChange"
            ref="multipleTable"
          >
            <el-table-column
              label="合同名称"
              width="260"
              style="text-align:center"
              :show-overflow-tooltip='true'
            >
              <template slot-scope="scope">
                <img  class="contract-sign" v-if="scope.row.contractType==0" src="/static/images/Login/tocompany.png"/>
                <img  class="contract-sign" v-else src="/static/images/Login/topersonal.png" />
                <span>{{ scope.row.contractName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="signers"
              label="签署人"
              width="250"
              :show-overflow-tooltip='true'
            >
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
              width="150">
            </el-table-column>
            <el-table-column
              prop="operation"
              label="操作"
              width="200"
            >
              <template slot-scope="scope">
                <el-button @click="signClick(scope.row)" type="primary" size="mini" v-if ='scope.row.operation === 1 &&(scope.row.flag?accountCode == scope.row.operator:true)'>签&nbsp;&nbsp;署</el-button>
                <el-tooltip content="短信通知签署方" effect="light" placement="right" v-else-if ='scope.row.operation === 2 && scope.row.flag == true && accountCode == scope.row.operator'>
                  <el-button @click="remindClick(scope.row)" type="primary" size="mini">提&nbsp;&nbsp;醒</el-button>
                </el-tooltip>
                <el-button @click="downloadClick(scope.row)" type="primary" size="mini" v-else-if ='scope.row.operation === 3' >下&nbsp;&nbsp;载 </el-button>
                <el-button @click="seeClick(scope.row)" type="primary" size="mini" v-else-if='scope.row.flag == true && accountCode == scope.row.operator'>延&nbsp;&nbsp;期</el-button>
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
        <div style="color:#4091fb;text-align:center;font-size:16px;margin-top:20px;font-weight:bold;font-family: 微软雅黑;">请选择对手方身份</div>
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
            <img src="/static/images/Login/v1.6-geren.png" alt="">
          </el-upload>
        </div>
        <div class='rightDilog'>
          <el-upload
            ref='upload'
            class="upload-demo"
            :action='uploadUrl()'
            :data=Type
            :before-upload="handleChange1"
            :on-success="fileSuccess1"
            :show-file-list= false
            :limit=1
            accept='.docx,.pdf,.doc,.txt'
            element-loading-text="拼命上传中"
            element-loading-background="rgba(0, 0, 0, 0.5)"
          >
            <img src="/static/images/Login/v1.6-qiye.png" alt="">
          </el-upload>
          <p style='clear:both;color:red; text-align:center; margin-left:-288px;padding:10px;'><i class='el-icon-warning'></i>请先选择对手身份个人或者企业</p>
        </div>
      </div>
    </div>
    <div class='dialogbg' v-show="welcomeMessage">
      <div class="upload-warn">
        <a  href="javascript:void(0);"  class="close-warn" @click="shutAuthority">X</a>
        <!--<p>{{contractNum}}</p>-->
        <div class="contract-num">
          <p class="b2b">{{b2bNum}}</p>
          <p class="b2c">{{b2cNum}}</p>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import { mapActions, mapState } from "vuex";
  import cookie from "@/common/js/getTenant";
  import server from "@/api/url";
  import {templateList,remind,homePageContractLists} from "@/api/home"
  import {downloadContracts} from "@/api/common"

  export default {
    name: "Container",
    data() {
      return {
        baseURL:this.baseURL.BASE_URL,
        popupContainer: false,
        tableData: [],
        download: "",
        loading: true,
        loading2: false,
        count: "",
        waitForMeSign: "",
        waitForOtherSign: "",
        takeEffect: "",
        deadline: "",
        arr: [],
        uploadFile: true,
        clickup:false,
        interfaceCode: cookie.getJSON("tenant")?cookie.getJSON("tenant")[1].interfaceCode:'',
        isBusiness: cookie.getJSON("tenant")?cookie.getJSON("tenant")[1].isBusiness:'',
        accountCode:sessionStorage.getItem('accountCode'),
        Type: { contractType: "0" },
        welcomeMessage:true, //欢迎信息
        contractNum:cookie.getJSON("tenant")[1].contractNum="null"?10:cookie.getJSON("tenant")[1].contractNum,    //合同剩余次数contractNum
        b2bNum:'',
        b2cNum:'',
        num:'',
        accountLevel:sessionStorage.getItem("accountLevel"),     //账户类型 1是一级账号 2是二级账号
      };
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

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
        //查询合同剩余次数
        this.getContractNum();

         if(this.b2cNum<=0){

           if(this.accountLevel==1){
             this.$confirm(
               <div class="warn-num ">
                 <p class="title" style="font-size:16px;text-align:center;">对不起，对个人合同份数已用尽!</p>
                 <div class="customer-service"></div>
               </div>,'提示', { confirmButtonText: '去购买',showCancelButton:'取消'}).then(()=>{
                 this.$router.push('/PackagePurchase')
             })
           }else{
             this.$alert('对不起，对个人合同份数已用尽!', '提示', {
               confirmButtonText: '取消',
             });
             return false
           }

          } else{
            if(item.templateSpecies == "batch") {
               this.$store.dispatch("template", {
                 templateName: item.name,
                 templateNo: item.templateNo
           });
           this.$store.dispatch("templateType", {templateGenre: item.templateSpecificType});
           sessionStorage.setItem("templateName",item.name);
           sessionStorage.setItem("templateNo", item.templateNo);
           sessionStorage.setItem( "templateGenre", item.templateSpecificType);
           if(this.b2cNum<=0){
             return false
           }
           this.$router.push("/batchSetting");
         } else {
              this.$store.dispatch("template", {
                templateName: item.name,
                templateNo: item.templateNo
              });
           sessionStorage.setItem("templateName", item.name);
           sessionStorage.setItem("templateNo", item.templateNo);
              if(this.b2cNum<=0){
                return false
              }
           this.$router.push("/Fillinformation");
         }
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
          sessionStorage.setItem("contractNo", row.contractNum);
          this.$router.push("/Dimension");
        } else {
          this.$store.dispatch("contractsInfo", { contractNo: row.contractNum });
          sessionStorage.setItem("contractNo", row.contractNum);
          this.$router.push("/Contract");
        }
      },
      remindClick(row) {
        //提醒
        let remindParam={
          contractType:row.contractType==0?0:1
        };
        remind(remindParam,this.interfaceCode,row.contractNum).then(res=>{
          let resultCode = res.data.resultCode;
          let resultMessage = res.data.resultMessage;
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
        }).catch(error=>{

        })
      },
      urlloadUrl() {
        return `${this.baseURL}/restapi/wesign/v1/tenant/${this.interfaceCode}/contractfile?accountCode=${this.accountCode}`
      },
      uploadUrl() {
        return `${this.baseURL}/restapi/wesign/v1.4/tenant/${this.interfaceCode}/contractfile?accountCode=${this.accountCode}`
      },
      seeClick(row) {
        //延期
        if (row.contractType == "0") {
          sessionStorage.setItem("contractNo", row.contractNum);
          cookie.set("state", "Home");
          this.$router.push("/CompanyExc");
        } else {
          this.$store.dispatch("contractsInfo", { contractNo: row.contractNum });
          sessionStorage.setItem("contractNo", row.contractNum);
          cookie.set("state", "Home");
          this.$router.push("/ContractDelay");
        }
      },
      //单次下载
      downloadClick(row) {
        //下载
        let url = process.env.API_HOST + "v1/contract/" + this.interfaceCode + "/" + row.contractNum;
        let up = document.createElement("a");
        document.body.appendChild(up);
        up.setAttribute("href", url);
        up.click();
      },

      //合同剩余发起次数
      getContractNum(){
        let param={
          t:Math.random()
        }
        server.authorityUpload(param,this.interfaceCode).then(res=>{
          if(res.data.resultCode == 1){
            this.b2bNum = res.data.data.b2bNum;
            this.b2cNum = res.data.data.b2cNum;

          }else{
            this.$message({
              showClose: true,
              message: res.data.resultMessage,
              type: "error"
            });
          }
        }).catch(error=>{

        })
      },
      choice() {

        if(cookie.getJSON('tenant')[1].createContractRole== 1){
          this.$alert('您暂无上传发起权限','提示', {
            confirmButtonText: '确定'
          })
        }else{
          this.popupContainer = !this.popupContainer;

        }
      },
      shut() {
        this.popupContainer = !this.popupContainer;
      },
      shutAuthority(){
        this.welcomeMessage = !this.welcomeMessage;
        sessionStorage.setItem('welcomePage',true)
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
          sessionStorage.setItem("contractNo", row.contractNum);
          sessionStorage.setItem("detailAccountCode",row.operator) //查看详情时二级账户的accountCode
          cookie.set("state", "Home");
          this.$router.push("/CompanyExa");//企业对企业
        } else {
          this.$store.dispatch("contractsInfo", { contractNo: row.contractNum });
          sessionStorage.setItem("contractNo", row.contractNum);
          sessionStorage.setItem("detailAccountCode",row.operator) //查看详情时二级账户的accountCode
          cookie.set("state", "Home");
          this.$router.push("/ContractInfo");//企业对个人
        }
        this.$store.dispatch('tabIndex',{tabIndex:0});
      },
      handleChange(name) {
        this.$loading.show();
        this.getContractNum();
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
        }
        else if (name.size > max_size * 1024 * 1024) {
          this.$message({
            showClose: true,
            message: "文件大小超过限制",
            type: "error"
          });
          this.$refs.upload.clearFiles();
          this.uploadFile = false;
          this.$loading.hide();
          return false;
        }
        else if (fileContName.length > 50) {
          this.$message({
            showClose: true,
            message: "上传文件名称不得超过50字符！",
            type: "error"
          });
          this.$refs.upload.clearFiles();
          this.uploadFile = false;
          this.$loading.hide();
          return false;
        }
        else if((this.b2bNum>=0)&&(this.b2cNum<=0)){
            if (this.accountLevel == 1) {
              this.$confirm(
                <div class="warn-num ">
                  <p class="title" style="font-size:16px;text-align:center;">对不起，您的对个人签约次数已用尽!</p>
                  <div class="customer-service"></div>
                </div>, '提示', {confirmButtonText: '去购买', showCancelButton: '取消'}).then(() => {
                this.$router.push('/PackagePurchase')
              })
            }else{
              this.$alert('对不起，您的对个人签约次数已用尽!', '提示', {
                confirmButtonText: '取消',
              });
            }
            this.$refs.upload.clearFiles();
            this.uploadFile = false;
            this.$loading.hide();
            return false
        }
        else if((this.b2bNum<=0)&&(this.b2cNum<=0)){
          if (this.accountLevel == 1) {
            this.$confirm(
              <div class="warn-num ">
                <p class="title" style="font-size:16px;text-align:center;">对不起，您的签约次数已用尽!</p>
                <div class="customer-service"></div>
              </div>, '提示', {confirmButtonText: '去购买', showCancelButton: '取消'}).then(() => {
              this.$router.push('/PackagePurchase')
            })
          }else{
            this.$alert('对不起，您的签约次数已用尽!', '提示', {
              confirmButtonText: '取消',
            });
          }
          this.$refs.upload.clearFiles();
          this.uploadFile = false;
          this.$loading.hide();
          return false
        }
        else {
          this.loading2 = true;
          this.uploadFile = true;
        }
        this.$loading.hide();
      },
      handleChange1(name) {
        this.$loading.show();
        this.getContractNum();
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
        }
        else if (name.size > max_size * 1024 * 1024) {
          this.$message({
            showClose: true,
            message: "文件大小超过限制",
            type: "error"
          });
          this.$refs.upload.clearFiles();
          this.uploadFile = false;
          this.$loading.hide();
          return false;
        }
        else if (fileContName.length > 50) {
          this.$message({
            showClose: true,
            message: "上传文件名称不得超过50字符！",
            type: "error"
          });
          this.$refs.upload.clearFiles();
          this.uploadFile = false;
          this.$loading.hide();
          return false;
        }
        else if((this.b2bNum<=0)&&(this.b2cNum>=0)){
          if (this.accountLevel == 1) {
            this.$confirm(
              <div class="warn-num ">
                <p class="title" style="font-size:16px;text-align:center;">对不起，对企业合同份数已用尽</p>
                <div class="customer-service"></div>
              </div>, '提示', {confirmButtonText: '去购买', showCancelButton: '取消'}).then(() => {
              this.$router.push('/PackagePurchase')
            })
          }else{
            this.$alert('对不起，对企业合同份数已用尽!', '提示', {
              confirmButtonText: '取消',

            });
          }


          this.$refs.upload.clearFiles();
          this.uploadFile = false;
          this.$loading.hide();
          return false
        }
        else if((this.b2bNum<=0)&&(this.b2cNum<=0)){

          if (this.accountLevel == 1) {
            this.$confirm(
              <div class="warn-num ">
                <p class="title" style="font-size:16px;text-align:center;">对不起，您的签约次数已用尽!</p>
                <div class="customer-service"></div>
              </div>, '提示', {confirmButtonText: '去购买', showCancelButton: '取消'}).then(() => {
              this.$router.push('/PackagePurchase')
            })
          }else{
            this.$alert('对不起，您的签约次数已用尽!', '提示', {
              confirmButtonText: '取消',

            });
          }

          this.$refs.upload.clearFiles();
          this.uploadFile = false;
          this.$loading.hide();

          return false
        }
        else {
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
          sessionStorage.setItem("contractName", suffix);
          sessionStorage.setItem("contractNo", contractNo);
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
          sessionStorage.setItem("contractName", suffix);
          sessionStorage.setItem("contractNo", contractNo);
          this.$router.push("/Signature"); //更改路由地址
        }
      }
    },

    created() {

      var data = [];
      var flag = "";
      var isCreater = "";
      let accountLevel = sessionStorage.getItem('accountLevel');
      let authorizerCode = sessionStorage.getItem('authorizerCode');

      if(sessionStorage.getItem('welcomePage')|| cookie.getJSON('tenant')[1].isBusiness==1){
        this.welcomeMessage = false;
        sessionStorage.setItem('welcomePage',false)
      }
      var requestVo = {
        pageNo: "1",
        pageSize: "7",
        contractStatus: "0" ,
        accountCode:accountLevel==2?this.accountCode:'',
        accountLevel:accountLevel,

      };
      this.$store.dispatch('tabIndex',{tabIndex:0});
      homePageContractLists(requestVo,this.interfaceCode).then(res=>{
        if(res&&res.data&&res.data.content&&res.data.content.length){
          this.num=res.data.content.length;
        }
        for (let i = 0; i < res.data.content.length; i++) {
          if (res.data.content[i].creater == this.interfaceCode) {  //发起方
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
          obj.operator = res.data.content[i].operator
          obj.operation = "";
          // obj.creater = res.data.content[i].creater
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

      })

      //合同概括请求
      //在读取属性[]和.注意！  server.requestType[i]报错
      let requestType=['waitForMeSign','waitForOtherSign','takeEffect','deadline'];

      let param={
        accountCode:this.accountCode
      }
      for(let i=0;i< requestType.length;i++){
        let type =  requestType[i];
        server[requestType[i]](param,this.interfaceCode).then(res=>{
          this[type] = res.data.count
        }).catch(error=>{

        })
      }
      let resParam={
        accountCode:sessionStorage.getItem('accountLevel')==2?this.accountCode:''
      };
      // 首页模板列表
      templateList(resParam,this.interfaceCode).then(res=>{
        this.arr = res.data.slice(0, 3);
        this.count = res.data.length;
      }).catch(error=>{

      })

      //查询合同剩余次数
      this.getContractNum()
    },
    mounted() {
      sessionStorage.removeItem("type");
      sessionStorage.removeItem("contractNo");
    }
  };
</script>
<style lang="scss" scoped>
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
  .warn-num{
    text-align: center;
  p{
    line-height: 30px;
  }
  .title{
    font-size: 18px;
  }
  }
  .el-icon-warning{
    display: none;
  }

  .upload-warn{

    width: 47.1rem;
    height: 23rem;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -25.05rem;
    margin-top: -20rem;
    background: url(/static/images/Home/up-warn.png) no-repeat;
    background-size: 100% 100%;
  div.contract-num{
    position: relative;
    left: 14rem;
    top: 9.0rem;
    font-size: 14px;
  p{
    font-size: 16px;
    color: red;
    line-height: 20px;
  }
  }
  .close-warn{
    position: absolute;
    right: 35px;
    top: 20px;
    font-size: 20px;
    color: #666;
  }
  }
  .contract-sign{
    /* position: absolute; */
    left:0;
    top:5px;
    float: left;
    margin-right:5px;
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
  .el-table th > .cell {
    text-align: center;
  }

  .el-table__row .cell {
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
  }


  .one:hover {
    border: 1px solid #4091fb;
  }
  .two:hover {
    border: 1px solid #4091fb;
  }
  #close {
    width: 30px;
    height: 30px;
    border-radius:50% ;
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
  .Container .main .title{
    height: 46px;
    margin: 0 0 0 15px;
    line-height: 46px;
    padding-left: 40px;
    color: #fff;
    font-size: 20px;
    padding-top: 0 !important;
    border-top: none !important;
    background: url("/static/images/Common/title.png") no-repeat;
  }
  .customer-service{
    width: 200px!important;
    height: 50px!important;
    background: url('/static/images/Common/customer-service.gif') no-repeat !important;
    margin-left: 80px;
  }
</style>
