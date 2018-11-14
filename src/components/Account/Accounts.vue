<!--我的账户->新增二级账户-->
<template>
  <div class="Accounts">

    <div class="main" >

      <div class="container">


        <div class="tap">

        <div class="btn-active"  @click="AccoutCenter">账户中心</div>
        <div class="btn-default" style="margin-left: -5px;" @click="CostCenter">费用中心</div>
        </div>

        <div class="content">

          <!--账户信息-->
          <div class="content-body">

            <p class="title">账户信息</p>
            <div class="border-bottom"></div>
            <div class="left-side common-style">

              <div class="card" style="margin: 20px;">

                <div class="card-line" style="padding-top: 20px;">
                  <span>账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;户:</span>
                  <b>{{mobile}}</b>

                </div>
                <div class="card-line" v-if="accountLevel=='1'">
                  <span>企&nbsp;&nbsp;业&nbsp;&nbsp;名&nbsp;&nbsp;称:</span>
                  <b>{{enterpriseName}}</b>
                </div>
                <div class="card-line" v-if="accountLevel=='2'">
                  <span>账&nbsp;&nbsp;号&nbsp;&nbsp;名&nbsp;&nbsp;称:</span>
                  <b>{{accountName}}</b>
                </div>
                <div class="card-line">
                  <span>绑&nbsp;&nbsp;定&nbsp;&nbsp;邮&nbsp;&nbsp;箱:</span>
                  <b>{{Email}}</b>
                </div>
                <div class="card-line" v-if="accountLevel=='1'">
                  <span>被授权人姓名:</span>
                  <b>{{authName}}</b>
                </div>
                <div class="card-line">
                    <span>合&nbsp;&nbsp;同&nbsp;&nbsp;余&nbsp;&nbsp;量:</span>
                    <span>{{ContractAllowance}}&nbsp;份</span>
                </div>
                <div class="card-line">
                  <span>对&nbsp;企&nbsp;业&nbsp;合&nbsp;同:&nbsp;{{b2bNum}}&nbsp;份</span>
                  <!-- <span>对个人合同&nbsp;{{b2cNum}}份</span> -->
                </div>
                <div class="card-line">
                  <span>对&nbsp;个&nbsp;人&nbsp;合&nbsp;同:&nbsp;{{b2cNum}}&nbsp;份</span>
                </div>
                <div class="card-line" v-if="accountLevel=='2'">
                  <span>企&nbsp;&nbsp;业&nbsp;&nbsp;名&nbsp;&nbsp;称:</span>
                  <b>{{enterpriseName}}</b>
                </div>

              </div>
              <a href="javascript:void(0);" @click="centerDialogVisible = true" class="changePassword">修改密码</a>
              <div class="real-name-state" v-if="realNameState" v-show="accountLevel=='1'">
                <img src="../../../static/images/Account/realName.png">
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
                  <div class="right-line" style="height: 50px;">
                    <span style="display: inline-block;width: 60px;vertical-align: top;">序列号:</span>
                    <b style="display: inline-block;width: 180px;word-wrap:break-word;vertical-align: top;">{{issuedNumber}}</b>
                  </div>
                  <div class="right-line">
                    <span>颁发给:</span>
                    <b style="display: inline-block;width: 180px;word-wrap:break-word;vertical-align: top;">{{companyName}}</b>
                  </div>
                  <!--<div class="right-line">-->
                  <!--<span>证件号:</span>-->
                  <!--<b>{{cardNumber}}</b>-->
                  <!--</div>-->
                  <div class="right-line" style="margin-top: 20px;">
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

        <div class="sign-management" style="height: 330px;">
          <p class="title">签章管理</p>
          <div class="border-bottom"></div>
          <div class="sign-content">
            <!--签章管理显示逻辑：-->
             <!--一级账号：始终会有一个默认签章，可以再添加一个签章并且签章可以进行切换选择一个默认合同签章；-->
             <!--二级账号：二级账号激活后，进入我的账户页面，签章只显示一级账号选择的默认签章，无法进行签章切换操作-->
              <!--渲染签章列表逻辑-->
             <!--只有一级账号才会全部渲染，二级账号只显示默认签章-->
            <!--accountLevel  1为一级账号  2为二级账号  item.defultCode 0为默认签章 1为非默认签章->
            <!--item.signatureCode 签章编号 一级账号做默认签章修改时传入参数-->
            <!--chooseDefaultSeal  -->
            <div class="sign-picture" v-if="(accountLevel=='1')||((accountLevel=='2')&&(item.defultCode=='0'))"  v-for="(item,index) in SealList" :key="index" @click="changeDefaultSeal(item.signatureCode,item.defultCode)" :class="{'chooseDefaultSeal':(item.defultCode=='0')&&(accountLevel=='1')}">
              <!--合同章-->
              <img :src="[item.signaturePath]" >
              <!--<span v-if="item.defultCode=='0'"  :class="{'visibility':(accountLevel=='1')&&(item.defultCode=='0')}">默认合同章</span>-->

            </div>



            <div class="create-seal" v-if="!officeSeal" v-show="accountLevel=='1'">
            <!--<div class="create-seal" >-->
              <!--生成公章-->
              <p class="tips-img"  @click="showTipsImg" title="查看示例"></p>
              <span>录入公章防伪码在线生成</span>
              <b class="tips">签章生成后，将不可编辑，请仔细<br/>核对录入信息</b>

              <el-input type="text" v-model="createSeal"  ></el-input>
              <a href="javascript:void(0);" @click="newSeal">生成公章</a>
            </div>
            <el-dialog title="合同详情图片" :visible.sync="dialogVisible" custom-class="showSealDemo" >    <!-- :lock-scroll= false有问题！！！！ -->

              <img src="../../../static/images/Account/create-seal-demo.jpg"  style='width:100%;'>


            </el-dialog>
          </div>

        </div>

        <div class="seal-management" v-if="oneLever">
          <p class="title" style="position: relative;">账号管理

            <!--<el-tooltip class="item" effect="dark" style="width: 400px;" content="-->
            <!--一、什么是子账号？-->
            <!--子账号由企业管理员开通授权，使用手机号登录，可发起合同、管理合同-->
            <!--二、子账号拥有哪些权限？-->
            <!--子账号仅可管理本账号内的合同，不可接收合同文件-->
            <!--1.发起合同-->
            <!--可上传文件发起合同，也可以通过一级账号分配的模板发起合同-->
            <!--2.文件签署-->
            <!--签署“待我签署”状态的合同-->
            <!--3.下载文件-->
            <!--合同签署完成后，子账号管理员可将合同下载到本地-->
            <!--4.延期-->
            <!--合同已到达签署截止日且仍未签署完成时，子账号管理员可修改签署截止日-->
            <!--三、开通子账号需要哪几步？-->
            <!--1.录入子账号基本信息，对子账号管理员主体进行实名认证（若账号已经在微签注册、实名过，则不需要设置密码）-->
            <!--2.为子账号分配模板-->
            <!--3.提交开通子账号申请-->
            <!--4.短信通知子账号管理员-->
            <!--5.子账号管理员登录账号，签署授权书激活子账号" placement="right">-->
            <!--<span><i class="el-icon-warning" style="color: red;font-size: 20px;margin-left: 80px;position:absolute;top: 15px;"></i></span>-->

            <!--</el-tooltip>-->
          </p>

          <div class="border-bottom"></div>
          <div class="child-account" style="overflow: hidden" >

            <div class="account-list" >
              <!--<div class="list-content" v-for="item in accountList">-->
              <div class="list-content" v-for="(item,index) in accountList" :key="index" v-if="showSecondList">
                <ul>
                  <li>
                    <span>管理员姓名:</span>
                    <b >{{item.userName}}</b>
                  </li>
                  <li>
                    <span>账<span style="padding: 0 22px;"></span>号:</span>
                    <b >{{item.mobile}}</b>
                  </li>
                  <li>
                    <span>状<span style="padding: 0 22px;"></span>态:</span>
                    <b class="state" v-if="item.accountStatus=='0'">关闭</b>
                    <b class="state" v-if="item.accountStatus=='1'">开通</b>
                    <b class="state" v-if="item.accountStatus=='2'">未激活</b>
                    <b class="state" v-if="item.accountStatus=='3'">已激活</b>
                    <b class="state" v-if="item.accountStatus=='4'">待完善</b>
                    <b class="state" v-if="item.accountStatus=='5'">永久冻结</b>
                    <b class="state" v-if="item.accountStatus=='6'">已冻结</b>
                  </li>
                  <li>
                    <span>可
                      <span style="padding: 0 3px;"></span>用
                      <span style="padding: 0 1px;"></span>
                      模<span style="padding: 0 3px;"></span>板:</span>
                    <b><strong class="template-number">{{item.templateNum}}</strong>个</b>
                  </li>
                </ul>

                <!--<a class="finish" href="javascript:void(0)" @click="finish">完善</a>-->
                <!--<a class="edit" href="javascript:void(0)" @click="edit">编辑</a>-->
                <!--<a class="management" href="javascript:void(0)" @click="management">管理</a>-->
                <!--<a class="frozen" href="javascript:void(0)" @click="frozen">冻结</a>-->
                <!--<a class="thaw" href="javascript:void(0)" @click="thaw">解冻</a>-->

                <div class="operate" v-if="item.accountStatus=='1'">
                  <a class="frozen" href="javascript:void(0)" @click="frozen(item.accountCode,item.accountStatus)">冻结</a>
                </div>

                <div class="operate" v-if="item.accountStatus=='2'">
                  <!--未激活-->
                  <a class="edit" href="javascript:void(0)" @click="edit(item.accountCode,item.accountStatus)">编辑</a>
                  <!--<a class="management" href="javascript:void(0)" @click="edit(item.accountCode,item.accountStatus)">管理</a>-->
                </div>

                <div class="operate" v-if="item.accountStatus=='3'">
                  <!--已激活-->
                  <a class="edit" href="javascript:void(0)" @click="edit(item.accountCode,item.accountStatus)">编辑</a>

                  <a class="frozen" href="javascript:void(0)" @click="frozen(item.accountCode,item.accountStatus)">冻结</a>

                </div>

                <div class="operate" v-if="item.accountStatus=='4'">
                  <!--待完善-->
                  <a class="edit" href="javascript:void(0)" @click="edit(item.accountCode,item.accountStatus)">编辑</a>
                </div>

                <div class="operate" v-if="item.accountStatus=='5'">
                  <!--永久冻结-->
                  <div style="color: red;font-size: 14px;position: absolute;left: -190px;top: 80px;">该账号验证次数过多，无法继续使用</div>
                </div>

                <div class="operate" v-if="item.accountStatus=='6'">
                  <!--已冻结-->
                  <a class="thaw" href="javascript:void(0)" @click="frozen(item.accountCode,item.accountStatus)">解冻</a>

                </div>
              </div>

              <div class="left-plus" @click="sealManagement" v-if="addOperate" >
                <i class="el-icon-plus"></i>
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

              <div class="right-content" v-if="accountDefault">
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
                    子账号仅可管理本账号内的合同，不可接收合同文件。<br/><br/>
                     <span style="color: #d69856;line-height: 25px">发起合同<br/>
                       <span style="color: #333;">可上传文件发起合同，也可以通过一级账号分配的模板发起合同。</span>
                     </span>
                    <br/><br/>
                    <span style="color: #d69856;line-height: 25px">文件签署<br/>
                       <span style="color: #333;">签署“待我签署”状态的合同</span>
                     </span>
                     <br/><br/>
                    <span style="color: #d69856;line-height: 25px">延期<br/>
                       <span style="color: #333;">合同已到达截止签署日且仍未签署完成时，子账号管理员可修改签署截止日。</span>
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
                    （若账号已经在微签注册、实名过，则不需要设置密码）。<br/>
                    2:为子账号分配模板。<br/>
                    3:提交开通子账号申请。<br/>
                    4:短信通知子账号管理员。<br/>
                    5:子账号管理员登录账号，签署授权书激活子账号。<br/>
                  </span>
                </div>
              </div>
            </div>

          </div>
          <!--accountDefault  没有二级子账号-->

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
  import {validateSeal,TrimAll} from '@/common/js/validate'
  import cookie from '@/common/js/getTenant'
  import {validatePassWord} from '@/common/js/validate'
  import  AddChildAccount from './AddChildAccount/AddChildAccount'

  export default {
    name: 'Accounts',
    components:{
      AddChildAccount,
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
        ContractAllowance: '',
        baseURL:this.baseURL.BASE_URL,
        Jurisdiction:true,
        mobile:'',
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
        centerDialogVisible: false,
        authStatus:false,
        auditStatus:false,
        personalRealName:'',
        enterpriseRealName:'',
        identifier: false,
        personal:'',
        finalRejection:false,
        toEnterprise:null,  //根据进入页面时请求到的verfiyMoneyNum 判断是否再跳回注册页面
        officeSeal:true,
        officeSealUrl:'',
        b2bNum: '',
        b2cNum: '',

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
        signBadgePath:'',
        tenantSeal:'',     //签章图片
        showImage:false ,  //默认图片
        accountDefault:false ,//没有二级子账号
        accountList:'', //二级账号列表
        frozenDialogVisible:false, //子账号冻结弹窗
        thawDialogVisible:false, //子账号解结弹窗,
        AccountMobile:'',
        userName:'',
        templateNum:'',
        userState:'',
        officeSealList:[],  //公章列表,
        interfaceCode:cookie.getJSON("tenant")[1].interfaceCode , //interfaceCode
        addOperate:false,        //添加二级账号操作
        accountLevel:sessionStorage.getItem("accountLevel"),     //账户类型 1是一级账号 2是二级账号
        oneLever:false,             //默认为一级账号
        accountStatusNumber:'',
        tenantSealNo:'', //公章编号
        officeSealNo:'', //签章编号
        defaultCode:true,          //默认合同章显示选中效果
        showSecondList:true,  //二级账号列表页面是否显示
        showSeal:true,
        SealList:[],  //合同章图片
        accountName:'',   //账户名称
        dialogVisible:false,  //默认不显示签章提示图片

      }
    },
    methods: {
      AccoutCenter(){
        this.$router.push('/Account')
      },
      CostCenter(){
        this.$router.push('/CostCenter/Charge')
      },
      closeDialog (formName) {
        this.$refs[formName].resetFields()
        this.centerDialogVisible = false
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
        this.centerDialogVisible = false
      },
      // 显示生成公章案例
      showTipsImg(){

        this.dialogVisible=true;

      },
      realName() {
        if(this.personalRealName == '1' || this.personalRealName == '2'||this.personalRealName == '3' ){
          sessionStorage.setItem('userCode',cookie.getJSON('tenant')[0].userCode);
          sessionStorage.setItem('interfaceCode',cookie.getJSON('tenant')[1].interfaceCode);

          this.$router.push('/Pupload')
        }else if (this.personalRealName == '4'){

          this.$router.push('/ErrorPupload')

        }
      },

      // 修改密码
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

            return false;
          }
        });
      },

      edit(accountCode,accountStatus){

        var accountCode1=accountCode;
        sessionStorage.setItem("subAccountCode",accountCode1);
        if(accountStatus=='3'||accountStatus=='2'){
          this.$router.push('EditChildAccount');
        }else if(accountStatus=='4') {

          this.$router.push('EditChildNoActive');
        }
      },

      // 查询二级账号(数量)
      searchSecondAccounts(){
        this.$http.get(process.env.API_HOST+'v1.5/tenant/'+this.interfaceCode+'/secondAccounts').then(function (res) {
          //查询成功
          if(res.data.resultCode=='1'){

            this.accountList = res.data.dataList;
            let num=res.data.dataList.length;
            let maxNum=res.data.data.accountNumMax;


            if(num<maxNum){
              this.addOperate=true;
            }else{
              this.addOperate=false;
            }

          }if(res.data.resultCode=='0'){
            this.accountDefault=true;
            this.showSecondList=false;
            this.addOperate=true;

          }

        });

      },
      // 冻结，解冻二级账户
      frozen(accountCode,accountStatus){
        if(accountStatus=='3'){
          this.accountStatusNumber='6'
        }else{
          this.accountStatusNumber='3'
        }
        let accountCode1=accountCode;
        // 查询二级账号

        this.$http.post(process.env.API_HOST+'v1.5/tenant/'+this.interfaceCode+'/updateAccountStatus',{
          accountCode:accountCode1 ,  //账户编号
          accountStatus:this.accountStatusNumber,            //账户状态
        },{emulateJSON: true}).then(function (res) {
          if((res.data.resultCode == '0')&&(accountStatus=='6')){
            this.$alert(res.data.resultMessage, '提示',{
              confirmButtonText: '确定'
            });

          } else if((res.data.resultCode == '0')&&(accountStatus=='3')){
            this.$alert(res.data.resultMessage, '提示',{
              confirmButtonText: '确定'
            });

          }else if((res.data.resultCode=='1')&&(accountStatus=='6')){
            // 冻结成功后二级账号列表重新查询
            this.$loading.show(); //显示
            this.accountList=[];
            this.searchSecondAccounts();
            this.$loading.hide(); //显示
            this.$alert(res.data.resultMessage, '提示',{
              confirmButtonText: '确定'
            });

          }else if((res.data.resultCode == '1')&&(accountStatus=='3')){
            //冻结成功重新查询二级账号
             this.$loading.show(); //显示
            this.accountList=[];
            this.searchSecondAccounts();
            this.$loading.hide(); //loading隐藏
            this.$alert(res.data.resultMessage, '提示',{
              confirmButtonText: '确定'
            });
          }
        })
      },
      // 生成签章

      newSeal(){
        if(this.oneLever){
          if(TrimAll(this.createSeal) == ''){
            this.$alert('公章防伪码不能为空！','提示', {
              confirmButtonText: '确定'
            })

          }else if((TrimAll(this.createSeal)!='')&&!validateSeal(this.createSeal)){
            this.$alert('公章防伪码必须为13位数字！','提示', {
              confirmButtonText: '确定'
            })
          }else if(validateSeal(this.createSeal)){
            this.$http.get(process.env.API_HOST+'v1.5/tenant/createSignature', {params:{'interfaceCode':this.interfaceCode,'securityCode':this.createSeal}}).then(function (res) {
              if(res.data.resultCode == '1'){
                this.searchSeal();
              }
            })

          }
        }

      },

      // 查询签章
      searchSeal(){
        this.$http.get(process.env.API_HOST+'v1.5/tenant/'+this.interfaceCode+'/getSignatures').then(function (res) {

          let data=res.data;
          let sealArray=[];
         if(data.resultCode=='1'){
        //   console.log(data.dataList);
          for(let i=0;i<data.dataList.length;i++){
            sealArray.push(data.dataList[i])

          };
          if(data.dataList.length>1){
            this.officeSeal=true;
          }else {
            this.officeSeal=false;
          }
           this.SealList=sealArray;
         }else{

         }

        });
      },

      // 修改默认签章
      changeDefaultSeal(sealNo,defaultCode){
        let defaultCode1=defaultCode;
        if( defaultCode1=='1'){
          if(this.accountLevel=='1') {
            this.$confirm('您确定修改默认签章吗？, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {

              let sealNo_ = sealNo;
              this.$http.get(process.env.API_HOST + 'v1.5/tenant/' + this.interfaceCode + '/signature/' +sealNo_+ '/UpdateAccountSignature').then(function (res) {
                if (res.data.resultCode == '1') {
                  this.$alert(res.data.resultMessage, '提示', {
                    confirmButtonText: '确定'
                  });
                  this.searchSeal();
                } else {
                  this.$alert(res.data.resultMessage, '提示', {
                    confirmButtonText: '确定'
                  });
                }

              });

            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消修改默认签章'
              });
            });

          }
        }

      },
      shutDown(){
        this.finalRejection = false
      },
      audit(){
        sessionStorage.setItem('enterpriseName', cookie.getJSON('tenant')[1].companyName)
        sessionStorage.setItem('interfaceCode', cookie.getJSON('tenant')[1].companyName)
        if(this.toEnterprise != '3'){
          this.$router.push('/Enterprise')
        }
      },
      ToAccount(){
        if(this.personalRealName == '1' || this.personalRealName == '2'){
          sessionStorage.setItem('userCode',cookie.getJSON('tenant')[0].userCode)
          sessionStorage.setItem('interfaceCode',cookie.getJSON('tenant')[1].companyName)
          this.$router.push('/ErrorPupload')
        }
      },
      close(){
        this.modalTips = false
      },
      sealManagement() {

        if (this.Jurisdiction) {
          this.$router.push('/AddChildAccount')
        } else {
          this.$alert(<div style="textAlign:center">
            <p>对不起，您还未获得正式授权，暂不支持开通子账号</p>
            <p class="vertifiId-warn warn-first">客服电话:400-0000-6923</p>
           </div>, '警告',{confirmButtonText: '确定',});

        }
      },
      // 完善子账号
      finish(){

      },
      //解冻子账号
      thaw(){
        this.thawDialogVisible=true
      }

    },
    mounted() {
      this.mobile = cookie.getJSON('tenant')[0].mobile
      this.companyName = cookie.getJSON('tenant')[1].companyName

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


      // 意见  待定
      this.$http.get(process.env.API_HOST+'v1.4/tenant/'+ this.interfaceCode + '/auditStatus').then(function (res) {

        if(res.data.resultCode=='1'){
          // this.toEnterprise = res.data.data.verifyMoneyNum
          this.realNameState=true;
        }else{
          this.realNameState=false;
        }

        // this.toEnterprise = res.data.data.verifyMoneyNum
      })
      //  // 查询证书
      this.$http.get(process.env.API_HOST+'v1.5/tenant/'+this.interfaceCode+ '/getCertificate').then(function (res) {
        if(res.data.resultCode=='1'){
          this.serialNumber=res.data.data.userCode;
          this.issuedNumber=res.data.data.certificateNo;
        //   this.enterpriseName=res.data.data.companyName;
            this.companyName=res.data.data.companyName;
          // this.authName=res.data.data.userName;
          this.cardNumber=res.data.data.mobile;
          this.effectiveStartTime=res.data.data.certificateStartTime;
          this.effectiveEndTime=res.data.data.certificateDueTime;
        }
      });
      //  账户信息
      let accountCode=sessionStorage.getItem("accountCode");


      this.$http.get(process.env.API_HOST+'v1.5/tenant/'+accountCode+'/getAccountInformation').then(function (res) {
        if(res.data.resultCode=='1'){

          this.mobile=res.data.data.mobile;
          this.accountName=res.data.data.accountName;
          this.Email=res.data.data.email;
          this.account=res.data.data.enterpriseName;
          this.authName=res.data.data.authorizerName;
          this.enterpriseName=res.data.data.enterpriseName;
          sessionStorage.setItem("authName",this.authName);
          this.b2bNum = res.data.data.b2bNum;
          this.b2cNum = res.data.data.b2cNum;
          this.ContractAllowance = Number(this.b2bNum) + Number(this.b2cNum);
        }
      })


      if(this.accountLevel=='1'){
        this.oneLever=true;    //一级账号才去请求查询一级账号关联的所有二级账户信息

        this.searchSecondAccounts();
      }else {
        this.oneLever=false;      //二级账号不查询，并且不显示账号管理模块
      }
      // 子账户信息

      //获取合同章
      this.searchSeal();

      //是否付费 0未付费 1付费
      var Status = cookie.getJSON('tenant')[1].isBusiness;
      // console.log("Status"+Status)
      if(Status == '0'){
        this.Jurisdiction = false

      }else {
        this.Jurisdiction = true
      }


    },
  }
