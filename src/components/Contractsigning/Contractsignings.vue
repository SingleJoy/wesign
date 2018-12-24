/*
* @Author: wangjia
* @Date: 2018-06-07 10:26:42
* @Last Modified by: wangjia
* @Last Modified time: 2018-06-28 13:25:39
*/
<template>
  <div>
    <div class="Tops">
      <nav class='nav'>
        <p class='logo'>
          <img src="/static/images/Top/v1.6-logo.png" alt="logo图">
        </p>
        <div class='buttons' v-show="delSigner == true">
          <el-button type="info" style='background:#ccc' :disabled="hasClick"  @click="cancel">取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</el-button>
          <el-button style='color:#4091fb' :disabled="isNext" @click="nextStepFit">下一步</el-button>
        </div>
      </nav>
    </div>
    <div class='Contractsignings'>
      <div class="step" style="width:720px;">  <!--步骤条 -->
        <ul>
          <li class="active"><i class='el-icon-document'></i><b>上传文件</b></li>
          <p></p>
          <li class="active"><i class='el-icon-goods'></i><b>签署设置</b></li>
          <p></p>
          <li ><i class='el-icon-edit'></i><b>指定位置</b></li>
          <p></p>
          <li><i class='el-icon-menu'></i><b>合同签署</b></li>
          <p></p>
          <li><i class='el-icon-check'></i><b>完成</b></li>
        </ul>
      </div>
      <!-- 文件信息开始 -->
      <div class="file main">
        <h2 class="fileInfo">
          <div class="title">文件信息</div>
        </h2>

        <h3 class='proper'>
          <p class='first'><b>合同名称：</b>
            <input type="text" v-model="contractName" id='firstText' :maxlength= 50>
            <a class='select' @click="lookContractImg" style='padding-top:2px;cursor:pointer'>查看</a>
            <el-upload
              ref='upload'
              class="upload-demo"
              :action='urlloadUrl()'
              :before-upload="handleChange"
              :on-success="fileSuccess"
              :on-error="fileError"
              :show-file-list= false
              accept='.docx,.pdf,.doc,.txt'
            >
              <a class='replace'>更换</a>
            </el-upload>
          </p>
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
              @change="dateInput"
              :picker-options="pickerOptions0"
            >
            </el-date-picker>
            <el-checkbox
              v-model="checked"
              @change='checkedBox'
            >
            </el-checkbox>
            <b class='info'>永久有效</b>
            <el-checkbox
              v-model="checked1"
            >
            </el-checkbox>
            <b class='info'>平台方是否签署</b>
          </p>
        </h3>
      </div>
      <el-dialog title="合同详情图片" :visible.sync="dialogTableVisible" custom-class='showDialogs' >   <!-- :lock-scroll= false有问题！！！！ -->
        <div v-for="(item,index) in imgList" :key="index">
          <img :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractUrl='+item" alt="" style='width:100%;'>
        </div>
      </el-dialog>
      <!-- 文件信息结束 -->
      <!-- 签署人设置开始 -->
      <div class="setting">
        <h2 class='settingInfo'>
          <div class="title" >签署人设置</div>
          <p class="personInfo2">
            <el-button type="primary" size="medium" @click='addSigners' icon="el-icon-circle-plus-outline">添加人员</el-button>
            <el-dialog title="添加人员" :visible.sync="dialogFormVisible"  width="360px"  top="30vh"   custom-class='outInfo' center @close="closeDialog('ruleForm')"   :lock-scroll= false>
              <el-form :model="ruleForm" :rules="rules" ref='ruleForm' class="demo-ruleForm" size="medium">
                <el-form-item label="姓名" :label-width="formLabelWidth" prop="signUserName">
                  <el-input v-model="ruleForm.signUserName" auto-complete="off" placeholder="请输入姓名" :maxlength= 15></el-input>
                </el-form-item>
                <el-form-item label="身份证号" :label-width="formLabelWidth" prop="idCard">
                  <el-input v-model="ruleForm.idCard" auto-complete="off" placeholder="请输入身份证号" :maxlength= 18></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth" prop="mobile">
                  <el-input v-model="ruleForm.mobile" auto-complete="off" placeholder="请输入手机号" :maxlength= 11></el-input>
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
      <div class='table' style='height:300px;'>
        <el-table
          :data="tableData5"
          style="width: 100%;text-align:center"
          :header-cell-style="getRowClass"
        >
          <el-table-column
            label="签署人名称"
            width="250"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input v-model="scope.row.signUserName" placeholder="" :maxlength= 20 size="mini"></el-input>
              </template>
              <span v-else>{{ scope.row.signUserName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="手机号"
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
            width="260">
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input v-model="scope.row.idCard" placeholder="" :maxlength= 18 size="mini"></el-input>
              </template>
              <span v-else>{{ scope.row.idCard }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="state"
            label="操作"
            width="360">
            <template slot-scope="scope">
              <el-button @click="confirmEdit(scope.row)" type="primary"  size="mini" v-if="scope.row.edit">完&nbsp;&nbsp;成</el-button>
              <el-button @click="modifyClick(scope.row)" type="primary" size="mini" v-else v-show="editSign == false">修&nbsp;&nbsp;改</el-button>
              <el-button @click="deleteClick(scope.$index,tableData5)" type="primary" size="mini" v-show="!scope.row.edit && editSign == false">删&nbsp;&nbsp;除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
  import {validateMoblie,validateCard,TrimAll} from '@/common/js/validate'
  import cookie from '@/common/js/getTenant'
  import {prohibit} from '@/common/js/prohibitBrowser'
  import Loading from '@/common/components/Loading'
  import {contractImg,perfectContract,echoContractInfo} from '@/api/personal.js'

  export default {
    name: 'Contractsignings',
    data() {
      let validateName = (rule,value,callback) => {
        if (TrimAll(value) === ''){
          callback(new Error('请输入姓名'))
        } else if (value.length<2 || value.length > 15 ) {
          callback(new Error('姓名长度2-15位'))
        } else {
          callback()
        }
      };

      let validateIdCard = (rule,value,callback) => {
        if (value !== '' && !validateCard(value)){
          callback(new Error('身份证格式错误'))
        } else {
          callback()
        }
      };

      let validatePhone = (rule,value,callback) => {
        let mobileArray = []
        if(this.tableData5 != ''){
          for(let i=0;i<this.tableData5.length;i++){
            mobileArray.push(this.tableData5[i].mobile)
          }
        }
        if(value === ''){
          callback(new Error('请输入手机号'))
        } else if (value !== '' && !validateMoblie(value)){
          callback(new Error('手机号格式错误'))
        } else if (mobileArray.indexOf(value) != -1){
          callback(new Error('此手机号已添加'))
        } else if (value == cookie.getJSON('tenant')[0].mobile){
          callback(new Error('手机号不能与发起方手机号相同'))
        }else if(this.primaryMobile == value){
            callback(new Error('手机号不能与一级账号的手机号相同'))
        } else {
          callback()
        }
      };
      return {
        baseURL:this.baseURL.BASE_URL,
        value8: '',
        dialogFormVisible: false,
        dialogTableVisible: false,
        //centerDialogVisible:false,
        checked: true,
        checked1: true,
        tableData5: [],
        imgList:[],
        isNext:false,//下一步按钮
        interfaceCode:cookie.getJSON('tenant')[1].interfaceCode,
        accountCode:sessionStorage.getItem('accountCode')?sessionStorage.getItem('accountCode'):'',
        primaryMobile: cookie.getJSON('tenant')[1].parentAccountmobile?cookie.getJSON('tenant')[1].parentAccountmobile:'',
        ruleForm: {
          signUserName: '',
          idCard: '',
          mobile:''
        },
        hasClick:false,
        formLabelWidth: '70px',
        contractName:sessionStorage.getItem('contractName'),
        contractNo:sessionStorage.getItem('contractNo'),
        rules: {
          signUserName: [
            { required: true, validator: validateName, trigger: 'blur' }
          ],
          idCard:[
            { validator: validateIdCard, trigger: 'blur'}
          ],
          mobile:[
            { required: true, validator: validatePhone, trigger: 'blur' }
          ],
        },
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        flag:true,       //重复提交标示
        operateType:'',  //数据回显标示
        operate:false,  // 添加签署人标示
        editSigner:true,
        delSigner:true,      //删除联系人标示
        editSign:false,
        contractNumn:'',
        contractVo:''
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
      handleChange (name,file) {
        this.isNext = true;
        let max_size = 5;// 5M
        let fileNameCont = name.name.replace(/\s+/g, "")
        let reg= /[.](docx|pdf|doc|txt|DOCX|PDF|DOC|TXT)$/
        if(!reg.test(fileNameCont)){
          this.$alert('只能传pdf,doc,txt,docx格式的文件!','上传文件', {
            confirmButtonText: '确定'
          })
          this.$refs.upload.clearFiles()
          this.isNext = false;
          return false
        } else if( name.size > max_size*1024*1024){
          this.$alert('文件大小超过限制!','上传文件', {
            confirmButtonText: '确定'
          })
          this.$refs.upload.clearFiles()
          this.isNext = false;
          return false
        } else if(fileNameCont.length > 50){
          this.$alert('上传文件名称不得超过50字符！','上传文件', {
            confirmButtonText: '确定'
          })
          this.$refs.upload.clearFiles()
           this.isNext = false;
          return false
        } else {
          this.$loading.show(); //显示
        }
      },
      fileSuccess(name, file, fileList){ //上传文件，传参数 contractName contractNo 渲染 Contractsigning.vue
        this.isNext = false;
        let contractName = file.name.replace(/\s+/g, "")
        let contractNo = file.response.contractNo
        let resultCode = file.response.resultCode
        this.$loading.hide(); //隐藏
        let index1=contractName.lastIndexOf(".");
        let suffix=contractName.slice(0,index1);
        this.contractName = suffix
        sessionStorage.setItem('contractName', suffix)
        sessionStorage.setItem('contractNo', contractNo)
        this.contractNo=contractNo;
      },
      fileError(){
        this.nextBtn = false;
        this.$message({
          showClose: true,
          message: '上传失败',
          type: 'success'
        })
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      lookContractImg (){
        this.$loading.show(); //显示
        this.imgList=[];
        let data =[];

        contractImg(this.interfaceCode,this.contractNo).then(res=>{
            for (let i = 0; i < res.data.length;i++) {
              let contractUrl = res.data[i].contractUrl;
              data[i] = contractUrl
              this.$loading.hide(); //隐藏
            }
            this.imgList = data
        }).catch(error=>{

        })
        this.dialogTableVisible = true
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.checked1 == true && this.tableData5.length < 4 ||this.checked1 == false && this.tableData5.length < 5){
              let obj = {}
              obj.signUserName = TrimAll(this.ruleForm.signUserName)
              obj.mobile = this.ruleForm.mobile
              obj.idCard = this.ruleForm.idCard
              obj.edit = false                        //修改标示
              this.tableData5.push(obj)
              this.resetForm(formName)
              this.dialogFormVisible = false
              this.operate = true
            } else {
              this.dialogFormVisible = false
              this.$alert('(平台方不签署)上传发起合同签署人数不能超过5人!否则，签署人数不能超过4人','添加签署人', {
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
        this.dialogFormVisible = false
      },
      closeDialog(formName){
        this.$refs[formName].resetFields()
      },

      checkedBox () {
        if(this.checked == true){
          this.value8 = ''
        }
      },
      dateInput () {
        this.checked = false
      },
      modifyClick (row) {
        row.edit=!row.edit
        this.operate = false
        this.editSigner = false
        this.delSigner = false
        this.editSign = true
      },
      confirmEdit(row){     //完成修改
        let mobileArr = []
        if(this.tableData5 != ''){
          for(let i=0;i<this.tableData5.length;i++){
            mobileArr.push(this.tableData5[i].mobile)
          }
        }
        let index = mobileArr.indexOf(row.mobile)
        mobileArr.splice(index, 1)

        if(TrimAll(row.signUserName) == ''){
          this.$alert('签署人名称为必填项!','修改签署人', {
            confirmButtonText: '确定'
          })
        } else if (row.mobile == '') {
          this.$alert('手机号为必填项!','修改签署人', {
            confirmButtonText: '确定'
          })
        } else if (row.mobile !== '' && !validateMoblie(row.mobile)){
          this.$alert('手机号格式错误!','修改签署人', {
            confirmButtonText: '确定'
          })
        } else if (row.idCard !== '' && !validateCard(row.idCard)){
          this.$alert('身份证格式错误!','修改签署人', {
            confirmButtonText: '确定'
          })
        } else if (mobileArr.indexOf(row.mobile) != -1){
          this.$alert('该手机号已被添加!','修改签署人', {
            confirmButtonText: '确定'
          })
        } else if (row.mobile == cookie.getJSON('tenant')[0].mobile){
          this.$alert('手机号不能与发起方手机号相同!','修改签署人', {
            confirmButtonText: '确定'
          })
        }else if(row.mobile == this.primaryMobile){
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
        });
      },
      cancel() {    //取消操作
        const h = this.$createElement;
        this.hasClick = true;
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
                this.$store.dispatch('tabIndex',{tabIndex:0});  //导航高亮
                this.$router.push('/Home')
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 50);
              }, 100);
            } else {
              this.hasClick = false;
              done();
            }
          }
        }).then(()=>{
          this.hasClick = false;
        })
      },
      urlloadUrl(){

        return `${this.baseURL}/restapi/wesign/v1/tenant/${this.interfaceCode}/contract/${this.contractNo}/changeContract?accountCode=${this.accountCode}`
      },
      nextStepFit () { //下一步

        if( this.checked1 == true ){
          this.operate = true
        }
        if(TrimAll(this.contractName) == ''){
          this.$alert('合同名称不能为空!','签署', {
            confirmButtonText: '确定'
          })
          return false
        }

        if(!!this.tableData5){
          if((this.checked1 == true && this.tableData5.length>4)||(this.checked1 == false&&this.tableData5.length > 5)){
            this.$alert('上传发起合同签署人数不能超过5人!','添加签署人', {
              confirmButtonText: '确定'
            })
            return false
          }
        }

        if(this.checked == false && (this.value8 == ''|| !this.value8)){
          this.$alert('您还没有选择签署时间!','签署时间', {
            confirmButtonText: '确定'
          });
          return false
        }
        if(this.operate == false){
          this.$alert('您还没有完成添加签署人操作!','添加签署人', {
            confirmButtonText: '确定'
          });
          return false
        }
        if( this.checked1 == false && this.tableData5 == ''){
          this.$alert('您还没有添加人员!','添加签署人', {
            confirmButtonText: '确定'
          });
        } else {
          if (this.flag == true){
            this.flag = false
            var names = ''
            var mobiles = ''
            var id_nums = ''
            var emails = ''
            var perpetualValid = ''
            var needSign =''
            if ( this.checked1 == true){
              needSign = '1'
              names += cookie.getJSON('tenant')[1].companyName;
              names += ",";
              id_nums+= "";
              id_nums+=",";
              mobiles += cookie.getJSON('tenant')[0].mobile;
              mobiles += ",";
              emails+= '';
              emails+=",";
            } else {
              needSign = '0'
            }
            if(this.tableData5){
              for(var i = 0; i < this.tableData5.length;i++ ){
                var name = this.tableData5[i].signUserName
                var mobile = this.tableData5[i].mobile
                var idCard = this.tableData5[i].idCard
                var email = this.tableData5[i].email
                if(email == undefined || email == 'undefined'){
                  email = ''
                }
                names += name + ','
                mobiles += mobile + ','
                id_nums += idCard + ','
                emails += email + ','
              }
            }

            names = names.substring(0, names.length-1)
            mobiles = mobiles.substring(0,mobiles.length-1)
            id_nums = id_nums.substring(0,id_nums.length-1)
            emails = emails.substring(0,emails.length-1)
            if ( this.checked == true ) {
              perpetualValid = '1'
            } else {
              perpetualValid = '0'
            }
            if( this.operateType !='' ){
              if(this.contractNumn != this.contractNo){
                this.contractVo = {
                  "needSign":needSign,
                  "contractName":TrimAll(this.contractName),
                  "validTime":this.value8,
                  "perpetualValid":perpetualValid,
                  "sms_notice":'0',
                  "email_notice":'0',
                  "names":names,
                  "id_nums":id_nums,
                  "mobiles":mobiles,
                  "emails":emails
                }
              }else{
                 this.contractVo = {
                  "needSign":needSign,
                  "operateType":this.operateType,
                  "contractName":TrimAll(this.contractName),
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
            } else {
               this.contractVo = {
                "needSign":needSign,
                "contractName":TrimAll(this.contractName),
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
            this.isNext = true;

            perfectContract(this.contractVo,this.interfaceCode,this.contractNo).then(res=>{

                if (res.data.resultCode == '0') {
                  sessionStorage.setItem('contractName', TrimAll(this.contractName))
                  this.isNext = false;

                  sessionStorage.setItem('contractName', TrimAll(this.contractName))

                  sessionStorage.setItem('needSign',needSign)
                  if(needSign == '1'){
                    this.$router.push('/Positions')
                  } else {
                    this.$router.push('/Whether')
                  }
                } else {
                  this.$alert(res.data.resultMessage,'提示', {
                    confirmButtonText: '确定'
                  })
                  this.flag = true;
                  this.isNext = false;
                }
            }).catch(error=>{

            })
          }
        }
      },
      addSigners(){
        if(this.editSigner == false){
          this.$alert('您还没有完成添加签署人操作','添加签署人',{
            confirmButtonText: '确定'
          })
        } else {
          this.dialogFormVisible = true   //当前的dialogFormVisible 找不到值
        }
      }
    },
    created() {
        let type = sessionStorage.getItem('type');
        if(type== 'back' ){
            this.isNext = true;
            this.operate = true;
            echoContractInfo(this.interfaceCode,this.contractNo).then(res=>{
                this.isNext = false;
                var needSign = res.data.needSign;
                var perpetualValid = res.data.perpetualValid;
                var validTime = res.data.validTime;
                var list = res.data.list!=null?res.data.list:[];
                this.operateType = res.data.operateType
                if(needSign == "1"){
                    this.checked1 = true
                } else {
                    this.checked1 = false
                }
                if(perpetualValid == "1"){
                    this.checked = true
                }else{
                    this.checked = false
                }
                if(validTime!=""){
                    this.value8 = validTime
                }
                    this.tableData5 = list
            }).catch(error=>{

            })
        }
    },
    beforeDestroy() {
      sessionStorage.removeItem("type");
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../styles/Contractsigning/Contractsignings.css";
  @import "../../common/styles/Tops.css";
  @import "../../common/styles/SigningSteps.css";
  .Contractsignings .main .title,.Contractsignings .setting .title{
    height: 46px;
    margin: 10px 0 0 15px;
    line-height: 46px;
    padding-left: 40px;
    color: #fff;
    font-size: 20px;
    padding-top: 0 !important;
    border-top: none !important;
    background: url("/static/images/Common/title.png") no-repeat;
  }

  .upload-demo .el-upload .el-upload--text{
    display: block !important;
    margin-left: 250px !important;
    margin-top: -21px !important;
  }
  .first{
    display: flex;
    display: -webkit-flex;
    display: -moz-flex;
    display: -o-flex;
    display: -ms-flex;
  }
  .first #firstText{
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

  .el-table__row .cell {
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
    text-align: center!important;
  }
  .el-table th>.cell{
    text-align: center;
  }
  .el-table .cell{
      text-align: center;
  }


</style>
<style>
  .outInfo{
    height:320px !important;
    width:400px !important;
    overflow-y: hidden !important;
  }
  .showDialogs{
    box-sizing: border-box !important;
    height: 700px !important;
     /* overflow-y: scroll !important; */
  }
</style>


