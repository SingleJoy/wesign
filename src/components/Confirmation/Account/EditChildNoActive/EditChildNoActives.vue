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
                <p style="font-size: 12px;color: red;padding-left: 30px;margin-bottom: 20px;">系统将会对子账号管理员进行实名认证，请确保管理员姓名、身份证号、手机账号主体一致。</p>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="account-ruleForm" size="medium">

                  <el-form-item label="管理员姓名" :label-width="formLabelWidth" prop="userName">
                    <el-input v-model="ruleForm.userName" auto-complete="off" placeholder="请输入管理员姓名" :maxlength= 10></el-input>
                  </el-form-item>

                  <el-form-item label="账户名称" :label-width="formLabelWidth" prop="accountName">
                    <el-input v-model="ruleForm.accountName" auto-complete="off" placeholder="账户名称" :maxlength= 15></el-input>
                  </el-form-item>



                  <el-form-item label="手机号码" :label-width="formLabelWidth" prop="mobile">
                    <el-input v-model="ruleForm.mobile" auto-complete="off" placeholder="请输入手机号码" :maxlength= 11 :minlength= 11 ></el-input>

                  </el-form-item>

                  <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                    <el-input v-model="ruleForm.password" type="password" auto-complete="off" placeholder="请输入密码" :minlength= 8 :maxlength= 16 :disabled="dis" id="password"></el-input>
                    <el-tooltip class="item" effect="dark" content="当前手机号已在平台注册，密码自动填充" placement="right"  v-show="showToolTip">

                      <el-button style="position: absolute;top:-12px;right:-15px;border:none;padding: 20px;"><i class="el-icon-question" style="font-size: 25px;color: red;"></i></el-button>
                    </el-tooltip>
                  </el-form-item>

                  <el-form-item label="身份证号码" :label-width="formLabelWidth" prop="idCode">
                    <el-input v-model="ruleForm.idCode" auto-complete="off" placeholder="请输入身份证号码" ></el-input>
                  </el-form-item>


                  <el-form-item label="联系邮箱" :label-width="formLabelWidth" prop="Email">
                    <el-input v-model="ruleForm.Email" auto-complete="off" placeholder="请输入联系邮箱" ></el-input>
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
                  <div class="no-singleTemplate-list" v-if="(!singleTemplateLength)&&(batchTemplateLength)"><img src="../../../../../static/images/Confirmation/Account/no-template.png"></div>

                </div>



                <div class="batch-list" v-if="(singleTemplateLength)||(batchTemplateLength)">
                  <h3>批量发起模板</h3>
                  <template>
                    <el-checkbox-group v-model="batchTemplate" >
                      <el-checkbox v-for="item in batch" :label="item.templateNo"   :key="item.templateNo" :checked="item.flag">{{item.name}}</el-checkbox>
                    </el-checkbox-group>


                  </template>

                  <div class="no-batchTemplate-list" v-if="(singleTemplateLength)&&(!batchTemplateLength)"><img src="../../../../../static/images/Confirmation/Account/no-template.png"></div>

                </div>
                <div class="no-template" v-if="(!singleTemplateLength)&&(!batchTemplateLength)">
                  <img src="../../../../../static/images/Confirmation/Account/no-template.png">
                  <p style="color: #999;">暂无模板</p>
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

                      <p style="text-align: center;font-size: 16px;font-weight: bold;">电子合同子账号管理认证授权书</p>

                      <br/>
                      <p>致：北京众签科技有限公司</p>

                      <p><span style="padding:0 10px;"></span>兹授权我公司员工：{{ruleForm.userName}}            ，身份证号：{{ruleForm.idCode}}                   ，去贵单位办理与电子合同服务有关的全部事宜，具体权限包括：</p>

                      <p> 1)可以签署本子账号发起的合同，不能签署主账号和其他子账号的待签署的合同；</p>

                      <p> 2)管理本子账号发起的合同（查看、下载、延期）；</p>

                      <p>在授权期间，被授权人与贵公司所签署的一切文件，我公司都给予认可，并承担可能由此产生的各种法律责任。我公司员工在办理期间，请予以配合，谢谢！</p>
                      <br/>
                      <p>被授权人签名：</p>
                      <br/>
                      <p> 公司名称：{{enterpriseName}}</p>
                      <br/>
                      <p> 日    期:{{date}}</p>

                    </div>
                  </div>

                </div>

              </el-dialog>

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
              document.getElementById('password').focus()
              this.ruleForm.password="test111111";
              this.dis=true;
              this.showToolTip=true;

            } else {
              this.showToolTip=false;
              this.dis=false;
              // this.ruleForm.password='';
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
        interfaceCode:sessionStorage.getItem("interfaceCode"), //cookie里存储interfaceCode
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
        enterpriseName:sessionStorage.getItem("enterpriseName"),  //企业名称
        dis:false,
        showToolTip:false,
        singleTemplateLength:false, //单次模板书否显示
        batchTemplateLength:false     //批量模板是否显示
      }
    },
    methods: {
      changEvent(){
        this.$http.get(process.env.API_HOST + "v1.5/user/getDate").then(function(res) {
          //   console.log(res.bodyText)

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
        console.log(this.batchTemplate+this.singleTemplate)
        if(this.agree) {
          this.$refs[formName].validate((valid) => {

            if (valid) {

              this.once = true;
              let pass = md5(this.ruleForm.password);
              let batchTemplate=this.batchTemplate;  //批量模板
              let singleTemplate=this.singleTemplate;  //单次发起模板

              // let batchTemplate1=batchTemplate.substr(2,batchTemplate.length-3);
              // let batchTemplate1 = batchTemplate.replace("[", ",").replace("]", "").replace(/\"/g, "");
              // let singleTemplate1 = singleTemplate.replace("[", ",").replace("]", "").replace(/\"/g, "");
              let templates = batchTemplate + singleTemplate;
              let accountCode = sessionStorage.getItem("subAccountCode");
              let manageName=sessionStorage.getItem("authName")
              if((this.batchTemplate.length+this.singleTemplate.length)=='1'){
                templates=templates.replace(",", "");
              }
              if((this.batchTemplate.length+this.singleTemplate.length)=='0'){
                templates='';
              }
              this.$loading.show();
              this.$http.post(process.env.API_HOST + 'v1.5/tenant/' + this.interfaceCode + '/updateAccount', {
                accountName: this.ruleForm.accountName,  //管理员姓名
                userName: this.ruleForm.userName,            //账户名称
                idCard: this.ruleForm.idCode,                  //省份证号
                mobile: this.ruleForm.mobile,              //手机号码
                password: pass,                 //密码
                accountCode: accountCode,        //账户编号
                email: this.ruleForm.Email,                    //邮箱
                templates: templates,                                //分配模板
                company_name: this.enterpriseName,
                manageName:manageName,    //一级账号名称
              }, {emulateJSON: true}).then(res => {
                this.$nextTick(function () {
                  this.$loading.hide();
                })
                if (res.data.resultCode == '1') {
                  this.$message({
                    message: res.data.resultMessage,
                    type: 'success'
                  });

                  this.$router.push("/Account");
                } else if(res.data.resultCode == 0){
                  let num = 3;
                  if(res.data.data){
                    num = num-res.data.data.authNum;
                    this.$alert("<div style='text-align:center'>"+
                      +"<p>"+"子账号管理员实名认证未通过，请仔细核对管理员姓名、身份证号、手机号是否为同一主体"+"</p>"
                      +"<p class='vertifiId-warn warn-first'>"+"实名认证三次未通过该账号将被冻结"+"</p>"
                      +"<p class='vertifiId-warn'>"+"您还剩余"+num+"次机会"+"</p>"
                      +"</div>", '警告',{
                      confirmButtonText: '确定',
                    });
                  }else {
                    num=0;
                    this.$alert("<div style='text-align:center'>"+
                      +"<p>"+"子账号管理员实名认证未通过，请仔细核对管理员姓名、身份证号、手机号是否为同一主体"+"</p>"
                      +"<p class='vertifiId-warn warn-first'>"+"实名认证三次未通过该账号将被冻结"+"</p>"
                      +"</div>", '警告',{
                      confirmButtonText: '确定',
                    });
                  }


              if(num==0){
                this.$router.push("/Account");
              }
              this.once=false;
            }else if(res.data.resultCode == 2){
              this.$message({
                showClose: true,
                message:res.data.resultMessage,
                type: 'error'
              })
            }
          })

        }else {
          this.$message({
            showClose: true,
            message: '您你未完成子账户基本信息编辑，请您先完成子账户基本信息编辑!',
            type: 'error'
          })
          this.once=false;
        }
      })

  }else{
    this.$alert('您还未确定签署《电子合同子账号管理认证授权书》!', '确定签署',{
      confirmButtonText: '确定'
    });
    this.once=false;
    return false;
  }

  },

  },
  created() {
    let accountCode = sessionStorage.getItem("subAccountCode");


    this.$http.get(process.env.API_HOST + 'v1.5/tenant/' + this.interfaceCode + '/getAccountInfo', {
      params: {accountCode: accountCode}
    }).then(res => {
      if (res.data.resultCode == '1'){
        this.ruleForm.accountName = res.data.data.accountName;            //账户名称
        this.ruleForm.Email= res.data.data.email;                    //邮箱
        let singleArray=[];
        let batchArray=[];
        let data=res.data.dataList;
        //模板存在
        if(data){
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
  @import "../../../../styles/Confirmation/Account/ChildAccount.styl";

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
    background: url("../../../../../static/images/Common/title.png") no-repeat;
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
