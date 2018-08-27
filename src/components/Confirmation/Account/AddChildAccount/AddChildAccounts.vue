<!--我的账户->新增二级账户-->
<template>
  <div class="AddChildAccounts">
    <div class="main" >

      <div class="container">
        <div class="content">
          <div class="content-body">

            <p class="title">我的账户</p>
            <span class="new-child-account">(新增子账号)</span>
            <div class="border-bottom"  style="margin-top: 0"></div>

            <div class="account-fill" >

              <div class="show-info-list">


                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" size="medium">

                  <el-form-item label="管理员姓名" :label-width="formLabelWidth" prop="accountName">
                    <el-input v-model="ruleForm.accountName" auto-complete="off" placeholder="请输入管理员姓名" :maxlength= 10></el-input>
                  </el-form-item>

                  <el-form-item label="账户名称" :label-width="formLabelWidth" prop="administrators">
                    <el-input v-model="ruleForm.administrators" auto-complete="off" placeholder="账户名称" :maxlength= 18></el-input>
                  </el-form-item>

                  <el-form-item label="身份证号码" :label-width="formLabelWidth" prop="ID">
                    <el-input v-model="ruleForm.ID" auto-complete="off" placeholder="请输入身份证号码" :maxlength= 18></el-input>
                  </el-form-item>

                  <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                    <el-input v-model="rule.Form.password"  auto-complete="off" placeholder="请输入密码" ></el-input>
                  </el-form-item>

                  <el-form-item label="手机号码" :label-width="formLabelWidth" prop="phone">
                    <el-input v-model="ruleForm.phone" auto-complete="off" placeholder="请输入手机号码" :maxlength= 11 :minlength= 11></el-input>
                  </el-form-item>

                  <el-form-item label="联系邮箱" :label-width="formLabelWidth" prop="Email">
                    <el-input v-model="ruleForm.Email" auto-complete="off" placeholder="请输入联系邮箱" :maxlength= 11></el-input>
                  </el-form-item>


                </el-form>
              </div>


              <!--<div class="show-info-list">-->
              <!--<div class="info-list align-right">-->
              <!--<span>管理员姓名</span>-->
              <!--<el-input-->
              <!--:maxlength='200'-->
              <!--style="width:320px;height:22px;margin-left: 15px"-->
              <!--placeholder="请输入管理员姓名"-->
              <!--v-model="accountName">-->
              <!--</el-input>-->
              <!--</div>-->

              <!--<div class="info-list align-left" >-->
              <!--<span>账户名称 </span>-->
              <!--<el-input-->
              <!--:maxlength='200'-->
              <!--style="width:320px;height:22px;margin-left: 15px"-->
              <!--placeholder="请输入账户名称"-->
              <!--v-model="administrators">-->
              <!--</el-input>-->
              <!--</div>-->

              <!--<div class="info-list align-right" >-->
              <!--<span>身份证号 </span>-->
              <!--<el-input-->
              <!--:maxlength='200'-->
              <!--style="width:320px;height:22px;margin-left: 15px"-->
              <!--placeholder="请输入身份证号"-->
              <!--v-model="ID"-->
              <!--@blur="validateCard"-->
              <!--&gt;-->
              <!--</el-input>-->
              <!--</div>-->
              <!--<div class="info-list align-left" >-->
              <!--<span>输入密码 </span>-->
              <!--<el-input-->
              <!--:maxlength='200'-->
              <!--style="width:320px;height:22px;margin-left: 15px"-->
              <!--placeholder="请输入密码"-->
              <!--v-model="password"-->

              <!--&gt;-->
              <!--</el-input>-->
              <!--</div>-->

              <!--<div class="info-list align-right" >-->
              <!--<span>手机号码 </span>-->
              <!--<el-input-->
              <!--:maxlength='200'-->
              <!--style="width:320px;height:22px;margin-left: 15px"-->
              <!--placeholder="请输入手机号码"-->
              <!--v-model="phone"-->
              <!--@blur="agentMobile"-->
              <!--&gt;-->
              <!--</el-input>-->
              <!--</div>-->

              <!--<div class="info-list align-left" >-->
              <!--<span>联系邮箱 </span>-->
              <!--<el-input-->
              <!--:maxlength='200'-->
              <!--style="width:320px;height:22px;margin-left: 15px"-->
              <!--placeholder="请输入联系邮箱"-->
              <!--v-model="Email"-->
              <!--@blur="VaildEmail">-->
              <!--</el-input>-->
              <!--</div>-->

              <!--</div>-->

            </div>
          </div>

          <div class="content-body">
            <p class="title">分配模板</p>
            <span class="new-child-account" >(请为子账号分配可用模板)</span>
            <div class="border-bottom" style="margin-top: 0;"></div>

            <div class="child-template" >
              <div class="child-template-list">
                <div class="list-item" >

                  <template>

                    <el-checkbox-group v-model="checkedCities" >
                      <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
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

                      兹授权我公司员工：<span v-text="accountName"></span>，身份证号：<span v-text="ID"></span> ，性别：男  ，去贵单位办理关于的一切相关事宜。
                      在授权期间，被授权人与贵公司所签署的一切文件，我公司都给予认可，并承担可能由此产生的各种法律责任。我公司员工在办理期间，请予以配合!谢谢

                      授权期限：（授权人填充）

                      被授权人签名：（手写签名）

                      公司名称：*******（自动填充）

                      日    期：2018-07-13（当前日期）

                    </div>
                  </div>

                </div>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogAgreement = false">取 消</el-button>
                  <el-button type="primary" @click="dialogAgreement = false">确 定</el-button>
                </div>
              </el-dialog>

              <div class="buttons">
                <!--<a class="quit" @click="quit('ruleForm')" href="javascript:void(0)">取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</a>-->
                <a class="submit"  @click="submitBtn" href="javascript:void(0)">提交</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>
