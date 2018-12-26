<template>
  <div>
    <div class="Tops">
      <nav class='nav'>
        <p class='logo'>
          <img src="/static/images/Top/v1.6-logo.png" alt="logo图">
        </p>
        <div class='buttons' v-show="delSigner == true">
          <el-button type="info" style='background:#ccc' @click="tempCancel">取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</el-button>
          <el-button style='color:#4091fb' :disabled="isNext" @click="nextStepBtn" :loading= load >下一步</el-button>
        </div>
      </nav>
    </div>
    <div class='Signaturesettings'>
      <div class='step' style="width:900px;">  <!--步骤条 -->
        <ul>
          <li class="active"><i class='el-icon-document'></i><b>选择模板</b></li>
          <p></p>
          <li class="active"><i class='el-icon-edit'></i><b>填充信息</b></li>
          <p></p>
          <li class="active"><i class='el-icon-edit'></i><b>签署设置</b></li>
          <p></p>
          <li><i class='el-icon-edit'></i><b>指定位置</b></li>
          <p></p>
          <li><i class='el-icon-menu'></i><b>合同签署</b></li>
          <p></p>
          <li><i class='el-icon-check'></i><b>完成</b></li>
        </ul>
      </div>
      <!-- 文件信息开始 -->
      <div class="file">
        <p class="title">文件信息</p>
        <h3 class='proper'>
          <p class='first'><b>合同名称：</b><input type="text" v-model="templateName" id='inputText' :maxlength= 50 >
            <a class='select' @click="seeTemplate" style="padding-left:0">查看</a>

          <p class='second'><span>签署截止日期：</span>
            <el-date-picker
              style='width:138px;margin-right:20px'
              height='height:40px'
              v-model="value8"
              type="date"
              :editable= false
              :clearable= false
              placeholder="选择日期"
              format="yyyy-MM-dd 23:59:59"
              value-format="yyyy-MM-dd 23:59:59"
              @change="dateInputTemp"
              :picker-options="pickerOptions0"
            >
            </el-date-picker>
            <el-checkbox
              v-model="checked"
              @change='checkedBox'
            ></el-checkbox>
            <b class='info'>永久有效</b>
            <el-checkbox
              v-model="checked1"
            ></el-checkbox>
            <b class='info'>平台方是否签署</b>
          </p>
        </h3>
      </div>
      <!-- 文件信息结束 -->
      <!-- 签署人设置开始 -->
      <div class="setting">
        <h2 class='settingInfo'>
          <p class="title">签署人设置</p>
          <p class='personInfonfo'>
            <!-- <el-checkbox></el-checkbox>
			<b class='info'>短信通知</b>
			<el-checkbox></el-checkbox>
			<b class='info'>邮箱通知</b> -->
            <el-button type="primary" size="medium" @click='addSign' icon="el-icon-circle-plus-outline">添加签署人</el-button>
            <el-dialog title="添加人员" :visible.sync="modifyPassword" :lock-scroll=false custom-class='tempOut' width="360px" height="320px" top="30vh" center @close="closeDialog('ruleForm')">
              <el-form :model="ruleForm" :rules="rules" ref='ruleForm' class="demo-ruleForm" size="medium">
                <el-form-item label="姓名" :label-width="formLabelWidth" prop="signUserName">
                  <el-input v-model="ruleForm.signUserName" auto-complete="off" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" :label-width="formLabelWidth" prop="idCard">
                  <el-input v-model="ruleForm.idCard" auto-complete="off" placeholder="请输入身份证号" :maxlength = 18></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth" prop="mobile">
                  <el-input v-model="ruleForm.mobile" auto-complete="off" placeholder="请输入手机号" :maxlength = 11></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('ruleForm')" size="medium">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')" size="medium">确 定</el-button>
              </div>
            </el-dialog>
          </p>
        </h2>
      </div>
      <!-- 签署人设置结束 -->
      <!-- 渲染表格数据开始 -->
      <div class='table'>
        <el-table
          :header-cell-style="getRowClass"
          :data="tableData2"
          style="width: 100%;text-align:center"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            label="签署人名称"
            align='center'
            style="text-align:center"
            width="300">
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input v-model="scope.row.signUserName" placeholder="" :maxlength= 15 size="mini"></el-input>
              </template>
              <span v-else>{{ scope.row.signUserName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="手机号"
            align='center'
            width="300">
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input v-model="scope.row.mobile" placeholder="" :maxlength= 11 size="mini"></el-input>
              </template>
              <span v-else>{{ scope.row.mobile }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="身份证号"
            align='center'
            width="300">
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input v-model="scope.row.idCard" placeholder="" :maxlength= 18 size="mini"></el-input>
              </template>
              <span v-else>{{ scope.row.idCard }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="state"
            align='center'
            label="操作"
            width="250">
            <template slot-scope="scope">
              <el-button @click="confirmEdit(scope.row)" type="primary"  size="mini" v-if="scope.row.edit">完&nbsp;&nbsp;成</el-button>
              <el-button @click="modifyClick(scope.row)" type="primary" size="mini" v-else v-show="editSign == false">修&nbsp;&nbsp;改</el-button>
              <el-button @click="deleteClick(scope.$index,tableData2)" type="primary" size="mini" v-show="!scope.row.edit && editSign == false">删&nbsp;&nbsp;除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog title="合同详情图片" :visible.sync="dialogTableVisible" custom-class="showDialogs" >
        <div v-for="(item,index) in imgList" :key="index" >
          <img :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractName=zqsign&contractUrl='+item" alt=""  style='width: 100%;height:844px;'>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import {validateMoblie,validateCard,TrimAll} from '@/common/js/validate'
  import { mapActions, mapState } from 'vuex'
  import cookie from '@/common/js/getTenant'
  import {prohibit} from '@/common/js/prohibitBrowser'
  import {contractimgs,getContractDetails} from "@/api/template"
  import {getSignLink,echoContractInfo,perfectContract} from "@/api/personal"
  export default {
    name: 'Signaturesettings',
    data() {
      let validateName = (rule,value,callback) => {
        if (TrimAll(value) === ''){
          callback(new Error('请输入姓名'))
        } else if (value.length<2 || value.length > 15 ) {
          callback(new Error('姓名长度2-15位'))
        } else {
          callback()
        }
      }
      let validateIdCard = (rule,value,callback) => {
        if (value !== '' && !validateCard(value)){
          callback(new Error('身份证格式错误'))
        } else {
          callback()
        }
      }
      let validatePhone = (rule,value,callback) => {
        let mobileArray = []
        if(this.tableData2 != ''){
          for(let i=0;i<this.tableData2.length;i++){
            mobileArray.push(this.tableData2[i].mobile)
          }
        }
        if(value == ''){
          callback(new Error('请输入手机号'))
        } else if (value !== '' && !validateMoblie(value)){
          callback(new Error('手机号格式错误'))
        } else if (mobileArray.indexOf(value) != -1){
          callback(new Error('此手机号已添加'))
        } else if (value == cookie.getJSON('tenant')[0].mobile ){
          callback(new Error('手机号不能与发起方手机号相同'))
        } else if(value == this.primaryMobile){
          callback(new Error('手机号不能与一级账号的手机号相同'))
        }else {
          callback()
        }
      }
      return {
        baseURL:this.baseURL.BASE_URL,
        primaryMobile: cookie.getJSON('tenant')[1].parentAccountmobile?cookie.getJSON('tenant')[1].parentAccountmobile:'',  //一级账号手机号
        value8: '',
        checked: true,
        isNext:false,
        checked1:true,
        falg:true,       //重复提交标示
        operateType:'', //数据回显标示
        operate:false,   // 添加签署人标示
        load:false,    //提交按钮标示loading
        delSigner:true,       //删除联系人标示
        modifyPassword: false,
        editSigner:true,
        dialogTableVisible:false,
        editSign:false,
        imgList:[],
        ruleForm:{
          signUserName:'',
          mobile:'',
          idCard:''
        },
        tableData2: [],
        formLabelWidth: '70px',
        rules: {
          signUserName: [
            { required: true, validator: validateName, trigger: 'blur' }
          ],
          idCard:[
            {validator: validateIdCard, trigger: 'blur'}
          ],
          mobile:[
            { required: true,  validator: validatePhone, trigger: 'blur' }
          ]
        },
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        templateName:sessionStorage.getItem("templateName"),
        interfaceCode:sessionStorage.getItem("interfaceCode"),
        contractNo:sessionStorage.getItem("contractNo"),
        templateNo:sessionStorage.getItem("templateNo"),
        contractName:sessionStorage.getItem("contractName"),
        type:sessionStorage.getItem("type"),
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
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.checked1 == true && this.tableData2.length < 4 ||this.checked1 == false && this.tableData2.length < 5){
              let obj = {}
              obj.signUserName = this.ruleForm.signUserName
              obj.mobile = this.ruleForm.mobile
              obj.idCard = this.ruleForm.idCard
              obj.email = this.ruleForm.email
              obj.edit = false
              this.tableData2.push(obj)
              this.resetForm(formName)
              this.modifyPassword = false
              this.operate = true
            } else {
              this.modifyPassword = false
              this.$alert('(平台方不签署)模版发起合同签署人数不能超过5人!否则，签署人数不能超过4人','添加人员', {
                confirmButtonText: '确定'
              })
            }
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.modifyPassword = false
      },
      closeDialog(formName){
        this.$refs[formName].resetFields()
      },

      seeTemplate () {
        let data =[];
        contractimgs(this.interfaceCode ,this.contractNo).then(res=> {
          for (let i = 0; i < res.data.length;i++) {
            let contractUrl = res.data[i].contractUrl
            data[i] = contractUrl
          }
          this.imgList = data
        }).catch(error=>{

        })
        this.dialogTableVisible = true
      },
      dateInputTemp () {
        this.checked = false
      },
      checkedBox () {
        if(this.checked == true){
          this.value8 = ''
        }
      },
      modifyClick (row) {
        row.edit=!row.edit
        this.operate = false
        this.editSigner = false
        this.delSigner = false
        this.editSign = true
      },
      addSign(){
        if(this.editSigner == false){
          this.$alert('您还没有完成添加签署人操作','添加签署人',{
            confirmButtonText: '确定'
          })
        } else {
          this.modifyPassword= true
        }
      },
      confirmEdit(row){     //perfect完成修改
        console.log(row)
        let mobileArr = []
        if(this.tableData2 != ''){
          for(let i=0;i<this.tableData2.length;i++){
            mobileArr.push(this.tableData2[i].mobile)
          }
        }
        let index = mobileArr.indexOf(row.mobile)
        mobileArr.splice(index, 1)

        if(TrimAll(row.signUserName) == ''){
          this.$alert('签署人名称为必填项!','修改签署人', {
            confirmButtonText: '确定'
          })
        } else if (row.mobile == '') {
          this.$alert('签署人手机号为必填项!','修改签署人', {
            confirmButtonText: '确定'
          })
        } else if (row.mobile !== '' && !validateMoblie(row.mobile)){
          this.$alert('签署人手机号格式错误!','修改签署人', {
            confirmButtonText: '确定'
          })
        } else if (row.idCard !== '' && !validateCard(row.idCard)){
          this.$alert('签署人身份证格式错误!','修改签署人', {
            confirmButtonText: '确定'
          })
        } else if (mobileArr.indexOf(row.mobile) != -1){
          this.$alert('该手机号已被添加!','修改签署人', {
            confirmButtonText: '确定'
          })
        } else if (row.mobile == cookie.getJSON('tenant')[0].mobile ){
          this.$alert('手机号不能与发起方手机号相同!','修改签署人', {
            confirmButtonText: '确定'
          })
        } else if(row.mobile==this.primaryMobile){
          this.$alert('手机号不能与一级账号的手机号相同!','修改签署人', {
            confirmButtonText: '确定'
          })
        }else {
          row.edit = false
          this.operate = true
          this.editSigner = true
          this.delSigner = true
          this.editSign = false
        }
      },
      deleteClick (index,rows) { //删除人员
        this.delSigner = false
        this.$confirm('此操作删除该签署人, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          rows.splice(index, 1)
          this.delSigner = true
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
          this.delSigner = true
        })
      },
      tempCancel() {    //取消操作
        this.$store.dispatch('tabIndex',{tabIndex:0});  //导航高亮
        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, ' 确定将返回首页'),
            h('i', { style: 'color: teal' }, '')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done();
                this.$router.push('/Home')
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 50);
              }, 100);
            } else {
              done();
            }
          }
        })
      },
      nextStepBtn () { //下一步
        let inputText = this.templateName;
        if(TrimAll(inputText) == ''){
          this.$alert('合同名称不能为空!','签署', {
            confirmButtonText: '确定'
          })
          return false
        }
        if( this.checked1 == true ){
          this.operate = true
        }
        if(!!this.tableData2){ //判断签署人数组是否存在 .length报错
          if(this.checked1 == true && this.tableData2.length > 4 ||this.checked1 == false && this.tableData2.length > 5){
            this.$alert('模板发起合同签署人数不能超过5人!','添加签署人', {
              confirmButtonText: '确定'
            })
            return false
          }
        }

        if(this.checked == false && this.value8 == ''){
          this.$alert('您还没有选择签署时间!','签署时间', {
            confirmButtonText: '确定'
          })
          return false
        }
        if(this.operate == false){
          this.$alert('您还没有完成添加签署人操作!','添加签署人', {
            confirmButtonText: '确定'
          })
          return false
        }
        if( this.checked1 == false && this.tableData2.length == 0){
          this.$alert('您还没有添加人员!','添加签署人', {
            confirmButtonText: '确定'
          })
        } else {
          if(this.falg == true){
            this.falg = false
            this.load = true
            let names = ''
            let mobiles = ''
            let id_nums = ''
            let emails = ''
            let perpetualValid = ''
            let needSign = ''
            if (this.checked1 == true ){
              needSign = '1'
              names += cookie.getJSON('tenant')[1].companyName;
              names += ",";
              id_nums+= "";
              id_nums+=",";
              mobiles += cookie.getJSON('tenant')[0].mobile ;
              mobiles += ",";
              emails+= '';
              emails+=",";
            } else {
              needSign = '0'
            }
            if(!!this.tableData2){
              for(let i = 0; i < this.tableData2.length;i++ ){
                let name = this.tableData2[i].signUserName
                let mobile = this.tableData2[i].mobile
                let idCard = this.tableData2[i].idCard
                let email = this.tableData2[i].email
                if(email == undefined || email == 'undefined'){
                  email = ''
                }
                names += name + ','
                mobiles += mobile + ','
                id_nums += idCard + ','
                emails += email + ','
              }
            }

            if ( this.checked == true ) {
              perpetualValid = '1'
            } else {
              perpetualValid = '0'
            }
            names = names.substring(0, names.length-1)
            mobiles = mobiles.substring(0,mobiles.length-1)
            id_nums = id_nums.substring(0,id_nums.length-1)
            emails = emails.substring(0,emails.length-1)
            if(this.operateType !='' ){
            var  params={
                "needSign":needSign,
                "operateType":this.operateType,
                "contractName":TrimAll(this.templateName),
                "validTime":this.value8,
                "perpetualValid":perpetualValid,
                "sms_notice":'0',
                "email_notice":'0',
                "names":names,
                "id_nums":id_nums,
                "mobiles":mobiles,
                "emails":emails
              }
            } else {
             var  params={
                "needSign":needSign,
                "contractName":TrimAll(this.templateName),
                "validTime":this.value8,
                "perpetualValid":perpetualValid,
                "sms_notice":'0',
                "email_notice":'0',
                "names":names,
                "id_nums":id_nums,
                "mobiles":mobiles,
                "emails":emails
              }
            }
            perfectContract(params,this.interfaceCode ,this.contractNo).then(res=> {

              if (res.data.resultCode == 0) {

                sessionStorage.setItem('needSign',needSign)
                if(needSign == 1){
                  this.$router.push('/Specifiedposition');
                  sessionStorage.setItem('contractNo',this.contractNo);
                } else {
                  this.$router.push('/TemplatePos');
                  sessionStorage.setItem('contractNo',this.contractNo);
                }

              } else {
                this.$alert('您还没有选择签署时间!','签署时间', {
                  confirmButtonText: '确定'
                })
                this.falg = true
                this.load = false
              }

            }).catch(error=>{

            })
          }
        }
      }
    },
    created() {
    // alert(this.primaryMobile)

      if ( this.type == 'back'){
        this.isNext = true;
        this.operate = true
        echoContractInfo(this.interfaceCode,this.contractNo).then(res=> {

          this.isNext = false;
          let needSign = res.data.needSign;
          let perpetualValid = res.data.perpetualValid;
          let validTime = res.data.validTime;
          let list = res.data.list!=null?res.data.list:[];
          this.operateType = res.data.operateType
          if(needSign == "1"){
            this.checked1 = true
          } else {
            this.checked1 = false
          }
          if(perpetualValid =="1"){
            this.checked = true
          }else{
            this.checked = false
          }
          if(validTime!=""){
            this.value8 = validTime
          }
          this.tableData2 = list

        }).catch(error=>{

        })

      }
    },
    mounted() {
      prohibit()
    }
  }
</script>
<style scoped>
  @import "../../../styles/Signaturesetting/Signaturesettings.css";
  @import "../../../common/styles/Tops.css";
  @import "../../../common/styles/SigningSteps.css";
  .Signaturesettings .file .title,.Signaturesettings .setting .title{
    display: block;
    height: 65px;
    margin: 20px 0 0 15px;
    line-height: 46px;
    padding-left: 40px;
    color: #fff;
    font-size: 20px;
    padding-top: 0 !important;
    border-top: none !important;
    background: url("/static/images/Common/title.png") no-repeat;
    font-weight: normal;
  }
  .first #inputText{
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    height: 40px;
    line-height: 1;
    outline: 0;
    padding: 0 15px;
    margin-top:-10px;
    font-size:12px;
    margin-right:20px;
  }


</style>
<style>
  .tempOut{
    height:320px !important;
    width:400px !important;
    overflow-y: hidden !important;
  }
  .showTempDialog{
    box-sizing: border-box !important;
    height:700px !important;
    overflow-y: scroll !important;
  }
</style>

