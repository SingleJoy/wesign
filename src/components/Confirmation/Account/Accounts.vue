<!--我的账户->新增二级账户-->
<template>
  <div class="Accounts">

    <div class="main" >

      <div class="container">
        <!--账号管理   新增二级账号-->

        <div class="tap">
          <!--<div class="btn-active" @click="EnterAccount">账户中心</div>-->
          <!--<div class="btn-default" style="margin-left: -5px;" @click="EnterCostCenter">页面中心</div>-->
          <div class="btn-active" >账户中心</div>
          <div class="btn-default" style="margin-left: -5px;" >费用中心</div>
        </div>

        <div class="content">

          <!--账户信息-->
          <div class="content-body">

            <p class="title">账户信息</p>
            <div class="border-bottom"></div>
            <div class="left-side common-style">

              <div class="card" style="margin: 20px;">

                <div class="line" style="padding-top: 20px;">
                  <span>账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;户:</span>
                  <b>{{account}}</b>

                </div>
                <div class="line">
                  <span>企&nbsp;&nbsp;业&nbsp;&nbsp;名&nbsp;&nbsp;称:</span>
                  <b>{{companyName}}</b>
                </div>
                <div class="line">
                  <span>绑&nbsp;&nbsp;定&nbsp;&nbsp;邮&nbsp;&nbsp;箱:</span>
                  <b>{{Email}}</b>
                </div>
                <div class="line">
                  <span>被授权人姓名:</span>
                  <b>{{authName}}</b>
                </div>

              </div>
              <a href="javascript:void(0);" @click="centerDialogVisible = true" class="changePassword">修改密码</a>
              <div class="real-name-state" v-if="realNameState">
                <img src="../../../../static/images/Confirmation/Account/realName.png">
              </div>
            </div>


          </div>
          <!--企业证书-->
          <div class="content-body">
            <p class="title">企业证书</p>
            <div class="border-bottom"></div>
            <div class="right-side common-style">

              <div class="card right-card" style="margin-top: 20px;margin-left: 20px;">
                <div class="right-card-content">
                  <div class="right-line" >
                    <span>序列号:</span>
                    <b>{{serialNumber}}</b>
                  </div>
                  <div class="right-line">
                    <span>颁发给:</span>
                    <b>{{issuedNumber}}</b>
                  </div>
                  <div class="right-line">
                    <span>证件号:</span>
                    <b>{{cardNumber}}</b>
                  </div>
                  <div class="right-line">
                    <span>有效起始时间:</span>
                    <b>{{effectiveStartTime}}</b>
                  </div>
                  <div class="right-line">
                    <span>有效截止时间:</span>
                    <b>{{effectiveEndTime}}</b>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

        <div class="sign-management">
          <p class="title">签章管理</p>
          <div class="border-bottom"></div>
          <div class="sign-content">

            <div class="sign-picture">
              <!--默认图片-->
              <img src="../../../../static/images/Default/default-contrat-seal.png" v-if="showImage==false">
              <span>默认合同章</span>
              <!--<img src="" v-if="showImage==true">-->
            </div>

            <div class="sign-picture" v-if="officeSeal==true">
              <!--默认图片-->
              <img src="../../../../static/images/Default/default-contrat-seal.png" >
              <!--<img src="" v-if="showImage==true">-->

            </div>

            <div class="create-seal" v-if="officeSeal==false">
              <!--生成公章-->
              <span>录入公章防伪码在线生成</span>
              <b class="tips">签章生成后，将不可编辑，请仔细<br/>核对录入信息</b>
              <input type="text" v-model="createSeal">
              <a href="javascript:void(0);" @click="newSeal">生成公章</a>
            </div>


          </div>


        </div>

        <div class="seal-management">
          <p class="title">账号管理</p>
          <div class="border-bottom"></div>
          <div class="child-account">

            <div class="account-list">
              <!--<div class="list-content" v-for="item in accountList">-->
              <div class="list-content" >
                <ul>
                  <li>
                    <span>管理员姓名:</span>
                    <b >张晓霞</b>
                  </li>
                  <li>
                    <span>账<span style="padding: 0 24px;"></span>号:</span>
                    <b >18876994055</b>
                  </li>
                  <li>
                    <span>状<span style="padding: 0 24px;"></span>态:</span>
                    <b class="state">使用中</b>
                  </li>
                  <li>
                    <span>可<span style="padding: 0 3px;"></span>用<span style="padding: 0 1px;"></span>模<span style="padding: 0 3px;"></span>板:</span>
                    <b><strong class="template-number">10</strong>个</b>
                  </li>
                </ul>
                <div class="operate">
                  <!--<a class="finish" href="javascript:void(0)" @click="finish">完善</a>-->
                  <a class="edit" href="javascript:void(0)" @click="edit">编辑</a>
                  <!--<a class="management" href="javascript:void(0)" @click="management">管理</a>-->
                  <!--<a class="frozen" href="javascript:void(0)" @click="frozen">冻结</a>-->
                  <!--<a class="thaw" href="javascript:void(0)" @click="thaw">解冻</a>-->
                </div>
              </div>

              <el-dialog
                title="提示"
                :visible.sync="frozenDialogVisible"
                width="30%"
                center>
                <div style="text-align: center">
                  <div class="tips" style="width: 300px;text-align: center;margin: 0 auto;">
                    子被冻结后，子账号管理员将无法以该角色登录<br/>
                    微签平台，为避免业务受阻，请确认操作
                  </div>
                </div>
                <span slot="footer" class="dialog-footer">
                      <el-button @click="frozenDialogVisible = false">取 消</el-button>
                      <el-button type="primary" @click="frozenDialogVisible = false">确 定</el-button>
                  </span>
              </el-dialog>

              <el-dialog
                title="提示"
                :visible.sync="thawDialogVisible"
                width="30%"
                center>
                <div style="text-align: center">
                  <div class="tips" style="width: 300px;text-align: center;margin: 0 auto;">
                    解除冻结后，子账号管理员将恢复所有操作权限
                  </div>
                </div>
                <span slot="footer" class="dialog-footer">
                      <el-button @click="thawDialogVisible = false">取 消</el-button>
                      <el-button type="primary" @click="thawDialogVisible = false">确 定</el-button>
                </span>
              </el-dialog>

              <div class="left" @click="sealManagement">
                <i class="el-icon-plus"></i>
              </div>
            </div>

          </div>
          <!--accountDefault  没有二级子账号-->
          <div class="right" v-if="accountDefault">

            <!--Q1-->
            <div class="question">
              <a href="javascript:void(0)" class="serial-number" style="background-color: #79b6ef;">
                <b>Q1</b>
              </a>
              <p class="question-title" style="color: #79b6ef;">什么是二级账号？</p>
              <span class="question-answer">
                    子账号是企业管理员开通授权，使用手机号登录，可发起合同、管理合同
              </span>
            </div>

            <!--Q2-->
            <div class="question">
              <a href="javascript:void(0)" class="serial-number" style="background-color:  #d69856;">
                <b>Q2</b>
              </a>
              <p class="question-title" style="color: #d69856;">子账号拥有哪些权限？</p>
              <span class="question-answer">
                    子账号仅可管理本账号内的合同，不可接收合同文件<br/><br/>
                     <span style="color: #d69856;line-height: 25px">发起合同<br/>
                       <span style="color: #333;">可上传文件发起合同，也可以通过一级账号分配的模板发起合同</span>
                     </span>
                    <br/><br/>
                    <span style="color: #d69856;line-height: 25px">文件签署<br/>
                       <span style="color: #333;">签署“带我签署”状态的合同</span>
                     </span>
                     <br/><br/>
                    <span style="color: #d69856;line-height: 25px">延期<br/>
                       <span style="color: #333;">合同已到达截止签署日且仍未签署完成时，子账号管理员可修改签署截止日</span>
                     </span>
                  </span>
            </div>

            <!--Q3-->
            <div class="question">
              <a href="javascript:void(0)" class="serial-number" style="background-color: #59c6a1;">
                <b>Q3</b>
              </a>
              <p class="question-title" style="color:#59c6a1;">开通子账号需要哪些步骤？</p>
              <span class="question-answer" style="line-height: 25px;color: #333;">
                    1:录入子账号基本信息，对子账号管理员主体进行进行实名认证<br/>
                    （若账号已经在微签注册、实名过，则不需要设置密码）<br/>
                    2:为子账号分配模板<br/>
                    3:提交开通子账号申请<br/>
                    4:短信通知子账号管理员<br/>
                    5:子账号管理员登录账号，签署授权书激活子账号<br/>
                  </span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!--修改密码-->
    <el-dialog
      custom-class='dlstyle'
      title="修改密码"
      :visible.sync="centerDialogVisible"
      width="360px"
      top="30vh"
      center
      @close="closeDialog('ruleForm')"
    >
      <div id='logner'>
        <el-form :model="ruleForm" :rules="rules" ref='ruleForm' class="demo-ruleForm" label-width="85px">
          <el-form-item label="原密码：" prop="oldPassWord">
            <el-input v-model="ruleForm.oldPassWord" type="password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码：" prop="newPassWord">
            <el-input v-model="ruleForm.newPassWord" type="password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="checkPassWord">
            <el-input v-model="ruleForm.checkPassWord" type="password" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="resetForm('ruleForm')" size='medium'>取 消</el-button>
          <el-button type="primary"  @click="submitForm('ruleForm')" size="medium">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
  import md5 from 'js-md5'
  import cookie from '@/common/js/getTenant'
  import {validatePassWord} from '@/common/js/validate'
  import  AddChildAccount from './AddChildAccount/AddChildAccount'
  import  Home from '../../Home/Home'
  export default {
    name: 'Accounts',
    components:{
      AddChildAccount,
      Home
    },
    data() {
      var validateOldPassWord = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入原密码'));
        } else {
          this.$http.get(process.env.API_HOST+'v1/tenant/login',{params:{"username":cookie.getJSON('tenant')[0].mobile,"password":md5(this.ruleForm.oldPassWord)}}).then(function (res) {
            var backCode = res.data.resultCode
            if( backCode === '0'){
              callback(new Error('原密码输入错误!'));
            } else {
              callback();
            }
          })
        }
      };
      var validateNewPassWord = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else if (value.length < 8 || value.length > 16) {
          callback(new Error('密码长度必须为8-16位'))
        } else if (!validatePassWord(value)){
          callback(new Error('密码格式为数字+字母'))
        }else {
          callback();
        }
      }
      var validateCheckPassWord = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.newPassWord) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
      return{
        account:'',
        Email:'',
        authName:'',
        enterpriseName:'',
        companyName:'',
        chapter:'合同章',
        serialNumber:'',  //序列号
        cardNumber:'',  //证件号
        issuedNumber:'',  //颁发给
        effectiveStartTime:'',  //有效起始时间
        effectiveEndTime:'',  //有效截止时间
        createSeal:'',//生成公章
        contractSign:'',
        mobile:'',
        centerDialogVisible: false,
        authStatus:false,
        auditStatus:false,
        personalRealName:'',
        enterpriseRealName:'',
        identifier: false,
        personal:'',
        finalRejection:false,
        toEnterprise:null,  //根据进入页面时请求到的verfiyMoneyNum 判断是否再跳回注册页面
        officeSeal:false,
        auditCode:'',
        auditOpinion:'',
        modalTips:false,
        ruleForm: {
          oldPassWord: '',
          newPassWord: '',
          checkPassWord:''
        },
        realNameState:true,
        rules:{
          oldPassWord: [
            { validator: validateOldPassWord, trigger: 'blur' }
          ],
          newPassWord: [
            { validator: validateNewPassWord, trigger: 'blur' }
          ],
          checkPassWord:[
            { validator: validateCheckPassWord, trigger: 'blur' }
          ]
        },
        showImage:false ,  //默认图片
        accountDefault:false ,//没有二级子账号
        accountList:'', //二级账号列表
        frozenDialogVisible:false, //子账号冻结弹窗
        thawDialogVisible:false, //子账号解结弹窗,

      }
    },
    methods: {
      closeDialog (formName) {
        this.$refs[formName].resetFields()
        this.centerDialogVisible = false
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
        this.centerDialogVisible = false
      },
      realName() {
        if(this.personalRealName == '1' || this.personalRealName == '2'||this.personalRealName == '3' ){
          sessionStorage.setItem('userCode',JSON.stringify(cookie.getJSON('tenant')[0].userCode));
          sessionStorage.setItem('interfaceCode',JSON.stringify(cookie.getJSON('tenant')[1].interfaceCode));
          console.log()
          this.$router.push('/Pupload')
        }else if (this.personalRealName == '4'){

          this.$router.push('/ErrorPupload')

        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post(process.env.API_HOST+'v1.4/tenant/modifyPassword',{"mobile":this.mobile,"oldPassword":md5(this.ruleForm.oldPassWord),"newPassword":md5(this.ruleForm.newPassWord)},{emulateJSON: true}).then(function (res) {
              if(res.data.sessionStatus == '0'){
                this.$router.push('/Server')
              } else {
                var resultCode = res.data.resultCode
                if ( resultCode === '1') {
                  this.$message({
                    showClose: true,
                    message: '修改密码成功!',
                    type: 'success'
                  });
                  this.centerDialogVisible = false
                  this.$router.push('/')
                } else {
                  this.$message({
                    showClose: true,
                    message: '修改密码失败!',
                    type: 'error'
                  });
                  this.resetForm (formName)
                }
              }
            })
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      newSeal(){
        var requestVo ={'interfaceCode':cookie.getJSON("tenant")[1].interfaceCode,'securityCode':this.createSeal};
        this.$http.get(process.env.API_HOST+'v1.5/createSignature', {params: requestVo}).then(function (res) {
          if(res.data.resultCode == '0'){
            this.$router.push('/Server')
          } else {
            this.officeSeal=res.data.signBadgePath;
          }
        })
      },

      companyRealName() {  //未通过状态
        this.finalRejection = true
      },
      IdentificationState() { //未实名完成
        if(this.enterpriseRealName == '1'){
          sessionStorage.setItem('enterpriseName',cookie.getJSON('tenant')[1].companyName)
          sessionStorage.setItem('interfaceCode',JSON.stringify(cookie.getJSON('tenant')[1].interfaceCode))
          this.$router.push('/Enterprise')
        }else if(this.enterpriseRealName == '2' || this.enterpriseRealName == '4'){
          sessionStorage.setItem('interfaceCode', JSON.stringify(cookie.getJSON('tenant')[1].interfaceCode))
          this.$router.push('/Payment')
        }else if(this.enterpriseRealName == '3'){
          sessionStorage.setItem('interfaceCode',JSON.stringify(cookie.getJSON('tenant')[1].interfaceCode))
          sessionStorage.setItem('accountSteps','accountSteps')
          this.$router.push('/WaitReply')

        }
      },
      shutDown(){
        this.finalRejection = false
      },
      audit(){
        sessionStorage.setItem('enterpriseName', cookie.getJSON('tenant')[1].companyName)
        sessionStorage.setItem('interfaceCode', JSON.stringify(cookie.getJSON('tenant')[1].interfaceCode))
        if(this.toEnterprise != '3'){
          this.$router.push('/Enterprise')
        }
      },
      ToAccount(){
        if(this.personalRealName == '1' || this.personalRealName == '2'){
          sessionStorage.setItem('userCode',JSON.stringify(cookie.getJSON('tenant')[0].userCode))
          sessionStorage.setItem('interfaceCode',JSON.stringify(cookie.getJSON('tenant')[1].interfaceCode))
          this.$router.push('/ErrorPupload')
        }
      },
      close(){
        this.modalTips = false
      },
      sealManagement(){

        this.$router.push('/AddChildAccount')
      },
      // 完善子账号
      finish(){

      },
      //编辑子账号
      edit(){
        this.$router.push('/EditChildAccount')
      },
      //管理子账号
      management(){

      },
      //冻结子账号
      frozen(){
        this.frozenDialogVisible=true

      },
      //解冻子账号
      thaw(){
        this.thawDialogVisible=true

      }

    },
    created() {
      this.mobile = cookie.getJSON('tenant')[0].mobile
      this.companyName = cookie.getJSON('tenant')[1].companyName
      // console.log(cookie.getJSON('tenant')[0])
      var authStatus = cookie.getJSON('tenant')[0].authStatus     //是否通过状态  个人状态
      var auditSteps = cookie.getJSON('tenant')[0].auditSteps     //个人认证步骤
      var auditStatus = cookie.getJSON('tenant')[1].auditStatus   //企业通过状态
      var companySteps = cookie.getJSON('tenant')[1].auditSteps  //企业认证步骤
      var status = cookie.getJSON('tenant')[2].status            // 打款状态
      // 是否判断
      if(authStatus == '1') {
        this.authStatus = true
      }else if(authStatus == '-1' && auditSteps == '1'){
        this.personalRealName = '1'
        this.chapter = '暂无签章'
        this.modalTips = true
      }else if(authStatus == '-1' && auditSteps == '2'){
        this.personalRealName = '2'
        this.chapter = '暂无签章'
        this.modalTips = true
      }else if(authStatus == '0' && auditSteps == '1'){
        this.personalRealName = '3'
        this.chapter = '暂无签章'
      }else if(authStatus == '0' && auditSteps == '2'){
        this.personalRealName = '4'
        this.chapter = '暂无签章'
      }
      if(this.authStatus == false){
        this.auditStatus = true
        this.identifier = true
      }else {
        if (auditStatus == '2') {
          this.auditStatus = true
          this.identifier = true
        }else if (auditStatus == '-1' && companySteps == '1') {//填写企业信息
          this.enterpriseRealName = '0'
          this.chapter = '暂无签章'
          this.auditStatus = true
        } else if (auditStatus == '0' && companySteps == '1') { //填写企业信息
          this.enterpriseRealName = '1'
          this.chapter = '暂无签章'
          this.identifier = true
        }  else if (auditStatus == '1' && companySteps == '1') { //银行信息
          this.enterpriseRealName = '2'
          this.chapter = '暂无签章'
          this.identifier = true
        } else if (auditStatus == '1' && companySteps == '2') { //小额打款
          if(status == '0' || status == '1'){
            this.enterpriseRealName = '3'
            this.chapter = '暂无签章'
            this.identifier = true
          } else if(status == '3'){ //银行信息
            this.enterpriseRealName = '4'
            this.chapter = '暂无签章'
            this.identifier = true
          }else{
            this.enterpriseRealName = '3'
            this.identifier = true;
          }
        }
      }
      let url = process.env.API_HOST+'v1.4/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode + '/getSignature'
      this.$http.get(url).then(function (res) {
        this.contractSign = res.bodyText
      })
      //意见（待定
      this.$http.get(process.env.API_HOST+'v1.4/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode + '/auditStatus').then(function (res) {
        this.auditOpinion=res.data.data;
        // this.toEnterprise = res.data.data.verifyMoneyNum
      })
      // 查询证书
      this.$http.get(process.env.API_HOST+'v1.4/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode + '/getCertificate').then(function (res) {
        if(res.data.resultCode=='1'){
          this.serialNumber=res.data.userCode;
          this.issuedNumber=res.data.userName;
          this.authName=res.data.userName;
          this.cardNumber=res.data.mobile;
          this.effectiveStartTime=res.data.certificateStartTime;
          this.effectiveEndTime=res.data.certificateDueTime;
        }
      });
        // 子账户信息
      this.$http.get(process.env.API_HOST+'v1.4/tenant/'+ cookie.getJSON('tenant')[1].interfaceCode + '/getAccount').then(function (res) {

        if(res.data.resultCode=='1'){

        }

      });

      //获取合同章
      this.$http.get(process.env.API_HOST+'v1.5/getSignatures',{params: {interfaceCode:cookie.getJSON('tenant')[1].interfaceCode}}).then(function (res) {

        if(res.data.resultCode == '0'){
          this.$router.push('/Server')
        } else {
          this.officeSeal=res.data.signBadgePath;
        }

      });

      //获取二级账户集合查询
      this.$http.get(process.env.API_HOST+'v1.5/secondAccounts',{params: {interfaceCode:cookie.getJSON('tenant')[1].interfaceCode}}).then(function (res) {

        if(res.data.resultCode == '0'){
          this.$router.push('/Server')
        } else {
          
        }

      });

    },
  }
</script>

<style lang="stylus">
  @import "../../../styles/Confirmation/Account/Account.styl";
  .content-body .title,.sign-management .title,.seal-management .title{
    background: url("../../../../static/images/Common/title.png") no-repeat;
  }
  .right-card{
    background: url('/../../../../static/images/Common/numberCertificate.png') no-repeat 4px 4px;
  }
  .create-seal{
    background: url(" ../../../../static/images/Confirmation/Account/defalut-seal.png")no-repeat;
  }
  .seal-management .left,.child-account>.account-list>.list-content{
    background: url("../../../../static/images/Confirmation/Account/addSeal.png")no-repeat;
  }
  .border-bottom{
    width:100%;height: 1px;border-bottom: 1px solid #ddd;margin-top: 20px
  }

</style>
