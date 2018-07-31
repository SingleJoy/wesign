<template>
  <div class='Accounts'>
    <div  class='content'>
      <h2 class='title' style="padding-top: 30px;padding-bottom: 20px;border-top: none;">
        <img src="../../../../static/images/Confirmation/Account/my.jpg" alt="">
        <p v-if="identifier == false"  @click="companyRealName"><i class='el-icon-info'></i><span>您提交的企业实名信息未通过审核，请</span><a href="javascript:void(0);">重新提交企业信息</a></p>
        <p v-else-if="auditStatus == false " @click="IdentificationState"><i class='el-icon-info'></i><span>您尚未完成企业实名认证，请</span><a href="javascript:void(0);">继续完善信息</a></p>
      </h2>
      <div class='contentInfo'>
        <div class='userInfo'>
          <p>
            <span>账号：</span><span>{{mobile}}</span>
          </p>
          <a href="javascript:void(0);" v-show="authStatus == false" @click="realName">去实名</a>
        </div>
        <div class='userInfo'>
          <p>
            <span>密码：</span><span>******</span>
          </p>
          <a href="javascript:void(0);" @click="centerDialogVisible = true">修改密码</a>
        </div>
        <h2 class='title' style='border-top:none;padding-bottom: 20px;'>
          <img src="../../../../static/images/Confirmation/Account/my1.jpg" alt="" >
        </h2>
        <div class='accountPic'>
          <img :src="[contractSign]" alt="" style="width:100%">
          <p style="padding-left: 58px;width: 95px;">{{chapter}}</p>
        </div>
      </div>
    </div>
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

    <div class="modal " v-show ="finalRejection == true">
      <div class="modal-box" >
        <div class="modal-header">
          <div class="modal-header-title">
            <div>提示<span>(未通过原因)</span></div>
          </div>
          <a href="javascript:void(0);" @click="shutDown" class="close">X</a>
        </div>
        <div class="modal-body-account">
           <div class="refuse-reason">
             {{auditOpinion}}
           </div>
        </div>
        <div class="modal-footer">
          <a href="javascript:void(0);" class="btn btn-sure" @click="audit">确定</a>
          <a href="javascript:void(0);" class="btn btn-quit" @click="shutDown">取消</a>
        </div>
      </div>
    </div>

    <div class="modal " v-show ="modalTips == true">
      <div class="modal-box" style="width: 400px;height: 200px;">
        <div class="modal-header" style="border: none;">
          <a href="javascript:void(0);" @click="close" class="close">X</a>
        </div>
        <div class="modal-body-account">
          <div style="height: 50px;margin: 50px 0 30px 20px;">
            <p style="font-size: 14px;color: #666;">您上传的手持身份证信息与被授权人手机号主体信息不匹配，请重新上传！</p>
          </div>
        </div>
        <div class="modal-footer">
          <a href="javascript:void(0);" class="btn btn-sure" @click="ToAccount">确定</a>
          <a href="javascript:void(0);" class="btn btn-quit" @click="close">取消</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import md5 from 'js-md5'
  import cookie from '@/common/js/getTenant'
  import {validatePassWord} from '@/common/js/validate'
  export default {
    name: 'Accounts',
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
        chapter:'合同章',
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
        auditCode:'',
        auditOpinion:'',
        modalTips:false,
        ruleForm: {
          oldPassWord: '',
          newPassWord: '',
          checkPassWord:''
        },
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
        }
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
          this.$router.push('/Pupload')
        }else if (this.personalRealName == '4'){
          // this.$router.push('/PersonWait')
          this.$router.push('/ErrorPupload')
          // this.$router.push('/Pupload')
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
      }
    },
    created() {
      this.mobile = cookie.getJSON('tenant')[0].mobile
      this.companyName = cookie.getJSON('tenant')[1].companyName
      // console.log(cookie.getJSON('tenant')[0])
      var authStatus = cookie.getJSON('tenant')[0].authStatus     //是否通过状态
      var auditSteps = cookie.getJSON('tenant')[0].auditSteps     //个人认证步数
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
    }
  }
</script>
<style scoped>
  @import "../../../styles/Confirmation/Account/Accounts.css";
  .modal{
    width: 100%;
    height: 100%;
    position:fixed;
    left:0;
    right:0;
    bottom:0;
    top: 0;
    z-index: 2;
    background: rgba(0, 0, 0, 0.3);
    overflow-x: hidden;
    overflow-y: auto;
    display:block;
  }
  .modal-box{
    width:400px;
    height: 310px;
    background-color: #fff;
    position:fixed;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:auto;
    border-radius: 5px;

  }
  .modal-header{
    padding: 5px 0 5px 10px;
    border-bottom: 1px solid #e5e5e5;
    font-size: 14px;
  }
  .modal-header h3{
    text-align: left;
    font-size: 14px;
  }

  .close{
    position: absolute;
    right: -3px;
    top: -3px;
    width: 30px;
    height: 30px;
    color: #fff;
    background: #ccc;
    border-radius: 50%;
    text-align: center;
    line-height: 30px
  }

  .modal-header-title>div{
    font-size: 20px;
    padding: 5px 15px;
    color: #22a7ea;
  }
  .refuse-reason {
    width: 350px;
    height: 150px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin: 20px 35px 0 20px;
    resize: none;
    word-break:break-all;
    padding: 5px;


  }
  .modal-header-title>div>span{
    font-size: 14px;
    padding-left: 15px;
    color:#333;
  }
  textarea.refuse-reason{
    width: 330px;
    height: 150px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin: 20px 35px 0 35px;
    resize: none;
  }
  textarea.refuse-reason:focus{
    outline: none;
  }
  .modal-footer{
    margin-top: 20px;
    text-align: center;
  }
  .modal-footer>a.btn{
    width: 90px;
    height: 40px;
    border-radius: 4px;
    text-align: center;
    line-height: 40px;
    text-decoration : none;
    display: inline-block;
  }

  .modal-footer>.btn-sure{
    background: #22a7ea;
    color: #fff;
  }

  .modal-footer>.btn-quit{
    margin-left: 20px;
    background:#999;
    color: #fff;
  }
</style>
