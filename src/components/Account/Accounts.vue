<!--我的账户->新增二级账户-->
<template>
    <div class="Accounts">

    <div class="main" >

      <div class="container">
        <div class="tab-body" v-show="isShow">
            <div class="tap">
                <div class="btn-active"  @click="AccoutCenter">账户中心</div>
                <div class="btn-default" style="margin-left: -5px;" @click="CostCenter">费用中心</div>
            </div>
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
                  <b v-if="Email">{{Email}}</b>
                  <b v-else>暂未绑定</b>
                  <!--<a v-if="!Email" href="javascript:void(0);" style="float: right;color: #4091fb;padding-right: 10px;" @click="bindEmailShow">绑定邮箱</a>-->
                  <a  href="javascript:void(0);" style="float: right;color: #4091fb;padding-right: 10px;" @click="bindEmailShow" v-if="!Email">绑定邮箱</a>
                </div>
                <div class="card-line" v-if="accountLevel=='1'">
                  <span>被授权人姓名:</span>
                  <b>{{authName}}</b>
                </div>
                <div class="card-line">
                  <span>账&nbsp;&nbsp;户&nbsp;&nbsp;余&nbsp;&nbsp;额:</span>
                  <span>{{accountMoney}}&nbsp;元</span>
                  <a href="javascript:void(0);" style="float: right;color: #4091fb;padding-right: 10px;font-size: 14px;" @click="packageBuy" v-if="oneLever">立即充值</a>
                </div>

                <div class="card-line">
                  <span>合&nbsp;&nbsp;同&nbsp;&nbsp;余&nbsp;&nbsp;量:</span>
                  <span>{{ContractAllowance}}&nbsp;份</span>
                  <a href="javascript:void(0);" style="float: right;color: #4091fb;padding-right: 10px;font-size: 14px;" @click="packagePurchase" v-if="oneLever">立即购买</a>
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
                <img src="/static/images/Account/realName.png">
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
                  <div class="right-line">
                    <span style="display: inline-block;width: 60px;vertical-align: top;">识别码:</span>
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
        <div class="sign-setting"> 
            <div class="sign-management">
                <p class="title">签章管理</p>
                <div class="border-bottom"></div>
                <div class="sign-content">
                <!--签章管理显示逻辑：-->
                <!--一级账号：始终会有一个默认签章，可以再添加一个签章并且签章可以进行切换选择一个默认合同签章；-->
                <!--二级账号：二级账号激活后，进入我的账户页面，签章只显示一级账号选择的默认签章，无法进行签章切换操作-->
                <!--渲染签章列表逻辑-->
                <!--只有一级账号才会全部渲染，二级账号只显示默认签章-->
                <!--accountLevel  1为一级账号  2为二级账号  item.defultCode 0为默认签章 1为非默认签章->
                item.signatureCode 签章编号 一级账号做默认签章修改时传入参数-->
                <!--chooseDefaultSeal  -->
                <div class="sign-bg" style="display:flex">
                        <div class="sign-picture"   v-for="(item,index) in SealList" :key="index" @click="changeDefaultSeal(item.signatureCode,item.defultCode)" :class="{'chooseDefaultSeal':(item.defultCode=='0')&&(accountLevel=='1')}" v-if="(accountLevel=='1')||((accountLevel=='2')&&(item.defultCode=='0'))" >
                            <div style="padding: 2px; box-sizing: border-box;">
                                <!--合同章-->
                            <img :src="[item.signaturePath]">
                        </div>
                    </div>
                    <div style="">
                        <div class="create-seal" v-if="!officeSeal" v-show="accountLevel=='1'">
                        <!--生成公章-->
                            <p class="tips-img"  @click="showTipsImg" title="查看示例"></p>
                            <span>录入公章防伪码在线生成</span>
                            <b class="tips">签章生成后，将不可编辑，请仔细<br/>核对录入信息</b>
                            <el-input type="text" v-model="createSeal"  ></el-input>
                            <a href="javascript:void(0);" @click="newSeal">生成公章</a>
                        </div>
                    </div>
                    <el-dialog  :visible.sync="dialogVisible" custom-class="showSealDemo" >
                    <!-- :lock-scroll= false有问题！！！！ -->
                        <img src="/static/images/Account/create-seal-demo.jpg"  style='width:100%;'>
                    </el-dialog>
                </div>
                    
                </div>
            </div>
            <div class="sign-controll sign-management" >
                <p class="title">配置管理</p>
                <div class="border-bottom"></div>
                <div class="controll-content">
                    <div class="sign-bg">
                        <div class="sign-controll-manage">
                            <div class="switch-btn">
                                <span class="sign-setting-title">签署时验证签署密码</span>
                                <el-switch  v-model="signVerify" @change="handleSignVerify"></el-switch>
                            </div>
                            <div class="password-manage">
                                <span class="sign-setting-title">签署密码设置</span>
                                  <el-button type="primary" v-if="!hasSettingPwd" @click="setSignPwd">设置密码</el-button>
                                  <el-button type="primary" v-else plain @click="resetSignPwd">重置密码</el-button>
                            </div>
                        </div>
                    </div> 
                    <el-dialog id="sign-pwd-dialog" :visible.sync="signPwdVisible" width="520px" :close-on-click-modal="false" :before-close="cancelPwd">
                        <p class="sign-dialog-title">设置签署密码</p>
                        <el-form :model="signForm" :rules="signRules" ref='signRef' label-width="150px">
                            <el-form-item label="请输入新签署密码" prop="signPassword">
                                <el-input v-model="signForm.signPassword" type="password" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="再次确认新签署密码" prop="verifySignPassword">
                                <el-input v-model="signForm.verifySignPassword" type="password" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="submitSignPwd('signRef')">提交</el-button>
                        </div>
                    </el-dialog>
                    <el-dialog id="sign-code-dialog" :visible.sync="codeVisible" width="520px" :close-on-click-modal="false" :before-close="cancelCode">
                        <p class="sign-dialog-title">将会向<span style="font-size: 20px;color: #4091fb;">{{formatMobile}}</span>发送短信验证码</p>
                        <el-form :model="signCodeForm" :rules="smsRules" ref="smsRef">
                            <el-form-item prop="signSmsCode">
                                <el-input v-model="signCodeForm.signSmsCode" type="text" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item>
                                  <el-button style="width:112px" type="primary" ref="signCodeInfo"  @click="getSignSendCode('smsRules')" :disabled="signCodeBtn" v-text="signCodeText"></el-button>
                            </el-form-item>
                        </el-form>
                        
                         <div slot="footer" class="dialog-footer">
                            <el-button @click="cancelCode">取 消</el-button>
                            <el-button type="primary" @click="smsCodeSubmit('smsRef')">确 定</el-button>
                        </div>
                    </el-dialog>
                </div>
            </div>
        </div>
        <div class="seal-management" v-if="oneLever">
            <p class="title" style="position: relative;">账号管理 </p>
            <div class="border-bottom"></div>
          <div class="child-account" style="overflow: hidden" >
            <div class="account-list">
              <!-- <div class="list-content" v-for="item in accountList"> -->
                <div v-if="showSecondList">
                    <div class="list-content" v-for="(item,index) in accountList" :key="index">
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
                    <span class="question-answer">子账号是企业管理员开通授权，使用手机号登录，可发起合同、管理合同 </span>
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
    <!--绑定邮箱-->
    <el-dialog :visible.sync="bindEmailDialog" width="430px" custom-class="bindEmail" center>
      <div class="tips">请输入想要绑定的邮箱账号</div>

      <el-form :model="bindEmailForm" :rules="EmailRules" ref="EmailRules" label-width="100px" class="demo-ruleForm">

        <el-form-item prop="email" label="邮箱账号" >
          <el-input type="text" placeholder="邮箱账号" class="forget-messageInput" v-model="bindEmailForm.email" style="width: 234px;">
          </el-input>

        </el-form-item>

        <el-form-item prop="smsCode" label="验证码">
          <el-input type="text" placeholder="请输入6位数字验证码" class="forget-messageInput" v-model="bindEmailForm.smsCode" style="width: 150px;">

          </el-input>
          <el-button type="primary" class="forget-messageButton" @click="sendCode('EmailRules')" style="margin-left:10px;" id="codeInfo" :disabled="onceCode">获取验证码</el-button>
        </el-form-item>

        <div class="forget-btn" style="text-align: center;margin-top: 15px;">
          <el-button type="primary" @click="bindEmailSubmit('EmailRules')" style="width: 295px;" :disabled="once">提&nbsp;&nbsp;交</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import md5 from 'js-md5'
  import cookie from '@/common/js/getTenant'
  import {validatePassWord,validateEmail,validateSmsCode,validateSeal,TrimAll,valiteSignPwd,slicePhone} from '@/common/js/validate'
  import  AddChildAccount from './AddChildAccount/AddChildAccount'
  import {modifyPassword,secondAccounts,updateAccountStatus,createSignature,getSignatures,UpdateAccountSignature,getCertificate,getAccountInformation,bindEmail,changeSignSet,changeSignPwd} from '@/api/account'
  import server from '@/api/url'
  import {login,bindEnterprises,valitedSmsCode} from '@/api/login'
  import qs from 'qs';

  export default {
    name: 'Accounts',
    components:{
      AddChildAccount,
    },
    data() {
        let validateOldPassWord = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入原密码'));
            } else {
            let params={
                "username":this.mobile,
                "password":md5(this.ruleForm.oldPassWord)
            }
            server.verficate(params).then(res=>{
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
        let validateBindEmail = (rule, value, callback) => {
            if (value == '') {
            callback(new Error('邮箱不可为空'));
            }else if (value !== '' && !validateEmail(value)){
            console.log(value)
            callback(new Error('邮箱输入格式不正确'));
            } else {
            callback();
            }
        }
        let validateBindSmsCode= (rule, value, callback) => {
            if (value === '') {
                callback(new Error('验证码不可为空'));
            } else if(!validateSmsCode(TrimAll(value))) {
                callback(new Error('验证码只能是6位数字'));
            } else {
                callback();
            }
        }
        let validateSignPwd = (rule,value,callback) =>{
            if(!value){
                callback(new Error('签署密码不能为空'));
            }else if(!valiteSignPwd(value)){
                callback(new Error('密码格式为4-16位数字、字母、或数字字母组合'));
            }else{
                callback()
            }
        }
        let verficateSignPwd = (rule,value,callback) =>{
            console.log(value,this.signForm.signPassword)
            if(!value){
                callback(new Error('请再次确认签署密码'));
            }else if(this.signForm.signPassword != value){
                callback(new Error('两次输入的签署密码不一致'));
            }else{
                callback()
            }
        }
      return{
        timer:null, //定时器
        smsType:'',
        signCodeText:'获取验证码',
        smsValited:false,
        signCodeBtn:false,
        signCodeForm:{
            signSmsCode:''
        },
        smsRules:{
            signSmsCode:[
                {validator: validateBindSmsCode, trigger: 'blur'}
            ]
        },
        signForm:{
            signPassword:'',
            verifySignPassword:''
        },
        signRules:{
            signPassword:[
                { validator: validateSignPwd, trigger: 'blur'}
            ],
            verifySignPassword:[
                 { validator: verficateSignPwd, trigger: 'blur'}
            ]
        },
        codeVisible:false, //短信验证
        signPwdVisible:false,
        showSignSet:cookie.getJSON("tenant")[1].isBusiness == 1?true:false,
        hasSettingPwd:!cookie.getJSON("tenant")[1].signVerifyPassword?false:true,   //是否设置过密码
        signVerify:cookie.getJSON("tenant")[1].signVerify==0?false:true,           //密码开关
        isShow: true,
        ContractAllowance: '',
        baseURL:this.baseURL.BASE_URL,
        Jurisdiction:true,
        mobile:sessionStorage.getItem("mobile"),
        formatMobile:'',
        hasGetCode:false,
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
        ruleForm: {      //更改密码弹窗校验
          oldPassWord: '',
          newPassWord: '',
          checkPassWord:''
        },
        realNameState:true,
        bindEmailDialog:false,  //绑定邮箱弹窗
        bindEmailForm:{    //绑定邮箱数据
          email:'',
          smsCode:''
        },
        EmailRules:{    //邮箱输入校验规则
          email:[
            { validator: validateBindEmail, trigger: 'blur' }
          ],
          smsCode:[
            { validator: validateBindSmsCode, trigger: 'blur' }
          ]
        },
        rules:{   //修改密码输入校验规则
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
        accountCode:cookie.getJSON("tenant")[1].accountCode , //interfaceCode
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
        once:false, //绑定邮箱单次点击
        accountMoney:'',   //账户余额
        smsNo: '',
        smsCode: '',
        appId:'',  //验证码返回appId
        smsNoVer:'',
        smsCodeNum:0,
        onceCode:false, //验证码单机操作
        passwordIdentification: "签署密码设置成功" //0-设置密码， 1-重置密码
      }
    },
    methods: {
        resetFormData(){
            this.smsNo = '';
            this.signCodeForm.signSmsCode = '';
            this.signCodeBtn = false;
            this.hasGetCode = false;
            // this.signCodeText = '获取验证码';
            this.signForm={
                signPassword:'',
                verifySignPassword:''
            }
            // clearInterval(this.timer);
            // console.log(this.signCodeText)
        },
        //设置签署密码
        handleSignVerify(value){     //判断是否设置密码   设置后开启直接开启 关闭进行手机号验证
            let that = this;
            console.log(that.hasSettingPwd)
            if(!that.hasSettingPwd){
                that.$message.error('请先设置签署密码')
                that.signVerify = false
            }else{
                if(!value){                   //关闭时value为false
                    that.codeVisible = true   //手机校验
                    that.signVerify = true;
                    this.smsType = 'switch';
                }else{
                    that.signVerify = false;   //开启开关(默认会改变signVerify的值 这里先设置关时true  开时false  再接口请求成功后取反方正确)
                    that.chengeSignStatus();

                }
            }
        },
        //设置密码
        setSignPwd(){
            this.signPwdVisible = true;
            this.passwordIdentification = "签署密码设置成功";
        },
        //重置密码
        resetSignPwd(){
            this.codeVisible = true;
            this.passwordIdentification = "签署密码重置成功";
            this.smsType = 'reset';
        },
        //设置密码提交
        submitSignPwd(ruleName){
            let that = this;
            that.$refs[ruleName].validate((valid) => {
                if(valid){
                    let param={
                        signVerifyPassword:md5(that.signForm.signPassword)
                    }
                    changeSignPwd(that.accountCode,param).then(res=>{
                        if(res.data.resultCode == 1){
                            that.$message({
                                showClose: true,
                                message: this.passwordIdentification,
                                type: 'success'
                            });
                            that.signPwdVisible = false;
                            that.hasSettingPwd = true;
                            // that.updateSession()
                            that.resetFormData()
                        }else{
                            that.$message({
                                showClose: true,
                                message:res.data.resultMessage,
                                type: 'warning'
                            });
                        }
                    }).catch(res=>{

                    })
                }
            })
        },
        //切换验证
        chengeSignStatus(){
            let that = this;
            let param={
                signVerify:that.signVerify?0:1
            }
            changeSignSet(that.accountCode,param).then(res=>{
                if(res.data.resultCode == 1){
                    sessionStorage.setItem('signVerify',res.data.data);
                    that.codeVisible = false;
                    that.signVerify = !that.signVerify
                    that.$message({
                        showClose: true,
                        message:res.data.resultMessage,
                        type: 'success'
                    });
                    that.updateSession()
                    that.resetFormData()
                }else{
                    that.$message({
                        showClose: true,
                        message: res.data.resultMessage,
                        type: 'error'
                    });
                }
            }).catch(err=>{

            })
        },

        //重置密码
        restPwd(){
            let that = this;
            that.codeVisible = false
            that.$loading.show(); //显示
            setTimeout(function(){
                that.$loading.hide(); //显示
                that.signPwdVisible = true;
            },1000)

        },
        //短信验证提交
        smsCodeSubmit(ruleName){
            if(this.hasGetCode){
                this.$refs[ruleName].validate((valid)=>{
                    if(valid){
                        if(this.smsType == 'switch'){
                            this.valiteSmsCode('switch')
                        }else if(this.smsType == 'reset'){
                            this.valiteSmsCode('reset')
                        }
                    }
                })
            }else{
                this.$message({
                    showClose: true,
                    message:'请先获取验证码',
                    type: 'warning'
                });
            }
        },
        //取消短信验证
        cancelCode(){
            this.codeVisible = false;
            this.$refs['smsRef'].clearValidate();
            this.resetFormData()
        },
        //取消密码
        cancelPwd(){
            this.signPwdVisible = false;
            this.$refs['signRef'].clearValidate();
            this.resetFormData()
        },
        //获取验证码
        getSignSendCode(){
            let codeType = '0',curCount = 60;
            this.signCodeBtn = true;
            let params={'mobile': 13651305434,'interfaceCode':this.interfaceCode};
            server.smsCodeOld(params).then(res=> {
                this.smsNo=res.data.smsNo;   //短信编号
                this.appId=res.data.appId;   //appId
                let resultCode = res.data.resultCode;
                if (resultCode == '1') {
                    this.hasGetCode = true;
                    this.signCodeText =  curCount + '秒';
                    this.timer = setInterval( ()=> {
                    this.signCodeText = (curCount - 1) + '秒';
                        if (curCount== 0) {
                            this.signCodeText = '获取验证码';
                            this.signCodeBtn = false;
                            clearInterval(this.timer);
                        } else {
                            curCount --
                        }
                    }, 1000)
                }else{

                }
            })
        },

        //验证验证码
        valiteSmsCode(type){
            let that = this;
            let param={
              'mobile': that.mobile,
              'smsNo': that.smsNo,
              'appId': that.appId,
              'smsCode': that.signCodeForm.signSmsCode
            }
            valitedSmsCode(param).then(res=>{
              if(res.data.resultCode == 1) {
                  if(type == 'reset'){
                      that.restPwd()
                  }else if(type == 'switch'){
                      that.chengeSignStatus()
                  }
              }else {
                that.$message({
                  showClose: true,
                  message: res.data.resultMessage,
                  type: 'error'
                });
              }
            }).catch(error=>{

            })
        },

     /*   配置管理逻辑结束 */

        packageBuy(){
            this.$router.push('/PackageBuy')
        },
        packagePurchase(){
            this.$router.push('/PackagePurchase')
        },
        bindEmailShow(){
            this.bindEmailDialog=true
        },
        bindEmailSubmit(ruleName){
            this.$refs[ruleName].validate((valid) => {
            if (valid) {
                let params={
                'mobile': this.mobile,
                'smsNo': this.smsNo,
                'smsCode': this.bindEmailForm.smsCode,
                'appId': this.appId
                }
            server.valiteSmsCode(params).then(res=>{
                if (res.data.resultCode != 1) {
                this.$message({
                    showClose: true,
                    message: res.data.resultMessage,
                    type: 'error'
                })
                }else{
                let params={
                    email:this.bindEmailForm.email
                };
                bindEmail(this.interfaceCode,params).then(res=>{
                    if (res.data.resultCode= 1) {

                    this.$message({
                        showClose: true,
                        message: '邮箱绑定成功',
                        type: "success"
                    });
                    this.bindEmailDialog=false
                    this.getAccountInformation();
                    }else{

                    this.$message({
                        showClose: true,
                        message: res.data.resultMessage,
                        type: "success"
                    });
                    }
                }).catch(error=>{

                })
                }
            }).catch(error=>{

            })


            }else {

            }
            })
        },

        sendCode(ruleName){

        if(!this.bindEmailForm.email){
            this.$message({
            showClose: true,
            message: "绑定邮箱不可为空",
            type: "success"
            });

            return false
        }else if(!validateEmail(this.bindEmailForm.email)){

            this.$message({
            showClose: true,
            message: "绑定邮箱格式输入不正确",
            type: "success"
            });
            return false
        }else{
            var codeType = '0';
            var count = 60;
            var curCount = count;
            var timer = null;

            this.sms = true;
            let params={'mobile': this.mobile,'interfaceCode':this.interfaceCode};
            this.onceCode=true
            server.smsCodeOld(params).then(res=> {
            this.smsNoVer=res.data.smsNo;   //短信编号
            this.appId=res.data.appId;   //appId
            let resultCode = res.data.resultCode;
            this.smsNo = res.data.smsNo;
            let smsCode = res.data.smsCode;

            if (resultCode == '1') {
                this.smsCodeNum +=1;
                if(this.smsCodeNum == 3){
                this.isDisabled = true
                } else{
                this.isDisabled = false
                }
                let codeInfo = document.getElementById('codeInfo')
                codeInfo.innerText =  curCount + '秒';

                timer = setInterval( ()=> {
                codeInfo.innerText = (curCount - 1) + '秒';
                if (curCount== 0) {
                    codeInfo.innerText = '获取';
                    this.onceCode=false;
                    clearInterval(timer);


                } else {
                    curCount--
                }
                }, 1000)
            }else{
                this.repeat = false;
                this.$alert(res.data.resultMessage,'提示', {
                confirmButtonText: '确定'
                })

            }
            }).catch(error=>{

            })
        }


        },
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
        // 修改密码
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                let params={
                "mobile":this.mobile,
                "oldPassword":md5(this.ruleForm.oldPassWord),
                "newPassword":md5(this.ruleForm.newPassWord)
                }
                modifyPassword(params).then(res=> {
                let resultCode = res.data.resultCode;
                if ( resultCode === '1') {
                    this.$message({
                    showClose: true,
                    message: res.data.resultMessage,
                    type: 'success'
                    });
                    this.centerDialogVisible = false;
                    this.$router.push('/')
                } else {
                    this.$message({
                    showClose: true,
                    message: res.data.resultMessage,
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
        edit(accountCode,accountStatus){

            let accountCode1=accountCode;
            sessionStorage.setItem("subAccountCode",accountCode1);
            if(accountStatus=='3'||accountStatus=='2'){
            this.$router.push('EditChildAccount');
            }else if(accountStatus=='4') {

            this.$router.push('EditChildNoActive');
            }
        },
        // 查询二级账号(数量)
        searchSecondAccounts(){
            secondAccounts(this.interfaceCode).then(res=> {
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
            }).catch(error=>{

            })

        },
        // 冻结，解冻二级账户
        frozen(accountCode,accountStatus){
            if(accountStatus=='3'){
            this.accountStatusNumber='6'
            }else{
            this.accountStatusNumber='3'
            }
            let accountCode1=accountCode;
            // 更新二级账号状态
            let params={
            accountCode:accountCode1 ,  //账户编号
            accountStatus:this.accountStatusNumber,            //账户状态
            }
            updateAccountStatus(this.interfaceCode,params).then(res=> {
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
            }).catch(error=>{

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
                let params={
                "interfaceCode":this.interfaceCode,
                "securityCode":this.createSeal   //13位用户输入码
                }
                createSignature(params).then(res=> {
                if(res.data.resultCode == '1'){
                    this.searchSeal();
                }
                }).catch(error=>{

                })
            }
            
            }

        },

        // 查询签章
        searchSeal(){
            getSignatures(this.interfaceCode).then(res=> {
            let data=res.data;
            let sealArray=[];
            if(data.resultCode=='1'){
                //   console.log(data.dataList);
                for(let i=0;i<data.dataList.length;i++){
                sealArray.push(data.dataList[i])
                }
                if(data.dataList.length>1){
                this.officeSeal=true;
                }else {
                this.officeSeal=false;
                }
                this.SealList=sealArray;
            }else{

            }
            }).catch(error=>{

            })
        },

        // 修改默认签章
        changeDefaultSeal(sealNo,defaultCode){
            let defaultCode1=defaultCode;
            if( defaultCode1=='1'){
            if(this.accountLevel=='1') {
                this.$confirm('您确定修改默认签章吗？是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {

                let sealNo_ = sealNo;
                UpdateAccountSignature(this.interfaceCode,sealNo_).then(res=>{
                    if (res.data.resultCode == '1') {
                    // this.$alert(res.data.resultMessage, '提示', {
                    //     confirmButtonText: '确定'
                    // });
                    this.$message({
                        showClose: true,
                        message: res.data.resultMessage,
                        type: 'success'
                    });
                    this.searchSeal();
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.resultMessage,
                            type: 'warning'
                        });
                    }
                });
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消修改默认签章'
                });
                }).catch(error=>{

                })

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
                <p class="vertifiId-warn warn-first">客服电话:010-57625108</p>
            </div>, '警告',{confirmButtonText: '确定',});

            }
        },
        //解冻子账号
        thaw(){
            this.thawDialogVisible=true
        },
        getAccountInformation(){
            let accountCode=sessionStorage.getItem("accountCode");
            getAccountInformation(accountCode).then(res=> {
            if(res.data.resultCode=='1'){

                this.mobile=res.data.data.mobile;
                this.accountName=res.data.data.accountName;
                this.accountMoney=res.data.data.accountMoney;
                this.Email=res.data.data.email;
                this.account=res.data.data.enterpriseName;
                this.authName=res.data.data.authorizerName;
                this.enterpriseName=res.data.data.enterpriseName;
                sessionStorage.setItem("authName",this.authName);
                this.b2bNum = res.data.data.b2bNum;
                this.b2cNum = res.data.data.b2cNum;
                this.ContractAllowance = Number(this.b2bNum) + Number(this.b2cNum);
            }
            }).catch(error=>{

            })
        },

         //刷新session数据重新请求homePage接口
            updateSession(){
                let param={
                    mobile:this.mobile
                }
                server.login(param,this.interfaceCode).then(res => {
                    //先判断是否为实名用户，再根据isBusiness 判断是否有发起合同10次限制
                    //判断是否为实名用户 auditSteps=3 已实名
                    if(res.data.dataList[1].auditSteps!=3){

                    cookie.set("tenant", res.data.dataList); //存入cookie 所需信息

                    }else{

                    cookie.set("tenant", res.data.dataList);

                    }
                }).catch(error => {

                });
            }
        },
        created() {
           // 查询证书
           this.formatMobile = slicePhone(this.mobile),
           console.log(this.hasSettingPwd)
            getCertificate(this.interfaceCode).then(res=> {
                if(res.data.resultCode=='1'){
                this.serialNumber=res.data.data.userCode;
                this.issuedNumber=res.data.data.certificateNo;
                this.companyName=res.data.data.companyName;
                this.cardNumber=res.data.data.mobile;
                this.effectiveStartTime=res.data.data.certificateStartTime;
                this.effectiveEndTime=res.data.data.certificateDueTime;
                }
            }).catch(error=>{

            })

            this.getAccountInformation();
            this.updateSession()

            if(this.accountLevel=='1'){
                this.oneLever=true;    //一级账号才去请求查询一级账号关联的所有二级账户信息
                this.searchSecondAccounts();
            }else {
                this.isShow = false;
                this.oneLever=false;      //二级账号不查询，并且不显示账号管理模块
            }
            // 子账户信息

            //获取合同章
            this.searchSeal();
            //是否付费 0未付费 1付费
            let Status = cookie.getJSON('tenant')[1].isBusiness;

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

    background: url("/static/images/Common/title.png") no-repeat;
  }
  .right-card{
    background: url('/static/images/Common/numberCertificate.png') no-repeat 18px 2px;
    background-size: 94%;
  }
  .create-seal{
    background: url("/static/images/Account/defalut-seal-set.png") no-repeat;
  }
  .seal-management .left-plus,.child-account .account-list .list-content{
    background: url("/static/images/Account/addSeal.png") no-repeat;
  }
  .border-bottom{
    width:100%;height: 1px;border-bottom: 1px solid #ddd;margin-top: 20px
  }
  .chooseDefaultSeal{
    background: url("/static/images/Account/default-seal.png") no-repeat;
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
    background: url("/static/images/Account/seal-tips.png") no-repeat;
  }
  .showSealDemo{
    width :500px!important;
    height 500px!important;
    overflow hidden;
  }
  .vertifiId-warn{
    color:red
  }
  .warn-first{
    margin-top:25px!important;
  }

  .bindEmail .tips{
    font-size: 14px;
    color: #333;
    margin: 20px auto;
    text-align: center;
  }
    .sign-setting{
        display:flex;
        .sign-management{
            width:50%;
        }
        .sign-bg{
            background: #fafafa;
            padding: 20px;
            border-radius: 5px;
        }
       .controll-content{
           margin: 20px;
        }
        .sign-controll-manage{
            background:#fff;
            padding:15px;
        }
        .sign-setting-title{
            color:#666;
            font-size:16px;    
        }
        .switch-btn{
            border-bottom: 1px solid #dcdfe6;
            padding-bottom: 20px;
            .el-switch{
                float:right;
            }
        }
        .password-manage{
            padding-top:20px;
            padding-bottom: 130px;
            .el-button{
                float:right
            }  
        }
        .sign-dialog-title{
            text-align: center;
            font-size: 20px;
            margin-bottom: 40px;
            color: #333;
        }
        #sign-pwd-dialog{
            /deep/ .el-input__inner{
                width:290px;
            } 
            .dialog-footer{
                text-align: center;   
            } 
            .el-button{
                width:120px;    
            }  
        }
        #sign-code-dialog{
            .el-form{
                display:flex;
            }
            .el-form-item{
                margin-bottom:0;
            }
            .el-input{
                margin-left:40px;
            }
            /deep/ .el-input__inner{
                width:290px;
            } 
            .el-form-item__error{
                left:40px;
            }
             .dialog-footer{
                text-align: center;   
            } 
        }
        
    }
</style>

