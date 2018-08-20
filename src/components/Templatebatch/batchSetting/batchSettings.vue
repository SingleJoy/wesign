<template>
  <div>
  <div class="Tops">
    <nav class='nav'>
      <p class='logo'>
        <img src="../../../../static/images/logo2.png" alt="">
      </p>
      <div class='buttons' v-show="delSigner == true">
        <el-button type="info" style='background:#ccc' :disabled="hasClick" @click="batchTempCancel">取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</el-button>
        <el-button style='color:#22a7ea' @click="nextStepFit" :loading = load>下一步</el-button>
      </div>
    </nav>
   </div>
   <div class='batchSettings' style="margin-top: 100px;">
        <div class='step' style="width:720px;">  <!--步骤条 -->
            <ul>
              <li class="active"><i class='el-icon-document'></i><b>选择模板</b></li>
              <p></p>
              <li class="active"><i class='el-icon-goods'></i><b>签署设置</b></li>
              <p></p>
              <li><i class='el-icon-edit'></i><b>填充信息</b></li>
              <p></p>
              <li><i class='el-icon-menu'></i><b>合同签署</b></li>
              <p></p>
              <li><i class='el-icon-check'></i><b>完成</b></li>
            </ul>
        </div>
        <!-- 文件信息开始 -->
        <div class="file">
          <h2 class='fileInfo'>
            <img src="../../../../static/images/Contractsigning/person.png" alt="">
          </h2>
          <h3 class='proper'>
            <!-- <p class='first'><b>合同名称：</b><input type="text" :value=this.$store.state.templateName id='batchText' :maxlength= 50  @blur="changeContName"> -->
            <p class='first'><b>合同名称：</b><input type="text" v-model="templateName" id='batchText' :maxlength= 50>
            <a class='select' @click="showBatchTemplate" style='cursor:pointer'>查看</a>

            <p class='second'><span>签署截止日期：</span>
              <el-date-picker
                style='width:138px;margin-right:20px'
                height='height:40px'
                v-model="value8"
                type="date"
                placeholder="选择日期"
                :editable= false
                :clearable= false
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
            </p>
          </h3>
        </div>
        <!-- 文件信息结束 -->
        <!-- 签署人设置开始 -->
        <div class="setting">
          <h2 class='settingInfo'>
            <img src="../../../../static/images/Contractsigning/settings.png" alt="">
            <p class='batchInfo'>
              <!-- <el-checkbox></el-checkbox>
              <b class='info'>短信通知</b>
              <el-checkbox></el-checkbox>
              <b class='info'>邮箱通知</b> -->
              <el-button type="primary" size="medium" @click="addSigner" icon="el-icon-circle-plus-outline">添加签署人</el-button>
              <el-dialog title="添加人员" :visible.sync="modifyPassword"  width="26%" top="30vh" custom-class='tempBatchOut' center @close="closeDialog('ruleForm')">
                <el-form :model="ruleForm" :rules="rules" ref='ruleForm' class="demo-ruleForm" size="medium">
                  <el-form-item label="姓名" :label-width="formLabelWidth" prop="signUserName">
                    <el-input v-model="ruleForm.signUserName" auto-complete="off" placeholder="请输入姓名" :maxlength = 20></el-input>
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
            :data="tableDate3"
            style="width: 100%;text-align:center"
            :header-cell-style="getRowClass"
            >
            <el-table-column
            label="签署人名称"
            style="text-align:center"
            width="300">
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
            label="操作"
            width="250">
            <template slot-scope="scope">
              <el-button @click="confirmEdit(scope.row)" type="primary"  size="mini" v-if="scope.row.edit">完&nbsp;&nbsp;成</el-button>
              <el-button @click="modifyClick(scope.row)" type="primary" size="mini" v-else v-show="editSign == false">修&nbsp;&nbsp;改</el-button>
              <el-button @click="deleteClick(scope.$index,tableDate3)" type="primary" size="mini" v-show="!scope.row.edit && editSign == false">删&nbsp;&nbsp;除</el-button>
            </template>
            </el-table-column>
          </el-table>
        </div>
    </div>
    <el-dialog title="合同详情图片" :visible.sync="dialVisible" custom-class="showBatchDialog">
      <div v-for="(item,index) in imgList" :key="index" >
          <img :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractUrl='+item" alt="" style='width:100%;'>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {validateMoblie,validateCard,TrimAll} from '../../../common/js/validate'
