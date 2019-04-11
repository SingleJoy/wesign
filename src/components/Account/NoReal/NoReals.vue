<template>
  <div class="NoReal">
    <div  class='content'>
      <br/>
      <p class="title">账号管理</p>
      <div class="line"></div>
      <div class='contentInfo'>
        <div class='companyName'>
          <p>
            <span className="company-name">企业名称：</span>
            <span>{{companyName}}</span>
          </p>
        </div>
        <div class='userInfo'>
          <p>
            <span>账号：</span><span>{{mobile}}</span>
          </p>
          <a href="javascript:void(0);"  @click="realName">去实名</a>
        </div>
        <div class='userInfo'>
          <p>
            <span>密码：</span><span>******</span>
          </p>
          <a href="javascript:void(0);" @click="centerDialogVisible = true">修改密码</a>
        </div>
        <p class="title">签章管理</p>
        <div class="line"></div>
        <div class='accountPic' v-if="contractSign">
          <img :src="[contractSign]" alt="" style="width:160px;height: 160px;">
          <p style="padding-left: 58px;width: 95px;">合同章</p>
        </div>
        <div v-else style="font-size:12px;margin-left:50px">暂无签章</div>
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


  </div>
</template>
<script>
  import md5 from 'js-md5'
  import cookie from '@/common/js/getTenant'
  import {validatePassWord} from '@/common/js/validate'
  import server from "@/api/certification";
  import {modifyPassword,auditStatus_,getSignature} from '@/api/account'
  import serverA from '@/api/url'
  export default {
    name: 'NoReal',
    data() {
      let validateOldPassWord = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入原密码'));
        } else {
          let params={
            "username":this.mobile,
            "password":md5(this.ruleForm.oldPassWord)
          }
          serverA.verficate(params).then(res=>{
            let backCode = res.data.resultCode
            if( backCode === '0'){
              callback(new Error('原密码输入错误!'));
            } else {
              callback();
            }
          }).catch(error=>{

          })
        }
      };
      let validateNewPassWord = (rule, value, callback) => {
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
      let validateCheckPassWord = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.newPassWord) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
      return{
        companyName:'',
        contractSign:'',
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
        interfaceCode:sessionStorage.getItem("interfaceCode"),
        mobile:sessionStorage.getItem('mobile'),
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

        var auditSteps = cookie.getJSON('tenant')[1].auditSteps
        var auditStatus = cookie.getJSON('tenant')[1].auditStatus   //人工审核或小额打款中跳转payment

        this.$store.dispatch('tabIndex',{tabIndex:5});
        if(auditSteps==2 ||  auditStatus == 4){
            this.$router.push('/EnterprisePayment');
        }else{
            this.$router.push('/EnterpriseCertificate');
        }

      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params={
              "mobile":this.mobile,
              "oldPassword":md5(this.ruleForm.oldPassWord),
              "newPassword":md5(this.ruleForm.newPassWord)
            }
            modifyPassword(params).then(res=> {
                let resultCode = res.data.resultCode
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

            }).catch(error=>{

            })
          } else {
            return false;
          }
        });
      },
    },
    created() {

      this.companyName = cookie.getJSON('tenant')[1].companyName
      // console.log(cookie.getJSON('tenant')[0])
      // authStatus  -1和0 都是未通过  1是通过
        var authStatus = cookie.getJSON('tenant')[0].authStatus     //是否通过状态  个人状态
        // var auditSteps = cookie.getJSON('tenant')[0].auditSteps     //个人认证步骤
        var auditStatus = cookie.getJSON('tenant')[1].auditStatus   //企业通过状态 2 跳打款 其余跳企业认证
        var companySteps = cookie.getJSON('tenant')[1].auditSteps  //企业认证步骤
        var status = cookie.getJSON('tenant')[2].status            // 打款状态

        var auditSteps = cookie.getJSON('tenant')[1].auditSteps;    //企业认证步骤


      getSignature(this.interfaceCode).then(res=> {
        this.contractSign = res.data
      }).catch(error=>{

      })
      //意见（待定
      auditStatus_(this.interfaceCode).then(res=>{
        this.auditOpinion=res.data.data;
      }).catch(error=>{

      })
        let param={
            mobile:this.mobile
        };
        server.login(param,this.interfaceCode).then(res => {
            cookie.set("tenant", res.data.dataList);  //更新cookie
        })
    }
  }
</script>
<style scoped>
   @import "../../../styles/Account/Accounts.css";
   @import "../../../common/styles/content.scss";
  .NoReal .content .title{
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
  }
</style>
