<template>
  <div class="main">
    <div class="companyCertificate">
      <div class="step">
        <ul>
          <li class="active"><i class='el-icon-goods'></i><b>实名认证</b></li>
          <p></p>
          <li><i class='el-icon-menu'></i><b>打款验证</b></li>
          <p></p>
          <li><i class='el-icon-check'></i><b>完成</b></li>
        </ul>
      </div>
      <div class="line"></div>
      <!-- 查看示例 -->
      <el-dialog
        :visible.sync="licenseExample"
        width="500px"
      >
        <img src="/static/images/case.png" alt="" style="width:100%;height:100%;">
      </el-dialog>
      <el-dialog
        :visible.sync="frontIdExample"
        width="300px"
      >
        <img src="/static/images/frontPhoto.png" alt="" style="width:100%;height:100%;">
      </el-dialog>
      <el-dialog
        :visible.sync="backIdExample"
        width="300px"
      >
        <img src="/static/images/backPhoto.png" alt="" style="width:100%;height:100%;">
      </el-dialog>
      <!-- 企业授权委托书弹框 -->
      <el-dialog
        :visible.sync="synopsis"
        width="700px"
      >
        <div class="enterprise-attorney-synopsis">
          <h2 class="synopsis-title">企业授权委托书</h2>
          <p>
            <span>致：</span>
            <span>北京众签科技有限公司</span>
          </p>

          <p class="synopsis-text">
            <span>我单位</span>
            <span class="add-info">{{licenseInfo.tenantName}}</span>
            <span>现委托</span>
            <span class="add-info">{{IdInfo.userName}}</span>
            <span style="line-height:18px;">作为我单位合法代理人，授权其代表我单位使用贵司微签平台。该委托代理人使用微签平台的授权范围为：代表我单位发出签约请求、签署电子合同在内的各类文件、对已签约的文件进行存证等。在与贵司的微签服务
                            的有效期内，该代理人的一切行为，均代表本单位，与本单位的行为具有同等法律效力。本单位将承担该代理人行为的全部法律后果和法律责任。
                        </span>
          </p>
          <p>
            <span>代理人无权转委托。特此委托。 </span>
          </p>
          <div class="item-info">
            <p>
              <span>代理人：</span>
              <span>{{IdInfo.userName}}</span>
            </p>

            <p>
              <span>身份证号码：</span>
              <span>{{IdInfo.idCard}}</span>
            </p>
            <p>
              <span>企业公章（盖章）：</span>
            </p>
            <p>
              <span>法定代表人：</span>
              <span>{{licenseInfo.legalPerson}}</span>
            </p>
            <p>
              <span>日期：</span>
              <span>{{IdInfo.date}}</span>
            </p>
          </div>


        </div>

      </el-dialog>
      <!-- 企业法人说明函弹框 -->
      <el-dialog
        :visible.sync="attorney"
        width="700px"
        height="800px"
      >
        <div class="enterprise-attorney-synopsis">
          <h2>企业法人说明函</h2>
          <p class="attorney-text">
            <span> 姓名：</span> <span class="add-info">{{IdInfo.userName}}</span><span>，身份证号：</span> <span class="add-info">{{IdInfo.idCard}}</span><span>，系</span>
            <span class="add-info">{{licenseInfo.tenantName}}</span><span>的法定代表人。</span>

          </p>
          <p style="margin-bottom:160px;margin-top:20px;">特此声明！</p>
          <p  style="margin-bottom:50px;text-align:right;padding-right:100px;">
            <span> 单位（公章）</span>
          </p>
          <p  style="margin-bottom:50px;text-align:right;margin-bottom:200px;padding-right:65px;">
            <span>时间：</span>
            <span>{{IdInfo.date}}</span>
          </p>
        </div>
      </el-dialog>
      <!-- 企业信息编辑弹框提醒 -->
       <el-dialog
            :visible.sync="attorneyEditTip"
            title="提示"
            width="500px"
            :close-on-click-modal="false"
            >
            <div class="tip-body" style="text-align:center">
                <p>若自动读出信息和上传信息不一致，您可进行编辑操作，</p>
                <p>编辑后众签将会对您的信息有效性进行人工审核，请耐心等待</p>
            </div>
            <div slot="footer" class="edit-license-footer dialog-footer">
                <el-button @click="editLicenseCancel">取 消</el-button>
                <el-button type="primary" @click="editTipConfirm">确认编辑</el-button>
            </div>
        </el-dialog>
        <!-- 企业信息编辑弹框 -->
       <el-dialog
        :visible.sync="attorneyEditDialog"
        title="提示"
        :close-on-click-modal="false"
        width="500px"
      >
         <el-form :model="editLicenseForm" class="edit-license" :rules="licenseRules" ref="editLicense">
            <el-form-item label="企业名称：" prop="tenantName">
                <el-input v-model="editLicenseForm.tenantName" autocomplete="off" type="text"></el-input>
            </el-form-item>
            <el-form-item label="统一社会信用代码：" prop="creditCode">
                 <el-input v-model="editLicenseForm.creditCode" autocomplete="off" type="text"></el-input>
            </el-form-item>
            <el-form-item label="法人/企业负责人姓名：" prop="legalPerson">
                 <el-input v-model="editLicenseForm.legalPerson" autocomplete="off" type="text"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="edit-license-footer dialog-footer">
            <el-button @click="editLicenseCancel">取 消</el-button>
            <el-button type="primary" @click="editLicenseConfirm('editLicense')">保 存</el-button>
        </div>
        </el-dialog>

        <!-- 法人信息编辑弹框提醒 -->
       <el-dialog
            :visible.sync="idCardTip"
            title="提示"
            width="500px"
            height="400px"
            :close-on-click-modal="false"
            >
            <div class="tip-body" style="text-align:center">
                <p>若自动读出信息和上传信息不一致，您可进行编辑操作，</p>
                <p>编辑后众签将会对您的信息有效性进行人工审核，请耐心等待</p>
            </div>
            <div slot="footer" class="edit-license-footer dialog-footer">
                <el-button @click="idCardCancel">取 消</el-button>
                <el-button type="primary" @click="idTipConfirm">确认编辑</el-button>
            </div>
        </el-dialog>
        <!-- 法人信息编辑弹框 -->
       <el-dialog
        :visible.sync="idCardEditDialog"
        title="提示"
        :close-on-click-modal="false"
        width="500px"
        height="400px"
      >
         <el-form :model="idCardForm" class="edit-license" :rules="idCardRules" ref="editId">
            <el-form-item label="姓名：" prop="userName">
                <el-input v-model="idCardForm.userName" autocomplete="off" type="text"></el-input>
            </el-form-item>
            <el-form-item label="身份证：" prop="idCard">
                 <el-input v-model="idCardForm.idCard" autocomplete="off" type="text"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="edit-license-footer dialog-footer">
            <el-button @click="idCardCancel">取 消</el-button>
            <el-button type="primary" @click="idCardConfirm('editId')">保 存</el-button>
        </div>
        </el-dialog>

      
      <div class="certification-content">
          <!-- 企业信息 -->
        <div class="company-info">
          <div class="title-bg">
            <span class="title-name">企业信息</span>
          </div>
          <p  v-if="licenseWarn && auditStatus !=2" class="el-icon-warning  result-warning"><span style="margin-left:10px">企业信息审核未通过，请上传真实有效的企业信息</span></p>
          <div class="content-bg">
            <div class="content-box">
              <div class="content-title">
                <span class="vertical-line"></span>
                <span class="little-name">营业执照副本</span>
              </div>
              <div class="content-body">
                <p class="view-example" style="width:330px;" @click="viewExample('license')">查看示例</p>
                <div class="business-license">
                  <el-upload
                    ref='upload1'
                    :data="interfaceParam"
                    class="upload-license"
                    :action='uploadLicenseUrl()'
                    :before-upload="beforeUpload"
                    :on-success="handIdSuccess"
                    :show-file-list=false
                    :on-change="fileChange"
                    :disabled="this.auditStatus==2"
                  >
                    <div class="license-wrap">
                      <img  v-if="licenseInfo.creditPhoto" :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractUrl='+licenseInfo.creditPhoto" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </div>

                  </el-upload>
                </div>
                <div class="upload_warp_text" v-if="showData">
                  共{{bytesToSize(this.licenseSize)}}
                </div>

              </div>
              <p class="upload-tip" style="color:#999" v-if="!licenseInputShow">温馨提示：上传单张图片大小应小于5M,可支持JPEG、JPG、PNG格式</p>
              <p class="upload-tip" v-if="licenseInputShow && auditStatus !=2"> 
                    <span class="el-icon-warning"></span>
                    <span>以下信息为系统自动识别信息，若与贵公司实际信息不符，请重新拍照后上传</span>
                    <span v-if="auditStatus !=2">或</span>
                    <span  class="info-edit" @click="editLicense" v-if="auditStatus !=2">点此进行编辑</span>
                </p>
              <div class="company-input" v-if="licenseInputShow">
                <div class="input-item">
                  <span class="input-title">企业名称</span>
                  <el-input
                    style='width:336px'
                    placeholder=""
                    v-model="licenseInfo.tenantName"
                    @blur='enterpriseName'
                    :disabled= true
                  >
                  </el-input>
                </div>
                <div class="input-item">
                  <span class="input-title">统一社会信用代码</span>
                  <el-input
                    style='width:336px'
                    placeholder=""
                    v-model="licenseInfo.creditCode"
                    @blur='enterpriseName'
                    :disabled= true
                  >
                  </el-input>
                </div>
                <div class="input-item">
                  <span class="input-title">法人/企业负责人姓名</span>
                  <el-input
                    style='width:336px;'
                    placeholder=""
                    v-model="licenseInfo.legalPerson"
                    @blur='enterpriseName'
                    :disabled= true
                  >
                  </el-input>
                </div>
                <!-- <div class="input-item" style="text-align:right;">
                     <el-button type="primary" style='width:200px;margin-right:88px;' @click="editLicense" v-if="licenseWarn !=2">编辑</el-button>
                </div> -->
              </div>

            </div>
          </div>
        </div>
        <!-- 个人信息 -->
        <div class="admin-info">
          <div class="title-bg">
            <span class="title-name">管理员信息</span>
          </div>
         
          <p  v-if="IdCardWarn && authStatus!=1" class="el-icon-warning  result-warning"><span style="margin-left:10px;">个人信息审核未通过，请上传真实有效的个人信息</span></p>
           <div class="admin-type">
            <el-radio-group @change="changeAuthorType" v-model="adminType">
              <el-radio  label='1' style='float:left;padding-top:5px;'>被授权人</el-radio>
              <el-radio  label='0' style='float:left;padding-top:5px;'>法人本人</el-radio>
            </el-radio-group>
          </div>
          <div class="content-bg">
            <div class="content-box">
              <div class="content-title">
                <span class="vertical-line"></span>
                <span class="little-name">证件照片</span>
              </div>
              <div class="content-body">
                <div class="card-id">
                  <!-- 身份证正面 -->
                  <div class='card-left'>
                    <el-upload
                      ref='upload2'
                      :data="interfaceParam"
                      class="upload-cardID"
                      :action='uploadIDUrl("front")'
                      :before-upload="beforeUpload"
                      :on-success="handIdFrontSuccess"
                      :show-file-list=false
                      :disabled="this.authStatus==1"
                    >
                      <div class="upload_warp">
                        <img  v-if="IdInfo.frontPhoto" :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractUrl='+IdInfo.frontPhoto" class="avatar">
                        <img v-else src="/static/images/Credentials/Personal/Pupload/left-card.png" alt="">
                      </div>
                    </el-upload>
                    <div class="upload_warp_text"  v-if="showData">
                      共&nbsp;{{bytesToSize(this.IdCardFrontSize)}}
                    </div>
                    <p class="view-example" style="text-align:center" @click="viewExample('frontId')">查看示例</p>
                  </div>
                  <!-- 身份证反面 -->
                  <div class='card-right'>
                    <el-upload
                      ref='upload2'
                      class="upload-cardID"
                      :action='uploadIDUrl("back")'
                      :before-upload="beforeUpload"
                      :on-success="handIdBackSuccess"
                      :show-file-list=false
                      :disabled="this.authStatus==1"
                    >
                      <div class="upload_warp">
                        <img  v-if="IdInfo.backPhoto" :src="baseURL+'/restapi/wesign/v1/tenant/contract/img?contractUrl='+IdInfo.backPhoto" class="avatar">
                        <img v-else src="/static/images/Credentials/Personal/Pupload/right-card.png" alt="">
                      </div>
                    </el-upload>
                    <div class="upload_warp_text"  v-if="showData">
                      共&nbsp;{{bytesToSize(this.IdCardBackSize)}}
                    </div>
                    <p class="view-example" style="text-align:center"  @click="viewExample('backId')">查看示例</p>
                  </div>
                </div>

              </div>
              <p class="upload-tip" style="color:#999">温馨提示：上传单张图片大小应小于5M,可支持JPEG、JPG、PNG格式</p>
               <p class="upload-tip" v-if="IdInfoShow && authStatus!=1"> 
                    <span class="el-icon-warning"></span>
                    <span>以下信息为系统自动识别信息，若与实际信息不符，请重新拍照后上传或</span>
                    <span  class="info-edit" @click="editIDCard" v-if="authStatus!= 1 ">点此进行编辑</span>
                </p>
              <div class="company-input" v-if="IdInfoShow">
                <div class="input-item">
                  <span v-if="authorizerType" class="input-title">被授权人姓名</span>
                  <span v-else class="input-title">法人姓名</span>
                  <el-input
                    style='width:336px'
                    placeholder=""
                    v-model="IdInfo.userName"
                    @blur='validateIdInfo'
                    :disabled= IdDisabled
                  >
                  </el-input>
                </div>
                <div class="input-item">
                  <span class="input-title">身份证号</span>
                  <el-input
                    style='width:336px'
                    placeholder=""
                    v-model="IdInfo.idCard"
                    @blur='validateIdInfo'
                    :disabled= IdDisabled
                  >
                  </el-input>
                </div>
                <!-- <div class="input-item" style="text-align:right;">
                     <el-button type="primary" style='width:200px;margin-right:88px;' @click="editIDCard" v-if="idCardStatus != 1 ">编辑</el-button>
                </div> -->
                <div class="input-item">
                  <span class="input-title">绑定邮箱</span>
                  <el-input
                    style='width:336px'
                    placeholder=""
                    v-model="IdInfo.email"
                    @blur='validateIdInfo("email")'

                  >
                  </el-input>
                  <span v-if="emailTip" class="validate-tip">{{emailText}}</span>
                </div>
                <div class="input-item">
                  <span class="input-title">手机号</span>
                  <el-input
                    style='width:336px;'
                    placeholder=""
                    v-model="IdInfo.mobile"
                    @blur='validateIdInfo("mobile")'
                    :disabled = authorizerType
                  >
                  </el-input>
                  <span v-if="mobileTip" class="validate-tip">{{mobileTipText}}</span>
                </div>
                <div class="input-item">
                  <span class="input-title">验证码</span>
                  <el-input
                    style='width:230px;'
                    placeholder=""
                    type="text"
                    v-model="IdInfo.smsCode"
                    @blur='validateIdInfo("smsCode")'
                    :disabled= fullName
                    :maxlength=6
                    :minlength=6
                  >
                  </el-input>
                <span>
                    <el-button type="primary" style='width:100px;padding:12px 10px;' id='code' :disabled="smsSend" @click="getSmsCode">{{smsCodeText}}</el-button>
                </span>
                  <span v-if="smsTip" class="validate-tip">{{smsTipText}}</span>
                </div>
                <div class="input-item" style="margin-left: 303px; font-size:14px;">
                  <el-checkbox v-model="checked" @click="confirmSignFile()"></el-checkbox>
                  <span style="color:#333;cursor: pointer;">确认签署</span>
                  <span v-if="authorizerType" style="color: #409eff;cursor: pointer;" @click="viewExample('synopsis')">《一般企业认证授权书》</span>
                  <span v-else style="color: #409eff;cursor: pointer;" @click="viewExample('attorney')">《法人说明函》</span>
                </div>
                <p class="attorney-text">该授权书/说明函仅作为个人与企业关系证明；将会在对公账户打款成功后生效</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 银行信息 -->
        <div class="public-account-info">
          <div class="title-bg">
            <span class="title-name">对公账户信息</span>
          </div>
          <div class="content-box">
            <p  v-if="!bankStatus"  class="el-icon-warning  result-warning">对公账户打款失败，请核实对公账户信息后重新提交</p>
            <div class="company-input">
              <el-form :model="bankInfo" :rules="bankRules" ref="bankInfo">
                <el-form-item  label="企业名称" prop="to_acc_name" label-width="473px">
                  <el-input disabled v-model="bankInfo.to_acc_name"  placeholder="请输入" type="text"></el-input>
                </el-form-item>
                <el-form-item label="企业银行账号" prop="to_acc_no" label-width="473px">
                  <el-input v-model="bankInfo.to_acc_no" placeholder="请输入" type="text"></el-input>
                </el-form-item>
                <el-form-item  label="银行名称"  prop="to_bank_name" label-width="473px">
                  <el-input   v-model="bankInfo.to_bank_name" placeholder="请输入" type="text"></el-input>
                </el-form-item>

                <el-form-item label="开户行所在省／市"  label-width="473px">
                  <el-cascader
                    :options="options"
                    v-model="selectedOptions"
                    @change="handleCityChange">
                  </el-cascader>
                  <span style="position: absolute; left: 0;top: 30px;margin-left: 0;" v-if="cityTip" class="validate-tip">请选择省市</span>
                </el-form-item>
                <el-form-item  label="开户行支行名称"  prop="to_acc_dept" label-width="473px">
                  <el-input v-model="bankInfo.to_acc_dept" placeholder="请输入" type="text"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>

        <div class="submit-btn">
          <el-button type="" style='width:280px' @click="cancelIDcard">取&nbsp;&nbsp;消</el-button>
          <el-button type="primary" style='width:280px' :disabled="sigleClick" @click="submit('bankInfo')">提&nbsp;&nbsp;交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import server from "@/api/certification";
  import {validateMoblie,validatePassWord,validateBankNum,validateCard,TrimAll,validateEmail,validateSmsCode,specialCharacter,socialCreditNum,validateName} from '@/common/js/validate.js';
  import cookie from "@/common/js/getTenant";
  import {getDate} from '@/api/account';
  import cityArr from '@/utils/city.js'
  export default {
    name:'',
    data() {
      let checkName= (rule,value,callback)=>{
        if(!value){
          callback(new Error('企业名称不为空'))
        }else{
          callback()
        }
      }
      let checkBankNum = (rule,value,callback)=>{
        if(!value){
          callback(new Error('请输入企业银行账号'))
        }else if(!validateBankNum(value)){
          callback(new Error('银行账号输入不正确'))
        }else{
          callback()
        }
      }
      let checkBankName = (rule,value,callback)=>{
        if(!value){
          callback(new Error('请输入企业银行名称'))
        }else if(!specialCharacter(TrimAll(value))){
          callback(new Error('名称格式不正确'))
        }else{
          callback()
        }
      }
      let checkBank =  (rule,value,callback)=>{
        if(!value){
          callback(new Error('请输入开户行行名称'))
        }else if(!specialCharacter(TrimAll(value))){
          callback(new Error('名称格式不正确'))
        }else{
          callback()
        }
      }
      let checkLicenseNum = (rules,value,callback)=>{
          if(!value){
              callback(new Error('社会信用统一代码为必填'))
          }else if(!socialCreditNum(value)){
              callback(new Error('社会信用统一代码格式不正确'))
          }else{
              callback()
          }
      }
      let checkLicenseName = (rules,value,callback)=>{
          if(!value){
              callback(new Error('该项为必填项'))
          }else if(!validateName(value)){
              callback(new Error('格式不正确'))
          }else{
              callback()
          }
      }
      let checkIDCard = (rules,value,callback)=>{
          if(!value){
              callback(new Error('身份证信息必填项'))
          }else if(!validateCard(value)){
              callback(new Error('身份证格式不正确'))
          }else{
              callback()
          }
      }
      return {
        baseURL:this.baseURL.BASE_URL,
        interfaceCode: cookie.getJSON("tenant")?cookie.getJSON("tenant")[1].interfaceCode:'',
        auditStatus:'',     //企业认证状态
        authStatus:'',      //个人认证状态
        licenseSize:0,             //营业执照大小
        licenseInfoEdit:false,   //营业执照信息
        licenseInputShow:false,
        IdInfoShow:false,
        isSubmitCode: true,
        licenseInfo:{              //企业信息
          tenantName:'',
          creditCode:'',
          creditPhoto:'',
          legalPerson:'',
        },
        licenseExample:false,
        frontIdExample:false,
        backIdExample:false,
        IdInfo:{
          idCard:'',
          userName:'',
          mobile:'',
          smsCode:'',
          smsNo:'',
          appId:'',
          email:'',
          resultMobile:'',
          frontPhoto:'',  //正面照地址
          backPhoto:'',   //反面照地址
          date:'',       //授权日期
        },
        showData:true,
        IdDisabled:true,
        IdFrontImg:'',           //正面img
        IdBackImg:'',             //反面img
        IdCardFrontSize:0,     //身份证正面
        IdCardBackSize:0,      //身份证反面
        authorizerType:true,     //管理员了类型  false:0 法人/true:1 被授权人
        adminType:'1',
        idMobile:true,
        checked:false,
        bankInfo:{
          to_acc_name:"",      //企业名称
          to_acc_no:"",         //收款账号
          to_bank_name:"",       //银行名称
          to_pro_name:"",        //开户行省名
          to_city_name:"",        //开户行市名
          to_acc_dept:"",          //支行名称
        },
        bankRules:{
          to_acc_name: [
            {validator: checkName, trigger: 'blur' }
          ],
          to_acc_no:[
            {validator: checkBankNum, trigger: 'blur' }
          ],
          to_bank_name: [
            { validator: checkBankName, trigger: 'blur' }
          ],
          to_acc_dept:[
            { validator:checkBank, trigger: 'blur' }
          ]
        },
        selectedOptions:[],

        fullName:false,

        //管理员信息(身份证正反面)
        IDcardFront:{
          src:''
        },
        IDcardSide:{
          src:''
        },
        sigleClick:false,
        emailTip:false,
        emailText:'',
        mobileTip:false,
        mobileTipText:'',
        smsTip:false,
        smsCodeText:'获取验证码',
        cityTip:false,
        smsTipText:'',
        smsSend:false,
        hasGetCode:false,
        synopsis:false,
        attorney:false,
        licenseWarn:false,        //营业执照信息不通过提醒
        IdCardWarn:false,        //管理员信息不通过提醒
        bankStatus:true,   //企业信息认证状态
        countRequest:0,           //请求计数
        options:[],
        isTenantEdit:false,   //企业信息是否编辑过
        attorneyEditDialog:false,  //企业信息编辑弹框
        attorneyEditTip:false, //企业信息编辑提示
        editLicenseForm:{
            tenantName:'',
            creditCode:'',
            legalPerson:''
        },
        licenseRules:{
            tenantName:[
                { validator: checkLicenseName, trigger: 'blur'}
            ],
            creditCode:[
                { validator: checkLicenseNum, trigger: 'blur'}
            ],
            legalPerson:[
                { validator: checkLicenseName, trigger: 'blur'}
            ],
        },
        isPersonEdit:false, //营业执照信息是否编辑过
        idCardTip:false,      //提示弹框
        idCardEditDialog:false, //编辑弹框
        idCardForm:{
            userName:'',
            idCard:''
        },
        idCardRules:{
            userName:[
                { validator: checkLicenseName, trigger: 'blur'}
            ],
            idCard:[
                { validator: checkIDCard, trigger: 'blur'}
            ]
        },
        interfaceParam:{
            interfaceCode:cookie.getJSON("tenant")?cookie.getJSON("tenant")[1].interfaceCode:'',
        },
        OCRLicenseInfo:{   //OCR信息 作为编辑前后的信息对比
            tenantName:'',
            creditCode:'',
            legalPerson:''
        },
        OCRIdCardInfo:{
            userName:'',
            idCard:''

        }
      }
    },
    created(){
       this.options = cityArr;
      let param={};
      let interfaceCode = this.interfaceCode;
      let licenseInfo = this.licenseInfo;
      let bankInfo = this.bankInfo;
      let IdInfo = this.IdInfo;
      let options = [];
       sessionStorage.setItem('bankInfo','')//人工审核驳回后跳回到此页面需要先清一下银行信息不然到打款页面会默认调用人工审核接口
      server.companyInfoDetail(param,interfaceCode).then(res=>{
        if(res.data.resultCode==1){
          this.showData = false
          let data = res.data.data;
          
          sessionStorage.setItem('authorizerType',this.adminType)
          licenseInfo.tenantName = data.tenantName
          licenseInfo.creditCode = data.creditCode
          licenseInfo.creditPhoto = data.creditPhoto
          licenseInfo.legalPerson = data.legalPerson
            //OCR信息企业
            this.OCRLicenseInfo.tenantName = data.ocrStr.TenantName;
            this.OCRLicenseInfo.creditCode = data.ocrStr.creditCode;
            this.OCRLicenseInfo.legalPerson = data.ocrStr.legalPerson;
            if(data.isPersonEdit != null) {         //
                this.isPersonEdit = data.isPersonEdit == 0 ? false : true 
            } 
            if(data.isTenantEdit != null) {
                this.isTenantEdit=data.isTenantEdit == 0 ? false : true   
            }
            //如果人工审核通过 默认触发人工审核再置为false
            if(data.auditStatus == 2){
                this.isTenantEdit = false
            }
            if(data.authStatus == 1){
                this.isPersonEdit = false
            }

            console.log(this.isTenantEdit,this.isPersonEdit)
          if(licenseInfo.tenantName){
            this.licenseInputShow = true;
          }
          IdInfo.idCard = data.idCard
          IdInfo.userName = data.userName
          IdInfo.mobile = data.mobile
          IdInfo.frontPhoto = data.frontPhoto
          IdInfo.backPhoto = data.backPhoto
          IdInfo.adminType = data.authorizerType
          IdInfo.email = data.email;
            //OCR信息个人
            this.OCRIdCardInfo.userName = data.ocrStr.userName;
            this.OCRIdCardInfo.idCard = data.ocrStr.idCard;
            this.idCardStatus = data.authStatus
          if(IdInfo.idCard){
            this.IdInfoShow = true;
            // this.smsSend = true;
            this.getAuthDate();
          }

          bankInfo.to_acc_name = data.tenantName
          bankInfo.to_acc_no = data.to_acc_no
          bankInfo.to_bank_name = data.to_bank_name
          bankInfo.to_pro_name = data.to_pro_name
          bankInfo.to_city_name = data.to_city_name
          bankInfo.to_acc_dept = data.to_acc_dept
          options.push(data.to_pro_name,data.to_city_name)
          this.selectedOptions = options

          this.auditStatus = data.auditStatus;
          this.authStatus = data.authStatus;
          //判断审核未通过提示是否显示
          if(this.auditStatus== -4){  //企业认证驳回
            this.licenseWarn = true;
          }else{
              this.licenseWarn = false;
          }
          if(this.authStatus ==3){ //个人认证驳回
            this.IdCardWarn = true;
          }else{
               this.IdCardWarn = false;
          }

        }
      }).catch(error=>{

      })

    },
    methods:{

      //查看示例
      viewExample(type){
        if(type == 'license'){
          this.licenseExample = true;
        }else if(type=='frontId'){
          this.frontIdExample = true;
        }else if(type=='backId'){
          this.backIdExample = true;
        }else if(type=='synopsis'){
          this.getAuthDate();
          this.synopsis = true;
        }else{
          this.attorney = true;
        }

      },
      //输入验证
      enterpriseName(){

      },
      //营业执照上传路径
      uploadLicenseUrl(){
        return `${this.baseURL}/restapi/wesign/v1.6/tenant/creditPhotoOcr`
      },
      //身份证上传路径
      uploadIDUrl(type){
        if(type=='front'){
          return `${this.baseURL}/restapi/wesign/v1.6/user/frontPhotoOcr`
        }else{
          return `${this.baseURL}/restapi/wesign/v1.6/user/backPhoto`
        }
      },

      fileChange(file){
        // console.log(file)
      },
      beforeUpload(file){
        var max_size = 5; // 5M
        var reg= /[.](png|PNG|jpg|JPG|jpeg|JPEG)$/
        var index = file.name.lastIndexOf('.')
        if(!reg.test(file.name.slice(index))) {
          this.$alert('图片格式不正确!','上传', {
            confirmButtonText: '确定'
          });
          return false
        }else if(file.size > max_size*1024*1024){
          this.$alert('图片大小超过限制！','上传', {
            confirmButtonText: '确定'
          });
          return false
        } else {
          this.$loading.show(
            '图片上传中...',
          );
        }

      },
      //营业执照上传成功
      handIdSuccess(name, file, fileList){
        if(name.resultCode == 1){
          this.licenseInputShow = true;
          this.licenseSize = file.size;
          this.licenseInfo.tenantName = name.data.tenantName;
          this.licenseInfo.creditCode = name.data.creditCode;
          this.licenseInfo.creditPhoto = name.data.creditPhoto;
          this.licenseInfo.legalPerson = name.data.legalPerson;
          this.bankInfo.to_acc_name = name.data.tenantName;

        this.OCRLicenseInfo.tenantName = name.data.tenantName;
        this.OCRLicenseInfo.creditCode = name.data.creditCode;
        this.OCRLicenseInfo.legalPerson = name.data.legalPerson;

          this.licenseWarn = false;
          this.$loading.hide();
          this.$message({
            showClose: true,
            message: '营业执照上传成功',
            type: 'success'
          })
          this.isTenantEdit = false;
        }else{
          this.$loading.hide();
          //  this.IdInfoShow = false;
          this.$message({
            showClose: true,
            message: name.resultMessage,
            type: 'error'
          })
        }

      },
      //营业执照编辑
      editLicense(){
        this.attorneyEditTip = true;
      },
        //营业执照编辑保存
        editLicenseConfirm(form){
            this.$refs[form].validate((valid)=>{
                if(valid){
                    if((this.OCRLicenseInfo.tenantName == this.editLicenseForm.tenantName)&&( this.OCRLicenseInfo.creditCode == this.editLicenseForm.creditCode)&&(this.OCRLicenseInfo.legalPerson == this.editLicenseForm.legalPerson)){
                            this.$message({
                                showClose: true,
                                message: '编辑信息和OCR信息一致',
                                type: 'success'
                            })
                            this.isTenantEdit = false
                            this.attorneyEditDialog = false  //弹框
                    }else{
                            this.$message({
                                showClose: true,
                                message: '编辑信息和OCR信息不一致，将会触发人工审核',
                                type: 'error'
                            })
                            this.isTenantEdit = true
                            this.attorneyEditDialog = false  //弹框
                    }
                    this.licenseInfo.tenantName = this.editLicenseForm.tenantName
                    this.licenseInfo.creditCode = this.editLicenseForm.creditCode
                    this.licenseInfo.legalPerson = this.editLicenseForm.legalPerson
                    this.bankInfo.to_acc_name=this.editLicenseForm.tenantName
                }
            })
        },
      //营业执照编辑确定弹框
      editTipConfirm(){
        this.attorneyEditTip = false;
        this.attorneyEditDialog = true;
        this.editLicenseForm.tenantName = this.licenseInfo.tenantName;
        this.editLicenseForm.creditCode = this.licenseInfo.creditCode;
        this.editLicenseForm.legalPerson = this.licenseInfo.legalPerson;
      },
      //营业执照编辑取消
      editLicenseCancel(){
           this.attorneyEditTip = false;
           this.attorneyEditDialog = false;
           this.editLicenseForm = {
                tenantName:'',
                creditCode:'',
                legalPerson:''
            }
            this.idCardForm = {
                userName:'',
                idCard:''
            }
      },
      //身份证正面上传成功
      handIdFrontSuccess(name, file, fileList){
        if(name.resultCode == 1){
          if(this.licenseInfo.legalPerson&&name.data.name&&this.authorizerType==0&&(this.licenseInfo.legalPerson!=name.data.name)){
            this.$loading.hide();
            this.$message({
              showClose: true,
              message: '当前身份信息与企业法人信息不一致',
              type: 'error'
            })
            return
          }
          this.IdCardFrontSize = file.size;
          this.IdInfo.frontPhoto = name.data.frontPhoto;
          this.IdInfo.userName = name.data.name
          this.IdInfo.idCard = name.data.idCard

          this.OCRIdCardInfo.userName = name.data.name
          this.OCRIdCardInfo.idCard = name.data.idCard
          this.IdInfoShow = true;
          this.IdCardWarn = false;
          if(this.authorizerType){
            this.IdInfo.mobile = sessionStorage.getItem('mobile')
          }
          this.$loading.hide();
          this.getAuthDate()

          this.$message({
            showClose: true,
            message: '上传成功',
            type: 'success'
          })
          this.isPersonEdit = false;
        }else{
          this.$loading.hide();
          this.$message({
            showClose: true,
            message:'身份证信息验证失败',
            type: 'error'
          })
        }
      },
      //身份信息编辑
      editIDCard(){
           this.idCardTip = true;
           this.idCardEditDialog = false;
      },
      //身份信息弹框提醒
      idCardCancel(){
            this.idCardTip = false;
           this.idCardEditDialog = false;
      },
      //身份信息确认编辑
      idTipConfirm(){
            this.idCardForm.userName = this.IdInfo.userName;
            this.idCardForm.idCard = this.IdInfo.idCard;
            this.idCardTip = false;
            this.idCardEditDialog = true;
      },
      //身份信息编辑提交
      idCardConfirm(form){
           this.$refs[form].validate((valid)=>{
                if(valid){
                    if((this.OCRIdCardInfo.userName == this.idCardForm.userName)&&(this.OCRIdCardInfo.idCard == this.idCardForm.idCard)){
                        this.$message({
                            showClose: true,
                            message: '编辑信息和OCR信息一致',
                            type: 'success'
                        })

                        this.isPersonEdit = false;
                        this.idCardEditDialog = false
                    }else{
                        this.$message({
                            showClose: true,
                            message: '编辑信息和OCR信息不一致，将会触发人工审核',
                            type: 'error'
                        })
                        this.isPersonEdit = true;
                        this.idCardEditDialog = false
                    }
                    this.IdInfo.userName = this.idCardForm.userName;
                    this.IdInfo.idCard = this.idCardForm.idCard;
              }
           })
      },
      //获取授权日期
      getAuthDate(){
        getDate().then(res=>{
          this.IdInfo.date=res.data;
        }).catch(error=>{

        })

      },

      //背面上传成功
      handIdBackSuccess(name, file, fileList){
        if(name.resultCode == 1){
          this.IdCardBackSize = file.size;
          this.IdInfo.backPhoto = name.data.backPhoto;
          this.$loading.hide();
          this.$message({
            showClose: true,
            message: '上传成功',
            type: 'success'
          })
        }else{
          this.$loading.hide();
          this.$message({
            showClose: true,
            message: name.resultMessage,
            type: 'error'
          })
        }
      },
      //身份证信息校验
      validateIdInfo(type){
        if(type == 'mobile'){
          if(!this.IdInfo.mobile){
            this.mobileTip = true;
            this.mobileTipText="请输入手机号"
            return false
          }else if(!validateMoblie(this.IdInfo.mobile) ){
            this.mobileTip = true;
            this.mobileTipText="手机号输入不正确"
            return false
          }else{
            this.mobileTip = false
            return true
          }
        }else if(type == 'smsCode'){
          if(this.IdInfo.smsCode==""){
            this.smsTip=true;
            this.smsTipText = "验证码不能为空";
          }else if(!validateSmsCode(this.IdInfo.smsCode)){
            this.smsTip=true;
            this.smsTipText = "验证码只能为6位数字";
          }else{
            this.smsTip=false;
            this.smsTipText = "";
            this.valiteSms()
          }
        }else if(type=='email'){
          if(!this.IdInfo.email){
            this.emailTip = true
            this.emailText = '请输入邮箱'
            return false
          }else if(!validateEmail(this.IdInfo.email)){
            this.emailTip = true
            this.emailText = '邮箱格式不正确';
            return false
          }else{
            this.emailTip = false
            this.emailText = '';
            return true
          }
        }
      },
      //验证手机号
      valiteMobile(){
        let param={
          username:this.IdInfo.mobile
        }
        server.valiteMobile(param).then(res=>{
          if(res.data.resultCode==0){


          }else{

          }
        }).catch(error=>{

        })
      },

      //获取验证码
      getSmsCode(){
        if(!this.validateIdInfo("mobile")){
          return
        }
        var codeType = '0'
        var InterValObj = 60
        var count = 60
        var curCount = count
        var timer = null
        let params = {
          userName:this.IdInfo.userName,
          codeType:codeType,
          mobile:this.IdInfo.mobile,
          interfaceCode:this.interfaceCode
        }
        let that = this;
        server.smsCode(params).then(res=>{
          if (res.data.resultCode == 1) {
            that.smsCodeText = curCount + '秒';
            that.IdInfo.appId =  res.data.appId;
            that.IdInfo.smsNo =  res.data.smsNo
            that.IdInfo.resultMobile = res.data.mobile     //发送验证码后返回的手机号
            that.smsSend = true;
            this.hasGetCode = true;
            timer = setInterval(function () {
              that.smsCodeText =  (curCount - 1) + '秒'
              if (curCount === 0) {
                that.smsCodeText  = '获取验证码'
                that.smsSend = false;
                clearInterval(timer)
              } else {
                curCount--
              }
            }, 1000)
            setTimeout(function(){
                this.hasGetCode = false   //  5s后重新获取验证码
            },5000)
          }else{
            this.$message({
              message: res.data.resultMessage,
              type: 'warning'
            })
          }
        }).catch(error=>{

        })

      },
      //校验验证码
      valiteSms(){
        let param={
          mobile:this.IdInfo.mobile,
          smsNo:this.IdInfo.smsNo,
          smsCode:this.IdInfo.smsCode,
          appId:this.IdInfo.appId,
        }
        server.smsValite(param).then(res=>{
          if(res.data.resultCode == 1){
              this.isSubmitCode = true;
          }else{
            this.smsTip=true;
            this.smsTipText = "验证码错误";
            this.isSubmitCode = false;
          }
        })
      },
      //确认签署函
      confirmSignFile(){
        this.checked = !this.checked;
      },
      //授权人类型
      changeAuthorType(){
        this.IdCardWarn = false;
        this.licenseWarn = false;
        this.IdInfoShow = false;
        this.IdCardFrontSize = 0;
        this.IdCardBackSize = 0;
        if(!this.authorizerType){
          this.authorizerType = true
        }else{
          this.authorizerType = false
        }
        sessionStorage.setItem('authorizerType',this.adminType)
        this.authStatus = 0;    //切换个人身份时打开身份证上传
        this.IdInfo={
          idCard:'',
          userName:'',
          mobile:'',
          smsCode:'',
          smsNo:'',
          appId:'',
          resultMobile:'',
          frontPhoto:'',  //正面照地址
          backPhoto:''   //反面照地址
        }
      },

      //选择城市
      handleCityChange(val){
        this.bankInfo.to_pro_name=val[0]
        this.bankInfo.to_city_name=val[1];
        this.cityTip = false;
      },

      bytesToSize(bytes) {
        if (bytes === 0) return '0 B';
        let k = 1024,
          sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
          i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
      },
      //取消
      cancelIDcard(){
        this.$router.push('/Merchant')
      },
      //提交
      submit(bankInfo){
        this.countRequest = 0;
        if(!this.licenseInfo.creditPhoto){
          this.$message({
            showClose: true,
            message: '请上传营业执照',
            type: 'error'
          })
          return
        }else if(!this.IdInfo.frontPhoto){
          this.$message({
            showClose: true,
            message: '请上传身份证正面照',
            type: 'error'
          })
          return
        }else if(!this.IdInfo.backPhoto){
          this.$message({
            showClose: true,
            message: '请上传身份证反面照',
            type: 'error'
          })
          return
        }
        if(this.licenseInfo.legalPerson&& this.IdInfo.userName&&(this.licenseInfo.legalPerson!= this.IdInfo.userName)&&this.authorizerType==0){
          this.$message({
            showClose: true,
            message: '当前身份信息与企业法人信息不一致',
            type: 'error'
          })
          return
        }
        if(!this.IdInfo.email){
          this.$message({
            showClose: true,
            message: '邮箱为必填',
            type: 'error'
          })
          return
        }
        if(!validateEmail(this.IdInfo.email)){
          this.$message({
            showClose: true,
            message: '邮箱格式不正确',
            type: 'error'
          })
          return
        }
        if(!this.IdInfo.mobile){
          this.$message({
            showClose: true,
            message: '手机号不能为空',
            type: 'error'
          })
          return
        }
        if(!this.IdInfo.smsCode){
          this.$message({
            showClose: true,
            message: '验证码不能为空',
            type: 'error'
          })
          return
        }
        if(!this.hasGetCode){
         this.$message({
            showClose: true,
            message: '请先获取验证码',
            type: 'error'
          })
          return
        }
        if(this.IdInfo.mobile != this.IdInfo.resultMobile){
          this.$message({
            showClose: true,
            message: '手机号与验证码不匹配',
            type: 'error'
          })
          return
        }
        if(!this.checked){
          this.$message({
            showClose: true,
            message: '请勾选确认签署',
            type: 'error'
          })
          return
        }
        if(!this.bankInfo.to_pro_name){
          this.cityTip = true;
          return
        }else{
          this.cityTip = false;
        }
        if(!this.isSubmitCode){
            this.$message({
                showClose: true,
                message: '验证码有误',
                type: 'error'
            })
            return
        }
        this.$refs[bankInfo].validate((valid) => {
          if(valid){
            this.sigleClick = true  //单点操作
            this.$loading.show(
              '信息提交中...',
            );
            this.sublicenseInfo()
          }
        })
      },
      //营业执照信息提交
      sublicenseInfo(){
        let param={
          tenantName:this.licenseInfo.tenantName,
          creditCode:this.licenseInfo.creditCode,
          creditPhoto:this.licenseInfo.creditPhoto,
          legalPerson:this.licenseInfo.legalPerson,
          interfaceCode:this.interfaceCode,
          isTenantEdit:this.isTenantEdit
        }
        server.licenseInfo(param).then(res=>{
          if(res.data.resultCode==1){
            this.sigleClick = false;
            this.licenseWarn = false;
            if(this.isTenantEdit){
                this.auditStatus == 2
            }
            this.subIdInfo();
            this.$loading.hide();
            this.countRequest+=1;
          }else{
            this.sigleClick = false;
            this.licenseWarn = true;
            this.$loading.hide();
            this.countRequest-=1;
            this.$message({
                showClose: true,
                message:res.data.resultMessage,
                type: 'error'
            })
          }
        }).catch(error=>{
            this.$loading.hide();
        })

      },
      //身份证信息提交
      subIdInfo(){
        let params={
            userName:this.IdInfo.userName,
            idCard:this.IdInfo.idCard,
            mobile:this.IdInfo.mobile,
            interfaceCode:this.interfaceCode,
            authorizerType:this.authorizerType==true?1:0,
            frontPhoto:this.IdInfo.frontPhoto,
            backPhoto:this.IdInfo.backPhoto,
            email:this.IdInfo.email,
            isPersonEdit:this.isPersonEdit
        }
        server.IdCardInfo(params).then(res=>{
            if(res.data.resultCode==1){
                this.sigleClick = false;
                this.IdCardWarn = false;
                if(this.isPersonEdit){      //如果未出发人工审核提交通过即认为认证通过
                    this.authStatus == 1
                }
                this.countRequest+=1;  //计数器
                this.saveBankInfo()
            }else{
                this.sigleClick = false;
                this.IdCardWarn = true;
                this.countRequest-=1;
                this.$message({
                    showClose: true,
                    message:res.data.resultMessage,
                    type: 'error'
                })
            }
        }).catch(error=>{
            this.$loading.hide();
        })
      },
      //企业信息或个人信息编辑过触发人工审核 未
      // 企业和个人认证通过进入打款页面=>查询人工审核状态=>审核通过=>银行信息提交=>轮询打款状态=>打款验证=>实名完成
                                                     //=>审核不通过=>返回企业认证页面=>重新编辑提交触发上述流程
      //银行信息提交     
      saveBankInfo(){
        let params={
          to_acc_name:this.bankInfo.to_acc_name,               //企业名称
          to_acc_no:this.bankInfo.to_acc_no,                     //收款账号
          to_bank_name:this.bankInfo.to_bank_name,                   //银行名称
          to_pro_name:this.bankInfo.to_pro_name,                    //开户行省名
          to_city_name:this.bankInfo.to_city_name,                   //开户行市名
          to_acc_dept:this.bankInfo.to_acc_dept,               //支行名称
        }
        let interfaceCode = this.interfaceCode;
        server.saveBankInfo(params,interfaceCode).then(res=>{
          if(res.data.resultCode==1){
            this.sigleClick = false;
            this.bankStatus = true;
            this.$loading.hide();
            if(this.countRequest==2){        //计数器 只有企业和个人信息过之后才查询
                this.saveCheckStatus()
            }
          }else{
            this.sigleClick = false;
            this.bankStatus = false
            this.$loading.hide();
            this.$message({
              showClose: true,
              message:res.data.resultMessage,
              type: 'error'
            })
          }
        }).catch(error=>{

        })
      },
       //提交是否触发人工审核给后台
      saveCheckStatus(){
        let params={
            isTenantEdit:this.isTenantEdit,
            isPersonEdit:this.isPersonEdit
        }
        server.saveCheckStatus(this.interfaceCode,params).then(res=>{
            if(res.data.resultCode==1){
                this.$router.push("/EnterprisePayment")
        }
        }).catch(err=>{

        })
      }
    },
    watch:{
      countRequest:function(val){

      }
    }


  }
</script>
<style lang="scss" scoped>
  @import "../../common/styles/content.scss";
  @import "../../common/styles/SigningSteps.css";
  @import "../../styles/CompanyCertificate/CompanyCertificate.scss";

</style>

<style lang="scss">

  .el-cascader-menu::-webkit-scrollbar{width:2px;}
  .el-cascader-menu::-webkit-scrollbar-track{background-color:rgb(217, 217, 217);}
  .el-cascader-menu::-webkit-scrollbar-thumb{background-color:rgb(205, 205, 205);}

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
  }
  input{
    -moz-appearance:textfield;
  }
  .edit-license{
        // width: 350px;
        // margin: 0 auto;
      .el-form-item{
          display: flex;
          justify-content: space-between;
      }
      /deep/ .el-form-item__label{
          flex:1;
      }
      /deep/ .el-form-item__content{
          flex:2;
      }
  }
  .edit-license-footer {
        text-align:center;
    }

 .info-edit{
    color: #4091fb;
    cursor: pointer;
    text-decoration: underline;
 }
</style>



