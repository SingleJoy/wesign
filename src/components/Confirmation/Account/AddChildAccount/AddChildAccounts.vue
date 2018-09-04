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
                    <el-input v-model="ruleForm.password" type="password" auto-complete="off" placeholder="请输入密码" :maxlength= 8 :minlength= 16 :disabled="dis"></el-input>
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
                      <el-checkbox v-for="item in single" :label="item.templateNo"   :key="item.templateNo">{{item.name}}</el-checkbox>

                    </el-checkbox-group>
                  </template>
                </div>

                <div class="batch-list" >
                  <h3>批量发起模板</h3>
                  <template>
                    <el-checkbox-group v-model="batchTemplate" >
                      <el-checkbox v-for="item in batch" :label="item.templateNo"   :key="item.templateNo">{{item.name}}</el-checkbox>
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

                  <div class="dialog-body">
                    <div class="content">

                      <p style="text-align: center;font-size: 16px;font-weight: bold;">电子合同子账号管理认证授权书</p>

                      <br/>
                      <p>致：北京众签科技有限公司</p>

                      <p><span style="padding:0 10px;"></span>兹授权我公司员工：{{ruleForm.accountName}}            ，身份证号：{{ruleForm.idCode}}                   ，去贵单位办理与电子合同服务有关的全部事宜，具体权限包括：</p>

                      <p> 1)可以签署本子账号发起的合同，不能签署主账号和其他子账号的待签署的合同；</p>

                      <p> 2)管理本子账号发起的合同（查看、下载、延期）；</p>

                      <p>在授权期间，被授权人与贵公司所签署的一切文件，我公司都给予认可，并承担可能由此产生的各种法律责任。我公司员工在办理期间，请予以配合，谢谢！</p>
                      <br/>
                      <p>被授权人签名：</p>
                      <br/>
                      <p> 公司名称：{{enterpriseName}}</p>
                      <br/>
                      <p> 日    期:</p>

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
                <button class="submit"  @click="submitBtn('ruleForm')" href="javascript:void(0)" disabled="once">提交</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>
<script>

  import Account from "../Account"    //返回或者编辑成功跳转到我的账户页面
  import md5 from 'js-md5'
  import {validateMoblie,validateEmail,TrimAll,validatePassWord,validateCard} from '@/common/js/validate'
  import cookie from '@/common/js/getTenant'
  import server from "@/api/url";
  import EditChildNoActive from "../EditChildNoActive/EditChildNoActive" //添加失敗跳转到编辑二级账号页面
  export default {
    name: 'AddChildAccounts',
    component:{
      Account,
      EditChildNoActive
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
          if(this.server){
            server.verficate(params).then(res => {
              if (res.data === 0) {
                this.ruleForm.password="test111111";
                this.dis=true;

              } else {

              }
            }).catch(error => {

            })
          }
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
        server:true,
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
        dis:false,
        enterpriseName:sessionStorage.getItem("enterpriseName"),  //企业名称
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
        once:false , //提交按钮不可重复点击
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
      submitBtn(formName){
        this.server=false;
        let enterpriseName= sessionStorage.getItem("enterpriseName");
        if(this.agree) {
          this.$refs[formName].validate((valid) => {

             this.once=true;//提交按钮不可重复点击
            let pass = md5(this.ruleForm.password); //密码MD5加密
            let batchTemplate=JSON.stringify(this.batchTemplate);  //批量模板
            let singleTemplate=JSON.stringify(this.singleTemplate);  //单次发起模板

            // let batchTemplate1=batchTemplate.substr(2,batchTemplate.length-3);
            let batchTemplate1=batchTemplate.replace("[",",").replace("]","").replace(/\"/g,"");
            let singleTemplate1=singleTemplate.replace("[",",").replace("]","").replace(/\"/g,"");
            let templates=(batchTemplate1+singleTemplate1).substr(1);
            let accountCode=sessionStorage.getItem("accountCode")

            this.$http.post(process.env.API_HOST+'v1.5/tenant/'+this.interfaceCode+'/addAccount',{
              accountName:this.ruleForm.accountName ,  //  账户姓名
              userName:this.ruleForm.userName,            //管理员名称
              idCard:this.ruleForm.idCode,                  //省份证号
              mobile:this.ruleForm.mobile ,              //手机号码
              password:pass,                 //密码
              accountCode:accountCode,        //账户编号
              email:this.ruleForm.Email,                    //邮箱
              templates:templates,                                //分配模板
              company_name:enterpriseName,             //企业名称

            },{emulateJSON: true}).then(res =>{
             let accountCode=res.data.accountCode;  //存储accountCode
              sessionStorage.setItem('accountCode','accountCode')
              //二级账号添加成功
              if(res.data.resultCode=='1'){
                const h = this.$createElement;
                this.$msgbox({
                  title: '提醒',
                  message: h('p', null, [
                    h('span', null, '恭喜你，添加二级账号成功'),
                    h('i', { style: 'color: teal' }, 'VNode')
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
                        setTimeout(() => {
                          instance.confirmButtonLoading = false;
                        }, 300);
                      }, 3000);
                      this.$router.push("/Account");
                    } else {
                      done();
                    }
                  }
                }).then(action => {
                  this.$message({
                    type: 'info',
                    message: 'action: ' + action
                  });
                });


                // this.$message({
                //   message: '恭喜你，添加二级账号成功',
                //   type: 'success'
                // });
                // this.$router.push("/Account");
              }else{
                //二级账号添加失败
                const h = this.$createElement;
                this.$msgbox({
                  title: '提醒',
                  message: h('p', null, [
                    h('span', null, res.data.resultMessage),            //res.data.resultMessage 为二级账号添加失败提醒信息
                    h('i', { style: 'color: teal' }, 'VNode')
                  ]),
                  showCancelButton: true,
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                      instance.confirmButtonLoading = true;
                      instance.confirmButtonText = '执行中...';

                      this.$router.push("/EditChildNoActive");

                      setTimeout(() => {
                        done();
                        setTimeout(() => {
                          instance.confirmButtonLoading = false;
                        }, 300);
                      }, 3000);
                    } else {
                      done();
                    }
                  }
                }).then(action => {
                  this.$message({
                    type: 'info',
                    message: 'action: ' + action
                  });
                });




              }
            })

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
      this.$http.get(process.env.API_HOST + "v1/tenant/"+this.interfaceCode + "/templateList").then(function(res) {
          let data=res.data;
          let singleArray=[];
          let batchArray=[];
          for(let i=0;i<data.length;i++){

            if(data[i].templateSpecies=='single'){
              singleArray.push(data[i]);
            }else {
              batchArray.push(data[i]);
            }
          }
          this.single=singleArray;
          this.batch=batchArray;

        });
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
  .content>p{
    line-height: 30px;
  }

</style>
