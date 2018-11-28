<!--我的账户->未激活前编辑二级账户-->
<template>
  <div class="EditChildAccounts">
    <div class="main" >

      <div class="container">

        <div class="content">

          <div class="content-body">

            <p class="title">我的账户</p>
            <span class="new-child-account">(编辑子账号)</span>
            <div class="border-bottom"  style="margin-top: 0"></div>

            <div class="account-fill" >

              <div class="show-info-list">
                <p style="font-size: 12px;color: red;padding-left: 30px;margin-bottom: 20px;">系统将会对子账号管理员进行实名认证，请确保管理员姓名、身份证号、手机账号主体一致。</p>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="account-ruleForm" size="medium">

                  <el-form-item label="管理员姓名" :label-width="formLabelWidth" prop="userName">
                    <el-input v-model="ruleForm.userName" auto-complete="off" placeholder="请输入管理员姓名" :maxlength= 10 disabled="disabled"></el-input>
                  </el-form-item>

                  <el-form-item label="账户名称" :label-width="formLabelWidth" prop="accountName">
                    <el-input v-model="ruleForm.accountName" auto-complete="off" placeholder="账户名称" :maxlength= 15 disabled="disabled"></el-input>
                  </el-form-item>

                  <el-form-item label="手机号码" :label-width="formLabelWidth" prop="mobile">
                    <el-input v-model="ruleForm.mobile" auto-complete="off" placeholder="请输入手机号码"  disabled="disabled"></el-input>
                  </el-form-item>

                  <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                    <el-input v-model="ruleForm.password"  auto-complete="off" placeholder="请输入密码" disabled="disabled" :minlength= 8 :maxlength= 16></el-input>
                  </el-form-item>


                  <el-form-item label="身份证号码" :label-width="formLabelWidth" prop="idCard">
                    <el-input v-model="ruleForm.idCard" auto-complete="off" placeholder="请输入身份证号码" disabled="disabled"></el-input>
                  </el-form-item>



                  <el-form-item label="联系邮箱" :label-width="formLabelWidth" prop="Email">
                    <el-input v-model="ruleForm.Email" auto-complete="off" placeholder="请输入联系邮箱" disabled="disabled"></el-input>
                  </el-form-item>


                </el-form>
              </div>

            </div>
          </div>

          <div class="content-body" style="margin-bottom:20px;background: #fff;padding-bottom:50px;margin-bottom: 35px;">
            <p class="title">分配模板</p>
            <span class="new-child-account" >(请为子账号分配可用模板)</span>
            <div class="border-bottom" style="margin-top: 0;"></div>

            <div class="child-template" >
              <div class="child-template-list" >

                <div class="single-list" v-if="(singleTemplateLength)||(batchTemplateLength)">

                  <h3>单次发起模板</h3>
                  <template>
                    <el-checkbox-group v-model="singleTemplate" >
                      <el-checkbox v-for="item in single" :label="item.templateNo" :key="item.templateNo" :checked="item.flag">{{item.name}}</el-checkbox>

                    </el-checkbox-group>

                  </template>


                </div>


                <div class="batch-list" v-if="(singleTemplateLength)||(batchTemplateLength)">
                  <h3>批量发起模板</h3>
                  <template>
                    <el-checkbox-group v-model="batchTemplate" >
                      <el-checkbox v-for="item in batch" :label="item.templateNo"   :key="item.templateNo" :checked="item.flag">{{item.name}}</el-checkbox>
                    </el-checkbox-group>


                  </template>


                </div>
                <div class="no-template" v-if="(!singleTemplateLength)&&(!batchTemplateLength)">
                  <img src="../../../../static/images/Account/no-template.png">
                  <p style="color: #999;">暂无模板</p>
                </div>

                <div class="fill-background"></div>


              </div>


            </div>

            <div class="agreement-content" >


              <div class="operate-buttons">
                <button class="quit" @click="quit('ruleForm')" href="javascript:void(0)">取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</button>
                <button class="submit"  @click="submitBtn('ruleForm')" href="javascript:void(0)" :disabled="once">提交</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>