import cookie from '@/common/js/getTenant'
export default {
  name: 'batchSettings',
  data() {
      var validateName = (rule,value,callback) => {
        if (TrimAll(value) === ''){
          callback(new Error('请输入姓名'))
        } else if (TrimAll(value).length<2 || TrimAll(value).length > 15 ) {
          callback(new Error('姓名长度至少两位'))
        } else {
          callback()
        }
      }
      var validateIdCard = (rule,value,callback) => {
        if( this.$store.state.templateGenre == 'fillidcardreference' && value == ''){
          callback(new Error('身份证信息为必填项'))
        }else if (value !== '' && !validateCard(value)){
          callback(new Error('身份证格式错误'))
        }else {
          callback()
        }
      }
      var validatePhone = (rule,value,callback) => {
        var mobileArray = []
        if(this.tableDate3 != ''){
          for(var i=0;i<this.tableDate3.length;i++){
            mobileArray.push(this.tableDate3[i].mobile)
          }
        }
        if(value == ''){
          callback(new Error('请输入手机号'))
        }else if (value !== '' && !validateMoblie(value)){
          callback(new Error('手机号格式错误'))
        }else if (mobileArray.indexOf(value) != -1){
          callback(new Error('此手机号已添加'))
        }else if(value == cookie.getJSON('tenant')[0].mobile){
          callback(new Error('手机号不能与发起方手机号相同'))
        }else {
          callback()
        }
      }
      return {
        baseURL:this.baseURL.BASE_URL,
        value8: '',
        checked: true,
        falg:true,       //重复提交标示
        operateType:'', //数据回显标示
        operate:false,   // 添加签署人标示
        delSigner:true,       //删除联系人标示
        editSigner:true,
        load:false,
        modifyPassword: false,
       // centerDialogVisible:false,
        dialVisible:false,
        editSign:false,
        imgList:[],
        ruleForm:{
          signUserName:'',
          mobile:'',
          idCard:''
        },
        tableDate3: [],
        hasClick:false,
        formLabelWidth: '80px',
        rules: {
          signUserName: [
            { required: true, validator: validateName, trigger: 'blur' }
          ],
          idCard:[
            { required:false, validator: validateIdCard, trigger: 'blur'}
          ],
          mobile:[
            { required: true,  validator: validatePhone, trigger: 'blur' }
          ]
        },
        pickerOptions0: {
          disabledDate(time) {
            return  time.getTime() < Date.now();
          }
        },
       templateName:JSON.parse(sessionStorage.getItem('templateName'))
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
            if (this.tableDate3 == '' || this.tableDate3.length < 51){
              var obj = {}
              obj.signUserName = TrimAll(this.ruleForm.signUserName)
              obj.mobile = this.ruleForm.mobile
              obj.idCard = this.ruleForm.idCard
              obj.edit = false
              this.tableDate3.push(obj)
              this.resetForm(formName)
              this.modifyPassword = false
              this.operate = true
            } else {
              this.modifyPassword = false
              this.$message({
                showClose: true,
                message: '至多添加50位人员!',
                type: 'warning'
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
       changeContName (){
        var batchText = document.getElementById('batchText').value
        if(batchText == ''){
          this.$alert('您还没有填写合同名称!','签署', {
            confirmButtonText: '确定'
          });
          return false
        }
        this.$store.dispatch('template',{templateName:batchText,templateNo:this.$store.state.templateNo})
        sessionStorage.setItem('templateName', JSON.stringify(batchText))
        sessionStorage.setItem('templateNo', JSON.stringify(this.$store.state.templateNo))
      },
      showBatchTemplate () {
        this.$loading.show(); //显示
        var data =[];
        this.$http.get(process.env.API_HOST+'v1/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode + '/templateImage/'+this.$store.state.templateNo,{params: {"templateSpecificType":this.$store.state.templateGenre}}).then(function (res) {
          if(res.data.sessionStatus == '0'){
          this.$router.push('/Server')
        } else {
          for (let i = 0; i < res.data.list.length;i++) {
            let contractUrl = res.data.list[i]
            data[i] = contractUrl
            this.$loading.hide(); //隐藏
          }
        this.imgList = data
        }
      })
        this.dialVisible= true
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
      confirmEdit(row){     //完成修改
        var mobileArr = []
        if(this.tableDate3 != ''){
          for(var i=0;i<this.tableDate3.length;i++){
            mobileArr.push(this.tableDate3[i].mobile)
          }
        }
        var index = mobileArr.indexOf(row.mobile)
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
        } else if (row.mobile == cookie.getJSON('tenant')[0].mobile ){
          this.$alert('手机号不能与发起方手机号相同!','修改签署人', {
            confirmButtonText: '确定'
          })
        } else if( this.$store.state.templateGenre == 'fillidcardreference' && row.idCard == ''){
          this.$alert('身份证信息为必填项!','修改签署人', {
            confirmButtonText: '确定'
          })
        } else {
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
      batchTempCancel() {    //取消操作
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
        })
      },
      nextStepFit () { //下一步
        var batchText = document.getElementById('batchText').value
        if(batchText == ''){
          if(batchText == ''){
            this.$alert('您还没有填写合同名称!','签署', {
              confirmButtonText: '确定'
            });
            return false
          }
        }
        if(this.checked == false && this.value8 == ''){
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
        if( this.tableDate3 == ''){
          this.$alert('您还没有添加人员!','添加签署人', {
            confirmButtonText: '确定'
          });
        } else {
          this.load = true // 提交标示
          var names = ''
          var mobiles = ''
          var id_nums = ''
          var emails = ''
          var perpetualValid = ''

          for(var i = 0; i < this.tableDate3.length;i++ ){
            var name = this.tableDate3[i].signUserName
            var mobile = this.tableDate3[i].mobile
            var idCard = this.tableDate3[i].idCard
            var email = this.tableDate3[i].email
            names += name + ','
            mobiles += mobile + ','
            id_nums += idCard + ','
            emails += email + ','
          }

          names = names.substring(0, names.length-1)
          mobiles = mobiles.substring(0,mobiles.length-1)
          id_nums = id_nums.substring(0,id_nums.length-1)
          emails = emails.substring(0,emails.length-1)
          if ( this.checked == true ) {
            perpetualValid = '1'
          } else {
            perpetualValid = ''
          }
          if ( this.operateType !='' ){
            var zqUserContractTempVo = {
              "creater":cookie.getJSON('tenant')[1].interfaceCode,
              "operateType":this.operateType,
              "contractTempNo":this.$store.state.contractNo1,
              "contractName":TrimAll(this.templateName),
              "templateNo":this.$store.state.templateNo,
              "validTime":this.value8,
              "perpetualValid":perpetualValid,
              "names":names,
              "idCards":id_nums,
              "mobiles":mobiles,
              "emails":emails,
              "templateSpecificType":this.$store.state.templateGenre
            }
          } else {
            var zqUserContractTempVo = {
              "creater":cookie.getJSON('tenant')[1].interfaceCode,
              "contractName":TrimAll(this.templateName),
              "templateNo":this.$store.state.templateNo,
              "validTime":this.value8,
              "perpetualValid":perpetualValid,
              "names":names,
              "idCards":id_nums,
              "mobiles":mobiles,
              "emails":emails,
              "templateSpecificType":this.$store.state.templateGenre
            }
          }
          this.$http.post(process.env.API_HOST+'v1/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode + '/contractTemp',zqUserContractTempVo,{emulateJSON:true}).then(function (res) {
            if(res.data.sessionStatus == '0'){
              this.$router.push('/Server')
            } else {
            var contractNo = res.data.data
            if ( res.data.resultCode == 0) {
                this.$message({
                  showClose: true,
                  message: res.data.resultMessage,
                  type: 'success'
              })
              this.$store.dispatch('template',{templateName:this.templateName,templateNo:this.$store.state.templateNo})
              this.$store.dispatch('fileSuccess1',{contractNo:contractNo})
              this.$store.dispatch('templateType',{templateGenre:this.$store.state.templateGenre})
              sessionStorage.setItem('templateName', JSON.stringify(this.templateName))
              sessionStorage.setItem('templateNo', JSON.stringify(this.$store.state.templateNo))
              sessionStorage.setItem('contractNo', JSON.stringify(contractNo))
              sessionStorage.setItem('templateGenre',JSON.stringify(this.$store.state.templateGenre))
              this.$router.push('/batchInfo')
            } else {
              this.$alert('您还没有选择签署时间!','签署时间', {
              confirmButtonText: '确定'
              })
              this.load = false
            }
          }
          })

        }
      },
      addSigner(){

        if(this.editSigner == false){
          this.$alert('您还没有完成添加签署人操作','添加签署人',{
            confirmButtonText: '确定'
          })
          return false
        } else {
          this.modifyPassword = true
        }
      }
  },
  created() {

    var templateName = sessionStorage.getItem('templateName');
    var templateNo = sessionStorage.getItem('templateNo');
    var contractNo = sessionStorage.getItem('contractNo');
    var templateGenre = sessionStorage.getItem('templateGenre')
    var type = sessionStorage.getItem('type')
    if (templateName) {
      templateName = JSON.parse(templateName)
      if ( this.$store.state.templateName == ''){
        this.$store.state.templateName = templateName
      }
    }
    if (templateNo) {
      templateNo = JSON.parse(templateNo)
      if ( this.$store.state.templateNo == ''){
        this.$store.state.templateNo = templateNo
      }
    }
    if (templateGenre) {
      templateGenre = JSON.parse(templateGenre)
      if ( this.$store.state.templateGenre == ''){
        this.$store.state.templateGenre = templateGenre
      }
    }
    if (contractNo) {
      contractNo = JSON.parse(contractNo)
      if ( this.$store.state.contractNo1 == ''){
        this.$store.state.contractNo1 = contractNo
      }
    }
    if (type) {
      type = JSON.parse(type)
      if ( this.$store.state.type == ''){
        this.$store.state.type = type
      }
    }
    if ( type == 'back'){
      this.operate = true
      this.$http.get(process.env.API_HOST+'v1/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode + '/backContractTempSigner',{params: {"contractTempNo":this.$store.state.contractNo1,"operateType":this.$store.state.type}}).then(function (res) {
        var perpetualValid = res.data.perpetualValid;
        var validTime = res.data.validTime;
        var list = res.data.list!=null?res.data.list:[];
        this.operateType = res.data.operateType
        if(perpetualValid =="1"){
          this.checked = true
        }else {
          this.checked = false
        }
        if(validTime!=""){
          this.value8 = validTime
        }
        this.tableDate3 = list
      })
    }
  }
}
</script>
<style scoped>
  @import "../../../styles/batchInfo/batchSettings.css";
  @import "../../../common/styles/Tops.css";
  @import "../../../common/styles/SigningSteps.css";
</style>

<style>
  .first #batchText{
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
  .tempBatchOut{
    height:320px !important;
    width:400px !important;
    overflow-y: hidden !important;
  }
  .showBatchDialog{
  position: relative !important;
  -webkit-box-sizing: border-box !important;
  box-sizing: border-box !important;
  height: 800px !important;
  overflow-y: scroll !important;
}
</style>