</script>

<style lang="stylus">

  @import "../../styles/Account/Account.styl";
  .content-body .title,.sign-management .title,.seal-management .title{

    background: url("../../../static/images/Common/title.png") no-repeat;
  }
  .right-card{
    background: url('../../../static/images/Common/numberCertificate.png') no-repeat 18px 2px;
    background-size: 94%;
  }
  .create-seal{
    background: url("../../../static/images/Account/defalut-seal.png")no-repeat;
  }
  .seal-management .left-plus,.child-account>.account-list>.list-content{
    background: url("../../../static/images/Account/addSeal.png")no-repeat;
  }
  .border-bottom{
    width:100%;height: 1px;border-bottom: 1px solid #ddd;margin-top: 20px
  }
  .chooseDefaultSeal{
    background: url("../../../static/images/Account/default-seal.png")no-repeat;
  }
 .visibility{
   visibility:hidden;
  }
  .create-seal>.tips-img{
    position: absolute;
    width: 20px;
    height: 20px;
    right: 5px;
    top:5px;
    cursor: pointer;
    background: url("../../../static/images/Account/seal-tips.png")no-repeat;
  }
  .showSealDemo{
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .vertifiId-warn{
    color:red
  }
  .warn-first{
    margin-top:25px!important;
  }

</style>
