<!--我的账户->未激活前编辑二级账户-->
<template>
  <div class="EditChildNoActives">
    <div class="main" >

      <div class="container">
        <div class="content">
          <div class="content-body">

            <p class="title">我的账户</p>
            <span class="new-child-account">(编辑子账号)</span>
            <div class="border-bottom"  style="margin-top: 0"></div>

            <div class="account-fill" >

              <div class="show-info-list">

                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" size="medium">

                  <el-form-item label="管理员姓名" :label-width="formLabelWidth" prop="userName">
                    <el-input v-model="ruleForm.userName" auto-complete="off" placeholder="请输入管理员姓名" :maxlength= 10></el-input>
                  </el-form-item>

                  <el-form-item label="账户名称" :label-width="formLabelWidth" prop="accountName">
                    <el-input v-model="ruleForm.accountName" auto-complete="off" placeholder="账户名称" :maxlength= 18></el-input>
                  </el-form-item>

                  <el-form-item label="身份证号码" :label-width="formLabelWidth" prop="idCode">
                    <el-input v-model="ruleForm.idCode" auto-complete="off" placeholder="请输入身份证号码" ></el-input>
                  </el-form-item>

                  <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                    <el-input v-model="ruleForm.password" type="password" auto-complete="off" placeholder="请输入密码" :maxlength= 8 :minlength= 16 ></el-input>
                  </el-form-item>

                  <el-form-item label="手机号码" :label-width="formLabelWidth" prop="mobile">
                    <el-input v-model="ruleForm.mobile" auto-complete="off" placeholder="请输入手机号码" :maxlength= 11 :minlength= 11></el-input>
                  </el-form-item>

                  <el-form-item label="联系邮箱" :label-width="formLabelWidth" prop="Email">
                    <el-input v-model="ruleForm.Email" auto-complete="off" placeholder="请输入联系邮箱" ></el-input>
                  </el-form-item>

                </el-form>
              </div>

            </div>
          </div>

          <div class="content-body">
            <p class="title">分配模板</p>
            <span class="new-child-account" >(请为子账号分配可用模板)</span>
            <div class="border-bottom" style="margin-top: 0;"></div>

            <div class="child-template" >
              <div class="child-template-list">

                <div class="single-list" >

                  <h3>单次发起模板</h3>
                  <template>
                    <el-checkbox-group v-model="singleTemplate" >
                      <el-checkbox v-for="item in single" :label="item.templateNo"  :key="item.templateNo" :checked="item.flag">{{item.name}}</el-checkbox>

                    </el-checkbox-group>
                  </template>
                </div>

                <div class="batch-list" >
                  <h3>批量发起模板</h3>
                  <template>
                    <el-checkbox-group v-model="batchTemplate" >
                      <el-checkbox v-for="item in batch" :label="item.templateNo"   :key="item.templateNo" :checked="item.flag">{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                  </template>
                </div>

                <div class="fill-background"></div>

                <!--<div class="empty-template" >-->
                <!--<img src="../../../../../static/images/Confirmation/Account/default-template.png">-->
                <!--<p class="tips">喔喔！暂时没有任何模板信息哦</p>-->
                <!--</div>-->
              </div>


            </div>

            <div class="agreement-content" >
              <template>
                <!-- `checked` 为 true 或 false -->
                <el-checkbox v-model="agree" name="type" @change="changEvent">确认签署</el-checkbox>
                <b  class="agreement-sign">
                  <a  @click="dialogAgreement = true" href="javascript:void(0)">
                    《电子合同子账号管理认证授权书》
                  </a>
                </b>
              </template>
              <el-dialog
                :visible.sync="dialogAgreement"
                width="30%"
                center>
                <div class="dialog-container">
                  <div class="dialog-header">单位授权书范本</div>
                  <div class="dialog-body">
                    <div class="content">

                      <p>致：北京众签科技有限公司</p>

                      兹授权我公司员工：<span ></span>，身份证号：<span ></span> ，性别：男  ，去贵单位办理关于的一切相关事宜。
                      在授权期间，被授权人与贵公司所签署的一切文件，我公司都给予认可，并承担可能由此产生的各种法律责任。我公司员工在办理期间，请予以配合!谢谢

                      授权期限：（授权人填充）

                      被授权人签名：（手写签名）

                      公司名称：*******（自动填充）

                      日    期：{{date}}（当前日期）

                    </div>
                  </div>

                </div>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogAgreement = false">取 消</el-button>
                  <el-button type="primary" @click="dialogAgreement = false">确 定</el-button>
                </div>
              </el-dialog>

              <div class="buttons">
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
  import cookie from '@/common/js/getTenant'
  import server from "@/api/url";
  export default {
    name: 'EditChildNoActives',
    component:{
      Account
    },
    data() {
      // 校验二级账号姓名
      var validateAccountName = (rule,value,callback) => {
        if (TrimAll(value) === ''){
          callback(new Error('请输入姓名'))
        } else if (value.length<2 || value.length > 15 ) {
          callback(new Error('姓名长度2-15位'))
        } else {
          callback()
        }
      }
      // 校验二级账号管理员账户
      var validateUserName = (rule,value,callback) => {
        if (TrimAll(value) === ''){
          callback(new Error('请输入管理员账户'))
        } else if (value.length<2 || value.length > 15 ) {
          callback(new Error('管理员账户格式错误'))
        } else {
          callback()
        }
      }
      //校验身份证号
      var validateIdCard = (rule,value,callback) => {
        if (TrimAll(value) === ''){
          callback(new Error('请输入身份证号'))
        } else if (value !== '' && !validateCard(value)){
          callback(new Error('身份证格式输入错误'))
        } else {
          callback()
        }
      }
      // 校验密码
      var validateChildPassWord = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value.length < 8 || value.length > 16) {
          callback(new Error('密码长度必须为8-16位'))
        } else if (!validatePassWord(value)){
          callback(new Error('密码格式为数字+字母'))
        }else {
          callback();
        }
      }
      // 校验手机号
      var validateChildMobile = (rule,value,callback) => {

        if(value === ''){
          callback(new Error('请输入手机号'))
        } else if (!validateMoblie(value)){

          callback(new Error('手机号格式错误'))
        } else {

          let params = {
            username: this.ruleForm.mobile
          };
          server.verficate(params).then(res => {
            if (res.data === 0) {
              this.ruleForm.password="test111111";
              this.dis=true;

            } else {

            }
          }).catch(error => {

          })

          callback()
        }
      }
      //校验邮箱
      var validateChildEmail=(rule,value,callback)=>{
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
          idCode:'', //省份证号
          mobile:'' ,//手机号码
          password:'', //密码
          Email:'',  //邮箱
        },
        formLabelWidth:'120px',
        checkAll: false,
        singleTemplate: [],
        batchTemplate: [],
        single: [],
        batch: [],
        isIndeterminate: true,
        agree:false,  //同意协议
        dialogAgreement:false, //点击同意协议协议弹窗,
        interfaceCode:cookie.getJSON("tenant")[1].interfaceCode, //cookie里存储interfaceCode
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
          idCode:[
            { required: true,validator: validateIdCard, trigger: 'blur'}
          ],
          mobile:[
            { required: true, validator: validateChildMobile, trigger: 'blur' }
          ],
        },
        once:false ,   //按钮单次点击
        date:"" ,
      }
    },
    methods: {
      changEvent(){
        this.$http.get(process.env.API_HOST + "v1.5/user/getDate").then(function(res) {
          console.log(res.bodyText)

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
        this.server=false;
        if(this.agree) {
          this.$refs[formName].validate((valid) => {

            if (valid) {
              this.once = true;
              let pass = md5(this.ruleForm.password);
              let batchTemplate = JSON.stringify(this.batchTemplate);
              let singleTemplate = JSON.stringify(this.singleTemplate);

              // let batchTemplate1=batchTemplate.substr(2,batchTemplate.length-3);
              let batchTemplate1 = batchTemplate.replace("[", ",").replace("]", "").replace(/\"/g, "");
              let singleTemplate1 = singleTemplate.replace("[", ",").replace("]", "").replace(/\"/g, "");
              let templates = (batchTemplate1 + singleTemplate1).substr(1);
              let accountCode = sessionStorage.getItem("accountCode");
              let enterpriseName = sessionStorage.getItem("enterpriseName")
              this.$http.post(process.env.API_HOST + 'v1.5/tenant/' + this.interfaceCode + '/updateAccount', {
                accountName: this.ruleForm.accountName,  //管理员姓名
                userName: this.ruleForm.userName,            //账户名称
                idCard: this.ruleForm.idCode,                  //省份证号
                mobile: this.ruleForm.mobile,              //手机号码
                password: pass,                 //密码
                accountCode: accountCode,        //账户编号
                email: this.ruleForm.Email,                    //邮箱
                templates: templates,                                //分配模板
                company_name: enterpriseName

              }, {emulateJSON: true}).then(res => {
                if (res.data.resultCode == '1') {
                  this.$message({
                    message: '恭喜你，二级账号编辑成功',
                    type: 'success'
                  });
                } else {
                  this.$message({
                    showClose: true,
                    message: res.data.resultMessage,
                    type: 'error'
                  })
                }
              })

            }
          })

        }else{
          this.$alert('您还确定签署《电子合同子账号管理认证授权书》!', '确定签署',{
            confirmButtonText: '确定'
          });
          return false
        }

      },

    },
    created() {
      let accountCode = sessionStorage.getItem("accountCode");

      this.$http.get(process.env.API_HOST + 'v1.5/tenant/' + this.interfaceCode + '/getAccountInfo', {
        params: {
          accountCode: accountCode,        //账户编号
        }
      }).then(res => {

        //
        if (res.data.resultCode == '1'){

          this.ruleForm.accountName = res.data.data.accountName;            //账户名称

          this.ruleForm.Email= res.data.data.email;                    //邮箱

          let singleArray=[];
          let batchArray=[];

          for(let i=0;i<res.data.dataList.length;i++){

            if(res.data.dataList[i].templateSpecies=='single'){
              singleArray.push(res.data.dataList[i]);
            }else {
              batchArray.push(res.data.dataList[i]);
            }
          }
          this.single=singleArray;
          this.batch=batchArray;
        }
      })


    }


  }
</script>

<style lang="stylus">
  @import "../../../../styles/Confirmation/Account/ChildAccount.styl";
  .single-list,.batch-list{
    width: 470px;
    float: left;
  }
  .batch-list{
    /*border-left: 1px solid #22a7ea;*/
  }
  .single-list>h3,.batch-list>h3{
    color: #22a7ea;
    margin: 20px 0 10px 20px;
  }

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
    border-left: 1px solid #22a7ea;
  }
  .demo-ruleForm>.el-form-item{
    width: 50%;
    float: left;
  }
  .demo-ruleForm>.el-form-item>.el-form-item__label{
    /*clear: both !important;*/
  }

  .demo-ruleForm>.el-form-item{
    /*width: 50%;*/
  }
  .demo-ruleForm>.el-form-item>.el-form-item__content>.el-form-item__error{
    margin-left: 20px;

  }
  .demo-ruleForm>.el-form-item>.el-form-item__content>.el-input>.el-input__inner{
    width:330px;
    margin-left: 20px;
  }
  .content-body>p.title{
    background: url("../../../../../static/images/Common/title.png") no-repeat;
  }
  .align-left{
    text-align: left;
    margin-left: 60px;
  }
  .align-right{
    text-align:right;
  }
  b.agreement-sign{
    color: #424242;
    font-size: 14px;
  }
  b.agreement-sign>a{
    padding-left: 10px;
    color: #22a7ea;
    cursor: pointer;
  }

</style>