<script>
  const cityOptions = ['模板11111', '模板222222'];
  import Account from "../Account"

  import {validateMoblie,validateEmail,TrimAll,validatePassWord,validateCard} from '@/common/js/validate'
  export default {
    name: 'AddChildAccounts',
    component:{
      Account
    },
    data() {
      // 校验二级账号姓名
      var validateUserName = (rule,value,callback) => {
        if (TrimAll(value) === ''){
          callback(new Error('请输入姓名'))
        } else if (value.length<2 || value.length > 15 ) {
          callback(new Error('姓名长度2-15位'))
        } else {
          callback()
        }
      }

      // 校验二级账号管理员账户
      var validateAdministrators = (rule,value,callback) => {
        if (TrimAll(value) === ''){
          callback(new Error('请输入姓名'))
        } else if (value.length<2 || value.length > 15 ) {
          callback(new Error('管理员账户'))
        } else {
          callback()
        }
      }

      //校验身份证号
      var validateIdCard = (rule,value,callback) => {
        if (TrimAll(value) === ''){
          callback(new Error('请输入身份证号'))
        } else if (value !== '' && !validateCard(value)){
          callback(new Error('身份证格式错误'))
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
        var mobileArray = []
        if(value === ''){
          callback(new Error('请输入手机号'))
        } else if (value !== '' && !validateMoblie(value)){
          callback(new Error('手机号格式错误'))
        } else if (mobileArray.indexOf(value) != -1){
          callback(new Error('此手机号已添加'))
        } else if (value == cookie.getJSON('tenant')[0].mobile){
          callback(new Error('手机号不能与一级账号手机号相同'))
        } else {
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
          administrators:'',//账户名称
          ID:'', //省份证号
          phone:'' ,//手机号码
          password:'', //密码
          Email:'',  //邮箱
        },
        formLabelWidth:'120px',
        checkAll: false,
        checkedCities: [],
        cities: cityOptions,
        isIndeterminate: true,
        agree:'',  //同意协议
        dialogAgreement:false, //点击同意协议协议弹窗,
        rules: {
          accountName: [
            { required: true, validator: validateUserName, trigger: 'blur' }
          ],
          administrators: [
            { required: true, validator: validateAdministrators, trigger: 'blur' }
          ],
          password: [
            { required: true, validator: validateChildPassWord, trigger: 'blur' }
          ],

          Email:[
            {required:true,validator:validateChildEmail,trigger: 'blur'}
          ],

          ID:[
            { required: true,validator: validateIdCard, trigger: 'blur'}
          ],
          phone:[
            { required: true, validator: validateChildMobile, trigger: 'blur' }
          ],
        },
      }
    },
    methods: {
      changEvent(){

      },
      // 取消
      quit(formName){
        this.$refs[formName].resetFields();
        this.$router.push('/Account');
      },

      //提交事件
      submitBtn(){


      },
      //校验姓名
      validateUserName() {
        if( this.userName == ''){
          this.$message({
            showClose: true,
            message: '姓名（必填项）',
            type: 'warning'
          })
          return false
        }
      },

    },
    created() {

    }
  }
</script>

<style lang="stylus">
  @import "../../../../styles/Confirmation/Account/AddChildAccount.styl";
  .el-checkbox-group>.el-checkbox{
    display: inline-block !important;
    height: 40px !important;
    float: left !important;
    width: 120px !important;
    overflow: hidden!important;
    vertical-align: middle;
  }
  .el-checkbox-group>.el-checkbox:first-child{
    margin-left: 30px!important;
  }
  .el-checkbox+.el-checkbox {
    margin-left:20px!important;

  }
  .demo-ruleForm>.el-form-item,.demo-ruleForm>.el-form-item>el-form-item__content{
    float: left;
  }
  .demo-ruleForm>.el-form-item{
    width: 50%;
  }
  .demo-ruleForm>.el-form-item>.el-form-item__content{
    margin-left: 20px;
    float: left;
  }
  .demo-ruleForm>.el-form-item>.el-form-item__content>.el-input>.el-input__inner{
    width:330px;
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