<script>

  import Account from "../Account"
  import md5 from 'js-md5'
  import {validateMoblie,validateEmail,TrimAll,validatePassWord,validateCard} from '@/common/js/validate'

  import {updateAccount, getAccountInfo} from '@/api/account'

  export default {
    name: 'AddChildAccounts',
    component:{
      Account
    },
    data() {
      // 校验二级账号姓名
      let validateAccountName = (rule,value,callback) => {
        if (TrimAll(value) === ''){
          callback(new Error('请输入姓名'))
        } else if (value.length<2 || value.length > 15 ) {
          callback(new Error('姓名长度2-15位'))
        } else {
          callback()
        }
      }
      // 校验二级账号管理员账户
      let validateUserName = (rule,value,callback) => {
        if (TrimAll(value) === ''){
          callback(new Error('请输入管理员账户'))
        } else if (value.length<2 || value.length > 15 ) {
          callback(new Error('管理员账户格式错误'))
        } else {
          callback()
        }
      }
      //校验身份证号
      let validateIdCard = (rule,value,callback) => {
        if (TrimAll(value) === ''){
          callback(new Error('请输入身份证号'))
        } else if (value !== '' && !validateCard(value)){
          callback(new Error('身份证格式输入错误'))
        } else {
          callback()
        }
      }
      // 校验密码
      let validateChildPassWord = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value.length < 8 || value.length > 16) {
          callback(new Error('密码长度必须为8-16位'))
        }else {
          callback();
        }
      }
      // 校验手机号
      let validateChildMobile = (rule,value,callback) => {

        if(value === ''){
          callback(new Error('请输入手机号'))
        } else if (!validateMoblie(value)){

          callback(new Error('手机号格式错误'))
        } else {
          callback()
        }
      }
      //校验邮箱
      let validateChildEmail=(rule,value,callback)=>{
        if (value === '') {
          callback(new Error('请输入邮箱'));
        }else if (value !== '' && !validateEmail(value)){
          callback(new Error('邮箱账号格式错误'))
        } else {
          callback()
        }
      }

      return{
        ruleForm: {
          accountName:'',  //管理员姓名
          userName:'',//账户名称
          idCard:'', //省份证号
          mobile:'' ,//手机号码
          password:'', //密码
          Email:'',  //邮箱
        },
        formLabelWidth:'120px',
        editAccountCode:'',
        checkAll: false,
        singleTemplate: [],
        batchTemplate: [],
        single: [],
        batch: [],
        isIndeterminate: true,
        agree:false,  //同意协议
        dialogAgreement:false, //点击同意协议协议弹窗,
        interfaceCode:sessionStorage.getItem("interfaceCode"), //session里存储interfaceCode
        rules:{
          accountName: [
            { required: true, validator: validateAccountName, trigger: 'blur' }
          ],
          userName: [
            { required: true, validator: validateUserName, trigger: 'blur' }
          ],
          password: [
            { required: true, validator: validateChildPassWord, trigger: 'blur' }
          ],
          Email:[
            {required:true,validator:validateChildEmail,trigger: 'blur'}
          ],
          idCard:[
            { required: true,validator: validateIdCard, trigger: 'blur'}
          ],
          mobile:[
            { required: true, validator: validateChildMobile, trigger: 'blur' }
          ],
        },
        once:false,   //按钮单次点击
        date:'',
        enterpriseName:sessionStorage.getItem("enterpriseName"),  //企业名称
        singleTemplateLength:false, //单次模板书否显示
        batchTemplateLength:false,     //批量模板是否显示
        fullscreenLoading: false,
      }
    },
    methods: {
      changEvent(){
        this.$http.get(process.env.API_HOST + "v1.5/user/getDate").then(function(res) {

          this.date=res.bodyText;

        });
      },
      // 取消
      quit(formName){
        this.$refs[formName].resetFields();
        this.$router.push('/Account');
      },

      //提交事件
      submitBtn(formName){

          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$loading.show()
              this.once = true;
              this.once=true;//提交按钮不可重复点击
              let pass = md5(this.ruleForm.password); //密码MD5加密
              let batchTemplate=JSON.stringify(this.batchTemplate);  //批量模板
              let singleTemplate=JSON.stringify(this.singleTemplate);  //单次发起模板
              // let batchTemplate1=batchTemplate.substr(2,batchTemplate.length-3);
              let batchTemplate1=batchTemplate.replace("[",",").replace("]","").replace(/\"/g,"");
              let singleTemplate1=singleTemplate.replace("[",",").replace("]","").replace(/\"/g,"");
              let templates=(batchTemplate1+singleTemplate1).substr(1);
              let manageName=sessionStorage.getItem("authName")
              if((this.batchTemplate.length+this.singleTemplate.length)=='1'){
                templates=templates.replace(",", "");
              }
              if((this.batchTemplate.length+this.singleTemplate.length)=='0'){
                templates='';
              }
              updateAccount(this.interfaceCode,{
                accountName: this.ruleForm.accountName,  //管理员姓名
                userName: this.ruleForm.userName,            //账户名称
                idCard: this.ruleForm.idCard,                  //省份证号
                mobile: this.ruleForm.mobile,              //手机号码
                password: pass,                          //密码
                accountCode:this.editAccountCode,                  //账户编号
                email:this.ruleForm.Email,                    //邮箱
                templates: templates,                                //分配模板
                company_name: this.enterpriseName,
                manageName:manageName,

              }, {emulateJSON: true}).then(res => {
                this.fullscreenLoading = true;
                setTimeout(() => {
                  this.fullscreenLoading = false;
                }, 2000);

                if (res.data.resultCode == '1') {
                  this.$message({
                    message: '恭喜你，二级账号编辑成功',
                    type: 'success'
                  });
                  this.$nextTick(function () {
                    this.$loading.hide();
                  })
                  this.$router.push("/Account");
                } else {
                  this.$nextTick(function () {
                    this.$loading.hide();
                  })
                  this.$message({
                    showClose: true,
                    message: res.data.resultMessage,
                    type: 'error'
                  })
                }
              }).catch(error=>{

              })

            }else{
              this.$message({
                showClose: true,
                message: '您你未完成子账户基本信息编辑，请您先完成子账户基本信息编辑!',
                type: 'error'
              })
            }
          })

      },

    },
    created() {
      let accountCode = sessionStorage.getItem("subAccountCode");
      let params={
        accountCode: accountCode,        //账户编号
      }
      getAccountInfo(this.interfaceCode,
        params
      ).then(res => {
        //
        if (res.data.resultCode == '1'){
            this.ruleForm.accountName = res.data.data.accountName;            //账户名称
            this.ruleForm.Email= res.data.data.email;                    //邮箱
            this.ruleForm.mobile= res.data.data.mobile;                    //手机号
            this.ruleForm.userName= res.data.data.userName;                    //管理员姓名
            this.ruleForm.idCard= res.data.data.idCard;                    //身份证号
            this.ruleForm.password="********";                    //管理员姓名
            this.editAccountCode = res.data.data.accountCode
            let singleArray=[];
            let batchArray=[];
            let data=res.data.dataList;

          if(res.data.dataList){
            for(let i=0;i<data.length;i++){
              if(data[i].templateSpecies=='single'){
                singleArray.push(data[i]);
              }else {
                batchArray.push(data[i]);
              }
            }
            this.single=singleArray;
            this.batch=batchArray;
            if(this.single.length==0){
              this.singleTemplateLength=false
            }else{
              this.singleTemplateLength=true
            }
            if(this.batch.length==0){
              this.batchTemplateLength=false
            }else{
              this.batchTemplateLength=true
            }
          }

        }
      })


    }
  }
</script>

<style lang="stylus">
  @import "../../../styles/Account/ChildAccount.styl";
  .el-checkbox-group>.el-checkbox{
    display:block !important;
    height: 40px !important;

    overflow: hidden!important;
    vertical-align: middle;
    margin-left: 0!important;
  }
  .single-list>.el-checkbox-group{
    padding-left: 20px;
  }
  .batch-list>.el-checkbox-group {
    padding-left: 20px;
    border-left: 1px solid #4091fb;
  }
  .account-ruleForm>.el-form-item{
    width: 525px;
    display: inline-block;
    height: 36px;
  }
  .account-ruleForm>.el-form-item>.el-form-item__content>.el-form-item__error{
    margin-left: 20px;
  }
  .account-ruleForm>.el-form-item>.el-form-item__content>.el-input>.el-input__inner{
    width:330px;
    margin-left: 20px;
  }
  .content-body>p.title{
    background: url("../../../../static/images/Common/title.png") no-repeat;
  }

  b.agreement-sign{
    color: #424242;
    font-size: 14px;
  }
  b.agreement-sign>a{
    padding-left: 10px;
    color: #4091fb;
    cursor: pointer;
  }

</style>
